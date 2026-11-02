/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DimensionKey, DimensionMetadata, CombinationKey, CombinationMetadata } from '../types/perfilMental';

export const DIMENSIONS_METADATA: Record<DimensionKey, DimensionMetadata> = {
  T: {
    key: 'T',
    name: 'Tarefa',
    quadrantName: 'T — Tarefa',
    discTag: 'D — Dominante',
    color: '#ef4444', // Red (Dominante / Ação / Foco em Resultados)
    accentBg: 'rgba(239, 68, 68, 0.12)',
    description: 'Orientado a resultados tangíveis, foco inabalável, determinação, velocidade de entrega e competitividade sadia.',
    keywords: [
      'Focado',
      'Determinado',
      'Persistente',
      'Competitivo',
      'Objetivo',
      'Orientado a resultados',
      'Direcionado à ação'
    ],
    cognitiveStyle: 'Pensamento lógico, pragmático, objetivo e direto ao ponto. Prioriza a relação causal entre esforço empregado e meta atingida.',
    problemSolving: 'Atua com pragmatismo cirúrgico, elimina distrações e gargalos operacionais, tomando a iniciativa rápida para fazer as coisas acontecerem.',
    decisionMaking: 'Decide com rapidez e assertividade, avaliando custos, benefícios imediatos e vantagens competitivas para assegurar a vitória do projeto.',
    workStyle: 'Estimulado por metas ambiciosas, indicadores claros, autonomia para executar e reconhecimento baseado em entregas concretas.',
    position: 'Superior Esquerdo'
  },
  L: {
    key: 'L',
    name: 'Liberdade',
    quadrantName: 'L — Liberdade',
    discTag: 'I — Influente',
    color: '#eab308', // Yellow (Influente / Visão / Inovação / Otimismo)
    accentBg: 'rgba(234, 179, 8, 0.12)',
    description: 'Orientado à inovação, visão de futuro, exploração de novas fronteiras e flexibilidade diante do desconhecido.',
    keywords: [
      'Idealista',
      'Criativo',
      'Visionário',
      'Explorador',
      'Inovador',
      'Flexível',
      'Aberto a possibilidades'
    ],
    cognitiveStyle: 'Pensamento holístico, conceitual, intuitivo e espacial. Conecta ideias aparentemente desconexas e projeta cenários futuros.',
    problemSolving: 'Busca soluções fora dos padrões convencionais, questiona premissas vigentes e acolhe riscos controlados como motor de descoberta.',
    decisionMaking: 'Tende a decidir com base em intuição, originalidade e potencial de transformação a longo prazo, preferindo alternativas com ampla margem de manobra.',
    workStyle: 'Prefere autonomia, ambientes dinâmicos e desafiadores, com variedade de estímulos e pouca rigidez burocrática.',
    position: 'Superior Direito'
  },
  E: {
    key: 'E',
    name: 'Estrutura',
    quadrantName: 'E — Estrutura',
    discTag: 'C — Conforme',
    color: '#3b82f6', // Blue (Conforme / Análise / Meticulosidade / Processos)
    accentBg: 'rgba(59, 130, 246, 0.12)',
    description: 'Orientado ao planejamento meticuloso, consistência, processos bem definidos, organização e previsibilidade.',
    keywords: [
      'Confiável',
      'Meticuloso',
      'Previsível',
      'Organizado',
      'Planejador',
      'Cauteloso',
      'Orientado a processos'
    ],
    cognitiveStyle: 'Pensamento sequencial, linear, detalhista e procedimental. Mapeia etapas, antecipa contingências e valoriza a ordem lógica.',
    problemSolving: 'Analisa dados com rigor, estabelece cronogramas e procedimentos padronizados, minimizando erros e prevenindo surpresas desagradáveis.',
    decisionMaking: 'Fundamenta suas escolhas em evidências comprovadas, regulamentos, conformidade e análise de risco minuciosa antes de qualquer ação.',
    workStyle: 'Prefere estabilidade, clareza de papéis e diretrizes, rotinas previsíveis e padrões de qualidade consistentes.',
    position: 'Inferior Esquerdo'
  },
  R: {
    key: 'R',
    name: 'Relacionamento',
    quadrantName: 'R — Relacionamento',
    discTag: 'S — Estável',
    color: '#22c55e', // Green (Estável / Empatia / Cooperação / Harmonia)
    accentBg: 'rgba(34, 197, 94, 0.12)',
    description: 'Orientado às conexões humanas, empatia, espírito de equipe, cooperação mútua e atmosfera harmoniosa.',
    keywords: [
      'Divertido',
      'Espiritual',
      'Caridoso',
      'Cooperativo',
      'Sociável',
      'Acolhedor',
      'Orientado às pessoas'
    ],
    cognitiveStyle: 'Pensamento interpessoal, empático, integrador e sensorial. Percebe nuances emocionais e o impacto das ações nas relações.',
    problemSolving: 'Prioriza o diálogo participativo, a construção de consenso e o alinhamento das expectativas do grupo para alcançar soluções sustentáveis.',
    decisionMaking: 'Pondera o impacto sobre as pessoas, o clima do time e os valores compartilhados, buscando decisões que integrem e fortaleçam os laços coletivos.',
    workStyle: 'Desenvolve-se em ambientes colaborativos, acolhedores e com forte senso de comunidade, valorizando o feedback recíproco e a celebração conjunta.',
    position: 'Inferior Direito'
  }
};

export const COMBINATIONS_METADATA: Record<CombinationKey, CombinationMetadata> = {
  anterior: {
    key: 'anterior',
    name: 'Anterior',
    components: ['T', 'L'],
    positionLabel: 'T + L — Anterior',
    color: '#f97316', // Laranja (Vermelho T + Amarelo L)
    graphPosition: 'Superior Central',
    description: 'Integração entre Tarefa e Liberdade. Representa a capacidade de direcionar a imaginação visionária e a criatividade inovadora para a conquista de metas práticas de alto impacto.',
    characteristics: 'Empreendedorismo e inovação de rápida execução. Combina a audácia exploratória com o ímpeto determinado para transformar visões em resultados tangíveis.'
  },
  direito: {
    key: 'direito',
    name: 'Direito',
    components: ['L', 'R'],
    positionLabel: 'L + R — Direito',
    color: '#84cc16', // Verde-Lima (Amarelo L + Verde R)
    graphPosition: 'Centro Direito',
    description: 'Integração entre Liberdade e Relacionamento. Reflete o dinamismo interpessoal, a inovação humanizada e a capacidade de inspirar e engajar pessoas com entusiasmo.',
    characteristics: 'Expressividade, calor humano, abertura a novas ideias compartilhadas e habilidade natural para criar ambientes acolhedores, estimulantes e colaborativos.'
  },
  posterior: {
    key: 'posterior',
    name: 'Posterior',
    components: ['E', 'R'],
    positionLabel: 'E + R — Posterior',
    color: '#06b6d4', // Turquesa/Ciano (Azul E + Verde R)
    graphPosition: 'Inferior Central',
    description: 'Integração entre Estrutura e Relacionamento. Harmoniza a consistência procedimental e a estabilidade com o acolhimento, empatia e sustentação dos laços interpessoais.',
    characteristics: 'Lealdade, confiabilidade interpessoal e método com sensibilidade. Constrói processos seguros e rotinas organizadas que respeitam as pessoas envolvidas.'
  },
  esquerdo: {
    key: 'esquerdo',
    name: 'Esquerdo',
    components: ['T', 'E'],
    positionLabel: 'T + E — Esquerdo',
    color: '#8b5cf6', // Roxo/Violeta (Vermelho T + Azul E)
    graphPosition: 'Centro Esquerdo',
    description: 'Integração entre Tarefa e Estrutura. Define a disciplina técnica, a eficiência operacional e a precisão meticulosa na execução de planos estratégicos.',
    characteristics: 'Elevada produtividade prática e rigor operacional. Alia a confiabilidade de processos e padrões de qualidade à velocidade e determinação nas entregas.'
  }
};

export interface ForceChallengeItem {
  force: string;
  counterpoint: string;
  developmentTip: string;
}

export const FORCES_CHALLENGES_MATRIX: Record<DimensionKey, ForceChallengeItem[]> = {
  L: [
    {
      force: 'Capacidade de inovar e propor caminhos pioneiros',
      counterpoint: 'Pode perder o interesse pela fase de sustentação e execução rotineira',
      developmentTip: 'Exercitar o compromisso de consolidar projetos antes de migrar para a próxima novidade.'
    },
    {
      force: 'Visão global e facilidade em lidar com incertezas',
      counterpoint: 'Risco de dispersão ao abrir frentes simultâneas sem fechamento',
      developmentTip: 'Definir marcos temporais e entregáveis intermediários para manter o foco realizador.'
    },
    {
      force: 'Flexibilidade e desapego a modelos rígidos',
      counterpoint: 'Pode subestimar a relevância de processos e controles essenciais',
      developmentTip: 'Reconhecer que estruturas sólidas conferem estabilidade para que a criatividade floresça com segurança.'
    }
  ],
  R: [
    {
      force: 'Habilidade empática de unir o grupo e acolher pessoas',
      counterpoint: 'Dificuldade ocasional em emitir feedbacks corretivos duros ou dizer "não"',
      developmentTip: 'Diferenciar empatia de permissividade; a clareza sobre expectativas também é uma forma de cuidado com o time.'
    },
    {
      force: 'Construção de ambientes de colaboração e confiança',
      counterpoint: 'Tolerância excessiva a ritmos lentos por receio de gerar atritos',
      developmentTip: 'Combinar acordos claros de pontualidade e entrega conjunta com o clima de celebração.'
    },
    {
      force: 'Sensibilidade para o clima emocional da equipe',
      counterpoint: 'Possibilidade de absorver desgastes emocionais alheios com facilidade',
      developmentTip: 'Estabelecer limites saudáveis entre o suporte solidário e a responsabilidade individual de cada colega.'
    }
  ],
  E: [
    {
      force: 'Elevada organização, previsibilidade e rigor com a qualidade',
      counterpoint: 'Possível resistência a mudanças imprevistas ou a ambientes voláteis',
      developmentTip: 'Treinar a tolerância a soluções imperfeitas que exijam validações rápidas no mercado.'
    },
    {
      force: 'Planejamento antecipado e prevenção contínua de riscos',
      counterpoint: 'Risco de paralisia por análise ao aguardar certezas absolutas',
      developmentTip: 'Praticar tomadas de decisão com informações suficientes (regra dos 70%), ajustando a rota no percurso.'
    },
    {
      force: 'Fidelidade a métodos testados e padrões de excelência',
      counterpoint: 'Tendência a julgar novas abordagens como imprudentes antes de testá-las',
      developmentTip: 'Manter um espaço deliberado para experimentação de novos métodos sem pré-julgamentos.'
    }
  ],
  T: [
    {
      force: 'Foco incansável no resultado, agilidade e persistência',
      counterpoint: 'Impaciência diante de reuniões longas, discussões relacionais ou ritmos mais lentos',
      developmentTip: 'Compreender que o tempo investido no alinhamento de pessoas reduz retrabalhos operacionais.'
    },
    {
      force: 'Objetividade cirúrgica e determinação para superar obstáculos',
      counterpoint: 'Risco de parecer excessivamente direto ou insensível na comunicação',
      developmentTip: 'Calibrar a comunicação com escuta ativa e reconhecimento genuíno dos esforços do time.'
    },
    {
      force: 'Competitividade sadia e direcionamento para a vitória',
      counterpoint: 'Sobrecarga de estresse por assumir o controle total das entregas',
      developmentTip: 'Aprender a delegar tarefas com confiança e valorizar as etapas do processo, não apenas o destino.'
    }
  ]
};

export const PROFESSIONAL_APPLICATIONS: Record<DimensionKey, {
  activityExecution: string;
  organizationPreference: string;
  communicationStyle: string;
  projectParticipation: string;
  peerRelationships: string;
  decisionMakingStyle: string;
  changeManagement: string;
}> = {
  L: {
    activityExecution: 'Prefere atividades que envolvam concepção, prototipagem, criação de novas estratégias e desbravamento de novas oportunidades.',
    organizationPreference: 'Organização visual e espacial, orientada por temas e conceitos, com liberdade para rearranjar prioridades conforme surgem estímulos inovadores.',
    communicationStyle: 'Expressivo, metafórico e entusiasta. Compartilha visões de futuro e estimula o pensamento lateral.',
    projectParticipation: 'Atua com brilho nas fases iniciais de ideação, descoberta e reformulação de produtos ou estratégias.',
    peerRelationships: 'Inspirador e estimulante; convida colegas a pensarem fora da caixa e a desafiarem o status quo.',
    decisionMakingStyle: 'Rápido na percepção intuitiva de tendências, buscando caminhos com maior potencial disruptivo.',
    changeManagement: 'Propulsor natural da transformação; abraça a novidade com entusiasmo e incentiva a renovação.'
  },
  R: {
    activityExecution: 'Destaca-se em atividades que dependem de engajamento humano, desenvolvimento de pessoas, mediação de conflitos e atendimento a clientes.',
    organizationPreference: 'Organização centrada no contato interpessoal, agendas compartilhadas e alinhamentos frequentes em equipe.',
    communicationStyle: 'Caloroso, empático, acolhedor e atencioso. Pratica escuta ativa e busca compreender o que não é dito explicitamente.',
    projectParticipation: 'Fundamental na coesão do grupo, garantindo que todos sejam ouvidos e que os talentos individuais sejam aproveitados harmonicamente.',
    peerRelationships: 'Parceiro solidário e leal; gera ambiente de segurança psicológica onde as pessoas se sentem à vontade para cooperar.',
    decisionMakingStyle: 'Decide consultando as partes interessadas e zelando pela sustentabilidade dos vínculos humanos.',
    changeManagement: 'Preocupa-se em apoiar as pessoas durante transições, mitigando a ansiedade e reforçando a união do grupo.'
  },
  E: {
    activityExecution: 'Excelente em tarefas que exigem conformidade regulatória, auditoria, detalhamento técnico, gestão orçamentária e padronização.',
    organizationPreference: 'Sistemática, sequencial e documentada. Utiliza cronogramas, listas de checagem e fluxogramas precisos.',
    communicationStyle: 'Claro, estruturado, formal e fundamentado em fatos, datas e procedimentos concretos.',
    projectParticipation: 'Pilar de sustentação operacional; garante que os prazos sejam honrados, os custos monitorados e a qualidade técnica preservada.',
    peerRelationships: 'Confiável e ético; cumpre exatamente o que promete e espera reciprocidade no cumprimento de acordos.',
    decisionMakingStyle: 'Ponderado, analítico e respaldado em dados consolidados, evitando decisões precipitadas sob pressão emocional.',
    changeManagement: 'Demanda compreensão lógica das razões da mudança, um plano de transição estruturado e tempo para adaptação aos novos processos.'
  },
  T: {
    activityExecution: 'Destaca-se em ambientes de alta pressão, metas arrojadas, negociações comerciais e resolução rápida de impasses críticos.',
    organizationPreference: 'Direta e funcional. Painéis de metas, indicadores-chave de desempenho (KPIs) e listas de prioridades diárias.',
    communicationStyle: 'Sucinto, assertivo, pragmático e focado nos próximos passos concretos.',
    projectParticipation: 'Motor de propulsão; destrava impedimentos, cobra resultados e garante tração para que o projeto chegue à conclusão.',
    peerRelationships: 'Desafiador e estimulante; puxa a régua de excelência do grupo para cima e valoriza parceiros competentes e comprometidos.',
    decisionMakingStyle: 'Rápido, focado na relação custo-benefício e orientado a obter vantagens imediatas para a meta estipulada.',
    changeManagement: 'Vê a mudança como uma oportunidade tática para superar concorrentes, acelerar resultados e alcançar novas vitórias.'
  }
};

export const PROFILE_SYNERGIES: Record<string, {
  title: string;
  combinationConcept: string;
  synergyDescription: string;
  workplaceAdvantage: string;
}> = {
  'L-R': {
    title: 'Inovador Humanizado',
    combinationConcept: 'Liberdade (Criatividade & Visão) + Relacionamento (Empatia & Integração)',
    synergyDescription: 'A mente visionária de Liberdade é profundamente enriquecida pela sensibilidade interpessoal de Relacionamento. Essa combinação transforma ideias disruptivas em movimentos humanos inspiradores, garantindo que a inovação sempre considere o bem-estar e o engajamento das pessoas.',
    workplaceAdvantage: 'Excepcional em liderança inspiradora, design centrado no ser humano, comunicação empática e engajamento comunitário.'
  },
  'L-E': {
    title: 'Arquiteto Visionário',
    combinationConcept: 'Liberdade (Criatividade & Visão) + Estrutura (Organização & Processos)',
    synergyDescription: 'Alia a capacidade de imaginar futuros ousados à disciplina de desenhar o roteiro técnico para construí-los. A Estrutura confere ancoragem e viabilidade à imaginação irrestrita da Liberdade, evitando a dispersão.',
    workplaceAdvantage: 'Brilhante na transformação de conceitos abstratos em projetos viáveis, estruturação de novas metodologias e inovação planejada.'
  },
  'L-T': {
    title: 'Empreendedor Realizador',
    combinationConcept: 'Liberdade (Criatividade & Visão) + Tarefa (Foco & Direcionamento à Ação)',
    synergyDescription: 'União potente entre a criação de caminhos originais e a obstinação por resultados tangíveis. A Tarefa confere velocidade de execução e sentido de urgência à visão da Liberdade, criando pioneirismo produtivo.',
    workplaceAdvantage: 'Forte propensão intraempreendedora, agilidade para abrir novos mercados e capacidade de transformar crises em oportunidades de vitória.'
  },
  'R-L': {
    title: 'Facilitador Criativo',
    combinationConcept: 'Relacionamento (Empatia & Conexão) + Liberdade (Flexibilidade & Imaginação)',
    synergyDescription: 'A calorosa dedicação ao time de Relacionamento ganha frescor, leveza e entusiasmo contagiante com a Liberdade. Facilita diálogos complexos com criatividade, quebrando barreiras com informalidade acolhedora.',
    workplaceAdvantage: 'Habilidade superior para conduzir dinâmicas de ideação em grupo, gerir o clima organizacional e mediar conflitos de forma inovadora.'
  },
  'R-E': {
    title: 'Mediador Confiável',
    combinationConcept: 'Relacionamento (Empatia & Conexão) + Estrutura (Previsibilidade & Método)',
    synergyDescription: 'A preocupação com o grupo é fundamentada em acordos claros, processos justos e rotinas seguras. A Estrutura protege os vínculos interpessoais da imprevisibilidade, criando segurança psicológica consistente.',
    workplaceAdvantage: 'Excelente na construção de alianças duradouras, gestão de recursos humanos com rigor ético e consolidação de acordos colaborativos.'
  },
  'R-T': {
    title: 'Líder Servidor Realizador',
    combinationConcept: 'Relacionamento (Empatia & Conexão) + Tarefa (Foco & Conquista)',
    synergyDescription: 'Equilíbrio notável entre cuidar das pessoas e cobrar metas com assertividade. Consegue elevar a régua de entrega da equipe sem romper os laços de confiança e respeito mútuo.',
    workplaceAdvantage: 'Liderança participativa de alta performance, facilidade para mobilizar equipes em prol de metas desafiadoras e celebração conjunta de vitórias.'
  },
  'E-L': {
    title: 'Planejador Estratégico',
    combinationConcept: 'Estrutura (Método & Controle) + Liberdade (Flexibilidade & Inovação)',
    synergyDescription: 'O rigor com processos, cronogramas e conformidade da Estrutura é flexibilizado pela abertura a possibilidades da Liberdade. Constrói processos que acomodam melhorias e evoluções sem perder o controle.',
    workplaceAdvantage: 'Arquitetura de sistemas flexíveis, gestão de risco com visão prospectiva e modernização segura de processos operacionais.'
  },
  'E-R': {
    title: 'Guardião da Harmonia Organizacional',
    combinationConcept: 'Estrutura (Método & Controle) + Relacionamento (Empatia & Acolhimento)',
    synergyDescription: 'A sistematicidade e a confiabilidade da Estrutura operam a serviço da clareza relacional e do respeito entre as partes. Proporciona um ambiente ordenado onde todos sabem o que esperar, reduzindo ansiedades.',
    workplaceAdvantage: 'Governança corporativa, conformidade ética com foco em pessoas e sustentação de processos colaborativos transparentes.'
  },
  'E-T': {
    title: 'Gestor Operacional de Alta Eficiência',
    combinationConcept: 'Estrutura (Método & Controle) + Tarefa (Ação & Resultados)',
    synergyDescription: 'Pilar clássico da produtividade técnica e operacional. Alia a precisão de métricas e métodos à velocidade e assertividade da entrega, minimizando desperdícios e garantindo alta qualidade com pontualidade.',
    workplaceAdvantage: 'Gestão de projetos complexos, controle orçamentário rigoroso, otimização de fluxos operacionais e garantia de metas sob pressão.'
  },
  'T-L': {
    title: 'Conquistador Inovador',
    combinationConcept: 'Tarefa (Foco & Determinação) + Liberdade (Originalidade & Visão)',
    synergyDescription: 'A determinação agressiva por resultados é potencializada pela busca de atalhos e abordagens táticas inovadoras. Não se contenta em cumprir a meta do modo tradicional; busca superá-la inventando novas maneiras.',
    workplaceAdvantage: 'Superação de metas em cenários competitivos, negociações estratégicas de alto impacto e liderança de viradas comerciais.'
  },
  'T-R': {
    title: 'Construtor de Resultados Coletivos',
    combinationConcept: 'Tarefa (Foco & Determinação) + Relacionamento (Empatia & Trabalho em Equipe)',
    synergyDescription: 'A obstinação por metas é temperada pela sabedoria de que grandes conquistas dependem da coesão do grupo. Sabe inspirar e conduzir pessoas, mantendo a equipe mobilizada sem esgotar o clima relacional.',
    workplaceAdvantage: 'Liderança de times multidisciplinares, engajamento focado em objetivos comuns e resolução ágil de atritos operacionais.'
  },
  'T-E': {
    title: 'Comandante Disciplinado',
    combinationConcept: 'Tarefa (Foco & Determinação) + Estrutura (Método & Organização)',
    synergyDescription: 'Combina velocidade de ação e combatividade com planejamento minucioso e antecipação de riscos. Avança com determinação, mas sempre respaldado por dados, indicadores precisos e rotas de fuga mapeadas.',
    workplaceAdvantage: 'Gestão de crises, execução de operações críticas sem margem para erro e liderança orientada por métricas quantitativas estritas.'
  }
};

