/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AssessmentRecord, AssessmentAnswers, ParticipantInfo, ScoreSummary } from '../types/perfilMental';

const STORAGE_KEY = 'comet_perfil_mental_records_v1';
const DRAFT_KEY = 'comet_perfil_mental_draft_v1';

export function saveAssessmentRecord(
  participant: ParticipantInfo,
  answers: AssessmentAnswers,
  results: ScoreSummary
): AssessmentRecord {
  const record: AssessmentRecord = {
    id: `pm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    participant,
    answers,
    results,
    completedAt: new Date().toISOString()
  };

  try {
    const existing = getStoredRecords();
    existing.unshift(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    // Limpa o rascunho após a conclusão
    localStorage.removeItem(DRAFT_KEY);
  } catch (e) {
    console.error('Falha ao salvar registro no localStorage', e);
  }

  return record;
}

export function getStoredRecords(): AssessmentRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as AssessmentRecord[];
  } catch (e) {
    console.error('Falha ao recuperar registros do localStorage', e);
    return [];
  }
}

export function getRecordById(id: string): AssessmentRecord | null {
  const records = getStoredRecords();
  return records.find(r => r.id === id) || null;
}

export function deleteStoredRecord(id: string): void {
  try {
    const records = getStoredRecords().filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Falha ao remover registro', e);
  }
}

export interface AssessmentDraft {
  participant: ParticipantInfo;
  answers: AssessmentAnswers;
  currentQuestionId: number;
  lastUpdated: string;
}

export function saveDraft(
  participant: ParticipantInfo,
  answers: AssessmentAnswers,
  currentQuestionId: number
): void {
  try {
    const draft: AssessmentDraft = {
      participant,
      answers,
      currentQuestionId,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch (e) {
    console.warn('Falha ao salvar rascunho', e);
  }
}

export function getDraft(): AssessmentDraft | null {
  try {
    const data = localStorage.getItem(DRAFT_KEY);
    if (!data) return null;
    return JSON.parse(data) as AssessmentDraft;
  } catch (e) {
    return null;
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (e) {
    // ignore
  }
}
