const fs = require('fs');
const path = require('path');

console.log('🎨 Invertendo cores do blog (branco/preto)...\n');

const blogPath = path.join(__dirname, 'app', 'blog', 'page.tsx');
let content = fs.readFileSync(blogPath, 'utf8');

// Backup
const backupPath = path.join(__dirname, 'app', 'blog', 'page-backup-before-invert.tsx');
fs.writeFileSync(backupPath, content, 'utf8');
console.log('✓ Backup criado: page-backup-before-invert.tsx\n');

// Inversões específicas do blog
const replacements = [
  // Containers principais
  { old: 'min-h-screen bg-black text-white', new: 'min-h-screen bg-white text-black' },

  // Header/Hero
  { old: 'bg-gradient-to-r from-primary to-secondary p-1', new: 'bg-gradient-to-r from-primary to-secondary p-1' }, // Mantém gradient
  { old: 'bg-black p-8', new: 'bg-gray-50 p-8' },
  { old: 'bg-accent px-4 py-2 rounded font-bold text-black', new: 'bg-accent px-4 py-2 rounded font-bold text-black' }, // Badge mantém

  // Borders
  { old: 'border-2 border-white', new: 'border-2 border-black' },
  { old: 'border-b-2 border-white', new: 'border-b-2 border-black' },

  // Cards de post
  { old: 'hover:shadow-brutal-primary transition-all', new: 'hover:shadow-brutal transition-all' },
  { old: 'hover:bg-black hover:text-white', new: 'hover:bg-gray-50 hover:text-black' },

  // Textos
  { old: 'text-white', new: 'text-black' },
  { old: 'text-gray-400', new: 'text-gray-600' },
  { old: 'text-gray-300', new: 'text-gray-700' },

  // Search bar
  { old: 'bg-gray-900 border-2 border-white', new: 'bg-gray-50 border-2 border-black' },
  { old: 'text-white placeholder-gray-500', new: 'text-black placeholder-gray-500' },

  // Filter buttons
  { old: 'bg-white text-black', new: 'bg-black text-white' },
  { old: 'border-white text-white hover:bg-white hover:text-black', new: 'border-black text-black hover:bg-black hover:text-white' },

  // Load more button
  { old: 'bg-white text-black px-8 py-4 hover:bg-gray-200', new: 'bg-black text-white px-8 py-4 hover:bg-gray-800' },

  // Footer/Nav
  { old: 'bg-gray-900', new: 'bg-gray-50' },
];

let changesCount = 0;

replacements.forEach(({old, new: newText}) => {
  const regex = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = content.match(regex);
  if (matches) {
    content = content.replace(regex, newText);
    changesCount += matches.length;
    console.log(`✓ ${old.substring(0, 50)}... (${matches.length}x)`);
  }
});

// Salvar
fs.writeFileSync(blogPath, content, 'utf8');

console.log(`\n✅ Blog invertido com sucesso!`);
console.log(`📊 ${changesCount} substituições aplicadas`);
console.log(`\n🎨 Esquema do blog:`);
console.log(`  • Background: BRANCO`);
console.log(`  • Texto: PRETO`);
console.log(`  • Borders: PRETO`);
console.log(`  • Cards: Hover cinza claro`);
