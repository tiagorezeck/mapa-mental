/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppView } from '../types/perfilMental';
import { Sparkles, FileText, History, CheckSquare, PlusCircle, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  hasCompletedAssessment: boolean;
  onOpenValidationModal: () => void;
  onResetTest: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  hasCompletedAssessment,
  onOpenValidationModal,
  onResetTest,
  theme,
  onToggleTheme
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zona 1: Marca COMET */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onNavigate('intro')}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="font-extrabold text-white text-base tracking-wider">C</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                COMET
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-orange-600 dark:text-orange-400 uppercase bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/60 px-1.5 py-0.5 rounded">
                Assessment
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
              Instrumento Perfil Mental
            </div>
          </div>
        </div>

        {/* Zona 2: Links de Navegação */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => onNavigate(hasCompletedAssessment ? 'report' : 'questionnaire')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-2 ${
              currentView === 'questionnaire' || currentView === 'intro'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>{hasCompletedAssessment ? 'Questionário' : 'Avaliação'}</span>
          </button>

          {hasCompletedAssessment && (
            <button
              onClick={() => onNavigate('report')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-2 ${
                currentView === 'report'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <FileText className="w-4 h-4 text-orange-500" />
              <span>Relatório Individual</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('history')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-2 ${
              currentView === 'history'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <History className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Histórico</span>
          </button>

          <button
            onClick={onOpenValidationModal}
            className="px-3 py-1.5 rounded-md text-amber-600 dark:text-amber-400/90 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors whitespace-nowrap flex items-center gap-1.5"
            title="Validar Cenários A a F (Predominâncias L, R, E, T, Equilíbrio e Empate)"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Cenários A–F</span>
          </button>
        </nav>

        {/* Zona 3: Ações (Alternador de Tema e Novo Teste) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center"
            title={theme === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          <button
            onClick={onResetTest}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-orange-500" />
            <span>Novo Teste</span>
          </button>
        </div>
      </div>
    </header>
  );
};
