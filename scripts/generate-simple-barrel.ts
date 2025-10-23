// scripts/generate-simple-barrel.ts

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const componentsDir = path.join(__dirname, '../src/components');
const outputFile = path.join(componentsDir, 'index.ts');

function pascalCase(str: string) {
  return str
    .replace(/(^|[-_/])(\w)/g, (_, __, c) => c ? c.toUpperCase() : '')
    .replace(/\W/g, '');
}

const lines: string[] = [];


function walk(dir: string, relPath = '.') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const hasIndexTs = entries.some(e => e.isFile() && e.name === 'index.ts');
  if (hasIndexTs && relPath !== '.') {
    // Only export from the folder's index.ts
    lines.push(`export * from './${relPath}';`);
    return;
  }
  for (const dirent of entries) {
    const fullPath = path.join(dir, dirent.name);
    const rel = relPath === '.' ? dirent.name : path.join(relPath, dirent.name);
    if (dirent.isDirectory()) {
      walk(fullPath, rel);
    } else if (dirent.isFile() && dirent.name.endsWith('.vue')) {
      const compName = pascalCase(dirent.name.replace('.vue', ''));
      lines.push(`export { default as ${compName} } from './${rel}';`);
    } else if (dirent.isFile() && dirent.name.endsWith('.ts') && dirent.name !== 'index.ts') {
      lines.push(`export * from './${rel.replace('.ts', '')}';`);
    }
  }
}

walk(componentsDir);

fs.writeFileSync(outputFile, lines.join('\n') + '\n');
console.log('components/index.ts (rekursiv) wurde automatisch generiert!');
