const fs = require('fs');
const path = require('path');

console.log('🎨 Invertendo esquema de cores (branco/preto)...\n');

const pagePath = path.join(__dirname, 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// Inversões de cores
const colorReplacements = [
  // Backgrounds e borders principais
  { old: 'bg-black', new: 'bg-white' },
  { old: 'text-white', new: 'text-black' },
  { old: 'border-white', new: 'border-black' },

  // Grays (inverter tons)
  { old: 'bg-gray-900', new: 'bg-gray-50' },
  { old: 'bg-gray-800', new: 'bg-gray-100' },
  { old: 'text-gray-300', new: 'text-gray-700' },
  { old: 'text-gray-400', new: 'text-gray-600' },
  { old: 'hover:bg-gray-200', new: 'hover:bg-gray-100' },
  { old: 'hover:bg-gray-800', new: 'hover:bg-gray-900' },
  { old: 'hover:text-gray-300', new: 'hover:text-gray-700' },
  { old: 'border-gray-700', new: 'border-gray-300' },

  // Seções específicas que eram dark
  { old: 'py-24 border-b-2', new: 'py-24 bg-white border-b-2' }, // Força bg-white nas sections dark

  // CTAs e buttons
  { old: 'bg-white text-black px-', new: 'bg-black text-white px-' }, // Inverte CTAs

  // Boxes de destaque (já eram white, viram gray claro)
  { old: 'bg-white text-black border-2 border-black', new: 'bg-gray-50 text-black border-2 border-black' },
];

// Backup
const backupPath = path.join(__dirname, 'app', 'page-backup-before-invert.tsx');
fs.writeFileSync(backupPath, content, 'utf8');
console.log('✓ Backup criado: page-backup-before-invert.tsx\n');

// Aplicar substituições
let changesCount = 0;
colorReplacements.forEach(({old, new: newColor}) => {
  const regex = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = content.match(regex);
  if (matches) {
    content = content.replace(regex, newColor);
    changesCount += matches.length;
    console.log(`✓ ${old} → ${newColor} (${matches.length}x)`);
  }
});

// Casos especiais - seções que devem permanecer com bg específico
content = content.replace(
  /section className="py-24 bg-white border-b-2 border-black">/g,
  'section className="py-24 border-b-2 border-black">'
);

// Footer deve ser dark
content = content.replace(
  /<footer className="bg-black/g,
  '<footer className="bg-gray-900'
);
content = content.replace(
  /footer className="bg-white/g,
  'footer className="bg-gray-900'
);

// Salvar
fs.writeFileSync(pagePath, content, 'utf8');

console.log(`\n✅ Cores invertidas com sucesso!`);
console.log(`📊 ${changesCount} substituições aplicadas`);
console.log(`\n🎨 Esquema atual:`);
console.log(`  • Background principal: BRANCO`);
console.log(`  • Texto principal: PRETO`);
console.log(`  • Borders: PRETO`);
console.log(`  • CTAs: PRETO com texto BRANCO`);
console.log(`  • Destaques: Cinza claro`);
