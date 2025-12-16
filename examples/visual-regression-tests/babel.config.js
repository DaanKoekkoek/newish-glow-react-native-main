module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // This is not needed as vrt is using the bundled version of the library
    // plugins: ["react-native-reanimated/plugin"],
  };
};
