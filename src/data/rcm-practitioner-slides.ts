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

// Module 3: Functional Failure Analysis - Slide-based content
export const practitionerModule3Slides: Slide[] = [
  {
    id: 1,
    title: "From Functions to Failures",
    type: 'intro',
    content: `With functions precisely defined, we can now identify **functional failures**—the states where equipment no longer meets its required performance standards.

This sounds straightforward, but it's where many analyses go wrong.

Miss a functional failure and you'll miss all the failure modes that cause it. Include irrelevant failures and you'll waste analysis time.`
  },
  {
    id: 2,
    title: "What Is a Functional Failure?",
    type: 'concept',
    content: `A functional failure is a **state** where equipment cannot fulfil a function to the required performance standard.

**Key insight:** Functional failure is about the state, not the cause. The cause is the failure mode (next module).

For: *"Transfer cooling water at 480-550 m³/hr at 2.8-3.2 bar"*

Functional failures include:
- Unable to transfer any water (total failure)
- Transfers less than 480 m³/hr (insufficient)
- Transfers more than 550 m³/hr (excessive)
- Pressure outside 2.8-3.2 bar range`
  },
  {
    id: 3,
    title: "Complete vs Partial Failure",
    type: 'concept',
    content: `**Complete failure:** Function entirely lost
*"Unable to transfer any cooling water"*

**Partial failure:** Function degraded but not completely lost
*"Transfers less than 480 m³/hr (but some flow exists)"*

**Both are valid functional failures.**

Don't assume "failure" means complete loss. Partial failures often provide warning time and different maintenance opportunities.`
  },
  {
    id: 4,
    title: "State vs Rate Failures",
    type: 'concept',
    content: `**State failure:** Equipment is in a failed state
*"Pump will not start"*

**Rate failure:** Equipment performs below required rate
*"Pump delivers only 350 m³/hr (below required 480 m³/hr)"*

**Intermittent failure:** Failure comes and goes
*"Pump occasionally trips on high vibration, then restarts normally"*

Intermittent failures are often hardest to diagnose—but they still need analysis.`
  },
  {
    id: 5,
    title: "Functional Failure Notation",
    type: 'concept',
    content: `Systematic notation ensures completeness:

**Letter/Number System:**
- F1 = Function 1
- FF1A = Functional Failure A of Function 1
- FF1B = Functional Failure B of Function 1

**Matrix Approach:**

| Function | Functional Failure |
|----------|-------------------|
| F1: Transfer water at 480-550 m³/hr | FF1A: Unable to transfer any water |
| | FF1B: Transfers less than 480 m³/hr |
| | FF1C: Pressure below 2.8 bar |`
  },
  {
    id: 6,
    title: "Systematic Derivation",
    type: 'keypoint',
    content: `For each function, ask:

1. **Can the function be completely lost?**
   → Total/complete failures

2. **Can the function be partially lost?**
   → Degraded performance failures

3. **Can the function be exceeded?**
   → Over-performance failures

4. **Can the function fail intermittently?**
   → Often missed

5. **Can failure create a hazard?**
   → Safety-related failures`
  },
  {
    id: 7,
    title: "Over-Performance Failures",
    type: 'keypoint',
    content: `**"Delivers too much" can be as problematic as "delivers too little."**

- Excessive pressure can damage downstream equipment
- Excessive flow can flood systems
- Excessive temperature can harm products

If the performance standard specifies a maximum, exceeding it is a functional failure.

Example: *"Discharge pressure exceeds 3.2 bar maximum"*`
  },
  {
    id: 8,
    title: "Worked Example: Gauge Function",
    type: 'example',
    content: `**Function:** To indicate discharge pressure (0-6 bar) via local gauge with accuracy ±0.1 bar

**Functional Failures:**
1. Does not indicate any pressure (gauge reads zero regardless of actual)
2. Indicates high—reading overstates pressure
3. Indicates low—reading understates pressure
4. Indication unreadable (damaged dial, fogged glass)

**Note:** We distinguish reading high vs. low because consequences and failure modes differ.`
  },
  {
    id: 9,
    title: "Protective Function Failures",
    type: 'keypoint',
    content: `Protective functions have TWO types of failure:

**Function:** *"Stop pump automatically if pressure exceeds 5 bar"*

**Failures:**
1. **Fails to protect:** Doesn't stop pump when pressure exceeds 5 bar
2. **Spurious trip:** Stops pump when pressure is below 5 bar

Both matter:
- Failure to protect → Safety/equipment consequence
- Spurious trip → Operational consequence (unnecessary shutdown)

Different failure modes cause each; different maintenance may apply.`
  },
  {
    id: 10,
    title: "When to Separate Failures",
    type: 'concept',
    content: `**Separate when:**
- Consequences differ significantly
- Failure modes differ
- Different maintenance tasks would apply

**Combine when:**
- Difference is trivial
- Same failure modes cause both
- Same maintenance addresses both

Example: "Delivers 475 m³/hr" vs "Delivers 470 m³/hr" vs "Delivers 460 m³/hr"—unless step changes in consequence, treat as one failure: *"Delivers less than minimum."*`
  },
  {
    id: 11,
    title: "Documentation Requirements",
    type: 'concept',
    content: `Good documentation includes:

1. **Clear statement of failed state** — Not the cause, just the state

2. **Reference to function** — Which function does this relate to?

3. **How evident** — What would operators observe?

4. **Relationship to other failures** — Does this affect other systems?

| ID | Function | Functional Failure | How Evident |
|----|----------|-------------------|-------------|
| FF1A | F1: Transfer water | Unable to transfer any | No flow, pressure drop |
| FF1B | F1: Transfer water | Less than 480 m³/hr | Reduced flow indication |`
  },
  {
    id: 12,
    title: "Pitfall: Confusing Mode & Failure",
    type: 'concept',
    content: `**Wrong:** "Bearing seizure"
*(This is a failure MODE—the cause)*

**Right:** "Unable to transfer any cooling water"
*(This is the functional FAILURE—the state)*

The distinction matters:
- Functional failure = WHAT is the failed state?
- Failure mode = WHY did it fail?

Multiple failure modes can cause the same functional failure.`
  },
  {
    id: 13,
    title: "Pitfall: Missing Partial Failures",
    type: 'concept',
    content: `Many analyses only capture complete failures.

But partial failures often:
- Provide **warning time** before total failure
- Enable **different maintenance** opportunities
- Have **different consequences** than complete failures

A pump delivering 400 m³/hr (vs required 480) may allow continued operation with degraded performance—unlike a pump delivering zero.`
  },
  {
    id: 14,
    title: "Pitfall: Missing Intermittent Failures",
    type: 'concept',
    content: `**"The equipment usually works"** isn't good enough.

Intermittent failures:
- Are real operational problems
- Often indicate developing issues
- Deserve analysis

Example: Pump occasionally trips on vibration, then restarts normally.

The failure mode causing this intermittent behavior needs identification and maintenance consideration.`
  },
  {
    id: 15,
    title: "Context Matters",
    type: 'concept',
    content: `Functional failures must be evaluated within **operating context**.

**Function:** To start within 10 seconds of demand signal

- **Normal operation:** Pump runs continuously—this function isn't relevant
- **Standby mode:** This function matters critically

The functional failure "fails to start within 10 seconds" only applies in standby mode.

Your analysis should reflect which modes each failure applies to.`
  },
  {
    id: 16,
    title: "Expert Tip: Trace to Requirements",
    type: 'keypoint',
    content: `**Every functional failure should clearly relate to a documented function.**

If you have orphan failures, either:
- The function is missing (add it)
- The failure is spurious (remove it)

This traceability ensures your analysis is complete and well-organized.`
  },
  {
    id: 17,
    title: "Expert Tip: Test with Operators",
    type: 'keypoint',
    content: `Ask operators: *"In what conditions would you consider this equipment to have failed?"*

Their answers often reveal:
- Failures you missed
- Partial failures that matter operationally
- Intermittent issues that aren't documented

Operators live with equipment daily—use their knowledge.`
  },
  {
    id: 18,
    title: "Expert Tip: Think Consequences",
    type: 'keypoint',
    content: `While formal consequence evaluation comes later, thinking about **"So what?"** helps identify whether a functional failure is worth detailed analysis.

If you can't articulate any consequence:
- Maybe it's not a real failure
- Maybe the function isn't needed
- Maybe the performance standard is wrong

Use this test to focus effort on failures that matter.`
  },
  {
    id: 19,
    title: "Module Summary",
    type: 'summary',
    content: `**Key takeaways:**

- Functional failure is the **state** of not meeting a function—distinct from failure modes (causes)
- Include **complete, partial, over-performance, and intermittent** failures
- Protective functions have **two failure types**: fails to protect and spurious activation
- **Separate** failures when consequences or maintenance differ
- **Document** linkage to functions and how failures are evident

With functional failures identified, we're ready to ask: What **causes** each one? That's failure modes—next module.`
  }
];

// Module 4: Expert Failure Mode Identification - Slide-based content
export const practitionerModule4Slides: Slide[] = [
  {
    id: 1,
    title: "The Heart of RCM Analysis",
    type: 'intro',
    content: `Failure mode identification is where RCM gets real.

Up to now, we've described what equipment should do and what constitutes failure. Now we answer: **Why does it fail?**

Get it right, and your maintenance strategy will be robust. Get it wrong—miss key failure modes or drown in irrelevant ones—and the analysis loses value.`
  },
  {
    id: 2,
    title: "What Is a Failure Mode?",
    type: 'concept',
    content: `A failure mode is a **single event or condition** that causes a functional failure.

**Critical attributes:**
- Single event (not multiple events combined)
- Specific enough to identify a maintenance response
- Describes what failed, not just that it failed

**Good examples:**
- "Bearing fails due to fatigue"
- "Seal fails due to dry running"
- "Impeller erodes due to cavitation"`
  },
  {
    id: 3,
    title: "Poor Failure Mode Statements",
    type: 'example',
    content: `These need improvement:

- **"Pump fails"** — Too vague. Dozens of failure modes could cause this.

- **"Multiple problems occur"** — Not a single event.

- **"Bearing"** — Just a noun, not a failure mode.

- **"Maintenance error"** — Too vague. What specific error?

Each of these leaves you unable to identify appropriate maintenance.`
  },
  {
    id: 4,
    title: "Sources: Equipment History",
    type: 'concept',
    content: `**Your CMMS and maintenance records are gold**—they reflect your actual operating context.

**Look for:**
- Work orders describing corrective maintenance
- Breakdown reports and root cause analyses
- Repeated repairs on similar equipment
- Near-misses and close calls

**Limitation:** Only shows what HAS failed, not what COULD fail. New equipment has no history.`
  },
  {
    id: 5,
    title: "Sources: People Knowledge",
    type: 'concept',
    content: `**Tacit knowledge that isn't in any database.**

The technician who's worked on that pump for 20 years knows things no manual contains.

**Capture through:**
- Structured interviews
- Analysis team participation
- Walkdowns and discussions at the equipment

**Limitation:** Subject to bias, memory gaps, and "we've always done it this way" thinking.`
  },
  {
    id: 6,
    title: "Sources: Manufacturer & Databases",
    type: 'concept',
    content: `**Manufacturer documentation:**
- Manuals, maintenance recommendations
- Technical bulletins, service alerts
- Known issues and failure mode listings

**Generic databases:**
- OREDA (Offshore/Onshore Reliability Data)
- IEEE Gold Book (electrical)
- Military handbooks

**Limitation:** Generic data may not reflect YOUR specific conditions. Must be validated for your context.`
  },
  {
    id: 7,
    title: "The 'Reasonably Likely' Criteria",
    type: 'keypoint',
    content: `You cannot analyse every conceivable failure mode. Use "reasonably likely" to filter.

**Include failure modes that:**
- Have occurred before (here or similar equipment)
- Are known to occur in your industry
- Could reasonably occur given your context
- Would have significant consequences (even if low probability)

**When in doubt, include it.** Better to analyse and decide no task is needed than to miss something significant.`
  },
  {
    id: 8,
    title: "What to Exclude",
    type: 'concept',
    content: `**Exclude failure modes that:**

- Are extremely improbable in your context (tornado damage where there are no tornadoes)

- Require multiple simultaneous independent failures

- Are already prevented by design features (corrosion of stainless steel in fresh water)

- Have never occurred and have no credible mechanism

This keeps analysis focused and practical.`
  },
  {
    id: 9,
    title: "Level of Detail: Too High",
    type: 'example',
    content: `**Too high-level:**

*"Motor fails"*

This could mean dozens of things:
- Bearing failure?
- Winding insulation breakdown?
- Shaft fracture?
- Cooling system failure?

Each has different failure patterns and requires different maintenance. Can't select a task from this.`
  },
  {
    id: 10,
    title: "Level of Detail: Too Low",
    type: 'example',
    content: `**Too detailed:**

*"Third ball in motor drive-end bearing inner race develops subsurface fatigue crack at 34,000 hours due to inclusion at steel surface initiated by improper heat treatment"*

This is metallurgical forensics, not RCM.

Way more detail than needed for maintenance task selection.`
  },
  {
    id: 11,
    title: "Level of Detail: Just Right",
    type: 'keypoint',
    content: `**Just right:**

*"Motor drive-end bearing fails due to fatigue"*

This is specific enough to:
- Understand the failure mechanism (fatigue)
- Identify the affected component (drive-end bearing)
- Select appropriate maintenance (vibration monitoring, scheduled replacement, lubrication)

**Rule:** Specific enough to select a task, not metallurgical forensics.`
  },
  {
    id: 12,
    title: "Classification by Mechanism",
    type: 'concept',
    content: `Organising by failure mechanism helps ensure completeness:

- **Wear** — Erosion, abrasion, adhesion
- **Fatigue** — Cyclic stress, crack propagation
- **Corrosion** — Chemical/electrochemical degradation
- **Overload** — Stress exceeding limits
- **Degradation** — Ageing of polymers, insulation
- **Contamination** — Foreign material
- **Loosening** — Fastener/connection failure
- **Blockage** — Flow restriction from deposits`
  },
  {
    id: 13,
    title: "Classification by Cause",
    type: 'concept',
    content: `Another useful classification:

- **Design-related** — Inherent to the equipment design
- **Manufacturing-related** — Quality defects
- **Installation-related** — Commissioning problems
- **Operations-related** — Caused by operating practices
- **Maintenance-related** — Caused by maintenance activities
- **Environmental** — Caused by operating environment

This helps identify what type of control is needed.`
  },
  {
    id: 14,
    title: "Maintenance-Induced Failures",
    type: 'keypoint',
    content: `**Some failure modes are CAUSED by maintenance.** These deserve explicit consideration.

Examples:
- Bearing fails due to contamination introduced during maintenance
- Seal fails due to improper installation
- Fastener fails due to incorrect torque
- System fails due to isolation valve left closed

**Why it matters:**
- May be more frequent than design failures
- Require procedural/training controls, not inspections
- Explain why equipment fails right after maintenance`
  },
  {
    id: 15,
    title: "Worked Example: Total Failure",
    type: 'example',
    content: `**Function:** Transfer water at 480-550 m³/hr at 2.8-3.2 bar
**Functional Failure:** Unable to transfer any water

**Failure Modes:**
1. Motor fails to start (electrical supply)
2. Motor fails to start (control circuit)
3. Motor fails (winding breakdown)
4. Motor fails (bearing failure)
5. Coupling fails (elastomer degradation)
6. Shaft fails (fatigue)
7. Impeller fails (erosion/corrosion)
8. Mechanical seal fails catastrophically
9. Suction blocked (strainer fouling)`
  },
  {
    id: 16,
    title: "Worked Example: Partial Failure",
    type: 'example',
    content: `**Functional Failure:** Delivers less than 480 m³/hr

**Failure Modes:**
1. Impeller partially worn (erosion)
2. Impeller damaged (cavitation)
3. Wear ring clearance excessive
4. Internal recirculation (damaged gasket)
5. Suction partially blocked
6. Air ingress through seal/gasket
7. Incorrect impeller installed
8. Motor running at reduced speed

Notice how **functional failure shapes** which failure modes are relevant.`
  },
  {
    id: 17,
    title: "Avoiding Analysis Paralysis",
    type: 'concept',
    content: `Complex equipment can have hundreds of failure modes. How to avoid months of analysis?

1. **Focus on dominant failures** — Frequent or significant first
2. **Group similar modes** — Same pattern, same maintenance = analyse together
3. **Use templates** — Start with validated lists, customise
4. **Set time limits** — Don't let perfect defeat good
5. **Iterate** — Three passes: quick capture, research, expert review`
  },
  {
    id: 18,
    title: "Expert Tip: Look Beyond the Database",
    type: 'keypoint',
    content: `**Your CMMS shows what you've repaired.**

It doesn't show:
- Failure modes you've prevented
- Failure modes that haven't occurred yet
- Near-misses that weren't formally recorded

Think about what's NOT in the database. Long-lived equipment may have hidden degradation that hasn't manifested—yet.`
  },
  {
    id: 19,
    title: "Expert Tip: Transients Matter",
    type: 'keypoint',
    content: `**Consider startup and shutdown specifically.**

Many failure modes occur during transients, not steady-state:
- Thermal stress during startup
- Water hammer during valve operations
- Surge during pump starting
- Control instability during mode changes

If you only analyse normal operation, you'll miss these.`
  },
  {
    id: 20,
    title: "Module Summary",
    type: 'summary',
    content: `**Key takeaways:**

- Failure modes must be **single events**, specific enough for task selection
- Use **multiple sources**: history, people, manufacturers, databases
- Apply **"reasonably likely"** criteria—don't analyse everything
- **Goldilocks zone**: Not too vague, not metallurgical forensics
- Don't forget **maintenance-induced** failures
- **Avoid paralysis**: Focus, group, use templates, set limits

With failure modes identified, next we document what happens when they occur—failure effects.`
  }
];

// Module 5: Failure Effects Documentation - Slide-based content
export const practitionerModule5Slides: Slide[] = [
  {
    id: 1,
    title: "Why Failure Effects Matter",
    type: 'intro',
    content: `Failure effects answer: **What happens when this failure mode occurs?**

This isn't just documentation—it's the evidence base for consequence evaluation and task selection.

Poor failure effect descriptions lead to poor decisions. Complete descriptions enable confident maintenance strategy development.`
  },
  {
    id: 2,
    title: "The Four Elements",
    type: 'keypoint',
    content: `A complete failure effect includes:

1. **Evidence of Failure** — What do operators observe?
2. **Immediate Effects** — What happens right away?
3. **Secondary Effects** — What damage or impacts result?
4. **Repair Requirements** — What's needed to restore function?

Miss any element and your consequence evaluation will be incomplete.`
  },
  {
    id: 3,
    title: "Element 1: Evidence",
    type: 'concept',
    content: `What does the operating crew observe? How do they know failure has occurred?

**Physical evidence:**
- Visible: leaks, smoke, discolouration
- Audible: noise, alarms, unusual sounds
- Measurable: pressure, temperature, flow readings
- System behaviour: trips, alarms, shutdowns

*"Abnormal noise from pump housing. Vibration increases from 2.5 to >6 mm/s. High vibration alarm on local panel and DCS."*`
  },
  {
    id: 4,
    title: "Element 2: Immediate Effects",
    type: 'concept',
    content: `What happens right away when failure occurs?

- Does equipment stop or continue running?
- Is process affected immediately?
- Are there automatic responses?

*"Pump continues running initially. Bearing temperature rises. If not addressed, seizure occurs within 2-8 hours causing immediate pump trip."*`
  },
  {
    id: 5,
    title: "Element 3: Secondary Effects",
    type: 'concept',
    content: `What damage or impacts result from the failure?

- Damage to other components
- Damage to downstream equipment
- Production impacts
- Safety hazards created
- Environmental releases

*"If seizure occurs, shaft damage likely. Seal may be compromised. Motor may sustain locked rotor damage."*`
  },
  {
    id: 6,
    title: "Element 4: Repair Requirements",
    type: 'concept',
    content: `What's needed to restore function?

- Actions required
- Resources needed (parts, tools, personnel)
- Typical repair time
- Special requirements

*"Requires pump shutdown and isolation. Bearing replacement: 4-6 hours with parts available. If shaft damaged, lead time 2-3 weeks."*`
  },
  {
    id: 7,
    title: "Be Specific, Not Vague",
    type: 'example',
    content: `**Poor:** "Pump stops working"

**Good:** "Flow indication drops to zero. Low flow alarm activates within 30 seconds. Downstream heat exchanger temperature rises above setpoint within 5 minutes, triggering high temperature alarm."

Specific effects enable specific decisions.`
  },
  {
    id: 8,
    title: "Include Timing",
    type: 'keypoint',
    content: `Timing determines whether intervention is possible.

**Poor:** "Temperature rises"

**Good:** "Heat exchanger outlet temperature rises ~2°C per minute until protective shutdown at +15°C above setpoint (approximately 7-8 minutes from failure)"

A bearing degrading over weeks allows intervention. One failing in seconds doesn't.`
  },
  {
    id: 9,
    title: "Trace the Full Cascade",
    type: 'concept',
    content: `Many failures have cascading effects. Trace the full sequence:

1. Initial failure symptom
2. Process response
3. Operator/automatic actions
4. Secondary effects if not addressed
5. Ultimate consequence

Ask repeatedly: **"Then what happens?"**`
  },
  {
    id: 10,
    title: "Evident vs Hidden",
    type: 'keypoint',
    content: `This distinction is crucial for consequence classification:

**Evident:** "Leak visible at seal housing. Drip tray collects leakage. Operators observe during rounds."

**Hidden:** "No indication under normal operation. Backup pump failure only evident when primary fails and backup doesn't start."

Hidden failures require failure-finding tasks.`
  },
  {
    id: 11,
    title: "Gradual Degradation Effects",
    type: 'concept',
    content: `**Pattern:** Performance deteriorates over time

**Focus on:**
- How degradation manifests
- Rate of change
- When it crosses failure threshold
- Early warning indicators

*"Flow decreases ~2-3% per month as impeller erodes. Operators may notice higher motor current. When flow drops below 480 m³/hr, temperature control becomes marginal."*`
  },
  {
    id: 12,
    title: "Sudden Failure Effects",
    type: 'concept',
    content: `**Pattern:** Little/no warning before functional failure

**Focus on:**
- Immediate symptoms
- How quickly impact occurs
- Automatic responses
- Immediate hazards

*"Coupling fails—immediate loss of power transmission. Pump stops instantly. No prior warning. Impact noise at moment of failure."*`
  },
  {
    id: 13,
    title: "Multi-Level Effects",
    type: 'concept',
    content: `Consider effects at multiple levels:

**Local:** Impact on failed equipment (damage, symptoms)

**System:** Impact on broader system (upstream, downstream, parallel equipment)

**Plant/Business:** Impact on operation (production, quality, revenue)

*"Local: Seal fails. System: Cooling water reduced. Plant: 30% throughput reduction = £6,000/hour lost."*`
  },
  {
    id: 14,
    title: "Quantify Where Possible",
    type: 'keypoint',
    content: `Numbers make effects concrete:

**Production:**
- Poor: "Causes production problems"
- Better: "30% throughput reduction"
- Best: "30% reduction = £6,000/hour lost revenue"

**Repair time:**
- Poor: "Requires repair"
- Better: "4-6 hours"
- Best: "4-6 hours if parts in stock; 2-3 weeks if shaft replacement needed"`
  },
  {
    id: 15,
    title: "Documentation Format",
    type: 'concept',
    content: `Structured format ensures completeness:

| Failure Mode | Evidence | Immediate | Secondary | Repair |
|--------------|----------|-----------|-----------|--------|
| Bearing fatigue | Noise, vibration >6 mm/s, temp rise | Continues running, degrades over hours | Seizure → shaft/seal/motor damage | 4-6 hrs; +2-3 wks if shaft |

This format makes gaps obvious.`
  },
  {
    id: 16,
    title: "Expert Tip: Mental Walk-Through",
    type: 'keypoint',
    content: `**Close your eyes and imagine the failure happening.**

What would you see? Hear? Smell?
What would happen next?
How would operators respond?

This exercise reveals details you might miss from just reading procedures or P&IDs.`
  },
  {
    id: 17,
    title: "Common Mistake: Too Brief",
    type: 'concept',
    content: `**"Pump stops"** tells you almost nothing useful.

It doesn't say:
- How operators would know
- What happens to the process
- What secondary damage occurs
- How long repair takes

Without these, you can't properly evaluate consequences or select tasks.`
  },
  {
    id: 18,
    title: "Common Mistake: Missing Progression",
    type: 'concept',
    content: `Many failures don't cause instant complete loss—they progress from detectable degradation to functional failure.

**Missing this means:**
- Missing on-condition maintenance opportunities
- Overestimating consequences (assuming worst case)
- Not quantifying P-F interval

Document the progression, not just the end state.`
  },
  {
    id: 19,
    title: "Module Summary",
    type: 'summary',
    content: `**Key takeaways:**

- Complete effects include **evidence, immediate, secondary, and repair**
- **Distinguish evident from hidden** — drives consequence classification
- Consider effects at **local, system, and plant** levels
- **Quantify** where possible — numbers enable decisions
- Include **timing** — determines intervention opportunity

With failure effects documented, we can now evaluate **consequences** — next module.`
  }
];

// Module 6: Consequence Evaluation - Slide-based content
export const practitionerModule6Slides: Slide[] = [
  {
    id: 1,
    title: "Why Consequences Drive Everything",
    type: 'intro',
    content: `Consequence evaluation is where RCM becomes strategic.

Not all failures are equal. A bearing failure on a critical pump has different consequences than the same failure on a backup system.

**The consequence category determines how much effort is justified to prevent the failure.** Get this wrong and you'll either over-maintain (waste resources) or under-maintain (accept unacceptable risk).`
  },
  {
    id: 2,
    title: "The Four Consequence Categories",
    type: 'keypoint',
    content: `RCM categorises consequences into four types:

1. **Hidden failure consequences** — Not evident under normal operation
2. **Safety/Environmental consequences** — Could hurt people or environment
3. **Operational consequences** — Affects production, quality, service
4. **Non-operational consequences** — Only direct repair cost

The category determines the decision logic for task selection.`
  },
  {
    id: 3,
    title: "First Question: Is It Hidden?",
    type: 'keypoint',
    content: `**The first question is always: Will the failure be evident to operators under normal circumstances?**

If NO → It's a hidden failure
If YES → Proceed to evaluate safety/operational/non-operational

Hidden failures are special because they can lie dormant until another failure occurs—then consequences multiply.`
  },
  {
    id: 4,
    title: "Hidden Failures",
    type: 'concept',
    content: `Hidden failures affect protective devices and standby equipment:

- Backup pumps that only run when primary fails
- Relief valves that only lift during overpressure
- Emergency systems waiting for emergencies
- Alarms and trips for abnormal conditions

**The danger:** You don't know it's failed until you need it—and then it's too late.`
  },
  {
    id: 5,
    title: "Multiple Failure Scenarios",
    type: 'keypoint',
    content: `Hidden failures matter because of **multiple failure scenarios**.

Example:
1. Backup pump has failed (hidden—nobody knows)
2. Primary pump fails
3. No pumping capability at all

Without the hidden failure, primary pump failure = minor inconvenience.
With the hidden failure, primary pump failure = crisis.

**Always evaluate: What happens if this hidden failure exists AND another failure occurs?**`
  },
  {
    id: 6,
    title: "Safety Consequences",
    type: 'concept',
    content: `**Safety consequences** — The failure mode could hurt or kill someone.

Consider:
- Direct injury (contact with moving parts, electrical shock)
- Indirect injury (process release, fire, explosion)
- Delayed injury (toxic exposure, cumulative harm)

**Key test:** On its own, could this failure mode injure or kill someone?

For hidden failures: Could the multiple failure scenario injure or kill?`
  },
  {
    id: 7,
    title: "Environmental Consequences",
    type: 'concept',
    content: `**Environmental consequences** — The failure could breach regulations or cause ecological damage.

Consider:
- Releases to air, water, or ground
- Permit violations
- Reportable quantities
- Ecological impact

Environmental and safety consequences get the same treatment: **proactive maintenance is mandatory**.`
  },
  {
    id: 8,
    title: "Operational Consequences",
    type: 'concept',
    content: `**Operational consequences** — Affects output, quality, or service.

These have economic impact:
- Production loss or reduction
- Product quality degradation
- Delivery delays
- Customer impacts

**Key principle:** For operational consequences, compare the cost of prevention against the cost of failure.

If prevention costs more than it saves, don't do it.`
  },
  {
    id: 9,
    title: "Non-Operational Consequences",
    type: 'concept',
    content: `**Non-operational consequences** — The only impact is direct repair cost.

Equipment doesn't directly affect:
- Production
- Quality
- Safety
- Environment

Examples: Redundant equipment, non-critical auxiliaries.

**Run to failure is often the right answer** for non-operational consequences.`
  },
  {
    id: 10,
    title: "Consequence Decision Flow",
    type: 'keypoint',
    content: `**Evaluate in this order:**

1. Is failure evident? → If NO = Hidden
2. For hidden: Does multiple failure have S&E consequences?
3. For evident: Does failure have safety consequences?
4. Does failure have environmental consequences?
5. Does failure have operational consequences?
6. If none above → Non-operational

The first "yes" determines the consequence category.`
  },
  {
    id: 11,
    title: "What Category Means for Tasks",
    type: 'concept',
    content: `**Hidden:** Must have task (failure-finding or proactive) to ensure protection

**Safety/Environmental:** Must have task that reduces risk to acceptable level—or redesign

**Operational:** Task must be economically justified

**Non-operational:** Task only if it costs less than run-to-failure

The category sets the **burden of proof** for task selection.`
  },
  {
    id: 12,
    title: "Quantifying Operational Consequences",
    type: 'concept',
    content: `For operational failures, quantify to enable economic comparison:

- **Production loss rate:** £/hour during outage
- **Probability of failure:** How often per year?
- **Duration of outage:** Hours to repair?
- **Secondary costs:** Overtime, expedited parts

**Expected annual cost = Probability × (Production loss + Repair cost)**

Compare this to the cost of prevention.`
  },
  {
    id: 13,
    title: "Expert Tip: Challenge Hidden Classification",
    type: 'keypoint',
    content: `Some failures classified as "hidden" could be made evident:

- Add indication (gauge, alarm, monitoring)
- Change operating procedures (regular function tests)
- Modify equipment (make protective device self-checking)

If making it evident is practical, the failure becomes easier to manage.

Always ask: **Could we make this evident?**`
  },
  {
    id: 14,
    title: "Expert Tip: Safety Requires Rigour",
    type: 'keypoint',
    content: `Safety consequence evaluation requires careful thought:

- Consider **credible worst case**, not just typical case
- Consider **all people at risk** (operators, maintainers, public)
- Consider **realistic scenarios**, not just theoretical ones
- Get **input from safety professionals** when uncertain

When in doubt about safety, err on the side of caution.`
  },
  {
    id: 15,
    title: "Common Mistake: Everything is Critical",
    type: 'concept',
    content: `**If everything is critical, nothing is.**

Avoid classifying every failure as safety/environmental. This:
- Overwhelms maintenance resources
- Dilutes focus on truly critical items
- Makes the analysis less useful

Apply consequence categories honestly. Most failures are operational or non-operational—that's okay.`
  },
  {
    id: 16,
    title: "Common Mistake: Ignoring Hidden Failures",
    type: 'concept',
    content: `Hidden failures are easy to overlook:
- Equipment is working (as far as you know)
- No alarms, no visible problems
- "It'll work when we need it"

But hidden failures can turn minor events into disasters.

**Always ask for protective/standby equipment: How would we know if this had failed?**`
  },
  {
    id: 17,
    title: "Documentation",
    type: 'concept',
    content: `Document consequence evaluation clearly:

| Failure Mode | Evident? | S/E? | Operational? | Category | Rationale |
|--------------|----------|------|--------------|----------|-----------|
| Bearing fails | Yes (noise, vibration) | No | Yes (production loss) | Operational | £6k/hr production impact |
| Backup pump fails | No (standby) | Yes (if primary also fails) | - | Hidden S&E | Total cooling loss if both fail |

Rationale explains the classification.`
  },
  {
    id: 18,
    title: "Module Summary",
    type: 'summary',
    content: `**Key takeaways:**

- **Four categories:** Hidden, Safety/Environmental, Operational, Non-operational
- **First question:** Is it evident? Hidden failures need special treatment
- **Safety/Environmental:** Proactive tasks mandatory
- **Operational:** Economic justification required
- **Non-operational:** Run-to-failure often appropriate

With consequences classified, we can now select **proactive maintenance tasks** — next module.`
  }
];

// Module 7: Proactive Task Selection - Slide-based content
export const practitionerModule7Slides: Slide[] = [
  {
    id: 1,
    title: "Selecting the Right Approach",
    type: 'intro',
    content: `With consequences classified, we now select maintenance tasks. This is where RCM becomes practical—translating analysis into action.

**Proactive tasks** are performed BEFORE failure to either prevent it or provide warning.

Three types:
1. On-condition tasks (predictive)
2. Scheduled restoration (overhaul)
3. Scheduled discard (replacement)

Each has specific criteria. Let's master task selection.`
  },
  {
    id: 2,
    title: "On-Condition Tasks",
    type: 'concept',
    content: `**On-condition tasks** detect that failure is in progress, with enough warning to act.

Equipment degrades through stages:
1. **Good as new** — No detectable degradation
2. **Potential failure (P)** — Degradation becomes detectable
3. **Functional failure (F)** — No longer meets function

The time between P and F is the **P-F interval**—your warning period.

**On-condition**: Inspect at intervals shorter than P-F. Detect at P, act before F.`
  },
  {
    id: 3,
    title: "On-Condition Criteria",
    type: 'keypoint',
    content: `**Technical feasibility:**
1. Definable potential failure condition exists
2. P-F interval is reasonably consistent
3. Practical to monitor at intervals < P-F
4. Net P-F (after detection-to-action time) allows action

**Worth doing** (operational/non-operational):
5. Task cost over time < cost of failures prevented

All criteria must be met.`
  },
  {
    id: 4,
    title: "The P-F Interval",
    type: 'keypoint',
    content: `Different techniques detect degradation at different stages:

| Detection Method | Typical P-F |
|-----------------|-------------|
| Ultrasonic | 1-3 months |
| Vibration analysis | 1-6 weeks |
| Thermography | 1-3 weeks |
| Audible noise | 1-7 days |
| Touch temperature | Hours-2 days |

Early detection = longer P-F = more time to respond.`
  },
  {
    id: 5,
    title: "Task Interval Rule",
    type: 'keypoint',
    content: `**Rule: Inspection interval ≤ P-F interval ÷ 2**

Why half?
- You might inspect just before P
- Next inspection would be at P + interval
- If interval = P-F, you'd inspect exactly at F—too late

**Example:**
- P-F interval: 6 weeks
- Maximum interval: 3 weeks
- If P-F is 1 week, inspect every 3-4 days`
  },
  {
    id: 6,
    title: "Common On-Condition Techniques",
    type: 'concept',
    content: `| Technique | Detects | P-F |
|-----------|---------|-----|
| Vibration | Rotating equipment degradation | 1-6 weeks |
| Oil analysis | Contamination, wear | 2-8 weeks |
| Thermography | Hot spots, insulation | 1-4 weeks |
| Ultrasonic | Leaks, early wear, arcing | 1-12 weeks |
| Visual | Corrosion, leaks, wear | Variable |
| Performance trending | Efficiency loss | Weeks-months |`
  },
  {
    id: 7,
    title: "Scheduled Restoration",
    type: 'concept',
    content: `**Scheduled restoration** restores capability at fixed intervals regardless of condition.

Examples:
- Rebuild gearbox every 5 years
- Rewind motor every 10 years
- Repack valve every 2 years

**Criteria:**
1. Identifiable age where reliability decreases
2. Most items survive to that age
3. Task restores acceptable capability
4. Cost justified (for operational/non-operational)`
  },
  {
    id: 8,
    title: "The 11% Problem",
    type: 'keypoint',
    content: `**Scheduled restoration only works for age-related failure.**

Research shows only **11%** of items exhibit wear-out patterns where scheduled overhaul reduces failure probability.

For the other **89%**, scheduled overhaul may:
- Add no value (random failure patterns)
- Actually introduce problems (infant mortality)

**Always ask:** What evidence shows this item has age-related failure?`
  },
  {
    id: 9,
    title: "Scheduled Discard",
    type: 'concept',
    content: `**Scheduled discard** replaces items at fixed intervals regardless of condition.

Examples:
- Replace seals every 2 years
- Replace coupling elements every 3 years
- Replace batteries every 5 years

Same criteria as restoration. Use discard when:
- Replacement more practical than overhaul
- Item not repairable
- Restoration quality uncertain`
  },
  {
    id: 10,
    title: "Task Type Selection Hierarchy",
    type: 'keypoint',
    content: `When multiple types could apply:

**1. On-condition preferred when:**
- P-F interval allows practical monitoring
- Technology is mature for this failure mode
- Cost-effective

**2. Scheduled restoration/discard when:**
- On-condition not feasible
- Age-reliability relationship well-established

**Why on-condition often preferred:**
- Only replaces items that need it
- Works for random failure patterns
- Provides warning for planned intervention`
  },
  {
    id: 11,
    title: "Task Selection by Pattern",
    type: 'concept',
    content: `| Pattern | On-Condition | Scheduled |
|---------|--------------|-----------|
| Wear-out (age-related) | ✓ If detectable | ✓ If age known |
| Random (constant rate) | ✓ If detectable | ✗ No benefit |
| Infant mortality | ✓ After run-in | ✗ May worsen |
| Fatigue | ✓ Usually possible | ✓ If life known |

**Key:** For random patterns (most common), on-condition is the only valid proactive option.`
  },
  {
    id: 12,
    title: "Worked Example: Pump Seal",
    type: 'example',
    content: `**Failure mode:** Seal fails due to wear

1. **Detectable potential failure?** Yes—increasing leakage, temperature rise
2. **P-F interval?** Visual: 2-4 weeks; Temperature: 1-2 weeks
3. **On-condition feasible?** Yes—weekly inspection, continuous temp monitoring
4. **Age-reliability?** Partial—seals wear, but many fail from random causes
5. **Scheduled discard?** Wasteful—many replaced unnecessarily

**Selected:** Weekly visual inspection + temperature monitoring`
  },
  {
    id: 13,
    title: "Combining Tasks",
    type: 'concept',
    content: `Sometimes combinations provide better coverage:

**Example—Rotating Equipment:**
- On-condition: Continuous vibration monitoring
- On-condition: Quarterly oil analysis
- Scheduled: Annual alignment check
- Scheduled discard: Coupling element every 5 years

Each addresses different failure modes or provides complementary detection.`
  },
  {
    id: 14,
    title: "Expert Tip: Match Technique to Mode",
    type: 'keypoint',
    content: `**Select the right tool for each failure mode:**

- Vibration catches bearing wear—not corrosion
- Oil analysis catches contamination—not electrical faults
- Thermography catches hot spots—not mechanical looseness

No single technique covers everything. Match technique to the specific failure mode you're trying to detect.`
  },
  {
    id: 15,
    title: "Expert Tip: The Whole P-F Chain",
    type: 'keypoint',
    content: `Detection is only valuable if you can act in time.

Consider the full chain:
- Detection time
- Analysis/diagnosis time
- Decision time
- Parts lead time
- Scheduling time
- Repair time

If P-F is 2 weeks but parts take 8 weeks, you have a problem. Plan the whole response, not just detection.`
  },
  {
    id: 16,
    title: "Expert Tip: Question Scheduled Tasks",
    type: 'keypoint',
    content: `If proposing scheduled restoration or discard, ask:

*"What evidence shows age-related failure occurs?"*

Many scheduled tasks exist because "we've always done it" rather than technical validity.

**Watch for maintenance-induced failures:** Every intervention risks introducing problems. Scheduled tasks should reduce overall failure risk, not just shift it.`
  },
  {
    id: 17,
    title: "Module Summary",
    type: 'summary',
    content: `**Key takeaways:**

- **On-condition** detects potential failure—P-F interval is key
- Task interval ≤ **P-F ÷ 2** ensures detection before failure
- **Scheduled tasks** only work for age-related patterns (11% of failures)
- **On-condition preferred** when feasible—only replaces what needs it
- **Combine tasks** when different techniques cover different failure modes

When no proactive task works, we need **default actions**—next module.`
  }
];

// Module 8: Default Actions & Redesign - Slide-based content
export const practitionerModule8Slides: Slide[] = [
  {
    id: 1,
    title: "When Proactive Tasks Don't Work",
    type: 'intro',
    content: `Sometimes no proactive task is technically applicable or worth doing.

This isn't failure—it's a valid outcome of rigorous analysis.

**Default actions** are what you do when scheduled or on-condition tasks aren't the answer:
- Failure-finding tasks (for hidden failures)
- Redesign (mandatory for some consequences)
- Run to failure (acceptable for some consequences)`
  },
  {
    id: 2,
    title: "Failure-Finding Tasks",
    type: 'keypoint',
    content: `**Failure-finding tasks** check whether a hidden function is still working.

These apply ONLY to hidden failures—things you wouldn't notice during normal operation.

Examples:
- Test backup generator monthly
- Function-test relief valves annually
- Exercise standby pumps weekly
- Test emergency shutdowns quarterly

The purpose: Confirm the protection is available before you need it.`
  },
  {
    id: 3,
    title: "Failure-Finding Intervals",
    type: 'concept',
    content: `The interval depends on:
- Required availability of the protected function
- Consequence severity if both fail
- Mean Time Between Failures of the hidden item

**Calculation approach:**
If 95% availability is required and MTBF is 5 years:
Interval = MTBF × (1 - Required Availability)²
= 5 × 0.05² = 0.0125 years ≈ weekly

More conservative = shorter intervals.`
  },
  {
    id: 4,
    title: "When Redesign is Mandatory",
    type: 'keypoint',
    content: `**Redesign is mandatory when:**

- Failure has safety/environmental consequences AND
- No proactive task reduces risk to acceptable levels

You cannot simply accept safety consequences. If you can't maintain safety through tasks, you must change the design to:
- Eliminate the failure mode
- Reduce the consequences
- Make failure evident
- Add protection`
  },
  {
    id: 5,
    title: "Redesign Options",
    type: 'concept',
    content: `**Redesign can mean:**

- **Change the design** — Different materials, components, configuration
- **Add protection** — Safety devices, barriers, interlocks
- **Change the process** — Different operating conditions
- **Add redundancy** — Backup systems
- **Make hidden failures evident** — Add indication, alarms
- **Reduce consequences** — Containment, fire protection

The goal: Make the failure mode acceptable through design, not just maintenance.`
  },
  {
    id: 6,
    title: "Run to Failure",
    type: 'concept',
    content: `**Run to failure** is a legitimate strategy—when consequences allow.

**Acceptable for:**
- Non-operational consequences (only repair cost matters)
- Some operational consequences (when prevention costs more than failure)

**Never acceptable for:**
- Safety/environmental consequences
- Hidden failures protecting against safety/environmental events

Run to failure is a **conscious decision**, not neglect.`
  },
  {
    id: 7,
    title: "The No Scheduled Maintenance Decision",
    type: 'concept',
    content: `"No scheduled maintenance" means:
- No proactive task is technically valid, OR
- No proactive task is economically justified

**This requires documentation:**
- Why no task is feasible
- What consequences are accepted
- What will happen when failure occurs
- How failures will be managed reactively

It's a decision, not an omission.`
  },
  {
    id: 8,
    title: "Default Action Decision Flow",
    type: 'keypoint',
    content: `**For hidden failures:**
1. Can a proactive task prevent/detect? → If yes, use it
2. If no → Failure-finding task feasible? → If yes, use it
3. If no → Is risk acceptable? → If no, redesign mandatory

**For evident failures:**
1. Safety/Environmental: Task or redesign mandatory
2. Operational: Task if economically justified, else run to failure
3. Non-operational: Task if economic, else run to failure`
  },
  {
    id: 9,
    title: "Documenting Default Actions",
    type: 'concept',
    content: `Document clearly why no proactive task was selected:

| Failure Mode | Consequence | Proactive Task? | Default Action | Rationale |
|--------------|-------------|-----------------|----------------|-----------|
| Bulb fails | Non-op | No cost-effective task | Run to failure | Replace when noticed; £5 repair |
| Safety valve fails to lift | Hidden S&E | No condition indicator | Failure-finding (annual) | Test annually per insurance |
| Tank corrosion | S&E, no warning | No feasible task | Redesign | Add corrosion-resistant lining |`
  },
  {
    id: 10,
    title: "Expert Tip: Challenge 'No Task'",
    type: 'keypoint',
    content: `Before accepting "no scheduled maintenance," challenge:

- **Are we sure no on-condition task exists?** Technology advances—new monitoring methods emerge.
- **Have we considered all scheduled options?** Sometimes a simple inspection catches problems.
- **Is redesign truly impractical?** Sometimes small changes make big differences.

"No task" should be a last resort, not a default.`
  },
  {
    id: 11,
    title: "Expert Tip: Run to Failure ≠ Ignore",
    type: 'keypoint',
    content: `**Run to failure still requires:**

- Spare parts availability (or fast procurement)
- Reactive maintenance capability
- Contingency plans for outage period
- Acceptance that failure will occur

It's not "do nothing until it breaks then panic." It's "we've planned for this failure and are ready."`
  },
  {
    id: 12,
    title: "Module Summary",
    type: 'summary',
    content: `**Key takeaways:**

- **Failure-finding tasks** check hidden functions are working
- **Redesign is mandatory** for safety/environmental when tasks don't work
- **Run to failure** is legitimate for non-operational and some operational
- **"No scheduled maintenance"** must be documented with rationale
- Default actions are **conscious decisions**, not omissions

With task selection complete, we turn to **facilitating RCM analyses**—next module.`
  }
];

// Map of lesson IDs to their slides
export const practitionerLessonSlides: Record<number, Slide[]> = {
  1: practitionerModule1Slides,
  2: practitionerModule2Slides,
  3: practitionerModule3Slides,
  4: practitionerModule4Slides,
  5: practitionerModule5Slides,
  6: practitionerModule6Slides,
  7: practitionerModule7Slides,
  8: practitionerModule8Slides,
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
