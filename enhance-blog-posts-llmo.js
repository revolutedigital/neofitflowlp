const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'app', 'blog');

// Mapeamento de posts com categorias
const postConfig = {
  'como-reduzir-evasao-alunos-academia': { category: 'Retenção', title: 'Como Reduzir Evasão de Alunos: 7 Estratégias Comprovadas' },
  'principais-causas-evasao-academia': { category: 'Retenção', title: 'Principais Causas de Evasão em Academias: Guia 2025' },
  'estrategias-retencao-alunos-crossfit': { category: 'Retenção', title: 'Estratégias de Retenção para Box CrossFit' },
  'como-recuperar-alunos-inativos': { category: 'Retenção', title: 'Como Recuperar Alunos Inativos Automaticamente' },
  'programa-fidelidade-academia-funciona': { category: 'Retenção', title: 'Programa de Fidelidade Para Academia Funciona?' },
  'comunicacao-prevenir-cancelamento-aluno': { category: 'Retenção', title: 'Comunicação Para Prevenir Cancelamento de Aluno' },
  'indicadores-evasao-academia-acompanhar': { category: 'Retenção', title: 'Indicadores de Evasão Para Acompanhar na Academia' },
  'retencao-alunos-academia-pequena': { category: 'Retenção', title: 'Retenção de Alunos em Academia Pequena' },
  'automacao-reduzir-evasao': { category: 'Retenção', title: 'Como Usar Automação Para Reduzir Evasão' },
  'check-in-automatico-faltas-academia': { category: 'Retenção', title: 'Check-in Automático e Controle de Faltas' },
  'pesquisa-satisfacao-nps-academia': { category: 'Retenção', title: 'Pesquisa de Satisfação (NPS) em Academia' },
  'recuperacao-alunos-cancelados': { category: 'Retenção', title: 'Recuperação de Alunos Cancelados' },
  'oferta-retencao-aluno-desistir': { category: 'Retenção', title: 'Oferta de Retenção Quando Aluno Quer Desistir' },
  'relacionamento-aluno-longo-prazo': { category: 'Retenção', title: 'Relacionamento com Aluno no Longo Prazo' },
  'experiencia-aluno-aumentar-retencao': { category: 'Retenção', title: 'Experiência do Aluno Para Aumentar Retenção' },
  'onboarding-novos-alunos-academia': { category: 'Retenção', title: 'Onboarding de Novos Alunos em Academia' },
  'acompanhamento-progresso-aluno': { category: 'Retenção', title: 'Acompanhamento de Progresso do Aluno' },
  'feedback-alunos-melhorar-retencao': { category: 'Retenção', title: 'Feedback de Alunos Para Melhorar Retenção' },
  'comunidade-academia-retencao': { category: 'Retenção', title: 'Comunidade na Academia e Retenção' },
  'treino-personalizado-retencao': { category: 'Retenção', title: 'Treino Personalizado e Retenção' },
  'automatizar-whatsapp-academia-guia-completo': { category: 'Automação', title: 'Como Automatizar WhatsApp da Academia: Guia Completo 2025' },
  'fluxo-automacao-whatsapp-leads': { category: 'Automação', title: 'Fluxo de Automação WhatsApp Para Leads' },
  'chatbot-whatsapp-academia-vale-pena': { category: 'Automação', title: 'Chatbot WhatsApp Para Academia Vale a Pena?' },
  'whatsapp-business-api-academia': { category: 'Automação', title: 'WhatsApp Business API Para Academia' },
  'respostas-automaticas-whatsapp-academia': { category: 'Automação', title: 'Respostas Automáticas no WhatsApp da Academia' },
  'flow-builder-whatsapp-sem-codigo': { category: 'Automação', title: 'Flow Builder WhatsApp Sem Código' },
  'integracao-whatsapp-sistema-gestao-academia': { category: 'Automação', title: 'Integração WhatsApp com Sistema de Gestão' },
  'mensagens-automaticas-renovacao-academia': { category: 'Automação', title: 'Mensagens Automáticas de Renovação' },
  'campanha-whatsapp-reativacao-alunos': { category: 'Automação', title: 'Campanha WhatsApp de Reativação de Alunos' },
  'whatsapp-agendar-aula-experimental': { category: 'Automação', title: 'WhatsApp Para Agendar Aula Experimental' },
  'confirmacao-presenca-automatica-whatsapp': { category: 'Automação', title: 'Confirmação de Presença Automática no WhatsApp' },
  'lembretes-cobranca-whatsapp': { category: 'Automação', title: 'Lembretes de Cobrança Pelo WhatsApp' },
  'segmentacao-mensagens-whatsapp': { category: 'Automação', title: 'Segmentação de Mensagens no WhatsApp' },
  'broadcast-whatsapp-academia': { category: 'Automação', title: 'Broadcast WhatsApp Para Academia' },
  'funil-vendas-whatsapp-academia': { category: 'Automação', title: 'Funil de Vendas no WhatsApp Para Academia' },
  'follow-up-automatico-leads-whatsapp': { category: 'Automação', title: 'Follow-up Automático de Leads no WhatsApp' },
  'qualificacao-leads-whatsapp': { category: 'Automação', title: 'Qualificação de Leads Pelo WhatsApp' },
  'automacao-reserva-turmas-whatsapp': { category: 'Automação', title: 'Automação de Reserva de Turmas no WhatsApp' },
  'pesquisa-nps-automatica-whatsapp': { category: 'Automação', title: 'Pesquisa NPS Automática no WhatsApp' },
  'avisos-horarios-whatsapp': { category: 'Automação', title: 'Avisos de Horários Pelo WhatsApp' },
  'como-converter-mais-leads-academia': { category: 'Conversão', title: 'Como Converter Mais Leads na Academia' },
  'aumentar-taxa-conversao-leads-fitness': { category: 'Conversão', title: 'Aumentar Taxa de Conversão de Leads Fitness' },
  'funil-vendas-academia-otimizar': { category: 'Conversão', title: 'Como Otimizar o Funil de Vendas da Academia' },
  'aula-experimental-converter-matricula': { category: 'Conversão', title: 'Aula Experimental: Como Converter em Matrícula' },
  'follow-up-leads-academia': { category: 'Conversão', title: 'Follow-up de Leads em Academia' },
  'resposta-rapida-leads-whatsapp': { category: 'Conversão', title: 'Resposta Rápida a Leads no WhatsApp' },
  'qualificar-leads-academia': { category: 'Conversão', title: 'Como Qualificar Leads de Academia' },
  'oferta-irresistivel-fechar-matricula': { category: 'Conversão', title: 'Oferta Irresistível Para Fechar Matrícula' },
  'objecoes-venda-academia': { category: 'Conversão', title: 'Como Contornar Objeções de Venda em Academia' },
  'cac-custo-aquisicao-cliente-academia': { category: 'Conversão', title: 'CAC: Custo de Aquisição de Cliente em Academia' },
  'landing-page-academia-converter': { category: 'Conversão', title: 'Landing Page Para Academia Que Converte' },
  'trafego-pago-academia-converter': { category: 'Conversão', title: 'Tráfego Pago Para Academia: Como Converter' },
  'crm-gestao-leads-academia': { category: 'Conversão', title: 'CRM Para Gestão de Leads de Academia' },
  'script-vendas-academia': { category: 'Conversão', title: 'Script de Vendas Para Academia' },
  'timing-perfeito-fechar-venda-lead': { category: 'Conversão', title: 'Timing Perfeito Para Fechar Venda com Lead' },
  'melhor-crm-academia-pequena': { category: 'Gestão', title: 'Melhor CRM Para Academia Pequena: Comparativo 2025' },
  'software-gestao-academia-comparacao': { category: 'Gestão', title: 'Software de Gestão Para Academia: Comparação' },
  'sistema-academia-cloud-beneficios': { category: 'Gestão', title: 'Sistema de Academia na Cloud: Benefícios' },
  'integracao-tecnofit-quiver-evolux': { category: 'Gestão', title: 'Integração Tecnofit, Quiver e EvolluX' },
  'gestao-financeira-academia': { category: 'Gestão', title: 'Gestão Financeira de Academia' },
  'controle-acesso-academia': { category: 'Gestão', title: 'Controle de Acesso em Academia' },
  'gestao-turmas-horarios-academia': { category: 'Gestão', title: 'Gestão de Turmas e Horários em Academia' },
  'relatorios-metricas-academia': { category: 'Gestão', title: 'Relatórios e Métricas Para Academia' },
  'automacao-cobranca-academia': { category: 'Gestão', title: 'Automação de Cobrança em Academia' },
  'gestao-equipe-academia': { category: 'Gestão', title: 'Gestão de Equipe em Academia' },
  'escala-treinos-automatica': { category: 'Gestão', title: 'Escala de Treinos Automática' },
  'controle-estoque-suplementos': { category: 'Gestão', title: 'Controle de Estoque de Suplementos' },
  'agenda-personal-trainer': { category: 'Gestão', title: 'Agenda Para Personal Trainer' },
  'gestao-contratos-academia': { category: 'Gestão', title: 'Gestão de Contratos em Academia' },
  'backup-dados-academia': { category: 'Gestão', title: 'Backup de Dados da Academia' },
  'marketing-digital-academia-guia': { category: 'Marketing', title: 'Marketing Digital Para Academia: Guia Completo' },
  'instagram-academia-atrair-alunos': { category: 'Marketing', title: 'Instagram Para Academia: Como Atrair Alunos' },
  'google-meu-negocio-academia': { category: 'Marketing', title: 'Google Meu Negócio Para Academia' },
  'trafego-pago-academia-iniciantes': { category: 'Marketing', title: 'Tráfego Pago Para Academia: Guia Iniciantes' },
  'marketing-conteudo-academia': { category: 'Marketing', title: 'Marketing de Conteúdo Para Academia' },
  'email-marketing-academia': { category: 'Marketing', title: 'Email Marketing Para Academia' },
  'programa-indicacao-academia': { category: 'Marketing', title: 'Programa de Indicação Para Academia' },
  'parcerias-locais-academia': { category: 'Marketing', title: 'Parcerias Locais Para Academia' },
  'eventos-desafios-academia': { category: 'Marketing', title: 'Eventos e Desafios na Academia' },
  'branding-academia-pequena': { category: 'Marketing', title: 'Branding Para Academia Pequena' },
  'copywriting-vendas-academia': { category: 'Marketing', title: 'Copywriting Para Vendas em Academia' },
  'stories-instagram-engajar': { category: 'Marketing', title: 'Stories do Instagram Para Engajar' },
  'reels-tiktok-academia': { category: 'Marketing', title: 'Reels e TikTok Para Academia' },
  'seo-local-academia': { category: 'Marketing', title: 'SEO Local Para Academia' },
  'anuncios-facebook-instagram-academia': { category: 'Marketing', title: 'Anúncios Facebook e Instagram Para Academia' },
  'crossfit-box-gestao-diferencas': { category: 'Nichos', title: 'CrossFit Box: Gestão e Diferenças' },
  'studio-pilates-automacao': { category: 'Nichos', title: 'Studio de Pilates: Automação' },
  'academia-pequena-vs-grande': { category: 'Nichos', title: 'Academia Pequena vs Grande' },
  'personal-trainer-gestao-alunos': { category: 'Nichos', title: 'Personal Trainer: Gestão de Alunos' },
  'franquia-academia-gestao': { category: 'Nichos', title: 'Franquia de Academia: Gestão' },
  'academia-low-cost-estrategia': { category: 'Nichos', title: 'Academia Low Cost: Estratégia' },
  'boutique-fitness-studio': { category: 'Nichos', title: 'Boutique Fitness Studio' },
  'box-muay-thai-jiu-jitsu-gestao': { category: 'Nichos', title: 'Box Muay Thai e Jiu-Jitsu: Gestão' },
  'funcional-outdoor-gestao': { category: 'Nichos', title: 'Funcional Outdoor: Gestão' },
  'yoga-meditacao-studio-gestao': { category: 'Nichos', title: 'Studio de Yoga e Meditação: Gestão' },
  'natacao-gestao-horarios': { category: 'Nichos', title: 'Natação: Gestão de Horários' },
  'academia-24-horas-gestao': { category: 'Nichos', title: 'Academia 24 Horas: Gestão' },
  'cross-training-gestao': { category: 'Nichos', title: 'Cross Training: Gestão' },
  'bike-indoor-gestao': { category: 'Nichos', title: 'Bike Indoor: Gestão' },
  'hiit-gestao-turmas': { category: 'Nichos', title: 'HIIT: Gestão de Turmas' },
};

// Get all directories in blog folder
const entries = fs.readdirSync(blogDir, { withFileTypes: true });
const postDirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);

console.log(`Encontrados ${postDirs.length} posts para aprimorar...\n`);

let updated = 0;

postDirs.forEach((slug, index) => {
  const filePath = path.join(blogDir, slug, 'page.tsx');

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Arquivo não encontrado: ${slug}`);
    return;
  }

  const config = postConfig[slug];
  if (!config) {
    console.log(`⚠️  Configuração não encontrada para: ${slug}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Adicionar Twitter Cards no metadata
  if (!content.includes('twitter: {')) {
    content = content.replace(
      /openGraph: \{([^}]+)\},\n/s,
      (match) => match + `  twitter: {\n    card: "summary_large_image",\n    title: "${config.title}",\n    description: metadata.description,\n  },\n`
    );
  }

  // 2. Adicionar BreadcrumbList schema antes do Article schema
  if (!content.includes('"@type": "BreadcrumbList"')) {
    const breadcrumbSchema = `      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://neofitflow.com.br",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://neofitflow.com.br/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "${config.title}",
                item: "https://neofitflow.com.br/blog/${slug}",
              },
            ],
          }),
        }}
      />

`;
    content = content.replace(
      /      <script\n        type="application\/ld\+json"/,
      breadcrumbSchema + '      <script\n        type="application/ld+json"'
    );
  }

  // 3. Adicionar tag <time> na data de publicação
  if (!content.includes('<time dateTime=')) {
    content = content.replace(
      /Publicado em (\d{2}\/\d{2}\/\d{4})/,
      (match, date) => {
        const [day, month, year] = date.split('/');
        const isoDate = `${year}-${month}-${day}`;
        return `Publicado em <time dateTime="${isoDate}">${date}</time>`;
      }
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  updated++;
  console.log(`✅ ${index + 1}/${postDirs.length}: ${slug}`);
});

console.log(`\n✅ ${updated} posts aprimorados com sucesso!`);
console.log('\n📋 Melhorias aplicadas:');
console.log('  ✓ Twitter Cards metadata');
console.log('  ✓ BreadcrumbList schema');
console.log('  ✓ Tag <time dateTime> para datas');