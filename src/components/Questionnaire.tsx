/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AssessmentAnswers, DimensionKey, ParticipantInfo } from '../types/perfilMental';
import { PERFIL_MENTAL_QUESTIONS } from '../data/perfilMentalQuestions';
import { ChevronLeft, ChevronRight, CheckCircle2, User, ArrowRight } from 'lucide-react';

interface QuestionnaireProps {
  participant: ParticipantInfo;
  onUpdateParticipant: (info: ParticipantInfo) => void;
  answers: AssessmentAnswers;
  onSelectAnswer: (questionId: number, dimension: DimensionKey) => void;
  onFinish: () => void;
  initialQuestionIndex?: number;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  participant,
  onUpdateParticipant,
  answers,
  onSelectAnswer,
  onFinish,
  initialQuestionIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialQuestionIndex);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const totalQuestions = PERFIL_MENTAL_QUESTIONS.length;
  const currentQuestion = PERFIL_MENTAL_QUESTIONS[currentIndex];
  const selectedDimension = answers[currentQuestion.id];

  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round((answeredCount / totalQuestions) * 100);
  const isAllAnswered = answeredCount === totalQuestions;

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (isAllAnswered) {
      setShowReviewModal(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Suporte a atalhos de teclado para navegação e resposta rápida
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (['1', 'a', 'A'].includes(e.key) && currentQuestion.options[0]) {
        onSelectAnswer(currentQuestion.id, currentQuestion.options[0].dimension);
      } else if (['2', 'b', 'B'].includes(e.key) && currentQuestion.options[1]) {
        onSelectAnswer(currentQuestion.id, currentQuestion.options[1].dimension);
      } else if (['3', 'c', 'C'].includes(e.key) && currentQuestion.options[2]) {
        onSelectAnswer(currentQuestion.id, currentQuestion.options[2].dimension);
      } else if (['4', 'd', 'D'].includes(e.key) && currentQuestion.options[3]) {
        onSelectAnswer(currentQuestion.id, currentQuestion.options[3].dimension);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAllAnswered, currentQuestion, onSelectAnswer]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Barra de identificação do participante */}
      <div className="mb-6 p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
            <User className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Participante</div>
            <input
              type="text"
              value={participant.name}
              onChange={(e) => onUpdateParticipant({ ...participant, name: e.target.value })}
              placeholder="Digite seu nome completo"
              className="bg-transparent text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
          <div>
            <span className="text-slate-500">Respondidas:</span>{' '}
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{answeredCount}</span> / {totalQuestions}
          </div>
          <div>
            <span className="text-slate-500">Progresso:</span>{' '}
            <span className="font-semibold text-orange-600 dark:text-orange-400 tabular-nums">{progressPct}%</span>
          </div>
        </div>
      </div>

      {/* Barra de progresso visual */}
      <div className="mb-6">
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300 ease-out"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Card da Questão */}
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/40 relative">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/60">
          <span className="text-xs font-bold tracking-wider text-orange-600 dark:text-orange-400 uppercase">
            Questão {currentQuestion.id} de {totalQuestions}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {selectedDimension ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Respondida
              </span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400/90 flex items-center gap-1 font-medium">
                Pendente
              </span>
            )}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
          {currentQuestion.prompt}
        </h2>

        {/* 4 Alternativas */}
        <div className="space-y-3.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedDimension === option.dimension;
            const letters = ['A', 'B', 'C', 'D'];

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectAnswer(currentQuestion.id, option.dimension)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4 group ${
                  isSelected
                    ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-500 shadow-sm shadow-orange-500/10'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                    }`}
                  >
                    {letters[idx]}
                  </div>
                  <span
                    className={`text-sm sm:text-base font-medium leading-relaxed ${
                      isSelected ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}
                  >
                    {option.text}
                  </span>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-orange-500 bg-orange-500' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Controles de Navegação */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400 dark:text-slate-500'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-3">
            {currentIndex === totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setShowReviewModal(true)}
                disabled={!isAllAnswered}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                  isAllAnswered
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60'
                }`}
              >
                <span>Finalizar Avaliação</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-colors"
              >
                <span>Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Indicador discreto de atalhos */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Atalhos:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">1</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">2</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">3</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">4</kbd>
            <span>para responder</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">→</kbd>
            <span>para navegar</span>
          </div>
        </div>
      </div>

      {/* Navegador Rápido de Questões (1 a 25) */}
      <div className="mt-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 shadow-xs">
        <div className="text-xs font-semibold text-slate-700 dark:text-slate-400 mb-3 flex items-center justify-between">
          <span>Mapa de Questões</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-500">Clique para navegar diretamente</span>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-25 gap-1.5">
          {PERFIL_MENTAL_QUESTIONS.map((q, idx) => {
            const hasAnswer = answers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-8 rounded text-xs font-bold transition-all flex items-center justify-center ${
                  isCurrent
                    ? 'ring-2 ring-orange-500 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 font-extrabold'
                    : hasAnswer
                    ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-slate-950/80 dark:text-slate-600 dark:hover:bg-slate-800/50'
                }`}
                title={`Questão ${q.id}: ${hasAnswer ? 'Respondida' : 'Pendente'}`}
              >
                {q.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal de Revisão / Conclusão Pré-Resultado */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4 text-orange-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Concluir Avaliação do Perfil Mental
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Você respondeu a todas as <strong className="text-slate-900 dark:text-white">25 questões</strong> do instrumento.
            </p>

            <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Participante:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{participant.name || 'Não informado'}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Total de Questões:</span>
                <span className="font-semibold text-slate-900 dark:text-white">25 de 25</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Status:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Concluído</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Ao confirmar, o algoritmo matemático consolidará os escores de Liberdade, Relacionamento, Estrutura e Tarefa, gerará o gráfico vetorial das 4 dimensões e 4 combinações, e apresentará seu relatório individual completo.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              >
                Revisar Questões
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowReviewModal(false);
                  onFinish();
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/25 flex items-center gap-1.5 transition-all"
              >
                <span>Gerar Relatório</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
