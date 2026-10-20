# PitchDeck Forge Pro — User Guide & Fundraising Playbook

Welcome to **PitchDeck Forge Pro**, your investor teaser studio, executive 1-pager builder, and slide deck presentation platform.

---

## 1\. Quick Start

### 1.1 Running the Visual Studio

1. Open `source-code/index.html` in your web browser. No web server or node installation is needed.  
2. Select a pre-configured startup archetype from the dropdown (B2B GenAI, UAE Fintech, or UK ClimateTech), or enter your startup's details.  
3. Review your **Investor Readiness Score** in the sidebar. Fix any missing items from the checklist to reach a 100/100 score.  
4. Toggle between:  
   - **1-Page Executive Tear Sheet**: A dense executive summary ready for 1-click PDF printing.  
   - **10-Slide Deck Presenter**: A full 16:9 cinematic presentation view with arrow key navigation.  
5. Click **Print 1-Pager PDF** to generate an executive tear sheet for angel investors and venture funds.

---

## 2\. Using the Automation CLI

PitchDeck Forge Pro includes a standalone command-line tool (`build/pitchdeck-cli.py`) for automated pitch auditing and deck generation:

\# Validate deck JSON schema

python3 build/pitchdeck-cli.py \--input source-code/templates/b2b-genai-agent-platform.json \--validate

\# Audit investor readiness score

python3 build/pitchdeck-cli.py \--input source-code/templates/b2b-genai-agent-platform.json \--score

\# Export standalone HTML 1-pager tear sheet and JSON manifest

python3 build/pitchdeck-cli.py \\

  \--input source-code/templates/b2b-genai-agent-platform.json \\

  \--output-1pager onepager.html \\

  \--output-json deck-manifest.json

---

## 3\. Best Practices for Seed Pitching

1. **Keep the Problem Crisp**: VCs review hundreds of decks per week. Focus on quantified customer pain (hours wasted, money lost).  
2. **Bottom-Up TAM**: Avoid generic "\$1 Trillion" claims; show realistic calculations based on pricing \$\\times\$ total target customers.  
3. **Runway Target**: Aim for 18–24 months of runway to ensure your startup reaches sustainable unit economics or a Series A valuation step-up.