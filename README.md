# Glow React Native

## Development

## Prerequisites

- node 20 LTS (also specified in package.json `engines.node`).

pnpm is the package manager of choice for its speed. A option for installation is via `corepack` (which uses the package.json `packageManager` to pin the installed version).

```sh
corepack enable pnpm
```

[note if you used brew to install node](https://pnpm.io/installation#using-corepack):

## Troubleshooting

### pnpm or node version errors

if you are getting errors with your node version or pnpm version when running pnpm commands. check that you are running the correct versions against `package.json` `engines`

### Cocopod installation errors

Make sure your not running a version of cocopods which is considered unstable (1.15.0 being an example).

`pod --version`

if you are using the version of ruby that ships with OSX you can do the following:

```sh
# Uninstall all versions of CocoaPods without prompting for confirmation
gem uninstall cocoapods --all --executables --ignore-dependencies -a -I
```

To avoid needing `sudo` for installing and updating **Cocopods** Add the following to your `~/.zprofile` or `~/.bash_profile` depending on your setup. [reference](https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation)

```sh
export GEM_HOME=$HOME/.gem
export PATH=$GEM_HOME/bin:$PATH
```

install the latest stable version

`gem install cocoapods -v 1.15.2`

### Upgrading dependencies, react methods not found

This is probably caused by multiple version of one of the following dependencies existing

```json
react": "18.3.1",
react-dom": "18.3.1",
react-native": "0.74.3"
```

you can use `pnpm why <package-name> -r` to print a list of all instances of a package in the monorepo and see why its being installed. _e.g. The resulting tree can be daunting but searching over your terminal for `react 1` vs `react 18.3.1` should not result in different number of results._. You can then use `pnpm.overrides`, in the root `package.json`, to force a specific version to see if it fixes it. for example:

```json
...
"pnpm": {
    "overrides": {
      // this will apply to all workspaces installing this dep directly or transitively
      "react-docgen-typescript": "2.2.2",
      // this will only override `@odido-portals/glow-icon` transitive react dependency.
      "@odido-portals/glow-icon>react": "18.3.1",
   },
```

also take not of monorepo wide package version specification in the `pnpm-workspace.yaml` `catalog` this will not override transitive dependencies though, which is why you would need to use pnpm.overrides to identify issues.

### Generate a component

With this command you can simplify the creation of new components by generating a consistent file structure and templates for each component.
It creates the necessary files based on predefined templates.

To generate a new component, run the following command:

```sh
pnpm plop component
```

The generated files will be placed in `src/components/<ComponentName>/` and populated with boilerplate code based on the templates located in `packages/react-native/templates/.

### Icons

The package `@odido-portals/glow-icon` is used to import the assets of the icons. The icons are setup as fonts.

## Usage

To use this component library in your applicaiton make sure you have access to the private Azure NPM registery. If not create a `.npmrc` file with the following settings:

**IMPORTANT**: The React Native component library uses [Unistyles](https://reactnativeunistyles.vercel.app/). It includes custom native code, which means it does NOT support Expo Go.

1. If you are not using prebuild for development, run the following command `npx expo prebuild --clean` to create a prebuild (for Andorid and iOS). Make you have installed [Android Studio](https://developer.android.com/studio) and [XCode](https://developer.apple.com/xcode/)

2. Install the package: `npm install @odido-portals/glow-react-native`

3. Add these two compilerOptions in tsconfig.json (compilerOptions)

   ```js
   "module": "NodeNext",
   "moduleResolution": "NodeNext",
   ```

4. Make sure you import the styling first in your main file (for example App.tsx)

   ```js
   import "@odido-portals/glow-react-native/theme/odido";
   ```

5. In your `metro.config.js` make sure you add the following configuration:

   ```js
   config.resolver.unstable_enablePackageExports = true;
   ```

   _if you don't have a `metro.config.js` file yet, create one to customize the configuration for your Expo application:_ `npx expo customize metro.config.js`

6. To use a component simply import it:

   ```js
   import { Button } from "@odido-portals/glow-react-native";

   <Button
     onPress={() => {
       console.log("Hi console! 👋");
     }}
   >
     Hello There!
   </Button>;
   ```

## How to release?

When you create a new branch run the command `pnpm run changeset`. This will create a temporary changelog in the `.changeset` directory. When done with development run the command `pnpm run changeset:version`.

## Technology

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Changesets](https://github.com/changesets/changesets) a tool to manage versioning and changelogs

## Storybook

This repository has an storybook app which can be found in the examples/storybook-react-native folder.

From the main folder you can run the commands: `storybook:*`, `storybook:grn-ios-android`, `storybook:grn-ios`. This will spin up a browser version of the storybook stories or a android or ios app with storybook in it.

'\*' can be either `grn` or `grw`.

## Testing on Consumer App (NextJs)

Glow react native is exporting a jest-preset for testing on the consumer app. To use it, add the following to your `jest.config.js`:

```js
module.exports = {
  preset: "@odido-portals/glow-react-native",
};
```

This preset is using babel to transform the code, so make sure you have the following dependencies installed:

```bash
pnpm add --save-dev babel-jest babel-plugin-react-native-web jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/dom
```

then add the following to your `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [["react-native-web", { commonjs: true }]],
  };
};
```

**IMPORTANT**: Make sure you are using `@odido-portals/glow-icon` version `0.3.2` or above

## Mocked components generation

There is a [script](./packages/react-native/utils/generateMockComponents.ts) that generate a mocked components for every builded component from 'react-native' package. First you need to build react-native package 'pnpm run grn:build'. Then you can run generateMockComponents.ts with npm command `pnpm run build:mock-components`. You will get new components in output folder, that could be set in [generateMockComponents.ts](./packages/react-native/utils/generateMockComponents.ts) file.

<!-- ---------------------------------------------------------------------------------------  -->

## Token Versioning: Generation Script for React Web

See the readme of the React Web package for details on the token versioning generation script:
[Token Versions Generation Script](./packages/glow-react-web/README.md)
