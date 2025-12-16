#!/usr/bin/env bash

# based on https://docs.expo.dev/troubleshooting/clear-cache-macos-linux/#react-native-cli-and-npm
set -e

echo "0. Clear the library dist folder ===>"
rm -rf packages/react-native/dist

# rm -rf node_modules
echo "1. Clear all of the dependencies of your project ===>"
# print node modules to delete
find . -name 'node_modules' -type d -prune
# delete node modules
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +

echo "2. Clear the global pnpm store (cache) ===>"
pnpm store prune

echo "3. Reinstall all dependencies ===>"
echo "Be aware that 'pnpm install' updates the lockfile by default. Passed '--frozen-lockfile' to prevent this."
# Install dependencies without updating the lockfile
pnpm install --frozen-lockfile
echo "4. Reset the watchman file watcher ===>"
(watchman watch-del-all) || echo "No Watchman: skipping"

echo "5. Clear the given packager/bundler cache file or directory ===>"
echo "Clear the given packager/bundler cache file or directory:"
# Check and remove cache files if they exist
if ls "$TMPDIR/haste-map-"* "$TMPDIR/metro-cache" &>/dev/null; then
    count=$(ls "$TMPDIR/haste-map-"* "$TMPDIR/metro-cache" 2>/dev/null | wc -l | xargs)
    echo "Removing $count files"
    rm -rf "$TMPDIR/haste-map-"* "$TMPDIR/metro-cache"
else
    echo "No cache files found to remove."
fi

echo "clean done!"
