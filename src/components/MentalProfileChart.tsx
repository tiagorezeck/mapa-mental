/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScoreSummary } from '../types/perfilMental';

interface MentalProfileChartProps {
  results: ScoreSummary;
  className?: string;
  theme?: 'light' | 'dark';
}

export const MentalProfileChart: React.FC<MentalProfileChartProps> = ({
  results,
  className = '',
  theme = 'dark'
}) => {
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const isDark = theme === 'dark';
  const cx = 400;
  const cy = 400;
  const maxRadius = 190;
  const cos45 = Math.cos(Math.PI / 4); // ~0.707107

  const pT = Math.min(Math.max(results.percentages.T, 0), 100);
  const pL = Math.min(Math.max(results.percentages.L, 0), 100);
  const pE = Math.min(Math.max(results.percentages.E, 0), 100);
  const pR = Math.min(Math.max(results.percentages.R, 0), 100);

  // Coordenadas calculadas nas 4 diagonais com base no raio do radar:
  // T = Superior Esquerdo (x-, y-) -> Vermelho / Dominante
  const xT = cx - (pT / 100) * maxRadius * cos45;
  const yT = cy - (pT / 100) * maxRadius * cos45;

  // L = Superior Direito (x+, y-) -> Amarelo / Influente
  const xL = cx + (pL / 100) * maxRadius * cos45;
  const yL = cy - (pL / 100) * maxRadius * cos45;

  // R = Inferior Direito (x+, y+) -> Verde / Estável
  const xR = cx + (pR / 100) * maxRadius * cos45;
  const yR = cy + (pR / 100) * maxRadius * cos45;

  // E = Inferior Esquerdo (x-, y+) -> Azul / Conforme
  const xE = cx - (pE / 100) * maxRadius * cos45;
  const yE = cy + (pE / 100) * maxRadius * cos45;

  // Círculos de escala concêntricos (20, 40, 60, 80, 100)
  const scales = [20, 40, 60, 80, 100];

  // Cores dinâmicas de acordo com o tema
  const circleOuterFill = isDark ? '#090d16' : '#ffffff';
  const circleInnerFill = isDark ? '#0f172a' : '#f8fafc';
  const circleDefaultStroke = isDark ? '#1e293b' : '#e2e8f0';
  const circleValueText = isDark ? '#ffffff' : '#0f172a';
  const circleSubtext = isDark ? '#94a3b8' : '#475569';
  const circlePtsText = isDark ? '#64748b' : '#64748b';
  const gridStroke = isDark ? '#334155' : '#cbd5e1';
  const gridBgUrl = isDark ? 'url(#gridBgDark)' : 'url(#gridBgLight)';
  const scaleTextFill = isDark ? '#94a3b8' : '#475569';
  const centerOriginFill = isDark ? '#cbd5e1' : '#475569';

  // Posições aproximadas dos círculos (o mais perto possível do disco do gráfico)
  // Diagonais (T, L, R, E) a 184px do centro em X e Y (~260px de distância radial)
  // Cardinais (Anterior, Direito, Posterior, Esquerdo) a 250px do centro
  const diagOffset = 184;
  const cardDist = 250;

  // Formatação com 1 casa decimal quando não inteiro
  const formatPct = (val: number) => {
    return Number.isInteger(val) ? `${val}%` : `${val.toFixed(1)}%`;
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="60 60 680 680"
        className="w-full h-auto max-w-[620px]"
        style={{
          filter: isDark
            ? 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.45))'
            : 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.08))'
        }}
      >
        <defs>
          {/* Recorte circular para fixar a imagem anatômica do cérebro dentro do disco central */}
          <clipPath id="radarBrainCircleClip">
            <circle cx={cx} cy={cy} r={maxRadius} />
          </clipPath>

          {/* Gradiente do Polígono da Predominância */}
          <radialGradient id="polyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.62" />
            <stop offset="65%" stopColor="#ea580c" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#c2410c" stopOpacity="0.18" />
          </radialGradient>

          {/* Gradiente de Fundo do Radar Modo Escuro */}
          <radialGradient id="gridBgDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#0f172a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.99" />
          </radialGradient>

          {/* Gradiente de Fundo do Radar Modo Claro */}
          <radialGradient id="gridBgLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="85%" stopColor="#f8fafc" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.95" />
          </radialGradient>

          {/* Filtros de Glow */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Brilhos volumétricos sutis nos 4 quadrantes para harmonizar as cores DISC */}
          <radialGradient id="quadGlowT" cx="25%" cy="25%" r="60%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={isDark ? '0.24' : '0.18'} />
            <stop offset="70%" stopColor="#ef4444" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="quadGlowL" cx="75%" cy="25%" r="60%">
            <stop offset="0%" stopColor="#eab308" stopOpacity={isDark ? '0.26' : '0.2'} />
            <stop offset="70%" stopColor="#eab308" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="quadGlowE" cx="25%" cy="75%" r="60%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={isDark ? '0.24' : '0.18'} />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="quadGlowR" cx="75%" cy="75%" r="60%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={isDark ? '0.24' : '0.18'} />
            <stop offset="70%" stopColor="#22c55e" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ============================================================ */}
        {/* 1. DISCO BASE DO RADAR CENTRAL                               */}
        {/* ============================================================ */}
        <circle cx={cx} cy={cy} r={maxRadius} fill={gridBgUrl} stroke={gridStroke} strokeWidth="1.5" />

        {/* ============================================================ */}
        {/* 2. IMAGEM ANEXADA DO CÉREBRO DENTRO DO CÍRCULO, POR BAIXO   */}
        {/* ============================================================ */}
        <g clipPath="url(#radarBrainCircleClip)" className="pointer-events-none select-none">
          <image
            href="/assets/aistudio/image_4d2ae4f2.png"
            x={cx - maxRadius}
            y={cy - maxRadius}
            width={maxRadius * 2}
            height={maxRadius * 2}
            preserveAspectRatio="xMidYMid meet"
            style={{
              filter: isDark
                ? 'invert(0.92) contrast(1.15) brightness(0.85)'
                : 'contrast(1.05) brightness(0.97)',
              opacity: isDark ? 0.38 : 0.44
            }}
          />

          {/* Brilhos suaves nos 4 quadrantes para diferenciar as áreas do DISC */}
          <circle cx={cx} cy={cy} r={maxRadius} fill="url(#quadGlowT)" />
          <circle cx={cx} cy={cy} r={maxRadius} fill="url(#quadGlowL)" />
          <circle cx={cx} cy={cy} r={maxRadius} fill="url(#quadGlowE)" />
          <circle cx={cx} cy={cy} r={maxRadius} fill="url(#quadGlowR)" />
        </g>

        {/* ============================================================ */}
        {/* 3. ESCALAS E LINHAS CONCÊNTRICAS (20, 40, 60, 80, 100)      */}
        {/* ============================================================ */}
        {scales.map((val) => {
          const r = (val / 100) * maxRadius;
          return (
            <g key={val}>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={val === 100 ? (isDark ? '#475569' : '#94a3b8') : (isDark ? '#334155' : '#cbd5e1')}
                strokeWidth={val === 100 ? '1.5' : '1'}
                strokeDasharray={val === 100 ? 'none' : '3 3'}
                strokeOpacity={isDark ? 0.75 : 0.85}
              />
              <text
                x={cx + 4}
                y={cy - r + 11}
                fill={scaleTextFill}
                fontSize="9"
                fontWeight="600"
                fontFamily="DM Sans, monospace"
                className="select-none"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* ============================================================ */}
        {/* 4. EIXOS ORTOGONAIS COM CORES SOMADAS (INTERMEDIÁRIAS)       */}
        {/* ============================================================ */}
        {/* Eixo Vertical Superior: Anterior T+L (Laranja) */}
        <line x1={cx} y1={cy} x2={cx} y2={cy - cardDist + 48} stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Eixo Horizontal Direito: Direito L+R (Verde-Lima) */}
        <line x1={cx} y1={cy} x2={cx + cardDist - 48} y2={cy} stroke="#84cc16" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Eixo Vertical Inferior: Posterior E+R (Turquesa) */}
        <line x1={cx} y1={cy} x2={cx} y2={cy + cardDist - 48} stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Eixo Horizontal Esquerdo: Esquerdo T+E (Roxo) */}
        <line x1={cx} y1={cy} x2={cx - cardDist + 48} y2={cy} stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* ============================================================ */}
        {/* 5. AS 4 LINHAS DIAGONAIS PRINCIPAIS (CORES DISC)             */}
        {/* ============================================================ */}
        {/* Diagonal Superior Esquerda: T — Tarefa (Vermelho) */}
        <line
          x1={cx}
          y1={cy}
          x2={cx - maxRadius * cos45}
          y2={cy - maxRadius * cos45}
          stroke="#ef4444"
          strokeWidth="2"
          strokeOpacity="0.9"
        />
        {/* Diagonal Superior Direita: L — Liberdade (Amarelo) */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + maxRadius * cos45}
          y2={cy - maxRadius * cos45}
          stroke="#eab308"
          strokeWidth="2"
          strokeOpacity="0.9"
        />
        {/* Diagonal Inferior Direita: R — Relacionamento (Verde) */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + maxRadius * cos45}
          y2={cy + maxRadius * cos45}
          stroke="#22c55e"
          strokeWidth="2"
          strokeOpacity="0.9"
        />
        {/* Diagonal Inferior Esquerda: E — Estrutura (Azul) */}
        <line
          x1={cx}
          y1={cy}
          x2={cx - maxRadius * cos45}
          y2={cy + maxRadius * cos45}
          stroke="#3b82f6"
          strokeWidth="2"
          strokeOpacity="0.9"
        />

        {/* Linhas curtas de conexão entre os círculos de informação e o radar */}
        <line x1={cx - diagOffset} y1={cy - diagOffset} x2={cx - maxRadius * cos45} y2={cy - maxRadius * cos45} stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.5" />
        <line x1={cx + diagOffset} y1={cy - diagOffset} x2={cx + maxRadius * cos45} y2={cy - maxRadius * cos45} stroke="#eab308" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.5" />
        <line x1={cx + diagOffset} y1={cy + diagOffset} x2={cx + maxRadius * cos45} y2={cy + maxRadius * cos45} stroke="#22c55e" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.5" />
        <line x1={cx - diagOffset} y1={cy + diagOffset} x2={cx - maxRadius * cos45} y2={cy + maxRadius * cos45} stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="2 2" strokeOpacity="0.5" />

        {/* ============================================================ */}
        {/* 6. POLÍGONO DA DISTRIBUIÇÃO DAS 4 TENDÊNCIAS                 */}
        {/* Sentido horário: T (Sup Esq) -> L (Sup Dir) -> R (Inf Dir) -> E (Inf Esq) */}
        {/* ============================================================ */}
        <polygon
          points={`${xT},${yT} ${xL},${yL} ${xR},${yR} ${xE},${yE}`}
          fill="url(#polyGrad)"
          stroke="#f97316"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* Marcadores em cada vértice do polígono com pulsos e cores DISC */}
        {/* T — Tarefa (Vermelho) */}
        <g className="transition-all duration-700 ease-out">
          <circle cx={xT} cy={yT} r="8" fill="#ef4444" fillOpacity="0.3" filter="url(#glow)" />
          <circle cx={xT} cy={yT} r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* L — Liberdade (Amarelo) */}
        <g className="transition-all duration-700 ease-out">
          <circle cx={xL} cy={yL} r="8" fill="#eab308" fillOpacity="0.3" filter="url(#glow)" />
          <circle cx={xL} cy={yL} r="4.5" fill="#eab308" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* R — Relacionamento (Verde) */}
        <g className="transition-all duration-700 ease-out">
          <circle cx={xR} cy={yR} r="8" fill="#22c55e" fillOpacity="0.3" filter="url(#glow)" />
          <circle cx={xR} cy={yR} r="4.5" fill="#22c55e" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* E — Estrutura (Azul) */}
        <g className="transition-all duration-700 ease-out">
          <circle cx={xE} cy={yE} r="8" fill="#3b82f6" fillOpacity="0.3" filter="url(#glow)" />
          <circle cx={xE} cy={yE} r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* Ponto Central de Origem */}
        <circle cx={cx} cy={cy} r="3" fill={centerOriginFill} />

        {/* ============================================================ */}
        {/* 7. OS 8 CÍRCULOS PERIFÉRICOS (AJUSTADOS PRÓXIMOS AO RADAR)   */}
        {/* ============================================================ */}

        {/* 1. SUPERIOR ESQUERDO: T — Tarefa (Dominante / Vermelho) */}
        <g
          transform={`translate(${cx - diagOffset}, ${cy - diagOffset})`}
          onMouseEnter={() => setActiveHighlight('T')}
          onMouseLeave={() => setActiveHighlight(null)}
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <circle
            cx="0"
            cy="0"
            r="56"
            fill={circleOuterFill}
            stroke={activeHighlight === 'T' ? '#ef4444' : circleDefaultStroke}
            strokeWidth={activeHighlight === 'T' ? '3' : '2'}
            filter={activeHighlight === 'T' ? 'url(#glow)' : undefined}
          />
          <circle cx="0" cy="0" r="50" fill={circleInnerFill} stroke="#ef4444" strokeWidth="1" strokeOpacity="0.45" />
          <text x="0" y="-18" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="800" letterSpacing="0.05em">
            T
          </text>
          <text x="0" y="-3" textAnchor="middle" fill={circleSubtext} fontSize="11" fontWeight="600">
            Tarefa
          </text>
          <text x="0" y="22" textAnchor="middle" fill={circleValueText} fontSize="21" fontWeight="800" fontFamily="DM Sans, sans-serif">
            {formatPct(results.percentages.T)}
          </text>
          <text x="0" y="38" textAnchor="middle" fill={circlePtsText} fontSize="9.5" fontWeight="500">
            {results.counts.T} / 25 pts
          </text>
        </g>

        {/* 2. SUPERIOR CENTRAL: T + L — Anterior (Laranja / Vermelho + Amarelo) */}
        <g
          transform={`translate(${cx}, ${cy - cardDist})`}
          onMouseEnter={() => setActiveHighlight('anterior')}
          onMouseLeave={() => setActiveHighlight(null)}
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <circle
            cx="0"
            cy="0"
            r="48"
            fill={circleOuterFill}
            stroke={activeHighlight === 'anterior' ? '#f97316' : circleDefaultStroke}
            strokeWidth={activeHighlight === 'anterior' ? '3' : '2'}
            filter={activeHighlight === 'anterior' ? 'url(#glow)' : undefined}
          />
          <circle cx="0" cy="0" r="43" fill={circleInnerFill} stroke="#f97316" strokeWidth="1" strokeOpacity="0.45" />
          <text x="0" y="-15" textAnchor="middle" fill="#f97316" fontSize="11" fontWeight="700">
            T + L
          </text>
          <text x="0" y="-1" textAnchor="middle" fill={circleSubtext} fontSize="10" fontWeight="600">
            Anterior
          </text>
          <text x="0" y="20" textAnchor="middle" fill={circleValueText} fontSize="18" fontWeight="800" fontFamily="DM Sans, sans-serif">
            {formatPct(results.combinations.anterior)}
          </text>
          <text x="0" y="34" textAnchor="middle" fill={circlePtsText} fontSize="8.5" fontWeight="500">
            Média T+L
          </text>
        </g>

        {/* 3. SUPERIOR DIREITO: L — Liberdade (Influente / Amarelo) */}
        <g
          transform={`translate(${cx + diagOffset}, ${cy - diagOffset})`}
          onMouseEnter={() => setActiveHighlight('L')}
          onMouseLeave={() => setActiveHighlight(null)}
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <circle
            cx="0"
            cy="0"
            r="56"
            fill={circleOuterFill}
            stroke={activeHighlight === 'L' ? '#eab308' : circleDefaultStroke}
            strokeWidth={activeHighlight === 'L' ? '3' : '2'}
            filter={activeHighlight === 'L' ? 'url(#glow)' : undefined}
          />
          <circle cx="0" cy="0" r="50" fill={circleInnerFill} stroke="#eab308" strokeWidth="1" strokeOpacity="0.45" />
          <text x="0" y="-18" textAnchor="middle" fill="#eab308" fontSize="14" fontWeight="800" letterSpacing="0.05em">
            L
          </text>
          <text x="0" y="-3" textAnchor="middle" fill={circleSubtext} fontSize="11" fontWeight="600">
            Liberdade
          </text>
          <text x="0" y="22" textAnchor="middle" fill={circleValueText} fontSize="21" fontWeight="800" fontFamily="DM Sans, sans-serif">
            {formatPct(results.percentages.L)}
          </text>
          <text x="0" y="38" textAnchor="middle" fill={circlePtsText} fontSize="9.5" fontWeight="500">
            {results.counts.L} / 25 pts
          </text>
        </g>

        {/* 4. CENTRO ESQUERDO: T + E — Esquerdo (Roxo / Vermelho + Azul) */}
        <g
          transform={`translate(${cx - cardDist}, ${cy})`}
          onMouseEnter={() => setActiveHighlight('esquerdo')}
          onMouseLeave={() => setActiveHighlight(null)}
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <circle
            cx="0"
            cy="0"
            r="48"
            fill={circleOuterFill}
            stroke={activeHighlight === 'esquerdo' ? '#8b5cf6' : circleDefaultStroke}
            strokeWidth={activeHighlight === 'esquerdo' ? '3' : '2'}
            filter={activeHighlight === 'esquerdo' ? 'url(#glow)' : undefined}
          />
          <circle cx="0" cy="0" r="43" fill={circleInnerFill} stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.45" />
          <text x="0" y="-15" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700">
            T + E
          </text>
          <text x="0" y="-1" textAnchor="middle" fill={circleSubtext} fontSize="10" fontWeight="600">
            Esquerdo
          </text>
          <text x="0" y="20" textAnchor="middle" fill={circleValueText} fontSize="18" fontWeight="800" fontFamily="DM Sans, sans-serif">
            {formatPct(results.combinations.esquerdo)}
          </text>
          <text x="0" y="34" textAnchor="middle" fill={circlePtsText} fontSize="8.5" fontWeight="500">
            Média T+E
          </text>
        </g>

        {/* 5. CENTRO DIREITO: L + R — Direito (Verde-Lima / Amarelo + Verde) */}
        <g
          transform={`translate(${cx + cardDist}, ${cy})`}
          onMouseEnter={() => setActiveHighlight('direito')}
          onMouseLeave={() => setActiveHighlight(null)}
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <circle
            cx="0"
            cy="0"
            r="48"
            fill={circleOuterFill}
            stroke={activeHighlight === 'direito' ? '#84cc16' : circleDefaultStroke}
            strokeWidth={activeHighlight === 'direito' ? '3' : '2'}
            filter={activeHighlight === 'direito' ? 'url(#glow)' : undefined}
          />
          <circle cx="0" cy="0" r="43" fill={circleInnerFill} stroke="#84cc16" strokeWidth="1" strokeOpacity="0.45" />
          <text x="0" y="-15" textAnchor="middle" fill="#a3e635" fontSize="11" fontWeight="700">
            L + R
          </text>
          <text x="0" y="-1" textAnchor="middle" fill={circleSubtext} fontSize="10" fontWeight="600">
            Direito
          </text>
          <text x="0" y="20" textAnchor="middle" fill={circleValueText} fontSize="18" fontWeight="800" fontFamily="DM Sans, sans-serif">
            {formatPct(results.combinations.direito)}
          </text>
          <text x="0" y="34" textAnchor="middle" fill={circlePtsText} fontSize="8.5" fontWeight="500">
            Média L+R
          </text>
        </g>

        {/* 6. INFERIOR ESQUERDO: E — Estrutura (Conforme / Azul) */}
        <g
          transform={`translate(${cx - diagOffset}, ${cy + diagOffset})`}
          onMouseEnter={() => setActiveHighlight('E')}
          onMouseLeave={() => setActiveHighlight(null)}
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <circle
            cx="0"
            cy="0"
            r="56"
            fill={circleOuterFill}
            stroke={activeHighlight === 'E' ? '#3b82f6' : circleDefaultStroke}
            strokeWidth={activeHighlight === 'E' ? '3' : '2'}
            filter={activeHighlight === 'E' ? 'url(#glow)' : undefined}
          />
          <circle cx="0" cy="0" r="50" fill={circleInnerFill} stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.45" />
          <text x="0" y="-18" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="800" letterSpacing="0.05em">
            E
          </text>
          <text x="0" y="-3" textAnchor="middle" fill={circleSubtext} fontSize="11" fontWeight="600">
            Estrutura
          </text>
          <text x="0" y="22" textAnchor="middle" fill={circleValueText} fontSize="21" fontWeight="800" fontFamily="DM Sans, sans-serif">
            {formatPct(results.percentages.E)}
          </text>
          <text x="0" y="38" textAnchor="middle" fill={circlePtsText} fontSize="9.5" fontWeight="500">
            {results.counts.E} / 25 pts
          </text>
        </g>

        {/* 7. INFERIOR CENTRAL: E + R — Posterior (Turquesa / Azul + Verde) */}
        <g
          transform={`translate(${cx}, ${cy + cardDist})`}
          onMouseEnter={() => setActiveHighlight('posterior')}
          onMouseLeave={() => setActiveHighlight(null)}
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <circle
            cx="0"
            cy="0"
            r="48"
            fill={circleOuterFill}
            stroke={activeHighlight === 'posterior' ? '#06b6d4' : circleDefaultStroke}
            strokeWidth={activeHighlight === 'posterior' ? '3' : '2'}
            filter={activeHighlight === 'posterior' ? 'url(#glow)' : undefined}
          />
          <circle cx="0" cy="0" r="43" fill={circleInnerFill} stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.45" />
          <text x="0" y="-15" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="700">
            E + R
          </text>
          <text x="0" y="-1" textAnchor="middle" fill={circleSubtext} fontSize="10" fontWeight="600">
            Posterior
          </text>
          <text x="0" y="20" textAnchor="middle" fill={circleValueText} fontSize="18" fontWeight="800" fontFamily="DM Sans, sans-serif">
            {formatPct(results.combinations.posterior)}
          </text>
          <text x="0" y="34" textAnchor="middle" fill={circlePtsText} fontSize="8.5" fontWeight="500">
            Média E+R
          </text>
        </g>

        {/* 8. INFERIOR DIREITO: R — Relacionamento (Estável / Verde) */}
        <g
          transform={`translate(${cx + diagOffset}, ${cy + diagOffset})`}
          onMouseEnter={() => setActiveHighlight('R')}
          onMouseLeave={() => setActiveHighlight(null)}
          className="cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <circle
            cx="0"
            cy="0"
            r="56"
            fill={circleOuterFill}
            stroke={activeHighlight === 'R' ? '#22c55e' : circleDefaultStroke}
            strokeWidth={activeHighlight === 'R' ? '3' : '2'}
            filter={activeHighlight === 'R' ? 'url(#glow)' : undefined}
          />
          <circle cx="0" cy="0" r="50" fill={circleInnerFill} stroke="#22c55e" strokeWidth="1" strokeOpacity="0.45" />
          <text x="0" y="-18" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="800" letterSpacing="0.05em">
            R
          </text>
          <text x="0" y="-3" textAnchor="middle" fill={circleSubtext} fontSize="11" fontWeight="600">
            Relacionamento
          </text>
          <text x="0" y="22" textAnchor="middle" fill={circleValueText} fontSize="21" fontWeight="800" fontFamily="DM Sans, sans-serif">
            {formatPct(results.percentages.R)}
          </text>
          <text x="0" y="38" textAnchor="middle" fill={circlePtsText} fontSize="9.5" fontWeight="500">
            {results.counts.R} / 25 pts
          </text>
        </g>
      </svg>

      {/* Legenda de apoio inferior com visão DISC e cromáticas somadas */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">T: Tarefa (D)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">L: Liberdade (I)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">E: Estrutura (C)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">R: Relacionamento (S)</span>
        </span>
      </div>

      <div className="mt-1 flex flex-wrap items-center justify-center gap-x-4 text-[11px] text-slate-500 dark:text-slate-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
          <span>T+L (Anterior: Laranja)</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-lime-500 inline-block" />
          <span>L+R (Direito: Lima)</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
          <span>E+R (Posterior: Turquesa)</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
          <span>T+E (Esquerdo: Roxo)</span>
        </span>
      </div>
    </div>
  );
};
