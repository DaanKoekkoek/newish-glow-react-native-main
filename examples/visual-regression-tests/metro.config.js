const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = path.resolve(projectRoot, "../..");

const defaultConfig = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
defaultConfig.watchFolders = [monorepoRoot];
// 2. Let Metro know where to resolve packages and in what order
defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// Enable package exports, we use these in the glow-tokens repo package.json
defaultConfig.resolver.unstable_enablePackageExports = true;
// Disable hierarchical lookup, this prevents in node_modules outside those
// specified in nodeModulesPaths above
defaultConfig.resolver.disableHierarchicalLookup = true;

// react-native-owl assumes a conventional project structure and node_modules
// location when it tries to import your project's entrypoint. We need to help
// it find the correct path since we are using a monorepo.
defaultConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName === "../../../../index" &&
    context.originModulePath.includes(
      "node_modules/react-native-owl/dist/client/index.app.js",
    )
  ) {
    // override the modulename, helping Metro find its way to the root of the project
    moduleName = `${projectRoot}/index`;
  }
  // Call the default resolver (with the overridden moduleName if applicable)
  return context.resolveRequest(context, moduleName, platform);
};

// Allow image files to be bundled
defaultConfig.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];

// Ensure images like .png are handled properly
defaultConfig.resolver.assetExts.push("png");

module.exports = defaultConfig;
