/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ParticipantInfo } from '../types/perfilMental';
import { DIMENSIONS_METADATA } from '../data/perfilMentalInterpretations';
import { ArrowRight, Compass, CheckCircle2, ShieldCheck, History } from 'lucide-react';

interface IntroViewProps {
  participant: ParticipantInfo;
  onUpdateParticipant: (info: ParticipantInfo) => void;
  onStart: () => void;
  onOpenValidationModal: () => void;
  onViewHistory: () => void;
  hasHistory: boolean;
}

export const IntroView: React.FC<IntroViewProps> = ({
  participant,
  onUpdateParticipant,
  onStart,
  onOpenValidationModal,
  onViewHistory,
  hasHistory
}) => {
  const [errorMsg, setErrorMsg] = useState('');

  const handleStartClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!participant.name.trim()) {
      setErrorMsg('Por favor, informe seu nome para prosseguir com o teste.');
      return;
    }
    setErrorMsg('');
    onStart();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero / Apresentação do Instrumento */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/60 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <span>Assessment COMET</span>
          <span>·</span>
          <span>Instrumento Oficial</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
          Teste do Perfil Mental
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Baseado no Modelo de Dominância Cerebral de Ned Herrmann, este instrumento identifica sua propensão espontânea nas quatro dimensões essenciais do pensamento humano: <strong>Liberdade</strong>, <strong>Relacionamento</strong>, <strong>Estrutura</strong> e <strong>Tarefa</strong>.
        </p>
      </div>

      {/* As 4 Dimensões em Cartões */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {(['T', 'L', 'E', 'R'] as const).map((key) => {
          const meta = DIMENSIONS_METADATA[key];
          return (
            <div
              key={key}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 shadow-xs dark:shadow-none transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-sm text-white"
                    style={{ backgroundColor: meta.color }}
                  >
                    {meta.key}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {meta.discTag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-0.5">{meta.name}</h3>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-2">
                  {meta.position}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {meta.description}
                </p>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                {meta.keywords.slice(0, 3).join(' · ')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Formulário de Identificação do Participante */}
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-xl shadow-slate-200/50 dark:shadow-2xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Identificação para o Relatório</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              O nome informado constará no seu relatório individual e gráfico.
            </p>
          </div>
        </div>

        <form onSubmit={handleStartClick} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Nome Completo <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              value={participant.name}
              onChange={(e) => {
                onUpdateParticipant({ ...participant, name: e.target.value });
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Ex: João da Silva"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              autoFocus
            />
            {errorMsg && (
              <p className="text-xs text-rose-500 mt-1.5 font-medium">{errorMsg}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Cargo / Função (opcional)
              </label>
              <input
                type="text"
                value={participant.role || ''}
                onChange={(e) => onUpdateParticipant({ ...participant, role: e.target.value })}
                placeholder="Ex: Líder de Equipe"
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Organização / Empresa (opcional)
              </label>
              <input
                type="text"
                value={participant.company || ''}
                onChange={(e) => onUpdateParticipant({ ...participant, company: e.target.value })}
                placeholder="Ex: Instituto COMET"
                className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          {/* Orientações sobre o teste */}
          <div className="pt-2 pb-2 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>25 questões com seleção de apenas uma alternativa por item.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Não há respostas certas ou erradas; responda de forma espontânea.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Tempo estimado: 5 a 10 minutos.</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Iniciar Avaliação (25 Questões)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <button
            type="button"
            onClick={onOpenValidationModal}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Auditar Cenários A–F</span>
          </button>

          {hasHistory && (
            <button
              type="button"
              onClick={onViewHistory}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <History className="w-3.5 h-3.5" />
              <span>Consultar Histórico</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
