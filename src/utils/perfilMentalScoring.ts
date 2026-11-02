/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AssessmentAnswers,
  DimensionKey,
  RankedDimension,
  ScoreSummary
} from '../types/perfilMental';
import { DIMENSIONS_METADATA } from '../data/perfilMentalInterpretations';

/**
 * Calcula os resultados matemáticos exatos do Perfil Mental.
 * Algoritmo puramente determinístico, auditável e sem IA.
 */
export function calculateAssessmentScores(answers: AssessmentAnswers): ScoreSummary {
  const counts: Record<DimensionKey, number> = {
    L: 0,
    R: 0,
    E: 0,
    T: 0
  };

  const answeredIds = Object.keys(answers).map(Number);
  const totalAnswered = answeredIds.length;

  for (const id of answeredIds) {
    const val = answers[id];
    if (val && counts[val] !== undefined) {
      counts[val] += 1;
    }
  }

  // Divisor padrão de 25 questões (ou total respondido se incompleto)
  const baseCount = totalAnswered > 0 ? totalAnswered : 25;

  const percentages: Record<DimensionKey, number> = {
    L: (counts.L / baseCount) * 100,
    R: (counts.R / baseCount) * 100,
    E: (counts.E / baseCount) * 100,
    T: (counts.T / baseCount) * 100
  };

  // Quatro combinações derivadas do gráfico conforme o novo posicionamento:
  // Anterior (Superior) = (T + L) / 2 (Tarefa + Liberdade)
  // Direito (Lateral Direita) = (L + R) / 2 (Liberdade + Relacionamento)
  // Posterior (Inferior) = (E + R) / 2 (Estrutura + Relacionamento)
  // Esquerdo (Lateral Esquerda) = (T + E) / 2 (Tarefa + Estrutura)
  const combinations = {
    anterior: (percentages.T + percentages.L) / 2,
    direito: (percentages.L + percentages.R) / 2,
    posterior: (percentages.E + percentages.R) / 2,
    esquerdo: (percentages.T + percentages.E) / 2
  };

  // Ordenação decrescente dos percentuais
  const entries: { dimension: DimensionKey; count: number; percentage: number }[] = [
    { dimension: 'L', count: counts.L, percentage: percentages.L },
    { dimension: 'R', count: counts.R, percentage: percentages.R },
    { dimension: 'E', count: counts.E, percentage: percentages.E },
    { dimension: 'T', count: counts.T, percentage: percentages.T }
  ];

  entries.sort((a, b) => b.percentage - a.percentage);

  // Atribuição de ranking preservando empates rigorosamente
  const ranking: RankedDimension[] = [];
  let currentRank = 1;

  for (let i = 0; i < entries.length; i++) {
    if (i > 0 && entries[i].percentage < entries[i - 1].percentage) {
      currentRank = i + 1;
    }
    ranking.push({
      dimension: entries[i].dimension,
      name: DIMENSIONS_METADATA[entries[i].dimension].name,
      count: entries[i].count,
      percentage: entries[i].percentage,
      rank: currentRank
    });
  }

  // Identificação de predominância e secundária
  const topPercentage = ranking[0].percentage;
  const topItems = ranking.filter(item => item.percentage === topPercentage);
  const isTiedPredominance = topItems.length > 1;

  const predominant: DimensionKey[] = topItems.map(item => item.dimension);

  // Secundárias: próximos itens que têm rank > topItems
  const nextRank = ranking.find(item => item.percentage < topPercentage);
  let secondary: DimensionKey[] = [];
  if (nextRank) {
    const secondPercentage = nextRank.percentage;
    secondary = ranking
      .filter(item => item.percentage === secondPercentage)
      .map(item => item.dimension);
  }

  return {
    counts,
    percentages,
    combinations,
    ranking,
    isTiedPredominance,
    predominant,
    secondary,
    totalAnswered,
    isComplete: totalAnswered === 25
  };
}

/**
 * Gerador de cenários de teste para validação imediata (Cenários A a F).
 */
export function generateScenarioAnswers(
  scenario: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
): AssessmentAnswers {
  const answers: AssessmentAnswers = {};

  switch (scenario) {
    case 'A': // Predominância L: 25 respostas L
      for (let i = 1; i <= 25; i++) answers[i] = 'L';
      break;

    case 'B': // Predominância R: 25 respostas R
      for (let i = 1; i <= 25; i++) answers[i] = 'R';
      break;

    case 'C': // Predominância E: 25 respostas E
      for (let i = 1; i <= 25; i++) answers[i] = 'E';
      break;

    case 'D': // Predominância T: 25 respostas T
      for (let i = 1; i <= 25; i++) answers[i] = 'T';
      break;

    case 'E': {
      // Distribuição equilibrada: 7 L, 6 R, 6 E, 6 T (Soma = 25)
      // L: 1-7 (7)
      // R: 8-13 (6)
      // E: 14-19 (6)
      // T: 20-25 (6)
      for (let i = 1; i <= 7; i++) answers[i] = 'L';
      for (let i = 8; i <= 13; i++) answers[i] = 'R';
      for (let i = 14; i <= 19; i++) answers[i] = 'E';
      for (let i = 20; i <= 25; i++) answers[i] = 'T';
      break;
    }

    case 'F': {
      // Empate: 10 L, 10 T, 3 E, 2 R (Soma = 25)
      // L e T empatados em 40% cada
      for (let i = 1; i <= 10; i++) answers[i] = 'L';
      for (let i = 11; i <= 20; i++) answers[i] = 'T';
      for (let i = 21; i <= 23; i++) answers[i] = 'E';
      for (let i = 24; i <= 25; i++) answers[i] = 'R';
      break;
    }
  }

  return answers;
}

export const SCENARIO_DESCRIPTIONS: Record<'A' | 'B' | 'C' | 'D' | 'E' | 'F', {
  title: string;
  expected: string;
  details: string;
}> = {
  A: {
    title: 'Cenário A — Predominância L (100%)',
    expected: 'L = 100%, R = 0%, E = 0%, T = 0%',
    details: 'Simula 25 respostas L consecutivas. Testa saturação máxima do quadrante Liberdade.'
  },
  B: {
    title: 'Cenário B — Predominância R (100%)',
    expected: 'R = 100%, L = 0%, E = 0%, T = 0%',
    details: 'Simula 25 respostas R consecutivas. Testa saturação máxima do quadrante Relacionamento.'
  },
  C: {
    title: 'Cenário C — Predominância E (100%)',
    expected: 'E = 100%, L = 0%, R = 0%, T = 0%',
    details: 'Simula 25 respostas E consecutivas. Testa saturação máxima do quadrante Estrutura.'
  },
  D: {
    title: 'Cenário D — Predominância T (100%)',
    expected: 'T = 100%, L = 0%, R = 0%, E = 0%',
    details: 'Simula 25 respostas T consecutivas. Testa saturação máxima do quadrante Tarefa.'
  },
  E: {
    title: 'Cenário E — Distribuição Equilibrada',
    expected: 'L = 28% (7), R = 24% (6), E = 24% (6), T = 24% (6)',
    details: 'Simula perfil com equilíbrio alto entre os 4 quadrantes com leve predomínio de L.'
  },
  F: {
    title: 'Cenário F — Empate Compartilhado',
    expected: 'L = 40% (10), T = 40% (10), E = 12% (3), R = 8% (2)',
    details: 'Simula empate entre Liberdade e Tarefa. Verifica apresentação de predominância compartilhada sem desempate forçado.'
  }
};
