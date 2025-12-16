import fs from "fs";
import path from "path";
import type {
  ImportDeclaration,
  InterfaceDeclaration,
  SourceFile,
  TypeAliasDeclaration,
} from "ts-morph";
import { Project } from "ts-morph";

// create a build with 'npm run build' before using this script
// run 'npm run build:mockComponents' to start the script

// specify source folder with sourceDir variable
const sourceDir = "packages/react-native/dist/components";
// specify output folder with outputDir variable
const outputDir = "components-mock-library/src/components";

function generateMockComponents() {
  const project = new Project();
  project.addSourceFilesAtPaths(`${sourceDir}/**/*.types.d.ts`);

  const sourceFiles = project.getSourceFiles();

  sourceFiles.forEach((sourceFile) => {
    console.log(`Processing: ${sourceFile.getFilePath()}`);
    const componentName = getComponentNameFromPath(sourceFile.getFilePath());
    const folderComponentName = getComponentNameFromFolder(
      sourceFile.getFilePath(),
    );
    console.log(`componentName: ${componentName}`);
    if (!componentName) {
      console.warn(`Could not determine component name from path.`);
      return;
    }

    const {
      imports,
      typesAndInterfaces,
      propsDeclaration,
      componentPropsName,
    } = extractDeclarations(sourceFile, componentName, folderComponentName);

    if (!propsDeclaration) {
      console.warn(`No props declaration found for: ${componentName}`);
      return;
    }

    const mockComponent = createMockComponent(
      componentPropsName || componentName,
      imports,
      typesAndInterfaces,
      propsDeclaration,
    );

    const outputPath = path.join(outputDir, `${componentPropsName}.tsx`);
    ensureDirectoryExists(path.dirname(outputPath));
    fs.writeFileSync(outputPath, mockComponent);
    console.log(`Generated mock for: ${componentName}`);
  });
}

function getComponentNameFromPath(filePath: string): string | null {
  const fileName = path.basename(filePath);
  const folderName = path.dirname(filePath).split(path.sep).pop() || null;
  return fileName?.endsWith(".types.d.ts")
    ? fileName.replace(".types.d.ts", "")
    : folderName;
}

function getComponentNameFromFolder(filePath: string): string | null {
  return path.dirname(filePath).split(path.sep).pop() || null;
}

function transformImportPath(moduleSpecifier: string): string {
  // Convert paths like "../Checkbox/Checkbox.types" to "./Checkbox"
  return moduleSpecifier
    .replace(/^\.\.\//g, "./") // Replace relative `../` with `./`
    .replace(/\/[^/]+\.types$/, ""); // Remove the `.types` segment from the path
}

function filterReactTypeImports(importDecl: ImportDeclaration): boolean {
  // Exclude only "import type React from 'react'"
  const moduleSpecifier = importDecl.getModuleSpecifierValue();
  const namedImports = importDecl.getNamedImports();
  const defaultImport = importDecl.getDefaultImport();

  return !(
    moduleSpecifier === "react" &&
    importDecl.isTypeOnly() &&
    defaultImport?.getText() === "React" &&
    namedImports.length === 0
  );
}

function extractDeclarations(
  sourceFile: SourceFile,
  componentName: string,
  folderComponentName: string | null,
): {
  imports: string;
  typesAndInterfaces: string;
  propsDeclaration: string | undefined;
  componentPropsName: string | undefined;
} {
  const imports = sourceFile
    .getImportDeclarations()
    // exclude React import to prevent further duplication
    .filter(filterReactTypeImports)
    .map((importDecl) => {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();

      // Transform the import path
      const updatedModuleSpecifier = transformImportPath(moduleSpecifier);

      // Check if the imported type matches the file name
      const namedImports = importDecl.getNamedImports();
      const typeOnly = importDecl.isTypeOnly();

      if (
        typeOnly &&
        namedImports.length === 1 &&
        updatedModuleSpecifier.startsWith("./")
      ) {
        const importName = namedImports[0].getName();
        const fileName = path.basename(updatedModuleSpecifier);

        // If the import name matches the file name, convert to default import
        if (importName === fileName) {
          return `import type ${importName} from "${updatedModuleSpecifier}";`;
        }
      }

      // Otherwise, return the original import with updated module specifier
      importDecl.setModuleSpecifier(updatedModuleSpecifier);
      return importDecl.getText();
    })
    .join("\n");
  const types = sourceFile.getTypeAliases();
  const interfaces = sourceFile.getInterfaces();
  const isComponentPropsDeclaration = (
    declaration: TypeAliasDeclaration | InterfaceDeclaration,
  ) =>
    declaration.getName() === `${componentName}Props` ||
    declaration.getName() === `${folderComponentName}Props`;
  // Find the props declaration
  const propsDeclaration =
    types.find(isComponentPropsDeclaration) ||
    interfaces.find(isComponentPropsDeclaration);

  // Extract all type aliases and interfaces
  const typesAndInterfaces = [...types, ...interfaces]
    .filter((type) => type.getName() !== propsDeclaration?.getName())
    .map((declaration) => declaration.getText())
    .join("\n\n");

  return {
    imports,
    typesAndInterfaces,
    propsDeclaration: propsDeclaration?.getText(),
    componentPropsName: propsDeclaration?.getName().replace("Props", ""),
  };
}

function createMockComponent(
  name: string,
  imports: string,
  typesAndInterfaces: string,
  propsDeclaration: string,
): string {
  return `import React from "react";

${imports}

${typesAndInterfaces}

${propsDeclaration}

const ${name}: React.FC<${name}Props> = (props) => {
  return <div>${name} Mock Component</div>;
};

export default ${name};
`;
}

function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

generateMockComponents();
