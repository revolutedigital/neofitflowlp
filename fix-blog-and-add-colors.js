const fs = require('fs');
const path = require('path');

console.log('🎨 Corrigindo blog e adicionando cores vibrantes...\n');

const blogPath = path.join(__dirname, 'app', 'blog', 'page.tsx');
let blogContent = fs.readFileSync(blogPath, 'utf8');

// Correções finais do blog
const blogFixes = [
  // Cards com bg-black para bg-white
  { old: 'bg-black animate-slide-up', new: 'bg-white animate-slide-up' },

  // Textos nos cards
  { old: 'text-gray-700 font-normal group-hover:text-gray-200', new: 'text-gray-700 font-normal group-hover:text-gray-900' },

  // Footer do blog
  { old: 'footer className="bg-black text-black', new: 'footer className="bg-gray-50 text-black' },
  { old: 'border-t-2 border-white', new: 'border-t-2 border-black' },

  // Load more button
  { old: 'bg-primary text-black px-8', new: 'bg-primary text-white px-8' },
  { old: 'hover:bg-primary-dark', new: 'hover:bg-primary-dark hover:text-white' },

  // Empty state button
  { old: 'hover:bg-white hover:text-black', new: 'hover:bg-gray-100' },

  // CTA section gradient mantém cores vibrantes
];

console.log('Corrigindo blog:\n');
blogFixes.forEach(({old, new: newText}) => {
  if (blogContent.includes(old)) {
    blogContent = blogContent.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
    console.log(`✓ ${old.substring(0, 40)}...`);
  }
});

fs.writeFileSync(blogPath, blogContent, 'utf8');
console.log('\n✅ Blog corrigido!\n');

// Agora vamos adicionar cores vibrantes na landing page
console.log('🌈 Adicionando cores vibrantes na landing page...\n');

const pagePath = path.join(__dirname, 'app', 'page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');

// Adicionar cores nos CTAs e elementos de destaque
const colorEnhancements = [
  // Hero CTA - Verde vibrante
  {
    old: 'inline-block bg-black text-white px-10 py-5 hover:bg-gray-800 transition-colors font-bold text-lg md:text-xl border-2 border-black mb-3',
    new: 'inline-block bg-success text-white px-10 py-5 hover:bg-success-dark hover:scale-105 transition-all font-bold text-lg md:text-xl border-2 border-success mb-3 shadow-lg'
  },

  // Banner de urgência - Manter vermelho mas ajustar
  {
    old: 'bg-red-600 text-white',
    new: 'bg-danger text-white'
  },

  // Badges flutuantes - Usar accent
  {
    old: 'bg-accent px-6 py-2 rotate-[-2deg] border-2 border-black shadow-brutal-sm',
    new: 'bg-accent text-black px-6 py-2 rotate-[-2deg] border-2 border-black shadow-brutal-accent'
  },

  // Stats/Numbers - Primary color
  {
    old: 'text-4xl md:text-5xl font-bold mb-2">150+',
    new: 'text-4xl md:text-5xl font-bold mb-2 text-primary">150+'
  },
  {
    old: 'text-4xl md:text-5xl font-bold mb-2">40%',
    new: 'text-4xl md:text-5xl font-bold mb-2 text-success">40%'
  },
  {
    old: 'text-4xl md:text-5xl font-bold mb-2">85%',
    new: 'text-4xl md:text-5xl font-bold mb-2 text-secondary">85%'
  },
  {
    old: 'text-4xl md:text-5xl font-bold mb-2">30d',
    new: 'text-4xl md:text-5xl font-bold mb-2 text-accent">30d'
  },

  // Guarantee box - Verde
  {
    old: 'bg-green-900 border-2 border-green-500',
    new: 'bg-success/10 border-2 border-success'
  },
  {
    old: 'text-2xl font-bold mb-3">✅ Garantia',
    new: 'text-2xl font-bold mb-3 text-success">✅ Garantia'
  },
];

console.log('Adicionando cores vibrantes:\n');
let colorChanges = 0;
colorEnhancements.forEach(({old, new: newText}) => {
  if (pageContent.includes(old)) {
    pageContent = pageContent.replace(old, newText);
    colorChanges++;
    console.log(`✓ ${old.substring(0, 50)}...`);
  }
});

fs.writeFileSync(pagePath, pageContent, 'utf8');

console.log(`\n✅ ${colorChanges} cores vibrantes adicionadas!\n`);
console.log('🎨 Paleta de cores aplicada:');
console.log('  🟢 Verde (Success) - CTAs principais, stats positivos');
console.log('  🔵 Indigo (Primary) - Stats, números importantes');
console.log('  🟣 Roxo (Secondary) - Destaques, precisão');
console.log('  🟡 Amarelo (Accent) - Badges, urgência, tempo');
console.log('  🔴 Vermelho (Danger) - Alertas, urgência');
