const fs = require('fs');
const path = require('path');

// Files to update
const filesToUpdate = [
  'app/page.tsx',
  'app/blog/page.tsx',
  ...Array.from({length: 100}, (_, i) => {
    const slugs = [
      'como-reduzir-evasao-alunos-academia', 'principais-causas-evasao-academia', 'estrategias-retencao-alunos-crossfit',
      'como-recuperar-alunos-inativos', 'programa-fidelidade-academia-funciona', 'comunicacao-prevenir-cancelamento-aluno',
      'indicadores-evasao-academia-acompanhar', 'retencao-alunos-academia-pequena', 'automacao-reduzir-evasao',
      'check-in-automatico-faltas-academia', 'pesquisa-satisfacao-nps-academia', 'recuperacao-alunos-cancelados',
      'oferta-retencao-aluno-desistir', 'relacionamento-aluno-longo-prazo', 'experiencia-aluno-aumentar-retencao',
      'onboarding-novos-alunos-academia', 'acompanhamento-progresso-aluno', 'feedback-alunos-melhorar-retencao',
      'comunidade-academia-retencao', 'treino-personalizado-retencao', 'automatizar-whatsapp-academia-guia-completo',
      'fluxo-automacao-whatsapp-leads', 'chatbot-whatsapp-academia-vale-pena', 'whatsapp-business-api-academia',
      'respostas-automaticas-whatsapp-academia', 'flow-builder-whatsapp-sem-codigo', 'integracao-whatsapp-sistema-gestao-academia',
      'mensagens-automaticas-renovacao-academia', 'campanha-whatsapp-reativacao-alunos', 'whatsapp-agendar-aula-experimental',
      'confirmacao-presenca-automatica-whatsapp', 'lembretes-cobranca-whatsapp', 'segmentacao-mensagens-whatsapp',
      'broadcast-whatsapp-academia', 'funil-vendas-whatsapp-academia', 'follow-up-automatico-leads-whatsapp',
      'qualificacao-leads-whatsapp', 'automacao-reserva-turmas-whatsapp', 'pesquisa-nps-automatica-whatsapp',
      'avisos-horarios-whatsapp', 'como-converter-mais-leads-academia', 'aumentar-taxa-conversao-leads-fitness',
      'funil-vendas-academia-otimizar', 'aula-experimental-converter-matricula', 'follow-up-leads-academia',
      'resposta-rapida-leads-whatsapp', 'qualificar-leads-academia', 'oferta-irresistivel-fechar-matricula',
      'objecoes-venda-academia', 'cac-custo-aquisicao-cliente-academia', 'landing-page-academia-converter',
      'trafego-pago-academia-converter', 'crm-gestao-leads-academia', 'script-vendas-academia',
      'timing-perfeito-fechar-venda-lead', 'melhor-crm-academia-pequena', 'software-gestao-academia-comparacao',
      'sistema-academia-cloud-beneficios', 'integracao-tecnofit-quiver-evolux', 'gestao-financeira-academia',
      'controle-acesso-academia', 'gestao-turmas-horarios-academia', 'relatorios-metricas-academia',
      'automacao-cobranca-academia', 'gestao-equipe-academia', 'escala-treinos-automatica',
      'controle-estoque-suplementos', 'agenda-personal-trainer', 'gestao-contratos-academia',
      'backup-dados-academia', 'marketing-digital-academia-guia', 'instagram-academia-atrair-alunos',
      'google-meu-negocio-academia', 'trafego-pago-academia-iniciantes', 'marketing-conteudo-academia',
      'email-marketing-academia', 'programa-indicacao-academia', 'parcerias-locais-academia',
      'eventos-desafios-academia', 'branding-academia-pequena', 'copywriting-vendas-academia',
      'stories-instagram-engajar', 'reels-tiktok-academia', 'seo-local-academia',
      'anuncios-facebook-instagram-academia', 'crossfit-box-gestao-diferencas', 'studio-pilates-automacao',
      'academia-pequena-vs-grande', 'personal-trainer-gestao-alunos', 'franquia-academia-gestao',
      'academia-low-cost-estrategia', 'boutique-fitness-studio', 'box-muay-thai-jiu-jitsu-gestao',
      'funcional-outdoor-gestao', 'yoga-meditacao-studio-gestao', 'natacao-gestao-horarios',
      'academia-24-horas-gestao', 'cross-training-gestao', 'bike-indoor-gestao', 'hiit-gestao-turmas'
    ];
    return `app/blog/${slugs[i]}/page.tsx`;
  })
];

let totalUpdates = 0;
let filesUpdated = 0;

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Replace all instances of 2024 with 2025
  content = content.replace(/2024/g, '2025');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesUpdated++;
    const updates = (originalContent.match(/2024/g) || []).length;
    totalUpdates += updates;
    console.log(`✅ Updated ${file} (${updates} replacements)`);
  } else {
    console.log(`⏭️  Skipped ${file} (no changes needed)`);
  }
});

console.log(`\n✅ Successfully updated ${filesUpdated} files with ${totalUpdates} total replacements from 2024 to 2025!`);