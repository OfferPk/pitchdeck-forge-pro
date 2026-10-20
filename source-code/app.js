/**
 * PitchDeck Forge Pro - Application Controller & State Manager
 * (c) 2026 PitchDeck Forge Pro. All rights reserved.
 */

document.addEventListener('DOMContentLoaded', () => {
  let state = {
    companyName: 'OmniAgent AI',
    tagline: 'Autonomous Full-Stack Engineering Agents for Enterprise Cloud Operations',
    stage: 'Seed Round',
    jurisdiction: 'State of Delaware, United States',
    website: 'https://omniagent.ai',
    problem: 'Enterprises lose over $120B annually in developer downtime resolving repetitive cloud infrastructure misconfigurations, API breaking changes, and migration bottlenecks. Senior DevOps engineers are scarce and cost $220k+/yr.',
    solution: 'OmniAgent deploys deterministic, sandboxed autonomous AI agents that identify incident root causes, test fixes in isolated staging clusters, and open validated pull requests within 60 seconds of anomaly detection.',
    tam: '$48 Billion',
    som: '$4.5 Billion',
    targetShare: '$85M ARR by Year 3',
    arpu: '$2,500 / month per cluster',
    businessModel: 'Usage-tiered B2B subscription based on active worker nodes and automated PR merge volume.',
    traction: '$42,000 MRR (34% MoM organic growth), 14 Fortune 500 pilots in active staging, 850 developers on waitlist.',
    moat: 'Proprietary deterministic execution graph, patent-pending automated sandbox verifier, zero data exfiltration guarantee.',
    founders: 'Alex Rivera (Ex-Google Brain Tech Lead, Stanford CS PhD) & Priya Patel (Ex-Stripe Infrastructure Director, 2x Founder).',
    targetRaise: '$2,500,000 Seed',
    runwayMonths: 18
  };

  // DOM Elements
  const elPresetSelect = document.getElementById('presetSelect');
  const elCompanyName = document.getElementById('companyName');
  const elTagline = document.getElementById('tagline');
  const elStage = document.getElementById('stage');
  const elJurisdiction = document.getElementById('jurisdiction');
  const elWebsite = document.getElementById('website');

  const elProblem = document.getElementById('problem');
  const elSolution = document.getElementById('solution');
  const elTam = document.getElementById('tam');
  const elSom = document.getElementById('som');
  const elArpu = document.getElementById('arpu');
  const elBusinessModel = document.getElementById('businessModel');
  const elTraction = document.getElementById('traction');
  const elMoat = document.getElementById('moat');
  const elFounders = document.getElementById('founders');
  const elTargetRaise = document.getElementById('targetRaise');
  const elRunwayMonths = document.getElementById('runwayMonths');

  // Preview elements
  const elScoreNum = document.getElementById('scoreNum');
  const elScoreRating = document.getElementById('scoreRating');
  const elChecklistContainer = document.getElementById('checklistContainer');
  const elOnePagerContainer = document.getElementById('onePagerContainer');
  const elDeckContainer = document.getElementById('deckContainer');

  // Tabs
  const tab1Pager = document.getElementById('tab1Pager');
  const tabDeck = document.getElementById('tabDeck');
  const onePagerView = document.getElementById('onePagerView');
  const deckPresenterView = document.getElementById('deckPresenterView');
  const elDeckControls = document.getElementById('deckControls');

  const presenter = new DeckPresenter(elDeckContainer, state);

  tab1Pager.addEventListener('click', () => {
    tab1Pager.classList.add('active');
    tabDeck.classList.remove('active');
    onePagerView.style.display = 'block';
    deckPresenterView.style.display = 'none';
    elDeckControls.style.display = 'none';
  });

  tabDeck.addEventListener('click', () => {
    tabDeck.classList.add('active');
    tab1Pager.classList.remove('active');
    onePagerView.style.display = 'none';
    deckPresenterView.style.display = 'block';
    elDeckControls.style.display = 'flex';
    presenter.render();
  });

  function syncForm() {
    elCompanyName.value = state.companyName;
    elTagline.value = state.tagline;
    elStage.value = state.stage;
    elJurisdiction.value = state.jurisdiction;
    elWebsite.value = state.website;

    elProblem.value = state.problem;
    elSolution.value = state.solution;
    elTam.value = state.tam;
    elSom.value = state.som;
    elArpu.value = state.arpu;
    elBusinessModel.value = state.businessModel;
    elTraction.value = state.traction;
    elMoat.value = state.moat;
    elFounders.value = state.founders;
    elTargetRaise.value = state.targetRaise;
    elRunwayMonths.value = state.runwayMonths;

    updateVisuals();
  }

  function updateVisuals() {
    // 1. Update Readiness Score
    const evalResult = InvestorReadinessScorer.evaluate(state);
    elScoreNum.textContent = `${evalResult.score}/100`;
    elScoreNum.style.color = evalResult.color;
    elScoreRating.textContent = evalResult.rating;
    elScoreRating.style.color = evalResult.color;

    let clHtml = '';
    evalResult.checklist.forEach(item => {
      const icon = item.passed ? '✓' : '✕';
      const col = item.passed ? '#10b981' : '#ef4444';
      clHtml += `
        <div style="font-size:0.75rem; margin-bottom:0.25rem; display:flex; align-items:center; gap:0.4rem;">
          <span style="color:${col}; font-weight:800;">${icon}</span>
          <span style="color:#cbd5e1;">${item.item}</span>
        </div>
      `;
    });
    elChecklistContainer.innerHTML = clHtml;

    // 2. Render 1-Pager
    elOnePagerContainer.innerHTML = generate1PagerHTML(state);

    // 3. Update Slide Deck Presenter
    presenter.setData(state);

    try {
      localStorage.setItem('pitchdeck_state', JSON.stringify(state));
    } catch (e) {}
  }

  // Event Listeners for inputs
  elCompanyName.addEventListener('input', e => { state.companyName = e.target.value; updateVisuals(); });
  elTagline.addEventListener('input', e => { state.tagline = e.target.value; updateVisuals(); });
  elStage.addEventListener('input', e => { state.stage = e.target.value; updateVisuals(); });
  elJurisdiction.addEventListener('input', e => { state.jurisdiction = e.target.value; updateVisuals(); });
  elWebsite.addEventListener('input', e => { state.website = e.target.value; updateVisuals(); });

  elProblem.addEventListener('input', e => { state.problem = e.target.value; updateVisuals(); });
  elSolution.addEventListener('input', e => { state.solution = e.target.value; updateVisuals(); });
  elTam.addEventListener('input', e => { state.tam = e.target.value; updateVisuals(); });
  elSom.addEventListener('input', e => { state.som = e.target.value; updateVisuals(); });
  elArpu.addEventListener('input', e => { state.arpu = e.target.value; updateVisuals(); });
  elBusinessModel.addEventListener('input', e => { state.businessModel = e.target.value; updateVisuals(); });
  elTraction.addEventListener('input', e => { state.traction = e.target.value; updateVisuals(); });
  elMoat.addEventListener('input', e => { state.moat = e.target.value; updateVisuals(); });
  elFounders.addEventListener('input', e => { state.founders = e.target.value; updateVisuals(); });
  elTargetRaise.addEventListener('input', e => { state.targetRaise = e.target.value; updateVisuals(); });
  elRunwayMonths.addEventListener('input', e => { state.runwayMonths = e.target.value; updateVisuals(); });

  // Slide Deck navigation
  document.getElementById('btnPrevSlide').addEventListener('click', () => presenter.prev());
  document.getElementById('btnNextSlide').addEventListener('click', () => presenter.next());

  // Action: Print / Save 1-Pager PDF
  document.getElementById('btnPrint1Pager').addEventListener('click', () => {
    tab1Pager.click();
    window.print();
  });

  // Action: Export JSON
  document.getElementById('btnExportJson').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.companyName.toLowerCase().replace(/\s+/g, '-')}-pitchdeck.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Action: Export Standalone HTML Presentation
  document.getElementById('btnExportHtml').addEventListener('click', () => {
    const slides = presenter.slides;
    const slidesHtml = slides.map((s, idx) => `
      <section class="slide" id="slide-${idx}">
        <div class="header"><span>${s.category}</span><span>Slide ${idx+1} of ${slides.length}</span></div>
        <div class="content">
          <h1>${s.title}</h1>
          <div class="body">${s.content}</div>
        </div>
      </section>
    `).join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${state.companyName} - Investor Pitch Deck</title>
  <style>
    body { margin:0; font-family:-apple-system,sans-serif; background:#070a13; color:#f8fafc; display:flex; flex-direction:column; align-items:center; padding:40px 20px; }
    .slide { width:100%; max-width:860px; aspect-ratio:16/9; background:#0f1626; border:1px solid #243452; border-radius:12px; padding:35px 45px; margin-bottom:30px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; }
    .header { display:flex; justify-content:space-between; font-size:12px; font-weight:800; color:#38bdf8; border-bottom:1px solid #243452; padding-bottom:10px; }
    .content { text-align:center; padding:20px 0; }
    h1 { font-size:32px; font-weight:900; margin-bottom:16px; }
    .deck-metrics-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:15px; margin-top:15px; }
    .deck-m-card { background:#182238; border:1px solid #243452; border-radius:8px; padding:18px; text-align:center; }
    .m-lbl { display:block; font-size:11px; color:#94a3b8; text-transform:uppercase; margin-bottom:5px; }
    .m-val { display:block; font-size:22px; font-weight:900; color:#f8fafc; }
    .m-val.accent { color:#38bdf8; }
  </style>
</head>
<body>
  ${slidesHtml}
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.companyName.toLowerCase().replace(/\s+/g, '-')}-deck.html`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Template Loader
  elPresetSelect.addEventListener('change', async (e) => {
    const val = e.target.value;
    if (!val) return;
    try {
      const res = await fetch(`templates/${val}.json`);
      if (res.ok) {
        state = await res.json();
        syncForm();
      }
    } catch (err) {
      console.warn('Preset load fallback', err);
    }
  });

  // Initialize
  try {
    const cached = localStorage.getItem('pitchdeck_state');
    if (cached) state = JSON.parse(cached);
  } catch (e) {}

  syncForm();
});
