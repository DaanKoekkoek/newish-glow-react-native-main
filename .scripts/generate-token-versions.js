const fs = require("fs");
const path = require("path");

// Configuration
const COMPONENTS_DIR = "./packages/glow-react-web/lib/components";
const TOKEN_VERSIONS_FILE =
  "./node_modules/@odido-portals/glow-tokens/dist/component-versions/index.js";
const DOCS_FILE =
  "./packages/glow-react-web/lib/components/docs-tokenVersions.mdx";
const TIMELINE_DOCS_FILE =
  "./packages/glow-react-web/lib/components/docs-tokenTimeline.mdx";
const HISTORY_FILE =
  "./packages/glow-react-web/public/token-versions-history.json";
const PACKAGE_JSON_FILE = "./packages/glow-react-web/package.json";
const GLOW_TOKENS_PACKAGE_JSON =
  "./node_modules/@odido-portals/glow-tokens/package.json";

// Check for command line flags
const includeUnknowns = !process.argv.includes("--no-unknowns");
const onlyTimeline = process.argv.includes("--only-timeline");
const onlyCurrent = process.argv.includes("--only-current");

/**
 * Read and parse the component versions file to extract component versions
 * @returns {Object} Component versions object
 */
function loadComponentVersions() {
  try {
    // Resolve the absolute path relative to the script's directory
    const absolutePath = path.resolve(__dirname, "..", TOKEN_VERSIONS_FILE);
    const componentVersionsModule = require(absolutePath);
    return componentVersionsModule.componentVersions;
  } catch (error) {
    console.error("Error loading component versions:", error.message);
    process.exit(1);
  }
}

/**
 * Load the package version and glow-tokens version from package.json
 * @returns {Object} Package versions object
 */
function loadPackageVersions() {
  try {
    // Load the main package version
    const content = fs.readFileSync(PACKAGE_JSON_FILE, "utf8");
    const packageJson = JSON.parse(content);
    const packageVersion = packageJson.version || "unknown";

    // Load the actual installed glow-tokens version from node_modules
    let glowTokensVersion = "unknown";
    try {
      const glowTokensContent = fs.readFileSync(
        GLOW_TOKENS_PACKAGE_JSON,
        "utf8",
      );
      const glowTokensPackageJson = JSON.parse(glowTokensContent);
      glowTokensVersion = glowTokensPackageJson.version || "unknown";
    } catch (error) {
      console.warn(
        "Warning: Could not read glow-tokens package.json from node_modules:",
        error.message,
      );
      // Fallback to checking devDependencies if node_modules version fails
      glowTokensVersion =
        packageJson.devDependencies?.["@odido-portals/glow-tokens"] ||
        "unknown";
    }

    return {
      packageVersion,
      glowTokensVersion,
    };
  } catch (error) {
    console.error("Error loading package versions:", error.message);
    return {
      packageVersion: "unknown",
      glowTokensVersion: "unknown",
    };
  }
}

/**
 * Load existing history data from JSON file
 * @returns {Object} History data object
 */
function loadHistoryData() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const content = fs.readFileSync(HISTORY_FILE, "utf8");
      return JSON.parse(content);
    }
    return { versions: {} };
  } catch (error) {
    console.warn("Warning: Could not load history file:", error.message);
    return { versions: {} };
  }
}

/**
 * Save history data to JSON file (sorted with latest first)
 * @param {Object} historyData - History data object
 */
function saveHistoryData(historyData) {
  try {
    const MAX_VERSIONS = 75; // Keep last N versions

    // Sort versions with latest first
    const sortedVersions = {};
    const versionKeys = Object.keys(historyData.versions)
      .sort((a, b) => {
        const aParts = a.split(".").map(Number);
        const bParts = b.split(".").map(Number);

        for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
          const aPart = aParts[i] || 0;
          const bPart = bParts[i] || 0;
          if (aPart !== bPart) {
            return bPart - aPart; // Descending order
          }
        }
        return 0;
      })
      .slice(0, MAX_VERSIONS); // Keep only the most recent versions

    // Rebuild with sorted order and retention policy applied
    versionKeys.forEach((version) => {
      sortedVersions[version] = historyData.versions[version];
    });

    const sortedHistoryData = { versions: sortedVersions };
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(sortedHistoryData, null, 2));

    const totalVersions = Object.keys(historyData.versions).length;
    const keptVersions = versionKeys.length;
    const removedVersions = totalVersions - keptVersions;

    console.log(
      `✅ Updated history file (sorted with latest first, keeping ${keptVersions}/${totalVersions} versions)`,
    );
    if (removedVersions > 0) {
      console.log(
        `🗑️ Removed ${removedVersions} old version(s) to maintain ${MAX_VERSIONS} version limit`,
      );
    }
  } catch (error) {
    console.error("Error saving history file:", error.message);
  }
}

/**
 * Find all .mdx files in the components directory (recursively)
 * @returns {string[]} Array of mdx file paths
 */
function findMdxFiles() {
  const mdxFiles = [];

  function searchDirectory(dir) {
    try {
      const files = fs.readdirSync(dir);

      files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // Recursively search subdirectories
          searchDirectory(fullPath);
        } else if (file.endsWith(".mdx") && !file.startsWith("docs-")) {
          // Store relative path from components directory
          const relativePath = path.relative(COMPONENTS_DIR, fullPath);
          mdxFiles.push(relativePath);
        }
      });
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error.message);
    }
  }

  try {
    searchDirectory(COMPONENTS_DIR);
    return mdxFiles;
  } catch (error) {
    console.error("Error reading components directory:", error.message);
    process.exit(1);
  }
}

/**
 * Extract component key from getComponentVersion() call in mdx file
 * @param {string} filePath - Path to the mdx file
 * @returns {string|null} Component key or null
 */
function extractComponentKey(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Look for getComponentVersion("component-key") pattern
    const match = content.match(/getComponentVersion\(["']([^"']+)["']\)/);

    if (match) {
      return match[1]; // Return the component key
    }

    return null;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Find the corresponding .stories.tsx file for a given .mdx file
 * @param {string} mdxFilePath - Path to the mdx file
 * @returns {string|null} Story file path or null
 */
function findStoryFile(mdxFilePath) {
  try {
    const dir = path.dirname(mdxFilePath);
    const baseName = path.basename(mdxFilePath, ".mdx");

    // Look for ComponentName.stories.tsx in the same directory
    const storyFile = path.join(dir, `${baseName}.stories.tsx`);

    if (fs.existsSync(storyFile)) {
      return storyFile;
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Extract the title from a .stories.tsx file
 * @param {string} storyFilePath - Path to the story file
 * @returns {string|null} Story title or null
 */
function extractStoryTitle(storyFilePath) {
  try {
    const content = fs.readFileSync(storyFilePath, "utf8");

    // Look for title: "..." pattern in the story file
    const match = content.match(/title:\s*["']([^"']+)["']/);

    if (match) {
      return match[1];
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Convert story title to Storybook URL
 * @param {string|null} title - Story title
 * @returns {string|null} Storybook URL or null
 */
function titleToStorybookUrl(title) {
  if (!title) return null;

  // Convert "DesignSystem/Components/Button/ActionButtonIcon/Icon"
  // to "designsystem-components-button-actionbuttonicon-icon"
  const kebabCase = title
    .split("/")
    .join("-")
    .toLowerCase()
    .replace(/\s+/g, "-");

  return `?path=/docs/${kebabCase}--docs`;
}

/**
 * Generate component path with optional link
 * @param {string} componentPath - Component path
 * @param {string} file - File path
 * @returns {string} Component path with or without link
 */
function generateComponentPath(componentPath, file) {
  const fullPath = path.join(COMPONENTS_DIR, file);
  const storyFile = findStoryFile(fullPath);

  if (storyFile) {
    const title = extractStoryTitle(storyFile);
    const url = titleToStorybookUrl(title);

    if (url) {
      // Use className instead of class for React/JSX
      return `<a href="${url}" className="storybook-link" data-url="${url}">${componentPath}</a>`;
    }
  }

  // No link if no story file or couldn't extract title
  return componentPath;
}

/**
 * Generate HTML table for the component versions
 * @param {Array} componentData - Array of component data objects
 * @returns {string} HTML table string
 */
function generateHtmlTable(componentData) {
  let table = `<table>
  <thead>
    <tr>
      <th>Component Folder</th>
      <th>Component Linkage</th>
      <th>Version</th>
    </tr>
  </thead>
  <tbody>`;

  componentData.forEach(({ key, version, file, status, emoji, tooltip }) => {
    // Remove .mdx extension and keep the directory path
    const componentPath = file.replace(/\.mdx$/, "");
    const componentPathWithLink = generateComponentPath(componentPath, file);

    // Enhanced status-based styling using emojis and tooltips
    let componentCell = key;
    let versionCell = version;

    // Apply styling based on enhanced status
    switch (status) {
      case "tracked":
        componentCell = `${key}`;
        versionCell = `${version}`;
        break;
      case "untracked":
        componentCell = `<strong>${key}</strong>`;
        versionCell = `${emoji} <strong title="${tooltip}">${version}</strong>`;
        break;
      case "undocumented":
        componentCell = `<strong><em>${key}</em></strong>`;
        versionCell = `${emoji} <strong><em title="${tooltip}">${version}</em></strong>`;
        break;
      case "skipped":
        componentCell = `<span style={{fontStyle: 'italic'}}>-</span>`;
        versionCell = `${emoji} <span title="${tooltip}">${version}</span>`;
        break;
      default:
        // Fallback for legacy statuses
        if (status === "not_found") {
          componentCell = `<strong>${key}</strong> ❌`;
          versionCell = `<strong>Not Found</strong> ❌`;
        } else if (status === "missing") {
          componentCell = `<em>Missing</em> ⚠️`;
          versionCell = `<em>Missing</em> ⚠️`;
        }
    }

    table += `
    <tr>
      <td>${componentPathWithLink}</td>
      <td>${componentCell}</td>
      <td>${versionCell}</td>
    </tr>`;
  });

  table += `
  </tbody>
</table>`;

  return table;
}

/**
 * Basic CSV generation function
 * Generate CSV content for the component versions
 * @param {Array} componentData - Array of component data objects
 * @returns {string} CSV content string
 */
function generateCsv(componentData) {
  let csv = "Component Path,Component,Version\n";

  componentData.forEach(({ version, file }) => {
    // Remove .mdx extension and keep the directory path
    const componentPath = file.replace(/\.mdx$/, "");
    // Get only the last part after the last '/'
    const componentName = componentPath.split("/").pop();
    csv += `"${componentName}","${version}"\n`;
  });

  return csv;
}

/**
 * Update the docs-tokenVersions.mdx file
 * @param {string} htmlTable - HTML table content
 * @param {string} packageVersion - Package version
 * @param {string} glowTokensVersion - Glow tokens version
 */
function updateDocsFile(htmlTable, packageVersion, glowTokensVersion) {
  try {
    const content = fs.readFileSync(DOCS_FILE, "utf8");

    // Find the first --- and replace everything after it
    const firstDashIndex = content.indexOf("---");
    if (firstDashIndex === -1) {
      throw new Error("Could not find --- separator in docs file");
    }

    const beforeDash = content.substring(0, firstDashIndex + 3);

    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleDateString("en-US", { month: "long" })} ${now.getFullYear()}, ${now.toLocaleTimeString("en-US")}`;
    const europeanDate = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()}`;

    const newContent = `${beforeDash}

<p><small><em>Report generated: ${formattedDate}</em></small></p>
<table>
  <thead>
    <tr>
      <th>Package</th>
      <th>Version</th>
      <th>Count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**@odido-portals/glow-react-web**</td>
      <td>${packageVersion}</td>
      <td>${htmlTable.match(/<tr>/g).length - 1}</td>
    </tr>
    <tr>
      <td>**@odido-portals/glow-tokens**</td>
      <td>${glowTokensVersion}</td>
      <td></td>
    </tr>
  </tbody>
</table>

${htmlTable}

##### Component Version Summary

1. ✅ Version - component is documented and has token version<br/><br/>

2. ⚠️ Missing<br/>
  Tooltip: "Component lacks version documentation"<br/>
  Status: Component exists but no version tracking in MDX<br/><br/>

3. ❌ Not Found<br/>
  Tooltip: "Component is documented but can't find token version"<br/>
  Status: Might be a 'typo' or no token version found<br/><br/>

4. ⏭️ Intentionally Skipped<br/>
  Display: "Skipped"<br/>
  Status: Component marked as not part of versioning system<br/>

Use Cases for "skip":
- Build on top of existing components that don't have versioning (yet)
- Wrapper/Layout components that don't have design tokens
- Third-party components not part of your design system
- Deprecated components being phased out
- Documentation-only components

<p><small><em>Report generated: ${formattedDate}</em></small></p>
`;

    fs.writeFileSync(DOCS_FILE, newContent);
    console.log("✅ Updated docs-tokenVersions.mdx");
  } catch (error) {
    console.error("Error updating docs file:", error.message);
  }
}

/**
 * Update the timeline docs file with dropdown functionality
 * @param {string} latestVersion - Latest package version
 * @param {string} latestGlowTokensVersion - Latest glow tokens version
 * @param {Object} historyData - Complete history data
 */
function updateTimelineDocsFile(
  latestVersion,
  latestGlowTokensVersion,
  historyData,
) {
  try {
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleDateString("en-US", { month: "long" })} ${now.getFullYear()}, ${now.toLocaleTimeString("en-US")}`;

    const content = `import { Meta } from '@storybook/blocks';
import { useState, useEffect } from 'react';

<Meta title="Docs/Token Versions/Timeline" />

export const TokenVersionsComponent = () => {
  const [selectedVersion, setSelectedVersion] = useState('${latestVersion}');
  const [historyData, setHistoryData] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch history data from JSON file
    const fetchHistoryData = async () => {
      try {
        // Try relative path first (works in GitHub Pages preview)
        let response = await fetch('./token-versions-history.json');

        // Fallback to root path if relative fails (production hosting)
        if (!response.ok) {
          response = await fetch('/token-versions-history.json');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch token versions history');
        }
        const data = await response.json();
        setHistoryData(data);

        // Check URL parameter on load
        const urlParams = new URLSearchParams(window.location.search);
        const packageParam = urlParams.get('package');
        if (packageParam) {
          const version = packageParam.replace(/_/g, '.');
          if (data.versions[version]) {
            setSelectedVersion(version);
            setCurrentData(data.versions[version]);
            setLoading(false);
            return;
          }
        }

        // Default to latest version
        setCurrentData(data.versions['${latestVersion}']);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  useEffect(() => {
    if (historyData && historyData.versions[selectedVersion]) {
      setCurrentData(historyData.versions[selectedVersion]);
    }
  }, [selectedVersion, historyData]);

  const handleVersionChange = (e) => {
    const newVersion = e.target.value;
    setSelectedVersion(newVersion);

    // Update URL without reload
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('package', newVersion.replace(/\\./g, '_'));
    const newUrl = \`\${window.location.pathname}?\${urlParams.toString()}\`;
    window.history.pushState({}, '', newUrl);
  };

  const generateTable = (versionData) => {
    if (!versionData || !versionData.componentData) return null;

    return (
      <table>
        <thead>
          <tr>
            <th>Components</th>
            <th>Component Linkage</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {versionData.componentData.map((item, index) => {
            const { key, version, file, status, emoji, tooltip } = item;
            const componentPath = file.replace(/\\.mdx$/, "");

            let componentCell = key;
            let versionCell = version;

            switch (status) {
              case "tracked":
                componentCell = key;
                versionCell = version;
                break;
              case "untracked":
                componentCell = <strong>{key}</strong>;
                versionCell = <span><strong title={tooltip}>{emoji} {version}</strong></span>;
                break;
              case "undocumented":
                componentCell = <strong><em>{key}</em></strong>;
                versionCell = <span><strong><em title={tooltip}>{emoji} {version}</em></strong></span>;
                break;
              case "skipped":
                componentCell = <span style={{fontStyle: 'italic'}}>-</span>;
                versionCell = <span title={tooltip}>{emoji} {version}</span>;
                break;
            }

            return (
              <tr key={index}>
                <td>{componentPath}</td>
                <td>{componentCell}</td>
                <td>{versionCell}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  if (loading) return <div>Loading token versions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentData) return <div>No data available</div>;

  // Create version options for dropdown
  const versionOptions = Object.keys(historyData.versions)
    .map((version) => (
      <option key={version} value={version}>
        v{version}{version === '${latestVersion}' ? ' (latest)' : ''}
      </option>
    ));

  return (
    <div>
      <h3>Versions Timeline</h3>
      <div style={{marginBottom: '20px'}}>
        <details style={{marginBottom: '20px', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '4px'}}>
          <summary style={{cursor: 'pointer', fontWeight: 'bold'}}>
            📋 Information
          </summary>
          <div style={{paddingLeft: '10px'}}>
            <p><em><strong>Note:</strong> This is a <strong>version history timeline</strong> only.
            Changing the dropdown version shows historical data but does <strong>NOT</strong> change the actual component versions in Storybook.</em></p>
            <p>You can link to a specific version with a URL <strong>parameters</strong>, like: <code>&package=0_90_0</code></p>
            <p><strong>Generation and Repository Commit Workflow</strong></p>
            <p>When you update component version, by using <code>pnpm run changeset:version</code> both the package version and this Token Version History will be generated.</p>
            <p>If you need to update the timeline manually for testing or development: <code>pnpm run generate-versions --only-timeline</code></p>
          </div>
        </details>

        <p>Select a package version to view its component history.</p>
        <label htmlFor="version-select" style={{marginRight: '10px', fontWeight: 'bold'}}>
          Select Package Version:
        </label>
        <select
          id="version-select"
          value={selectedVersion}
          onChange={handleVersionChange}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        >
          {versionOptions}
        </select>
      </div>

      <p><small><em>Report generated: {currentData.generatedDate}</em></small></p>

      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Version</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>@odido-portals/glow-react-web</strong></td>
            <td>{selectedVersion}</td>
            <td>{currentData.componentCount}</td>
          </tr>
          <tr>
            <td><strong>@odido-portals/glow-tokens</strong></td>
            <td>{currentData.glowTokensVersion}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {generateTable(currentData)}

      <h5>Component Version Summary</h5>

      <p>1. ✅ Version - component is documented and has token version<br/></p>
      <p>2. ⚠️ Missing<br/>
        Tooltip: "Component lacks version documentation"<br/>
        Status: Component exists but no version tracking in MDX<br/></p>
      <p>3. ❌ Not Found<br/>
        Tooltip: "Component is documented but can't find token version"<br/>
        Status: Might be a 'typo' or no token version found<br/><br/></p>

      <p>4. ⏭️ Intentionally Skipped<br/>
        Display: "Skipped"<br/>
        Status: Component marked as not part of versioning system<br/></p>

      <p><strong>Use Cases for "skip":</strong></p>
      <ul>
        <li>Build on top of existing components that don't have versioning (yet)</li>
        <li>Wrapper/Layout components that don't have design tokens</li>
        <li>Third-party components not part of your design system</li>
        <li>Deprecated components being phased out</li>
        <li>Documentation-only components</li>
      </ul>

      <p><small><em>Report generated: {currentData.generatedDate}</em></small></p>
    </div>
  );
};

<TokenVersionsComponent />
`;

    fs.writeFileSync(TIMELINE_DOCS_FILE, content);
    console.log(
      "✅ Updated docs-tokenTimeline.mdx with dropdown functionality",
    );
  } catch (error) {
    console.error("Error updating timeline docs file:", error.message);
  }
}

/**
 * Enhanced 4-state component status detection function
 * @param {string|null} extractedKey - Component key extracted from MDX
 * @param {Object} componentVersions - Component versions object
 * @returns {Object} Enhanced component status object
 */
function getEnhancedComponentStatus(extractedKey, componentVersions) {
  const hasCodeInMdx = extractedKey !== null;
  const foundInTokens = extractedKey
    ? extractedKey in componentVersions
    : false;

  // State 1: Intentionally Skipped (check first)
  if (hasCodeInMdx && extractedKey === "skip") {
    return {
      status: "skipped",
      version: "Skipped",
      displayKey: "skip",
      emoji: "⏭️",
      tooltip: "Component intentionally excluded from versioning",
    };
  }

  // State 2: Found & Tracked (perfect state)
  if (hasCodeInMdx && foundInTokens) {
    return {
      status: "tracked",
      version: componentVersions[extractedKey],
      displayKey: extractedKey,
      emoji: "✅",
    };
  }

  // State 3: Documented but Untracked ❌ ⚠️
  if (hasCodeInMdx && !foundInTokens) {
    return {
      status: "untracked",
      version: "Not Found",
      displayKey: extractedKey,
      emoji: "❌",
      tooltip:
        "Component is documented but can't find token version, check for typos.",
    };
  }

  // State 4: Undocumented (!hasCodeInMdx)
  return {
    status: "undocumented",
    version: "Missing",
    displayKey: "Missing",
    emoji: "⚠️",
    tooltip: "Component lacks version documentation",
  };
}

/**
 * Main function
 */
function main() {
  console.log("🚀 Generating token versions...\n");

  // Validate flag combinations
  if (onlyTimeline && onlyCurrent) {
    console.error(
      "❌ Error: Cannot use both --only-timeline and --only-current flags together",
    );
    process.exit(1);
  }

  // Show mode information
  if (onlyTimeline) {
    console.log("🕒 Mode: Timeline generation only (for changeset:version)\n");
  } else if (onlyCurrent) {
    console.log("📄 Mode: Current version documentation only\n");
  } else {
    console.log("🔄 Mode: Full generation (current docs + timeline)\n");
    console.warn(
      "⚠️  Warning: Use flag `--only-timeline` for History or `--only-current` for the latest version only\n",
    );
    process.exit(1);
  }

  if (includeUnknowns) {
    console.log(
      "📋 Including unknown components (use --no-unknowns to exclude them)\n",
    );
  } else {
    console.log(
      "📋 Excluding unknown components (default behavior includes them)\n",
    );
  }

  // Load component versions from TempTokenVersions.js
  const componentVersions = loadComponentVersions();
  console.log(
    `📦 Loaded ${Object.keys(componentVersions).length} component versions`,
  );

  // Load package versions
  const { packageVersion, glowTokensVersion } = loadPackageVersions();
  console.log(`📋 Package version: ${packageVersion}`);
  console.log(`📋 Glow tokens version: ${glowTokensVersion}`);

  // Load existing history
  const historyData = loadHistoryData();
  console.log(
    `📚 Loaded history with ${Object.keys(historyData.versions).length} previous versions`,
  );

  // Find all .mdx files
  const mdxFiles = findMdxFiles();
  console.log(`📄 Found ${mdxFiles.length} .mdx files\n`);

  // Extract component keys and match to versions using enhanced logic
  const componentData = [];
  const notFound = [];
  const skipped = [];
  const untracked = [];

  mdxFiles.forEach((file) => {
    const filePath = path.join(COMPONENTS_DIR, file);
    const componentKey = extractComponentKey(filePath);

    // Use enhanced status detection
    const statusResult = getEnhancedComponentStatus(
      componentKey,
      componentVersions,
    );

    // Always add to componentData if includeUnknowns or if it's a good status
    if (
      includeUnknowns ||
      statusResult.status === "tracked" ||
      statusResult.status === "skipped"
    ) {
      componentData.push({
        key: statusResult.displayKey,
        version: statusResult.version,
        file,
        status: statusResult.status,
        emoji: statusResult.emoji,
        tooltip: statusResult.tooltip,
      });
    }

    // Log results with enhanced emojis and categorize
    switch (statusResult.status) {
      case "tracked":
        console.log(
          `${statusResult.emoji} ${file}: ${statusResult.displayKey} → ${statusResult.version}`,
        );
        break;
      case "skipped":
        skipped.push({ file, key: componentKey });
        console.log(
          `${statusResult.emoji} ${file}: ${componentKey} → INTENTIONALLY SKIPPED`,
        );
        break;
      case "untracked":
        untracked.push({ file, key: componentKey });
        console.log(
          `${statusResult.emoji} ${file}: ${componentKey} → DOCUMENTED BUT UNTRACKED`,
        );
        break;
      case "undocumented":
        console.log(
          `${statusResult.emoji} ${file}: No getComponentVersion() found`,
        );
        break;
    }
  });

  // Sort by component path for consistent output
  componentData.sort((a, b) => a.file.localeCompare(b.file));

  // Generate HTML table and CSV
  const htmlTable = generateHtmlTable(componentData);
  // Uncomment to see CSV output in console
  // const csvContent = generateCsv(componentData);

  // Output enhanced results
  console.log("\n📊 Enhanced Results:");
  console.log(
    `✅ Tracked: ${componentData.filter((c) => c.status === "tracked").length}`,
  );
  console.log(`⏭️ Skipped: ${skipped.length}`);
  console.log(`⚠️ Untracked: ${untracked.length}`);
  console.log(
    `❌ Undocumented: ${componentData.filter((c) => c.status === "undocumented").length}`,
  );

  if (skipped.length > 0) {
    console.log("\n⏭️ Components intentionally skipped:");
    skipped.forEach(({ file, key }) => {
      console.log(`   ${file}: ${key}`);
    });
  }

  if (untracked.length > 0) {
    console.log("\n⚠️ Components documented but untracked:");
    untracked.forEach(({ file, key }) => {
      console.log(`   ${file}: ${key}`);
    });
  }

  // Uncomment to see CSV output in console
  // console.log("\n📋 CSV Output (for Excel):");
  // console.log("----------------------------------------");
  // console.log(csvContent);
  // console.log("----------------------------------------");

  // Conditionally update files based on flags
  console.log("\n📁 Generated files:");

  if (onlyCurrent) {
    // Generate current version docs (default behavior unless --only-timeline)

    updateDocsFile(htmlTable, packageVersion, glowTokensVersion);
    console.log(`   📄 docs-tokenVersions.mdx (current version)`);
  }

  if (onlyTimeline) {
    // Generate timeline docs (default behavior unless --only-current)

    // Save current version to history
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleDateString("en-US", { month: "long" })} ${now.getFullYear()}, ${now.toLocaleTimeString("en-US")}`;

    historyData.versions[packageVersion] = {
      glowTokensVersion,
      generatedDate: formattedDate,
      componentCount: componentData.length,
      componentData: componentData,
      timestamp: now.toISOString(),
    };

    // Save updated history (sorted with latest first)
    // History file is always updated (needed for timeline functionality)
    saveHistoryData(historyData);
    console.log(
      `   📊 token-versions-history.json (complete history, latest first)`,
    );

    updateTimelineDocsFile(packageVersion, glowTokensVersion, historyData);
    console.log(
      `   📄 docs-tokenTimeline.mdx (interactive timeline with dropdown)`,
    );
  }

  console.log("\n🎉 Done!");
}

// Run the script
main();
