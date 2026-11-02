/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  AppView,
  AssessmentAnswers,
  AssessmentRecord,
  DimensionKey,
  ParticipantInfo
} from './types/perfilMental';
import { Header } from './components/Header';
import { IntroView } from './components/IntroView';
import { Questionnaire } from './components/Questionnaire';
import { IndividualReport } from './components/IndividualReport';
import { HistoryView } from './components/HistoryView';
import { ValidationModal } from './components/ValidationModal';
import {
  calculateAssessmentScores,
  generateScenarioAnswers,
  SCENARIO_DESCRIPTIONS
} from './utils/perfilMentalScoring';
import {
  saveAssessmentRecord,
  getStoredRecords,
  deleteStoredRecord,
  getDraft,
  saveDraft,
  clearDraft
} from './utils/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('intro');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('comet_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      // Default para modo escuro ou preferência do sistema
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  const [participant, setParticipant] = useState<ParticipantInfo>({
    name: '',
    role: '',
    company: '',
    date: new Date().toISOString()
  });
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [currentRecord, setCurrentRecord] = useState<AssessmentRecord | null>(null);
  const [storedRecords, setStoredRecords] = useState<AssessmentRecord[]>([]);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);

  // Sincroniza a classe .dark no <html> e salva no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('comet_theme', theme);
    } catch {
      // ignore
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Inicialização: carrega histórico e rascunho anterior se houver
  useEffect(() => {
    const records = getStoredRecords();
    setStoredRecords(records);

    const draft = getDraft();
    if (draft && Object.keys(draft.answers).length > 0) {
      setParticipant(draft.participant);
      setAnswers(draft.answers);
    }
  }, []);

  const handleSelectAnswer = (questionId: number, dimension: DimensionKey) => {
    const updated = { ...answers, [questionId]: dimension };
    setAnswers(updated);
    saveDraft(participant, updated, questionId);
  };

  const handleFinishQuestionnaire = () => {
    const results = calculateAssessmentScores(answers);
    const finalParticipant = {
      ...participant,
      name: participant.name.trim() || 'Participante',
      date: new Date().toISOString()
    };

    const record = saveAssessmentRecord(finalParticipant, answers, results);
    setCurrentRecord(record);
    setStoredRecords(getStoredRecords());
    setCurrentView('report');
  };

  const handleApplyScenario = (scenario: 'A' | 'B' | 'C' | 'D' | 'E' | 'F') => {
    const scenarioAnswers = generateScenarioAnswers(scenario);
    const summary = calculateAssessmentScores(scenarioAnswers);
    const scenarioInfo = SCENARIO_DESCRIPTIONS[scenario];

    const simParticipant: ParticipantInfo = {
      name: `${scenarioInfo.title}`,
      role: 'Validação Automatizada',
      company: 'Assessment COMET',
      date: new Date().toISOString()
    };

    const record: AssessmentRecord = {
      id: `sim_${scenario}_${Date.now()}`,
      participant: simParticipant,
      answers: scenarioAnswers,
      results: summary,
      completedAt: new Date().toISOString()
    };

    setAnswers(scenarioAnswers);
    setCurrentRecord(record);
    setCurrentView('report');
  };

  const handleResetTest = () => {
    clearDraft();
    setAnswers({});
    setCurrentRecord(null);
    setCurrentView('intro');
  };

  const handleSelectPastRecord = (rec: AssessmentRecord) => {
    setCurrentRecord(rec);
    setCurrentView('report');
  };

  const handleDeletePastRecord = (id: string) => {
    deleteStoredRecord(id);
    const updated = getStoredRecords();
    setStoredRecords(updated);
    if (currentRecord?.id === id) {
      setCurrentRecord(null);
      setCurrentView('history');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-orange-500/30 selection:text-orange-700 dark:selection:text-orange-200">
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        hasCompletedAssessment={currentRecord !== null}
        onOpenValidationModal={() => setIsValidationModalOpen(true)}
        onResetTest={handleResetTest}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 flex flex-col">
        {currentView === 'intro' && (
          <IntroView
            participant={participant}
            onUpdateParticipant={setParticipant}
            onStart={() => setCurrentView('questionnaire')}
            onOpenValidationModal={() => setIsValidationModalOpen(true)}
            onViewHistory={() => setCurrentView('history')}
            hasHistory={storedRecords.length > 0}
          />
        )}

        {currentView === 'questionnaire' && (
          <Questionnaire
            participant={participant}
            onUpdateParticipant={setParticipant}
            answers={answers}
            onSelectAnswer={handleSelectAnswer}
            onFinish={handleFinishQuestionnaire}
          />
        )}

        {currentView === 'report' && currentRecord && (
          <IndividualReport
            record={currentRecord}
            onResetTest={handleResetTest}
            theme={theme}
          />
        )}

        {currentView === 'history' && (
          <HistoryView
            records={storedRecords}
            onSelectRecord={handleSelectPastRecord}
            onDeleteRecord={handleDeletePastRecord}
            onStartNew={handleResetTest}
          />
        )}
      </main>

      {/* Modal de Validação dos Cenários A a F */}
      <ValidationModal
        isOpen={isValidationModalOpen}
        onClose={() => setIsValidationModalOpen(false)}
        onApplyScenario={handleApplyScenario}
      />
    </div>
  );
}
