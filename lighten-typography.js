const fs = require('fs');
const path = require('path');

console.log('📝 Aplicando font-normal em body texts...\n');

const pagePath = path.join(__dirname, 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// Substituições de textos de corpo (parágrafos descritivos, não títulos/CTAs)
const replacements = [
  // Problema section - todos os textos pequenos
  {
    old: 'text-sm md:text-base text-gray-700 hover:text-gray-300">Ação reativa',
    new: 'text-sm md:text-base text-gray-700 hover:text-gray-300 font-normal">Ação reativa'
  },
  {
    old: 'text-sm md:text-base text-gray-700 hover:text-gray-300">Sem dados',
    new: 'text-sm md:text-base text-gray-700 hover:text-gray-300 font-normal">Sem dados'
  },
  {
    old: 'text-sm md:text-base text-gray-700 hover:text-gray-300">Cada aluno',
    new: 'text-sm md:text-base text-gray-700 hover:text-gray-300 font-normal">Cada aluno'
  },
  {
    old: 'text-sm md:text-base text-gray-700 hover:text-gray-300">Com 100+',
    new: 'text-sm md:text-base text-gray-700 hover:text-gray-300 font-normal">Com 100+'
  },
  {
    old: 'text-sm md:text-base text-gray-700 hover:text-gray-300">Enquanto você',
    new: 'text-sm md:text-base text-gray-700 hover:text-gray-300 font-normal">Enquanto você'
  },

  // Como funciona - descrições
  {
    old: 'text-lg mb-4 text-gray-300 group-hover:text-gray-800">\\n                      A Inteligência',
    new: 'text-lg mb-4 text-gray-300 group-hover:text-gray-800 font-normal">\\n                      A Inteligência'
  },
  {
    old: 'text-lg mb-4 text-gray-300 group-hover:text-gray-800">\\n                      Quando identifica',
    new: 'text-lg mb-4 text-gray-300 group-hover:text-gray-800 font-normal">\\n                      Quando identifica'
  },
  {
    old: 'text-lg mb-4 text-gray-300 group-hover:text-gray-800">\\n                      Sistema mantém',
    new: 'text-lg mb-4 text-gray-300 group-hover:text-gray-800 font-normal">\\n                      Sistema mantém'
  },

  // Benefícios - descrições
  {
    old: 'text-gray-700 mb-4">\\n                  Veja todos',
    new: 'text-gray-700 mb-4 font-normal">\\n                  Veja todos'
  },
  {
    old: 'text-gray-700 mb-4">\\n                  Machine Learning',
    new: 'text-gray-700 mb-4 font-normal">\\n                  Machine Learning'
  },
  {
    old: 'text-gray-700 mb-4">\\n                  Copy adaptada',
    new: 'text-gray-700 mb-4 font-normal">\\n                  Copy adaptada'
  },
  {
    old: 'text-gray-700 mb-4">\\n                  IA usa dados',
    new: 'text-gray-700 mb-4 font-normal">\\n                  IA usa dados'
  },

  // Comparação
  {
    old: 'text-gray-400">Manual',
    new: 'text-gray-400 font-normal">Manual'
  },
  {
    old: 'text-gray-400">Reativa',
    new: 'text-gray-400 font-normal">Reativa'
  },
  {
    old: 'text-gray-400">Zero',
    new: 'text-gray-400 font-normal">Zero'
  },
  {
    old: 'text-gray-400">Evasão alta',
    new: 'text-gray-400 font-normal">Evasão alta'
  },
  {
    old: 'text-gray-700">Automática',
    new: 'text-gray-700 font-normal">Automática'
  },
  {
    old: 'text-gray-700">Preventiva',
    new: 'text-gray-700 font-normal">Preventiva'
  },
  {
    old: 'text-gray-700">Dashboard',
    new: 'text-gray-700 font-normal">Dashboard'
  },
  {
    old: 'text-gray-700">Evasão reduzida',
    new: 'text-gray-700 font-normal">Evasão reduzida'
  },

  // Modalidades
  {
    old: 'text-gray-700 hover:text-gray-300 mb-4">\\n                  IA identifica',
    new: 'text-gray-700 hover:text-gray-300 mb-4 font-normal">\\n                  IA identifica'
  },
  {
    old: 'text-gray-700 hover:text-gray-300 mb-4">\\n                  Detecta ausências',
    new: 'text-gray-700 hover:text-gray-300 mb-4 font-normal">\\n                  Detecta ausências'
  },
  {
    old: 'text-gray-700 hover:text-gray-300 mb-4">\\n                  Foco em bem',
    new: 'text-gray-700 hover:text-gray-300 mb-4 font-normal">\\n                  Foco em bem'
  },
  {
    old: 'text-gray-700 hover:text-gray-300 mb-4">\\n                  Mensagens sobre',
    new: 'text-gray-700 hover:text-gray-300 mb-4 font-normal">\\n                  Mensagens sobre'
  },
  {
    old: 'text-gray-700 hover:text-gray-300 mb-4">\\n                  Reforça variedade',
    new: 'text-gray-700 hover:text-gray-300 mb-4 font-normal">\\n                  Reforça variedade'
  },
  {
    old: 'text-gray-700 hover:text-gray-300 mb-4">\\n                  Motivação com',
    new: 'text-gray-700 hover:text-gray-300 mb-4 font-normal">\\n                  Motivação com'
  },

  // FAQ subtitle
  {
    old: 'text-xl text-center text-gray-400 mb-16">\\n              Respostas',
    new: 'text-xl text-center text-gray-400 mb-16 font-normal">\\n              Respostas'
  },

  // Testimonials subtitle
  {
    old: 'text-xl md:text-2xl text-gray-400 mb-8">\\n                Veja resultados',
    new: 'text-xl md:text-2xl text-gray-400 mb-8 font-normal">\\n                Veja resultados'
  },

  // Stats labels
  {
    old: 'text-gray-700">Academias',
    new: 'text-gray-700 font-normal">Academias'
  },
  {
    old: 'text-gray-700">Redução média',
    new: 'text-gray-700 font-normal">Redução média'
  },
  {
    old: 'text-gray-700">Precisão da IA',
    new: 'text-gray-700 font-normal">Precisão da IA'
  },
  {
    old: 'text-gray-700">Antecedência do',
    new: 'text-gray-700 font-normal">Antecedência do'
  },

  // Blog section
  {
    old: 'text-xl text-gray-400">\\n                Guias práticos',
    new: 'text-xl text-gray-400 font-normal">\\n                Guias práticos'
  },
  {
    old: 'text-gray-300 group-hover:text-gray-700">\\n                  Descubra',
    new: 'text-gray-300 group-hover:text-gray-700 font-normal">\\n                  Descubra'
  },
  {
    old: 'text-gray-300 group-hover:text-gray-700">\\n                  Entenda',
    new: 'text-gray-300 group-hover:text-gray-700 font-normal">\\n                  Entenda'
  },
  {
    old: 'text-gray-300 group-hover:text-gray-700">\\n                  Compare',
    new: 'text-gray-300 group-hover:text-gray-700 font-normal">\\n                  Compare'
  },

  // CTA final
  {
    old: 'text-2xl mb-8 text-gray-700">\\n              Veja demonstração',
    new: 'text-2xl mb-8 text-gray-700 font-normal">\\n              Veja demonstração'
  },

  // Footer
  {
    old: 'text-gray-400">\\n                  Sistema de IA',
    new: 'text-gray-400 font-normal">\\n                  Sistema de IA'
  },
];

let changesCount = 0;

replacements.forEach(({old, new: newText}) => {
  const regex = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = content.match(regex);
  if (matches) {
    content = content.replace(regex, newText);
    changesCount += matches.length;
    console.log(`✓ Aplicado: ${old.substring(0, 40)}...`);
  }
});

// Salvar
fs.writeFileSync(pagePath, content, 'utf8');

console.log(`\n✅ Tipografia balanceada!`);
console.log(`📊 ${changesCount} mudanças aplicadas`);
console.log(`\n🎨 Resumo:`);
console.log(`  • Body texts agora usam font-normal`);
console.log(`  • Títulos e CTAs mantêm font-bold`);
console.log(`  • Visual mais leve e menos pesado`);
