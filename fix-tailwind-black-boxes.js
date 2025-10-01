const fs = require('fs');
const path = require('path');

console.log('🎨 Corrigindo boxes com bg-black (Tailwind) nos artigos...\n');

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

// Encontrar todos os artigos
const blogDir = path.join(__dirname, 'app', 'blog');
const allFiles = findBlogPosts(blogDir);
const blogIndexPath = path.join(blogDir, 'page.tsx');
const articleFiles = allFiles.filter(f => f !== blogIndexPath);

console.log(`📁 Processando ${articleFiles.length} artigos...\n`);

const replacements = [
  // Box de exemplo de mensagem com fundo preto
  {
    old: 'className="bg-black p-4 rounded"',
    new: 'className="bg-green-50 p-4 rounded border-2 border-green-200"'
  },

  // Textos dentro do box - de cinza escuro para preto total (para contraste com fundo claro)
  {
    old: '<p className="text-gray-700 mb-3">',
    new: '<p className="text-gray-900 mb-3">'
  },
  {
    old: '<p className="text-gray-700">',
    new: '<p className="text-gray-900">'
  },

  // Variações possíveis
  {
    old: 'bg-black p-4',
    new: 'bg-green-50 p-4 border-2 border-green-200'
  },
];

let totalChanges = 0;
let filesChanged = 0;

articleFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let fileChanged = false;

  replacements.forEach(({old, new: newText}) => {
    if (content.includes(old)) {
      const regex = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, newText);
        totalChanges += matches.length;
        fileChanged = true;
      }
    }
  });

  if (fileChanged) {
    fs.writeFileSync(file, content, 'utf8');
    filesChanged++;
    const fileName = path.basename(path.dirname(file));
    console.log(`✓ ${fileName}`);
  }
});

console.log(`\n✅ Correção completa!`);
console.log(`📊 ${filesChanged} artigos atualizados`);
console.log(`🔄 ${totalChanges} boxes corrigidos`);
console.log(`\n🎨 Boxes de exemplo de mensagem agora têm:`);
console.log(`  • Background: Verde suave (WhatsApp style)`);
console.log(`  • Texto: Preto (#1a1a1a)`);
console.log(`  • Border: Verde claro`);
