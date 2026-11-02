# Perfil Mental — Assessment COMET | Plano Técnico de Implantação

Plano de arquitetura e implementação para a reprodução integral e fidedigna do instrumento **Perfil Mental** (referência Ned Herrmann adaptada), preservando as 25 questões originais, a apuração determinística, o gráfico visual com 8 círculos e ilustração de fundo, e o relatório individual aprofundado com as 10 seções requeridas.

---

## 1. Estrutura do Questionário

O questionário será implementado com rigor textual e estrutural idêntico ao documento `PERFIL MENTAL_PERGUNTAS.pdf`:

- **25 Questões Obrigatórias**:
  - Questões 1 a 25 apresentadas sequencialmente na ordem original.
  - Cada questão possui exatamente 4 alternativas, cada qual associada a uma letra fixa: **L** (Liberdade), **R** (Relacionamento), **E** (Estrutura) ou **T** (Tarefa).
  - Apenas uma resposta pode ser selecionada por questão.
- **Experiência de Aplicação**:
  - Apresentação de **1 questão por vez** para máximo foco cognitivo.
  - Cartão de questão estilizado na estética dark COMET com botões de alternativa táteis e feedback visual imediato de seleção.
  - Indicador numérico de progresso em tempo real (`Questão X de 25`) acompanhado de barra de progresso visual fluida e mapa de navegação rápida de questões (permitindo saltar ou revisar qualquer item).
  - Controles de navegação: botões **"Anterior"** e **"Próxima"**, preservando o estado de todas as respostas em memória e persistência local contínua.
  - **Bloqueio de Finalização**: a submissão final só é habilitada quando todas as 25 questões estiverem respondidas.
  - **Tela de Revisão/Confirmação Pré-Resultado**: resumo do preenchimento antes da consolidação do teste, evitando cliques acidentais.
  - **Ocultação de Pontuação**: nenhuma pontuação parcial ou letras de perfil são reveladas durante a realização do teste para não induzir viés comportamental.

---

## 2. Algoritmo de Pontuação

Algoritmo puramente matemático, determinístico, auditável e sem interferência de IA na apuração:

```
┌────────────────────────────────────────────────────────┐
│             Respostas Selecionadas (25 itens)          │
└───────────────────────────┬────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
    Total L             Total R             Total E             Total T
   (count L)           (count R)           (count E)           (count T)
        └───────────────────┼───────────────────┘
                            │ Total = 25
                            ▼
              Cálculo dos Percentuais (%)
         Percentual X = (Total X ÷ 25) × 100
             (Soma obrigatória = 100%)
                            │
                            ▼
               Ordenação e Classificação
    1º Predominante │ 2º Secundário │ 3º/4º Menos Expressivos
          (Empates mantidos sem desempate forçado)
```

1. **Pontuação Primária**:
   - Cada resposta soma exatamente 1 ponto para a respectiva dimensão:
     - `Total L = count(respostas == 'L')`
     - `Total R = count(respostas == 'R')`
     - `Total E = count(respostas == 'E')`
     - `Total T = count(respostas == 'T')`
   - Invariante obrigatória: `Total L + Total R + Total E + Total T = 25`.
2. **Conversão em Percentual**:
   - `Percentual L = (Total L / 25) * 100`
   - `Percentual R = (Total R / 25) * 100`
   - `Percentual E = (Total E / 25) * 100`
   - `Percentual T = (Total T / 25) * 100`
   - Invariante obrigatória: `Percentual L + Percentual R + Percentual E + Percentual T = 100.0%`.
3. **Classificação e Empates**:
   - Ordenação decrescente dos percentuais.
   - Identificação da dimensão predominante (maior valor) e secundária (segundo maior valor).
   - Em caso de empate na liderança (ex: L = 32%, T = 32%), o sistema identifica e relata explicitamente **"Predominância Compartilhada"**, sem qualquer desempate arbitrário.

---

## 3. Fórmulas das Quatro Combinações Intermediárias

Conforme a estrutura do gráfico original, as quatro posições intermediárias representam a média aritmética dos quadrantes adjacentes e são expressas como indicadores derivados:

$$\text{Anterior} = \frac{\text{Percentual E} + \text{Percentual L}}{2}$$
$$\text{Direito} = \frac{\text{Percentual L} + \text{Percentual R}}{2}$$
$$\text{Posterior} = \frac{\text{Percentual T} + \text{Percentual R}}{2}$$
$$\text{Esquerdo} = \frac{\text{Percentual E} + \text{Percentual T}}{2}$$

Esses 4 valores são identificados como **médias combinadas**, alimentando os círculos intermediários do gráfico e a seção 5.7 do relatório individual.

---

## 4. Construção do Gráfico (Fidelidade ao Desenho Original)

O componente `MentalProfileChart` reproduz com precisão vetorial (SVG responsivo) a imagem oficial de referência:

```
              [E + L: Anterior]
                 (Sup. Central)
         ┌──────────────▲──────────────┐
[E: Estrutura]          │          [L: Liberdade]
(Sup. Esquerdo)         │          (Sup. Direito)
         \              │              /
          \   ┌─────────┴─────────┐   /
           \  │   Eixos Diagonais │  /
[E + T:     ─┼┤  Escala 0 a 100   ├┼─  [L + R: Direito]
 Esquerdo]  / │  Fundo Cerebral   │ \   (Centro Direito)
(Centro    /  │Polígono Conectado │  \
 Esquerdo)/   └─────────┬─────────┘   \
         /              │              \
[T: Tarefa]             │          [R: Relacionamento]
(Inf. Esquerdo)         │          (Inf. Direito)
         └──────────────▼──────────────┘
              [T + R: Posterior]
                 (Inf. Central)
```

- **Os 8 Círculos Periféricos**:
  1. **Superior Esquerdo**: `E — Estrutura` com badge do percentual `% E`.
  2. **Superior Central**: `E + L — Anterior` com badge da média combinada `% Anterior`.
  3. **Superior Direito**: `L — Liberdade` com badge do percentual `% L`.
  4. **Centro Esquerdo**: `E + T — Esquerdo` com badge da média combinada `% Esquerdo`.
  5. **Centro Direito**: `L + R — Direito` com badge da média combinada `% Direito`.
  6. **Inferior Esquerdo**: `T — Tarefa` com badge do percentual `% T`.
  7. **Inferior Central**: `T + R — Posterior` com badge da média combinada `% Posterior`.
  8. **Inferior Direito**: `R — Relacionamento` com badge do percentual `% R`.
- **Eixos Diagonais e Escala de 0 a 100**:
  - Quatro eixos diagonais partem do centro em direção aos cantos:
    - Superior Esquerdo $\to$ E (Estrutura)
    - Superior Direito $\to$ L (Liberdade)
    - Inferior Esquerdo $\to$ T (Tarefa)
    - Inferior Direito $\to$ R (Relacionamento)
  - Círculos de escala concêntricos demarcados em 20, 40, 60, 80 e 100 com linhas de grade nítidas.
- **Polígono da Distribuição Mental**:
  - Marcadores de dados posicionados com precisão matemática em cada diagonal a uma distância $r = \text{raio\_max} \times (\% / 100)$.
  - Polígono fechado conectando os quatro pontos (E $\to$ L $\to$ R $\to$ T $\to$ E) com preenchimento em gradiente laranja translúcido (`rgba(249, 115, 22, 0.25)`) e contorno vívido laranja COMET (`#F97316`).
- **Ilustração do Cérebro ao Fundo**:
  - Vetorização estilizada de alta definição com os dois hemisférios cerebrais em traços suaves e semitransparentes grafite/ardósia, conferindo profundidade técnica sem poluição visual.

---

## 5. Estrutura do Relatório Individual

O relatório individual conterá as 10 seções especificadas, com profundidade analítica, rigor conceitual e tom de desenvolvimento:

1. **5.1 Identificação do Participante**:
   - Nome completo do participante, data e hora de realização, título oficial do teste, total de questões respondidas (25/25) e status de validação.
2. **5.2 Visão Geral do Perfil**:
   - Introdução executiva interpretativa personalizada com base nos quatro escores e na relação entre eles, sintetizando o estilo de pensar e decidir.
3. **5.3 Resultado das Quatro Dimensões**:
   - Tabela e cartões comparativos para L, R, E e T contendo percentual, quantidade de pontos (0 a 25), ranking, descrição comportamental, características marcantes, preferências cognitivas, análise de problemas e tomada de decisões.
4. **5.4 Análise Aprofundada da Dimensão Predominante**:
   - Detalhamento de como a pessoa pensa, organiza ideias, percebe o ambiente, decide, o que valoriza, prioriza, seu estilo de trabalho, reação a novidades e contribuição no trabalho.
5. **5.5 Análise da Dimensão Secundária**:
   - Efeito sinérgico da segunda dimensão, demonstrando como ela modula ou potencializa a predominante.
6. **5.6 Análise das Dimensões Menos Expressivas**:
   - Tratamento construtivo (não como incapacidade, mas como preferências que exigem esforço deliberado), com pontos de atenção e cuidados interpretativos.
7. **5.7 Análise das Quatro Combinações**:
   - Leitura dos eixos Anterior (E+L), Direito (L+R), Posterior (T+R) e Esquerdo (E+T) no equilíbrio entre visão, planejamento, ação e pessoas.
8. **5.8 Forças e Desafios (com Contrapontos)**:
   - Matriz equilibrada: para cada força essencial, apresentação do seu respectivo contraponto quando em excesso (ex.: alta Estrutura gera previsibilidade, mas em excesso pode gerar rigidez ou aversão a mudanças).
9. **5.9 Aplicação Profissional**:
   - Diretrizes de atuação: execução de rotinas, estilo de comunicação, trabalho em equipe, projetos, resolução de conflitos e resposta a transformações organizacionais.
10. **5.10 Plano Prático de Desenvolvimento**:
    - Recomendações acionáveis: o que fortalecer, o que calibrar, comportamentos a observar e exercícios de flexibilidade cognitiva.
- **Ações de Exportação**:
  - Modo de impressão formatado nativamente com CSS `@media print` otimizado para gerar PDF profissional paginado de página inteira sem quebras indevidas, além de exportação de dados em JSON.

---

## 6. Integração com o Sistema Atual (Assessment COMET)

- **Persistência Segura**:
  - Armazenamento em `localStorage` sob a chave `comet_perfil_mental_records` com isolamento completo para não interferir em outros testes do ecossistema COMET.
  - Guarda: `id`, `participantName`, `completedAt`, `answers` (25 respostas), `scores` (L, R, E, T), `percentages` (L, R, E, T), `combinations` (Anterior, Direito, Posterior, Esquerdo) e metadados de auditoria.
- **Padrão Visual Assessment COMET**:
  - Paleta base: Grafite escuro (`#0B0F17`, `#111827`) e cinza neutro profundo (`#1F2937`).
  - Destaque: Laranja COMET (`#F97316`, `#EA580C`) para ações primárias, destaques no gráfico e indicadores de avanço.
  - Tipografia: *Plus Jakarta Sans* e *DM Sans* para legibilidade refinada, combinada com números tabulares (`tabular-nums`) nas métricas.
  - Ausência de poluição visual, banners falsos ou telemetrias desnecessárias.
- **Painel de Validação e Testes Rápidos**:
  - Modal/Aba de auditoria embutida que permite testar em 1 clique os 6 cenários exigidos:
    - **Cenário A**: 25 L (100% L)
    - **Cenário B**: 25 R (100% R)
    - **Cenário C**: 25 E (100% E)
    - **Cenário D**: 25 T (100% T)
    - **Cenário E**: Distribuição equilibrada (7 L, 6 R, 6 E, 6 T)
    - **Cenário F**: Empate duplo (ex.: 10 L, 10 T, 3 E, 2 R)
    - Validador automatizado que verifica em tempo de execução a soma de 25 pontos, a soma de 100% e as coordenadas do gráfico.

---

## 7. Arquivos a Criar e Modificar

| Arquivo | Finalidade |
|---|---|
| `src/types/perfilMental.ts` | Definições TypeScript das 25 questões, dimensões (L, R, E, T), escores, relatório e histórico. |
| `src/data/perfilMentalQuestions.ts` | As 25 questões originais reproduzidas textualmente com suas respectivas alternativas e letras. |
| `src/data/perfilMentalInterpretations.ts` | Base de conhecimento e matriz interpretativa completa das 4 dimensões, combinações, forças, desafios e plano de desenvolvimento. |
| `src/utils/perfilMentalScoring.ts` | Funções matemáticas determinísticas de apuração, cálculo de médias combinadas, ordenação e motor dos cenários de teste A a F. |
| `src/utils/storage.ts` | Gerenciamento de persistência local, recuperação de avaliações salvas e utilitários de exportação. |
| `src/components/Header.tsx` | Top bar institucional do Assessment COMET com logo, status e alternância de visualizações. |
| `src/components/Questionnaire.tsx` | Interface questão por questão com navegação fluida, preservação de respostas, validação e revisão antes da entrega. |
| `src/components/MentalProfileChart.tsx` | Componente SVG do gráfico original: 8 círculos de resultados, eixos diagonais, escalas concêntricas, ilustração do cérebro ao fundo e polígono conectado. |
| `src/components/IndividualReport.tsx` | Visualização completa do relatório individual com as 10 seções, gráficos, tabelas e suporte a impressão/PDF. |
| `src/components/ValidationModal.tsx` | Painel de validação rápida para os Cenários A a F para teste interativo e auditoria imediata. |
| `src/App.tsx` | Controlador principal de estados da aplicação (Identificação $\to$ Questionário $\to$ Confirmação $\to$ Relatório $\to$ Histórico). |
| `metadata.json` & `index.html` | Atualização do nome e metadados para **Assessment COMET — Perfil Mental**. |

---

## Status e Próximos Passos

O plano contempla 100% dos requisitos solicitados. Aguardando a aprovação do usuário para dar início à codificação no próximo passo.
