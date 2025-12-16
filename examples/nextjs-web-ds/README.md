# Next JS with React Design System with CSS Modules

This project is a barebones Next.js setup designed to showcase example pages built using the ReactJS components from the `@odido-portals/glow-react-web` package. It serves as a starting point for integrating our design system and demonstrating how to use these components in a Next.js environment.

## Project setup

This project integrates the `@odido-portals/glow-react-web` package to provide pre-built React components and styling that can be used to rapidly build a consistent UI. The project is also configured with CSS Modules for scoped styling.

### Prerequisites

Before getting started, ensure that you have the following tools installed:

- Node.js (version 14 or higher)
- pnpm (package manager, version 9.12.3 or higher)

### Getting Started

1. Clone the `glow-react-native` repository (or initialize your own project from this template).
2. Install the dependencies using `pnpmp`:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm grw:example-dev
```

Or if you want to test the production build locally:

```bash
pnpm grw:example-serve
```

### Build for production

This project is automatically built and deployed to [/react/web](https://design.odido.nl/react/web). Otherwise, you can test whether the build works by:

```bash
pnpm grw:example-build
```

### Project Structure

The following is a breakdown of key project files and folders:

- `/src/app/*` Contains the pages of the Next.js app. Each directory here corresponds to a route.
- `/components` Holds client components, along with a `page.tsx` that differentiates server components from client components

## SSR Compatibility

One important consideration when building pages with ReactJS components is whether the components support Server-Side Rendering (SSR). Some components in the design system may not be fully SSR-friendly.

- **SSR-Friendly Components**: We try to aim for SSR friendly components in the `@odido-portals/glow-react-web` package.
- **Non-SSR-Friendly Components**: Some components might rely on browser-specific features (like window or document), which could cause issues when rendered server-side. These components should be used with caution in SSR environments.

To test SSR compatibility, make sure to inspect your pages while running in both development and production modes to ensure they render correctly across all environments.

## Adding new pages

To create new pages, follow these simple steps:

### Step 1: Add a new `page.tsx` file

To add a new page, create a new `.tsx` file in the `app/` directory. The directory determines the route of the page. For example:

- `shop/page.tsx`: This will become the `/shop` page.
- `my/page.tsx`: This will become the `/my` page.

### Step 2: Register the page in `routes.ts`

In the `routes.tsx` file, add a new entry to create a link to your new page, along with a small description to give additional context.

```ts
{
    title: "Page title",
    onClick: () => router.push("/path"),
    // or href, but this link might direct to the wrong page on production.
    description: "Contains preview page",
},
```

This step will ensure the new page is accessible via a link from your navigation or any other relevant part of the app.

### Step 3: Customize your page

Now, customize the new page (`page.tsx`) to suit your needs. You can start by importing and using the components from the `@odido-portals/glow-react-web` package:

```tsx
// If components are SSR friendly:
import { Button } from "@odido-portals/glow-react-web/button";
import { Card } from "@odido-portals/glow-react-web/card";

// Or if it isn't...
import { Button as ClientButton } from "@/app/ClientComponents";

// You can even generate a code snippet
import { CodeSnippet } from "@/app/components/CodeSnippet";

const code = `<div>
      <h1>Page</h1>
      <Card>
        <p>This is a page.</p>
        <Button>Learn More</Button>
        <ClientButton onClick={() => {}}>Click me</ClientButton>
      </Card>
    </div>`;

export default function Page = () {
  return (
    <div>
      <h1>Page</h1>
      <Card>
        <p>This is a page.</p>
        <Button>Learn More</Button>
        <ClientButton onClick={() => {}}>Click me</ClientButton>
      </Card>

      <CodeSnippet code={code} />
    </div>
  );
};
```
