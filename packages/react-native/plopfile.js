module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Generate a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.ts",
        templateFile: "templates/Index.ts.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.mdx",
        templateFile: "templates/Component.mdx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "templates/Component.test.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.types.ts",
        templateFile: "templates/Component.types.ts.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "templates/Component.stories.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.styles.ts",
        templateFile: "templates/Component.styles.ts.hbs",
      },
      {
        type: "add",
        path: "../../examples/visual-regression-tests/tests/{{camelCase name}}/{{pascalCase name}}.owl.tsx",
        templateFile: "templates/Component.owl.tsx.hbs",
      },
      {
        type: "add",
        path: "../../examples/visual-regression-tests/tests/{{camelCase name}}/{{pascalCase name}}.screen.tsx",
        templateFile: "templates/Component.screen.tsx.hbs",
      },
    ],
  });
};
