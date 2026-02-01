# Reliability HQ Products — Development Brief

## Mission
Create actual, usable RCM templates and tools that we can sell as digital products.

## Products to Create

### 1. RCM FMEA Template Pack (Priority: HIGH)
**Format:** Excel (.xlsx) with multiple sheets
**Price point:** £79

**Contents:**
- FMEA Worksheet (main analysis sheet)
- Equipment Function List template
- Failure Mode library (common examples)
- Instructions sheet

**Requirements:**
- Professional formatting with brand colours
- SAE JA1011 compliant structure
- Columns: Function, Functional Failure, Failure Mode, Failure Effect, Consequence, Recommended Action
- Dropdown lists where appropriate
- Print-friendly layout
- Include example data for one piece of equipment

---

### 2. Criticality Analysis Calculator (Priority: HIGH)
**Format:** Excel (.xlsx)
**Price point:** £49

**Contents:**
- Criticality Matrix (customisable weighting)
- Equipment Input sheet
- Auto-calculated criticality scores
- Visual output (chart/ranking)

**Requirements:**
- Safety, Environmental, Production, Cost criteria (adjustable weights)
- 1-5 scoring scale with clear definitions
- Automatic ranking output
- Dashboard view with top 10 critical assets

---

### 3. RCM Decision Diagram Worksheet (Priority: MEDIUM)
**Format:** Excel (.xlsx) or PDF with fillable fields
**Price point:** £29

**Contents:**
- Standard RCM decision logic tree
- Worksheet to document decisions for each failure mode
- Reference guide for each decision branch

**Requirements:**
- Follow Moubray's RCM II decision diagram exactly
- Clear Yes/No paths
- Task category outputs (Scheduled Restoration, Scheduled Discard, On-Condition, etc.)

---

### 4. RCM Starter Bundle (Priority: HIGH)
**Format:** ZIP containing multiple files
**Price point:** £149

**Contents:**
- All three products above
- RCM Analysis Checklist (PDF)
- Quick Start Guide (PDF)
- Example completed analysis (reference)

---

### 5. FREE Lead Magnet: RCM Checklist (Priority: HIGH)
**Format:** PDF
**Price:** Free (email gate)

**Contents:**
- Pre-analysis checklist (what to prepare before facilitation)
- One-page RCM overview/refresher
- Branded, professional design

**Purpose:** Email list building

---

## Design Requirements

### Excel Templates
- Header row: Deep Teal (#0D6E6E) background, white text
- Alternating row colours: White / Light Grey (#E9ECEF)
- Accent colour for totals/highlights: Industrial Amber (#E67E22)
- Footer: "© 2026 Reliability HQ | reliabilityhq.com"
- Protection: Lock structure but allow data entry
- Include "Instructions" sheet in each workbook

### PDFs
- Use brand colours and Inter/Source Sans Pro fonts
- Include logo placeholder area
- Professional, clean layout
- Contact: hello@reliabilityhq.com

---

## Technical Notes

### RCM Methodology Reference
All products must align with:
- SAE JA1011 (RCM standard)
- Moubray's RCM II methodology

### FMEA Column Structure (Standard)
1. Item/Equipment
2. Function (what it does, with performance standard)
3. Functional Failure (how function can fail)
4. Failure Mode (what causes the functional failure)
5. Failure Effect (what happens when it fails)
6. Failure Consequence (Safety/Environmental/Operational/Non-operational)
7. Recommended Task
8. Task Interval
9. Responsibility

---

## Deliverables
1. Each product as a ready-to-sell file in `/projects/reliability-hq/products/`
2. Preview images/screenshots for website
3. Product descriptions for each (can use from website content doc)

---

## Quality Criteria
- A working reliability engineer should be able to download and use immediately
- No placeholder text left in templates
- All formulas tested and working
- Professional appearance (would you pay for this? It should look like yes)
