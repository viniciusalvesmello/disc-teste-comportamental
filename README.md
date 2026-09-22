# Teste DISC

Avaliação comportamental DISC (Dominância, Influência, Estabilidade,
Conformidade) como um frontend **stateless**: tudo roda no navegador, sem
backend, sem banco de dados e sem cadastro. O único dado salvo é o
progresso do quiz, em `localStorage`, só para não se perder respostas ao
fechar a aba sem querer.

🔗 **Acesse:** [viniciusalvesmello.github.io/disc-teste-comportamental](https://viniciusalvesmello.github.io/disc-teste-comportamental/)

## O que é o DISC

O DISC classifica tendências de comportamento em quatro fatores:

- **D — Dominância:** diretos, competitivos, focados em resultados rápidos.
- **I — Influência:** comunicativos, persuasivos, entusiasmados.
- **S — Estabilidade:** pacientes, calmos, previsíveis.
- **C — Conformidade:** analíticos, detalhistas, organizados.

## Funcionalidades

- Quiz de 24 blocos (4 frases cada) no formato clássico "mais/menos", com
  avanço automático ao completar um bloco.
- Progresso salvo localmente — recarregar a página oferece retomar de onde
  parou.
- Navegação com Voltar/Reiniciar durante o quiz.
- Relatório final com gráfico dos 4 fatores, arquétipo bifatorial
  (fator dominante + secundário) e diagnóstico de desenvolvimento.
- Impressão / exportação em PDF do relatório.
- Compartilhar resultado (Web Share API, com fallback para copiar/colar).
- Transições suaves entre telas, com suporte a `prefers-reduced-motion`.

## Stack

HTML, CSS e JavaScript puros — **sem framework, sem bundler, sem etapa de
build**. O visual segue o design system **Nocturne** (tema escuro,
tipografia Inter, acento roxo-azulado), implementado em CSS próprio.

## Estrutura do projeto

```
├── index.html   # casca da página + cabeçalho persistente
├── styles.css   # tokens de design, componentes, responsivo, impressão
├── data.js      # banco de perguntas e textos dos perfis/arquétipos
├── app.js       # lógica: telas, quiz, cálculo de score, persistência
└── AGENTS.md    # guia de convenções para quem for evoluir o projeto
```

## Rodando localmente

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`. Abrir o `index.html` direto no
navegador também funciona, mas alguns recursos (como o `localStorage`) se
comportam melhor servidos por um servidor estático simples.

## Deploy

O site é publicado via **GitHub Pages**, direto da branch `main` (raiz do
repositório) — sem workflow de build. Qualquer push atualiza o site em
produção em cerca de um minuto.

Veja [AGENTS.md](AGENTS.md) para as convenções do projeto, incluindo o
esquema de cache-busting usado nas tags de `index.html`.
