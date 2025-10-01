'use client';

import Link from "next/link";
import { useState, useMemo } from "react";

// Configuração de categorias com cores e ícones
const categoryConfig: Record<string, { color: string; textColor: string; icon: string; gradient: string }> = {
  'Retenção': {
    color: 'bg-primary/10',
    textColor: 'text-primary',
    icon: '🎯',
    gradient: 'from-primary to-primary-dark'
  },
  'IA & Retenção': {
    color: 'bg-secondary/10',
    textColor: 'text-secondary',
    icon: '🤖',
    gradient: 'from-secondary to-accent'
  },
  'Automação': {
    color: 'bg-accent/10',
    textColor: 'text-accent',
    icon: '⚡',
    gradient: 'from-accent to-success'
  },
  'Vendas': {
    color: 'bg-success/10',
    textColor: 'text-success',
    icon: '💰',
    gradient: 'from-success to-primary'
  },
  'Gestão': {
    color: 'bg-danger/10',
    textColor: 'text-danger',
    icon: '📊',
    gradient: 'from-danger to-accent'
  },
  'Marketing': {
    color: 'bg-secondary/10',
    textColor: 'text-secondary',
    icon: '📣',
    gradient: 'from-secondary to-primary'
  },
  'Específico': {
    color: 'bg-primary/10',
    textColor: 'text-primary',
    icon: '🎪',
    gradient: 'from-primary to-secondary'
  },
};

// Função para calcular tempo de leitura
const getReadingTime = (excerpt: string) => {
  const wordsPerMinute = 200;
  const words = excerpt.split(' ').length * 8; // Estimativa baseada no excerpt
  return Math.ceil(words / wordsPerMinute);
};

// Função para data relativa
const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Hoje';
  if (diffInDays === 1) return 'Ontem';
  if (diffInDays < 7) return `${diffInDays} dias atrás`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} semanas atrás`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} meses atrás`;
  return date.toLocaleDateString('pt-BR');
};

// Import dos posts (será gerado automaticamente)
const blogPosts = [
  {
    "slug": "3-faltas-consecutivas-sinal-vermelho-nao-pode-ignorar",
    "title": "3 Faltas Consecutivas: O Sinal Vermelho Que Você Não Pode Ignorar",
    "excerpt": "Por que 3 faltas seguidas é o indicador mais crítico de evasão iminente e como agir nas primeiras 24h após detectar.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "academia-24-horas-retencao-digital-ambiente-sem-recepcao",
    "title": "Academia 24 Horas: Retenção Digital em Ambiente Sem Recepção",
    "excerpt": "Como IA compensa ausência de equipe presencial em academias 24h através de automação inteligente de retenção.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "academia-como-segunda-casa-ambiente-ninguem-quer-deixar",
    "title": "Academia Como Segunda Casa: O Ambiente Que Ninguém Quer Deixar",
    "excerpt": "Como criar atmosfera acolhedora e cultura forte que transforma academia em lugar de pertencimento emocional.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "academia-hibrida-musculacao-funcional-ia-gerencia-modalidades-multiplas",
    "title": "Academia Híbrida (Musculação + Funcional): Como IA Gerencia Modalidades Múltiplas",
    "excerpt": "Estratégia para academias que oferecem múltiplas modalidades: como IA rastreia engajamento por tipo de treino.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "acompanhamento-pos-retorno-aluno-garantir-fica-dessa-vez",
    "title": "Acompanhamento Pós-Retorno do Aluno: Garantir Que Fique Dessa Vez",
    "excerpt": "Protocolo de acompanhamento após trazer aluno de volta - como consolidar retorno e evitar segunda evasão.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "alertas-automaticos-risco-alto-priorize-onde-investir-energia",
    "title": "Alertas Automáticos de Risco Alto: Priorize Onde Investir Energia",
    "excerpt": "Como sistemas de IA classificam alunos por nível de risco (verde, amarelo, vermelho) para você focar nos mais críticos primeiro.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "aluno-fantasma-academia-como-identificar-resgatar",
    "title": "Aluno Fantasma em Academia: Como Identificar e Resgatar",
    "excerpt": "Estratégia específica para alunos que pagam mas nunca frequentam - como detectar, abordar e reativar.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "aluno-nao-renova-como-prevenir-antes-vencimento",
    "title": "Aluno Que Não Renova: Como Prevenir Antes do Vencimento",
    "excerpt": "Estratégias para detectar intenção de não renovação 45-60 dias antes do vencimento e ações preventivas eficazes.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "aluno-se-sentir-especial-estrategia-retencao-emocional",
    "title": "Fazer Aluno Se Sentir Especial: Estratégia de Retenção Emocional",
    "excerpt": "Como criar experiências personalizadas que fazem cada aluno sentir que é único e valorizado pela academia.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "aluno-treina-so-fim-semana-risco-oculto-evasao",
    "title": "Aluno Que Treina Só no Fim de Semana: Risco Oculto de Evasão",
    "excerpt": "Por que alunos que treinam apenas sábado/domingo têm maior taxa de cancelamento e como aumentar frequência.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "aluno-veterano-some-como-recuperar-engajamento-antigo",
    "title": "Aluno Veterano Que Some: Como Recuperar Engajamento Antigo",
    "excerpt": "Estratégia específica para alunos fiéis há anos que subitamente reduzem frequência - sinais diferentes, abordagem diferente.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "antes-depois-sistema-retencao-cases-reais-transformadores",
    "title": "Antes e Depois de Sistema de Retenção: Cases Reais Transformadores",
    "excerpt": "Compare métricas de academias antes e depois de implementar IA: evasão, MRR, tempo de gestão e satisfação de alunos.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "automatizar-whatsapp-academia-guia-completo",
    "title": "Como Automatizar WhatsApp da Academia: Guia Completo 2025",
    "excerpt": "Guia completo sobre como automatizar whatsapp da academia: guia completo 2025. Aprenda estratégias práticas e comprovadas para melhorar resultados da ",
    "category": "Automação",
    "date": "2025-10-01"
  },
  {
    "slug": "bootcamp-engajamento-continuo-ia-mantem-intensidade",
    "title": "Bootcamp e Engajamento Contínuo: Como IA Mantém a Intensidade",
    "excerpt": "Retenção em bootcamps outdoor: como IA ajuda manter engajamento mesmo sem estrutura física da academia.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "boutique-fitness-retencao-premium-experiencia-personalizada-ia",
    "title": "Boutique Fitness: Retenção Premium Com Experiência Personalizada Por IA",
    "excerpt": "Como studios boutique usam IA para entregar experiência ultra-personalizada que justifica mensalidade premium.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "breakeven-sistema-anti-evasao-quanto-tempo-se-paga",
    "title": "Breakeven de Sistema Anti-Evasão: Em Quanto Tempo Se Paga",
    "excerpt": "Análise realista mostrando em quantos meses um sistema de retenção com IA se paga através de alunos recuperados.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "celebrar-vitorias-pequenas-aluno-engajamento-continuo",
    "title": "Celebrar Vitórias Pequenas do Aluno: Engajamento Contínuo",
    "excerpt": "Como reconhecer e celebrar micro-progressos mantém motivação alta e cria senso de realização constante.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "check-in-irregular-detectar-risco-medio-antes-virar-alto",
    "title": "Check-in Irregular: Como Detectar Risco Médio Antes de Virar Alto",
    "excerpt": "Aprenda a identificar irregularidade no padrão de check-ins como sinal precoce de desengajamento antes das faltas.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "churn-rate-academia-benchmarks-brasil-2025-como-reduzir",
    "title": "Churn Rate em Academia: Benchmarks Brasil 2025 e Como Reduzir",
    "excerpt": "Compare sua taxa de churn com médias do mercado fitness brasileiro e aprenda estratégias comprovadas para reduzir.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "como-antecipar-pedido-cancelamento-prevencao-60-dias-antes",
    "title": "Como Antecipar Pedido de Cancelamento: Prevenção 60 Dias Antes",
    "excerpt": "Sinais comportamentais que aparecem 2 meses antes do pedido formal de cancelamento e como agir proativamente.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "como-ia-aprende-padroes-sua-academia-machine-learning-adaptativo",
    "title": "Como IA Aprende os Padrões da Sua Academia: Machine Learning Adaptativo",
    "excerpt": "Descubra como sistemas de IA se adaptam ao perfil único da sua academia e melhoram com o tempo usando aprendizado contínuo.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "como-ia-identifica-aluno-risco-cancelamento-antes-sair",
    "title": "Como IA Identifica Aluno em Risco de Cancelamento Antes de Sair da Academia",
    "excerpt": "Descubra como sistemas de IA monitoram padrões de comportamento e identificam alunos em risco de cancelamento 30 dias antes com 85% de precisão.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "como-medir-risco-cancelamento-kpis-metricas-essenciais",
    "title": "Como Medir Risco de Cancelamento: KPIs e Métricas Essenciais",
    "excerpt": "Descubra quais métricas realmente indicam risco de cancelamento e como criar seu próprio sistema de scoring de risco.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "comparativo-evasao-academia-com-vs-sem-sistema-ia",
    "title": "Comparativo: Evasão em Academia Com vs Sem Sistema de IA",
    "excerpt": "Análise detalhada comparando taxa de evasão, custo operacional e receita em academias com e sem sistema de IA.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "comportamento-antes-sair-academia-analise-preditiva",
    "title": "Comportamento Antes de Sair da Academia: Análise Preditiva",
    "excerpt": "Estudo de padrões comportamentais 30-60 dias antes do cancelamento: o que muda e como detectar precocemente.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "custo-real-evasao-sua-academia-calculadora-completa",
    "title": "Custo Real da Evasão na Sua Academia: Calculadora Completa [2025]",
    "excerpt": "Calcule exatamente quanto você está perdendo com evasão mensal: CAC perdido, MRR não realizado e oportunidade de upsell.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "dashboard-risco-tempo-real-monitore-cancelamentos-com-ia",
    "title": "Dashboard de Risco em Tempo Real: Monitore Cancelamentos 24/7 Com IA",
    "excerpt": "Veja todos os alunos em risco de cancelamento em um único painel visual atualizado em tempo real pela inteligência artificial.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "desafios-metas-manter-frequencia-alta-objetivos",
    "title": "Desafios e Metas: Como Manter Frequência Alta Com Objetivos",
    "excerpt": "Use mecânica de gamificação com desafios de frequência (treinar 3x/semana por 30 dias) para engajar alunos.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "deteccao-automatica-faltas-consecutivas-sistema-que-nao-falha",
    "title": "Detecção Automática de Faltas Consecutivas: O Sistema Que Não Falha",
    "excerpt": "Como IA detecta 100% das sequências de 3+ faltas consecutivas e aciona ações preventivas antes que vire cancelamento.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "empatia-mensagens-automaticas-possivel-necessario",
    "title": "Empatia em Mensagens Automáticas: Possível e Necessário",
    "excerpt": "Como criar fluxos automatizados que soam humanos, empáticos e personalizados mesmo sendo enviados por sistema.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "engajamento-pos-matricula-primeiros-30-dias-criticos",
    "title": "Engajamento Pós-Matrícula: Os Primeiros 30 Dias São Críticos",
    "excerpt": "Guia completo sobre a janela mais importante da jornada do aluno - como garantir frequência alta nos primeiros 30 dias.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "escalada-indoor-retencao-desafio-progressivo-comunidade",
    "title": "Escalada Indoor: Retenção Por Desafio Progressivo e Comunidade",
    "excerpt": "Como academias de escalada usam IA para monitorar progressão em rotas e manter motivação por conquistas.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "evasao-mensal-vs-anual-academia-analise-diferencas-criticas",
    "title": "Evasão Mensal vs Anual em Academia: Análise e Diferenças Críticas",
    "excerpt": "Entenda a diferença entre medir evasão mensal vs anual, como calcular corretamente e qual usar para tomar decisões.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "evasao-por-modalidade-dados-musculacao-crossfit-pilates",
    "title": "Evasão Por Modalidade: Dados de Musculação, CrossFit, Pilates e Mais",
    "excerpt": "Compare taxas de evasão entre diferentes modalidades e entenda por que algumas retêm melhor que outras.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "evasao-zero-academia-possivel-ou-utopia-analise-realista",
    "title": "Evasão Zero em Academia: É Possível ou Utopia? Análise Realista",
    "excerpt": "Discussão honesta sobre limites da retenção, evasão natural vs evitável e metas realistas para sua academia alcançar.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "feedback-loop-aluno-ativo-ajuda-reter-outros-alunos",
    "title": "Feedback Loop: Como Aluno Ativo Ajuda a Reter Outros Alunos",
    "excerpt": "Entenda como criar círculos virtuosos onde alunos engajados influenciam positivamente outros membros da comunidade.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "futuro-retencao-academias-ia-novo-padrao-2025",
    "title": "O Futuro da Retenção em Academias: IA é o Novo Padrão em 2025",
    "excerpt": "Análise de tendências mostrando como academias líderes estão adotando IA para retenção e o que isso significa para o mercado.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "gamificacao-engajamento-pontos-niveis-desafios",
    "title": "Gamificação Para Engajamento: Pontos, Níveis e Desafios",
    "excerpt": "Como elementos de jogo aumentam engajamento e frequência transformando treino em experiência viciante.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "hiit-ia-motiva-aluno-voltar-apos-treino-intenso",
    "title": "HIIT: Como IA Motiva Aluno a Voltar Após Treino Intenso",
    "excerpt": "Estratégia para treinos de alta intensidade onde recuperação e prevenção de overtraining são críticos para retenção.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "horarios-vazios-academia-oportunidade-perdida-retencao",
    "title": "Horários Vazios na Academia: Oportunidade Perdida de Retenção",
    "excerpt": "Como usar análise de ocupação de horários para identificar alunos em risco e oferecer alternativas mais convenientes.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "ia-academia-treinamento-funcional-alta-intensidade-alto-risco",
    "title": "IA Para Academia de Treinamento Funcional: Alta Intensidade, Alto Risco",
    "excerpt": "Estratégias para modalidades de alta intensidade onde overtraining e lesões são principais causas de evasão.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "ia-analisa-comportamento-alunos-o-que-sistema-monitora",
    "title": "IA Analisa Comportamento de Alunos: O Que o Sistema Monitora",
    "excerpt": "Lista completa de todos os pontos de dados que sistemas de IA analisam para prever cancelamentos: frequência, horários, padrões e mais.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "ia-economiza-tempo-gestor-20-horas-mes-recuperadas",
    "title": "Como IA Economiza 20 Horas Por Mês do Gestor de Academia",
    "excerpt": "Calcule quanto tempo sua equipe gasta monitorando alunos manualmente e descubra como IA automatiza esse trabalho.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "ia-monitora-frequencia-alunos-24-7-sistema-que-nunca-dorme",
    "title": "IA Monitora Frequência de Alunos 24/7: O Sistema Que Nunca Dorme",
    "excerpt": "Como sistemas de IA trabalham 24 horas por dia monitorando check-ins, faltas e padrões de comportamento para proteger sua receita.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "ia-personaliza-mensagens-modalidade-musculacao-crossfit-pilates",
    "title": "IA Personaliza Mensagens Por Modalidade: Musculação, CrossFit e Pilates",
    "excerpt": "Como sistemas inteligentes adaptam linguagem e abordagem para cada tipo de treino e perfil de aluno automaticamente.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "ia-reduz-evasao-ate-40-cases-reais-academias-brasileiras",
    "title": "IA Reduz Evasão em Até 40%: Cases Reais de Academias Brasileiras",
    "excerpt": "Estude casos reais de academias que reduziram evasão significativamente usando sistemas de IA e retenção automatizada.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "ia-retencao-academia-musculacao-especificidades-estrategias",
    "title": "IA Para Retenção em Academia de Musculação: Especificidades e Estratégias",
    "excerpt": "Como IA adapta abordagem de retenção para o contexto único de academias de musculação: rotina, progressão, platô.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "ia-vs-metodos-manuais-retencao-comparativo-completo-2025",
    "title": "IA vs Métodos Manuais de Retenção: Comparativo Completo 2025",
    "excerpt": "Compare eficácia, custo e escalabilidade entre monitoramento manual de alunos e sistemas automatizados com inteligência artificial.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "impacto-financeiro-1-menos-evasao-simulacao-sua-academia",
    "title": "Impacto Financeiro de 1% a Menos de Evasão: Simulação Para Sua Academia",
    "excerpt": "Veja como reduzir evasão em apenas 1% pode representar milhares de reais extras por ano na sua academia.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "inteligencia-artificial-retencao-alunos-academias-2025",
    "title": "Inteligência Artificial Para Retenção de Alunos em Academias [2025]",
    "excerpt": "Guia completo sobre como IA está revolucionando a retenção de alunos em academias brasileiras com casos reais e resultados.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "janeiro-evasao-academia-como-prevenir-abandono-pos-promessa",
    "title": "Janeiro e Evasão em Academia: Como Prevenir Abandono Pós-Promessa",
    "excerpt": "Estratégias específicas para reter os alunos de janeiro que entram motivados mas abandonam em fevereiro/março.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "kpis-retencao-academia-10-metricas-acompanhar-diariamente",
    "title": "KPIs de Retenção em Academia: 10 Métricas Para Acompanhar Diariamente",
    "excerpt": "Lista completa dos indicadores mais importantes para monitorar saúde da retenção e agir preventivamente.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "low-cost-reter-alunos-sem-personal-com-ia",
    "title": "Low-Cost: Como Reter Alunos Sem Personal e Com IA",
    "excerpt": "Estratégia para academias low-cost onde não há personal trainer: como IA compensa falta de atenção individualizada.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "machine-learning-detecta-padroes-evasao-invisveis",
    "title": "Machine Learning Detecta Padrões de Evasão Invisíveis ao Olho Humano",
    "excerpt": "Entenda como algoritmos de machine learning analisam milhares de pontos de dados para prever cancelamentos que gestores não conseguem ver.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "mensagem-preventiva-funciona-tom-timing-conteudo",
    "title": "Mensagem Preventiva Que Funciona: Tom, Timing e Conteúdo",
    "excerpt": "Anatomia de uma mensagem WhatsApp eficaz para recuperar aluno em risco: linguagem, momento e call-to-action.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "motivacao-traz-aluno-volta-psicologia-reativacao",
    "title": "Motivação Que Traz Aluno de Volta: Psicologia da Reativação",
    "excerpt": "Entenda os gatilhos psicológicos que realmente funcionam para trazer aluno de volta: progresso, comunidade, compromisso.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "mrr-protegido-sistema-anti-cancelamento-blindando-receita-recorrente",
    "title": "MRR Protegido Com Sistema Anti-Cancelamento: Blindando Receita Recorrente",
    "excerpt": "Entenda como cada aluno retido protege seu MRR e por que prevenir evasão é mais lucrativo que captar novos alunos.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "mudanca-horario-constante-alerta-desengajamento",
    "title": "Mudança de Horário Constante: Alerta de Desengajamento",
    "excerpt": "Como instabilidade de horários de treino indica falta de rotina consolidada e maior risco de abandono.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "natacao-academia-desafios-unicos-retencao-ia-ajuda",
    "title": "Natação em Academia: Desafios Únicos de Retenção e Como IA Ajuda",
    "excerpt": "Retenção em natação: horários fixos, dependência de raias, sazonalidade - como IA adapta estratégias.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "o-que-falar-aluno-sumiu-scripts-funcionam",
    "title": "O Que Falar Com Aluno Que Sumiu: Scripts Que Funcionam",
    "excerpt": "Modelos de mensagens testados e aprovados para diferentes cenários de ausência: 3 faltas, 1 semana, 2 semanas, 1 mês.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "oferecer-ajuda-sem-parecer-cobranca-arte-abordagem-preventiva",
    "title": "Oferecer Ajuda Sem Parecer Cobrança: Arte da Abordagem Preventiva",
    "excerpt": "Técnicas de comunicação para abordar aluno ausente com oferta de suporte genuíno ao invés de cobrança de presença.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "padroes-comportamento-indicam-cancelamento-iminente",
    "title": "Padrões de Comportamento Que Indicam Cancelamento Iminente",
    "excerpt": "Lista completa de micro-sinais comportamentais que, combinados, revelam aluno prestes a cancelar nos próximos 15 dias.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "perfil-aluno-cancela-mais-segmentacao-risco",
    "title": "Perfil de Aluno Que Cancela Mais: Segmentação de Risco",
    "excerpt": "Análise de perfis demográficos e comportamentais com maior propensão ao cancelamento para monitoramento prioritário.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "personal-touch-escala-ia-humanizacao-automatizada",
    "title": "Personal Touch em Escala Com IA: Humanização Automatizada",
    "excerpt": "Como sistemas de IA permitem personalização em massa - cada aluno recebe mensagem única e contextualizada automaticamente.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "personal-training-evitar-ghost-alunos-particulares-ia",
    "title": "Personal Training: Como Evitar Ghost de Alunos Particulares Com IA",
    "excerpt": "Aplicação de IA no contexto de personal trainer: monitorar sessões agendadas, remarques e engajamento 1:1.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "personalizacao-mensagem-perfil-aluno-iniciante-vs-veterano",
    "title": "Personalização de Mensagem Por Perfil: Aluno Iniciante vs Veterano",
    "excerpt": "Como adaptar abordagem conforme histórico do aluno - novo matrícula vs cliente antigo exigem comunicação diferente.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "pole-dance-comunidade-forte-retencao-atraves-conexao",
    "title": "Pole Dance: Comunidade Forte e Retenção Através de Conexão",
    "excerpt": "Caso único de pole dance onde comunidade feminina e empoderamento são pilares da retenção.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "pos-carnaval-retencao-periodo-critico-marco-abril",
    "title": "Pós-Carnaval e Retenção: O Período Crítico de Março a Abril",
    "excerpt": "Como combater a queda de frequência típica do outono brasileiro quando alunos perdem motivação pós-verão.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "pre-cancelamento-sinais-invisiveis-30-dias-antes-pedido",
    "title": "Pré-Cancelamento: Sinais Invisíveis 30 Dias Antes do Pedido",
    "excerpt": "Descubra os sinais sutis que aparecem um mês antes do cancelamento formal e janela de oportunidade para reverter.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "prevencao-inteligente-evasao-alem-simples-alerta-automatico",
    "title": "Prevenção Inteligente de Evasão: Além do Simples Alerta Automático",
    "excerpt": "Descubra a diferença entre alertas simples e sistemas inteligentes que analisam contexto, comportamento e padrões complexos.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "prevenir-evasao-antes-aconteca-estrategia-preventiva-ia",
    "title": "Prevenir Evasão Antes Que Aconteça: Estratégia Preventiva Com IA",
    "excerpt": "Mudança de mindset: do modelo reativo (lidar com cancelamento) para proativo (prevenir antes que aconteça).",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "prevenir-evasao-box-crossfit-comunidade-forte-ia",
    "title": "Prevenir Evasão em Box de CrossFit: Comunidade Forte Com IA",
    "excerpt": "Estratégia específica para CrossFit aproveitando força da comunidade e intensidade dos treinos com apoio de IA.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "previsao-cancelamento-85-precisao-como-funciona-tecnologia",
    "title": "Previsão de Cancelamento com 85% de Precisão: Como Funciona a Tecnologia",
    "excerpt": "Guia técnico sobre como sistemas de IA alcançam 85% de precisão na previsão de cancelamentos em academias usando análise preditiva.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "primeira-falta-momento-critico-define-retencao",
    "title": "A Primeira Falta: Momento Crítico Que Define Retenção",
    "excerpt": "Por que como você reage à primeira falta do aluno determina se ele volta ou inicia sequência de ausências.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "progresso-visivel-mostrar-evolucao-aumenta-retencao",
    "title": "Progresso Visível: Por Que Mostrar Evolução Aumenta Retenção",
    "excerpt": "Como tornar o progresso do aluno visível e mensurável aumenta percepção de valor e reduz evasão.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "quanto-voce-perde-evasao-calculadora-impacto-financeiro",
    "title": "Quanto Você Perde Com Evasão: Calculadora de Impacto Financeiro",
    "excerpt": "Use nossa calculadora para descobrir o impacto real da evasão no faturamento anual da sua academia considerando LTV e CAC.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "queda-frequencia-academia-quando-como-agir",
    "title": "Queda de Frequência em Academia: Quando e Como Agir",
    "excerpt": "Identifique quando a queda na frequência semanal é normal ou indica risco real de cancelamento e como intervir.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "reativacao-aluno-inativo-estrategias-funcionam-2025",
    "title": "Reativação de Aluno Inativo: Estratégias Que Funcionam em 2025",
    "excerpt": "Táticas comprovadas para reativar alunos que pararam de frequentar: ofertas, desafios, apoio social e mais.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "reducao-churn-6-meses-roadmap-passo-passo",
    "title": "Redução de Churn em 6 Meses: Roadmap Passo a Passo",
    "excerpt": "Plano detalhado de 6 meses para reduzir evasão progressivamente usando IA, automação e processos estruturados.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "reduzir-evasao-academia-tecnologia-guia-definitivo-2025",
    "title": "Reduzir Evasão em Academia Com Tecnologia: Guia Definitivo 2025",
    "excerpt": "Guia completo sobre todas as tecnologias disponíveis para combater evasão: IA, automação, análise preditiva e integração de dados.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "relacionamento-alem-treino-conexao-retem",
    "title": "Relacionamento Além do Treino: A Conexão Que Retém",
    "excerpt": "Por que academias que criam laços genuínos com alunos além do treino têm taxas de retenção 2x maiores.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "retencao-academia-mma-jiu-jitsu-lesoes-compromisso",
    "title": "Retenção em Academia de MMA e Jiu-Jitsu: Lesões e Compromisso",
    "excerpt": "Como lidar com evasão por lesão (comum em artes marciais) e manter engajamento durante recuperação.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "retencao-studio-pilates-ia-aulas-agendadas-faltas",
    "title": "Retenção em Studio de Pilates Com IA: Aulas Agendadas e Faltas",
    "excerpt": "Como sistemas de IA monitoram agendamentos e faltas em studios com aulas marcadas para evitar desengajamento.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "roi-sistema-ia-retencao-quanto-voce-ganha-volta",
    "title": "ROI de Sistema Com IA Para Retenção: Quanto Você Ganha de Volta",
    "excerpt": "Calcule o retorno sobre investimento de um sistema de IA comparando custo mensal vs alunos salvos e MRR protegido.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "sazonalidade-evasao-academia-padroes-ao-longo-ano",
    "title": "Sazonalidade e Evasão em Academia: Padrões ao Longo do Ano",
    "excerpt": "Análise mês a mês de quando evasão aumenta (março, julho, dezembro) e estratégias preventivas para cada período crítico.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "segmentacao-risco-evasao-verde-amarelo-laranja-vermelho",
    "title": "Segmentação Por Risco de Evasão: Verde, Amarelo, Laranja, Vermelho",
    "excerpt": "Sistema de classificação de alunos por nível de risco usando código de cores para priorização de ações.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "senso-comunidade-previne-evasao-criar-pertencimento",
    "title": "Senso de Comunidade Previne Evasão: Como Criar Pertencimento",
    "excerpt": "Estratégias práticas para transformar academia em comunidade onde alunos criam vínculos e não querem sair.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "silencio-antes-cancelamento-sinal-mais-ignorado",
    "title": "Silêncio Antes do Cancelamento: O Sinal Mais Ignorado",
    "excerpt": "Como falta de interação e engajamento é um indicador silencioso mas poderoso de evasão iminente.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "sistema-anti-cancelamento-academia-danca-diversao-frequencia",
    "title": "Sistema Anti-Cancelamento Para Academia de Dança: Diversão e Frequência",
    "excerpt": "Como IA identifica padrões de evasão específicos de dança onde diversão e socialização são motivadores principais.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "sistema-ia-aprende-cada-salvamento-melhora-continua-automatica",
    "title": "Sistema de IA Aprende Com Cada Salvamento: Melhora Contínua Automática",
    "excerpt": "Entenda como cada aluno recuperado ensina o sistema a melhorar suas previsões e se tornar mais preciso com o tempo.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "sistema-preditivo-cancelamento-nova-era-retencao",
    "title": "Sistema Preditivo de Cancelamento: A Nova Era da Retenção em Academias",
    "excerpt": "Entenda por que sistemas preditivos com IA estão substituindo métodos reativos tradicionais de retenção em academias brasileiras.",
    "category": "IA & Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "spinning-evasao-aulas-grupo-retem-melhor-tecnologia",
    "title": "Spinning e Evasão: Como Aulas em Grupo Retêm Melhor Com Tecnologia",
    "excerpt": "Aproveite dinâmica social de aulas coletivas de bike indoor com IA para aumentar compromisso e frequência.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "taxa-cancelamento-academia-como-calcular-benchmarks-2025",
    "title": "Taxa de Cancelamento em Academia: Como Calcular e Benchmarks 2025",
    "excerpt": "Aprenda a fórmula correta para calcular taxa de cancelamento e compare com médias por tipo e tamanho de academia no Brasil.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "taxa-evasao-primeiros-30-dias-como-reduzir-40-para-10",
    "title": "Taxa de Evasão nos Primeiros 30 Dias: Como Reduzir de 40% Para 10%",
    "excerpt": "Estratégias específicas para o período mais crítico de evasão - os primeiros 30 dias após matrícula do aluno novo.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "timing-perfeito-mensagem-retencao-ciencia-quando",
    "title": "Timing Perfeito Para Mensagem de Retenção: A Ciência do Quando",
    "excerpt": "Estudos mostram que enviar mensagem no horário e dia certos aumenta taxa de resposta em 3x. Descubra os melhores momentos.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "tom-certo-abordar-aluno-risco-empatia-vs-cobranca",
    "title": "Tom Certo Para Abordar Aluno em Risco: Empatia vs Cobrança",
    "excerpt": "Como equilibrar preocupação genuína com profissionalismo na abordagem de alunos em risco sem parecer cobrança.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "treinamento-funcional-outdoor-ia-gerencia-sazonalidade",
    "title": "Treinamento Funcional Outdoor: Como IA Gerencia Sazonalidade",
    "excerpt": "Desafio de treinos ao ar livre: clima, sazonalidade e inconstância - como IA adapta abordagem de retenção.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "verao-queda-frequencia-ferias-viagens-retencao",
    "title": "Verão e Queda de Frequência: Férias, Viagens e Retenção",
    "excerpt": "Estratégias para manter engajamento durante dezembro/janeiro quando alunos viajam e quebram rotina de treinos.",
    "category": "Gestão",
    "date": "2025-10-01"
  },
  {
    "slug": "whatsapp-humanizado-vs-robotizado-diferenca-retem",
    "title": "WhatsApp Humanizado vs Robotizado: A Diferença Que Retém",
    "excerpt": "Compare mensagens que parecem de robô vs humanizadas e por que linguagem natural aumenta taxa de resposta em 5x.",
    "category": "Retenção",
    "date": "2025-10-01"
  },
  {
    "slug": "yoga-retencao-manter-frequencia-pratica-baixa-intensidade",
    "title": "Yoga e Retenção: Como Manter Frequência em Prática de Baixa Intensidade",
    "excerpt": "Desafio único do yoga: manter engajamento em prática contemplativa sem intensidade física alta como gancho.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "zumba-frequencia-alta-atraves-diversao-ia-potencializa",
    "title": "Zumba: Frequência Alta Através de Diversão - IA Potencializa",
    "excerpt": "Como aulas de dança fitness mantêm engajamento por diversão e como IA garante que alunos não percam momentum.",
    "category": "Específico",
    "date": "2025-10-01"
  },
  {
    "slug": "como-medir-risco-de-cancelamento-kpis-e-metricas-essenciais",
    "title": "Como Medir Risco de Cancelamento: KPIs e Métricas Essenciais",
    "excerpt": "7 KPIs essenciais para medir risco: taxa de frequência, faltas consecutivas, NPS, tempo de permanência, engajamento. Aprenda a trackear e agir.",
    "category": "Geral",
    "date": "2025-03-29"
  },
  {
    "slug": "personal-touch-em-escala-com-ia-humanizacao-automatizada",
    "title": "Personal Touch em Escala com IA: Humanização Automatizada",
    "excerpt": "Impossível dar atenção personalizada para 500 alunos manualmente. IA permite: mensagem específica, histórico considerado, momento certo - em escala in",
    "category": "Geral",
    "date": "2025-03-29"
  },
  {
    "slug": "aluno-veterano-que-some-como-recuperar-engajamento-antigo",
    "title": "Aluno Veterano que Some: Como Recuperar Engajamento Antigo",
    "excerpt": "Aluno de 2+ anos que some é diferente de novato. Burnout, rotina, tédio. Como detectar sinais em veteranos e reengajar quem 'já viu de tudo'.",
    "category": "Geral",
    "date": "2025-03-28"
  },
  {
    "slug": "aluno-fantasma-em-academia-como-identificar-e-resgatar",
    "title": "Aluno Fantasma em Academia: Como Identificar e Resgatar",
    "excerpt": "Aluno fantasma: paga mas não aparece há 15+ dias. 85% cancelam em 60 dias. Sistema de detecção automática + estratégia de resgate antes do pedido.",
    "category": "Geral",
    "date": "2025-03-27"
  },
  {
    "slug": "taxa-de-cancelamento-em-academia-como-calcular-e-benchmarks-2025",
    "title": "Taxa de Cancelamento em Academia: Como Calcular e Benchmarks 2025",
    "excerpt": "Aprenda a calcular churn rate da sua academia corretamente. Benchmarks Brasil: 25-35%/ano é normal. Abaixo de 20% = excelente. Fórmulas e exemplos prá",
    "category": "Geral",
    "date": "2025-03-26"
  },
  {
    "slug": "machine-learning-detecta-padroes-de-evasao-que-voce-nao-ve-guia-completo",
    "title": "Machine Learning Detecta Padrões de Evasão que Você Não Vê: Guia Completo",
    "excerpt": "Descubra como algoritmos de machine learning identificam padrões invisíveis de evasão em academias, analisando 50+ variáveis simultaneamente para prev",
    "category": "Geral",
    "date": "2025-03-25"
  },
  {
    "slug": "aluno-se-sentir-especial-estrategia-de-retencao-emocional",
    "title": "Aluno Se Sentir Especial: Estratégia de Retenção Emocional",
    "excerpt": "Academia que faz aluno se sentir especial (não número) retém 2x mais. Técnicas: lembrar nome, histórico, objetivos, datas importantes, conquistas.",
    "category": "Geral",
    "date": "2025-03-24"
  },
  {
    "slug": "prevenir-evasao-em-box-de-crossfit-comunidade-forte-com-ia",
    "title": "Prevenir Evasão em Box de CrossFit: Comunidade Forte com IA",
    "excerpt": "CrossFit tem evasão 30% menor que musculação pela comunidade. Mas quando aluno se distancia, perda é rápida. Como IA detecta sinais únicos de crossfit",
    "category": "Geral",
    "date": "2025-03-23"
  },
  {
    "slug": "como-ia-economiza-tempo-do-gestor-20-horas-por-mes-recuperadas",
    "title": "Como IA Economiza Tempo do Gestor: 20 Horas por Mês Recuperadas",
    "excerpt": "Pare de revisar planilhas manualmente. IA automatiza monitoramento, detecção e primeira abordagem - economizando 20h/mês que você investe em crescimen",
    "category": "Geral",
    "date": "2025-03-22"
  },
  {
    "slug": "como-ia-preve-cancelamentos-em-academias-com-85-de-precisao",
    "title": "Como IA Prevê Cancelamentos em Academias com 85% de Precisão",
    "excerpt": "Descubra como a inteligência artificial do NeoFitFlow prevê cancelamentos 30 dias antes, detectando padrões invisíveis e salvando até 40% dos alunos e",
    "category": "Geral",
    "date": "2025-03-22"
  },
  {
    "slug": "comportamento-antes-de-sair-da-academia-analise-preditiva",
    "title": "Comportamento Antes de Sair da Academia: Análise Preditiva",
    "excerpt": "Análise de 5k ex-alunos revelou: 90 dias antes já mostravam sinais. Progressão típica: queda gradual → faltas → mudança horário → silêncio → pedido.",
    "category": "Geral",
    "date": "2025-03-22"
  },
  {
    "slug": "low-cost-como-reter-alunos-sem-personal-e-com-ia",
    "title": "Low Cost: Como Reter Alunos Sem Personal e Com IA",
    "excerpt": "Low cost: sem personal, sem aulas. Retenção é desafio. IA vira o 'personal virtual': orienta, motiva, celebra, previne - em escala e baixo custo.",
    "category": "Geral",
    "date": "2025-03-22"
  },
  {
    "slug": "mrr-protegido-com-sistema-anti-cancelamento-blindando-receita-recorrente",
    "title": "MRR Protegido com Sistema Anti-Cancelamento: Blindando Receita Recorrente",
    "excerpt": "Cada 1% de redução na evasão = 5-8% mais MRR ao ano. Aprenda a blindar receita recorrente com sistema anti-cancelamento que protege seu crescimento.",
    "category": "Geral",
    "date": "2025-03-22"
  },
  {
    "slug": "motivacao-que-traz-aluno-de-volta-psicologia-da-reativacao",
    "title": "Motivação que Traz Aluno de Volta: Psicologia da Reativação",
    "excerpt": "O que motiva retorno: progresso visível (35%), senso comunidade (28%), meta renovada (22%), plano ajustado (15%). Como usar cada gatilho na mensagem.",
    "category": "Geral",
    "date": "2025-03-21"
  },
  {
    "slug": "sistema-de-ia-aprende-com-cada-salvamento-melhora-continua-automatica",
    "title": "Sistema de IA Aprende com Cada Salvamento: Melhora Contínua Automática",
    "excerpt": "Quanto mais usa, melhor fica: IA aprende com cada salvamento bem-sucedido, refinando abordagens e aumentando precisão automaticamente a cada mês.",
    "category": "Geral",
    "date": "2025-03-21"
  },
  {
    "slug": "futuro-da-retencao-em-academias-ia-e-o-novo-padrao-em-2025",
    "title": "Futuro da Retenção em Academias: IA é o Novo Padrão em 2025",
    "excerpt": "2025: IA deixa de ser diferencial e vira padrão. Academias sem sistema preditivo perdem competitividade. Entenda por que migração é urgente.",
    "category": "Geral",
    "date": "2025-03-20"
  },
  {
    "slug": "churn-rate-academia-benchmarks-brasil-2025-e-como-reduzir",
    "title": "Churn Rate Academia: Benchmarks Brasil 2025 e Como Reduzir",
    "excerpt": "Churn rate médio no Brasil: 25-35% ao ano. Seu está acima? Veja benchmarks por região, porte e modalidade + estratégias para reduzir para 15-20%.",
    "category": "Geral",
    "date": "2025-03-19"
  },
  {
    "slug": "desafios-e-metas-como-manter-frequencia-alta-com-objetivos",
    "title": "Desafios e Metas: Como Manter Frequência Alta com Objetivos",
    "excerpt": "Aluno sem meta clara tem 2x mais evasão. Desafios 30 dias, metas trimestrais, acompanhamento semanal. Como estruturar sistema de objetivos que engaja.",
    "category": "Geral",
    "date": "2025-03-19"
  },
  {
    "slug": "silencio-antes-do-cancelamento-o-sinal-mais-ignorado",
    "title": "Silêncio Antes do Cancelamento: O Sinal Mais Ignorado",
    "excerpt": "Aluno que para de responder mensagens, evita contato visual, não interage = sinal crítico ignorado. Silêncio precede 70% dos cancelamentos. Como quebr",
    "category": "Geral",
    "date": "2025-03-19"
  },
  {
    "slug": "como-ia-aprende-padroes-da-sua-academia-machine-learning-adaptativo",
    "title": "Como IA Aprende Padrões da Sua Academia: Machine Learning Adaptativo",
    "excerpt": "IA não é genérica: ela aprende padrões específicos da SUA academia, adaptando-se ao seu público, modalidades e sazonalidades para previsões cada vez m",
    "category": "Geral",
    "date": "2025-03-18"
  },
  {
    "slug": "custo-real-da-evasao-na-sua-academia-calculadora-completa",
    "title": "Custo Real da Evasão na Sua Academia: Calculadora Completa",
    "excerpt": "Você sabe quanto perde com evasão? Use nossa calculadora: CAC + MRR perdido + custo reposição + LTV não realizado. Número real assusta.",
    "category": "Geral",
    "date": "2025-03-18"
  },
  {
    "slug": "yoga-e-retencao-como-manter-frequencia-em-pratica-de-baixa-intensidade",
    "title": "Yoga e Retenção: Como Manter Frequência em Prática de Baixa Intensidade",
    "excerpt": "Yoga: baixa intensidade = fácil de 'pular'. Aluno adia, adia, some. IA cria urgência positiva, lembra benefícios, convida para aulas especiais.",
    "category": "Geral",
    "date": "2025-03-17"
  },
  {
    "slug": "hiit-como-ia-motiva-aluno-a-voltar-apos-treino-intenso",
    "title": "HIIT: Como IA Motiva Aluno a Voltar Após Treino Intenso",
    "excerpt": "HIIT: treino intenso pode gerar 'medo do próximo'. Aluno adia retorno. IA envia mensagem motivacional, lembra resultados, celebra coragem de voltar.",
    "category": "Geral",
    "date": "2025-03-16"
  },
  {
    "slug": "verao-e-queda-de-frequencia-ferias-viagens-e-retencao",
    "title": "Verão e Queda de Frequência: Férias, Viagens e Retenção",
    "excerpt": "Dezembro/janeiro: férias, viagens, festas = frequência cai 40%. Como manter aluno conectado mesmo longe, prevenir 'eu volto ano que vem' virar nunca m",
    "category": "Geral",
    "date": "2025-03-16"
  },
  {
    "slug": "academia-24-horas-retencao-digital-em-ambiente-sem-recepcao",
    "title": "Academia 24 Horas: Retenção Digital em Ambiente Sem Recepção",
    "excerpt": "Academia 24h: sem recepção, sem contato humano natural. IA compensa: monitora digital, mensagens automáticas, cria presença mesmo sem staff físico.",
    "category": "Geral",
    "date": "2025-03-14"
  },
  {
    "slug": "check-in-irregular-como-detectar-risco-medio-antes-de-virar-alto",
    "title": "Check-in Irregular: Como Detectar Risco Médio Antes de Virar Alto",
    "excerpt": "Check-in irregular (padrão inconsistente semana a semana) = risco médio (50%). Detecte antes de virar risco alto. Aprenda a calcular 'score de consist",
    "category": "Geral",
    "date": "2025-03-14"
  },
  {
    "slug": "kpis-de-retencao-em-academia-10-metricas-para-acompanhar-diariamente",
    "title": "KPIs de Retenção em Academia: 10 Métricas Para Acompanhar Diariamente",
    "excerpt": "10 KPIs que gestor top acompanha: churn rate, CAC/LTV ratio, frequência média, taxa salvamento, MRR, NPS, ticket médio, lifetime, renovação, engajamen",
    "category": "Geral",
    "date": "2025-03-14"
  },
  {
    "slug": "relacionamento-alem-do-treino-conexao-que-retem",
    "title": "Relacionamento Além do Treino: Conexão que Retém",
    "excerpt": "Academia não é só treino. É relacionamento, apoio, comunidade. Como criar conexões além treino: eventos sociais, grupos WhatsApp, café pós-treino, ani",
    "category": "Geral",
    "date": "2025-03-14"
  },
  {
    "slug": "como-ia-identifica-aluno-em-risco-de-cancelamento-guia-tecnico",
    "title": "Como IA Identifica Aluno em Risco de Cancelamento: Guia Técnico",
    "excerpt": "Guia técnico: aprenda exatamente como IA monitora check-ins, detecta faltas consecutivas, analisa mudanças de padrão e calcula score de risco de 0-100",
    "category": "Geral",
    "date": "2025-03-13"
  },
  {
    "slug": "perfil-de-aluno-que-cancela-mais-segmentacao-de-risco",
    "title": "Perfil de Aluno que Cancela Mais: Segmentação de Risco",
    "excerpt": "Dados de 10k cancelamentos: perfil alto risco = 18-25 anos, matrícula solo, sem objetivo claro, horário variável. Como identificar e prevenir por perf",
    "category": "Geral",
    "date": "2025-03-13"
  },
  {
    "slug": "timing-perfeito-para-mensagem-de-retencao-ciencia-do-quando",
    "title": "Timing Perfeito para Mensagem de Retenção: Ciência do Quando",
    "excerpt": "Estudo 50k mensagens: 9-10h manhã = 42% resposta. 14-15h = 31%. 20-21h = 25%. Noite/madrugada = 8%. IA envia no momento ideal para CADA aluno.",
    "category": "Geral",
    "date": "2025-03-13"
  },
  {
    "slug": "taxa-de-evasao-primeiros-30-dias-como-reduzir-de-40-para-10",
    "title": "Taxa de Evasão Primeiros 30 Dias: Como Reduzir de 40% para 10%",
    "excerpt": "Taxa de evasão primeiros 30 dias: média 35-40%. Melhores academias: 8-12%. Diferença está no onboarding + acompanhamento IA. Roadmap completo.",
    "category": "Geral",
    "date": "2025-03-12"
  },
  {
    "slug": "evasao-por-modalidade-dados-de-musculacao-crossfit-pilates-e-mais",
    "title": "Evasão por Modalidade: Dados de Musculação, CrossFit, Pilates e Mais",
    "excerpt": "Dados exclusivos: musculação 32% evasão, CrossFit 22%, pilates 18%, dança 28%, MMA 25%. Entenda por que e como reduzir em cada modalidade.",
    "category": "Geral",
    "date": "2025-03-11"
  },
  {
    "slug": "evasao-zero-em-academia-e-possivel-ou-utopia-analise-realista",
    "title": "Evasão Zero em Academia: É Possível ou Utopia? Análise Realista",
    "excerpt": "Evasão zero é utopia, mas 10-15% é possível. Análise realista: benchmarks globais, melhores academias Brasil, estratégias para chegar lá.",
    "category": "Geral",
    "date": "2025-03-10"
  },
  {
    "slug": "feedback-loop-como-aluno-ativo-ajuda-a-reter-outros-alunos",
    "title": "Feedback Loop: Como Aluno Ativo Ajuda a Reter Outros Alunos",
    "excerpt": "Alunos engajados viram embaixadores. 1 aluno ativo contagia 3-5 outros. Como criar feedback loop positivo: depoimentos, indicações, grupos de treino.",
    "category": "Geral",
    "date": "2025-03-08"
  },
  {
    "slug": "progresso-visivel-por-que-mostrar-evolucao-aumenta-retencao",
    "title": "Progresso Visível: Por Que Mostrar Evolução Aumenta Retenção",
    "excerpt": "Ver progresso = motivação. Gráficos frequência, fotos antes/depois, medidas, carga progressão. Progresso invisível = desmotivação = evasão. Como torna",
    "category": "Geral",
    "date": "2025-03-08"
  },
  {
    "slug": "ia-analisa-comportamento-de-alunos-o-que-o-sistema-monitora",
    "title": "IA Analisa Comportamento de Alunos: O Que o Sistema Monitora",
    "excerpt": "Descubra as 50+ variáveis que IA analisa: frequência, horários, faltas, mudanças de rotina, engajamento, renovações e como isso prevê cancelamentos.",
    "category": "Geral",
    "date": "2025-03-07"
  },
  {
    "slug": "personalizacao-de-mensagem-por-perfil-aluno-iniciante-vs-veterano",
    "title": "Personalização de Mensagem por Perfil: Aluno Iniciante vs Veterano",
    "excerpt": "Iniciante precisa apoio técnico. Veterano precisa renovação de objetivos. Mãe precisa flexibilidade. Competidor precisa desafios. Como IA personaliza ",
    "category": "Geral",
    "date": "2025-03-06"
  },
  {
    "slug": "whatsapp-humanizado-vs-robotizado-a-diferenca-que-retem",
    "title": "WhatsApp Humanizado vs Robotizado: A Diferença que Retém",
    "excerpt": "Mensagens robotizadas têm 8% resposta. Humanizadas: 38%. IA do NeoFitFlow gera mensagens que parecem escritas por humano, com nome, contexto, empatia.",
    "category": "Geral",
    "date": "2025-03-06"
  },
  {
    "slug": "treinamento-funcional-outdoor-como-ia-gerencia-sazonalidade",
    "title": "Treinamento Funcional Outdoor: Como IA Gerencia Sazonalidade",
    "excerpt": "Outdoor: clima afeta tudo. Chuva, frio, calor extremo = quedas previsíveis. IA antecipa, comunica alternativas, previne que pausa vire desistência.",
    "category": "Geral",
    "date": "2025-03-05"
  },
  {
    "slug": "aluno-que-nao-renova-como-prevenir-antes-do-vencimento",
    "title": "Aluno que Não Renova: Como Prevenir Antes do Vencimento",
    "excerpt": "Não espere vencimento para agir. 45 dias antes: analise frequência. 30 dias: mensagem preventiva. 15 dias: oferta renovação antecipada. Fluxo completo",
    "category": "Geral",
    "date": "2025-03-03"
  },
  {
    "slug": "spinning-e-evasao-como-aulas-em-grupo-retem-melhor-com-tecnologia",
    "title": "Spinning e Evasão: Como Aulas em Grupo Retêm Melhor com Tecnologia",
    "excerpt": "Spinning: evasão 25% menor que musculação (grupo + música). Mas quando aluno perde horário favorito, risco dispara. IA gerencia preferências de turma.",
    "category": "Geral",
    "date": "2025-03-02"
  },
  {
    "slug": "acompanhamento-pos-retorno-do-aluno-garantir-que-fique-dessa-vez",
    "title": "Acompanhamento Pós-Retorno do Aluno: Garantir que Fique Dessa Vez",
    "excerpt": "Aluno voltou? Fase crítica começa agora. 40% re-evadem em 30 dias se não houver acompanhamento. Protocolo de follow-up pós-retorno que garante permanê",
    "category": "Geral",
    "date": "2025-03-01"
  },
  {
    "slug": "empatia-em-mensagens-automaticas-possivel-e-necessario",
    "title": "Empatia em Mensagens Automáticas: Possível e Necessário",
    "excerpt": "Automação ≠ frieza. IA pode ser empática usando: nome, histórico, contexto, pergunta aberta, oferta específica. Exemplos práticos de automação humaniz",
    "category": "Geral",
    "date": "2025-03-01"
  },
  {
    "slug": "oferecer-ajuda-sem-parecer-cobranca-arte-da-abordagem-preventiva",
    "title": "Oferecer Ajuda Sem Parecer Cobrança: Arte da Abordagem Preventiva",
    "excerpt": "Linha tênue entre 'queremos ajudar' e 'por que não vem?'. Técnicas de comunicação não-violenta aplicadas à retenção. Ofereça saída, não pressão.",
    "category": "Geral",
    "date": "2025-03-01"
  },
  {
    "slug": "pos-carnaval-e-retencao-periodo-critico-de-marco-a-abril",
    "title": "Pós-Carnaval e Retenção: Período Crítico de Março a Abril",
    "excerpt": "Pós-carnaval: projeto verão acabou, motivação cai 60%, frequência desaba. Março-abril = crítico. Como manter aluno engajado no 'meio do ano fitness'.",
    "category": "Geral",
    "date": "2025-02-28"
  },
  {
    "slug": "previsao-de-cancelamento-com-85-de-precisao-como-funciona-a-tecnologia",
    "title": "Previsão de Cancelamento com 85% de Precisão: Como Funciona a Tecnologia",
    "excerpt": "Entenda a ciência por trás da previsão de cancelamentos: como IA alcança 85% de precisão analisando comportamento, frequência e padrões de alunos em r",
    "category": "Geral",
    "date": "2025-02-28"
  },
  {
    "slug": "segmentacao-por-risco-de-evasao-verde-amarelo-laranja-vermelho",
    "title": "Segmentação por Risco de Evasão: Verde, Amarelo, Laranja, Vermelho",
    "excerpt": "Sistema semáforo de risco: verde (0-30) = ok, amarelo (31-60) = observar, laranja (61-80) = agir, vermelho (81-100) = urgente. Como segmentar e priori",
    "category": "Geral",
    "date": "2025-02-27"
  },
  {
    "slug": "mensagem-preventiva-que-funciona-tom-timing-e-conteudo",
    "title": "Mensagem Preventiva que Funciona: Tom, Timing e Conteúdo",
    "excerpt": "Anatomia da mensagem preventiva perfeita: tom empático (não cobrança), timing certo (manhã 9-10h), conteúdo relevante (oferta ajuda). Taxa resposta 45",
    "category": "Geral",
    "date": "2025-02-25"
  },
  {
    "slug": "pre-cancelamento-sinais-invisiveis-30-dias-antes-do-pedido",
    "title": "Pré-Cancelamento: Sinais Invisíveis 30 Dias Antes do Pedido",
    "excerpt": "30 dias antes do pedido, sinais invisíveis aparecem: micro-quedas frequência, check-in tarde, sair mais cedo, evitar horário cheio. Como IA detecta.",
    "category": "Geral",
    "date": "2025-02-25"
  },
  {
    "slug": "bootcamp-e-engajamento-continuo-como-ia-mantem-intensidade",
    "title": "Bootcamp e Engajamento Contínuo: Como IA Mantém Intensidade",
    "excerpt": "Bootcamp: intensidade extrema 30-60 dias. Pós-bootcamp, 50% evadem. Como IA cria continuidade, sugere próximo desafio, mantém aluno no ciclo.",
    "category": "Geral",
    "date": "2025-02-24"
  },
  {
    "slug": "engajamento-pos-matricula-primeiros-30-dias-sao-criticos",
    "title": "Engajamento Pós-Matrícula: Primeiros 30 Dias São Críticos",
    "excerpt": "Primeiros 30 dias definem tudo: 60% dos cancelamentos de alunos novos ocorrem aqui. Onboarding intensivo + acompanhamento IA = retenção 3x maior.",
    "category": "Geral",
    "date": "2025-02-24"
  },
  {
    "slug": "deteccao-automatica-de-faltas-consecutivas-sistema-que-nao-falha",
    "title": "Detecção Automática de Faltas Consecutivas: Sistema que Não Falha",
    "excerpt": "Sistema monitora faltas 24/7: 1 falta = observação, 2 = alerta, 3 = ação automática via WhatsApp. Nenhum aluno em risco passa despercebido.",
    "category": "Geral",
    "date": "2025-02-23"
  },
  {
    "slug": "quanto-voce-perde-com-evasao-calculadora-de-impacto-financeiro",
    "title": "Quanto Você Perde com Evasão: Calculadora de Impacto Financeiro",
    "excerpt": "Calculadora interativa: insira alunos, mensalidade, evasão atual. Descubra perda anual, CAC desperdiçado, MRR evaporado. Prepare-se para se assustar.",
    "category": "Geral",
    "date": "2025-02-22"
  },
  {
    "slug": "natacao-em-academia-desafios-unicos-de-retencao-e-como-ia-ajuda",
    "title": "Natação em Academia: Desafios Únicos de Retenção e Como IA Ajuda",
    "excerpt": "Natação: requer mais disciplina (trocar roupa, molhar cabelo), evasão 35% maior. IA identifica alunos que começam a 'adiar' e age antes de virar desis",
    "category": "Geral",
    "date": "2025-02-21"
  },
  {
    "slug": "breakeven-de-sistema-anti-evasao-em-quanto-tempo-se-paga",
    "title": "Breakeven de Sistema Anti-Evasão: Em Quanto Tempo Se Paga",
    "excerpt": "Cálculo detalhado: investimento R$ 300-500/mês. Salvando 8-12 alunos/mês = breakeven em 2-3 meses. ROI 400-600% no primeiro ano.",
    "category": "Geral",
    "date": "2025-02-20"
  },
  {
    "slug": "reducao-de-churn-em-6-meses-roadmap-passo-a-passo",
    "title": "Redução de Churn em 6 Meses: Roadmap Passo a Passo",
    "excerpt": "Roadmap completo: reduza churn em 30-40% em 6 meses. Mês 1: diagnóstico. Mês 2: implementação IA. Mês 3-6: otimização. Plano detalhado.",
    "category": "Geral",
    "date": "2025-02-20"
  },
  {
    "slug": "roi-de-sistema-com-ia-para-retencao-quanto-voce-ganha-de-volta",
    "title": "ROI de Sistema com IA para Retenção: Quanto Você Ganha de Volta",
    "excerpt": "Investimento em IA se paga em 2-3 meses: salve 20 alunos/mês (R$ 3k MRR), economize 20h de trabalho (R$ 1.5k), aumente LTV 30%. Calcule seu ROI.",
    "category": "Geral",
    "date": "2025-02-19"
  },
  {
    "slug": "sazonalidade-e-evasao-em-academia-padroes-ao-longo-do-ano",
    "title": "Sazonalidade e Evasão em Academia: Padrões ao Longo do Ano",
    "excerpt": "Janeiro: pico matrícula + risco evasão. Março: pós-carnaval queda. Junho/julho: frio aumenta faltas. Dezembro: férias. Como antecipar cada fase.",
    "category": "Geral",
    "date": "2025-02-19"
  },
  {
    "slug": "ia-para-retencao-em-academia-de-musculacao-especificidades-e-estrategias",
    "title": "IA para Retenção em Academia de Musculação: Especificidades e Estratégias",
    "excerpt": "Musculação tem padrões únicos: treino solo, rotina repetitiva, platô frequente. Como IA detecta risco específico e age com estratégias para musculação",
    "category": "Geral",
    "date": "2025-02-18"
  },
  {
    "slug": "reduzir-evasao-em-academia-com-tecnologia-guia-definitivo-2025",
    "title": "Reduzir Evasão em Academia com Tecnologia: Guia Definitivo 2025",
    "excerpt": "Guia completo: aprenda a usar tecnologia e IA para reduzir evasão em academias. Estratégias, ferramentas e cases reais que cortaram churn em 30-40%.",
    "category": "Geral",
    "date": "2025-02-18"
  },
  {
    "slug": "retencao-em-studio-de-pilates-com-ia-aulas-agendadas-e-faltas",
    "title": "Retenção em Studio de Pilates com IA: Aulas Agendadas e Faltas",
    "excerpt": "Pilates: aulas agendadas, grupos pequenos. Falta = vaga perdida = receita perdida. IA monitora agendamentos, faltas, remarca automaticamente, previne ",
    "category": "Geral",
    "date": "2025-02-16"
  },
  {
    "slug": "evasao-mensal-vs-anual-em-academia-analise-e-diferencas-criticas",
    "title": "Evasão Mensal vs Anual em Academia: Análise e Diferenças Críticas",
    "excerpt": "Evasão mensal de 3% = 36% anual? NÃO! Entenda a diferença entre churn mensal e anual, como calcular cada um e por que confundir os dois é perigoso.",
    "category": "Geral",
    "date": "2025-02-14"
  },
  {
    "slug": "horarios-vazios-na-academia-oportunidade-perdida-de-retencao",
    "title": "Horários Vazios na Academia: Oportunidade Perdida de Retenção",
    "excerpt": "Horários vazios = oportunidade perdida. Alunos em horário cheio têm experiência ruim = risco evasão. Como rebalancear e melhorar retenção via otimizaç",
    "category": "Geral",
    "date": "2025-02-14"
  },
  {
    "slug": "3-faltas-consecutivas-o-sinal-vermelho-que-voce-nao-pode-ignorar",
    "title": "3 Faltas Consecutivas: O Sinal Vermelho que Você Não Pode Ignorar",
    "excerpt": "3 faltas consecutivas = probabilidade 70% de cancelamento nos próximos 30 dias. Por que esse número é crítico e o que fazer quando aluno chega nele.",
    "category": "Geral",
    "date": "2025-02-13"
  },
  {
    "slug": "inteligencia-artificial-para-retencao-de-alunos-em-academias-2025",
    "title": "Inteligência Artificial para Retenção de Alunos em Academias 2025",
    "excerpt": "IA revoluciona retenção de alunos: aprenda como sistemas inteligentes monitoram frequência, detectam riscos e agem automaticamente via WhatsApp para e",
    "category": "Geral",
    "date": "2025-02-13"
  },
  {
    "slug": "personal-training-como-evitar-ghost-de-alunos-particulares-com-ia",
    "title": "Personal Training: Como Evitar 'Ghost' de Alunos Particulares com IA",
    "excerpt": "Personal: investimento alto, mas ghost é comum (não aparecem, não desmarcam). IA alerta personal 24h antes, sugere remarcação, previne perda de horári",
    "category": "Geral",
    "date": "2025-02-13"
  },
  {
    "slug": "sistema-anti-cancelamento-para-academia-de-danca-diversao-e-frequencia",
    "title": "Sistema Anti-Cancelamento para Academia de Dança: Diversão e Frequência",
    "excerpt": "Dança: motivação por diversão + social. Quando vira obrigação ou aluno se sente perdido, evasão dispara. Como IA detecta perda de encantamento e reeng",
    "category": "Geral",
    "date": "2025-02-12"
  },
  {
    "slug": "tom-certo-para-abordar-aluno-em-risco-empatia-vs-cobranca",
    "title": "Tom Certo para Abordar Aluno em Risco: Empatia vs Cobrança",
    "excerpt": "'Cadê você?' vs 'Sentimos sua falta, tudo bem?'. A diferença de tom multiplica resposta por 4x. Guia completo de comunicação empática para retenção.",
    "category": "Geral",
    "date": "2025-02-11"
  },
  {
    "slug": "mudanca-de-horario-constante-alerta-de-desengajamento",
    "title": "Mudança de Horário Constante: Alerta de Desengajamento",
    "excerpt": "Aluno que troca horário 3-4x no mês = sinal amarelo. Rotina instável precede cancelamento. Entenda por que e como oferecer ajuste antes de perder.",
    "category": "Geral",
    "date": "2025-02-10"
  },
  {
    "slug": "academia-hibrida-musculacao-funcional-como-ia-gerencia-modalidades-multiplas",
    "title": "Academia Híbrida (Musculação + Funcional): Como IA Gerencia Modalidades Múltiplas",
    "excerpt": "Híbrido: aluno faz musculação E funcional. IA monitora frequência em AMBAS, detecta se está abandonando uma, sugere rebalanceamento antes de evadir to",
    "category": "Geral",
    "date": "2025-02-09"
  },
  {
    "slug": "queda-de-frequencia-em-academia-quando-e-como-agir",
    "title": "Queda de Frequência em Academia: Quando e Como Agir",
    "excerpt": "Aluno que ia 4x/semana agora vai 2x: queda de 50% = risco alto. Aprenda a detectar quedas graduais, quando alertar e como reverter antes do cancelamen",
    "category": "Geral",
    "date": "2025-02-08"
  },
  {
    "slug": "boutique-fitness-retencao-premium-com-experiencia-personalizada-por-ia",
    "title": "Boutique Fitness: Retenção Premium com Experiência Personalizada por IA",
    "excerpt": "Boutique: alto ticket, expectativa premium. IA permite: experiência hiper-personalizada, atenção individual em escala, justificando investimento alto.",
    "category": "Geral",
    "date": "2025-02-07"
  },
  {
    "slug": "reativacao-de-aluno-inativo-estrategias-que-funcionam-em-2025",
    "title": "Reativação de Aluno Inativo: Estratégias que Funcionam em 2025",
    "excerpt": "Aluno inativo 30+ dias: taxa reativação 15-25% com abordagem certa. Mensagem empática + oferta específica + timing perfeito = volta dele.",
    "category": "Geral",
    "date": "2025-02-07"
  },
  {
    "slug": "padroes-de-comportamento-que-indicam-cancelamento-iminente",
    "title": "Padrões de Comportamento que Indicam Cancelamento Iminente",
    "excerpt": "10 padrões que antecedem 80% dos cancelamentos: queda frequência + mudança horário + não resposta mensagens + faltas pós-treino intenso + mais.",
    "category": "Geral",
    "date": "2025-02-06"
  },
  {
    "slug": "retencao-em-academia-de-mma-e-jiu-jitsu-lesoes-e-compromisso",
    "title": "Retenção em Academia de MMA e Jiu-Jitsu: Lesões e Compromisso",
    "excerpt": "MMA/Jiu-Jitsu: alto compromisso inicial, mas lesões e intensidade causam afastamentos. Como IA diferencia lesão temporária de desistência iminente.",
    "category": "Geral",
    "date": "2025-02-06"
  },
  {
    "slug": "alertas-automaticos-de-risco-alto-priorize-onde-investir-energia",
    "title": "Alertas Automáticos de Risco Alto: Priorize Onde Investir Energia",
    "excerpt": "Não gaste energia igual em todos alunos. IA prioriza: verde = tranquilo, amarelo = observar, laranja = agir, vermelho = urgente. Otimize seu tempo.",
    "category": "Geral",
    "date": "2025-02-05"
  },
  {
    "slug": "aluno-que-treina-so-fim-de-semana-risco-oculto-de-evasao",
    "title": "Aluno que Treina Só Fim de Semana: Risco Oculto de Evasão",
    "excerpt": "Treina só sábado/domingo? Risco 2x maior de cancelar vs aluno de dias úteis. Baixo engajamento + resultados lentos = frustração. Como converter para s",
    "category": "Geral",
    "date": "2025-02-05"
  },
  {
    "slug": "dashboard-de-risco-em-tempo-real-monitore-cancelamentos-24-7-com-ia",
    "title": "Dashboard de Risco em Tempo Real: Monitore Cancelamentos 24/7 com IA",
    "excerpt": "Dashboard inteligente mostra alunos em risco verde/amarelo/vermelho em tempo real. Monitore 24/7, receba alertas e aja antes de perder MRR.",
    "category": "Geral",
    "date": "2025-02-05"
  },
  {
    "slug": "sistema-preditivo-de-cancelamento-a-nova-era-da-retencao",
    "title": "Sistema Preditivo de Cancelamento: A Nova Era da Retenção",
    "excerpt": "Era dos 'achismos' acabou: sistemas preditivos com IA transformam dados em previsões precisas, permitindo gestão proativa e crescimento sustentável.",
    "category": "Geral",
    "date": "2025-02-05"
  },
  {
    "slug": "impacto-financeiro-de-1-menos-evasao-simulacao-para-sua-academia",
    "title": "Impacto Financeiro de 1% Menos Evasão: Simulação para Sua Academia",
    "excerpt": "Simulação real: academia com 500 alunos, R$ 150 mensalidade. Reduzir evasão de 28% para 27% = R$ 90k a mais no ano. Cada 1% vale MUITO.",
    "category": "Geral",
    "date": "2025-02-04"
  },
  {
    "slug": "academia-como-segunda-casa-ambiente-que-ninguem-quer-deixar",
    "title": "Academia Como Segunda Casa: Ambiente que Ninguém Quer Deixar",
    "excerpt": "Quando aluno sente academia como segunda casa, evasão cai 70%. Como criar: ambiente acolhedor, staff que conhece cada um, rituais, tradições, pertenci",
    "category": "Geral",
    "date": "2025-02-03"
  },
  {
    "slug": "ia-vs-metodos-manuais-de-retencao-comparativo-completo-2025",
    "title": "IA vs Métodos Manuais de Retenção: Comparativo Completo 2025",
    "excerpt": "Comparação detalhada: IA automatizada vs processos manuais de retenção. Descubra por que IA economiza 20h/mês e salva 40% mais alunos que métodos trad",
    "category": "Geral",
    "date": "2025-01-31"
  },
  {
    "slug": "prevenir-evasao-antes-que-aconteca-estrategia-preventiva-com-ia",
    "title": "Prevenir Evasão Antes Que Aconteça: Estratégia Preventiva com IA",
    "excerpt": "Mude de reativo para preventivo: aprenda a usar IA para agir 30 dias ANTES do cancelamento, quando taxa de salvamento é 7x maior que após pedido.",
    "category": "Geral",
    "date": "2025-01-29"
  },
  {
    "slug": "ia-personaliza-mensagens-por-modalidade-musculacao-crossfit-pilates",
    "title": "IA Personaliza Mensagens por Modalidade: Musculação, CrossFit, Pilates",
    "excerpt": "Mensagens genéricas não funcionam. Veja como IA personaliza abordagem para musculação, crossfit, dança, pilates, MMA - aumentando taxa de resposta em ",
    "category": "Geral",
    "date": "2025-01-28"
  },
  {
    "slug": "pole-dance-comunidade-forte-e-retencao-atraves-de-conexao",
    "title": "Pole Dance: Comunidade Forte e Retenção através de Conexão",
    "excerpt": "Pole dance: comunidade incrivelmente forte, evasão baixa. Mas quando aluno se sente 'pra trás', desiste. IA detecta comparação negativa e reengaja.",
    "category": "Geral",
    "date": "2025-01-28"
  },
  {
    "slug": "o-que-falar-com-aluno-que-sumiu-scripts-que-funcionam",
    "title": "O Que Falar com Aluno que Sumiu: Scripts que Funcionam",
    "excerpt": "5 scripts testados e aprovados para aluno sumido: 1) Sentimos falta 2) Tudo bem? 3) Como podemos ajudar 4) Vamos ajustar algo? 5) Conte conosco. Taxa ",
    "category": "Geral",
    "date": "2025-01-27"
  },
  {
    "slug": "zumba-frequencia-alta-atraves-de-diversao-ia-potencializa",
    "title": "Zumba: Frequência Alta através de Diversão - IA Potencializa",
    "excerpt": "Zumba: diversão = frequência natural. Mas vida acontece e aluno suma. IA lembra da alegria, convida para música nova, resgata pela emoção positiva.",
    "category": "Geral",
    "date": "2025-01-25"
  },
  {
    "slug": "prevencao-inteligente-de-evasao-alem-do-simples-alerta-automatico",
    "title": "Prevenção Inteligente de Evasão: Além do Simples Alerta Automático",
    "excerpt": "Prevenção inteligente vai além de alertas: IA sugere melhor horário para mensagem, tom ideal, oferta personalizada - tudo baseado em sucesso de casos ",
    "category": "Geral",
    "date": "2025-01-23"
  },
  {
    "slug": "ia-para-academia-de-treinamento-funcional-alta-intensidade-alto-risco",
    "title": "IA para Academia de Treinamento Funcional: Alta Intensidade, Alto Risco",
    "excerpt": "Funcional: alta intensidade, lesões frequentes, burnout rápido. IA detecta sinais de overtraining, sugere descanso, previne abandono por exaustão.",
    "category": "Geral",
    "date": "2025-01-22"
  },
  {
    "slug": "ia-reduz-evasao-em-ate-40-cases-reais-de-academias-brasileiras",
    "title": "IA Reduz Evasão em Até 40%: Cases Reais de Academias Brasileiras",
    "excerpt": "Cases reais: academia em SP reduziu evasão de 30% para 18% em 6 meses com IA. Box de CrossFit salvou R$ 8k/mês em MRR. Veja resultados comprovados.",
    "category": "Geral",
    "date": "2025-01-22"
  },
  {
    "slug": "senso-de-comunidade-previne-evasao-como-criar-pertencimento",
    "title": "Senso de Comunidade Previne Evasão: Como Criar Pertencimento",
    "excerpt": "Aluno que tem amigos na academia tem 70% menos chance de cancelar. Como criar comunidade: eventos, grupos, desafios coletivos, reconhecimento social.",
    "category": "Geral",
    "date": "2025-01-22"
  },
  {
    "slug": "janeiro-e-evasao-em-academia-como-prevenir-abandono-pos-promessa",
    "title": "Janeiro e Evasão em Academia: Como Prevenir Abandono Pós-Promessa",
    "excerpt": "Janeiro: 40% mais matrículas, mas 50% cancelam em 60 dias. Promessa de ano novo vira frustração. Estratégia para converter promessa em hábito real.",
    "category": "Geral",
    "date": "2025-01-21"
  },
  {
    "slug": "primeira-falta-momento-critico-que-define-retencao",
    "title": "Primeira Falta: Momento Crítico que Define Retenção",
    "excerpt": "A primeira falta é o momento mais crítico: se vira rotina, evasão cresce 300%. Como agir na primeira falta para evitar que vire segunda e terceira.",
    "category": "Geral",
    "date": "2025-01-21"
  },
  {
    "slug": "gamificacao-para-engajamento-pontos-niveis-e-desafios",
    "title": "Gamificação para Engajamento: Pontos, Níveis e Desafios",
    "excerpt": "Gamificação aumenta frequência 40%: sistema de pontos por check-in, níveis (iniciante→expert), desafios mensais, ranking amigável. Como implementar.",
    "category": "Geral",
    "date": "2025-01-20"
  },
  {
    "slug": "antes-e-depois-de-sistema-de-retencao-cases-reais-transformadores",
    "title": "Antes e Depois de Sistema de Retenção: Cases Reais Transformadores",
    "excerpt": "Case 1: academia SP, antes 32% evasão, depois 19%. Case 2: box CrossFit, antes R$ 12k MRR perdido/mês, depois R$ 4k. Transformações reais.",
    "category": "Geral",
    "date": "2025-01-19"
  },
  {
    "slug": "celebrar-vitorias-pequenas-do-aluno-engajamento-continuo",
    "title": "Celebrar Vitórias Pequenas do Aluno: Engajamento Contínuo",
    "excerpt": "Cada check-in é vitória. 10 treinos = marco. 30 dias consecutivos = conquista. Celebração aumenta engajamento 60% e cria senso de progresso contínuo.",
    "category": "Geral",
    "date": "2025-01-19"
  },
  {
    "slug": "escalada-indoor-retencao-por-desafio-progressivo-e-comunidade",
    "title": "Escalada Indoor: Retenção por Desafio Progressivo e Comunidade",
    "excerpt": "Escalada: retenção por desafio + comunidade. Quando aluno estagna em nível, desiste. IA detecta platô, sugere nova rota, previne frustração.",
    "category": "Geral",
    "date": "2025-01-18"
  },
  {
    "slug": "como-antecipar-pedido-de-cancelamento-prevencao-60-dias-antes",
    "title": "Como Antecipar Pedido de Cancelamento: Prevenção 60 Dias Antes",
    "excerpt": "Maioria dos pedidos são previsíveis 60 dias antes. Score de risco + padrões comportamentais + IA = antecipar e agir antes. Sistema de early warning co",
    "category": "Geral",
    "date": "2025-01-17"
  },
  {
    "slug": "como-reduzir-evasao-alunos-academia",
    "title": "Como Reduzir Evasão de Alunos na Academia: 7 Estratégias Comprovadas [2025]",
    "excerpt": "Guia completo sobre como reduzir evasão de alunos na academia: 7 estratégias comprovadas [2025]. Aprenda estratégias práticas e comprovadas para melho",
    "category": "Retenção",
    "date": "2025-01-15"
  },
  {
    "slug": "comparativo-evasao-academia-com-vs-sem-sistema-de-ia",
    "title": "Comparativo Evasão: Academia Com vs Sem Sistema de IA",
    "excerpt": "Estudo 100 academias: com IA = 18% evasão média. Sem IA = 29% evasão. Diferença = R$ 15k-40k/ano para academia média. Números não mentem.",
    "category": "Geral",
    "date": "2025-01-15"
  },
  {
    "slug": "ia-monitora-frequencia-24-7-sistema-que-nunca-dorme",
    "title": "IA Monitora Frequência 24/7: Sistema que Nunca Dorme",
    "excerpt": "Enquanto você dorme, IA monitora. Sistema 24/7 detecta mudanças de padrão em tempo real, garante que nenhum sinal de risco passe despercebido.",
    "category": "Geral",
    "date": "2025-01-15"
  },
  {
    "slug": "principais-causas-evasao-academia",
    "title": "Principais Causas de Evasão em Academias: O Que Fazer Para Evitar",
    "excerpt": "Guia completo sobre principais causas de evasão em academias: o que fazer para evitar. Aprenda estratégias práticas e comprovadas para melhorar result",
    "category": "Retenção",
    "date": "2025-01-14"
  },
  {
    "slug": "estrategias-retencao-alunos-crossfit",
    "title": "Estratégias de Retenção Para Box CrossFit: Como Manter Atletas Engajados",
    "excerpt": "Guia completo sobre estratégias de retenção para box crossfit: como manter atletas engajados. Aprenda estratégias práticas e comprovadas para melhorar",
    "category": "Retenção",
    "date": "2025-01-13"
  },
  {
    "slug": "como-recuperar-alunos-inativos",
    "title": "Como Recuperar Alunos Inativos: Guia Completo de Reativação",
    "excerpt": "Guia completo sobre como recuperar alunos inativos: guia completo de reativação. Aprenda estratégias práticas e comprovadas para melhorar resultados d",
    "category": "Retenção",
    "date": "2025-01-12"
  },
  {
    "slug": "programa-fidelidade-academia-funciona",
    "title": "Programa de Fidelidade Para Academia Funciona? Como Implementar",
    "excerpt": "Guia completo sobre programa de fidelidade para academia funciona? como implementar. Aprenda estratégias práticas e comprovadas para melhorar resultad",
    "category": "Retenção",
    "date": "2025-01-11"
  },
  {
    "slug": "comunicacao-prevenir-cancelamento-aluno",
    "title": "Comunicação Que Previne Cancelamento: O Que Falar Com Aluno Antes de Desistir",
    "excerpt": "Guia completo sobre comunicação que previne cancelamento: o que falar com aluno antes de desistir. Aprenda estratégias práticas e comprovadas para mel",
    "category": "Retenção",
    "date": "2025-01-10"
  },
  {
    "slug": "indicadores-evasao-academia-acompanhar",
    "title": "Indicadores de Evasão em Academia: Quais Métricas Acompanhar",
    "excerpt": "Guia completo sobre indicadores de evasão em academia: quais métricas acompanhar. Aprenda estratégias práticas e comprovadas para melhorar resultados ",
    "category": "Retenção",
    "date": "2025-01-09"
  },
  {
    "slug": "retencao-alunos-academia-pequena",
    "title": "Retenção de Alunos em Academia Pequena: Estratégias de Baixo Custo",
    "excerpt": "Guia completo sobre retenção de alunos em academia pequena: estratégias de baixo custo. Aprenda estratégias práticas e comprovadas para melhorar resul",
    "category": "Retenção",
    "date": "2025-01-08"
  },
  {
    "slug": "automacao-reduzir-evasao",
    "title": "Como Usar Automação Para Reduzir Evasão em 30%",
    "excerpt": "Guia completo sobre como usar automação para reduzir evasão em 30%. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua academi",
    "category": "Retenção",
    "date": "2025-01-07"
  },
  {
    "slug": "check-in-automatico-faltas-academia",
    "title": "Check-in Automático Para Faltas: Como Agir Antes do Aluno Cancelar",
    "excerpt": "Guia completo sobre check-in automático para faltas: como agir antes do aluno cancelar. Aprenda estratégias práticas e comprovadas para melhorar resul",
    "category": "Retenção",
    "date": "2025-01-06"
  },
  {
    "slug": "pesquisa-satisfacao-nps-academia",
    "title": "Pesquisa de Satisfação NPS em Academia: Como Implementar e Usar Dados",
    "excerpt": "Guia completo sobre pesquisa de satisfação nps em academia: como implementar e usar dados. Aprenda estratégias práticas e comprovadas para melhorar re",
    "category": "Retenção",
    "date": "2025-01-05"
  },
  {
    "slug": "recuperacao-alunos-cancelados",
    "title": "Recuperação de Alunos Cancelados: Estratégias de Reconquista Que Funcionam",
    "excerpt": "Guia completo sobre recuperação de alunos cancelados: estratégias de reconquista que funcionam. Aprenda estratégias práticas e comprovadas para melhor",
    "category": "Retenção",
    "date": "2025-01-04"
  },
  {
    "slug": "oferta-retencao-aluno-desistir",
    "title": "Oferta de Retenção: Como Criar Proposta Irrecusável Para Aluno Que Quer Sair",
    "excerpt": "Guia completo sobre oferta de retenção: como criar proposta irrecusável para aluno que quer sair. Aprenda estratégias práticas e comprovadas para melh",
    "category": "Retenção",
    "date": "2025-01-03"
  },
  {
    "slug": "relacionamento-aluno-longo-prazo",
    "title": "Relacionamento Com Aluno de Longo Prazo: Estratégias de Engajamento",
    "excerpt": "Guia completo sobre relacionamento com aluno de longo prazo: estratégias de engajamento. Aprenda estratégias práticas e comprovadas para melhorar resu",
    "category": "Retenção",
    "date": "2025-01-02"
  },
  {
    "slug": "experiencia-aluno-aumentar-retencao",
    "title": "Experiência do Aluno: Como Melhorar e Aumentar Retenção",
    "excerpt": "Guia completo sobre experiência do aluno: como melhorar e aumentar retenção. Aprenda estratégias práticas e comprovadas para melhorar resultados da su",
    "category": "Retenção",
    "date": "2025-01-01"
  },
  {
    "slug": "onboarding-novos-alunos-academia",
    "title": "Onboarding de Novos Alunos: Primeiros 30 Dias Que Definem Retenção",
    "excerpt": "Guia completo sobre onboarding de novos alunos: primeiros 30 dias que definem retenção. Aprenda estratégias práticas e comprovadas para melhorar resul",
    "category": "Retenção",
    "date": "2023-12-31"
  },
  {
    "slug": "acompanhamento-progresso-aluno",
    "title": "Acompanhamento de Progresso do Aluno: Ferramentas e Estratégias",
    "excerpt": "Guia completo sobre acompanhamento de progresso do aluno: ferramentas e estratégias. Aprenda estratégias práticas e comprovadas para melhorar resultad",
    "category": "Retenção",
    "date": "2023-12-30"
  },
  {
    "slug": "feedback-alunos-melhorar-retencao",
    "title": "Feedback de Alunos: Como Coletar e Usar Para Melhorar Retenção",
    "excerpt": "Guia completo sobre feedback de alunos: como coletar e usar para melhorar retenção. Aprenda estratégias práticas e comprovadas para melhorar resultado",
    "category": "Retenção",
    "date": "2023-12-29"
  },
  {
    "slug": "comunidade-academia-retencao",
    "title": "Como Criar Comunidade na Academia Para Aumentar Retenção",
    "excerpt": "Guia completo sobre como criar comunidade na academia para aumentar retenção. Aprenda estratégias práticas e comprovadas para melhorar resultados da s",
    "category": "Retenção",
    "date": "2023-12-28"
  },
  {
    "slug": "treino-personalizado-retencao",
    "title": "Treino Personalizado e Retenção: Como Individualizar Sem Gastar Mais",
    "excerpt": "Guia completo sobre treino personalizado e retenção: como individualizar sem gastar mais. Aprenda estratégias práticas e comprovadas para melhorar res",
    "category": "Retenção",
    "date": "2023-12-27"
  },
  {
    "slug": "fluxo-automacao-whatsapp-leads",
    "title": "Fluxo de Automação WhatsApp Para Leads: Do Primeiro Contato à Matrícula",
    "excerpt": "Guia completo sobre fluxo de automação whatsapp para leads: do primeiro contato à matrícula. Aprenda estratégias práticas e comprovadas para melhorar ",
    "category": "Automação",
    "date": "2023-12-25"
  },
  {
    "slug": "chatbot-whatsapp-academia-vale-pena",
    "title": "Chatbot WhatsApp Para Academia Vale a Pena? Prós, Contras e Como Escolher",
    "excerpt": "Guia completo sobre chatbot whatsapp para academia vale a pena? prós, contras e como escolher. Aprenda estratégias práticas e comprovadas para melhora",
    "category": "Automação",
    "date": "2023-12-24"
  },
  {
    "slug": "whatsapp-business-api-academia",
    "title": "WhatsApp Business API Para Academia: Como Funciona e Quanto Custa",
    "excerpt": "Guia completo sobre whatsapp business api para academia: como funciona e quanto custa. Aprenda estratégias práticas e comprovadas para melhorar result",
    "category": "Automação",
    "date": "2023-12-23"
  },
  {
    "slug": "respostas-automaticas-whatsapp-academia",
    "title": "Respostas Automáticas no WhatsApp: 50 Mensagens Prontas Para Academia",
    "excerpt": "Guia completo sobre respostas automáticas no whatsapp: 50 mensagens prontas para academia. Aprenda estratégias práticas e comprovadas para melhorar re",
    "category": "Automação",
    "date": "2023-12-22"
  },
  {
    "slug": "flow-builder-whatsapp-sem-codigo",
    "title": "Flow Builder WhatsApp Sem Código: Como Criar Automações Visuais",
    "excerpt": "Guia completo sobre flow builder whatsapp sem código: como criar automações visuais. Aprenda estratégias práticas e comprovadas para melhorar resultad",
    "category": "Automação",
    "date": "2023-12-21"
  },
  {
    "slug": "integracao-whatsapp-sistema-gestao-academia",
    "title": "Integração WhatsApp Com Sistema de Gestão: Tecnofit, Quiver e EvolluX",
    "excerpt": "Guia completo sobre integração whatsapp com sistema de gestão: tecnofit, quiver e evollux. Aprenda estratégias práticas e comprovadas para melhorar re",
    "category": "Automação",
    "date": "2023-12-20"
  },
  {
    "slug": "mensagens-automaticas-renovacao-academia",
    "title": "Mensagens Automáticas de Renovação: Como Configurar e Exemplos",
    "excerpt": "Guia completo sobre mensagens automáticas de renovação: como configurar e exemplos. Aprenda estratégias práticas e comprovadas para melhorar resultado",
    "category": "Automação",
    "date": "2023-12-19"
  },
  {
    "slug": "campanha-whatsapp-reativacao-alunos",
    "title": "Campanha de Reativação no WhatsApp: Fluxo Completo Para Alunos Inativos",
    "excerpt": "Guia completo sobre campanha de reativação no whatsapp: fluxo completo para alunos inativos. Aprenda estratégias práticas e comprovadas para melhorar ",
    "category": "Automação",
    "date": "2023-12-18"
  },
  {
    "slug": "whatsapp-agendar-aula-experimental",
    "title": "Como Usar WhatsApp Para Agendar Aula Experimental Automaticamente",
    "excerpt": "Guia completo sobre como usar whatsapp para agendar aula experimental automaticamente. Aprenda estratégias práticas e comprovadas para melhorar result",
    "category": "Automação",
    "date": "2023-12-17"
  },
  {
    "slug": "confirmacao-presenca-automatica-whatsapp",
    "title": "Confirmação de Presença Automática no WhatsApp: Reduza No-Shows",
    "excerpt": "Guia completo sobre confirmação de presença automática no whatsapp: reduza no-shows. Aprenda estratégias práticas e comprovadas para melhorar resultad",
    "category": "Automação",
    "date": "2023-12-16"
  },
  {
    "slug": "lembretes-cobranca-whatsapp",
    "title": "Lembretes de Cobrança no WhatsApp: Como Fazer Sem Ser Chato",
    "excerpt": "Guia completo sobre lembretes de cobrança no whatsapp: como fazer sem ser chato. Aprenda estratégias práticas e comprovadas para melhorar resultados d",
    "category": "Automação",
    "date": "2023-12-15"
  },
  {
    "slug": "segmentacao-mensagens-whatsapp",
    "title": "Segmentação de Mensagens no WhatsApp: Como Personalizar Comunicação",
    "excerpt": "Guia completo sobre segmentação de mensagens no whatsapp: como personalizar comunicação. Aprenda estratégias práticas e comprovadas para melhorar resu",
    "category": "Automação",
    "date": "2023-12-14"
  },
  {
    "slug": "broadcast-whatsapp-academia",
    "title": "Broadcast no WhatsApp: Como Enviar Mensagens em Massa Sem Ser Bloqueado",
    "excerpt": "Guia completo sobre broadcast no whatsapp: como enviar mensagens em massa sem ser bloqueado. Aprenda estratégias práticas e comprovadas para melhorar ",
    "category": "Automação",
    "date": "2023-12-13"
  },
  {
    "slug": "funil-vendas-whatsapp-academia",
    "title": "Funil de Vendas no WhatsApp: Do Lead à Matrícula",
    "excerpt": "Guia completo sobre funil de vendas no whatsapp: do lead à matrícula. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua acade",
    "category": "Automação",
    "date": "2023-12-12"
  },
  {
    "slug": "follow-up-automatico-leads-whatsapp",
    "title": "Follow-up Automático de Leads no WhatsApp: Quando e Como Fazer",
    "excerpt": "Guia completo sobre follow-up automático de leads no whatsapp: quando e como fazer. Aprenda estratégias práticas e comprovadas para melhorar resultado",
    "category": "Automação",
    "date": "2023-12-11"
  },
  {
    "slug": "qualificacao-leads-whatsapp",
    "title": "Qualificação de Leads no WhatsApp: Perguntas e Fluxos Inteligentes",
    "excerpt": "Guia completo sobre qualificação de leads no whatsapp: perguntas e fluxos inteligentes. Aprenda estratégias práticas e comprovadas para melhorar resul",
    "category": "Automação",
    "date": "2023-12-10"
  },
  {
    "slug": "automacao-reserva-turmas-whatsapp",
    "title": "Automação de Reserva de Turmas no WhatsApp: Passo a Passo",
    "excerpt": "Guia completo sobre automação de reserva de turmas no whatsapp: passo a passo. Aprenda estratégias práticas e comprovadas para melhorar resultados da ",
    "category": "Automação",
    "date": "2023-12-09"
  },
  {
    "slug": "pesquisa-nps-automatica-whatsapp",
    "title": "Pesquisa NPS Automática no WhatsApp: Como Coletar Feedback",
    "excerpt": "Guia completo sobre pesquisa nps automática no whatsapp: como coletar feedback. Aprenda estratégias práticas e comprovadas para melhorar resultados da",
    "category": "Automação",
    "date": "2023-12-08"
  },
  {
    "slug": "avisos-horarios-whatsapp",
    "title": "Avisos de Horários e Alterações no WhatsApp: Como Automatizar",
    "excerpt": "Guia completo sobre avisos de horários e alterações no whatsapp: como automatizar. Aprenda estratégias práticas e comprovadas para melhorar resultados",
    "category": "Automação",
    "date": "2023-12-07"
  },
  {
    "slug": "como-converter-mais-leads-academia",
    "title": "Como Converter Mais Leads em Academia: 10 Táticas Comprovadas",
    "excerpt": "Guia completo sobre como converter mais leads em academia: 10 táticas comprovadas. Aprenda estratégias práticas e comprovadas para melhorar resultados",
    "category": "Vendas",
    "date": "2023-12-06"
  },
  {
    "slug": "aumentar-taxa-conversao-leads-fitness",
    "title": "Como Aumentar Taxa de Conversão de Leads em 40%: Guia Fitness",
    "excerpt": "Guia completo sobre como aumentar taxa de conversão de leads em 40%: guia fitness. Aprenda estratégias práticas e comprovadas para melhorar resultados",
    "category": "Vendas",
    "date": "2023-12-05"
  },
  {
    "slug": "funil-vendas-academia-otimizar",
    "title": "Funil de Vendas Para Academia: Como Otimizar Cada Etapa",
    "excerpt": "Guia completo sobre funil de vendas para academia: como otimizar cada etapa. Aprenda estratégias práticas e comprovadas para melhorar resultados da su",
    "category": "Vendas",
    "date": "2023-12-04"
  },
  {
    "slug": "aula-experimental-converter-matricula",
    "title": "Aula Experimental Que Converte: Do Agendamento à Matrícula",
    "excerpt": "Guia completo sobre aula experimental que converte: do agendamento à matrícula. Aprenda estratégias práticas e comprovadas para melhorar resultados da",
    "category": "Vendas",
    "date": "2023-12-03"
  },
  {
    "slug": "follow-up-leads-academia",
    "title": "Follow-up de Leads Para Academia: Timing e Mensagens Que Funcionam",
    "excerpt": "Guia completo sobre follow-up de leads para academia: timing e mensagens que funcionam. Aprenda estratégias práticas e comprovadas para melhorar resul",
    "category": "Vendas",
    "date": "2023-12-02"
  },
  {
    "slug": "resposta-rapida-leads-whatsapp",
    "title": "Resposta Rápida a Leads: Por Que Primeiros 5 Minutos São Cruciais",
    "excerpt": "Guia completo sobre resposta rápida a leads: por que primeiros 5 minutos são cruciais. Aprenda estratégias práticas e comprovadas para melhorar result",
    "category": "Vendas",
    "date": "2023-12-01"
  },
  {
    "slug": "qualificar-leads-academia",
    "title": "Como Qualificar Leads de Academia: Perguntas e Critérios",
    "excerpt": "Guia completo sobre como qualificar leads de academia: perguntas e critérios. Aprenda estratégias práticas e comprovadas para melhorar resultados da s",
    "category": "Vendas",
    "date": "2023-11-30"
  },
  {
    "slug": "oferta-irresistivel-fechar-matricula",
    "title": "Como Criar Oferta Irresistível Para Fechar Matrícula",
    "excerpt": "Guia completo sobre como criar oferta irresistível para fechar matrícula. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua a",
    "category": "Vendas",
    "date": "2023-11-29"
  },
  {
    "slug": "objecoes-venda-academia",
    "title": "Objeções de Venda em Academia: Como Contornar as 10 Mais Comuns",
    "excerpt": "Guia completo sobre objeções de venda em academia: como contornar as 10 mais comuns. Aprenda estratégias práticas e comprovadas para melhorar resultad",
    "category": "Vendas",
    "date": "2023-11-28"
  },
  {
    "slug": "cac-custo-aquisicao-cliente-academia",
    "title": "CAC (Custo de Aquisição): Como Calcular e Reduzir na Academia",
    "excerpt": "Guia completo sobre cac (custo de aquisição): como calcular e reduzir na academia. Aprenda estratégias práticas e comprovadas para melhorar resultados",
    "category": "Vendas",
    "date": "2023-11-27"
  },
  {
    "slug": "landing-page-academia-converter",
    "title": "Landing Page Para Academia Que Converte: Elementos Essenciais",
    "excerpt": "Guia completo sobre landing page para academia que converte: elementos essenciais. Aprenda estratégias práticas e comprovadas para melhorar resultados",
    "category": "Vendas",
    "date": "2023-11-26"
  },
  {
    "slug": "trafego-pago-academia-converter",
    "title": "Tráfego Pago Para Academia: Como Converter Cliques em Matrículas",
    "excerpt": "Guia completo sobre tráfego pago para academia: como converter cliques em matrículas. Aprenda estratégias práticas e comprovadas para melhorar resulta",
    "category": "Vendas",
    "date": "2023-11-25"
  },
  {
    "slug": "crm-gestao-leads-academia",
    "title": "CRM Para Gestão de Leads: Como Organizar e Não Perder Oportunidades",
    "excerpt": "Guia completo sobre crm para gestão de leads: como organizar e não perder oportunidades. Aprenda estratégias práticas e comprovadas para melhorar resu",
    "category": "Vendas",
    "date": "2023-11-24"
  },
  {
    "slug": "script-vendas-academia",
    "title": "Script de Vendas Para Academia: Modelo Pronto e Personalizável",
    "excerpt": "Guia completo sobre script de vendas para academia: modelo pronto e personalizável. Aprenda estratégias práticas e comprovadas para melhorar resultado",
    "category": "Vendas",
    "date": "2023-11-23"
  },
  {
    "slug": "timing-perfeito-fechar-venda-lead",
    "title": "Timing Perfeito Para Fechar Venda: Quando Abordar Lead",
    "excerpt": "Guia completo sobre timing perfeito para fechar venda: quando abordar lead. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua",
    "category": "Vendas",
    "date": "2023-11-22"
  },
  {
    "slug": "melhor-crm-academia-pequena",
    "title": "Melhor CRM Para Academia Pequena: Comparativo Completo 2025",
    "excerpt": "Guia completo sobre melhor crm para academia pequena: comparativo completo 2025. Aprenda estratégias práticas e comprovadas para melhorar resultados d",
    "category": "Gestão",
    "date": "2023-11-21"
  },
  {
    "slug": "software-gestao-academia-comparacao",
    "title": "Software de Gestão Para Academia: Comparação Entre os 7 Principais",
    "excerpt": "Guia completo sobre software de gestão para academia: comparação entre os 7 principais. Aprenda estratégias práticas e comprovadas para melhorar resul",
    "category": "Gestão",
    "date": "2023-11-20"
  },
  {
    "slug": "sistema-academia-cloud-beneficios",
    "title": "Sistema de Academia na Nuvem: Benefícios e Como Escolher",
    "excerpt": "Guia completo sobre sistema de academia na nuvem: benefícios e como escolher. Aprenda estratégias práticas e comprovadas para melhorar resultados da s",
    "category": "Gestão",
    "date": "2023-11-19"
  },
  {
    "slug": "integracao-tecnofit-quiver-evolux",
    "title": "Integração Com Tecnofit, Quiver e EvolluX: Guia Completo",
    "excerpt": "Guia completo sobre integração com tecnofit, quiver e evollux: guia completo. Aprenda estratégias práticas e comprovadas para melhorar resultados da s",
    "category": "Gestão",
    "date": "2023-11-18"
  },
  {
    "slug": "gestao-financeira-academia",
    "title": "Gestão Financeira de Academia: Como Organizar e Lucrar Mais",
    "excerpt": "Guia completo sobre gestão financeira de academia: como organizar e lucrar mais. Aprenda estratégias práticas e comprovadas para melhorar resultados d",
    "category": "Gestão",
    "date": "2023-11-17"
  },
  {
    "slug": "controle-acesso-academia",
    "title": "Controle de Acesso em Academia: Tecnologias e Melhores Práticas",
    "excerpt": "Guia completo sobre controle de acesso em academia: tecnologias e melhores práticas. Aprenda estratégias práticas e comprovadas para melhorar resultad",
    "category": "Gestão",
    "date": "2023-11-16"
  },
  {
    "slug": "gestao-turmas-horarios-academia",
    "title": "Gestão de Turmas e Horários: Como Otimizar Ocupação",
    "excerpt": "Guia completo sobre gestão de turmas e horários: como otimizar ocupação. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua ac",
    "category": "Gestão",
    "date": "2023-11-15"
  },
  {
    "slug": "relatorios-metricas-academia",
    "title": "Relatórios e Métricas Essenciais Para Academia: O Que Acompanhar",
    "excerpt": "Guia completo sobre relatórios e métricas essenciais para academia: o que acompanhar. Aprenda estratégias práticas e comprovadas para melhorar resulta",
    "category": "Gestão",
    "date": "2023-11-14"
  },
  {
    "slug": "automacao-cobranca-academia",
    "title": "Automação de Cobrança: Como Reduzir Inadimplência em 50%",
    "excerpt": "Guia completo sobre automação de cobrança: como reduzir inadimplência em 50%. Aprenda estratégias práticas e comprovadas para melhorar resultados da s",
    "category": "Gestão",
    "date": "2023-11-13"
  },
  {
    "slug": "gestao-equipe-academia",
    "title": "Gestão de Equipe em Academia: Como Treinar e Motivar Professores",
    "excerpt": "Guia completo sobre gestão de equipe em academia: como treinar e motivar professores. Aprenda estratégias práticas e comprovadas para melhorar resulta",
    "category": "Gestão",
    "date": "2023-11-12"
  },
  {
    "slug": "escala-treinos-automatica",
    "title": "Escala de Treinos Automática: Como Configurar e Benefícios",
    "excerpt": "Guia completo sobre escala de treinos automática: como configurar e benefícios. Aprenda estratégias práticas e comprovadas para melhorar resultados da",
    "category": "Gestão",
    "date": "2023-11-11"
  },
  {
    "slug": "controle-estoque-suplementos",
    "title": "Controle de Estoque de Suplementos: Sistema e Melhores Práticas",
    "excerpt": "Guia completo sobre controle de estoque de suplementos: sistema e melhores práticas. Aprenda estratégias práticas e comprovadas para melhorar resultad",
    "category": "Gestão",
    "date": "2023-11-10"
  },
  {
    "slug": "agenda-personal-trainer",
    "title": "Agenda Para Personal Trainer: Como Gerenciar Alunos e Horários",
    "excerpt": "Guia completo sobre agenda para personal trainer: como gerenciar alunos e horários. Aprenda estratégias práticas e comprovadas para melhorar resultado",
    "category": "Gestão",
    "date": "2023-11-09"
  },
  {
    "slug": "gestao-contratos-academia",
    "title": "Gestão de Contratos de Academia: Templates e Automação",
    "excerpt": "Guia completo sobre gestão de contratos de academia: templates e automação. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua",
    "category": "Gestão",
    "date": "2023-11-08"
  },
  {
    "slug": "backup-dados-academia",
    "title": "Backup de Dados em Academia: Como Proteger Informações",
    "excerpt": "Guia completo sobre backup de dados em academia: como proteger informações. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua",
    "category": "Gestão",
    "date": "2023-11-07"
  },
  {
    "slug": "marketing-digital-academia-guia",
    "title": "Marketing Digital Para Academia: Guia Completo Para Iniciantes",
    "excerpt": "Guia completo sobre marketing digital para academia: guia completo para iniciantes. Aprenda estratégias práticas e comprovadas para melhorar resultado",
    "category": "Marketing",
    "date": "2023-11-06"
  },
  {
    "slug": "instagram-academia-atrair-alunos",
    "title": "Instagram Para Academia: Como Atrair Alunos e Criar Conteúdo",
    "excerpt": "Guia completo sobre instagram para academia: como atrair alunos e criar conteúdo. Aprenda estratégias práticas e comprovadas para melhorar resultados ",
    "category": "Marketing",
    "date": "2023-11-05"
  },
  {
    "slug": "google-meu-negocio-academia",
    "title": "Google Meu Negócio Para Academia: Otimização Completa",
    "excerpt": "Guia completo sobre google meu negócio para academia: otimização completa. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua ",
    "category": "Marketing",
    "date": "2023-11-04"
  },
  {
    "slug": "trafego-pago-academia-iniciantes",
    "title": "Tráfego Pago Para Academia: Guia Para Iniciantes",
    "excerpt": "Guia completo sobre tráfego pago para academia: guia para iniciantes. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua acade",
    "category": "Marketing",
    "date": "2023-11-03"
  },
  {
    "slug": "marketing-conteudo-academia",
    "title": "Marketing de Conteúdo Para Academia: Como Criar e Distribuir",
    "excerpt": "Guia completo sobre marketing de conteúdo para academia: como criar e distribuir. Aprenda estratégias práticas e comprovadas para melhorar resultados ",
    "category": "Marketing",
    "date": "2023-11-02"
  },
  {
    "slug": "email-marketing-academia",
    "title": "Email Marketing Para Academia: Estratégias e Templates",
    "excerpt": "Guia completo sobre email marketing para academia: estratégias e templates. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua",
    "category": "Marketing",
    "date": "2023-11-01"
  },
  {
    "slug": "programa-indicacao-academia",
    "title": "Programa de Indicação: Como Criar e Incentivar Alunos",
    "excerpt": "Guia completo sobre programa de indicação: como criar e incentivar alunos. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua ",
    "category": "Marketing",
    "date": "2023-10-31"
  },
  {
    "slug": "parcerias-locais-academia",
    "title": "Parcerias Locais Para Academia: Como Encontrar e Fechar",
    "excerpt": "Guia completo sobre parcerias locais para academia: como encontrar e fechar. Aprenda estratégias práticas e comprovadas para melhorar resultados da su",
    "category": "Marketing",
    "date": "2023-10-30"
  },
  {
    "slug": "eventos-desafios-academia",
    "title": "Eventos e Desafios em Academia: Como Organizar e Divulgar",
    "excerpt": "Guia completo sobre eventos e desafios em academia: como organizar e divulgar. Aprenda estratégias práticas e comprovadas para melhorar resultados da ",
    "category": "Marketing",
    "date": "2023-10-29"
  },
  {
    "slug": "branding-academia-pequena",
    "title": "Branding Para Academia Pequena: Como Criar Marca Forte",
    "excerpt": "Guia completo sobre branding para academia pequena: como criar marca forte. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua",
    "category": "Marketing",
    "date": "2023-10-28"
  },
  {
    "slug": "copywriting-vendas-academia",
    "title": "Copywriting Para Vendas em Academia: Fórmulas e Exemplos",
    "excerpt": "Guia completo sobre copywriting para vendas em academia: fórmulas e exemplos. Aprenda estratégias práticas e comprovadas para melhorar resultados da s",
    "category": "Marketing",
    "date": "2023-10-27"
  },
  {
    "slug": "stories-instagram-engajar",
    "title": "Stories do Instagram Que Engajam: Ideias Para Academia",
    "excerpt": "Guia completo sobre stories do instagram que engajam: ideias para academia. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua",
    "category": "Marketing",
    "date": "2023-10-26"
  },
  {
    "slug": "reels-tiktok-academia",
    "title": "Reels e TikTok Para Academia: Como Viralizar e Atrair Alunos",
    "excerpt": "Guia completo sobre reels e tiktok para academia: como viralizar e atrair alunos. Aprenda estratégias práticas e comprovadas para melhorar resultados ",
    "category": "Marketing",
    "date": "2023-10-25"
  },
  {
    "slug": "seo-local-academia",
    "title": "SEO Local Para Academia: Como Aparecer no Google Maps",
    "excerpt": "Guia completo sobre seo local para academia: como aparecer no google maps. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua ",
    "category": "Marketing",
    "date": "2023-10-24"
  },
  {
    "slug": "anuncios-facebook-instagram-academia",
    "title": "Anúncios no Facebook e Instagram: Guia Completo Para Academia",
    "excerpt": "Guia completo sobre anúncios no facebook e instagram: guia completo para academia. Aprenda estratégias práticas e comprovadas para melhorar resultados",
    "category": "Marketing",
    "date": "2023-10-23"
  },
  {
    "slug": "crossfit-box-gestao-diferencas",
    "title": "Gestão de Box CrossFit: Diferenças e Estratégias Específicas",
    "excerpt": "Guia completo sobre gestão de box crossfit: diferenças e estratégias específicas. Aprenda estratégias práticas e comprovadas para melhorar resultados ",
    "category": "Específico",
    "date": "2023-10-22"
  },
  {
    "slug": "studio-pilates-automacao",
    "title": "Studio de Pilates: Como Automatizar Gestão e Agendamentos",
    "excerpt": "Guia completo sobre studio de pilates: como automatizar gestão e agendamentos. Aprenda estratégias práticas e comprovadas para melhorar resultados da ",
    "category": "Específico",
    "date": "2023-10-21"
  },
  {
    "slug": "academia-pequena-vs-grande",
    "title": "Academia Pequena vs Grande: Estratégias de Gestão Para Cada Porte",
    "excerpt": "Guia completo sobre academia pequena vs grande: estratégias de gestão para cada porte. Aprenda estratégias práticas e comprovadas para melhorar result",
    "category": "Específico",
    "date": "2023-10-20"
  },
  {
    "slug": "personal-trainer-gestao-alunos",
    "title": "Personal Trainer: Como Gerenciar Alunos e Escalar Negócio",
    "excerpt": "Guia completo sobre personal trainer: como gerenciar alunos e escalar negócio. Aprenda estratégias práticas e comprovadas para melhorar resultados da ",
    "category": "Específico",
    "date": "2023-10-19"
  },
  {
    "slug": "franquia-academia-gestao",
    "title": "Franquia de Academia: Gestão, Desafios e Oportunidades",
    "excerpt": "Guia completo sobre franquia de academia: gestão, desafios e oportunidades. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua",
    "category": "Específico",
    "date": "2023-10-18"
  },
  {
    "slug": "academia-low-cost-estrategia",
    "title": "Academia Low Cost: Estratégia de Preço e Operação Enxuta",
    "excerpt": "Guia completo sobre academia low cost: estratégia de preço e operação enxuta. Aprenda estratégias práticas e comprovadas para melhorar resultados da s",
    "category": "Específico",
    "date": "2023-10-17"
  },
  {
    "slug": "boutique-fitness-studio",
    "title": "Boutique Fitness Studio: Como Posicionar e Precificar",
    "excerpt": "Guia completo sobre boutique fitness studio: como posicionar e precificar. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua ",
    "category": "Específico",
    "date": "2023-10-16"
  },
  {
    "slug": "box-muay-thai-jiu-jitsu-gestao",
    "title": "Box de Muay Thai e Jiu-Jitsu: Gestão e Retenção de Alunos",
    "excerpt": "Guia completo sobre box de muay thai e jiu-jitsu: gestão e retenção de alunos. Aprenda estratégias práticas e comprovadas para melhorar resultados da ",
    "category": "Específico",
    "date": "2023-10-15"
  },
  {
    "slug": "funcional-outdoor-gestao",
    "title": "Treino Funcional Outdoor: Como Gerenciar e Crescer",
    "excerpt": "Guia completo sobre treino funcional outdoor: como gerenciar e crescer. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua aca",
    "category": "Específico",
    "date": "2023-10-14"
  },
  {
    "slug": "yoga-meditacao-studio-gestao",
    "title": "Studio de Yoga e Meditação: Gestão e Marketing Consciente",
    "excerpt": "Guia completo sobre studio de yoga e meditação: gestão e marketing consciente. Aprenda estratégias práticas e comprovadas para melhorar resultados da ",
    "category": "Específico",
    "date": "2023-10-13"
  },
  {
    "slug": "natacao-gestao-horarios",
    "title": "Aulas de Natação: Como Gerenciar Horários e Turmas",
    "excerpt": "Guia completo sobre aulas de natação: como gerenciar horários e turmas. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua aca",
    "category": "Específico",
    "date": "2023-10-12"
  },
  {
    "slug": "academia-24-horas-gestao",
    "title": "Academia 24 Horas: Gestão de Acesso e Segurança",
    "excerpt": "Guia completo sobre academia 24 horas: gestão de acesso e segurança. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua academ",
    "category": "Específico",
    "date": "2023-10-11"
  },
  {
    "slug": "cross-training-gestao",
    "title": "Cross Training: Como Gerenciar Treinos e Engajar Alunos",
    "excerpt": "Guia completo sobre cross training: como gerenciar treinos e engajar alunos. Aprenda estratégias práticas e comprovadas para melhorar resultados da su",
    "category": "Específico",
    "date": "2023-10-10"
  },
  {
    "slug": "bike-indoor-gestao",
    "title": "Bike Indoor/Spinning: Gestão de Turmas e Retenção",
    "excerpt": "Guia completo sobre bike indoor/spinning: gestão de turmas e retenção. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua acad",
    "category": "Específico",
    "date": "2023-10-09"
  },
  {
    "slug": "hiit-gestao-turmas",
    "title": "HIIT: Como Gerenciar Turmas de Alta Intensidade",
    "excerpt": "Guia completo sobre hiit: como gerenciar turmas de alta intensidade. Aprenda estratégias práticas e comprovadas para melhorar resultados da sua academ",
    "category": "Específico",
    "date": "2023-10-08"
  }
] // Limitando para exemplo

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [displayedPosts, setDisplayedPosts] = useState(12);

  const categories = ['Todos', 'Retenção', 'IA & Retenção', 'Automação', 'Vendas', 'Gestão', 'Marketing', 'Específico'];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const visiblePosts = filteredPosts.slice(0, displayedPosts);
  const featuredPost = blogPosts[0];
  const hasMore = displayedPosts < filteredPosts.length;

  // Detectar posts novos (< 7 dias)
  const isNewPost = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays < 7;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b-2 border-white fixed w-full z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-xl md:text-2xl font-bold tracking-tight">NeoFitFlow</span>
            </Link>
            <Link
              href="/"
              className="bg-white text-black px-4 md:px-6 py-2 hover:bg-gray-200 transition-colors font-bold border-2 border-white text-sm md:text-base"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - Enhanced */}
      <section className="pt-32 pb-12 px-4 border-b-2 border-white bg-gradient-to-br from-slate via-black to-primary/20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">301</p>
              <p className="text-sm text-gray-400 font-normal">Artigos Publicados</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-accent">50k+</p>
              <p className="text-sm text-gray-400 font-normal">Leituras Mensais</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-success flex items-center gap-2 justify-center">
                <span>⭐</span>4.8
              </p>
              <p className="text-sm text-gray-400 font-normal">Avaliação Média</p>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-center">
            Blog NeoFitFlow
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-normal max-w-3xl mx-auto text-center mb-8">
            Guias práticos sobre IA, retenção de alunos e automação para academias
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            {/* Search Bar - Enhanced */}
            <div className="relative mb-6">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">
                🔍
              </div>
              <input
                type="text"
                placeholder="Buscar entre 301 artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-12 py-4 bg-white text-black border-4 border-primary focus:outline-none focus:ring-4 focus:ring-primary/50 text-lg rounded-lg font-normal transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black text-2xl font-bold transition-colors"
                >
                  ✕
                </button>
              )}
              {searchTerm && (
                <div className="absolute -bottom-7 left-0 text-sm text-primary font-bold">
                  {filteredPosts.length} resultado{filteredPosts.length !== 1 && 's'} encontrado{filteredPosts.length !== 1 && 's'}
                </div>
              )}
            </div>

            {/* Category Filters - Enhanced */}
            <div className="flex flex-wrap gap-3 justify-center mt-10">
              {categories.map((category) => {
                const config = categoryConfig[category] || { color: 'bg-gray-700', textColor: 'text-white', icon: '📁' };
                const isActive = selectedCategory === category;
                const count = category === 'Todos'
                  ? blogPosts.length
                  : blogPosts.filter(p => p.category === category).length;

                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setDisplayedPosts(12); // Reset pagination
                    }}
                    className={`px-4 py-2 font-bold border-2 transition-all rounded-lg flex items-center gap-2 ${
                      isActive
                        ? `bg-primary text-white border-primary shadow-brutal-sm scale-105`
                        : 'bg-black text-white border-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {category !== 'Todos' && <span className="text-lg">{config.icon}</span>}
                    <span>{category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-800'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      {!searchTerm && selectedCategory === 'Todos' && (
        <section className="py-12 px-4 border-b-2 border-white bg-gradient-to-r from-black via-slate to-black">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-primary to-secondary p-1 rounded-lg animate-fade-in">
              <div className="bg-black p-6 md:p-8 rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-accent text-black px-4 py-2 font-bold text-sm rounded-full animate-bounce-slow">
                    🆕 ARTIGO MAIS RECENTE
                  </span>
                  <span className="bg-danger text-white px-4 py-2 font-bold text-sm rounded-full">
                    🔥 POPULAR
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Thumbnail */}
                  <div className={`h-64 md:h-80 bg-gradient-to-br ${categoryConfig[featuredPost.category]?.gradient || 'from-primary to-secondary'} rounded-lg flex items-center justify-center border-4 border-white shadow-brutal`}>
                    <span className="text-9xl drop-shadow-2xl">
                      {categoryConfig[featuredPost.category]?.icon || '📄'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <div className={`${categoryConfig[featuredPost.category]?.color} ${categoryConfig[featuredPost.category]?.textColor} px-3 py-1 rounded-full inline-flex items-center gap-2 w-fit mb-4`}>
                      <span>{categoryConfig[featuredPost.category]?.icon}</span>
                      <span className="font-bold text-sm">{featuredPost.category}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-lg md:text-xl text-gray-300 font-normal mb-6 line-clamp-3">{featuredPost.excerpt}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-400 font-normal mb-6">
                      <span className="flex items-center gap-1">
                        ⏱️ {getReadingTime(featuredPost.excerpt)} min
                      </span>
                      <span className="flex items-center gap-1">
                        📅 {getRelativeTime(featuredPost.date)}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="bg-primary text-white px-8 py-4 font-bold hover:bg-primary-dark hover:scale-105 hover:shadow-brutal-primary transition-all inline-block text-center rounded-lg"
                    >
                      Ler Agora →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 text-center">
            <p className="text-xl text-gray-400 font-normal">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
              {searchTerm && <span className="text-primary"> para "{searchTerm}"</span>}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePosts.map((post, index) => {
              const config = categoryConfig[post.category] || categoryConfig['Retenção'];
              const isNew = isNewPost(post.date);

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="border-2 border-white hover:border-primary hover:shadow-brutal-primary transition-all group rounded-lg overflow-hidden bg-black animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Thumbnail with gradient */}
                  <div className={`h-48 bg-gradient-to-br ${config.gradient} flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform`}>
                    <span className="text-7xl drop-shadow-2xl">{config.icon}</span>

                    {/* Badges overlay */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {isNew && (
                        <span className="bg-accent text-black px-3 py-1 font-bold text-xs rounded-full shadow-lg">
                          🆕 NOVO
                        </span>
                      )}
                      {index < 5 && (
                        <span className="bg-danger text-white px-3 py-1 font-bold text-xs rounded-full shadow-lg">
                          🔥 POPULAR
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category badge */}
                    <div className={`${config.color} ${config.textColor} px-3 py-1 rounded-full inline-flex items-center gap-1 mb-3`}>
                      <span className="text-sm">{config.icon}</span>
                      <span className="font-bold text-xs">{post.category}</span>
                    </div>

                    <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-300 font-normal group-hover:text-gray-200 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-normal mb-4">
                      <span className="flex items-center gap-1">
                        ⏱️ {getReadingTime(post.excerpt)} min
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        📅 {getRelativeTime(post.date)}
                      </span>
                    </div>

                    <span className="font-bold text-primary group-hover:translate-x-2 inline-block transition-transform">
                      Ler mais →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setDisplayedPosts(prev => prev + 12)}
                className="bg-primary text-white px-8 py-4 font-bold hover:bg-primary-dark hover:scale-105 hover:shadow-brutal-primary transition-all border-2 border-primary rounded-lg"
              >
                Carregar Mais 12 Artigos ({filteredPosts.length - displayedPosts} restantes)
              </button>
            </div>
          )}

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-6xl mb-6">🔍</p>
              <p className="text-2xl text-gray-400 font-normal mb-4">Nenhum artigo encontrado</p>
              <p className="text-lg text-gray-500 font-normal mb-6">
                Tente ajustar sua busca ou filtros
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todos');
                }}
                className="border-2 border-white px-6 py-3 font-bold hover:bg-white hover:text-black transition-all rounded-lg"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t-2 border-white bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Pronto Para Reduzir Evasão Com IA?
          </h2>
          <p className="text-xl text-white/90 font-normal mb-8">
            Sistema que identifica alunos em risco e age automaticamente via WhatsApp
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-4 font-bold hover:bg-gray-100 hover:scale-105 transition-all text-lg border-2 border-white rounded-lg shadow-brutal"
          >
            Ver Demonstração Gratuita
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t-2 border-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 font-normal">© 2025 NeoFitFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}