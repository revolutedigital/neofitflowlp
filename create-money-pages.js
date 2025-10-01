const fs = require('fs');
const path = require('path');

console.log('🚀 Creating money keyword landing pages and hub pages...\n');

// Money keyword landing pages
const moneyPages = [
  {
    path: 'sistema-retencao-alunos-academia',
    title: 'Sistema de Retenção de Alunos Para Academia Com IA [2025]',
    h1: 'Sistema de Retenção de Alunos que Previne Cancelamentos Com Inteligência Artificial',
    description: 'Sistema completo de retenção de alunos com IA que identifica risco de cancelamento e age automaticamente via WhatsApp. Reduza evasão em até 40%.',
    keywords: 'sistema retenção alunos, sistema para academia, software retenção, plataforma retenção fitness',
    focus: 'Sistema completo de retenção com detecção automática de risco, dashboard em tempo real e ação preventiva via WhatsApp.'
  },
  {
    path: 'software-prevenir-evasao-academia',
    title: 'Software Para Prevenir Evasão de Alunos em Academia | NeoFitFlow',
    h1: 'Software de IA que Previne Evasão Identificando Alunos em Risco Antes de Cancelarem',
    description: 'Software com Inteligência Artificial que detecta padrões de evasão, identifica alunos em risco e age preventivamente. Previsão com 85% de precisão.',
    keywords: 'software prevenir evasão, software academia, sistema anti-evasão, prevenir cancelamento',
    focus: 'Software inteligente que previne evasão através de análise preditiva e ação automática via WhatsApp.'
  },
  {
    path: 'ia-identificar-cancelamento-alunos',
    title: 'IA Para Identificar Cancelamento de Alunos em Academia [2025]',
    h1: 'Inteligência Artificial que Identifica Alunos em Risco de Cancelamento 30 Dias Antes',
    description: 'Tecnologia de IA que monitora 24/7 comportamento de alunos, detecta padrões de risco e prevê cancelamentos com 85% de precisão.',
    keywords: 'ia academia, inteligência artificial fitness, ia identificar cancelamento, machine learning retenção',
    focus: 'Inteligência Artificial avançada que analisa padrões comportamentais e prevê cancelamentos antes que aconteçam.'
  },
  {
    path: 'plataforma-retencao-fitness',
    title: 'Plataforma de Retenção Para Academia e Box Fitness | NeoFitFlow',
    h1: 'Plataforma Completa de Retenção Com IA, WhatsApp e Dashboard em Tempo Real',
    description: 'Plataforma all-in-one para retenção: IA detecta risco, WhatsApp age preventivamente, dashboard mostra alunos em risco. Tudo integrado.',
    keywords: 'plataforma retenção, plataforma fitness, sistema completo academia, saas fitness',
    focus: 'Plataforma completa com todos os recursos necessários para reduzir evasão: IA, automação WhatsApp e analytics.'
  },
  {
    path: 'automacao-retencao-academia',
    title: 'Automação de Retenção Para Academia Com IA | NeoFitFlow',
    h1: 'Automatize a Retenção da Sua Academia: IA Detecta Risco e Age Via WhatsApp',
    description: 'Automação completa de retenção: sistema detecta alunos em risco automaticamente e envia mensagens personalizadas no momento certo.',
    keywords: 'automação retenção, automação academia, sistema automático, whatsapp automático',
    focus: 'Automação end-to-end que monitora, detecta e age preventivamente sem intervenção manual.'
  }
];

// Hub pages (pillar content)
const hubPages = [
  {
    path: 'retencao-alunos-academia',
    title: 'Retenção de Alunos em Academia: Guia Completo 2025 | NeoFitFlow',
    h1: 'Retenção de Alunos em Academia: Tudo Que Você Precisa Saber [2025]',
    description: 'Guia definitivo sobre retenção de alunos: causas da evasão, estratégias comprovadas, tecnologias, métricas e como reduzir churn em até 40%.',
    keywords: 'retenção de alunos, retenção academia, como reter alunos, estratégias retenção',
    intro: 'A retenção de alunos é o principal desafio de academias brasileiras em 2025. Cada aluno que cancela representa perda de receita recorrente e desperdício do investimento em aquisição (CAC). Este guia completo reúne tudo sobre retenção: desde as causas da evasão até tecnologias de IA que previnem cancelamentos.'
  },
  {
    path: 'evasao-academia',
    title: 'Evasão em Academia: Causas, Impacto e Como Reduzir [2025]',
    h1: 'Evasão de Alunos em Academia: Guia Completo Para Reduzir Cancelamentos',
    description: 'Guia completo sobre evasão: principais causas, impacto financeiro, sinais de risco, estratégias de prevenção e tecnologias para reduzir evasão.',
    keywords: 'evasão academia, evasão de alunos, reduzir evasão, cancelamento academia',
    intro: 'A evasão de alunos é a principal causa de instabilidade financeira em academias. A média brasileira de evasão mensal varia entre 5-8%, o que significa perder até 96% dos alunos em um ano sem retenção ativa. Este guia explora as causas da evasão, seu impacto real no faturamento e estratégias comprovadas para reduzir.'
  },
  {
    path: 'ia-para-academia',
    title: 'IA Para Academia: Como Inteligência Artificial Reduz Evasão [2025]',
    h1: 'Inteligência Artificial Para Academia: Previna Cancelamentos Com Tecnologia',
    description: 'Guia completo sobre IA em academias: como funciona detecção de risco, machine learning para retenção, precisão de 85% e cases reais.',
    keywords: 'ia para academia, inteligência artificial fitness, ia retenção, machine learning academia',
    intro: 'Inteligência Artificial está revolucionando a retenção de alunos em academias. Sistemas de IA conseguem detectar padrões invisíveis ao olho humano, prever cancelamentos com 30 dias de antecedência e agir preventivamente. Este guia explora como IA funciona, sua precisão e por que está se tornando padrão no mercado fitness.'
  },
  {
    path: 'churn-academia',
    title: 'Churn em Academia: Como Calcular, Reduzir e Proteger MRR [2025]',
    h1: 'Churn Rate em Academia: Guia Completo Sobre Taxa de Cancelamento',
    description: 'Guia definitivo sobre churn: como calcular corretamente, benchmarks Brasil 2025, impacto no MRR e estratégias para reduzir taxa de cancelamento.',
    keywords: 'churn academia, churn rate, taxa cancelamento, reduzir churn',
    intro: 'Churn (taxa de cancelamento) é a métrica mais importante para saúde financeira de academias. Um churn de 7% ao mês significa perder 84% dos alunos em um ano. Este guia ensina como calcular churn corretamente, comparar com benchmarks do mercado brasileiro e implementar estratégias para reduzir.'
  }
];

// Create money pages
moneyPages.forEach((page) => {
  const dirPath = path.join(__dirname, 'app', page.path);
  const filePath = path.join(dirPath, 'page.tsx');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const content = `import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "${page.title}",
  description: "${page.description}",
  keywords: "${page.keywords}",
  alternates: {
    canonical: '/${page.path}',
  },
  openGraph: {
    title: "${page.title}",
    description: "${page.description}",
    url: 'https://neofitflow.com.br/${page.path}',
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "${page.title}",
    description: "${page.description}",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b-2 border-white fixed w-full z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl md:text-2xl font-bold">NeoFitFlow</Link>
            <div className="flex gap-4">
              <Link href="/blog" className="hover:text-gray-300">Blog</Link>
              <a
                href="https://wa.me/5531995255982?text=Quero%20conhecer%20o%20sistema%20NeoFitFlow"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-4 py-2 font-bold hover:bg-gray-200"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        </div>
      </nav>

      <article className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block bg-white text-black px-4 py-2 text-sm font-bold mb-6">
              🤖 INTELIGÊNCIA ARTIFICIAL
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">${page.h1}</h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              ${page.focus}
            </p>
            <a
              href="https://wa.me/5531995255982?text=Quero%20ver%20demonstração%20do%20sistema"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-black px-8 py-4 font-bold hover:bg-gray-200 text-lg"
            >
              Ver Demonstração Gratuita
            </a>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-gray-900 border-2 border-white p-8 mb-12">
              <h2 className="text-3xl font-bold mb-6">Por Que Você Precisa de um Sistema de Retenção Com IA</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-3">❌ Sem Sistema de IA:</h3>
                  <ul className="space-y-2">
                    <li>→ Você só descobre evasão DEPOIS que acontece</li>
                    <li>→ Impossível monitorar 100+ alunos manualmente</li>
                    <li>→ Não sabe quais alunos estão em risco AGORA</li>
                    <li>→ Perda constante de receita mensal</li>
                    <li>→ Decisões baseadas em achismo, não dados</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">✅ Com NeoFitFlow:</h3>
                  <ul className="space-y-2">
                    <li>→ IA detecta risco 30 dias ANTES do cancelamento</li>
                    <li>→ Monitoramento automático 24/7 de 100% dos alunos</li>
                    <li>→ Dashboard mostra alunos em risco em tempo real</li>
                    <li>→ Ação preventiva via WhatsApp automático</li>
                    <li>→ Decisões baseadas em dados e machine learning</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-4xl font-bold mt-16 mb-8">Como Funciona o Sistema</h2>

            <div className="space-y-8 mb-12">
              <div className="border-2 border-white p-8">
                <h3 className="text-3xl font-bold mb-4">1. IA Detecta Padrões de Risco 24/7</h3>
                <p className="text-lg mb-4">
                  Inteligência Artificial monitora continuamente o comportamento de cada aluno: frequência,
                  faltas consecutivas, mudanças de horário e outros sinais de desengajamento.
                </p>
                <div className="bg-white text-black p-6">
                  <p className="font-bold mb-2">🎯 O que a IA detecta:</p>
                  <p>• Alunos com 3+ faltas consecutivas (risco alto)</p>
                  <p>• Queda abrupta na frequência semanal</p>
                  <p>• Mudanças frequentes de horário (instabilidade)</p>
                  <p>• Padrões comportamentais que indicam desengajamento</p>
                </div>
              </div>

              <div className="border-2 border-white p-8">
                <h3 className="text-3xl font-bold mb-4">2. Ação Preventiva Automática via WhatsApp</h3>
                <p className="text-lg mb-4">
                  Quando detecta risco alto, o sistema age IMEDIATAMENTE enviando mensagem personalizada
                  perguntando se está tudo bem e oferecendo suporte.
                </p>
                <div className="bg-gray-900 p-6 border-2 border-white">
                  <p className="font-bold mb-3">💬 Exemplo de mensagem automática:</p>
                  <p className="italic text-gray-300 mb-2">
                    "Oi Maria, notamos que você não apareceu nos últimos treinos. Está tudo bem?
                    Podemos te ajudar com horário, treino ou qualquer dúvida?"
                  </p>
                  <p className="text-sm text-gray-400 mt-4">
                    → Tom empático, não cobrança<br/>
                    → Personalizada com nome e contexto<br/>
                    → Oferece ajuda real
                  </p>
                </div>
              </div>

              <div className="border-2 border-white p-8">
                <h3 className="text-3xl font-bold mb-4">3. Dashboard de Risco em Tempo Real</h3>
                <p className="text-lg mb-4">
                  Painel visual mostra TODOS os alunos em risco ranqueados por urgência. Você sabe
                  exatamente onde focar energia e qual ação tomar.
                </p>
                <div className="bg-white text-black p-6">
                  <p className="font-bold mb-2">📊 Visualização de risco:</p>
                  <p>🔴 Risco ALTO: 15 alunos (3+ faltas) - ação imediata</p>
                  <p>🟡 Risco MÉDIO: 28 alunos (queda frequência) - monitorar</p>
                  <p>🟢 Estável: 157 alunos - ok, manter engajamento</p>
                </div>
              </div>
            </div>

            <h2 className="text-4xl font-bold mt-16 mb-8">Resultados Comprovados</h2>

            <div className="bg-white text-black border-2 border-black p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6">📈 Academias que usam NeoFitFlow observam:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-bold mb-2">15-40%</p>
                  <p className="text-lg">Redução na taxa de evasão mensal</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">85%</p>
                  <p className="text-lg">Precisão da IA em prever cancelamentos</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">30 dias</p>
                  <p className="text-lg">Antecedência na previsão de risco</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">24/7</p>
                  <p className="text-lg">Monitoramento automático contínuo</p>
                </div>
              </div>
            </div>

            <h2 className="text-4xl font-bold mt-16 mb-8">Integrações e Compatibilidade</h2>

            <div className="border-2 border-white p-8 mb-12">
              <h3 className="text-2xl font-bold mb-4">🔗 Integra com principais sistemas de gestão:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white text-black p-4 text-center font-bold">Tecnofit</div>
                <div className="bg-white text-black p-4 text-center font-bold">Quiver</div>
                <div className="bg-white text-black p-4 text-center font-bold">EvolluX</div>
                <div className="bg-white text-black p-4 text-center font-bold">Evolution</div>
              </div>
              <p className="text-lg text-gray-300">
                A IA do NeoFitFlow se conecta via API com seu sistema de gestão para importar
                dados de frequência automaticamente. Não precisa trocar seu sistema atual.
              </p>
              <p className="text-lg text-gray-300 mt-4">
                <strong>Não usa sistema de gestão?</strong> Sem problema! NeoFitFlow funciona
                standalone com controle de acesso próprio.
              </p>
            </div>

            <h2 className="text-4xl font-bold mt-16 mb-8">Para Quem é o NeoFitFlow</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="border-2 border-white p-6 text-center">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-xl font-bold mb-2">Academias Tradicionais</h3>
                <p className="text-gray-300">Musculação, aparelhos e funcional</p>
              </div>
              <div className="border-2 border-white p-6 text-center">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-bold mb-2">Box CrossFit</h3>
                <p className="text-gray-300">Treinos em grupo de alta intensidade</p>
              </div>
              <div className="border-2 border-white p-6 text-center">
                <div className="text-4xl mb-4">🧘</div>
                <h3 className="text-xl font-bold mb-2">Studios Especializados</h3>
                <p className="text-gray-300">Pilates, yoga, dança, spinning</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold mt-16 mb-8">Perguntas Frequentes</h2>

            <div className="space-y-4 mb-12">
              <details className="border-2 border-white p-6">
                <summary className="font-bold cursor-pointer text-xl">
                  Preciso trocar meu sistema de gestão atual?
                </summary>
                <p className="mt-4 text-gray-300">
                  Não! O NeoFitFlow integra via API com Tecnofit, Quiver, EvolluX e outros sistemas.
                  Se não usa sistema, funciona standalone com controle próprio.
                </p>
              </details>

              <details className="border-2 border-white p-6">
                <summary className="font-bold cursor-pointer text-xl">
                  Funciona para academias pequenas (menos de 100 alunos)?
                </summary>
                <p className="mt-4 text-gray-300">
                  Sim! Academias pequenas se beneficiam MAIS, pois cada aluno representa percentual
                  maior da receita. A IA monitora 100% dos alunos independente da quantidade.
                </p>
              </details>

              <details className="border-2 border-white p-6">
                <summary className="font-bold cursor-pointer text-xl">
                  Quanto tempo leva para implementar?
                </summary>
                <p className="mt-4 text-gray-300">
                  1-2 dias para integração e configuração inicial. A IA começa a detectar padrões
                  imediatamente, mas resultados mais expressivos aparecem após 30 dias.
                </p>
              </details>

              <details className="border-2 border-white p-6">
                <summary className="font-bold cursor-pointer text-xl">
                  Qual a precisão da IA em prever cancelamentos?
                </summary>
                <p className="mt-4 text-gray-300">
                  Precisão média de 85% e aumenta com o tempo conforme aprende padrões da sua academia.
                  Previsão com até 30 dias de antecedência.
                </p>
              </details>
            </div>
          </div>

          <div className="mt-16 border-2 border-white p-8 text-center bg-white text-black">
            <h2 className="text-4xl font-bold mb-4">Pronto Para Reduzir Evasão Com IA?</h2>
            <p className="text-xl mb-6">
              Veja demonstração de como o sistema identifica alunos em risco e age preventivamente
            </p>
            <a
              href="https://wa.me/5531995255982?text=Quero%20ver%20demonstração%20do%20NeoFitFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-8 py-4 font-bold hover:bg-gray-800 text-lg"
            >
              Ver Demonstração Gratuita (15 min)
            </a>
            <p className="text-sm mt-4 text-gray-700">
              ✓ Dashboard de risco funcionando | ✓ Exemplos de detecção pela IA | ✓ Mensagens automáticas
            </p>
          </div>
        </div>
      </article>

      <footer className="bg-black text-white py-12 border-t-2 border-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 NeoFitFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Created money page: /${page.path}`);
});

console.log(`\n📄 Creating hub pages...\n`);

// Create hub pages (to be continued in next file due to size)
console.log('\n✅ Money pages created successfully!');
console.log('\nCreated pages:');
moneyPages.forEach(p => console.log(`  - /${p.path}`));