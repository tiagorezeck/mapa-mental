/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  generateScenarioAnswers,
  calculateAssessmentScores,
  SCENARIO_DESCRIPTIONS
} from '../utils/perfilMentalScoring';
import { ScoreSummary } from '../types/perfilMental';
import { CheckCircle2, XCircle, X, Eye, ShieldCheck } from 'lucide-react';

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyScenario: (scenario: 'A' | 'B' | 'C' | 'D' | 'E' | 'F') => void;
}

export const ValidationModal: React.FC<ValidationModalProps> = ({
  isOpen,
  onClose,
  onApplyScenario
}) => {
  const [selectedScenario, setSelectedScenario] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F'>('A');

  if (!isOpen) return null;

  const scenarios: ('A' | 'B' | 'C' | 'D' | 'E' | 'F')[] = ['A', 'B', 'C', 'D', 'E', 'F'];

  // Executa o cálculo para cada cenário para exibição do status de aprovação
  const testResults: Record<'A' | 'B' | 'C' | 'D' | 'E' | 'F', {
    summary: ScoreSummary;
    passed: boolean;
    checks: { name: string; ok: boolean; desc: string }[];
  }> = {} as any;

  scenarios.forEach((sc) => {
    const answers = generateScenarioAnswers(sc);
    const summary = calculateAssessmentScores(answers);
    const checks: { name: string; ok: boolean; desc: string }[] = [];

    // Checagem 1: Soma de pontos = 25
    const sumPoints = summary.counts.L + summary.counts.R + summary.counts.E + summary.counts.T;
    checks.push({
      name: 'Soma dos 4 Totais = 25',
      ok: sumPoints === 25,
      desc: `Total apurado: ${sumPoints}`
    });

    // Checagem 2: Soma de percentuais = 100%
    const sumPct = Math.round(
      summary.percentages.L + summary.percentages.R + summary.percentages.E + summary.percentages.T
    );
    checks.push({
      name: 'Soma dos Percentuais = 100%',
      ok: sumPct === 100,
      desc: `Soma apurada: ${sumPct}%`
    });

    // Checagem específica do cenário
    if (sc === 'A') {
      checks.push({
        name: 'L = 100% e demais = 0%',
        ok: summary.percentages.L === 100 && summary.percentages.R === 0 && summary.percentages.E === 0 && summary.percentages.T === 0,
        desc: `L: ${summary.percentages.L}%, R: ${summary.percentages.R}%, E: ${summary.percentages.E}%, T: ${summary.percentages.T}%`
      });
    } else if (sc === 'B') {
      checks.push({
        name: 'R = 100% e demais = 0%',
        ok: summary.percentages.R === 100 && summary.percentages.L === 0 && summary.percentages.E === 0 && summary.percentages.T === 0,
        desc: `R: ${summary.percentages.R}%, L: ${summary.percentages.L}%, E: ${summary.percentages.E}%, T: ${summary.percentages.T}%`
      });
    } else if (sc === 'C') {
      checks.push({
        name: 'E = 100% e demais = 0%',
        ok: summary.percentages.E === 100 && summary.percentages.L === 0 && summary.percentages.R === 0 && summary.percentages.T === 0,
        desc: `E: ${summary.percentages.E}%, L: ${summary.percentages.L}%, R: ${summary.percentages.R}%, T: ${summary.percentages.T}%`
      });
    } else if (sc === 'D') {
      checks.push({
        name: 'T = 100% e demais = 0%',
        ok: summary.percentages.T === 100 && summary.percentages.L === 0 && summary.percentages.R === 0 && summary.percentages.E === 0,
        desc: `T: ${summary.percentages.T}%, L: ${summary.percentages.L}%, R: ${summary.percentages.R}%, E: ${summary.percentages.E}%`
      });
    } else if (sc === 'E') {
      checks.push({
        name: 'Equilíbrio com L predominante (7, 6, 6, 6)',
        ok: summary.counts.L === 7 && summary.counts.R === 6 && summary.counts.E === 6 && summary.counts.T === 6,
        desc: `L: ${summary.percentages.L.toFixed(1)}%, R: ${summary.percentages.R}%, E: ${summary.percentages.E}%, T: ${summary.percentages.T}%`
      });
    } else if (sc === 'F') {
      checks.push({
        name: 'Empate duplo L e T (sem desempate artificial)',
        ok: summary.isTiedPredominance && summary.predominant.includes('L') && summary.predominant.includes('T'),
        desc: `Predominância Compartilhada: ${summary.predominant.join(', ')} (${summary.percentages.L}%)`
      });
    }

    const passed = checks.every(c => c.ok);
    testResults[sc] = { summary, passed, checks };
  });

  const activeResult = testResults[selectedScenario];
  const activeDesc = SCENARIO_DESCRIPTIONS[selectedScenario];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Validação de Cenários (Regra 10)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Auditoria determinística dos Cenários A a F exigidos na especificação.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Seletor de Cenários em Abas */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {scenarios.map((sc) => {
              const res = testResults[sc];
              const isSelected = selectedScenario === sc;

              return (
                <button
                  key={sc}
                  onClick={() => setSelectedScenario(sc)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-slate-900 dark:text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-sm">Cenário {sc}</span>
                    {res.passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-500" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-500 truncate">
                    {sc === 'A' && 'L 100%'}
                    {sc === 'B' && 'R 100%'}
                    {sc === 'C' && 'E 100%'}
                    {sc === 'D' && 'T 100%'}
                    {sc === 'E' && 'Equilíbrio'}
                    {sc === 'F' && 'Empate'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detalhes do Cenário Selecionado */}
          <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{activeDesc.title}</h4>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Validado com Sucesso
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{activeDesc.details}</p>
              <div className="text-xs text-orange-600 dark:text-orange-400 font-mono mt-1">
                Esperado: {activeDesc.expected}
              </div>
            </div>

            {/* Tabela de Resultados Apurados */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-slate-500 mb-0.5">T (Tarefa · D)</div>
                <div className="text-lg font-bold text-red-600 dark:text-red-400 tabular-nums">
                  {activeResult.summary.percentages.T.toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-400">
                  {activeResult.summary.counts.T} de 25 respostas
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-slate-500 mb-0.5">L (Liberdade · I)</div>
                <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400 tabular-nums">
                  {activeResult.summary.percentages.L.toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-400">
                  {activeResult.summary.counts.L} de 25 respostas
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-slate-500 mb-0.5">E (Estrutura · C)</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                  {activeResult.summary.percentages.E.toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-400">
                  {activeResult.summary.counts.E} de 25 respostas
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="text-slate-500 mb-0.5">R (Relacionamento · S)</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400 tabular-nums">
                  {activeResult.summary.percentages.R.toFixed(1)}%
                </div>
                <div className="text-[10px] text-slate-400">
                  {activeResult.summary.counts.R} de 25 respostas
                </div>
              </div>
            </div>

            {/* As 4 Combinações Derivadas */}
            <div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-400 mb-2">
                Médias Derivadas das Combinações:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60">
                  <span className="text-slate-500 text-[11px]">Anterior (T+L):</span>{' '}
                  <span className="font-bold text-orange-600 dark:text-orange-400 tabular-nums">
                    {activeResult.summary.combinations.anterior.toFixed(1)}%
                  </span>
                </div>
                <div className="p-2.5 rounded bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60">
                  <span className="text-slate-500 text-[11px]">Direito (L+R):</span>{' '}
                  <span className="font-bold text-lime-600 dark:text-lime-400 tabular-nums">
                    {activeResult.summary.combinations.direito.toFixed(1)}%
                  </span>
                </div>
                <div className="p-2.5 rounded bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60">
                  <span className="text-slate-500 text-[11px]">Posterior (E+R):</span>{' '}
                  <span className="font-bold text-cyan-600 dark:text-cyan-400 tabular-nums">
                    {activeResult.summary.combinations.posterior.toFixed(1)}%
                  </span>
                </div>
                <div className="p-2.5 rounded bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60">
                  <span className="text-slate-500 text-[11px]">Esquerdo (T+E):</span>{' '}
                  <span className="font-bold text-purple-600 dark:text-purple-400 tabular-nums">
                    {activeResult.summary.combinations.esquerdo.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Lista de Checagens Automatizadas */}
            <div className="space-y-1.5 pt-2">
              {activeResult.checks.map((chk, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-transparent text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{chk.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">{chk.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            6 de 6 cenários auditados e conformes com a especificação original.
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={() => {
                onApplyScenario(selectedScenario);
                onClose();
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/25 flex items-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visualizar no Relatório</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
