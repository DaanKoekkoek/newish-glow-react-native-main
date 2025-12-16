import { Buffer } from "buffer";
import { execSync, spawn, spawnSync } from "child_process";
import fs from "fs";
// @ts-ignore - ora not configured for ESM
import ora from "ora";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Parse command-line arguments using yargs
const argv = yargs(hideBin(process.argv))
  .options({
    platform: { choices: ["ios", "android"] } as const,
    "restore-all": { type: "boolean" },
    "output-diff": { type: "boolean" },
  })
  .parseSync();

// Ensure the platform argument is either 'android' or 'ios'
if (argv.platform !== "android" && argv.platform !== "ios") {
  throw new Error("--platform flag must be passed with either android or ios");
}

// Define the directory path based on the platform argument
const baselineDirectoryPath = `./.owl/baseline/${argv.platform}`; // Path needs leading './' for later git show command
const diffBasePath = `./.owl/pixelMatchDiff/${argv.platform}`;
// Extract the directory path from the file path

// Ensure the directory exists
if (fs.existsSync(diffBasePath)) {
  fs.rmSync(diffBasePath, { recursive: true, force: true });
}

if (argv["output-diff"]) {
  fs.mkdirSync(diffBasePath, { recursive: true });
}

function getBaselineFilePaths() {
  const baselineFileNames = fs.readdirSync(baselineDirectoryPath);
  return baselineFileNames;
}

//Performs a git fetch to update local references to remote branches.
function fetchRemoteBranches(): void {
  try {
    const fetchResult = spawnSync("git", ["fetch"], { encoding: "utf-8" });

    if (fetchResult.error) {
      throw fetchResult.error;
    }

    if (fetchResult.status !== 0) {
      console.error(
        "Git fetch failed with stderr:",
        fetchResult.stderr.toString(),
      );
    } else {
      console.log("Git fetch completed successfully.");
    }
  } catch (error) {
    console.error("Error executing Git fetch:", error);
  }
}

async function getBaselineBuffer(filePath: string): Promise<Buffer | null> {
  return new Promise((resolve, reject) => {
    // we need to use git spawn to get the file content due to larger buffer size
    const gitShowProcess = spawn("git", ["show", `origin/main:${filePath}`]);

    const chunks: Buffer[] = [];
    let stderr = "";

    gitShowProcess.stdout.on("data", (data) => {
      chunks.push(data);
    });

    gitShowProcess.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    gitShowProcess.on("error", (error) => {
      reject(error);
    });

    gitShowProcess.on("close", (code) => {
      if (code !== 0) {
        // Handle the case where the file does not exist
        if (stderr.includes("fatal: path")) {
          console.error(
            `The file "${filePath}" does not exist in the origin/main branch.`,
          );
          resolve(null);
        } else {
          console.error("Git command failed with stderr:", stderr);
          reject(new Error(stderr));
        }
      } else {
        resolve(Buffer.concat(chunks));
      }

      if (code !== 0) {
        reject(new Error(`Git command failed with code ${code}`));
      } else {
        resolve(Buffer.concat(chunks));
      }
    });
  });
}

/**
 * Checks if a file has changed in the working directory or staging area.
 * @param filePath - The path to the file to check.
 * @returns True if the file has changed, false otherwise.
 */
function hasFileChanged(filePath: string): boolean {
  try {
    // Check for unstaged changes in the working directory
    const workingDiff = execSync(
      `git diff --name-only --relative ${filePath}`,
      {
        encoding: "utf-8",
      },
    );

    // Check for staged changes
    const stagedDiff = execSync(
      `git diff --cached --name-only --relative ${filePath}`,
      {
        encoding: "utf-8",
      },
    );

    // Check if the file is listed in either of the diffs
    return filePath.includes(workingDiff) || filePath.includes(stagedDiff);
  } catch (error) {
    console.error("Error executing Git command:", error);
    return false;
  }
}

async function getImageDiffResults(files: string[]) {
  const results = [];
  const spinner = ora(`Process Files 0/${files.length}`).start();
  fetchRemoteBranches();

  for (const [index, file] of files.entries()) {
    spinner.text = `Process Files ${index}/${files.length}`;
    const filePath = `${baselineDirectoryPath}/${file}`;
    if (!hasFileChanged(filePath)) {
      continue;
    }

    try {
      const baselineBuffer = await getBaselineBuffer(filePath);
      if (!baselineBuffer) {
        results.push({
          file,
          hasChanged: true,
          numberMismatchedPixels: Infinity,
          isNew: true,
        });
        continue;
      }
      const img1 = PNG.sync.read(baselineBuffer);
      const img2 = PNG.sync.read(fs.readFileSync(filePath));
      const { width, height } = img1;
      const diff = new PNG({ width, height });

      const numberMismatchedPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        // TODO: this should stay inline with react-native-owl config.
        // The default is 0.1, this is also the default for react-native-owl atm.
        // { threshold: 0.1 },
      );
      if (argv["output-diff"]) {
        const diffFilePath = `${diffBasePath}/${file}`;

        fs.writeFileSync(diffFilePath, PNG.sync.write(diff));
      }
      const hasChanged = numberMismatchedPixels > 0;

      results.push({ file, hasChanged, numberMismatchedPixels });
    } catch (error) {
      console.error("Error:", error);
    }
  }
  spinner.succeed(`Processed ${files.length} files`);
  return results;
}

function gitRestoreFiles(filePaths: string[]) {
  // Create the git restore command arguments
  const args = ["restore", ...filePaths];

  // Run the git restore command
  const result = spawnSync("git", args, { encoding: "utf-8" });

  if (result.error) {
    console.error("Error executing git restore:", result.error);
  } else if (result.status !== 0) {
    console.error("Git restore command failed with code:", result.status);
    console.error("stderr:", result.stderr);
  } else {
    console.log("Files restored successfully:", filePaths);
  }
}

getImageDiffResults(getBaselineFilePaths()).then((diffResult) => {
  if (!diffResult || diffResult.length === 0) {
    console.log("No files have changed");
    return;
  }

  const restoreAll = argv["restore-all"];

  const changedResults = diffResult.filter(({ hasChanged }) => hasChanged);

  console.table(changedResults);

  const resultsToRestore = diffResult.filter(
    ({ file, hasChanged, isNew }) => restoreAll || !hasChanged || !isNew,
  );

  console.table(resultsToRestore);

  const filesToRestore = resultsToRestore.map(
    ({ file }) => `${baselineDirectoryPath}/${file}`,
  );
  console.log(
    `${filesToRestore.length} of ${diffResult.length} files will be restored`,
  );

  if (filesToRestore.length === 0) {
    console.log("No files to restore");
    return;
  }
  gitRestoreFiles(filesToRestore);
});
