import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, '../src/components');
const registryDir = path.join(__dirname, '../registry/components');

if (!fs.existsSync(registryDir)) {
  fs.mkdirSync(registryDir, { recursive: true });
}

fs.readdirSync(componentsDir, { withFileTypes: true }).forEach(dirent => {
  if (dirent.isDirectory()) {
    const compName = dirent.name;
    const compPath = path.join(componentsDir, compName);
    const files = fs.readdirSync(compPath).filter(f => f.endsWith('.vue') || f === 'index.ts');
    if (files.length === 0) return;

    const registry = {
      name: compName,
      description: "",
      files,
      from: `src/components/${compName}`,
      to: "src/components"
    };

    fs.writeFileSync(
      path.join(registryDir, `${compName}.json`),
      JSON.stringify(registry, null, 2)
    );
  }
});