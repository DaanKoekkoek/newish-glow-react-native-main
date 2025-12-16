# Glow-React-Web

This is a React web driven design system which can be consumed by every React web app.

## CSS & SCSS

The CSS is included in the components and the styles are optimized for tree shaking. The styling can be done with css or scss modules.

## ⏺️ Bundling

We use [Vite](https://vite.dev/guide/) for bundling the library, which is using [rollup.js](https://rollupjs.org/) under the hood. There are some additional plugins added:

```tsx
import react from "@vitejs/plugin-react"; // Adds support for React JSX.
import dts from "vite-plugin-dts"; // Generates type definitions for the library.
import { libInjectCss } from "vite-plugin-lib-inject-css"; // Injects the css in the components and also optimizes it for tree shaking
copy({
  targets: [
    {
      src: "./lib/assets/fonts",
      dest: "./dist/assets",
    },
  ],
}), // Copy the assets folder to the dist folder.
```

To make sure that the copied assets do not get removed before the build and bundling is taking place we set the `emptyOutDir: false` in the `vite.config.ts`. But we DO cleanup the dist folder before we build by running the `rm -rf ./dist` that is located in the build script `pnpm build`.

## ⏺️ Utility dependencies

### Classnames

A simple JavaScript utility for conditionally joining [classNames](https://www.npmjs.com/package/classnames) together. We aligned that our preference is to import the default exported utility of this library specifically named as we do in the example below.

```
import classNames from 'classnames';
```

### Radix

The react [radix-ui](https://www.radix-ui.com/) components seem to require the "use client" flag inside Next.JS. You can find more about the 'use client' flag and client-components [here](#nextjs-client-components). This is not a Radix specific issue, but with all React based libraries.

### Motion

The react [motion/react](https://motion.dev/docs/react-motion-component#usage) animation library seem to require the "use client" flag inside Next.JS on the level of the component. You can find more about the 'use client' flag and client-components [here](#nextjs-client-components).

Motion states it's components are fully compatible with server-side rendering, meaning the initial state of the component will be reflected in the server-generated output. Exception: some SVG attributes like transform which require DOM measurements to calculate are not SSR friendly. But it requires a special way of importing the package inside your files, `import * as motion from "motion/react-client";` This can be confusing during development process. Because it's really easy to import it in the generic way, like `import { motion } from "motion/react"`.

_NOTE_: Motion needs to be installed as a peer dependency in the application that is consuming the `@odido-portals/glow-react-web` package.

## ⏺️ Next.JS client-components

Components with the ["use client"](https://nextjs.org/docs/app/building-your-application/rendering/client-components) directive are pre-rendered on the Next.JS server but require client-side hydration to become interactive. This means Next.JS must send some JavaScript to the client, increasing bundle size with each additional client component. Whenever possible, prefer server components, which means avoiding React hooks. However, in some cases, using a hook is the right choice. Optimize for server components where feasible, but don’t force it unnecessarily.

## ⏺️ Using the component library

### Components

We have two type of components `foundations` and `components`. The foundations are the components that are often used as foundation for other components. Both type of components have their own folder.

Typically a components has it's own folder. See below an overview of how a folder would look like:

```
Icon.mdx // This file will be read by Storybook and is used for documenting the component and its functionalities.
Icon.module.css // CSS classes and their styles, will be imported in Icon.tsx
Icon.Stories.tsx // This file will be read by Storybook and is used to generate a component playground to showcase all it's functionalities.
Icon.test.tsx // Unit tests. All the functional properties of the components need to be tested.
Icon.tsx // The components functionality and logic.
Icont.typs.ts // All the component related types, will be imported in Icon.tsx.
index.tsx // To expose and export the logic and functionality. We only export the things that need to be consumed.
```

We need to export the components to make sure the components can be consumed by other packages. You can do that as such:

```
// Package.json
{
  // other configurations
  "exports": {
    "./badge": "./dist/components/Badge/index.js", // General components
    "./icon": "./dist/foundations/Icon/index.js" // Foundations
  }
  // other configurations
}
```

**NOTE**:
We do this explicit in this way to make sure the consuming applications will not clutter the dependencies that are imported in the components (for example react hooks like `useEffect`, `useState`, etc.). This is crucial for usage inside server side rendered applications. Otherwise all the components need to be imported as Client Components and in that way we can't monetize all the benefits of Server Components.

### Building

From the root of the library folder. In this case from `glow-react-native/packages/glow-react-web` you run the following command:

`pnpm build`

The output folder is `dist`.

### Packing

For local development you can package the component library. From the root of the library folder. In this case from `glow-react-native/packages/glow-react-web` you run the following command:

`pnpm pack`

This command will pack your latest build. So make sure you first run the build command before you run the pack command.

This wil generate a file `odido-portals-glow-react-web-0.0.0.tgz` in the root of the folder. This file can be installed on the consuming side by referencing the path.

### Installing

To install to a consuming app that is not part of this mono repo you can just run:

```
npm install @odido-portals/glow-react-web

// or

pnpm add @odido-portals/glow-react-web
```

_NOTE 1_: To install the package from within an external package your consuming github repository needs to be added to the the allowlist of the consuming parties. You can request this access with a Github user that has the admin role for the [https://github.com/odido-portals/](https://github.com/odido-portals/) domain.
_NOTE 2_: At this moment 21-01-2025, this package is not registered as a NPM package.

OR

To install the library from within this mono repo you can add the following line to the `package.json` file located under the dependencies object `"@odido-portals/glow-react-web": "workspace:*"`.

_NOTE_: The package needs to be built inside the `./packages/glow-react-web` folder.

This can be done by running the following command from the root of this mono repo:

`pnpm grw:build`

OR

If you locally packed the package as described above then you can install the component library from the root of the consuming folder. In this case from `glow-react-native/examples/nextjs-web-ds` you run the following command:

`pnpm add ../../packages/glow-react-web/odido-portals-glow-react-web-0.0.0.tgz --force`

The `--force` flag will make sure that it's not using a cached version. `pnpm` is caching a lot of stuff which will makes installing a lot faster. But between versions you want to make sure it's not using any cached files. Otherwise you end up without the your latest changes.

## ⏺️ Consuming

### Components

Import the components from the library:

```tsx
export {
  Button,
  type BaseButtonProps,
  BaseButton,
} from "@odido-portals/glow-react-web/button";
export { Badge, type BadgeProps } from "@odido-portals/glow-react-web/badge";
import { Icon } from "@odido-portals/glow-react-web/icon";
```

All the components are intended to make use of CSS variables which are composed with design tokens. To make sure the components are functioning well, the tokens need to installed via the `@odido-portals/glow-tokens` dependency.

#### Fonts

Import the fonts from the library on root / app level of your consuming application. You import the font that is related to the brand, which can be Odido, Ben or Simpel. Make sure you only the import the fonts of the brand that you need to consume. For Storybook this is probably all three of them. For an application it is likely to only be one of them.

Example:

```tsx
// Required to be imported at root/app level
// In a next.js application, the file for importing them will be src/app/layout.tsx
// In a react application, the file for importing them will be src/app.tsx

import "@odido-portals/glow-react-web/global-tokens.css";
import "@odido-portals/glow-react-web/odido-light-tokens.css";
import "@odido-portals/glow-react-web/odido-icon-fonts.css";
import "@odido-portals/glow-react-web/odido-fonts.css";
```

#### Glows (SVG Backgrounds)

Some components (such as backgrounds, gradients, or hover transitions) make use of _Glow_ SVG assets, typically served from `/glow/` inside your app's public directory.

To prevent a brief flicker when switching between glow variants (e.g., `glow-1-light` → `glow-1-dark` on hover), it’s recommended to **prefetch** these SVGs in your root layout or HTML `<head>`.

Example for Next.js:

```tsx
<head>
  {["dark", "light"].map((theme) =>
    [1, 2, 3, 4].map((i) => (
      <link
        key={`${theme}-${i}`}
        rel="prefetch"
        as="image"
        href={`/glow/glow-${i}-${theme}.svg`}
        type="image/svg+xml"
      />
    )),
  )}
</head>
```

All available Glow SVGs are included in the npm package under:

```text
@odido-portals/glow-react-web/public/glow
```

#### Tokens

The tokens need to be imported from library on application level to make sure the components can access the right styling values.

```tsx
import "@odido-portals/glow-react-web/global.css";
import "@odido-portals/glow-react-web/odido-light.css";
```

In root index file `index.html`, in <html> tag need to be added data-theme tag related to import tokens for theme `data-theme="data-theme-value"`.

<!-- ---------------------------------------------------------------------------------------  -->

## ⏺️ Token Versions Generation Script

The [`.scripts/generate-token-versions.js`](./.scripts/generate-token-versions.js) script automatically generates documentation for component token versions and maintains a historical timeline. This script is crucial for tracking design token compatibility across component versions in Storybook.

### Purpose

- **History Timeline**: Creates interactive Storybook documentation showing current and historical versions
- **Components Versions**: Maps each component to its corresponding design token version with links to each component.

### How It Works

The script scans all `.mdx` files in `packages/glow-react-web/lib/components/` looking for `getComponentVersion("component-key")` calls, then matches these keys against the token versions from `@odido-portals/glow-tokens` and generates a table that can be viewed in Storybook.

#### During Release Workflow (Automatic)

After running `pnpm run changeset:version`, the script automatically updates the timeline to include the new package version and its components. This can be committed to the repository.

```bash
pnpm run changeset:version
# Automatically runs: pnpm exec changeset version && pnpm run generate-versions --only-timeline
```

#### Manual Generation

```bash
# Generate only current version documentation
pnpm run generate-versions --only-current

# Generate only timeline history (for releases)
pnpm run generate-versions --only-timeline

# Edge cases to exclude unknown/undocumented components
pnpm run generate-versions --no-unknowns
```

### Available Flags

| Flag              | Description                     | Use Case                     |
| ----------------- | ------------------------------- | ---------------------------- |
| `--only-current`  | Generate only current docs      | Manual documentation updates |
| `--only-timeline` | Generate only timeline files    | Release workflows (faster)   |
| `--no-unknowns`   | Exclude undocumented components | Clean output for production  |

### Generated Files

1. **`docs-tokenVersions.mdx`** - Current version documentation with component status table
2. **`docs-tokenTimeline.mdx`** - Interactive timeline with version dropdown for historical tracking
3. **`token-versions-history.json`** - Complete version history data (keeps last 75 versions)

### Component Status Types

The script identifies four component states:

1. **✅ Tracked** - Component documented with valid token version
2. **⚠️ Missing** - Component exists but lacks version documentation
3. **❌ Not Found** - Component documented but token version doesn't exist (check for typos)
4. **⏭️ Skipped** - Component intentionally excluded (use `getComponentVersion("skip")`)

## ⏺️ Token Versions Generation - Developer Workflow

### Adding Token Version to Component

In your component's `.mdx` file, add:

```jsx
import { getComponentVersion } from '../path/to/tokenUtils';

## Token Version
Current version: {getComponentVersion("your-component-key")}
```

#### Skipping Components from Versioning

For components that don't need versioning (wrappers, deprecated, etc.):

```jsx
{
  getComponentVersion("skip");
}
```

<!-- ---------------------------------------------------------------------------------------  -->

## ⏺️ Adding Status Labels to Components in Storybook

We use the `@etchteam/storybook-addon-status` to add status labels to our components. The available statuses are:

### Custom statuses:

- `uxPassed`: Passed UX review
- `qaPassed`: Quality Assurance check passed
- `devReviewed`: Development is done and code has been reviewed
- `fresh`: This component is fresh and new
- `v1`
- `v2`

### Built-in statuses:

- `beta`
- `stable`
- `deprecated`
- `releaseCandidate`

**Usage:**

To add a `status` label to a component, include the status parameter in the `parameters` object of your component's `Meta` definition in the `componentName.stories.tsx` file.

All types. URL is optional:

```tsx
parameters: {
  status: {
    type: [
      "uxPassed",
      "qaPassed",
      "fresh",
      "v1",
      "v2",
      "beta",
      "stable",
      "deprecated",
      {
        name: "releaseCandidate",
        url: "http://www.odido.nl/",
      },
    ],
  },
}
```

### Generate Report on Statuses

You can generate a report on the statuses of your components using a Python script.

**Usage:**

Run the following command to run the script:

```
pnpm grw:status-report
```

The script will generate an HTML report and save it to the following location:
`.scripts/reports/grw_status_report.html`
