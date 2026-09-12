// Lógica do app DISC: navegação entre telas, estado do quiz, cálculo do
// score e renderização do gráfico. Depende dos dados globais definidos em
// data.js (QUESTION_BLOCKS, DISC_FACTORS, PURE_PROFILES, COMBINED_PROFILES).

const STORAGE_KEY = 'disc-quiz-progress-v1';
const TOTAL_BLOCKS = QUESTION_BLOCKS.length;
const FACTOR_PRIORITY = ['D', 'I', 'S', 'C'];
const FADE_MS = 240;
const AUTO_ADVANCE_MS = 200;

const app = document.getElementById('app');

const state = {
  blockIndex: 0,
  answers: [], // { mais: 'D'|'I'|'S'|'C', menos: ... }[]
};

// ---------- Transição entre telas (fade + leve deslocamento) ----------

function paint(buildScreen) {
  if (app.childElementCount === 0) {
    buildScreen();
    requestAnimationFrame(() => app.classList.add('is-visible'));
    return;
  }
  app.classList.remove('is-visible');
  window.setTimeout(() => {
    buildScreen();
    void app.offsetWidth; // força reflow pra reiniciar a transição
    app.classList.add('is-visible');
  }, FADE_MS);
}

// ---------- Armazenamento seguro (localStorage pode estar bloqueado) ----------

const safeStorage = {
  get() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  },
  set(data) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      // Storage bloqueado (modo privado, cookies desabilitados, etc.) — o
      // quiz continua funcionando normalmente em memória.
    }
  },
  clear() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      // Sem problema — não havia nada persistido de qualquer forma.
    }
  },
};

function saveProgress() {
  safeStorage.set({ blockIndex: state.blockIndex, answers: state.answers });
}

function isValidProgress(saved) {
  return (
    saved &&
    Array.isArray(saved.answers) &&
    typeof saved.blockIndex === 'number' &&
    saved.blockIndex > 0 &&
    saved.blockIndex < TOTAL_BLOCKS &&
    saved.answers.length === saved.blockIndex
  );
}

// ---------- Cálculo de score ----------

function computeRawScores(answers) {
  const scores = { D: 0, I: 0, S: 0, C: 0 };
  answers.forEach((a) => {
    scores[a.mais] += 1;
    scores[a.menos] -= 1;
  });
  return scores;
}

function normalizeScores(raw) {
  const values = Object.values(raw);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const percentages = {};
  Object.keys(raw).forEach((factor) => {
    percentages[factor] = range === 0 ? 50 : Math.round(((raw[factor] - min) / range) * 100);
  });
  return percentages;
}

function getDominantAndSecondary(raw) {
  const sorted = Object.keys(raw).sort((a, b) => {
    if (raw[b] !== raw[a]) return raw[b] - raw[a];
    return FACTOR_PRIORITY.indexOf(a) - FACTOR_PRIORITY.indexOf(b);
  });
  return [sorted[0], sorted[1]];
}

function resolveProfile(raw) {
  const [dominant, secondary] = getDominantAndSecondary(raw);
  if (raw[dominant] === raw[secondary]) {
    return { factor: dominant, profile: PURE_PROFILES[dominant] };
  }
  const key = dominant + secondary;
  return { factor: dominant, secondary, profile: COMBINED_PROFILES[key] };
}

// ---------- Compartilhar resultado ----------

function buildShareText(profile, comboLabel, percentages) {
  return [
    `Meu resultado no teste DISC: ${profile.archetype}`,
    comboLabel,
    `D: ${percentages.D}% · I: ${percentages.I}% · S: ${percentages.S}% · C: ${percentages.C}%`,
  ].join('\n');
}

async function shareResult(text, button) {
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Meu resultado no teste DISC', text });
      return;
    } catch (err) {
      if (err && err.name === 'AbortError') return;
      // Se o compartilhamento nativo falhar por outro motivo, cai nos
      // fallbacks abaixo em vez de deixar o clique sem efeito.
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = 'Copiado!';
      setTimeout(() => {
        button.textContent = original;
      }, 2000);
      return;
    } catch (err) {
      // Segue pro fallback final.
    }
  }

  window.prompt('Copie seu resultado:', text);
}

// ---------- Telas ----------

function renderHome() {
  paint(() => {
    const saved = safeStorage.get();
    const showResume = isValidProgress(saved);

    const factorCard = (letter, name, description) => `
      <div class="factor-card">
        <div class="factor-card-head">
          <span class="factor-letter" style="color: var(--factor-${letter.toLowerCase()})">${letter}</span>
          <span class="factor-name">${name}</span>
        </div>
        <p class="factor-desc">${description}</p>
      </div>
    `;

    app.innerHTML = `
      ${
        showResume
          ? `
        <div class="resume-banner no-print">
          <div>
            <div class="resume-banner-title">Você tem um teste em andamento</div>
            <div class="resume-banner-sub">Parou no bloco ${saved.blockIndex} de ${TOTAL_BLOCKS}.</div>
          </div>
          <div class="resume-banner-actions">
            <button type="button" class="btn btn-ghost" id="restart-btn">Recomeçar</button>
            <button type="button" class="btn btn-primary" id="resume-btn">Continuar</button>
          </div>
        </div>
      `
          : ''
      }

      <p class="eyebrow">Autoconhecimento em 10 minutos</p>
      <h1 class="hero-title">Como você age, decide e se relaciona</h1>
      <p class="hero-lead">
        O DISC classifica tendências de comportamento em quatro fatores. Ele
        não mede inteligência, valores ou competência técnica — mostra
        <em>como</em> você tende a agir no dia a dia.
      </p>

      <div class="cta-row no-print">
        <button type="button" class="btn btn-primary btn-lg" id="start-btn">Começar avaliação</button>
        <span class="cta-caption">${TOTAL_BLOCKS} blocos · sem cadastro · nada sai do seu navegador</span>
      </div>

      <div class="hr-fade section-divider"></div>

      <h2 class="section-label">Os quatro fatores</h2>
      <div class="factor-grid">
        ${factorCard('D', 'Dominância', DISC_FACTORS.D.short)}
        ${factorCard('I', 'Influência', DISC_FACTORS.I.short)}
        ${factorCard('S', 'Estabilidade', DISC_FACTORS.S.short)}
        ${factorCard('C', 'Conformidade', DISC_FACTORS.C.short)}
      </div>

      <h2 class="section-label">Como funciona</h2>
      <div class="steps-list">
        <div class="step">
          <span class="step-number">01</span>
          <p class="step-text">Em cada bloco você vê quatro frases. Marque a que <strong>mais</strong> se parece com você e a que <strong>menos</strong> se parece.</p>
        </div>
        <div class="step">
          <span class="step-number">02</span>
          <p class="step-text">Não existe resposta certa. Responda pensando em como você realmente costuma agir, não em como gostaria de agir.</p>
        </div>
        <div class="step">
          <span class="step-number">03</span>
          <p class="step-text">No fim você recebe seu perfil, o gráfico dos quatro fatores e um diagnóstico de desenvolvimento — pronto para imprimir ou salvar em PDF.</p>
        </div>
      </div>
    `;

    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        state.blockIndex = 0;
        state.answers = [];
        safeStorage.clear();
        renderQuiz();
      });
    }

    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        state.blockIndex = saved.blockIndex;
        state.answers = saved.answers;
        renderQuiz();
      });
    }

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        safeStorage.clear();
        state.blockIndex = 0;
        state.answers = [];
        renderHome();
      });
    }
  });
}

function renderQuiz(initialAnswer) {
  paint(() => {
    const block = QUESTION_BLOCKS[state.blockIndex];
    const current = {
      mais: initialAnswer?.mais ?? null,
      menos: initialAnswer?.menos ?? null,
    };
    const isFirstBlock = state.blockIndex === 0;
    const isLastBlock = state.blockIndex + 1 >= TOTAL_BLOCKS;
    const percentDone = Math.round((state.blockIndex / TOTAL_BLOCKS) * 100);
    let autoAdvanceTimer = null;

    app.innerHTML = `
      <div class="quiz-topline">
        <span class="section-label" style="margin: 0">Bloco ${state.blockIndex + 1} de ${TOTAL_BLOCKS}</span>
        <span class="quiz-percent">${percentDone}% concluído</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" id="progress-fill" style="width: ${percentDone}%"></div>
      </div>

      <h2 class="quiz-question">Qual frase mais e qual menos combina com você?</h2>
      <p class="quiz-hint">Uma escolha em cada coluna. A mesma frase não pode ser as duas.</p>

      <div class="quiz-rows">
        ${block
          .map(
            (item, i) => `
          <div class="quiz-row" data-row="${i}">
            <span class="quiz-row-text">${item.text}</span>
            <div class="quiz-row-actions">
              <button type="button" class="pill pill-mais" data-kind="mais" data-factor="${item.factor}" aria-label="Mais parecido comigo: ${item.text}" aria-pressed="false">Mais</button>
              <button type="button" class="pill pill-menos" data-kind="menos" data-factor="${item.factor}" aria-label="Menos parecido comigo: ${item.text}" aria-pressed="false">Menos</button>
            </div>
          </div>
        `
          )
          .join('')}
      </div>

      <div class="quiz-nav no-print">
        <button type="button" class="btn btn-ghost" id="back-btn" ${isFirstBlock ? 'disabled' : ''}>Voltar</button>
        <div class="quiz-nav-secondary">
          <button type="button" class="btn btn-ghost" id="restart-quiz-btn">Reiniciar</button>
          <button type="button" class="btn btn-primary btn-lg" id="next-btn" disabled>${isLastBlock ? 'Ver resultado' : 'Próximo'}</button>
        </div>
      </div>
    `;

    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const rows = Array.from(app.querySelectorAll('.quiz-row'));

    function refreshRowsUI() {
      rows.forEach((row, i) => {
        const item = block[i];
        const isActive = current.mais === item.factor || current.menos === item.factor;
        row.classList.toggle('is-active', isActive);

        const maisBtn = row.querySelector('.pill-mais');
        const menosBtn = row.querySelector('.pill-menos');

        const maisSelected = current.mais === item.factor;
        const menosSelected = current.menos === item.factor;
        maisBtn.classList.toggle('is-selected', maisSelected);
        menosBtn.classList.toggle('is-selected', menosSelected);
        maisBtn.setAttribute('aria-pressed', String(maisSelected));
        menosBtn.setAttribute('aria-pressed', String(menosSelected));
        maisBtn.disabled = current.menos === item.factor;
        menosBtn.disabled = current.mais === item.factor;
      });
      nextBtn.disabled = !(current.mais && current.menos);
    }
    refreshRowsUI();

    function pick(kind, factor) {
      if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
      }
      const other = kind === 'mais' ? 'menos' : 'mais';
      if (current[kind] === factor) {
        current[kind] = null;
      } else {
        if (current[other] === factor) current[other] = null;
        current[kind] = factor;
      }
      refreshRowsUI();
      if (current.mais && current.menos) {
        autoAdvanceTimer = setTimeout(goNext, AUTO_ADVANCE_MS);
      }
    }

    app.querySelectorAll('.pill').forEach((btn) => {
      btn.addEventListener('click', () => {
        pick(btn.dataset.kind, btn.dataset.factor);
      });
    });

    function goNext() {
      if (!current.mais || !current.menos) return;
      state.answers.push({ mais: current.mais, menos: current.menos });
      state.blockIndex += 1;

      if (state.blockIndex >= TOTAL_BLOCKS) {
        safeStorage.clear();
        renderResult();
      } else {
        saveProgress();
        renderQuiz();
      }
    }
    nextBtn.addEventListener('click', goNext);

    backBtn.addEventListener('click', () => {
      if (state.blockIndex === 0) return;
      if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
      const previousAnswer = state.answers.pop();
      state.blockIndex -= 1;
      saveProgress();
      renderQuiz(previousAnswer);
    });

    restartQuizBtn.addEventListener('click', () => {
      const confirmed = window.confirm(
        'Tem certeza que deseja reiniciar o teste? Suas respostas serão perdidas.'
      );
      if (!confirmed) return;
      if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
      state.blockIndex = 0;
      state.answers = [];
      safeStorage.clear();
      renderHome();
    });
  });
}

function renderResult() {
  paint(() => {
    const raw = computeRawScores(state.answers);
    const percentages = normalizeScores(raw);
    const resolved = resolveProfile(raw);
    const { profile } = resolved;
    const comboLabel = resolved.secondary
      ? `Bifatorial ${resolved.factor}${resolved.secondary} — ${DISC_FACTORS[resolved.factor].name} dominante, ${DISC_FACTORS[resolved.secondary].name} secundária`
      : `Perfil puro ${resolved.factor} — ${DISC_FACTORS[resolved.factor].name}`;

    const bars = ['D', 'I', 'S', 'C']
      .map((f) => {
        const pct = percentages[f];
        const color = `var(--factor-${f.toLowerCase()})`;
        return `
          <div class="bar-row">
            <span class="bar-letter" style="color: ${color}">${f}</span>
            <span class="bar-track"><span class="bar-fill" style="width: ${Math.max(pct, 2)}%; background: ${color}"></span></span>
            <span class="bar-pct">${pct}%</span>
          </div>
        `;
      })
      .join('');

    app.innerHTML = `
      <p class="eyebrow">Seu relatório DISC</p>
      <h1 class="result-title">${profile.archetype}</h1>
      <p class="result-combo">${comboLabel}</p>

      <div class="result-bars">${bars}</div>

      <p class="narrative">${profile.narrative}</p>

      <h2 class="section-label">Diagnóstico de desenvolvimento</h2>
      <div class="dev-list">
        ${profile.development
          .map(
            (item) => `
          <div class="dev-item">
            <span class="dev-marker"></span>
            <p class="dev-text">${item}</p>
          </div>
        `
          )
          .join('')}
      </div>

      <div class="result-actions no-print">
        <button type="button" class="btn btn-ghost" id="restart-btn">Refazer teste</button>
        <button type="button" class="btn btn-ghost" id="share-btn">Compartilhar resultado</button>
        <button type="button" class="btn btn-primary" id="print-btn">Imprimir / salvar em PDF</button>
      </div>
    `;

    document.getElementById('restart-btn').addEventListener('click', () => {
      state.blockIndex = 0;
      state.answers = [];
      safeStorage.clear();
      renderHome();
    });

    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', () => {
      const shareText = buildShareText(profile, comboLabel, percentages);
      shareResult(shareText, shareBtn);
    });

    document.getElementById('print-btn').addEventListener('click', () => {
      window.print();
    });
  });
}

// ---------- Inicialização ----------

function init() {
  renderHome();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
