const fs = require('fs');
const path = require('path');

console.log('🎨 Invertendo cores de todos os artigos do blog...\n');

// Função para encontrar recursivamente todos os arquivos page.tsx
function findBlogPosts(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findBlogPosts(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Encontrar todos os arquivos page.tsx dentro de /app/blog/*/
const blogDir = path.join(__dirname, 'app', 'blog');
const allFiles = findBlogPosts(blogDir);

// Filtrar apenas os artigos (ignorar o índice do blog principal)
const blogIndexPath = path.join(blogDir, 'page.tsx');
const articleFiles = allFiles.filter(f => f !== blogIndexPath);

console.log(`📁 Encontrados ${articleFiles.length} artigos para inverter\n`);

const replacements = [
  // Container principal
  { old: 'min-h-screen bg-black text-white', new: 'min-h-screen bg-white text-black' },

  // Navigation
  { old: 'bg-black/80 backdrop-blur-md border-b border-purple-500/20', new: 'bg-white/80 backdrop-blur-md border-b border-black' },
  { old: 'text-gray-300 hover:text-white', new: 'text-gray-700 hover:text-black' },

  // Textos
  { old: 'text-white', new: 'text-black' },
  { old: 'text-gray-300', new: 'text-gray-700' },
  { old: 'text-gray-400', new: 'text-gray-600' },

  // Borders
  { old: 'border-white', new: 'border-black' },
  { old: 'border-gray-800', new: 'border-gray-200' },
  { old: 'border-gray-700', new: 'border-gray-300' },

  // Backgrounds
  { old: 'bg-gray-900', new: 'bg-gray-50' },
  { old: 'bg-gray-800', new: 'bg-gray-100' },
  { old: 'bg-gray-700', new: 'bg-gray-200' },

  // Hover states
  { old: 'hover:bg-gray-800', new: 'hover:bg-gray-100' },
  { old: 'hover:bg-gray-900', new: 'hover:bg-gray-50' },
  { old: 'hover:text-white', new: 'hover:text-black' },
];

let totalChanges = 0;
let filesChanged = 0;

articleFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let fileChanged = false;

  replacements.forEach(({old, new: newText}) => {
    const regex = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, newText);
      totalChanges += matches.length;
      fileChanged = true;
    }
  });

  if (fileChanged) {
    fs.writeFileSync(file, content, 'utf8');
    filesChanged++;
    const fileName = path.basename(path.dirname(file));
    console.log(`✓ ${fileName}`);
  }
});

console.log(`\n✅ Inversão completa!`);
console.log(`📊 ${filesChanged} artigos atualizados`);
console.log(`🔄 ${totalChanges} substituições aplicadas`);
console.log(`\n🎨 Todos os artigos agora têm:`);
console.log(`  • Background: BRANCO`);
console.log(`  • Texto: PRETO`);
console.log(`  • Navigation: BRANCO`);
console.log(`  • Borders: PRETO`);
