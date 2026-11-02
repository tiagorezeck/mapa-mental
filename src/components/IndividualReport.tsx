/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AssessmentRecord } from '../types/perfilMental';
import { MentalProfileChart } from './MentalProfileChart';
import {
  DIMENSIONS_METADATA,
  COMBINATIONS_METADATA,
  FORCES_CHALLENGES_MATRIX,
  PROFESSIONAL_APPLICATIONS,
  PROFILE_SYNERGIES
} from '../data/perfilMentalInterpretations';
import {
  Printer,
  Download,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  Compass,
  Briefcase,
  Target,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Calendar,
  User,
  Brain
} from 'lucide-react';

interface IndividualReportProps {
  record: AssessmentRecord;
  onResetTest: () => void;
  theme?: 'light' | 'dark';
}

export const IndividualReport: React.FC<IndividualReportProps> = ({
  record,
  onResetTest,
  theme = 'dark'
}) => {
  const { participant, results, completedAt } = record;
  const { ranking, percentages, combinations, predominant, secondary, isTiedPredominance } = results;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `relatorio_perfil_mental_${(participant.name || 'participante').toLowerCase().replace(/\s+/g, '_')}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const formattedDate = new Date(completedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Geração de Visão Geral Personalizada
  const renderOverviewText = () => {
    if (isTiedPredominance) {
      const names = predominant.map(d => DIMENSIONS_METADATA[d].name).join(' e ');
      return `O perfil mental analisado evidencia uma predominância compartilhada entre as dimensões ${names}, ambas alcançando ${percentages[predominant[0]].toFixed(1)}% das preferências declaradas. Essa configuração aponta para uma versatilidade cognitiva expressiva, na qual o participante transita com igual facilidade entre os diferentes polos comportamentais conforme as demandas do contexto, combinando seus traços marcantes sem sobreposição rígida de uma única tendência.`;
    }

    const primaryKey = predominant[0];
    const primaryMeta = DIMENSIONS_METADATA[primaryKey];
    const secKey = secondary[0];
    const secMeta = secKey ? DIMENSIONS_METADATA[secKey] : null;

    return `O perfil mental avaliado revela uma predominância clara na dimensão ${primaryMeta.name} (${percentages[primaryKey].toFixed(1)}%), caracterizada pela tendência a atuar de forma ${primaryMeta.keywords.slice(0, 3).join(', ').toLowerCase()}. ${secMeta ? `Esta propensão central é complementada harmoniosamente pela dimensão ${secMeta.name} (${percentages[secKey].toFixed(1)}%), que confere equilíbrio e modula a expressão comportamental do participante no ambiente profissional.` : ''} A distribuição reflete preferências espontâneas consolidadas na percepção do mundo, na priorização de tarefas e na tomada de decisões.`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 print:p-0 print:max-w-none">
      {/* Barra de Ações Superior (Oculta na Impressão) */}
      <div className="no-print mb-8 p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs text-orange-600 dark:text-orange-400 font-semibold tracking-wider uppercase">
            Relatório de Avaliação
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            {participant.name || 'Participante'} — Perfil Mental
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-2"
          >
            <Printer className="w-3.5 h-3.5 text-orange-500" />
            <span>Imprimir / Salvar PDF</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Exportar JSON</span>
          </button>

          <button
            onClick={onResetTest}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Novo Teste</span>
          </button>
        </div>
      </div>

      {/* Conteúdo do Relatório Estruturado */}
      <div className="space-y-10">
        {/* ========================================================== */}
        {/* 5.1 IDENTIFICAÇÃO DO PARTICIPANTE */}
        {/* ========================================================== */}
        <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-none print-card print-break-inside-avoid">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  Assessment COMET
                </span>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Instrumento Original</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white print-text-dark tracking-tight">
                Relatório Individual de Perfil Mental
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Referência conceitual: Modelo de Dominância Cerebral (Ned Herrmann adaptado)
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Avaliação Concluída</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                <User className="w-3.5 h-3.5 text-orange-500" />
                <span>Participante</span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white text-sm truncate">
                {participant.name || 'Participante Não Identificado'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                <span>Data de Realização</span>
              </div>
              <div className="font-semibold text-slate-900 dark:text-white truncate">
                {formattedDate}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                <span>Itens Respondidos</span>
              </div>
              <div className="font-semibold text-slate-900 dark:text-white">
                <span className="font-bold text-orange-600 dark:text-orange-400">25</span> de 25 questões (100%)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                <Brain className="w-3.5 h-3.5 text-orange-500" />
                <span>Dimensão Principal</span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white truncate">
                {isTiedPredominance
                  ? 'Predominância Compartilhada'
                  : DIMENSIONS_METADATA[predominant[0]].name}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* GRÁFICO OFICIAL DO PERFIL MENTAL (DESTAQUE CENTRAL) */}
        {/* ========================================================== */}
        <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-none print-card print-break-inside-avoid">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <div className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">
              Representação Visual Obrigatória
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white print-text-dark">
              Gráfico Original do Perfil Mental
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Distribuição dos 4 perfis fundamentais nos vértices diagonais e das 4 combinações intermediárias derivadas, projetados sobre a escala de 0 a 100%.
            </p>
          </div>

          <MentalProfileChart results={results} theme={theme} />
        </section>

        {/* ========================================================== */}
        {/* 5.2 VISÃO GERAL DO PERFIL */}
        {/* ========================================================== */}
        <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-none print-card print-break-inside-avoid">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white print-text-dark">
              5.2. Visão Geral do Perfil
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 print-text-dark leading-relaxed">
            {renderOverviewText()}
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ranking.map((item) => {
              const meta = DIMENSIONS_METADATA[item.dimension];
              return (
                <div
                  key={item.dimension}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{meta.name}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: meta.color }}
                    />
                  </div>
                  <div className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {item.percentage.toFixed(1)}%
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                    <span>{item.count} pts</span>
                    <span className="font-semibold">{item.rank}º lugar</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================== */}
        {/* 5.3 RESULTADO DAS QUATRO DIMENSÕES */}
        {/* ========================================================== */}
        <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-none print-card print-break-inside-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Layers className="w-4 h-4" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white print-text-dark">
              5.3. Resultado das Quatro Dimensões
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ranking.map((item) => {
              const meta = DIMENSIONS_METADATA[item.dimension];
              return (
                <div
                  key={item.dimension}
                  className="rounded-xl border p-5 bg-slate-50/70 dark:bg-slate-950/50 flex flex-col justify-between"
                  style={{ borderColor: `${meta.color}50` }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-800/60">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-sm text-white shadow-xs"
                          style={{ backgroundColor: meta.color }}
                        >
                          {meta.key}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-base">{meta.name}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {meta.discTag}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">{meta.position}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                          {item.percentage.toFixed(1)}%
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {item.count} respostas ({item.rank}º)
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {meta.description}
                    </p>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400 font-semibold">Características:</span>{' '}
                        <span className="text-slate-800 dark:text-slate-300">{meta.keywords.join(', ')}.</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400 font-semibold">Preferência Cognitiva:</span>{' '}
                        <span className="text-slate-800 dark:text-slate-300">{meta.cognitiveStyle}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400 font-semibold">Análise de Problemas:</span>{' '}
                        <span className="text-slate-800 dark:text-slate-300">{meta.problemSolving}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400 font-semibold">Tomada de Decisões:</span>{' '}
                        <span className="text-slate-800 dark:text-slate-300">{meta.decisionMaking}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================== */}
        {/* 5.4 ANÁLISE DA DIMENSÃO PREDOMINANTE */}
        {/* ========================================================== */}
        <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-none print-card print-break-inside-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white print-text-dark">
                5.4. Análise da Dimensão Predominante
              </h2>
              <div className="text-xs text-orange-600 dark:text-orange-400 font-semibold">
                {isTiedPredominance
                  ? 'Predominância Compartilhada'
                  : `${DIMENSIONS_METADATA[predominant[0]].name} (${percentages[predominant[0]].toFixed(1)}%)`}
              </div>
            </div>
          </div>

          {predominant.map((dimKey) => {
            const meta = DIMENSIONS_METADATA[dimKey];
            const app = PROFESSIONAL_APPLICATIONS[dimKey];

            return (
              <div key={dimKey} className="space-y-5 mb-6 last:mb-0">
                {isTiedPredominance && (
                  <div className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
                    Dimensão {meta.name} ({percentages[dimKey].toFixed(1)}%)
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                    <div className="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-orange-500" />
                      <span>Como Tende a Pensar e Organizar Ideias</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{meta.cognitiveStyle} {meta.problemSolving}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                    <div className="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-orange-500" />
                      <span>Percepção Ambiental e Tomada de Decisões</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{meta.decisionMaking}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                    <div className="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
                      <Target className="w-4 h-4 text-orange-500" />
                      <span>O Que Valoriza e Tende a Priorizar</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{meta.workStyle}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80">
                    <div className="font-bold text-slate-900 dark:text-white text-sm mb-1.5 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-orange-500" />
                      <span>Contribuição Profissional e Reação a Mudanças</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{app.changeManagement} {app.projectParticipation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ========================================================== */}
        {/* 5.5 ANÁLISE DA DIMENSÃO SECUNDÁRIA */}
        {/* ========================================================== */}
        <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-none print-card print-break-inside-avoid">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white print-text-dark">
                5.5. Análise da Dimensão Secundária
              </h2>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                {secondary.length > 0
                  ? `${DIMENSIONS_METADATA[secondary[0]].name} (${percentages[secondary[0]].toFixed(1)}%)`
                  : 'Ausente (Distribuição concentrada em predominância compartilhada)'}
              </div>
            </div>
          </div>

          {secondary.length > 0 ? (
            secondary.map((secKey) => {
              const meta = DIMENSIONS_METADATA[secKey];
              const primKey = predominant[0];
              const primMeta = DIMENSIONS_METADATA[primKey];
              const pairKey = `${primKey}-${secKey}`;
              const synergy = PROFILE_SYNERGIES[pairKey];

              return (
                <div key={secKey} className="space-y-4">
                  {synergy && (
                    <div className="p-4 rounded-xl bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                          Arquétipo Combinado
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          {primKey} + {secKey}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
                        {synergy.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-2">
                        {synergy.combinationConcept}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                        {synergy.synergyDescription}
                      </p>
                      <div className="text-xs text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-lg border border-orange-100 dark:border-orange-900/40">
                        <strong className="text-orange-600 dark:text-orange-400">Vantagem no ambiente de trabalho:</strong> {synergy.workplaceAdvantage}
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
                    <p>
                      A dimensão <strong className="text-slate-900 dark:text-white">{meta.name}</strong> atua como a principal fonte de equilíbrio para a tendência dominante de <strong className="text-slate-900 dark:text-white">{primMeta.name}</strong>. Enquanto a predominância define o impulso inicial de pensamento e ação, a dimensão secundária modula suas respostas em situações complexas.
                    </p>
                    <p>
                      Na prática, a combinação entre {primMeta.name} e {meta.name} confere ao participante uma capacidade ampliada de {meta.cognitiveStyle.toLowerCase()} sem abrir mão de suas forças nativas, enriquecendo sua versatilidade no ambiente de trabalho.
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Devido à predominância compartilhada entre as dimensões líderes com pontuações idênticas, ambas atuam em paridade de influência, operando como forças simultâneas no perfil.
            </p>
          )}
        </section>

        {/* ========================================================== */}
        {/* 5.6 ANÁLISE DAS DIMENSÕES MENOS EXPRESSIVAS */}
        {/* ========================================================== */}
        <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-none print-card print-break-inside-avoid">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white print-text-dark">
                5.6. Análise das Dimensões Menos Expressivas
              </h2>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Tendências Menos Espontâneas (3ª e 4ª posições)
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed mb-5">
            <strong>Princípio de Rigor Ético e Científico:</strong> Pontuações inferiores não indicam defeito, inaptidão ou ausência de competência. Elas apenas representam estilos que não constituem a primeira escolha espontânea do participante, exigindo maior esforço deliberado e gasto energético consciente quando convocados.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ranking.slice(2).map((item) => {
              const meta = DIMENSIONS_METADATA[item.dimension];
              return (
                <div key={item.dimension} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{meta.name}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">{item.percentage.toFixed(1)}% ({item.rank}º)</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-400">Natureza da menor expressão:</strong> Atividades que demandam {meta.keywords.slice(0, 3).join(', ').toLowerCase()} tendem a ser desempenhadas com menor espontaneidade ou podem ser postergadas quando há liberdade de escolha.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-400">Ponto de atenção:</strong> Em projetos multidisciplinares, é recomendado apoiar-se em processos estruturados ou em colegas com facilidade natural nesta área para complementar o desempenho global.
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================== */}
        {/* 5.7 ANÁLISE DAS QUATRO COMBINAÇÕES */}
        {/* ========================================================== */}
        <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-none print-card print-break-inside-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white print-text-dark">
                5.7. Análise das Quatro Combinações Intermediárias
              </h2>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Indicadores derivados calculados pela média das dimensões adjacentes
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['anterior', 'direito', 'posterior', 'esquerdo'] as const).map((combKey) => {
              const meta = COMBINATIONS_METADATA[combKey];
              const value = combinations[combKey];

              return (
                <div key={combKey} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full inline-block shadow-xs"
                          style={{ backgroundColor: meta.color }}
                        />
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{meta.positionLabel}</div>
                      </div>
                      <span
                        className="text-base font-extrabold tabular-nums"
                        style={{ color: meta.color }}
                      >
                        {value.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                      Posição no gráfico: {meta.graphPosition} · Média ({meta.components.join(' + ')})
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                      {meta.description}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-2 border-t border-slate-200 dark:border-slate-800/60">
                    {meta.characteristics}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================== */}
        {/* 5.8 FORÇAS E DESAFIOS (COM CONTRAPONTOS) */}
        {/* ========================================================== */}
        <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-none print-card print-break-inside-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white print-text-dark">
                5.8. Forças e Desafios (Análise com Contrapontos)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Toda força comportamental apresenta um potencial contraponto quando exercida em excesso ou fora de contexto.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {predominant.map((dimKey) => {
              const matrix = FORCES_CHALLENGES_MATRIX[dimKey];
              const meta = DIMENSIONS_METADATA[dimKey];

              return (
                <div key={dimKey} className="space-y-3">
                  <div className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                    Eixo {meta.name} (Predominante)
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {matrix.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div>
                          <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>Força Principal</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">{item.force}</p>
                        </div>

                        <div>
                          <div className="font-bold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>Possível Contraponto</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">{item.counterpoint}</p>
                        </div>

                        <div>
                          <div className="font-bold text-sky-700 dark:text-sky-400 mb-1 flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                            <span>Oportunidade</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">{item.developmentTip}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================== */}
        {/* 5.9 APLICAÇÃO PROFISSIONAL */}
        {/* ========================================================== */}
        <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-none print-card print-break-inside-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white print-text-dark">
                5.9. Aplicação Profissional
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Diretrizes de atuação e estilo de contribuição em equipes de trabalho.
              </p>
            </div>
          </div>

          {predominant.map((dimKey) => {
            const app = PROFESSIONAL_APPLICATIONS[dimKey];
            const meta = DIMENSIONS_METADATA[dimKey];

            return (
              <div key={dimKey} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-1.5">Execução de Atividades</div>
                  <p className="text-slate-700 dark:text-slate-300">{app.activityExecution}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-1.5">Estilo de Organização</div>
                  <p className="text-slate-700 dark:text-slate-300">{app.organizationPreference}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-1.5">Comunicação e Expressão</div>
                  <p className="text-slate-700 dark:text-slate-300">{app.communicationStyle}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-1.5">Participação em Projetos</div>
                  <p className="text-slate-700 dark:text-slate-300">{app.projectParticipation}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-1.5">Relacionamento com Colegas</div>
                  <p className="text-slate-700 dark:text-slate-300">{app.peerRelationships}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white mb-1.5">Gestão de Mudanças</div>
                  <p className="text-slate-700 dark:text-slate-300">{app.changeManagement}</p>
                </div>
              </div>
            );
          })}

          <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800/60 text-[11px] text-slate-600 dark:text-slate-400">
            <strong>Nota metodológica:</strong> Este instrumento não deve ser utilizado isoladamente para definir cargos, posições hierárquicas ou delimitar competências individuais. Trata-se de um mapa de tendências de dominância cerebral para autoconhecimento e desenvolvimento contínuo.
          </div>
        </section>

        {/* ========================================================== */}
        {/* 5.10 PLANO PRÁTICO DE DESENVOLVIMENTO */}
        {/* ========================================================== */}
        <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-none print-card print-break-inside-avoid">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white print-text-dark">
                5.10. Plano de Desenvolvimento Individual
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Orientações práticas para ampliar a flexibilidade cognitiva entre os quatro estilos de pensamento.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-orange-600 dark:text-orange-400 text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>O Que Fortalecer</span>
              </div>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li>Consolidar sua vantagem espontânea em {DIMENSIONS_METADATA[predominant[0]].name}, reconhecendo seu valor único nas tomadas de decisão.</li>
                <li>Utilizar seus talentos predominantes para apoiar a equipe em momentos críticos de projeto.</li>
                <li>Manter a autoconsciência de seu estilo nas interações diárias.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-orange-600 dark:text-orange-400 text-sm mb-2 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                <span>O Que Equilibrar</span>
              </div>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li>Prevenir excessos da tendência líder que possam gerar atritos ou rigidez com perfis complementares.</li>
                <li>Exercitar ativamente a escuta de perspectivas diferentes da sua antes de bater o martelo.</li>
                <li>Buscar momentos intencionais de pausa para avaliar o impacto global de suas ações.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-orange-600 dark:text-orange-400 text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                <span>Quais Comportamentos Observar</span>
              </div>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li>Monitorar suas reações automáticas em reuniões sob estresse ou prazos curtos.</li>
                <li>Identificar se há resistência espontânea quando convocado a agir fora de seu quadrante preferido.</li>
                <li>Observar se o canal de comunicação utilizado atende às necessidades dos interlocutores.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-orange-600 dark:text-orange-400 text-sm mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span>Como Exercitar a Flexibilidade Cognitiva</span>
              </div>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 list-disc list-inside">
                <li>Praticar intencionalmente tarefas ligadas aos quadrantes de menor pontuação ({ranking[2].name} e {ranking[3].name}).</li>
                <li>Alternar conscientemente entre foco no processo, nas metas, na criatividade e nas pessoas.</li>
                <li>Celebrar a diversidade de perfis em seu time como um ecossistema complementar de alta performance.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Rodapé do Relatório */}
      <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-500">
        <div>Assessment COMET — Plataforma Integrada de Diagnóstico Comportamental</div>
        <div className="mt-1 text-[11px] text-slate-400 dark:text-slate-600">
          Instrumento Perfil Mental · 25 Questões Obrigatórias · Apuração Determinística
        </div>
      </div>
    </div>
  );
};
