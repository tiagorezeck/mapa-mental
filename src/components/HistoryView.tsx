/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AssessmentRecord } from '../types/perfilMental';
import { DIMENSIONS_METADATA } from '../data/perfilMentalInterpretations';
import { Eye, Trash2, Calendar, FileText, ArrowRight } from 'lucide-react';

interface HistoryViewProps {
  records: AssessmentRecord[];
  onSelectRecord: (record: AssessmentRecord) => void;
  onDeleteRecord: (id: string) => void;
  onStartNew: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  records,
  onSelectRecord,
  onDeleteRecord,
  onStartNew
}) => {
  if (records.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400 dark:text-slate-500 shadow-xs">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Nenhum Registro Encontrado</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
          Você ainda não concluiu nenhuma avaliação do Perfil Mental neste navegador. Conclua o questionário para registrar e consultar seu histórico.
        </p>
        <button
          onClick={onStartNew}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/25 inline-flex items-center gap-2 transition-all"
        >
          <span>Iniciar Avaliação</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Histórico de Avaliações</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {records.length} {records.length === 1 ? 'registro armazenado' : 'registros armazenados'} no navegador
          </p>
        </div>

        <button
          onClick={onStartNew}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
        >
          <span>Nova Avaliação</span>
        </button>
      </div>

      <div className="space-y-3.5">
        {records.map((rec) => {
          const formattedDate = new Date(rec.completedAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          const primaryDim = rec.results.predominant[0];
          const primaryMeta = DIMENSIONS_METADATA[primaryDim];

          return (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80 shadow-xs dark:shadow-none transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-base">
                    {rec.participant.name || 'Participante'}
                  </span>
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${primaryMeta.color}20`,
                      color: primaryMeta.color
                    }}
                  >
                    {rec.results.isTiedPredominance ? 'Empate Compartilhado' : primaryMeta.name}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>{formattedDate}</span>
                  </span>
                  <span>·</span>
                  <span>25 de 25 questões</span>
                </div>

                {/* Resumo percentual L, R, E, T */}
                <div className="flex items-center gap-3 pt-1 text-xs tabular-nums">
                  <span className="text-sky-600 dark:text-sky-400 font-semibold">
                    L: {rec.results.percentages.L.toFixed(1)}%
                  </span>
                  <span className="text-pink-600 dark:text-pink-400 font-semibold">
                    R: {rec.results.percentages.R.toFixed(1)}%
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    E: {rec.results.percentages.E.toFixed(1)}%
                  </span>
                  <span className="text-orange-600 dark:text-orange-400 font-semibold">
                    T: {rec.results.percentages.T.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onSelectRecord(rec)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-orange-500" />
                  <span>Ver Relatório</span>
                </button>

                <button
                  onClick={() => onDeleteRecord(rec.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  title="Excluir este registro"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
