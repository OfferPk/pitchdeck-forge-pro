/**
 * PitchDeck Forge Pro - Core Deck Engine & Investor Readiness Scorer
 * (c) 2026 PitchDeck Forge Pro. All rights reserved.
 */

(function(global) {
  'use strict';

  function escapeHtml(text) {
    if (!text) return '';
    return String(text).replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m]));
  }

  class InvestorReadinessScorer {
    static evaluate(deckData) {
      let score = 0;
      const checklist = [];

      // 1. Basic Identity
      if (deckData.companyName && deckData.tagline) {
        score += 15;
        checklist.push({ item: 'Company Identity & Clear One-Line Pitch', passed: true });
      } else {
        checklist.push({ item: 'Company Identity & Clear One-Line Pitch', passed: false, hint: 'Define crisp company name and 1-line elevator pitch.' });
      }

      // 2. Problem & Solution
      if (deckData.problem && deckData.solution) {
        score += 20;
        checklist.push({ item: 'Problem-Solution Clarity', passed: true });
      } else {
        checklist.push({ item: 'Problem-Solution Clarity', passed: false, hint: 'State customer pain point and your unique breakthrough.' });
      }

      // 3. Market Size (TAM/SAM/SOM)
      if (deckData.tam && deckData.som) {
        score += 15;
        checklist.push({ item: 'Quantified Market Opportunity (TAM/SOM)', passed: true });
      } else {
        checklist.push({ item: 'Quantified Market Opportunity (TAM/SOM)', passed: false, hint: 'Add bottom-up TAM and serviceable obtainable SOM figures.' });
      }

      // 4. Business Model & Unit Economics
      if (deckData.businessModel && (deckData.arpu || deckData.pricing)) {
        score += 15;
        checklist.push({ item: 'Monetization Mechanics & Unit Economics', passed: true });
      } else {
        checklist.push({ item: 'Monetization Mechanics & Unit Economics', passed: false, hint: 'Specify revenue streams, pricing tiers, and ARPU.' });
      }

      // 5. Traction & Validation
      if (deckData.traction) {
        score += 15;
        checklist.push({ item: 'Traction Metrics or Validation Proof', passed: true });
      } else {
        checklist.push({ item: 'Traction Metrics or Validation Proof', passed: false, hint: 'Include MRR, pilot partners, waitlist volume, or growth rate.' });
      }

      // 6. The Financial Ask
      if (deckData.targetRaise && deckData.runwayMonths) {
        score += 20;
        checklist.push({ item: 'Explicit Funding Target & Runway Horizon', passed: true });
      } else {
        checklist.push({ item: 'Explicit Funding Target & Runway Horizon', passed: false, hint: 'State exact capital requirement and runway duration (e.g. $1.5M for 18mo).' });
      }

      return {
        score: Math.min(100, score),
        rating: score >= 85 ? 'INVESTOR READY' : score >= 60 ? 'NEEDS POLISH' : 'EARLY DRAFT',
        color: score >= 85 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444',
        checklist: checklist
      };
    }
  }

  function generate1PagerHTML(data) {
    const evaluation = InvestorReadinessScorer.evaluate(data);

    return `
      <div class="pdf-1pager-sheet">
        <header class="pdf-1p-header">
          <div>
            <h1 class="pdf-1p-title">${escapeHtml(data.companyName || 'Startup Name')}</h1>
            <p class="pdf-1p-tagline">${escapeHtml(data.tagline || 'Revolutionizing the industry with AI')}</p>
          </div>
          <div class="pdf-1p-meta">
            <span class="pdf-badge">${escapeHtml(data.stage || 'Seed')} &bull; ${escapeHtml(data.jurisdiction || 'Delaware, USA')}</span>
            <div style="margin-top:4px; font-weight:700; color:#2563eb;">${escapeHtml(data.website || 'https://startup.io')}</div>
          </div>
        </header>

        <div class="pdf-1p-grid-2">
          <div class="pdf-1p-card">
            <h3>THE PROBLEM</h3>
            <p>${escapeHtml(data.problem || 'Painful manual workflows costing businesses billions.')}</p>
          </div>
          <div class="pdf-1p-card highlight">
            <h3>THE SOLUTION</h3>
            <p>${escapeHtml(data.solution || 'Automated autonomous cloud architecture.')}</p>
          </div>
        </div>

        <div class="pdf-1p-metrics-row">
          <div class="pdf-metric-box">
            <span class="m-lbl">Total Addressable Market</span>
            <span class="m-val">${escapeHtml(data.tam || '$24B')}</span>
          </div>
          <div class="pdf-metric-box">
            <span class="m-lbl">Serviceable Market</span>
            <span class="m-val">${escapeHtml(data.som || '$3.2B')}</span>
          </div>
          <div class="pdf-metric-box">
            <span class="m-lbl">Key Unit Metric</span>
            <span class="m-val">${escapeHtml(data.arpu || '$450/mo')}</span>
          </div>
          <div class="pdf-metric-box">
            <span class="m-lbl">Target Raise</span>
            <span class="m-val accent">${escapeHtml(data.targetRaise || '$1.5M')}</span>
          </div>
        </div>

        <div class="pdf-1p-grid-2">
          <div class="pdf-1p-card">
            <h3>TRACTION &amp; VALIDATION</h3>
            <p>${escapeHtml(data.traction || '$35k MRR, 18 enterprise pilots in pipeline, 32% MoM growth.')}</p>
          </div>
          <div class="pdf-1p-card">
            <h3>BUSINESS MODEL &amp; PRICING</h3>
            <p>${escapeHtml(data.businessModel || 'B2B annual SaaS subscriptions + volume usage tier.')}</p>
          </div>
        </div>

        <div class="pdf-1p-grid-2">
          <div class="pdf-1p-card">
            <h3>COMPETITIVE MOAT</h3>
            <p>${escapeHtml(data.moat || 'Proprietary fine-tuned models and high switching barriers.')}</p>
          </div>
          <div class="pdf-1p-card">
            <h3>THE ASK &amp; USE OF FUNDS</h3>
            <p>Raising <b>${escapeHtml(data.targetRaise || '$1.5M')}</b> for <b>${escapeHtml(data.runwayMonths || '18')} months</b> runway: 60% R&amp;D/Engineering, 25% Go-to-Market, 15% Operations.</p>
          </div>
        </div>

        <footer class="pdf-1p-footer">
          <span>Founders: <b>${escapeHtml(data.founders || 'Jane Doe (CEO, Ex-Stripe), John Smith (CTO, PhD AI)')}</b></span>
          <span style="font-size:11px; color:#64748b;">Investor Score: <b style="color:${evaluation.color};">${evaluation.score}/100 (${evaluation.rating})</b></span>
        </footer>
      </div>
    `;
  }

  // Export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { InvestorReadinessScorer, generate1PagerHTML };
  } else {
    global.InvestorReadinessScorer = InvestorReadinessScorer;
    global.generate1PagerHTML = generate1PagerHTML;
  }
})(typeof window !== 'undefined' ? window : this);
