module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Generate a new Web component",
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
        path: "lib/components/{{pascalCase name}}/index.ts",
        templateFile: "templates/Index.ts.hbs",
      },
      {
        type: "add",
        path: "lib/components/{{pascalCase name}}/{{pascalCase name}}.mdx",
        templateFile: "templates/Component.mdx.hbs",
      },
      {
        type: "add",
        path: "lib/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "lib/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
        templateFile: "templates/Component.test.tsx.hbs",
      },
      {
        type: "add",
        path: "lib/components/{{pascalCase name}}/{{pascalCase name}}.types.ts",
        templateFile: "templates/Component.types.ts.hbs",
      },
      {
        type: "add",
        path: "lib/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "templates/Component.stories.tsx.hbs",
      },
      {
        type: "add",
        path: "lib/components/{{pascalCase name}}/{{pascalCase name}}.module.scss",
        templateFile: "templates/Component.module.scss.hbs",
      },
    ],
  });
};
