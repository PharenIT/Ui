// scripts/generate-barrel.js
const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components');
const outputFile = path.join(componentsDir, 'index.ts');

function pascalCase(str) {
  return str
    .replace(/(^|[-_/])(\w)/g, (_, __, c) => c ? c.toUpperCase() : '')
    .replace(/\W/g, '');
}

const lines = [];

fs.readdirSync(componentsDir, { withFileTypes: true }).forEach(dirent => {
  if (dirent.isDirectory()) {
    const dir = path.join(componentsDir, dirent.name);
    // index.ts exportieren, falls vorhanden
    if (fs.existsSync(path.join(dir, 'index.ts'))) {
      lines.push(`export * from './${dirent.name}';`);
    }
    // Alle .vue-Dateien exportieren
    fs.readdirSync(dir).forEach(file => {
      if (file.endsWith('.vue')) {
        const compName = pascalCase(file.replace('.vue', ''));
        lines.push(`export { default as ${compName} } from './${dirent.name}/${file}';`);
      }
      // Alle .ts- und .d.ts-Dateien (außer index.ts) exportieren
      if ((file.endsWith('.ts') || file.endsWith('.d.ts')) && file !== 'index.ts') {
        const base = file.replace(/\.(d\.)?ts$/, '');
        lines.push(`export * from './${dirent.name}/${base}';`);
      }
    });
  } else if (dirent.isFile() && dirent.name.endsWith('.vue')) {
    // Einzelne .vue-Dateien im components-Root
    const compName = pascalCase(dirent.name.replace('.vue', ''));
    lines.push(`export { default as ${compName} } from './${dirent.name}';`);
  } else if (dirent.isFile() && (dirent.name.endsWith('.ts') || dirent.name.endsWith('.d.ts')) && dirent.name !== 'index.ts') {
    // Einzelne .ts- und .d.ts-Dateien im components-Root
    const base = dirent.name.replace(/\.(d\.)?ts$/, '');
    lines.push(`export * from './${base}';`);
  }
});

fs.writeFileSync(outputFile, lines.join('\n') + '\n');
console.log('components/index.ts wurde automatisch generiert!');
