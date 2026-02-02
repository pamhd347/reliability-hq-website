import { Slide } from '@/components/SlideViewer';

// Module 1: Advanced Operating Context - Slide-based content
export const practitionerModule1Slides: Slide[] = [
  {
    id: 1,
    title: "Operating Context Mastery",
    type: 'intro',
    content: `If you've completed the RCM Fundamentals course, you know that operating context establishes the boundaries within which we analyse equipment.

But here's what separates competent practitioners from excellent ones: **the depth and precision with which they define operating context**.

A vague operating context leads to vague analysis. The whole analysis becomes a house built on sand.`
  },
  {
    id: 2,
    title: "The Five Dimensions",
    type: 'keypoint',
    content: `Operating context isn't a single statement—it's multidimensional.

**The Five Dimensions:**
1. Physical Environment
2. Duty Cycle and Loading
3. Process Conditions
4. Performance Requirements
5. Regulatory and Safety Context

Each dimension affects how equipment performs and fails. Miss one, and your analysis has a blind spot.`
  },
  {
    id: 3,
    title: "Dimension 1: Physical Environment",
    type: 'concept',
    content: `Where does this equipment operate?

Consider:
- **Temperature ranges** — Heated building vs. exposed to weather
- **Humidity and moisture** — Coastal salt spray vs. arid conditions
- **Dust and particulates** — Mining vs. clean rooms
- **Vibration** — Near heavy machinery vs. isolated foundations
- **Corrosive atmospheres** — Chemical plants, marine environments

Each factor affects failure modes and rates.`
  },
  {
    id: 4,
    title: "Physical Environment Example",
    type: 'example',
    content: `**Good documentation:**

*"Centrifugal pump transferring cooling water operates outdoors in a coastal petrochemical facility. Ambient temperatures range from -5°C to 35°C. Salt air exposure is constant. Adjacent compressors create baseline vibration of 2mm/s at the pump foundation."*

This tells you exactly what environmental stresses the equipment faces.`
  },
  {
    id: 5,
    title: "Dimension 2: Duty Cycle and Loading",
    type: 'concept',
    content: `How hard does this equipment work, and when?

- **Continuous vs. intermittent** — 24/7 operation vs. 4 hours/day
- **Load profile** — Constant load, variable load, frequent starts/stops
- **Peak demands** — Maximum throughput vs. typical operation
- **Standby equipment** — How often does backup actually run?

A pump running continuously has different wear patterns than one cycling frequently.`
  },
  {
    id: 6,
    title: "Duty Cycle Example",
    type: 'example',
    content: `**Good documentation:**

*"Primary cooling pump operates continuously at 85-95% of rated capacity. Backup pump operates approximately 200 hours per year during primary maintenance or high-demand periods. Pump experiences 2-4 start/stop cycles per month."*

This quantifies the actual operating pattern.`
  },
  {
    id: 7,
    title: "Dimension 3: Process Conditions",
    type: 'concept',
    content: `What's happening to the process fluid or material?

- **Fluid properties** — Temperature, viscosity, specific gravity, corrosivity
- **Contaminants** — Solids, abrasives, chemical contamination
- **Phase changes** — Cavitation risk, flashing, crystallisation
- **Flow regime** — Laminar vs. turbulent, pulsating flow

Process upsets can cause failures that "normal" operation doesn't predict.`
  },
  {
    id: 8,
    title: "Process Conditions Example",
    type: 'example',
    content: `**Good documentation:**

*"Process fluid is demineralised water with <50 ppm suspended solids. Temperature ranges 15-45°C. pH maintained between 7.0-8.5 through chemical treatment. Occasional excursions to pH 6.0 during upset conditions (estimated 5-10 times per year)."*

Note the upset conditions — these matter for failure modes.`
  },
  {
    id: 9,
    title: "Dimension 4: Performance Requirements",
    type: 'concept',
    content: `What must this equipment actually deliver? Be specific.

- **Capacity requirements** — Minimum, typical, maximum
- **Quality standards** — Tolerances, acceptable variations
- **Response times** — How quickly must the system respond?
- **Reliability expectations** — What availability is needed?

Vague requirements = vague analysis.`
  },
  {
    id: 10,
    title: "Performance Requirements Example",
    type: 'example',
    content: `**Good documentation:**

*"System must deliver minimum 450 m³/hr cooling water at 2.5 bar discharge pressure. Temperature rise across heat exchangers not to exceed 8°C. System availability requirement: 99.5% (equivalent to maximum 44 hours unplanned downtime per year)."*

Every number is traceable to an actual operational need.`
  },
  {
    id: 11,
    title: "Dimension 5: Regulatory Context",
    type: 'concept',
    content: `What external requirements constrain operation?

- **Safety regulations** — PSM, COMAH, ATEX
- **Environmental permits** — Discharge limits, emissions
- **Industry standards** — API, ASME, ISO requirements
- **Insurance requirements** — Inspection intervals, testing

Regulatory failures can shut you down even if the equipment still works.`
  },
  {
    id: 12,
    title: "Multiple Operating Modes",
    type: 'keypoint',
    content: `Most equipment doesn't operate in a single mode. Document each distinct mode because **failure modes and consequences differ dramatically**.

Common modes:
- Normal operation
- Startup (often more stressful than steady-state)
- Shutdown
- Standby (different failure modes: corrosion, sticking)
- Emergency operation
- Upset/off-design conditions`
  },
  {
    id: 13,
    title: "Operating Modes Table",
    type: 'example',
    content: `For each mode, document frequency, duration, and key parameters:

**Normal operation** — Continuous, 8,400 hrs/yr, 480 m³/hr
**Startup** — 2-4/month, 15-30 min, surge conditions
**Standby (backup)** — Variable, no rotation, seal face wetted
**High demand** — 5-10/year, 2-8 hrs, motor at 95% FLA
**Emergency shutdown** — <1/year, <1 hr, rapid stop

Each mode has unique stresses and failure risks.`
  },
  {
    id: 14,
    title: "Performance Standards",
    type: 'concept',
    content: `Every function needs a quantified performance standard.

**Elements of a good standard:**
- **Measurable** — Can you verify it?
- **Contextual** — Reflects actual operational needs
- **Achievable** — Realistic given capability
- **Relevant** — Actually matters for performance`
  },
  {
    id: 15,
    title: "Good vs Bad Standards",
    type: 'example',
    content: `**Bad:** "Adequate flow"
**Good:** "Minimum 450 m³/hr"

**Bad:** "Design flow rate of 500 m³/hr"
**Good:** "Minimum 450 m³/hr to maintain heat exchanger outlet below 45°C"

**Bad:** "100% availability"
**Good:** "99.5% availability excluding planned maintenance"

The good examples are specific and tied to actual needs.`
  },
  {
    id: 16,
    title: "Hidden Performance Standards",
    type: 'keypoint',
    content: `Some standards aren't in any document—they're implicit:

- **Containment** — Must not leak more than X litres/hour
- **Safety** — Must not create ignition sources in hazardous areas
- **Environmental** — Must not discharge to environment
- **Stability** — Must not cause water hammer in piping

These are often missed in analyses. Don't assume—document them explicitly.`
  },
  {
    id: 17,
    title: "Boundary Definition",
    type: 'concept',
    content: `Before beginning analysis, define boundaries precisely.

Boundary problems create:
- **Duplicate analysis** — Multiple teams analysing the same components
- **Analysis gaps** — Interfaces nobody owns
- **Confusion** — Whose failure modes are whose?

Use specific reference points, not vague descriptions.`
  },
  {
    id: 18,
    title: "Boundary Examples",
    type: 'example',
    content: `**Physical boundaries:**
- Inlet flange of pump X-1234
- Electrical supply from MCC compartment 3B (breaker outgoing terminals)
- Control signal from DCS output card (terminal block)

**Not boundaries:**
- "The pump system"
- "Everything up to the control room"
- "The mechanical package"`
  },
  {
    id: 19,
    title: "Interface Documentation",
    type: 'concept',
    content: `For each boundary, document:

- **What's on each side** — Equipment and functions
- **Who owns each side** — Which analysis covers it
- **Assumptions about reliability** — What you're counting on

*"Inlet boundary: Suction strainer downstream flange. Assumes strainer maintained per separate analysis, provides <100 micron filtration."*`
  },
  {
    id: 20,
    title: "Expert Tip: Work With Operators",
    type: 'keypoint',
    content: `**Engineers design systems; operators know how they actually behave.**

Spend time in the control room. Watch startup procedures. Ask about "that thing that happens when..."

Operators have invaluable knowledge about:
- What really causes problems
- Workarounds currently in use
- Early warning signs they've learned to spot`
  },
  {
    id: 21,
    title: "Expert Tip: Don't Trust Documents",
    type: 'keypoint',
    content: `**Operating context evolves. Design documents don't.**

That pump designed for 400 m³/hr might now routinely run at 480 m³/hr.

**Document reality, not intention.**

Visit the equipment. Is there a roof leak dripping on the motor? Is access blocked? Is labelling even correct?`
  },
  {
    id: 22,
    title: "Common Mistake: Generic Context",
    type: 'concept',
    content: `**Mistake:** Copying generic context descriptions.

"Standard petrochemical environment" tells you almost nothing.

Every facility is different:
- Your coastal plant has salt air
- Your desert plant has dust and temperature extremes
- Your northern plant has freeze risk

Be specific to YOUR operating reality.`
  },
  {
    id: 23,
    title: "Common Mistake: Forgetting Standby",
    type: 'concept',
    content: `**Mistake:** Ignoring standby equipment in context.

Standby equipment has different failure modes:
- Corrosion (not flushed with fresh fluid)
- Sticking (seals, valves not exercised)
- Battery discharge (controls)
- Contamination (stagnant fluid)

These failures only become evident when you need the equipment to run—the worst possible time.`
  },
  {
    id: 24,
    title: "Operating Context Document",
    type: 'concept',
    content: `Before any analysis, complete an Operating Context Document:

1. **System Identification** — Name, boundaries, equipment list
2. **Process Description** — What it does, how it fits
3. **Operating Modes** — All significant modes with parameters
4. **Environmental Conditions** — Full range of conditions
5. **Performance Requirements** — Quantified standards
6. **Regulatory Context** — Applicable requirements
7. **Maintenance Context** — Current strategy, known issues`
  },
  {
    id: 25,
    title: "Module Summary",
    type: 'summary',
    content: `**Key takeaways:**

- Operating context has **five dimensions** — don't skip any
- Document **all significant operating modes** — not just normal
- Performance standards must be **measurable and relevant**
- Define boundaries **precisely** using physical reference points
- **Visit the equipment** — documents don't tell the whole story

Master this foundation, and your RCM analyses will be built on solid ground.`
  }
];

// Module 2: Mastering Function Statements - Slide-based content
export const practitionerModule2Slides: Slide[] = [
  {
    id: 1,
    title: "The Foundation of Everything",
    type: 'intro',
    content: `If you get functions wrong, everything that follows will be wrong.

Your failure modes will be incomplete. Your consequences will be misjudged. Your maintenance tasks won't quite fit.

This isn't theory—it's the most common root cause of poor RCM analyses.

Let's master this.`
  },
  {
    id: 2,
    title: "Anatomy of a Function Statement",
    type: 'keypoint',
    content: `A function statement has three essential elements:

**1. Verb** — What action the item performs
**2. Object** — What the action is performed upon
**3. Performance Standard** — How well it must be performed

*"To transfer cooling water from the reservoir to the heat exchanger at a minimum flow rate of 500 L/min and maximum pressure of 4 bar"*

Without all three elements, your function is incomplete.`
  },
  {
    id: 3,
    title: "Primary Functions",
    type: 'concept',
    content: `**Primary functions** — The main reason the asset exists. Why did someone spend money buying this equipment?

For a cooling water pump:
*"To transfer cooling water from the reservoir to the heat exchanger at minimum 500 L/min at 2.5 bar discharge pressure"*

For a pressure relief valve:
*"To relieve vessel pressure at 10 bar to prevent overpressurisation"*

**Tip:** If there's no quantified performance standard, it's not complete.`
  },
  {
    id: 4,
    title: "Secondary Functions",
    type: 'concept',
    content: `Additional requirements beyond the primary function—often overlooked but critically important:

- **Containment:** *"Leakage not exceeding 10 ml/hr at mechanical seal"*
- **Structural/support:** *"Support piping without excessive flange stress"*
- **Appearance/hygiene:** *"Surfaces free of product contamination"*
- **Economy:** *"Power consumption not exceeding 18 kW at rated flow"*
- **Environmental:** *"No discharge of process fluid to environment"*
- **Comfort:** *"Noise levels below 85 dB(A) at 1 metre"*`
  },
  {
    id: 5,
    title: "Protective Functions",
    type: 'concept',
    content: `Functions that activate only when something goes wrong. Often hidden functions.

**Process protection:**
*"To stop pump automatically if discharge pressure exceeds 5 bar"*

**Equipment protection:**
*"To trip motor on high temperature (>120°C winding temperature)"*

**Personnel protection:**
*"To isolate electrical supply when guard is removed"*

**Environmental protection:**
*"To capture seal leakage and route to drain without atmospheric release"*`
  },
  {
    id: 6,
    title: "Superfluous Functions",
    type: 'concept',
    content: `Not everything equipment can do is a function you need to maintain.

**Example:** A pump has a pressure gauge installed during commissioning for testing. If operators don't use or need this indication, maintaining the gauge may be superfluous.

**What to do:**
- Document it
- Discuss with stakeholders
- Explicitly decide to include or exclude

Don't waste analysis effort on functions nobody needs.`
  },
  {
    id: 7,
    title: "Quantifying: Flow & Capacity",
    type: 'example',
    content: `Performance standards must be quantified. Vague standards = vague analysis.

**Poor:** "Adequate flow for process needs"

**Better:** "Minimum 500 L/min"

**Best:** "500-600 L/min to maintain heat exchanger approach temperature <5°C"

The best standard links the number to **why it matters**.`
  },
  {
    id: 8,
    title: "Quantifying: Pressure & Temperature",
    type: 'example',
    content: `**Pressure:**
- Poor: "Sufficient pressure"
- Better: "2.5 bar at pump discharge"
- Best: "2.5 bar minimum to overcome system resistance of 2.2 bar plus 10% margin"

**Temperature:**
- Poor: "Keep temperature in acceptable range"
- Better: "Maintain outlet 35-45°C"
- Best: "Maintain 35-45°C to prevent degradation >50°C and crystallisation <30°C"`
  },
  {
    id: 9,
    title: "Quantifying: Reliability & Response",
    type: 'example',
    content: `**Reliability/Availability:**
- Poor: "High reliability"
- Better: "99% availability"
- Best: "99.5% availability (max 44 hrs unplanned downtime annually) to meet production schedule"

**Response Time:**
- Poor: "Fast response"
- Better: "Activate within 5 seconds"
- Best: "Activate within 5 seconds of demand to prevent vessel pressure exceeding 11 bar"`
  },
  {
    id: 10,
    title: "Hidden vs Evident Functions",
    type: 'keypoint',
    content: `This distinction is crucial—it determines how we handle failure consequences.

**Evident functions:** Failure is apparent during normal operation
- Visible symptoms (leaks, smoke)
- Audible symptoms (alarms, unusual noise)
- Process deviations that trigger alarms

**Hidden functions:** Failure is NOT apparent under normal circumstances
- Protective devices only activated in abnormal conditions
- Standby equipment only running when primary fails
- Backup systems waiting in reserve`
  },
  {
    id: 11,
    title: "Why Hidden Functions Matter",
    type: 'keypoint',
    content: `**Hidden failures** are dangerous because you don't know they've occurred.

Example:
- Backup pump has failed
- But primary pump is running normally
- No indication of backup failure
- Only discovered when primary fails and backup doesn't start

**Result:** Total loss of pumping when you need it most.

Hidden failures require **failure-finding tasks** to detect before they combine with other failures.`
  },
  {
    id: 12,
    title: "Worked Example: Primary Function",
    type: 'example',
    content: `**Equipment:** Cooling Water Pump P-101A
**Service:** Primary cooling water supply to heat exchangers
**Context:** Continuous operation, outdoors, coastal environment

**Function 1 (Primary):**
*"To transfer cooling water from the sump to the heat exchanger headers at 480-550 m³/hr at 2.8-3.2 bar discharge pressure"*

**Derivation:** Process requires 450 m³/hr minimum; design flow is 500 m³/hr with turndown capability.`
  },
  {
    id: 13,
    title: "Worked Example: Secondary Functions",
    type: 'example',
    content: `**Function 2 (Containment):**
*"To contain cooling water with leakage not exceeding 100 ml/hr at mechanical seal"*

**Function 3 (Indication):**
*"To provide visual indication of discharge pressure (0-6 bar) and flow rate (0-600 m³/hr)"*

**Function 4 (Economy):**
*"To operate with power consumption not exceeding 75 kW at rated flow"*

**Function 5 (Condition):**
*"To operate with vibration below 4.5 mm/s velocity at bearing housings"*`
  },
  {
    id: 14,
    title: "Worked Example: Protective Functions",
    type: 'example',
    content: `**Function 7 (Equipment protection):**
*"To stop automatically on high motor winding temperature (>130°C)"*

**Function 8 (Equipment protection):**
*"To stop automatically on high vibration (>7.1 mm/s)"*

**Function 9 (Personnel protection):**
*"To permit operation only when coupling guard is in place"*

Note: Functions 7-9 are all **hidden functions**—they only activate during abnormal conditions.`
  },
  {
    id: 15,
    title: "Spot the Error #1",
    type: 'example',
    content: `**Bad:** "To pump cooling water"

**Errors:**
- No performance standard—how much? What pressure?
- "Pump" is equipment name used as verb
- No destination or source specified

**Corrected:**
*"To transfer cooling water from the main sump to the heat exchanger headers at 480-550 m³/hr at 2.8-3.2 bar discharge pressure"*`
  },
  {
    id: 16,
    title: "Spot the Error #2",
    type: 'example',
    content: `**Bad:** "Pump must not leak"

**Errors:**
- Uses equipment name instead of function format
- "Must not leak" is unrealistic—all seals have some leakage
- No quantified acceptable limit

**Corrected:**
*"To contain cooling water with leakage not exceeding 100 ml/hr at the mechanical seal during operation"*`
  },
  {
    id: 17,
    title: "Function Hierarchies",
    type: 'concept',
    content: `For complex systems, functions exist at multiple levels:

**System Level:**
*"To provide cooling water to heat exchangers at 450-550 m³/hr"*

**Subsystem Level:**
*"To transfer water from sump to headers [Pump]"*
*"To remove heat from water [Cooling tower]"*

**Equipment Level:**
*"To convert electrical energy to rotation at 1470 RPM [Motor]"*

Most RCM analyses work at **equipment level**.`
  },
  {
    id: 18,
    title: "Consistent Verb Vocabulary",
    type: 'concept',
    content: `Use standard verbs for consistency:

| Verb | Use |
|------|-----|
| To transfer | Moving fluids/materials |
| To convert | Energy conversion |
| To contain | Preventing release |
| To maintain | Keeping parameter in range |
| To indicate | Providing information |
| To protect | Activating on abnormal conditions |
| To support | Structural functions |
| To isolate | Separating systems |
| To regulate | Controlling parameters |`
  },
  {
    id: 19,
    title: "Documentation Best Practices",
    type: 'concept',
    content: `**Number functions systematically:**
F1, F2, F3... or hierarchical (1.1, 1.2, 1.3)

**Link to sources:**
- Process design basis (document number)
- P&ID or control philosophy
- Manufacturer specifications
- Regulatory requirements

**Review with operators:**
They'll catch missing functions and challenge impractical standards.`
  },
  {
    id: 20,
    title: "Expert Tip: Start Broad",
    type: 'keypoint',
    content: `**Start broad, then refine.**

**First pass:** Capture all functions you can think of
**Second pass:** Quantify and clarify each one
**Third pass:** Verify with operators and engineers

Don't try to be perfect on the first attempt—iteration improves quality.`
  },
  {
    id: 21,
    title: "Expert Tip: What Would We Lose?",
    type: 'keypoint',
    content: `**Ask "what would we lose?"**

If this function failed, what capability would we lose?

If you can't articulate the loss clearly, maybe it's not a real function—or you don't understand it well enough yet.

This question also helps prioritise: functions where the loss is severe deserve more attention.`
  },
  {
    id: 22,
    title: "Expert Tip: Challenge Inherited Functions",
    type: 'keypoint',
    content: `**Don't assume previous analyses are correct.**

If previous analysis listed a function, verify it's still valid:
- Has operating context changed?
- Is the equipment still used the same way?
- Are the performance standards still relevant?

Operating context evolves. Functions evolve with it.`
  },
  {
    id: 23,
    title: "Common Mistake: Confusing Function & Description",
    type: 'concept',
    content: `**Description:** "100 kW motor"

**Function:** "To convert electrical energy to rotational energy at 1470 RPM with 75 kW useful output"

Equipment descriptions list what something **is**.
Functions state what something **does** and **how well**.

If your "function" reads like a nameplate, rewrite it.`
  },
  {
    id: 24,
    title: "Common Mistake: Missing Implicit Functions",
    type: 'concept',
    content: `**Consider what's NOT written.**

Environmental and containment functions are often assumed but not documented.

Every pump is expected to:
- Not leak excessively
- Not create ignition sources
- Not discharge to environment
- Not exceed noise limits

Make these **explicit**. If they're not documented, they won't be analysed.`
  },
  {
    id: 25,
    title: "Module Summary",
    type: 'summary',
    content: `**Key takeaways:**

- Every function needs **verb + object + performance standard**
- **Primary** (why it exists), **secondary** (additional requirements), **protective** (abnormal conditions)
- **Hidden functions** require failure-finding tasks
- Performance standards must be **quantified** and linked to operational needs
- **Start broad**, then refine—involve operators in review

Master functions, and everything else in your RCM analysis flows from a solid foundation.`
  }
];

// Map of lesson IDs to their slides
export const practitionerLessonSlides: Record<number, Slide[]> = {
  1: practitionerModule1Slides,
  2: practitionerModule2Slides,
  // Future modules will be added here
};

// Helper function to check if a lesson has slides
export function hasPractitionerSlides(lessonId: number): boolean {
  return lessonId in practitionerLessonSlides;
}

// Helper function to get slides for a lesson
export function getPractitionerSlides(lessonId: number): Slide[] | undefined {
  return practitionerLessonSlides[lessonId];
}
