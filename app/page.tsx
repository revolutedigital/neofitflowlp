import type { Metadata } from "next";
import LeadCaptureForm from "./components/LeadCaptureForm";
import ROICalculator from "./components/ROICalculator";
import StickyWhatsAppButton from "./components/StickyWhatsAppButton";
import ScrollReveal from "./components/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL('https://neofitflow.com.br'),
  title: "Reduza Evasão da Academia em 40% com IA | NeoFitFlow",
  description: "Sistema com Inteligência Artificial que identifica alunos em risco de cancelamento e age preventivamente via WhatsApp. Previna evasão antes que aconteça.",
  keywords: "reduzir evasão academia, sistema retenção alunos, ia academia, prevenir cancelamento, recuperar alunos inativos, inteligência artificial fitness, churn academia, retenção de alunos, previsão cancelamento",
  authors: [{ name: "NeoFitFlow" }],
  creator: "NeoFitFlow",
  publisher: "NeoFitFlow",
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: "Reduza Evasão da Academia em 40% com IA | NeoFitFlow",
    description: "IA identifica alunos em risco e age automaticamente via WhatsApp para prevenir cancelamentos.",
    url: 'https://neofitflow.com.br',
    siteName: 'NeoFitFlow',
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NeoFitFlow - IA para Retenção de Alunos em Academias',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reduza Evasão da Academia em 40% com IA | NeoFitFlow",
    description: "Sistema de IA que previne cancelamentos identificando alunos em risco e agindo automaticamente",
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return (
    <>
      {/* Meta Pixel (Facebook/Instagram Remarketing) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2630191757328360');
            fbq('track', 'PageView');
            fbq('track', 'ViewContent', {
              content_name: 'Landing Page - NeoFitFlow',
              content_category: 'AI Retention System'
            });
          `,
        }}
      />

      {/* Google Ads Remarketing Tag */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXX"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-XXXXX');
            gtag('event', 'page_view', {
              'send_to': 'AW-XXXXX',
              'value': 1.0,
              'items': [{
                'id': 'landing_page',
                'name': 'NeoFitFlow Landing',
                'category': 'AI Retention'
              }]
            });
          `,
        }}
      />

      {/* Schema.org JSON-LD - Software Application */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "NeoFitFlow",
            applicationCategory: "BusinessApplication",
            description: "Sistema de Inteligência Artificial que identifica alunos em risco de cancelamento e age preventivamente via WhatsApp para reduzir evasão em academias",
            url: "https://neofitflow.com.br",
            image: "https://neofitflow.com.br/og-image.png",
            operatingSystem: "Web",
            inLanguage: "pt-BR",
            offers: {
              "@type": "Offer",
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
              url: "https://neofitflow.com.br",
            },
            featureList: [
              "IA detecta padrões de risco de cancelamento",
              "Identificação automática de alunos com 3+ faltas",
              "Ação preventiva via WhatsApp automático",
              "Mensagens motivacionais personalizadas",
              "Dashboard de risco de evasão em tempo real",
              "Previsão de cancelamento com 85% de precisão",
              "Integração com Tecnofit, Quiver, EvolluX",
              "Fluxos para musculação, dança, crossfit, pilates",
            ],
            applicationSubCategory: "AI, Retention Management, WhatsApp Automation",
            audience: {
              "@type": "Audience",
              audienceType: "Donos de academia, proprietários de box CrossFit, gestores fitness, personal trainers",
            },
            provider: {
              "@type": "Organization",
              name: "NeoFitFlow",
              url: "https://neofitflow.com.br",
            },
          }),
        }}
      />

      {/* Schema.org JSON-LD - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "NeoFitFlow",
            url: "https://neofitflow.com.br",
            logo: "https://neofitflow.com.br/logo.png",
            description: "Sistema de IA para retenção de alunos em academias - detecta risco de cancelamento e age preventivamente",
            address: {
              "@type": "PostalAddress",
              addressCountry: "BR",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Sales",
              availableLanguage: ["pt-BR"],
            },
          }),
        }}
      />

      {/* Schema.org JSON-LD - FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Como a IA identifica alunos em risco de cancelamento?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A IA analisa padrões de comportamento como faltas consecutivas (3+), queda na frequência semanal, mudanças frequentes de horário e outros sinais de desengajamento. Quando detecta risco alto, dispara ação preventiva automaticamente via WhatsApp.",
                },
              },
              {
                "@type": "Question",
                name: "Funciona para academias pequenas com menos de 100 alunos?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Sim! Academias pequenas se beneficiam ainda mais, pois cada aluno representa percentual maior da receita. A IA monitora 100% dos alunos 24/7, algo impossível de fazer manualmente mesmo com equipe pequena.",
                },
              },
              {
                "@type": "Question",
                name: "Preciso trocar meu sistema de gestão atual (Tecnofit, Quiver)?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não! O NeoFitFlow integra via API com Tecnofit, Quiver, EvolluX e outros sistemas. A IA usa os dados de frequência do seu sistema para detectar padrões. Se não usa sistema, também funciona standalone.",
                },
              },
              {
                "@type": "Question",
                name: "Qual a precisão da IA em prever cancelamentos?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A precisão média é de 85% e aumenta com o tempo conforme a IA aprende padrões específicos da sua academia. O sistema prevê risco com até 30 dias de antecedência, dando tempo de agir preventivamente.",
                },
              },
              {
                "@type": "Question",
                name: "As mensagens automáticas não parecem robotizadas?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Não! As mensagens são personalizadas com nome do aluno, modalidade praticada e contexto específico. Tom empático e humanizado. Alunos sentem que a academia se importa e está prestando atenção neles.",
                },
              },
              {
                "@type": "Question",
                name: "Quanto tempo leva para implementar e ver resultados?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Implementação leva 1-2 dias (integração + configuração inicial). A IA começa a detectar padrões imediatamente, mas resultados mais expressivos aparecem após 30 dias quando há histórico suficiente para análise preditiva.",
                },
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-white text-black">
        {/* Skip to main content - Accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-white px-4 py-2 z-50 focus:z-[100]">
          Pular para conteúdo principal
        </a>

        {/* Sticky WhatsApp Button */}
        <StickyWhatsAppButton />

        {/* Urgency Banner */}
        <div className="text-white py-2 px-4 text-center font-bold text-sm md:text-base border-b-2 border-black" style={{ backgroundColor: '#F87171' }} role="banner" aria-label="Oferta especial">
          ⚡ OFERTA LIMITADA: 8 vagas para demonstração esta semana • 3 já foram agendadas hoje
        </div>

        {/* Navigation */}
        <nav className="border-b-2 border-black fixed w-full z-10 bg-white top-[36px]" role="navigation" aria-label="Navegação principal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl font-bold tracking-tight">NeoFitFlow</span>
                <span className="hidden md:inline-block bg-black text-white px-2 py-1 text-xs font-bold">🤖 IA PARA RETENÇÃO</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="/blog"
                  className="hidden md:inline-block hover:text-gray-700 transition-colors font-bold"
                >
                  Blog
                </a>
                <a
                  href="#form"
                  className="bg-black text-white px-4 md:px-6 py-2 hover:bg-gray-100 transition-colors font-bold border-2 border-black flex items-center gap-2 text-sm md:text-base"
                >
                  <span>📊</span> <span className="hidden md:inline">Ver</span> Demonstração
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="main-content" className="pt-40 pb-24 px-4 border-b-2 border-black" aria-labelledby="hero-heading">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-6">
                🤖 INTELIGÊNCIA ARTIFICIAL PARA RETENÇÃO
              </div>
              <h1 id="hero-heading" className="text-4xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                Seu Aluno Está Prestes a Cancelar.
                <br />
                <span className="bg-black text-white px-2 md:px-4">A IA Te Avisa Antes</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto font-normal">
                Sistema que detecta alunos em risco <span className="underline">30 dias antes</span> de cancelarem e age automaticamente pelo WhatsApp para trazê-los de volta
              </p>

              <div className="bg-gray-50 border-2 border-black p-6 md:p-8 max-w-3xl mx-auto mb-8">
                <p className="text-lg md:text-xl font-bold mb-4">🔍 A IA do NeoFitFlow faz o que você não consegue:</p>
                <div className="grid md:grid-cols-2 gap-4 text-left text-base md:text-lg font-normal">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">✓</span>
                    <span>Detecta automaticamente alunos em risco</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl">✓</span>
                    <span>Age preventivamente antes do cancelamento</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl">✓</span>
                    <span>Envia mensagens motivacionais personalizadas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl">✓</span>
                    <span>Dashboard de evasão em tempo real</span>
                  </div>
                </div>
              </div>

              <a
                href="#form"
                className="inline-block text-white px-10 py-5 hover:scale-105 transition-all font-bold text-lg md:text-xl mb-3 shadow-lg"
                style={{ backgroundColor: '#34D399', border: '2px solid #34D399' }}
                aria-label="Agendar demonstração gratuita de 15 minutos"
              >
                📊 Ver Demonstração Gratuita (15 min)
              </a>
              <p className="text-sm md:text-base text-gray-600 mb-4 font-normal">
                Veja dashboard com alunos em risco + mensagens automáticas da IA
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-600 mt-6 font-normal">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Integra com Tecnofit, Quiver, EvolluX</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>Seus dados protegidos (LGPD)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>Implementação em 1-2 dias</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* O Problema Section */}
        <section className="py-24 bg-white text-black border-b-2 border-black" aria-labelledby="problema-heading">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollReveal direction="fade">
              <h2 id="problema-heading" className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">
                Por Que Academias Perdem Alunos Todos os Meses?
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <ScrollReveal delay={0.1}>
                <div className="border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                  <div className="text-3xl mb-3">❌</div>
                  <p className="text-lg md:text-xl font-bold mb-2">Aluno falta 3x e você não percebe</p>
                  <p className="text-sm md:text-base text-gray-700 hover:text-gray-700 font-normal">3 faltas consecutivas é o primeiro sinal de risco - mas você só descobre quando já cancelou</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                  <div className="text-3xl mb-3">❌</div>
                  <p className="text-lg md:text-xl font-bold mb-2">Descobre cancelamento quando já aconteceu</p>
                  <p className="text-sm md:text-base text-gray-700 hover:text-gray-700 font-normal">Ação reativa não funciona - aluno já decidiu e foi para a concorrência</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                  <div className="text-3xl mb-3">❌</div>
                  <p className="text-lg md:text-xl font-bold mb-2">Não sabe quais alunos estão em risco</p>
                  <p className="text-sm md:text-base text-gray-700 hover:text-gray-700 font-normal">Sem dados, sem visibilidade, sem prevenção - evasão vira surpresa</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                  <div className="text-3xl mb-3">❌</div>
                  <p className="text-lg md:text-xl font-bold mb-2">Perda de receita mensal com evasão</p>
                  <p className="text-sm md:text-base text-gray-700 hover:text-gray-700 font-normal">Cada aluno que cancela é dinheiro que você perde todo mês</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                  <div className="text-3xl mb-3">❌</div>
                  <p className="text-lg md:text-xl font-bold mb-2">Falta tempo para acompanhar cada aluno</p>
                  <p className="text-sm md:text-base text-gray-700 hover:text-gray-700 font-normal">Com 100+ alunos é impossível monitorar faltas manualmente</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                  <div className="text-3xl mb-3">❌</div>
                  <p className="text-lg md:text-xl font-bold mb-2">Concorrência pega alunos desengajados</p>
                  <p className="text-sm md:text-base text-gray-700 hover:text-gray-700 font-normal">Enquanto você não age, outra academia oferece promoção e leva seu aluno</p>
                </div>
              </ScrollReveal>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">
                📉 O problema real: você age DEPOIS, quando já é tarde demais
              </p>
              <p className="text-xl text-gray-700">
                A solução? Prevenção com IA que identifica risco ANTES do cancelamento acontecer
              </p>
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section id="solucao" className="py-24 bg-white border-b-2 border-black">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-4 tracking-tight">
              Como a IA do NeoFitFlow Previne Cancelamentos
            </h2>
            <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
              Sistema de 3 etapas que detecta, age e recupera alunos automaticamente
            </p>

            <div className="space-y-8">
              {/* Etapa 1 */}
              <div className="border-2 border-black p-8 hover:bg-white hover:text-black transition-all group">
                <div className="flex items-start gap-6">
                  <div className="text-5xl">🔍</div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-3">1. IA Detecta Padrões de Risco Automaticamente</h3>
                    <p className="text-lg mb-4 text-gray-700 group-hover:text-gray-800">
                      A Inteligência Artificial monitora 24/7 o comportamento de cada aluno e identifica automaticamente
                      sinais de desengajamento e risco de cancelamento.
                    </p>
                    <div className="bg-gray-50 text-black border-2 border-black p-4 group-hover:bg-white group-hover:text-black group-hover:border-black">
                      <p className="font-bold text-xl mb-2">🎯 O que a IA detecta:</p>
                      <p className="text-lg">→ Alunos com 3+ faltas consecutivas</p>
                      <p className="text-lg">→ Queda abrupta na frequência semanal</p>
                      <p className="text-lg">→ Mudanças de horário frequentes (instabilidade)</p>
                      <p className="text-lg">→ Padrões que indicam desengajamento</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Etapa 2 */}
              <div className="border-2 border-black p-8 hover:bg-white hover:text-black transition-all group">
                <div className="flex items-start gap-6">
                  <div className="text-5xl">💬</div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-3">2. Ação Preventiva Automática via WhatsApp</h3>
                    <p className="text-lg mb-4 text-gray-700 group-hover:text-gray-800">
                      Quando identifica risco, o sistema age IMEDIATAMENTE enviando mensagem personalizada pelo WhatsApp
                      perguntando se está tudo bem e oferecendo ajuda antes que o aluno cancele.
                    </p>
                    <div className="bg-gray-50 text-black border-2 border-black p-4 group-hover:bg-white group-hover:text-black group-hover:border-black">
                      <p className="font-bold text-xl mb-2">💡 Exemplo de mensagem automática:</p>
                      <p className="text-lg italic mb-2">&quot;Oi João, notamos que você não apareceu nos últimos treinos. Está tudo bem? Podemos te ajudar com algo - horário, treino, motivação?&quot;</p>
                      <p className="text-lg">→ Tom empático, não cobrança</p>
                      <p className="text-lg">→ Personalizada com nome e situação</p>
                      <p className="text-lg">→ Oferece suporte real</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Etapa 3 */}
              <div className="border-2 border-black p-8 hover:bg-white hover:text-black transition-all group">
                <div className="flex items-start gap-6">
                  <div className="text-5xl">📈</div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-3">3. Recuperação e Motivação Contínua</h3>
                    <p className="text-lg mb-4 text-gray-700 group-hover:text-gray-800">
                      Sistema mantém o aluno engajado com lembretes motivacionais, acompanhamento de progresso
                      e mensagens personalizadas que reforçam a jornada fitness dele.
                    </p>
                    <div className="bg-gray-50 text-black border-2 border-black p-4 group-hover:bg-white group-hover:text-black group-hover:border-black">
                      <p className="font-bold text-xl mb-2">⚡ Resultado da prevenção:</p>
                      <p className="text-lg">→ Aluno se sente acolhido e retorna</p>
                      <p className="text-lg">→ Engajamento aumenta com motivação constante</p>
                      <p className="text-lg">→ Cancelamento é evitado ANTES de acontecer</p>
                      <p className="text-lg">→ Receita mensal recorrente protegida</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-24 border-b-2 border-black">
          <div className="max-w-6xl mx-auto px-4">
            <ROICalculator />
          </div>
        </section>

        {/* Lead Capture Form */}
        <section id="form" className="py-24 bg-white text-black border-b-2 border-black">
          <div className="max-w-6xl mx-auto px-4">
            <LeadCaptureForm />
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-24 bg-white text-black border-b-2 border-black">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-16 tracking-tight">
              O Que o Sistema de IA Oferece Para Sua Academia
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="border-2 border-black p-6">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-3">Dashboard de Risco em Tempo Real</h3>
                <p className="text-gray-700 mb-4">
                  Veja todos os alunos em risco de cancelamento ranqueados por urgência.
                  Lista atualizada automaticamente pela IA.
                </p>
                <div className="bg-white text-black p-3">
                  <p className="text-sm">• Risco alto: 3+ faltas (ação imediata)</p>
                  <p className="text-sm">• Risco médio: queda de frequência</p>
                  <p className="text-sm">• Risco baixo: comportamento estável</p>
                </div>
              </div>

              <div className="border-2 border-black p-6">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold mb-3">IA Prevê Cancelamentos com 85% de Precisão</h3>
                <p className="text-gray-700 mb-4">
                  Machine Learning analisa histórico de cancelamentos e identifica padrões
                  antes invisíveis para você.
                </p>
                <div className="bg-white text-black p-3">
                  <p className="text-sm">• Previsão com 30 dias de antecedência</p>
                  <p className="text-sm">• Aprendizado contínuo com seus dados</p>
                  <p className="text-sm">• Precisão aumenta com o tempo</p>
                </div>
              </div>

              <div className="border-2 border-black p-6">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-2xl font-bold mb-3">Mensagens Personalizadas por Modalidade</h3>
                <p className="text-gray-700 mb-4">
                  Copy adaptada para musculação, dança, crossfit, pilates, funcional, yoga.
                  Tom e abordagem específicos para cada perfil.
                </p>
                <div className="bg-white text-black p-3">
                  <p className="text-sm">• CrossFit: foco em comunidade e desafio</p>
                  <p className="text-sm">• Musculação: resultados e progresso</p>
                  <p className="text-sm">• Pilates: bem-estar e regularidade</p>
                </div>
              </div>

              <div className="border-2 border-black p-6">
                <div className="text-4xl mb-4">🔗</div>
                <h3 className="text-2xl font-bold mb-3">Integra com Tecnofit, Quiver, EvolluX</h3>
                <p className="text-gray-700 mb-4">
                  IA usa dados do seu sistema de gestão para monitorar frequência e detectar
                  padrões automaticamente.
                </p>
                <div className="bg-white text-black p-3">
                  <p className="text-sm">• Sincronização automática via API</p>
                  <p className="text-sm">• Não precisa trocar seu sistema</p>
                  <p className="text-sm">• Funciona standalone se preferir</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparação Visual */}
        <section className="py-24 border-b-2 border-black">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-16 tracking-tight">
              Prevenção com IA vs Gestão Manual de Evasão
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="border-2 border-black p-8">
                <h3 className="text-3xl font-bold mb-6">❌ SEM NEOFITFLOW</h3>
                <div className="space-y-4">
                  <div className="border-b-2 border-gray-300 pb-4">
                    <p className="text-xl font-bold mb-2">Detecção de Risco</p>
                    <p className="text-gray-600 font-normal">Manual, atrasada, você só vê quando já cancelou</p>
                  </div>
                  <div className="border-b-2 border-gray-300 pb-4">
                    <p className="text-xl font-bold mb-2">Ação</p>
                    <p className="text-gray-600 font-normal">Reativa, depois do cancelamento, tarde demais</p>
                  </div>
                  <div className="border-b-2 border-gray-300 pb-4">
                    <p className="text-xl font-bold mb-2">Visibilidade</p>
                    <p className="text-gray-600 font-normal">Zero - você não sabe quem está em risco agora</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold mb-2">Resultado</p>
                    <p className="text-gray-600 font-normal">Evasão alta, receita instável, surpresas ruins</p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-black p-8 bg-white text-black">
                <h3 className="text-3xl font-bold mb-6">✅ COM NEOFITFLOW</h3>
                <div className="space-y-4">
                  <div className="border-b-2 border-black pb-4">
                    <p className="text-xl font-bold mb-2">Detecção de Risco</p>
                    <p className="text-gray-700 font-normal">Automática com IA, em tempo real, 30 dias antes</p>
                  </div>
                  <div className="border-b-2 border-black pb-4">
                    <p className="text-xl font-bold mb-2">Ação</p>
                    <p className="text-gray-700 font-normal">Preventiva, antes de cancelar, pelo WhatsApp</p>
                  </div>
                  <div className="border-b-2 border-black pb-4">
                    <p className="text-xl font-bold mb-2">Visibilidade</p>
                    <p className="text-gray-700 font-normal">Dashboard com lista de alunos em risco ranqueados</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold mb-2">Resultado</p>
                    <p className="text-gray-700 font-normal">Evasão reduzida em 40%, receita previsível e estável</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 text-black border-2 border-black p-8 text-center">
              <p className="text-3xl font-bold mb-4">🎯 O Diferencial da IA:</p>
              <p className="text-xl mb-2">Identifica padrões invisíveis para o olho humano</p>
              <p className="text-xl mb-2">Age em segundos quando detecta risco</p>
              <p className="text-xl">Aprende continuamente para ficar mais precisa</p>
            </div>
          </div>
        </section>

        {/* Casos de Uso por Modalidade */}
        <section className="py-24 bg-white text-black border-b-2 border-black">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-4 tracking-tight">
              Funciona Para Todos os Tipos de Academia
            </h2>
            <p className="text-xl text-center text-gray-700 mb-16 max-w-3xl mx-auto">
              Mensagens e fluxos personalizados para cada modalidade
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-2 border-black p-8 text-center hover:bg-white hover:text-black transition-all">
                <div className="text-6xl font-bold mb-4">💪</div>
                <h3 className="text-2xl font-bold mb-4">Musculação</h3>
                <p className="text-gray-700 hover:text-gray-700 mb-4">
                  IA identifica queda na frequência e envia motivação focada em resultados e evolução do treino
                </p>
              </div>

              <div className="border-2 border-black p-8 text-center hover:bg-white hover:text-black transition-all">
                <div className="text-6xl font-bold mb-4">🔥</div>
                <h3 className="text-2xl font-bold mb-4">CrossFit</h3>
                <p className="text-gray-700 hover:text-gray-700 mb-4">
                  Detecta ausências e reforça senso de comunidade, desafios e espírito de equipe do box
                </p>
              </div>

              <div className="border-2 border-black p-8 text-center hover:bg-white hover:text-black transition-all">
                <div className="text-6xl font-bold mb-4">🧘</div>
                <h3 className="text-2xl font-bold mb-4">Pilates / Yoga</h3>
                <p className="text-gray-700 hover:text-gray-700 mb-4">
                  Foco em bem-estar, regularidade e importância da constância para saúde física e mental
                </p>
              </div>

              <div className="border-2 border-black p-8 text-center hover:bg-white hover:text-black transition-all">
                <div className="text-6xl font-bold mb-4">💃</div>
                <h3 className="text-2xl font-bold mb-4">Dança</h3>
                <p className="text-gray-700 hover:text-gray-700 mb-4">
                  Mensagens sobre evolução na coreografia, próximos eventos e clima de diversão da turma
                </p>
              </div>

              <div className="border-2 border-black p-8 text-center hover:bg-white hover:text-black transition-all">
                <div className="text-6xl font-bold mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-4">Funcional</h3>
                <p className="text-gray-700 hover:text-gray-700 mb-4">
                  Reforça variedade dos treinos, condicionamento geral e benefícios para rotina do aluno
                </p>
              </div>

              <div className="border-2 border-black p-8 text-center hover:bg-white hover:text-black transition-all">
                <div className="text-6xl font-bold mb-4">🥊</div>
                <h3 className="text-2xl font-bold mb-4">Luta / MMA</h3>
                <p className="text-gray-700 hover:text-gray-700 mb-4">
                  Motivação com foco em disciplina, superação e evolução técnica constante
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - EXPANDED */}
        <section className="py-24 border-b-2 border-black">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-4 tracking-tight">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-center text-gray-600 mb-16">
              Respostas para as dúvidas mais comuns sobre o sistema
            </p>
            <div className="space-y-6">
              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  💰 Quanto custa o NeoFitFlow?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  Planos a partir de R$ 297/mês para academias com até 150 alunos. Investimento se paga evitando apenas 2-3 cancelamentos por mês. Oferecemos demonstração gratuita para você ver o ROI antes de contratar.
                </p>
              </details>

              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  🤖 Como a IA identifica alunos em risco de cancelamento?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  A IA analisa padrões de comportamento como faltas consecutivas (3+), queda na frequência semanal,
                  mudanças frequentes de horário e outros sinais de desengajamento. Quando detecta risco alto,
                  dispara ação preventiva automaticamente via WhatsApp.
                </p>
              </details>

              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  🏋️ Funciona para academias pequenas com menos de 100 alunos?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  Sim! Academias pequenas se beneficiam ainda mais, pois cada aluno representa percentual maior da receita.
                  A IA monitora 100% dos alunos 24/7, algo impossível de fazer manualmente mesmo com equipe pequena.
                </p>
              </details>

              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  🔗 Preciso trocar meu sistema de gestão atual (Tecnofit, Quiver)?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  Não! O NeoFitFlow integra via API com Tecnofit, Quiver, EvolluX e outros sistemas. A IA usa os dados
                  de frequência do seu sistema para detectar padrões. Se não usa sistema, também funciona standalone.
                </p>
              </details>

              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  📊 Qual a precisão da IA em prever cancelamentos?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  A precisão média é de 85% e aumenta com o tempo conforme a IA aprende padrões específicos da sua academia.
                  O sistema prevê risco com até 30 dias de antecedência, dando tempo de agir preventivamente.
                </p>
              </details>

              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  💬 As mensagens automáticas não parecem robotizadas?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  Não! As mensagens são personalizadas com nome do aluno, modalidade praticada e contexto específico.
                  Tom empático e humanizado. Alunos sentem que a academia se importa e está prestando atenção neles.
                </p>
              </details>

              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  ⏰ Quanto tempo leva para implementar e ver resultados?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  Implementação leva 1-2 dias (integração + configuração inicial). A IA começa a detectar padrões imediatamente,
                  mas resultados mais expressivos aparecem após 30 dias quando há histórico suficiente para análise preditiva.
                </p>
              </details>

              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  📱 Preciso ter número comercial do WhatsApp?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  Recomendamos WhatsApp Business (gratuito), mas funciona com número pessoal também. Integramos via API oficial do Meta, garantindo que suas mensagens não sejam bloqueadas.
                </p>
              </details>

              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  🔒 Os dados dos meus alunos ficam seguros?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  Sim! Somos 100% LGPD compliant. Dados criptografados, armazenamento em servidores brasileiros, e você mantém total controle sobre as informações. Nunca compartilhamos dados com terceiros.
                </p>
              </details>

              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  🎯 Tem contrato de fidelidade? Posso cancelar quando quiser?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  Não trabalhamos com fidelidade. Você pode cancelar a qualquer momento. Estamos confiantes que os resultados farão você querer continuar, então não prendemos ninguém por contrato.
                </p>
              </details>

              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  👥 Preciso de equipe técnica para usar?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  Não! Interface simples e intuitiva. Nossa equipe faz toda a configuração inicial e você recebe treinamento completo. Depois é só acompanhar o dashboard e ver o sistema trabalhar por você.
                </p>
              </details>

              <details className="group border-2 border-black p-6 hover:bg-white hover:text-black transition-all">
                <summary className="font-bold cursor-pointer text-xl">
                  ⚠️ E se o sistema identificar falsos positivos?
                </summary>
                <p className="mt-4 text-gray-700 group-hover:text-gray-700">
                  A IA aprende continuamente e a taxa de falsos positivos é baixa (menos de 10%). Mesmo quando detecta incorretamente, a mensagem é positiva e reforça engajamento - nunca prejudica a relação com aluno.
                </p>
              </details>
            </div>

            {/* CTA after FAQ */}
            <div className="mt-12 text-center bg-gray-50 text-black border-2 border-black p-8">
              <p className="text-2xl font-bold mb-4">Ainda tem dúvidas?</p>
              <p className="text-lg text-gray-700 mb-6">
                Fale com nosso especialista e tire todas as suas dúvidas na demonstração
              </p>
              <a
                href="#form"
                className="inline-block bg-black text-white px-8 py-4 font-bold hover:bg-gray-100 transition-colors text-lg border-2 border-black"
              >
                📞 Agendar Demonstração Gratuita
              </a>
            </div>
          </div>
        </section>

        {/* Social Proof - ENHANCED */}
        <section className="py-24 border-b-2 border-black">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Academias Que Já Reduziram Evasão Com IA
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Veja resultados reais de donos de academia que implementaram o NeoFitFlow
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                <div className="border-2 border-black p-6 md:p-8 hover:bg-white hover:text-black transition-all group">
                  <div className="text-5xl mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="text-lg md:text-xl italic mb-4 group-hover:text-gray-800">
                    &quot;Reduzi evasão em <span className="font-bold underline">35% no primeiro trimestre</span>. A IA detectou 18 alunos em risco que eu não tinha percebido.&quot;
                  </p>
                  <div className="border-t-2 border-black group-hover:border-black pt-4">
                    <p className="font-bold">Ricardo M.</p>
                    <p className="text-sm text-gray-600 group-hover:text-gray-600">Dono - Academia Musculação • SP</p>
                    <p className="text-sm mt-2 font-bold text-green-500">💰 Recuperou R$ 12.600 em 3 meses</p>
                  </div>
                </div>

                <div className="border-2 border-black p-6 md:p-8 hover:bg-white hover:text-black transition-all group">
                  <div className="text-5xl mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="text-lg md:text-xl italic mb-4 group-hover:text-gray-800">
                    &quot;Finalmente consigo <span className="font-bold underline">agir ANTES do aluno cancelar</span>. Dashboard de risco mudou o jogo completamente.&quot;
                  </p>
                  <div className="border-t-2 border-black group-hover:border-black pt-4">
                    <p className="font-bold">Felipe K.</p>
                    <p className="text-sm text-gray-600 group-hover:text-gray-600">Gestor - Box CrossFit • PR</p>
                    <p className="text-sm mt-2 font-bold text-green-500">📈 Taxa de retenção subiu 42%</p>
                  </div>
                </div>

                <div className="border-2 border-black p-6 md:p-8 hover:bg-white hover:text-black transition-all group">
                  <div className="text-5xl mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="text-lg md:text-xl italic mb-4 group-hover:text-gray-800">
                    &quot;Mensagens automáticas <span className="font-bold underline">recuperaram 12 alunas</span> que iam cancelar. ROI positivo no primeiro mês.&quot;
                  </p>
                  <div className="border-t-2 border-black group-hover:border-black pt-4">
                    <p className="font-bold">Ana Carolina S.</p>
                    <p className="text-sm text-gray-600 group-hover:text-gray-600">Proprietária - Studio Pilates • RJ</p>
                    <p className="text-sm mt-2 font-bold text-green-500">✅ Evitou 12 cancelamentos</p>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="bg-gray-50 text-black border-2 border-black p-8">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#818CF8' }}>150+</p>
                    <p className="text-gray-700 font-normal">Academias usando</p>
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#34D399' }}>40%</p>
                    <p className="text-gray-700 font-normal">Redução média de evasão</p>
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#A78BFA' }}>85%</p>
                    <p className="text-gray-700 font-normal">Precisão da IA</p>
                  </div>
                  <div>
                    <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#FCD34D' }}>30d</p>
                    <p className="text-gray-700 font-normal">Antecedência do alerta</p>
                  </div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="mt-8 p-6 max-w-2xl mx-auto" style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', border: '2px solid #34D399' }}>
                <p className="text-2xl font-bold mb-3" style={{ color: '#34D399' }}>✅ Garantia de 30 Dias</p>
                <p className="text-lg">
                  Se o sistema não identificar pelo menos 3 alunos em risco que você não sabia nos primeiros 30 dias, devolvemos 100% do valor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Highlights */}
        <section className="py-24 border-b-2 border-black">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                📚 Aprenda Mais Sobre Retenção de Alunos
              </h2>
              <p className="text-xl text-gray-600">
                Guias práticos sobre como reduzir evasão e manter alunos engajados
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <a
                href="/blog/como-reduzir-evasao-alunos-academia"
                className="border-2 border-black p-6 hover:bg-white hover:text-black transition-all group"
              >
                <div className="text-sm text-gray-600 group-hover:text-gray-600 mb-2">Retenção</div>
                <h3 className="text-xl font-bold mb-3">Como Reduzir Evasão de Alunos: 7 Estratégias Comprovadas</h3>
                <p className="text-gray-700 group-hover:text-gray-700">
                  Descubra as principais causas da evasão e aprenda estratégias práticas para reter mais alunos.
                </p>
              </a>

              <a
                href="/blog/automatizar-whatsapp-academia-guia-completo"
                className="border-2 border-black p-6 hover:bg-white hover:text-black transition-all group"
              >
                <div className="text-sm text-gray-600 group-hover:text-gray-600 mb-2">Automação</div>
                <h3 className="text-xl font-bold mb-3">Como IA Previne Cancelamentos em Academias</h3>
                <p className="text-gray-700 group-hover:text-gray-700">
                  Entenda como Inteligência Artificial identifica padrões de risco e age preventivamente.
                </p>
              </a>

              <a
                href="/blog/melhor-crm-academia-pequena"
                className="border-2 border-black p-6 hover:bg-white hover:text-black transition-all group"
              >
                <div className="text-sm text-gray-600 group-hover:text-gray-600 mb-2">Gestão</div>
                <h3 className="text-xl font-bold mb-3">Sistema de Retenção vs CRM Tradicional: Qual Escolher?</h3>
                <p className="text-gray-700 group-hover:text-gray-700">
                  Compare sistemas focados em retenção com IA vs CRMs genéricos para academias.
                </p>
              </a>
            </div>

            <div className="text-center">
              <a
                href="/blog"
                className="inline-block border-2 border-black px-8 py-4 font-bold hover:bg-white hover:text-black transition-colors text-lg"
              >
                Ver Todos os Artigos →
              </a>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 bg-white text-black border-b-2 border-black">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">
              Pronto Para Reduzir Evasão da Sua Academia
              <br />
              Com Inteligência Artificial?
            </h2>
            <p className="text-2xl mb-8 text-gray-700">
              Veja demonstração de como a IA detecta alunos em risco e age automaticamente
            </p>

            <a
              href="https://wa.me/5531995255982?text=Quero%20ver%20demonstração%20da%20IA%20NeoFitFlow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white px-12 py-6 hover:scale-105 transition-all font-bold text-2xl mb-6 shadow-lg"
              style={{ backgroundColor: '#8B5CF6', border: '2px solid #8B5CF6' }}
            >
              🤖 Ver Demonstração da IA
            </a>

            <div className="border-2 border-black p-6 max-w-2xl mx-auto">
              <p className="text-lg font-bold mb-3">O que você recebe na demonstração (15 min):</p>
              <div className="space-y-2 text-left">
                <p>✓ Dashboard de risco em tempo real funcionando</p>
                <p>✓ Exemplos de alunos detectados pela IA</p>
                <p>✓ Mensagens automáticas personalizadas</p>
                <p>✓ Análise de potencial de redução de evasão na sua academia</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 text-black py-12 border-t-2 border-black">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold mb-4 tracking-tight">NeoFitFlow</div>
                <p className="text-gray-600">
                  Sistema de IA para retenção de alunos - detecta risco de cancelamento e age preventivamente via WhatsApp.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-lg">Produto</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#solucao" className="hover:text-primary transition-colors">Como Funciona</a></li>
                  <li><a href="https://wa.me/5531995255982" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Demonstração</a></li>
                  <li><a href="https://wa.me/5531995255982" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Preços</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-lg">Conteúdo</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="/blog/como-reduzir-evasao-alunos-academia" className="hover:text-primary transition-colors">Guias de Retenção</a></li>
                  <li><a href="/blog/automatizar-whatsapp-academia-guia-completo" className="hover:text-primary transition-colors">IA para Academias</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-lg">Empresa</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="https://wa.me/5531995255982" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Contato</a></li>
                  <li><a href="https://wa.me/5531995255982" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Suporte</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-lg">Legal</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><a href="#privacidade" className="hover:text-primary transition-colors">Privacidade</a></li>
                  <li><a href="#termos" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t-2 border-gray-300 mt-8 pt-8 text-center text-gray-600">
              <p>© 2025 NeoFitFlow. Todos os direitos reservados.</p>
              <p className="text-sm mt-2">Feito com 🖤 para donos de academia que querem reter mais alunos</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}