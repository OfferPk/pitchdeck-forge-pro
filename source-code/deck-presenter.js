/**
 * PitchDeck Forge Pro - Interactive Slide Deck Presenter
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

  class DeckPresenter {
    constructor(containerElement, data) {
      this.container = containerElement;
      this.data = data || {};
      this.currentSlide = 0;
      this.slides = this.buildSlideDeck();
      this.initKeyboard();
    }

    setData(newData) {
      this.data = newData || {};
      this.slides = this.buildSlideDeck();
      this.render();
    }

    buildSlideDeck() {
      const d = this.data;
      return [
        {
          num: 1,
          title: d.companyName || 'Startup Vision',
          category: 'EXECUTIVE OVERVIEW',
          content: `
            <div style="font-size:26px; font-weight:800; color:#38bdf8; margin-bottom:12px;">${escapeHtml(d.tagline || 'Next-Gen Platform')}</div>
            <p style="font-size:16px; color:#cbd5e1; max-width:600px; margin:0 auto 20px auto;">${escapeHtml(d.solution || '')}</p>
            <div style="font-size:13px; color:#94a3b8; font-weight:600;">${escapeHtml(d.stage || 'Seed Stage')} &bull; ${escapeHtml(d.jurisdiction || 'Delaware, USA')}</div>
          `
        },
        {
          num: 2,
          title: 'The Critical Problem',
          category: 'MARKET PAIN POINT',
          content: `
            <div style="font-size:20px; font-weight:700; color:#ef4444; margin-bottom:14px;">Existing Solutions Are Broken &amp; Expensive</div>
            <p style="font-size:16px; color:#e2e8f0; line-height:1.7; max-width:640px; margin:0 auto;">${escapeHtml(d.problem || 'Legacy manual workflows cause massive friction.')}</p>
          `
        },
        {
          num: 3,
          title: 'The Proprietary Solution',
          category: 'CORE VALUE PROPOSITION',
          content: `
            <div style="font-size:20px; font-weight:700; color:#10b981; margin-bottom:14px;">10x Better, Faster &amp; Cost-Effective</div>
            <p style="font-size:16px; color:#e2e8f0; line-height:1.7; max-width:640px; margin:0 auto;">${escapeHtml(d.solution || 'Automated intelligent system.')}</p>
          `
        },
        {
          num: 4,
          title: 'Market Opportunity',
          category: 'TAM / SAM / SOM',
          content: `
            <div class="deck-metrics-grid">
              <div class="deck-m-card"><span class="m-lbl">Total Addressable (TAM)</span><span class="m-val">${escapeHtml(d.tam || '$24B')}</span></div>
              <div class="deck-m-card"><span class="m-lbl">Serviceable Market (SAM)</span><span class="m-val">${escapeHtml(d.som || '$3.2B')}</span></div>
              <div class="deck-m-card"><span class="m-lbl">Target Year-3 Capture</span><span class="m-val accent">${escapeHtml(d.targetShare || '$50M ARR')}</span></div>
            </div>
          `
        },
        {
          num: 5,
          title: 'Business Model & Unit Economics',
          category: 'MONETIZATION MECHANICS',
          content: `
            <p style="font-size:16px; color:#e2e8f0; line-height:1.7; max-width:640px; margin:0 auto 16px auto;">${escapeHtml(d.businessModel || 'Tiered subscription pricing.')}</p>
            <div style="font-size:14px; color:#38bdf8; font-weight:700;">Target Average Revenue Per Unit: ${escapeHtml(d.arpu || '$450/month')}</div>
          `
        },
        {
          num: 6,
          title: 'Traction & Key Milestones',
          category: 'GROWTH VALIDATION',
          content: `
            <div style="font-size:22px; font-weight:800; color:#10b981; margin-bottom:12px;">Proven Product-Market Fit</div>
            <p style="font-size:16px; color:#e2e8f0; line-height:1.7; max-width:640px; margin:0 auto;">${escapeHtml(d.traction || '$35k MRR with 32% MoM compounding growth.')}</p>
          `
        },
        {
          num: 7,
          title: 'Competitive Moat & Defensibility',
          category: 'STRATEGIC ADVANTAGE',
          content: `
            <p style="font-size:16px; color:#e2e8f0; line-height:1.7; max-width:640px; margin:0 auto;">${escapeHtml(d.moat || 'Proprietary fine-tuned AI models and high switching barriers.')}</p>
          `
        },
        {
          num: 8,
          title: 'World-Class Founding Team',
          category: 'OPERATIONAL PEDIGREE',
          content: `
            <p style="font-size:16px; color:#e2e8f0; line-height:1.7; max-width:640px; margin:0 auto;">${escapeHtml(d.founders || 'Experienced enterprise operators and PhD AI researchers.')}</p>
          `
        },
        {
          num: 9,
          title: 'The Investment Ask',
          category: 'CAPITAL ALLOCATION',
          content: `
            <div style="font-size:32px; font-weight:900; color:#38bdf8; margin-bottom:10px;">${escapeHtml(d.targetRaise || '$1.5M Seed Round')}</div>
            <div style="font-size:15px; color:#94a3b8; margin-bottom:16px;">Runway: <b>${escapeHtml(d.runwayMonths || '18')} Months</b> to Cash-Flow Breakeven / Series A</div>
            <div style="font-size:14px; color:#e2e8f0;">60% Engineering &bull; 25% Go-to-Market &bull; 15% Operations</div>
          `
        }
      ];
    }

    initKeyboard() {
      window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'ArrowRight' || e.key === ' ') {
          this.next();
        } else if (e.key === 'ArrowLeft') {
          this.prev();
        }
      });
    }

    next() {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++;
        this.render();
      }
    }

    prev() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.render();
      }
    }

    render() {
      if (!this.container) return;
      const s = this.slides[this.currentSlide];

      this.container.innerHTML = `
        <div class="deck-slide-frame">
          <div class="slide-header">
            <span class="slide-cat">${escapeHtml(s.category)}</span>
            <span class="slide-counter">Slide ${this.currentSlide + 1} of ${this.slides.length}</span>
          </div>
          <div class="slide-main">
            <h2 class="slide-title">${escapeHtml(s.title)}</h2>
            <div class="slide-body">${s.content}</div>
          </div>
          <div class="slide-footer">
            <span>${escapeHtml(this.data.companyName || 'PitchDeck Forge')}</span>
            <span>Use Left / Right Arrows to Navigate</span>
          </div>
        </div>
      `;
    }
  }

  // Export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DeckPresenter };
  } else {
    global.DeckPresenter = DeckPresenter;
  }
})(typeof window !== 'undefined' ? window : this);
