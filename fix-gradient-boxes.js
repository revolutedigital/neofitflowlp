const fs = require('fs');
const path = require('path');

console.log('🎨 Corrigindo boxes com gradiente nos artigos...\n');

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
  // CTA box com gradiente - trocar para gradiente claro + texto escuro
  {
    old: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    new: 'background: linear-gradient(135deg, #E0E7FF 0%, #F3E8FF 100%)'
  },

  // Textos dentro do box CTA - de escuro para escuro (mantém escuro, que funciona com fundo claro)
  // Mas precisamos trocar apenas dentro dos CTAs que têm cor escura em gradiente claro
  // Como estamos mudando o fundo para claro, o texto #1a1a1a já vai funcionar

  // Para os h3 dentro dos CTAs
  {
    old: '<h3 style="color: #1a1a1a;',
    new: '<h3 style="color: #1f2937;'
  },

  // Para os p dentro dos CTAs
  {
    old: '<p style="color: #1a1a1a;',
    new: '<p style="color: #374151;'
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
console.log(`🔄 ${totalChanges} CTAs corrigidos`);
console.log(`\n🎨 CTAs agora têm:`);
console.log(`  • Background: Gradiente CLARO (lavanda suave)`);
console.log(`  • Texto: ESCURO (visível)`);
console.log(`  • Botões: BRANCOS com texto colorido`);
