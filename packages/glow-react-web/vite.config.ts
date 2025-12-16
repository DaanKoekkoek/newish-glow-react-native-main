import react from "@vitejs/plugin-react";
import { glob } from "glob";
import { fileURLToPath } from "node:url";
import { extname, relative, resolve } from "path";
import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { peerDependencies } from "./package.json";
import sass from "sass";
import path from "path";
import svgr from "vite-plugin-svgr";

const GLOW_TOKEN_CSS_FILES = [
  "global.css",
  "odido-light.css",
  "odido-dark.css",
  "ben-light.css",
  "ben-dark.css",
  "simpel-light.css",
  "simpel-dark.css",
];

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@internals": resolve(__dirname, "lib/_internals"),
      "@components": resolve(__dirname, "lib/components"),
      "@foundations": resolve(__dirname, "lib/foundations"),
      "@globals": resolve(__dirname, "lib/_globals"),
      "@storybook/utils": resolve(__dirname, ".storybook/utils"),
      _utility: resolve(__dirname, "lib/_utility"),
      _internals: resolve(__dirname, "lib/_internals"),
      _theming: resolve(__dirname, "lib/_theming"),
      "_global-hooks": resolve(__dirname, "lib/_hooks"),
      ".examples": resolve(__dirname, "lib/_utility"),
      utilities: resolve(__dirname, "lib/utilities"),
      components: resolve(__dirname, "lib/components"),
      foundations: resolve(__dirname, "lib/foundations"),
    },
  },
  plugins: [
    svgr(), // Enables SVGs to be imported as React components. Useful when you want to embed raw .svg files directly in JSX and control attributes via props.
    react(), // Adds support for React JSX.
    libInjectCss(), // Injects the css in the components and also optimizes it for tree shaking
    viteStaticCopy({
      targets: [
        ...GLOW_TOKEN_CSS_FILES.map((item) => ({
          src: `node_modules/@odido-portals/glow-tokens/dist/css-variables/${item}`,
          dest: "./assets",
        })),
        {
          src: "public/glow/**/*",
          dest: "public/glow",
        },
      ],
    }),
    copy({
      targets: [
        {
          src: "./lib/assets/fonts",
          dest: "./dist/assets",
        },
      ],
    }), // Copy the assets folder to the dist folder.
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        includePaths: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "lib/_globals"),
        ],
      }, // Compiles SCSS into CSS and creates a reference point towards the node_module scss token.
    },
  },
  build: {
    copyPublicDir: false, // Do not copy the public directory to the output directory.
    lib: {
      entry: [
        resolve(__dirname, "lib/assets/odido-fonts.css"),
        resolve(__dirname, "lib/assets/ben-fonts.css"),
        resolve(__dirname, "lib/assets/simpel-fonts.css"),
        resolve(__dirname, "lib/assets/odido-icon-fonts.css"),
        resolve(__dirname, "lib/assets/ben-icon-fonts.css"),
      ],
      formats: ["es"], // Specifies the output format to be ES modules import {x} from 'x'
    },
    cssMinify: "esbuild", // Minifies CSS using ESBuild.
    cssCodeSplit: true, // Extracts CSS into a separate file. Every file added to the lib.entry will be extracted into a separate CSS file.
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        "react/jsx-runtime",
        "motion/react-client",
        "motion/react",
      ], // Add the peer deps and additional mark as external to not include child references in the bundle.
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob
          .sync(
            [
              "lib/**/*.{ts,tsx}",
              "lib/assets/odido-fonts.css",
              "lib/assets/ben-fonts.css",
              "lib/assets/simpel-fonts.css",
              "lib/assets/odido-icon-fonts.css",
              "lib/assets/ben-icon-fonts.css",
            ],
            {
              ignore: [
                "lib/**/*.d.ts",
                "**/*.stories.{tsx,ts}",
                "**/*.test.{tsx,ts}",
              ],
            },
          )
          .map((file) => [
            // 1. The name of the entry point
            // lib/nested/foo.js becomes nested/foo
            relative("lib", file.slice(0, file.length - extname(file).length)),
            // 2. The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
    sourcemap: true, // Generates source maps for debugging.
    emptyOutDir: false, // Don't clear the output directory before building. Otherwise, the assets folder will be deleted. Clearing the output is done via the cli script.
  },
});
