# PitchDeck Forge Pro (v1.0.0)

### Startup Investor Teaser, 1-Pager Executive Summary & Pitch Deck Studio

PitchDeck Forge Pro is an offline-first fundraising studio, executive 1-pager tear sheet builder, and interactive 10-slide pitch presentation platform for founders, startup accelerators, and advisors across US, UK, UAE, and global tech hubs.

---

## Key Features

- **Dual Presentation Modes**:  
  - **1-Page Executive Tear Sheet**: High-density single-page summary formatted with clean `@media print` CSS rules for instant board-ready PDF generation.  
  - **10-Slide Deck Presenter**: 16:9 cinematic presentation view with full keyboard navigation (Left/Right arrow keys, Spacebar).  
- **Investor Readiness Scorer (0–100%)**: Real-time evaluation of deck completeness against 6 essential fundraising criteria (Problem-Solution clarity, TAM/SOM quantification, Unit Economics, Traction proof, Defensibility Moat, and Capital Ask).  
- **100% Client-Side Privacy**: Runs completely in the browser with zero cloud server dependencies, protecting pre-launch metrics, confidential cap tables, and proprietary tech architectures.  
- **Curated Startup Archetypes**: Pre-configured with institutional-grade data for B2B GenAI Platforms (\$2.5M Seed), UAE Regulated FinTech (\$3.0M Pre-Series A), and UK ClimateTech Logistics (£1.2M Seed).  
- **Standalone Python CLI Tool**: Automated pitch completeness validator, investor scoring auditor, and batch HTML exporter.

---

## Directory Structure

2026-09-29-PitchDeck-Forge-Pro/

├── source-code/

│   ├── index.html                   \# Visual studio interface & presentation canvas

│   ├── css/

│   │   └── pitchdeck.css            \# Studio styling, 1-pager layout & 16:9 deck styles

│   ├── js/

│   │   ├── deck-engine.js           \# Pitch data structure, scoring & 1-pager HTML generator

│   │   ├── deck-presenter.js        \# Interactive 10-slide presentation renderer

│   │   └── app.js                   \# Application state binder & exporter

│   └── templates/

│       ├── b2b-genai-agent-platform.json \# US Delaware C-Corp Seed (\$2.5M) preset

│       ├── uae-fintech-crossborder.json \# UAE DIFC Pre-Series A (\$3.0M) preset

│       └── uk-climatetech-logistics.json \# UK London Seed EIS (£1.2M) preset

├── build/

│   ├── pitchdeck-cli.py             \# Standalone Python CLI pitch auditor & HTML exporter

│   └── pitchdeck-forge-pro-v1.0.0.zip \# Complete production distribution bundle

├── documentation/

│   ├── ARCHITECTURE.md              \# Technical design & investor readiness specification

│   ├── USER\_GUIDE.md                \# Operating guide & fundraising deck manual

│   └── MONETIZATION\_AND\_MARKETING\_PLAYBOOK.md \# Agency pricing & commercial strategy

├── screenshots/

│   ├── onepager-preview.svg         \# High-resolution vector preview of 1-pager

│   └── studio-preview.svg           \# High-resolution vector preview of studio

└── README.md                        \# Master repository documentation

---

## Quick Start

### 1\. Launch the Visual Studio

Open `source-code/index.html` in your web browser. No local web server or package installation required.

### 2\. Using the Automation CLI

\# Validate pitch deck schema

python3 build/pitchdeck-cli.py \--input source-code/templates/b2b-genai-agent-platform.json \--validate

\# Evaluate investor readiness score

python3 build/pitchdeck-cli.py \--input source-code/templates/b2b-genai-agent-platform.json \--score

\# Export standalone HTML 1-pager tear sheet and JSON manifest

python3 build/pitchdeck-cli.py \\

  \--input source-code/templates/b2b-genai-agent-platform.json \\

  \--output-1pager onepager.html \\

  \--output-json deck-manifest.json

---

## Specifications

- **Slide Aspect Ratio**: 16:9 Cinematic Widescreen  
- **Browser Compatibility**: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+  
- **CLI Requirements**: Python 3.8+ (Zero third-party package dependencies)  
- **License**: MIT / Dual Commercial License