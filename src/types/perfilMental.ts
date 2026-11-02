/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DimensionKey = 'L' | 'R' | 'E' | 'T';

export type CombinationKey = 'anterior' | 'direito' | 'posterior' | 'esquerdo';

export interface QuestionOption {
  dimension: DimensionKey;
  text: string;
}

export interface Question {
  id: number;
  prompt: string;
  options: QuestionOption[];
}

export type AssessmentAnswers = Record<number, DimensionKey>;

export interface DimensionMetadata {
  key: DimensionKey;
  name: string;
  quadrantName: string;
  discTag: string; // ex: 'D — Dominante', 'I — Influente', etc.
  color: string;
  accentBg: string;
  description: string;
  keywords: string[];
  cognitiveStyle: string;
  problemSolving: string;
  decisionMaking: string;
  workStyle: string;
  position: 'Superior Esquerdo' | 'Superior Direito' | 'Inferior Esquerdo' | 'Inferior Direito';
}

export interface CombinationMetadata {
  key: CombinationKey;
  name: string;
  components: [DimensionKey, DimensionKey];
  positionLabel: string;
  color: string;
  graphPosition: 'Superior Central' | 'Centro Direito' | 'Inferior Central' | 'Centro Esquerdo';
  description: string;
  characteristics: string;
}

export interface RankedDimension {
  dimension: DimensionKey;
  name: string;
  count: number;
  percentage: number;
  rank: number;
}

export interface ScoreSummary {
  counts: Record<DimensionKey, number>;
  percentages: Record<DimensionKey, number>;
  combinations: {
    anterior: number;
    direito: number;
    posterior: number;
    esquerdo: number;
  };
  ranking: RankedDimension[];
  isTiedPredominance: boolean;
  predominant: DimensionKey[];
  secondary: DimensionKey[];
  totalAnswered: number;
  isComplete: boolean;
}

export interface ParticipantInfo {
  name: string;
  role?: string;
  company?: string;
  date: string;
}

export interface AssessmentRecord {
  id: string;
  participant: ParticipantInfo;
  answers: AssessmentAnswers;
  results: ScoreSummary;
  completedAt: string;
}

export type AppView = 'intro' | 'questionnaire' | 'review' | 'report' | 'history';
