const fs = require('fs');
const path = require('path');

console.log('🎨 Corrigindo boxes pretos nos artigos...\n');

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
  // Boxes de exemplo de mensagem
  {
    old: 'background: #1a1a1a; border-left: 4px solid #ef4444',
    new: 'background: #fee; border-left: 4px solid #ef4444'
  },
  {
    old: 'background: #1a1a1a; border-left: 4px solid #10b981',
    new: 'background: #efe; border-left: 4px solid #10b981'
  },
  {
    old: 'background: #1a1a1a; border-left: 4px solid #3b82f6',
    new: 'background: #eef; border-left: 4px solid #3b82f6'
  },
  {
    old: 'background: #1a1a1a; border-left: 4px solid #f59e0b',
    new: 'background: #ffe; border-left: 4px solid #f59e0b'
  },
  {
    old: 'background: #1a1a1a;',
    new: 'background: #f5f5f5;'
  },

  // Boxes sem border específica
  {
    old: 'background: #000;',
    new: 'background: #f5f5f5;'
  },
  {
    old: 'background: black;',
    new: 'background: #f5f5f5;'
  },

  // Textos dentro dos boxes que podem estar escuros
  {
    old: 'color: white;',
    new: 'color: #1a1a1a;'
  },
  {
    old: 'color: #fff;',
    new: 'color: #1a1a1a;'
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
console.log(`\n🎨 Boxes agora têm:`);
console.log(`  • Background claro (#f5f5f5 ou colorido suave)`);
console.log(`  • Texto escuro (#1a1a1a)`);
console.log(`  • Bordas coloridas mantidas`);
