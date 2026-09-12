# AGENTS.md — Teste DISC

Guia para quem (humano ou agente de IA) for evoluir este projeto.

## Visão geral

Frontend **stateless** de avaliação comportamental DISC (Dominância, Influência,
Estabilidade, Conformidade). Não existe backend, banco de dados, nem envio de
dados a servidor algum — tudo é calculado e exibido no navegador. A única
persistência é o progresso do quiz em `localStorage`, só para o usuário não
perder respostas se fechar a aba sem querer (ver `app.js`).

**Stack:** HTML/CSS/JS puro, sem framework de aplicação e sem build step.
O visual segue o design system **Nocturne** (tema escuro, tipografia Inter,
acento roxo-azulado) — só CSS próprio em `styles.css`, sem biblioteca de
componentes. A única dependência externa é a fonte Inter via Google Fonts
(`index.html`), que degrada de forma graciosa para a fonte do sistema caso
não carregue — nenhuma funcionalidade depende dela.

## Estrutura dos arquivos

- `index.html` — casca da página: cabeçalho persistente (`.app-header`, fixo
  nas 3 telas) + `<main id="app">`, onde o conteúdo de cada tela é montado
  via JS. Carrega a fonte Inter e o `styles.css`.
- `styles.css` — tokens do Nocturne (`--color-*`, `--font-*`, `--space-*`,
  `--radius-*`, `--shadow-*`), cores dos 4 fatores DISC (`--factor-d/i/s/c`,
  em OKLCH), classes de componente (`.btn`, `.pill`, `.card`-like surfaces),
  layout responsivo e estilos de impressão (`@media print`, que força uma
  paleta clara para não gastar tinta).
- `data.js` — todo o conteúdo textual: os 24 blocos de perguntas
  (`QUESTION_BLOCKS`), as descrições curtas dos fatores (`DISC_FACTORS`), os
  4 perfis puros (`PURE_PROFILES`) e as 12 combinações bifatoriais ordenadas
  (`COMBINED_PROFILES`, chave = fator dominante + fator secundário, ex. `SD`).
- `app.js` — toda a lógica: renderização das 3 telas (home, quiz, resultado),
  cálculo do score, persistência em `localStorage`, geração do gráfico SVG.

Não há `package.json` nem etapa de build. O app abre direto pelo
`index.html` ou por qualquer servidor estático (`npx serve`, `python3 -m
http.server`, etc.).

## Como rodar localmente

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`. Abrir o `index.html` direto no
navegador (`file://`) também funciona, mas alguns navegadores restringem
certos recursos (ex.: `localStorage`) em contexto `file://` — prefira um
servidor estático simples ao testar a persistência de progresso.

## Convenções a seguir

- **Não introduzir framework ou bundler.** O app deve continuar abrindo sem
  etapa de build.
- **Manter todo o texto em português (pt-BR).**
- Ao adicionar ou editar blocos de perguntas ou arquétipos em `data.js`,
  siga o formato já existente e mantenha o conteúdo **original** — nunca
  copie texto de relatórios DISC de terceiros (comerciais ou não).
- **Sempre usar os tokens do Nocturne** (`var(--color-*)`, `var(--factor-*)`,
  `var(--space-*)`, `var(--radius-*)`, `var(--shadow-*)`) em vez de cores ou
  medidas fixas. O tema é **escuro por padrão, sem alternância automática**
  para claro (decisão de design ao adotar o Nocturne) — não reintroduzir
  `prefers-color-scheme` sem pedido explícito.
- **Preservar o suporte à impressão** (`@media print` em `styles.css`) ao
  alterar a tela de resultado — botões de ação e navegação devem ter a
  classe `no-print`.
- **Toda leitura/escrita em `localStorage` deve ficar dentro de `safeStorage`**
  (em `app.js`), que já envolve as chamadas em `try/catch`. Nunca chamar
  `localStorage` diretamente em outro lugar do código.
- Botões usam classes (`.btn.btn-primary`, `.btn.btn-ghost`) em vez de um
  componente; para ações de destaque some `.btn-lg`. As seleções "mais"/
  "menos" do quiz são botões `.pill` com estado via classes (`.is-selected`,
  `.is-active` na linha) e `disabled`, não `<input type="radio">`.

## Como validar uma mudança antes de considerar pronta

Não há suíte de testes automatizados persistida no repositório (decisão
consciente, para manter o projeto enxuto). Ao mexer no código, valide
manualmente — ou com o MCP do Playwright, se disponível no seu ambiente —
percorrendo:

1. Fluxo completo: home → 24 blocos → resultado.
2. Casos de borda do quiz: não dá pra avançar sem marcar "mais" e "menos";
   não dá pra marcar o mesmo item como "mais" e "menos" ao mesmo tempo.
3. Persistência: responder alguns blocos, recarregar a página, confirmar
   que aparece a opção de continuar; concluir o teste e confirmar que o
   `localStorage` foi limpo.
4. Impressão: abrir o preview de impressão na tela de resultado e conferir
   que botões e navegação somem e que a paleta clara de impressão é aplicada.
5. Responsividade em viewport mobile.

## O que evitar

- Adicionar chamadas de rede ou qualquer backend — quebraria o caráter
  stateless que é o requisito central do projeto.
- Remover o fallback de `try/catch` em torno do `localStorage`.
- Copiar texto de relatórios DISC de outras ferramentas/sites — todo o
  conteúdo de `data.js` deve ser original.
- Adicionar build tooling (bundler, transpiler, framework de app) sem uma
  razão explícita — o projeto foi desenhado pra continuar simples.
