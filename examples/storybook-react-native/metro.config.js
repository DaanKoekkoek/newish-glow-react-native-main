const { generate } = require("@storybook/react-native/scripts/generate");
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

generate({
  configPath: path.resolve(projectRoot, "./.storybook-rn"),
  useJs: true,
});

const defaultConfig = getDefaultConfig(projectRoot);

// SB requires a node_modules look up since dependencies liek expo-asset (which is used to make .png's or other files importable).
// Without this, SB will fail to run. For context: https://github.com/expo/expo/issues/24870
defaultConfig.resolver.disableHierarchicalLookup = true;

// Enable require.context for Storybook
defaultConfig.transformer.unstable_allowRequireContext = true;
defaultConfig.resolver.unstable_enablePackageExports = true;
defaultConfig.resolver.disableHierarchicalLookup = true;
defaultConfig.resolver.unstable_conditionNames = [
  "@odido-portals/glow-react-native",
  "@odido-portals/glow-tokens",
  "@odido-portals/glow-icon",
];

// Watch folders and node_modules resolution
defaultConfig.watchFolders = [monorepoRoot];
defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// Add aliases
defaultConfig.resolver.extraNodeModules = {
  components: path.resolve(
    monorepoRoot,
    "packages/react-native/src/components",
  ),
  foundations: path.resolve(
    monorepoRoot,
    "packages/react-native/src/foundations",
  ),
  "_global-hooks": path.resolve(
    monorepoRoot,
    "packages/react-native/src/_hooks/index",
  ),
  "_test-utils": path.resolve(
    monorepoRoot,
    "packages/react-native/src/_test-utils/index",
  ),
  ".examples": path.resolve(
    monorepoRoot,
    "packages/react-native/src/.examples/",
  ),
  _utility: path.resolve(
    monorepoRoot,
    "packages/react-native/src/_utility/index",
  ),
  _internals: path.resolve(
    monorepoRoot,
    "packages/react-native/src/_internals/",
  ),
  _theming: path.resolve(monorepoRoot, "packages/react-native/src/_theming/"),
};

// Allow image files to be bundled
defaultConfig.transformer.assetPlugins = ["expo-asset/tools/hashAssetFiles"];

// Ensure images like .png are handled properly
defaultConfig.resolver.assetExts.push("png");

module.exports = defaultConfig;
