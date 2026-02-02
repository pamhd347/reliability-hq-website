export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SpotTheError {
  badExample: string;
  errors: string[];
  correctedExample: string;
}

export interface WorkedExample {
  title: string;
  scenario: string;
  steps: { step: string; content: string }[];
}

export interface ScenarioExercise {
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

export interface PractitionerLesson {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  content: string;
  keyTakeaways: string[];
  quiz: QuizQuestion[];
  spotTheErrors?: SpotTheError[];
  workedExamples?: WorkedExample[];
  scenarioExercises?: ScenarioExercise[];
  expertTips?: string[];
  commonMistakes?: string[];
  reflectionPrompts?: string[];
}

export const practitionerLessons: PractitionerLesson[] = [
  {
    id: 1,
    slug: 'advanced-operating-context',
    title: 'Advanced Operating Context',
    subtitle: 'Defining operating context precisely for rigorous RCM analysis',
    duration: '45-55 min',
    content: `
## Why Operating Context Matters More Than You Think

If you've completed the RCM Fundamentals course, you know that operating context establishes the boundaries within which we analyse equipment. But here's what separates competent practitioners from excellent ones: **the depth and precision with which they define operating context**.

A vague operating context leads to vague analysis. Functions become imprecise. Failure modes get missed or mischaracterised. Maintenance tasks don't quite fit. The whole analysis becomes a house built on sand.

Let's get this right.

---

## The Five Dimensions of Operating Context

Operating context isn't a single statement—it's a multidimensional description that captures everything affecting how equipment performs and fails.

### 1. Physical Environment

Where does this equipment operate? This affects:
- **Temperature ranges**: A pump in a heated building behaves differently from one exposed to Scottish winters
- **Humidity and moisture**: Coastal facilities face salt spray; indoor electronics face condensation
- **Dust and particulates**: Mining operations vs. clean rooms
- **Vibration from adjacent equipment**: A sensor mounted near a hammer mill experiences different stresses
- **Corrosive atmospheres**: Chemical plants, marine environments

**Example**: A centrifugal pump transferring cooling water operates outdoors in a coastal petrochemical facility. Ambient temperatures range from -5°C to 35°C. Salt air exposure is constant. Adjacent compressors create baseline vibration of 2mm/s at the pump foundation.

### 2. Duty Cycle and Loading

How hard does this equipment work, and when?

- **Continuous vs. intermittent operation**: A pump running 24/7 has different wear patterns than one running 4 hours per day
- **Load profile**: Constant load, variable load, frequent starts/stops
- **Peak demands**: Maximum throughput periods vs. typical operation
- **Standby equipment**: How often does backup equipment actually run?

**Example**: Primary cooling pump operates continuously at 85-95% of rated capacity. Backup pump operates approximately 200 hours per year during primary maintenance or high-demand periods. Pump experiences 2-4 start/stop cycles per month.

### 3. Process Conditions

What's happening to the process fluid or material?

- **Fluid properties**: Temperature, viscosity, specific gravity, corrosivity
- **Contaminants**: Solids content, abrasive particles, chemical contamination
- **Phase changes**: Cavitation risk, flashing, crystallisation
- **Flow regime**: Laminar vs. turbulent, pulsating flow

**Example**: Process fluid is demineralised water with <50 ppm suspended solids. Temperature ranges 15-45°C. pH maintained between 7.0-8.5 through chemical treatment. Occasional excursions to pH 6.0 during upset conditions (estimated 5-10 times per year).

### 4. Performance Requirements

What must this equipment actually deliver? Be specific.

- **Capacity requirements**: Minimum, typical, maximum
- **Quality standards**: Tolerances, acceptable variations
- **Response times**: How quickly must the system respond to demand changes?
- **Reliability expectations**: What availability is needed?

**Example**: System must deliver minimum 450 m³/hr cooling water at 2.5 bar discharge pressure. Temperature rise across heat exchangers not to exceed 8°C. System availability requirement: 99.5% (equivalent to maximum 44 hours unplanned downtime per year).

### 5. Regulatory and Safety Context

What external requirements constrain operation?

- **Safety regulations**: PSM requirements, COMAH, ATEX
- **Environmental permits**: Discharge limits, emission controls
- **Industry standards**: API, ASME, ISO requirements
- **Insurance requirements**: Inspection intervals, testing requirements

**Example**: Facility operates under COMAH Upper Tier regulations. Cooling water system classified as safety-related for emergency shutdown cooling. PSV testing required annually per insurance. Environmental permit limits cooling water discharge temperature to 25°C maximum.

---

## Multiple Operating Modes

Most equipment doesn't operate in a single mode. You must identify and document each distinct operating mode because failure modes and consequences can differ dramatically.

### Common Operating Modes

**Normal operation**: The typical running condition where equipment performs its primary function

**Startup**: Often more stressful than steady-state operation. Thermal gradients, flow instabilities, control system transients

**Shutdown**: Can involve different stresses—thermal contraction, fluid drainage, settling

**Standby**: Equipment not running but ready. Different failure modes apply—corrosion, sticking, battery discharge

**Maintenance/Overhaul**: Equipment in a non-operational state. Safety and preservation concerns

**Emergency operation**: Operating beyond normal parameters. Higher loads, bypassed controls, extended durations

**Upset/Off-design conditions**: Process upsets, contamination events, extreme ambient conditions

### Documenting Operating Modes

For each significant mode, document:
- How often this mode occurs
- Typical duration
- Key parameters that differ from normal operation
- Specific stresses or risks unique to this mode

**Example—Cooling Water Pump Operating Modes**:

| Mode | Frequency | Duration | Key Parameters |
|------|-----------|----------|----------------|
| Normal operation | Continuous | 8,400 hrs/yr | 480 m³/hr, 2.5 bar |
| Startup | 2-4/month | 15-30 min | Surge conditions, seal flush initiation |
| Standby (backup pump) | When primary down | Variable | No rotation, seal face wetted |
| High demand | 5-10/year | 2-8 hours | 540 m³/hr, motor at 95% FLA |
| Emergency shutdown | <1/year | <1 hour | Rapid stop, no controlled cooldown |

---

## Performance Standards: Quantifying Success

Every function needs a performance standard. Vague standards lead to vague analysis. Let's sharpen this skill.

### Elements of a Good Performance Standard

**Measurable**: Can you verify whether the standard is being met?
- Bad: "Adequate flow"
- Good: "Minimum 450 m³/hr"

**Contextual**: Does the standard reflect actual operational needs?
- Bad: "Design flow rate of 500 m³/hr"
- Good: "Minimum 450 m³/hr to maintain heat exchanger outlet below 45°C"

**Achievable**: Is the standard realistic given equipment capability and operating context?
- Bad: "100% availability"
- Good: "99.5% availability excluding planned maintenance"

**Relevant**: Does this standard actually matter for system performance?
- Bad: "Vibration below manufacturer's limit"
- Good: "Vibration below 4.5 mm/s to prevent bearing damage"

### Deriving Performance Standards

Performance standards come from multiple sources:

1. **Process requirements**: What does the downstream process actually need?
2. **Design documentation**: Original equipment specifications (but validate these)
3. **Operating history**: What has actually worked (or failed)?
4. **Regulatory requirements**: Safety and environmental limits
5. **Economic optimisation**: Beyond minimum requirements, what's cost-effective?

### Hidden Performance Standards

Some standards aren't in any document—they're implicit in how the system must behave:

- **Containment**: The pump must not leak more than X litres per hour
- **Safety**: The pump must not create ignition sources in a hazardous area
- **Environmental**: The pump must not discharge to the environment
- **Stability**: The pump must not cause water hammer in the piping system

These are often missed in analyses. Don't assume—document them explicitly.

---

## Boundary Definition: Where Does Your Analysis Start and Stop?

Before beginning an RCM analysis, you must define boundaries precisely. Boundary problems create:
- Duplicate analysis (multiple teams analysing the same components)
- Analysis gaps (interfaces nobody owns)
- Confusion about whose failure modes are whose

### Physical Boundaries

Define using specific reference points:
- Inlet flange of pump X-1234
- Electrical supply from MCC compartment 3B (breaker outgoing terminals)
- Control signal from DCS output card (terminal block)

### Functional Boundaries

What functions are included? A pump analysis might include:
- Transfer function (moving fluid)
- Containment (preventing leaks)
- Indication (pressure gauges, flow meters)

But might exclude:
- Process control (handled in control system analysis)
- Power supply reliability (handled in electrical analysis)

### Interface Documentation

For each boundary, document:
- What's on each side
- Who owns each side
- Assumptions about the other side's reliability

**Example**:

> **Inlet boundary**: Suction strainer downstream flange. Assumes strainer is maintained per separate analysis and provides <100 micron filtration.
>
> **Electrical boundary**: Motor terminal box. Power supply reliability and protection handled in MCC analysis. Assumes power availability >99.9%.
>
> **Control boundary**: DCS output terminals. Control logic reliability handled in SIS analysis. Assumes valid control signals.

---

## Practical Exercise: Define Your Context

Before any RCM analysis, complete an Operating Context Document. Here's a template structure:

**1. System Identification**
- System name and number
- Analysis boundaries (with sketch/diagram reference)
- Equipment included in analysis

**2. Process Description**
- What the system does
- How it fits into the larger process
- Upstream and downstream connections

**3. Operating Modes**
- Normal operation parameters
- Other significant modes with parameters
- Mode transition stresses

**4. Environmental Conditions**
- Ambient conditions (temperature, humidity, atmosphere)
- External hazards (vibration, contamination)
- Location-specific factors

**5. Performance Requirements**
- Primary function standards
- Secondary function standards
- Availability/reliability targets

**6. Regulatory Context**
- Applicable regulations
- Required inspections/tests
- Documentation requirements

**7. Maintenance Context**
- Current maintenance strategy
- Known problem areas
- Spare parts availability
- Access constraints

---

## Expert Tips: Operating Context

**Work with operators first.** Engineers design systems; operators know how they actually behave. Spend time in the control room. Watch startup procedures. Ask about "that thing that happens when..."

**Don't trust design documents blindly.** Operating context evolves. That pump designed for 400 m³/hr might now routinely run at 480 m³/hr. Document reality, not intention.

**Visit the equipment.** Photos and P&IDs don't capture everything. Is there a roof leak dripping on the motor? Is access blocked by temporary scaffolding? Is the equipment labelling even correct?

**Consider future changes.** If production is increasing 10% next year, will current equipment cope? Operating context should reflect planned changes.

**Document your assumptions.** When you don't know something, state your assumption explicitly. Future analysts need to know what you assumed and why.

---

## Common Mistakes

**Mistake 1: Copying generic context descriptions.** Every facility is different. "Standard petrochemical environment" tells you almost nothing.

**Mistake 2: Forgetting standby equipment.** Standby equipment has different failure modes than running equipment—but those failures only become evident when you need the equipment to run.

**Mistake 3: Ignoring seasonal variations.** Equipment behaving perfectly in summer may fail in winter. Document the full range of conditions.

**Mistake 4: Setting performance standards too high or too low.** Too high wastes resources preventing failures that don't matter. Too low allows functional failures that hurt operations.

**Mistake 5: Vague boundaries.** "The pump system" isn't a boundary. Specify precisely where your analysis starts and stops.
    `,
    keyTakeaways: [
      'Operating context has five dimensions: physical environment, duty cycle, process conditions, performance requirements, and regulatory context',
      'Document all significant operating modes—not just normal operation',
      'Performance standards must be measurable, contextual, achievable, and relevant',
      'Define analysis boundaries precisely using physical and functional reference points',
      'Don\'t trust design documents blindly—document actual operating reality',
    ],
    quiz: [
      {
        question: 'Why is precise operating context essential for RCM analysis?',
        options: [
          'It\'s required by SAE JA1011 documentation',
          'It makes reports look more professional',
          'Vague context leads to imprecise functions, missed failure modes, and ill-fitting maintenance tasks',
          'It helps with equipment procurement',
        ],
        correctIndex: 2,
        explanation: 'Operating context is the foundation of RCM analysis. Vague context means you can\'t define functions precisely, you may miss or mischaracterise failure modes, and your maintenance tasks won\'t quite fit the actual operating situation.',
      },
      {
        question: 'What are the five dimensions of operating context?',
        options: [
          'Safety, quality, delivery, cost, morale',
          'Physical environment, duty cycle, process conditions, performance requirements, regulatory context',
          'Mechanical, electrical, instrumentation, structural, civil',
          'Design, operation, maintenance, reliability, availability',
        ],
        correctIndex: 1,
        explanation: 'The five dimensions are: physical environment (where it operates), duty cycle (how hard and when), process conditions (what it handles), performance requirements (what it must deliver), and regulatory context (external requirements).',
      },
      {
        question: 'Why must you document multiple operating modes?',
        options: [
          'To make the analysis longer',
          'Failure modes and consequences can differ dramatically between modes like startup, normal operation, and standby',
          'It\'s only required for critical equipment',
          'To satisfy insurance requirements',
        ],
        correctIndex: 1,
        explanation: 'Equipment experiences different stresses in different modes. A standby pump faces corrosion and sticking risks, while a running pump faces wear and fatigue. Startup involves thermal and hydraulic transients not present during steady-state operation.',
      },
      {
        question: 'Which is the best example of a properly quantified performance standard?',
        options: [
          'Adequate cooling water flow',
          'Design flow rate as per manufacturer specifications',
          'Minimum 450 m³/hr to maintain heat exchanger outlet below 45°C',
          'Sufficient flow for process requirements',
        ],
        correctIndex: 2,
        explanation: 'This standard is measurable (450 m³/hr), contextual (linked to actual process need—heat exchanger temperature), and verifiable. The other options are either vague or reference documents without stating the actual requirement.',
      },
      {
        question: 'What should you document for each analysis boundary?',
        options: [
          'Only the equipment model numbers',
          'Just the P&ID number',
          'What\'s on each side, who owns each side, and assumptions about the other side\'s reliability',
          'The maintenance budget for each side',
        ],
        correctIndex: 2,
        explanation: 'Proper boundary documentation prevents gaps and overlaps in analysis. You need to know what interfaces with your system, who\'s responsible for analysis on each side, and what reliability assumptions you\'re making about those interfaces.',
      },
      {
        question: 'When defining operating context, why should you visit the equipment physically?',
        options: [
          'To count the number of components',
          'Photos and P&IDs don\'t capture everything—roof leaks, access issues, and actual conditions matter',
          'To verify equipment colour coding',
          'Physical visits aren\'t necessary if you have good documentation',
        ],
        correctIndex: 1,
        explanation: 'Physical inspection reveals conditions that documents miss: environmental factors like leaks or contamination, access constraints for maintenance, actual equipment condition, and whether labelling matches reality.',
      },
    ],
    expertTips: [
      'Work with operators first—they know how equipment actually behaves, not just how it was designed to behave',
      'Document your assumptions explicitly. Future analysts need to know what you assumed and why',
      'Consider future changes. If production is increasing next year, will equipment cope?',
      'Visit the equipment. P&IDs don\'t show the roof leak dripping on the motor',
    ],
    commonMistakes: [
      'Copying generic context descriptions instead of documenting facility-specific conditions',
      'Forgetting that standby equipment has different failure modes than running equipment',
      'Ignoring seasonal variations that affect equipment performance',
      'Setting performance standards too high (wasting resources) or too low (allowing harmful failures)',
      'Defining vague boundaries like "the pump system" instead of specific physical and functional limits',
    ],
    reflectionPrompts: [
      'Think about a critical system at your facility. Can you describe its operating context in all five dimensions?',
      'What operating modes does your most important equipment experience? Have you documented the unique stresses of each mode?',
      'Are your current performance standards based on actual process needs, or just copied from design documents?',
    ],
  },
  {
    id: 2,
    slug: 'mastering-functions',
    title: 'Mastering Function Statements',
    subtitle: 'Writing precise, complete function statements that drive effective analysis',
    duration: '50-60 min',
    content: `
## The Foundation of Everything

If you get functions wrong, everything that follows will be wrong. Your failure modes will be incomplete. Your consequences will be misjudged. Your maintenance tasks won't quite fit.

This isn't theory—it's the most common root cause of poor RCM analyses.

Let's master this.

---

## Anatomy of a Function Statement

A function statement has three essential elements:

**1. Verb** — What action the item performs
**2. Object** — What the action is performed upon
**3. Performance Standard** — How well the action must be performed

> **To transfer** (verb) **cooling water** (object) **from the reservoir to the heat exchanger at a minimum flow rate of 500 L/min and maximum pressure of 4 bar** (performance standard)

Without all three elements, your function is incomplete and your analysis will suffer.

---

## Categories of Functions

### Primary Functions

The main reason the asset exists. Why did someone spend money buying this equipment?

For a cooling water pump:
> To transfer cooling water from the reservoir to the heat exchanger at minimum 500 L/min at 2.5 bar discharge pressure

For a pressure relief valve:
> To relieve vessel pressure at 10 bar to prevent overpressurisation

For a motor:
> To convert electrical energy to rotational energy at 1450 RPM ± 2% with 15 kW output capacity

**Tip**: If your function doesn't include quantified performance standards, it's not complete. "To pump water" could mean anything from a garden hose to a flood control station.

### Secondary Functions

Additional requirements beyond the primary function. These are often overlooked but critically important.

**Containment functions**:
> To contain process fluid with leakage not exceeding 10 ml/hr at the mechanical seal

**Structural/support functions**:
> To support connected piping without excessive stress at flanged connections

**Appearance/hygiene functions**:
> To maintain external surfaces free of product contamination

**Comfort/convenience functions**:
> To operate with noise levels below 85 dB(A) at 1 metre

**Economy functions**:
> To operate with power consumption not exceeding 18 kW at rated flow

**Environmental functions**:
> To operate without discharging process fluid to the environment

### Protective Functions

Functions that activate only when something goes wrong. These are frequently hidden functions.

**Process protection**:
> To stop the pump automatically if discharge pressure exceeds 5 bar

**Equipment protection**:
> To trip the motor on high temperature (>120°C winding temperature)

**Personnel protection**:
> To isolate electrical supply when guard is removed

**Environmental protection**:
> To capture seal leakage and route to drain without atmospheric release

### Superfluous Functions

Not everything equipment can do is a function you need to maintain. Functions that are incidental or no longer needed should be identified but may be deliberately excluded from analysis.

Example: A pump has a pressure gauge installed during commissioning for testing. If operators don't use or need this indication, maintaining the gauge's function may be superfluous.

**Decision**: Document it, discuss with stakeholders, and explicitly decide whether to include or exclude.

---

## Quantifying Performance Standards

The performance standard transforms a vague function into something analysable. Here's how to quantify different types of standards.

### Flow/Capacity Standards

**Poor**: "Adequate flow for process needs"
**Better**: "Minimum 500 L/min"
**Best**: "500-600 L/min to maintain heat exchanger approach temperature <5°C"

The best standard links the number to why it matters.

### Pressure Standards

**Poor**: "Sufficient pressure"
**Better**: "2.5 bar at pump discharge"
**Best**: "2.5 bar minimum at pump discharge to overcome system resistance of 2.2 bar plus 10% margin"

### Temperature Standards

**Poor**: "Keep temperature in acceptable range"
**Better**: "Maintain outlet temperature 35-45°C"
**Best**: "Maintain outlet temperature 35-45°C to prevent product degradation above 50°C and crystallisation below 30°C"

### Reliability/Availability Standards

**Poor**: "High reliability"
**Better**: "99% availability"
**Best**: "Minimum 99.5% availability (maximum 44 hours unplanned downtime annually) to meet production schedule"

### Time/Response Standards

**Poor**: "Fast response"
**Better**: "Activate within 5 seconds"
**Best**: "Activate within 5 seconds of demand to prevent vessel pressure exceeding 11 bar"

---

## Hidden vs. Evident Functions

This distinction is crucial because it determines how we handle failure consequences.

### Evident Functions

The failure is apparent to operating personnel during normal duties. They'll notice something's wrong.

**Indicators of evident functions**:
- Visible symptoms (leaks, smoke, unusual appearance)
- Audible symptoms (noise, alarms, silence where there should be sound)
- Process deviations that trigger alarms
- Direct operator interaction with equipment

Example: Main process pump fails → Flow drops → Temperature rises → Alarm activates → Operator sees deviation

### Hidden Functions

The failure is NOT apparent under normal circumstances. The failure only becomes evident when the function is demanded.

**Indicators of hidden functions**:
- Protective devices that only activate in abnormal conditions
- Standby equipment that only runs when primary fails
- Alarms and trips that only activate during upsets
- Backup systems that wait in reserve

Example: Backup pump has failed → But primary pump is running → No indication of backup failure → Only discovered when primary fails and backup doesn't start

**Why this matters**: Hidden failures require failure-finding tasks to detect before they combine with other failures to create serious consequences.

---

## Worked Example: Complete Function Analysis

Let's analyse a centrifugal cooling water pump comprehensively.

### Step 1: Identify the Equipment and Context
- Equipment: Cooling Water Pump P-101A
- Service: Primary cooling water supply to heat exchangers
- Context: Operates continuously, outdoors, coastal environment

### Step 2: Primary Functions

**Function 1**: To transfer cooling water from the sump to the heat exchanger headers at 480-550 m³/hr at 2.8-3.2 bar discharge pressure

*Derivation*: Process requires 450 m³/hr minimum; design flow is 500 m³/hr with turndown capability. Pressure requirement from hydraulic calculations showing 2.5 bar system resistance.

### Step 3: Secondary Functions

**Function 2**: To contain cooling water with leakage not exceeding 100 ml/hr at the mechanical seal during operation

*Derivation*: Environmental permit prohibits discharge to ground; seal specification allows minor weepage.

**Function 3**: To provide visual indication of discharge pressure (0-6 bar) and flow rate (0-600 m³/hr) via local gauges

*Derivation*: Operators use local indication for routine checks and troubleshooting.

**Function 4**: To operate with power consumption not exceeding 75 kW at rated flow

*Derivation*: Motor is rated 75 kW; higher consumption indicates degradation.

**Function 5**: To operate with vibration levels below 4.5 mm/s velocity at bearing housings

*Derivation*: ISO 10816 limits for this machine class; above this level indicates developing problems.

**Function 6**: To support connected piping at suction and discharge flanges without excessive stress

*Derivation*: Piping design assumes rigid connection points.

### Step 4: Protective Functions

**Function 7**: To stop automatically on high motor winding temperature (>130°C)

*Derivation*: Motor protection relay setting; prevents insulation damage.

**Function 8**: To stop automatically on high vibration (>7.1 mm/s)

*Derivation*: Vibration trip setting to prevent catastrophic bearing failure.

**Function 9**: To permit operation only when coupling guard is in place

*Derivation*: Safety interlock requirement per site standards.

---

## Spot the Error: Function Statement Practice

### Example 1
> "To pump cooling water"

**Errors**:
- No performance standard—how much water? At what pressure?
- "Pump" is the equipment name used as verb—should be "transfer" or "deliver"
- No destination or source specified

**Corrected**:
> "To transfer cooling water from the main sump to the heat exchanger headers at 480-550 m³/hr at 2.8-3.2 bar discharge pressure"

### Example 2
> "To provide adequate pressure for the system"

**Errors**:
- "Adequate" is not quantified
- "The system" is vague—which system?
- Passive construction hides what the equipment actually does

**Corrected**:
> "To maintain discharge pressure at 2.8-3.2 bar to overcome system resistance and deliver required flow to heat exchangers"

### Example 3
> "Pump must not leak"

**Errors**:
- Uses equipment name instead of function format
- "Must not leak" is unrealistic—all mechanical seals have some leakage
- No quantified acceptable limit

**Corrected**:
> "To contain cooling water with leakage not exceeding 100 ml/hr at the mechanical seal during operation"

---

## Building Function Hierarchies

For complex systems, functions exist at multiple levels. Understanding this hierarchy helps ensure completeness.

### System Level
> "To provide cooling water to process heat exchangers at 450-550 m³/hr at minimum 2.5 bar to maintain process temperatures within specification"

### Subsystem Level
> "To transfer cooling water from sump to headers [Pump subsystem]"
> "To remove heat from cooling water [Cooling tower subsystem]"
> "To distribute cooling water to users [Piping subsystem]"

### Equipment Level
> "To convert electrical energy to mechanical rotation at 1470 RPM [Motor]"
> "To convert rotation to fluid kinetic energy [Impeller]"
> "To convert kinetic energy to pressure [Volute]"

### Component Level (used sparingly)
> "To support shaft in radial direction with clearance 0.05-0.10 mm [Bearing]"

**Guidance**: Most RCM analyses work at equipment level. Go to component level only for complex or critical equipment where component-specific maintenance makes sense.

---

## Function Documentation Best Practices

### Use Consistent Verb Vocabulary

| Verb | Typical Use |
|------|-------------|
| To transfer | Moving fluids or materials |
| To convert | Energy conversion |
| To contain | Preventing release |
| To maintain | Keeping a parameter within range |
| To indicate | Providing information |
| To protect | Activating on abnormal conditions |
| To support | Structural functions |
| To isolate | Separating systems |
| To regulate | Controlling parameters |
| To store | Holding materials or energy |

### Number Functions Systematically
- F1, F2, F3... or
- 1.1, 1.2, 1.3 for hierarchical numbering

### Link to Sources
Document where performance standards came from:
- Process design basis (document number)
- P&ID or control philosophy
- Manufacturer specifications
- Operating procedures
- Regulatory requirements

### Review with Operators
They'll catch missing functions and challenge impractical standards.

---

## Expert Tips: Functions

**Start broad, then refine.** First pass: capture all functions you can think of. Second pass: quantify and clarify. Third pass: verify with operators and engineers.

**Ask "what would we lose?"** If this function failed, what capability would we lose? If you can't articulate the loss, maybe it's not a real function.

**Don't confuse function with description.** "100 kW motor" is description. "To convert electrical energy to rotational energy at 1470 RPM with 75 kW useful output" is function.

**Challenge inherited functions.** If previous analysis listed a function, verify it's still valid. Operating context changes; functions evolve.

**Consider what's NOT written.** Environmental and containment functions are often assumed but not documented. Make them explicit.
    `,
    keyTakeaways: [
      'Every function needs three elements: verb, object, and quantified performance standard',
      'Functions fall into categories: primary (why it exists), secondary (additional requirements), and protective (activated on abnormal conditions)',
      'Hidden functions are not evident under normal operation and require failure-finding tasks',
      'Performance standards must be quantified and linked to actual operational needs',
      'Function hierarchies help ensure completeness from system down to equipment level',
    ],
    quiz: [
      {
        question: 'What are the three essential elements of a function statement?',
        options: [
          'Equipment name, maintenance interval, cost',
          'Verb, object, and performance standard',
          'Manufacturer, model number, serial number',
          'Function number, description, owner',
        ],
        correctIndex: 1,
        explanation: 'A complete function statement requires a verb (what action is performed), an object (what it acts upon), and a performance standard (how well it must be performed). Missing any element makes the function incomplete and difficult to analyse.',
      },
      {
        question: 'What distinguishes a hidden function from an evident function?',
        options: [
          'Hidden functions are less important',
          'Hidden functions are inside the equipment',
          'Hidden function failures are not apparent to operators during normal operation',
          'Hidden functions are not documented',
        ],
        correctIndex: 2,
        explanation: 'Hidden function failures are not evident under normal circumstances—they only become apparent when the function is demanded (like a backup system that only runs when the primary fails). This distinction is crucial because hidden failures require failure-finding tasks.',
      },
      {
        question: 'Which is the best example of a properly quantified performance standard?',
        options: [
          'Maintain adequate temperature',
          'Maintain temperature per design requirements',
          'Maintain outlet temperature 35-45°C to prevent product degradation above 50°C',
          'Keep temperature in the acceptable range',
        ],
        correctIndex: 2,
        explanation: 'The best standard is specific (35-45°C), measurable, and linked to why it matters (prevents degradation above 50°C). This gives analysts clear criteria for determining functional failure.',
      },
      {
        question: 'What is a secondary function?',
        options: [
          'A function that only matters during maintenance',
          'A backup function in case the primary fails',
          'Additional requirements beyond the primary function, like containment or indication',
          'A function that was added after installation',
        ],
        correctIndex: 2,
        explanation: 'Secondary functions are requirements beyond the main purpose of the equipment—containment (preventing leaks), structural support, indication (gauges), environmental compliance, economy (efficiency), and similar requirements.',
      },
      {
        question: 'Why should you avoid using the equipment name as the verb in a function statement?',
        options: [
          'It\'s grammatically incorrect',
          'It doesn\'t describe what action is actually performed',
          'SAE JA1011 prohibits it',
          'It makes the document too long',
        ],
        correctIndex: 1,
        explanation: '"To pump water" uses the equipment name as a verb but doesn\'t describe the actual action. "To transfer" is clearer. The verb should describe the action (transfer, convert, contain, regulate) not just name the equipment.',
      },
      {
        question: 'At what level should most RCM analyses focus when documenting functions?',
        options: [
          'System level only',
          'Component level for everything',
          'Equipment level, with component level only for complex or critical items',
          'Whatever level has the most detailed documentation',
        ],
        correctIndex: 2,
        explanation: 'Most RCM analyses work at equipment level—this provides enough detail for meaningful maintenance task selection without excessive granularity. Component-level analysis is reserved for complex or critical equipment where component-specific maintenance makes sense.',
      },
    ],
    spotTheErrors: [
      {
        badExample: 'To pump cooling water',
        errors: [
          'No performance standard (how much water? at what pressure?)',
          'Uses equipment name "pump" as verb',
          'No source or destination specified',
        ],
        correctedExample: 'To transfer cooling water from the main sump to heat exchanger headers at 480-550 m³/hr at 2.8-3.2 bar discharge pressure',
      },
      {
        badExample: 'Pump must not leak',
        errors: [
          'Uses equipment name instead of function format',
          '"Must not leak" is unrealistic for mechanical seals',
          'No quantified acceptable limit',
        ],
        correctedExample: 'To contain cooling water with leakage not exceeding 100 ml/hr at the mechanical seal during operation',
      },
    ],
    expertTips: [
      'Start broad, then refine. Capture all functions first, then quantify and verify',
      'Ask "what would we lose?" to identify real functions vs. descriptions',
      'Don\'t confuse function with description—"100 kW motor" is description, not function',
      'Consider what\'s NOT written—containment and environmental functions are often assumed but not documented',
    ],
    commonMistakes: [
      'Omitting performance standards ("to pump water" instead of specifying flow rate and pressure)',
      'Using equipment names as verbs ("to pump" instead of "to transfer")',
      'Ignoring secondary functions like containment, indication, and environmental compliance',
      'Assuming all functions are evident—hidden functions are commonly missed',
      'Setting unrealistic standards ("must not leak" instead of acceptable leakage limits)',
    ],
    reflectionPrompts: [
      'Take a piece of equipment you know well. Can you identify its primary function with a fully quantified performance standard?',
      'What secondary functions does your equipment have that might not be documented?',
      'Does your equipment have any hidden functions? How would you know if they had failed?',
    ],
  },
  {
    id: 3,
    slug: 'functional-failure-analysis',
    title: 'Functional Failure Analysis',
    subtitle: 'Identifying every way equipment can fail to meet its functions',
    duration: '40-50 min',
    content: `
## From Functions to Functional Failures

With functions precisely defined, we can now identify functional failures—the states where the equipment is no longer meeting its required performance standards.

This sounds straightforward, but it's where many analyses go wrong. Miss a functional failure and you'll miss all the failure modes that cause it. Include irrelevant failures and you'll waste analysis time.

---

## What Is a Functional Failure?

A functional failure is a state where the equipment is unable to fulfil a function to the required performance standard within the specified operating context.

**Key insight**: Functional failure is about the state, not the cause. The cause is the failure mode (which we'll cover in the next module).

For the function:
> To transfer cooling water at 480-550 m³/hr at 2.8-3.2 bar discharge pressure

Functional failures include:
- Unable to transfer any cooling water (total failure)
- Transfers less than 480 m³/hr (insufficient flow)
- Transfers more than 550 m³/hr (excessive flow—yes, this can be a failure)
- Discharge pressure below 2.8 bar (insufficient pressure)
- Discharge pressure above 3.2 bar (excessive pressure)

Notice how the quantified function makes identifying functional failures systematic.

---

## Types of Functional Failure

### Complete Failure vs. Partial Failure

**Complete failure**: The function is entirely lost
> Unable to transfer any cooling water

**Partial failure**: The function is degraded but not completely lost
> Transfers less than 480 m³/hr (but some flow exists)

Both are valid functional failures that need analysis. Don't assume "failure" means complete loss.

### State Failure vs. Rate Failure

**State failure**: The equipment is in a failed state
> Pump will not start

**Rate failure**: The equipment performs below required rate
> Pump delivers only 350 m³/hr (below required 480 m³/hr minimum)

### Continuous Failure vs. Intermittent Failure

**Continuous failure**: The failed state persists
> Pump runs but consistently delivers low pressure

**Intermittent failure**: The failure comes and goes
> Pump occasionally trips on high vibration, then restarts normally

Intermittent failures are often the most difficult to diagnose—but they still need analysis.

---

## Functional Failure Notation

A systematic notation helps ensure completeness. Common approaches:

### Letter/Number System
- F1 = Function 1
- FF1A = Functional Failure A of Function 1
- FF1B = Functional Failure B of Function 1

### Descriptive Approach
Each functional failure is a complete sentence describing the failed state.

### Matrix Approach

| Function | Functional Failure |
|----------|-------------------|
| F1: Transfer cooling water at 480-550 m³/hr at 2.8-3.2 bar | FF1A: Unable to transfer any cooling water |
| | FF1B: Transfers less than 480 m³/hr |
| | FF1C: Delivers pressure below 2.8 bar |
| F2: Contain cooling water with leakage ≤100 ml/hr | FF2A: Leakage exceeds 100 ml/hr |
| | FF2B: Major leak / loss of containment |

---

## Deriving Functional Failures Systematically

For each function, ask:

**1. Can the function be completely lost?**
This gives you total/complete failures.

**2. Can the function be partially lost?**
This gives you degraded performance failures.

**3. Can the function be exceeded?**
Over-performance can also be a failure (excessive pressure, too much flow, etc.)

**4. Can the function fail intermittently?**
Intermittent failures are often missed.

**5. Can the function fail in a way that creates a hazard?**
Safety-related failures may differ from operational failures.

### Worked Example

**Function**: To indicate discharge pressure (0-6 bar) via local gauge with accuracy ±0.1 bar

**Functional Failures**:
1. Does not indicate any pressure (complete failure—gauge reads zero regardless of actual pressure)
2. Indicates incorrect pressure—reading high (accuracy outside ±0.1 bar, overstates pressure)
3. Indicates incorrect pressure—reading low (accuracy outside ±0.1 bar, understates pressure)
4. Indication unreadable (damaged dial, fogged glass, obscured)

**Note**: We distinguish reading high vs. reading low because the consequences may differ (operator responses differ), and the failure modes are different.

---

## Functional Failures for Protective Functions

Protective functions are different—they exist to respond to abnormal conditions. Their functional failures require special consideration.

**Function**: To stop the pump automatically if discharge pressure exceeds 5 bar

**Functional Failures**:
1. Fails to stop pump when pressure exceeds 5 bar (protection not provided)
2. Stops pump when pressure is below 5 bar (spurious trip)

Both failures matter:
- Failure to protect: Safety/equipment consequence
- Spurious trip: Operational consequence (unnecessary shutdown)

The failure modes causing each are different, and the maintenance tasks may differ.

---

## Complete vs. Partial: When to Separate

**Separate when**:
- The consequences differ significantly
- The failure modes differ
- Different maintenance tasks would apply

**Combine when**:
- The difference is trivial
- The same failure modes cause both
- The same maintenance approach addresses both

**Example—Separating makes sense**:
- Complete pump failure (no flow) → immediate process shutdown
- Partial pump failure (reduced flow) → degraded operation, gradual overheating

**Example—Combining makes sense**:
- Pump delivers 475 m³/hr (just below 480 minimum)
- Pump delivers 470 m³/hr
- Pump delivers 460 m³/hr

Unless there are step changes in consequence, these can be treated as one functional failure: "Delivers less than required minimum flow."

---

## Documenting Functional Failures

Good documentation includes:

**1. Clear statement of the failed state**
Not the cause, just the state.

**2. Reference to the function**
Which function is this failure related to?

**3. How the failure is evident** (if applicable)
What would operators observe? This helps distinguish evident from hidden.

**4. Relationship to other failures**
Does this failure affect other functions or systems?

### Example Documentation

| ID | Function | Functional Failure | How Evident | Notes |
|----|----------|-------------------|-------------|-------|
| FF1A | F1: Transfer cooling water at 480-550 m³/hr at 2.8-3.2 bar | Unable to transfer any cooling water | No flow indication, pressure drop, downstream temperature rise | May indicate multiple failure modes |
| FF1B | F1: Transfer cooling water at 480-550 m³/hr at 2.8-3.2 bar | Transfers less than 480 m³/hr | Flow indication reduced, gradual temperature rise | Progressive degradation; early detection possible |
| FF1C | F1: Transfer cooling water at 480-550 m³/hr at 2.8-3.2 bar | Discharge pressure below 2.8 bar | Pressure gauge, downstream pressure issues | May occur with or without flow reduction |

---

## Common Pitfalls in Functional Failure Identification

### Pitfall 1: Confusing Failure Modes with Functional Failures

**Wrong**: "Bearing seizure" (This is a failure mode—why the failure happened)
**Right**: "Unable to transfer any cooling water" (This is the functional failure—the state)

### Pitfall 2: Missing Partial Failures

Many analyses only capture complete failures. But partial failures often provide warning time and different maintenance opportunities.

### Pitfall 3: Missing Over-Performance Failures

"Delivers too much" can be as problematic as "delivers too little"—excessive pressure, flow, or temperature can damage downstream equipment or create safety hazards.

### Pitfall 4: Ignoring Intermittent Failures

Intermittent failures are real and often indicate developing problems. They deserve analysis even if "the equipment usually works."

### Pitfall 5: Creating Too Many Similar Failures

If you have functional failures that lead to identical failure mode analysis, they should probably be combined.

---

## Practical Exercise

Take this function:
> To maintain bearing temperature below 80°C during continuous operation

Identify all reasonable functional failures:

**Think before reading the answer...**

**Possible functional failures**:
1. Bearing temperature exceeds 80°C during continuous operation (high temperature failure)
2. Unable to determine bearing temperature (indication failure—if temperature monitoring is part of this function)
3. Bearing temperature reading is inaccurate (if monitoring is included)

Now, if we had a separate function for temperature indication, functional failure 2 and 3 would belong there, not here.

This illustrates why precise function definition matters—it determines where functional failures belong.

---

## Integration with Operating Context

Functional failures must be evaluated within operating context. A failure in one mode may not be a failure in another.

**Example**:
- Function: To start within 10 seconds of demand signal
- Normal operation: Pump runs continuously—this function isn't relevant
- Standby mode: This function matters critically

The functional failure "fails to start within 10 seconds" only applies when the pump is in standby mode. Your analysis should reflect this.

---

## Expert Tips: Functional Failures

**Trace back to requirements.** Every functional failure should clearly relate to a documented function. If you have orphan failures, either the function is missing or the failure is spurious.

**Test completeness with operators.** Ask: "In what conditions would you consider this equipment to have failed?" Their answers often reveal failures you missed.

**Consider consequences early.** While consequence evaluation comes later formally, thinking about "so what?" helps identify whether a functional failure is worth detailed analysis.

**Document the non-obvious.** Hidden functional failures (e.g., backup system unavailable) are easy to miss. Make them explicit.
    `,
    keyTakeaways: [
      'Functional failure is the state of not meeting a function—distinct from failure modes (causes)',
      'Include complete failures, partial failures, over-performance failures, and intermittent failures',
      'Protective functions have two types of failure: fails to protect and spurious activation',
      'Separate functional failures when consequences, failure modes, or maintenance tasks differ',
      'Good documentation links each functional failure to its function and describes how it\'s evident',
    ],
    quiz: [
      {
        question: 'What is the difference between a functional failure and a failure mode?',
        options: [
          'They are the same thing with different names',
          'Functional failure is the failed state; failure mode is what causes that state',
          'Failure mode is more severe than functional failure',
          'Functional failure applies to systems; failure mode applies to components',
        ],
        correctIndex: 1,
        explanation: 'Functional failure describes the state where equipment doesn\'t meet its function (e.g., "unable to transfer water"). Failure mode describes what causes that state (e.g., "bearing seizure"). This distinction is fundamental to RCM.',
      },
      {
        question: 'Why is "excessive flow" a valid functional failure?',
        options: [
          'It\'s not—more output is always better',
          'Only because SAE JA1011 requires it',
          'Because over-performance can damage downstream equipment or create hazards',
          'Only for protective devices',
        ],
        correctIndex: 2,
        explanation: 'Over-performance failures are real—excessive pressure can damage piping, excessive flow can flood systems, excessive temperature can harm products. If the performance standard specifies a maximum, exceeding it is a functional failure.',
      },
      {
        question: 'What are the two types of functional failure for protective functions?',
        options: [
          'Major and minor failures',
          'Electrical and mechanical failures',
          'Fails to protect when needed and spurious activation when not needed',
          'Immediate and delayed failures',
        ],
        correctIndex: 2,
        explanation: 'Protective functions can fail two ways: failing to activate when the abnormal condition occurs (protection not provided) or activating when conditions are normal (spurious trip). Both need analysis because they have different consequences and causes.',
      },
      {
        question: 'When should you separate partial failures from complete failures in your analysis?',
        options: [
          'Always—every level of degradation needs separate analysis',
          'Never—they should always be combined',
          'When consequences, failure modes, or maintenance tasks differ significantly',
          'Only when management requests it',
        ],
        correctIndex: 2,
        explanation: 'Separate functional failures when they lead to different consequences (complete failure causes shutdown; partial allows degraded operation), different failure modes, or different maintenance tasks. Combine when the analysis would be identical.',
      },
      {
        question: 'What is a "state failure" vs. a "rate failure"?',
        options: [
          'State failure is permanent; rate failure is temporary',
          'State failure means the equipment won\'t function at all; rate failure means it performs below required rate',
          'State failure affects states; rate failure affects rates',
          'There is no meaningful difference',
        ],
        correctIndex: 1,
        explanation: 'State failure means the equipment is in a non-functioning state (e.g., pump won\'t start). Rate failure means it\'s functioning but not at the required level (e.g., pump delivers less than required flow). Both are valid functional failures.',
      },
    ],
    expertTips: [
      'Trace back to requirements—every functional failure should relate to a documented function',
      'Test completeness with operators: "When would you consider this equipment failed?"',
      'Consider consequences early—it helps identify whether detailed analysis is warranted',
      'Document hidden functional failures explicitly—they\'re easy to miss',
    ],
    commonMistakes: [
      'Confusing failure modes with functional failures (writing "bearing seizure" instead of "unable to transfer water")',
      'Missing partial failures—only capturing complete loss of function',
      'Missing over-performance failures—assuming "more is always better"',
      'Ignoring intermittent failures that indicate developing problems',
      'Creating too many similar failures that lead to identical analysis',
    ],
    reflectionPrompts: [
      'For a function at your facility, can you identify all the ways it could fail—including partial and over-performance?',
      'Do your protective systems have both types of functional failure documented (fails to protect and spurious activation)?',
      'Have you ever experienced an intermittent failure that was difficult to diagnose? How did you eventually find it?',
    ],
  },
  {
    id: 4,
    slug: 'failure-mode-identification',
    title: 'Expert Failure Mode Identification',
    subtitle: 'Finding all reasonably likely failure modes without analysis paralysis',
    duration: '55-65 min',
    content: `
## The Heart of RCM Analysis

Failure mode identification is where RCM gets real. Up to now, we've been describing what the equipment should do and what constitutes failure. Now we answer: **Why does it fail?**

This is both the most valuable and most challenging part of RCM. Get it right, and your maintenance strategy will be robust. Get it wrong—miss key failure modes or drown in irrelevant ones—and the analysis loses value.

---

## What Is a Failure Mode?

A failure mode is a single event or condition that causes a functional failure.

**Critical attributes**:
- Single event (not multiple events combined)
- Specific enough to identify a maintenance response
- Describes what failed, not just that it failed

### Good Failure Mode Statements

> Bearing fails due to fatigue

> Mechanical seal fails due to dry running

> Impeller erodes due to cavitation

> Control board fails due to capacitor degradation

### Poor Failure Mode Statements

> Pump fails (too vague—dozens of failure modes could cause this)

> Multiple problems occur (not a single event)

> Bearing (just a noun, not a failure mode)

> Maintenance error (too vague—what specific error?)

---

## Sources of Failure Mode Data

No single source is complete. Combine multiple sources for comprehensive identification.

### 1. Equipment History (CMMS/Maintenance Records)

Your own failure history is gold—it reflects your actual operating context.

**Look for**:
- Work orders describing corrective maintenance
- Breakdown reports and root cause analyses
- Repeated repairs on similar equipment
- Near-misses and close calls

**Limitations**: Only shows what HAS failed, not what COULD fail. New equipment has no history.

### 2. Operator and Maintainer Knowledge

Tacit knowledge that isn't in any database. The technician who's worked on that pump for 20 years knows things no manual contains.

**Capture through**:
- Structured interviews
- Analysis team participation
- Walkdowns and discussions at the equipment

**Limitations**: Subject to bias, memory gaps, and "we've always done it this way" thinking.

### 3. Manufacturer Documentation

Manuals, maintenance recommendations, technical bulletins, failure mode listings.

**Valuable for**:
- Design-inherent failure modes
- Recommended inspections and replacements
- Known issues and service bulletins

**Limitations**: Manufacturers don't know your operating context. Their recommendations may be conservative or based on assumptions that don't apply.

### 4. Generic Failure Mode Databases

Industry databases like:
- OREDA (Offshore and Onshore Reliability Data)
- IEEE 493 / IEEE Gold Book (electrical)
- NUREG (nuclear industry)
- Military handbooks (MIL-HDBK-217, NPRD)

**Valuable for**: Comprehensive starting lists, failure rates, industry benchmarks

**Limitations**: Generic data may not reflect your specific conditions. Must be validated for your context.

### 5. Similar Equipment Experience

Experience from other sites, other industries, or similar equipment in different services.

**Valuable for**: Identifying failure modes that haven't occurred at your facility yet

**Limitations**: Operating context differences may make some failure modes more or less relevant.

### 6. Failure Mode and Effects Analysis (FMEA) Literature

Published FMEAs for similar equipment types provide structured failure mode lists.

### 7. Root Cause Analysis Reports

RCA from past failures provides deep insight into specific failure mechanisms.

---

## The "Reasonably Likely" Criteria

You cannot—and should not—analyse every conceivable failure mode. RCM uses the concept of "reasonably likely" to filter the list.

### Include Failure Modes That:

**Have occurred before** on this equipment or similar equipment in similar service

**Are known to occur** in your industry for this equipment type

**Could reasonably occur** given your operating context (environment, duty cycle, process conditions)

**Would have significant consequences** if they occurred, even if probability is low

### Exclude Failure Modes That:

**Are extremely improbable** given your context (e.g., tornado damage in a location with no tornado history)

**Require multiple simultaneous independent failures** (unless you're doing specific fault tree analysis)

**Are already effectively prevented** by inherent design features (e.g., corrosion of stainless steel in fresh water)

**Have never occurred and have no credible mechanism** in your context

### The Judgement Call

"Reasonably likely" requires judgement. When uncertain, ask:
- Would a credible engineer consider this failure mode worth analysing?
- Would excluding it leave a significant gap in the maintenance strategy?
- Has this ever happened anywhere in similar applications?

**When in doubt, include it.** It's better to analyse a failure mode and decide no task is needed than to miss one that causes a significant failure.

---

## Level of Detail: The Goldilocks Zone

Failure modes must be at the right level of detail—specific enough to identify a maintenance task, but not so detailed you're drowning in analysis.

### Too High Level

> "Motor fails"

This could mean dozens of things. Bearing failure? Winding insulation breakdown? Shaft fracture? Cooling system failure? Each has different failure patterns and requires different maintenance.

### Too Detailed

> "Third ball bearing in motor drive-end bearing inner race develops subsurface fatigue crack at 34,000 hours due to inclusion at steel surface initiated by improper heat treatment in manufacturing"

This is metallurgical forensics, not RCM. Way more detail than needed for maintenance task selection.

### Just Right

> "Motor drive-end bearing fails due to fatigue"

This is specific enough to:
- Understand the failure mechanism (fatigue)
- Identify the affected component (drive-end bearing)
- Select appropriate maintenance (vibration monitoring, scheduled replacement, lubrication)

---

## Failure Mode Classification

Organising failure modes by type helps ensure completeness.

### By Failure Mechanism

**Wear**: Progressive material loss (erosion, abrasion, adhesion)
**Fatigue**: Cyclic stress leading to crack initiation and propagation
**Corrosion**: Chemical/electrochemical material degradation
**Overload**: Stress exceeding material limits (fracture, yield)
**Degradation**: Ageing of polymers, insulation, lubricants
**Contamination**: Foreign material affecting function
**Loosening**: Fastener or connection failure
**Blockage/Fouling**: Flow restriction from deposits

### By Cause Category

**Design-related**: Inherent to the equipment design
**Manufacturing-related**: Quality defects from production
**Installation-related**: Problems from installation/commissioning
**Operations-related**: Caused by operating practices
**Maintenance-related**: Caused by maintenance activities (or lack thereof)
**Environmental**: Caused by operating environment

---

## Maintenance-Induced Failure Modes

Special attention: some failure modes are CAUSED by maintenance. These deserve explicit consideration.

### Examples:

> Bearing fails due to contamination introduced during maintenance

> Seal fails due to improper installation

> Fastener fails due to incorrect torque application

> Equipment fails due to wrong parts installed

> System fails due to isolation valve left closed after maintenance

### Why This Matters:

1. These failures may be more frequent than design-inherent failures
2. Prevention requires procedural/training controls, not inspections
3. They often explain why "we just overhauled it and it failed"

---

## Worked Example: Centrifugal Pump Failure Modes

Let's systematically identify failure modes for a centrifugal pump's primary function:

**Function**: Transfer cooling water at 480-550 m³/hr at 2.8-3.2 bar

**Functional Failure**: Unable to transfer any cooling water

**Failure Modes**:

1. Motor fails to start due to electrical supply failure
2. Motor fails to start due to control circuit failure
3. Motor fails due to winding insulation breakdown
4. Motor fails due to bearing failure
5. Coupling fails due to elastomer degradation
6. Coupling fails due to fatigue
7. Shaft fails due to fatigue
8. Impeller fails due to erosion/corrosion
9. Pump bearing fails due to fatigue
10. Pump bearing fails due to lubrication failure
11. Mechanical seal fails catastrophically
12. Casing fails due to corrosion
13. Suction blocked due to strainer fouling
14. Pump seized due to process solidification
15. Pump seized due to foreign object ingestion

**Functional Failure**: Delivers less than 480 m³/hr

**Failure Modes**:

1. Impeller partially worn due to erosion
2. Impeller partially worn due to cavitation damage
3. Wear ring clearance excessive due to erosion
4. Internal recirculation due to damaged gasket
5. Suction partially blocked
6. Air ingress through seal/gasket
7. Incorrect impeller installed (wrong size)
8. Motor running at reduced speed

Notice how functional failure shapes which failure modes are relevant.

---

## Avoiding Analysis Paralysis

Complex equipment can have hundreds of conceivable failure modes. How do you avoid spending months on analysis?

### Strategy 1: Focus on Dominant Failures

Start with failure modes that:
- Have occurred frequently
- Have caused significant consequences
- Are well-known industry issues

These deserve detailed analysis. Less common modes can be handled more quickly.

### Strategy 2: Group Similar Failure Modes

If multiple failure modes have:
- Same failure pattern (detectable/not detectable)
- Same maintenance approach
- Similar consequences

They can be analysed together.

Example: "Bearing fails due to fatigue" and "Bearing fails due to inadequate lubrication" might be grouped if the same vibration monitoring catches both.

### Strategy 3: Use Templates

For common equipment types, start with validated failure mode templates and customise for your context.

### Strategy 4: Set Time Limits

Allocate appropriate time per equipment type. Don't let perfect be the enemy of good.

### Strategy 5: Iterate

First pass: capture obvious failure modes quickly
Second pass: add failure modes from research and discussion
Third pass: refine and finalise with expert review

---

## Expert Tips: Failure Mode Identification

**Think about what's not in the database.** Your CMMS shows what you've repaired. It doesn't show failure modes you've prevented or that haven't occurred yet.

**Interview operators and maintainers separately.** They see different aspects of equipment behaviour and may have different failure mode knowledge.

**Consider startup and shutdown specifically.** Many failure modes occur during transients, not steady-state operation.

**Look at near-misses.** "It almost failed" situations reveal failure modes that might not have made it to formal records.

**Challenge "it never fails."** Long-lived equipment may have hidden age-related degradation that hasn't manifested yet—but will.
    `,
    keyTakeaways: [
      'Failure modes must be single events, specific enough to identify maintenance tasks',
      'Use multiple sources: equipment history, operator knowledge, manufacturer data, generic databases',
      'Apply "reasonably likely" criteria—include failure modes that have occurred, could occur, or would have significant consequences',
      'Level of detail should be right-sized: specific enough for task selection, not metallurgical forensics',
      'Don\'t forget maintenance-induced failure modes—they\'re often more frequent than design failures',
    ],
    quiz: [
      {
        question: 'What makes "pump fails" a poor failure mode statement?',
        options: [
          'It\'s too negative',
          'It\'s too vague—many different failure modes could cause pump failure',
          'Pumps are too reliable to fail',
          'It should use technical terminology',
        ],
        correctIndex: 1,
        explanation: '"Pump fails" could mean bearing failure, seal failure, impeller damage, motor problems, or dozens of other things. Each has different failure patterns and requires different maintenance. A good failure mode is specific enough to identify a maintenance approach.',
      },
      {
        question: 'What is the "reasonably likely" criterion for including failure modes?',
        options: [
          'Only include failure modes that have happened in the last year',
          'Include failure modes that have occurred, could occur in your context, or would have significant consequences',
          'Include every conceivable failure mode regardless of probability',
          'Only include failure modes listed in manufacturer documentation',
        ],
        correctIndex: 1,
        explanation: 'The "reasonably likely" criterion balances completeness with practicality. Include failure modes that have occurred (here or similar equipment), could reasonably occur given your context, or would have significant consequences even if low probability.',
      },
      {
        question: 'Why should maintenance-induced failure modes be explicitly considered?',
        options: [
          'They\'re required by SAE JA1011',
          'They may be more frequent than design failures and require different controls',
          'They\'re easier to analyse',
          'They\'re only relevant for new equipment',
        ],
        correctIndex: 1,
        explanation: 'Maintenance-induced failures (contamination during work, incorrect installation, wrong parts) can be more frequent than inherent failures. They require procedural and training controls rather than inspections, and explain why equipment sometimes fails right after maintenance.',
      },
      {
        question: 'What is the right level of detail for a failure mode?',
        options: [
          'As detailed as possible to capture every mechanism',
          'As brief as possible to save time',
          'Specific enough to identify a maintenance task, but not metallurgical forensics',
          'Whatever level the manufacturer uses',
        ],
        correctIndex: 2,
        explanation: 'Failure mode detail should be "Goldilocks"—specific enough to understand the mechanism and identify appropriate maintenance (e.g., "bearing fails due to fatigue"), but not so detailed you\'re documenting microscopic mechanisms.',
      },
      {
        question: 'Why is equipment history alone insufficient for failure mode identification?',
        options: [
          'CMMS data is always incorrect',
          'It only shows what HAS failed, not what COULD fail',
          'Operators don\'t record failures properly',
          'History is irrelevant to future failures',
        ],
        correctIndex: 1,
        explanation: 'Equipment history shows failures you\'ve experienced—valuable data. But new equipment has no history, and history doesn\'t reveal failure modes that haven\'t occurred yet. Combine history with manufacturer data, generic databases, and expert knowledge.',
      },
      {
        question: 'How can you avoid analysis paralysis when complex equipment has many failure modes?',
        options: [
          'Analyse only the first 10 failure modes',
          'Skip failure mode analysis entirely',
          'Focus on dominant failures, group similar modes, use templates, and set time limits',
          'Hire more analysts',
        ],
        correctIndex: 2,
        explanation: 'Practical strategies include focusing on dominant failure modes (frequent, significant), grouping similar modes that have the same maintenance approach, using validated templates, setting time limits, and iterating through analysis passes.',
      },
    ],
    expertTips: [
      'Think about what\'s NOT in your CMMS—failures you\'ve prevented or that haven\'t occurred yet',
      'Interview operators and maintainers separately—they see different aspects of equipment behaviour',
      'Consider startup and shutdown specifically—many failures occur during transients',
      'Look at near-misses—"it almost failed" situations reveal important failure modes',
    ],
    commonMistakes: [
      'Using vague failure modes like "pump fails" that don\'t identify specific mechanisms',
      'Relying on a single source (history only, or manufacturer only) for failure modes',
      'Including every conceivable failure mode regardless of reasonableness',
      'Missing maintenance-induced failure modes that may be more common than design failures',
      'Getting too detailed—metallurgical forensics instead of maintenance-relevant descriptions',
    ],
    reflectionPrompts: [
      'What sources of failure mode data do you currently use? What sources might you be missing?',
      'Have you experienced failures that occurred right after maintenance? What does that tell you?',
      'For a piece of equipment you know well, can you list 10 reasonably likely failure modes at the right level of detail?',
    ],
  },
  {
    id: 5,
    slug: 'failure-effects',
    title: 'Failure Effects Documentation',
    subtitle: 'Writing complete, useful failure effect descriptions that drive good decisions',
    duration: '40-50 min',
    content: `
## Why Failure Effects Matter

Failure effects answer the question: **What happens when this failure mode occurs?**

This isn't just documentation—it's the evidence base for consequence evaluation and task selection. Poor failure effect descriptions lead to poor decisions. Complete descriptions enable confident maintenance strategy development.

---

## The Elements of a Complete Failure Effect

A complete failure effect description includes:

### 1. Evidence of Failure

What does the operating crew observe? How do they know a failure has occurred?

**Physical evidence**:
- Visible leaks, smoke, discolouration
- Audible changes: noise, alarms, unusual sounds
- Measurable changes: pressure, temperature, flow readings
- System behaviour changes: trips, alarms, shutdowns

**Example**: "Abnormal noise audible from pump housing. Vibration reading increases from normal 2.5 mm/s to >6 mm/s. High vibration alarm activates on local panel and DCS."

### 2. Immediate Effects

What happens right away when the failure occurs?

- Does equipment stop or continue running?
- Is the process affected immediately?
- Are there any automatic responses (trips, alarms)?

**Example**: "Pump continues to run initially. Bearing temperature begins rising. If not addressed, bearing seizure occurs within 2-8 hours causing immediate pump trip."

### 3. Secondary Effects

What damage or impacts result from the failure?

- Damage to other components
- Damage to downstream equipment or process
- Production impacts
- Safety hazards created
- Environmental releases

**Example**: "If bearing seizure occurs, shaft damage likely. Seal may be compromised by shaft deflection, causing secondary leak. Motor may sustain damage from locked rotor condition."

### 4. Repair/Recovery Requirements

What's needed to restore function?

- Actions required to restore
- Resources needed (parts, tools, personnel)
- Typical repair time
- Any special requirements

**Example**: "Requires pump shutdown and isolation. Bearing replacement takes 4-6 hours with parts available. If shaft damaged, lead time for new shaft 2-3 weeks. May require motor rewind if locked rotor damage occurred."

---

## Writing Good Failure Effects

### Be Specific, Not Vague

**Poor**: "Pump stops working"
**Good**: "Flow indication drops to zero. Low flow alarm activates within 30 seconds. Downstream heat exchanger temperature rises above setpoint within 5 minutes, triggering high temperature alarm."

### Include Timing Information

**Poor**: "Temperature rises"
**Good**: "Heat exchanger outlet temperature rises approximately 2°C per minute until protective shutdown at +15°C above setpoint (approximately 7-8 minutes from failure)"

### Describe the Full Cascade

Many failures have cascading effects. Trace the full sequence:

1. Initial failure symptom
2. Process response
3. Operator/automatic actions
4. Secondary effects if not addressed
5. Ultimate consequence

### Distinguish What IS Evident from What ISN'T

This is crucial for consequence classification:

**Evident failure**: "Leak visible at seal housing. Drip tray collects leakage. Operators observe during routine rounds."

**Hidden failure**: "No indication of failure under normal operation. Backup pump failure only evident when primary pump fails and backup fails to start automatically."

---

## Failure Effects for Different Failure Types

### Gradual Degradation

**Pattern**: Performance deteriorates over time

**Effect description focus**:
- How degradation manifests
- Rate of change (how quickly does it worsen?)
- At what point does it cross functional failure threshold?
- Early warning indicators

**Example**:
> "Pump flow gradually decreases as impeller erodes. Reduction approximately 2-3% per month under current operating conditions. Operators may notice higher motor current for same flow setpoint. When flow drops below 480 m³/hr minimum, downstream temperature control becomes marginal. Vibration character may change as impeller wear becomes asymmetric."

### Sudden Failure

**Pattern**: Little or no warning before functional failure

**Effect description focus**:
- Immediate symptoms
- How quickly does the impact occur?
- Automatic responses
- Immediate hazards

**Example**:
> "Coupling failure results in immediate loss of power transmission. Pump stops instantly. No prior warning unless periodic coupling inspection performed. Motor continues to run until operator stops or motor protection trips on under-load. Impact noise may be heard at moment of failure."

### Intermittent Failure

**Pattern**: Failure occurs sporadically

**Effect description focus**:
- What triggers the intermittent behaviour
- How the system responds
- How reliability of the function is affected
- Diagnostic challenges

**Example**:
> "Control valve intermittently fails to respond to signal. Erratic process control results. DCS may show valve position deviation alarms. Problem may clear spontaneously, making diagnosis difficult. Typically worsens over time. Root cause often sticking valve stem or positioner calibration drift."

---

## Local vs. System-Wide Effects

Consider effects at multiple levels:

### Local Effects

Impact on the failed equipment itself:
- Damage to the component
- Damage to adjacent components in the same equipment
- Immediate symptoms visible at the equipment

### System Effects

Impact on the broader system:
- Upstream effects (backpressure, flow changes)
- Downstream effects (supply interruption, quality impact)
- Effect on parallel or redundant equipment
- Effect on protective systems

### Plant/Business Effects

Impact on the operation overall:
- Production loss or reduction
- Quality problems
- Delivery impacts
- Revenue impact

**Example—Multi-Level Effects**:

**Local**: "Pump seal fails, causing significant leakage at seal housing. Seal flush system contaminated."

**System**: "Cooling water flow to heat exchanger reduced. Process temperature rises. If backup pump unavailable, heat exchanger must be bypassed or process rate reduced."

**Plant**: "Production rate reduced by approximately 30% if operating on single pump with bypassed heat exchanger. Estimated production loss £5,000-£8,000 per hour."

---

## Quantifying Effects Where Possible

Numbers make effects concrete and enable better decisions.

### Production Impact

**Poor**: "Causes production problems"
**Better**: "Causes 30% reduction in throughput"
**Best**: "Causes 30% reduction in throughput equivalent to £6,000 per hour in lost revenue"

### Repair Time

**Poor**: "Requires repair"
**Better**: "Requires 4-6 hours to repair"
**Best**: "Requires 4-6 hours with parts in stock; 2-3 weeks if shaft replacement needed"

### Failure Development

**Poor**: "Gets worse over time"
**Better**: "Bearing typically fails within 2-48 hours if warning signs ignored"
**Best**: "From first detectable vibration change, bearing typically reaches functional failure in 200-500 operating hours under normal load"

---

## Effects Documentation Format

A structured format ensures completeness:

| Failure Mode | Evidence | Immediate Effect | Secondary Effects | Repair Requirements |
|--------------|----------|------------------|-------------------|---------------------|
| Bearing fails due to fatigue | Increased noise/vibration. Vibration >6 mm/s. High vib alarm. Temperature rise at bearing housing. | Pump continues running initially. Progressive degradation over hours to days. | If unaddressed: seizure, shaft damage, possible seal failure, motor damage | Bearing replacement 4-6 hrs with parts. Shaft replacement adds 2-3 weeks lead time. |

---

## Expert Tips: Failure Effects

**Walk through the scenario mentally.** Close your eyes and imagine the failure happening. What would you see? Hear? What would happen next? This exercise reveals details you might miss.

**Ask operators "then what happens?"** After each step of a failure effect, ask "and then what?" until you reach the full consequence.

**Consider worst case and typical case.** Effects descriptions sometimes focus only on worst case, missing the more common moderate scenario (or vice versa).

**Don't forget the recovery.** How the system returns to normal operation is part of the failure effect story. Does restarting require manual intervention? Priming? Bleeding air?

**Time matters.** How quickly effects develop determines whether intervention is possible. A bearing that fails over days gives warning time; one that fails in seconds doesn't.

---

## Common Mistakes

**Mistake 1: Too brief.** "Pump stops" tells you almost nothing useful.

**Mistake 2: Missing evidence.** How would operators know? If there's no evident sign, it might be a hidden failure.

**Mistake 3: Ignoring secondary damage.** The initial failure is only part of the story; what else gets damaged?

**Mistake 4: Forgetting repair time.** Duration of the outage often matters as much as the fact of failure.

**Mistake 5: Not considering failure progression.** Many failures don't cause instant complete loss—they progress from detectable degradation to functional failure.

---

## Practical Exercise

Write a complete failure effect for this failure mode:

**Failure Mode**: Mechanical seal fails due to dry running (loss of seal flush)

**Think through**:
- What evidence would indicate this failure?
- What happens immediately?
- What secondary damage could occur?
- What's needed to repair?

**Example Answer**:

> **Evidence**: Seal temperature rises rapidly. High seal temperature alarm (if fitted). Visible smoke/steam from seal area may occur. Subsequent visible leakage once seal faces damaged.
>
> **Immediate Effect**: Seal faces begin to wear rapidly. Pump may continue to run initially if leakage is minor. Within minutes, seal face damage becomes severe enough to cause significant leakage.
>
> **Secondary Effects**: If not stopped promptly, shaft sleeve may be damaged by heat. Seal chamber contamination. Process fluid release—volume depends on time to isolation. Potential safety hazard if fluid is hazardous. Potential environmental impact.
>
> **Repair Requirements**: Pump must be isolated and drained. Seal replacement typically 3-4 hours. If shaft sleeve damaged, sleeve replacement adds 2-3 hours. Root cause (loss of flush) must be addressed before restart. Area cleanup may be required.
    `,
    keyTakeaways: [
      'Complete failure effects include evidence, immediate effects, secondary effects, and repair requirements',
      'Distinguish evident failures from hidden failures—this drives consequence classification',
      'Consider effects at local, system, and plant levels',
      'Quantify effects where possible—numbers enable better decisions',
      'Include timing information—how quickly effects develop determines intervention opportunity',
    ],
    quiz: [
      {
        question: 'What are the four elements of a complete failure effect description?',
        options: [
          'Who, what, when, where',
          'Evidence, immediate effects, secondary effects, and repair requirements',
          'Cause, mechanism, consequence, solution',
          'Probability, severity, detectability, risk',
        ],
        correctIndex: 1,
        explanation: 'A complete failure effect includes: evidence (how operators know), immediate effects (what happens right away), secondary effects (cascading damage/impacts), and repair requirements (what\'s needed to restore function).',
      },
      {
        question: 'Why is including timing information in failure effects important?',
        options: [
          'It makes the documentation look more professional',
          'It determines whether intervention is possible before functional failure',
          'It\'s required by SAE JA1011',
          'It helps estimate maintenance costs',
        ],
        correctIndex: 1,
        explanation: 'Timing determines P-F interval. A bearing that degrades over weeks gives time for on-condition maintenance to detect and respond. One that fails in seconds doesn\'t allow time for intervention. This directly affects task selection.',
      },
      {
        question: 'What\'s the difference between local and system-wide effects?',
        options: [
          'Local effects are minor; system-wide effects are major',
          'Local effects are on the failed equipment; system-wide effects impact the broader process',
          'Local effects happen first; system-wide effects happen later',
          'There is no meaningful difference',
        ],
        correctIndex: 1,
        explanation: 'Local effects describe impact on the failed equipment itself (component damage, symptoms at equipment). System-wide effects describe impacts on the broader process (upstream, downstream, parallel systems, production impact).',
      },
      {
        question: 'Why is "pump stops" a poor failure effect description?',
        options: [
          'It\'s grammatically incorrect',
          'It doesn\'t include evidence, secondary effects, or repair requirements',
          'Pumps don\'t actually stop when they fail',
          'It\'s too negative',
        ],
        correctIndex: 1,
        explanation: '"Pump stops" tells you almost nothing useful. It doesn\'t say how operators would know (evidence), what happens next (secondary effects), or what\'s needed to fix it (repair requirements). Complete effects enable proper analysis.',
      },
      {
        question: 'What makes a failure effect indicate a "hidden failure"?',
        options: [
          'The failure is hidden inside the equipment',
          'The failure is not visible to management',
          'There is no evidence of failure apparent to operators during normal operation',
          'The failure is documented in hidden records',
        ],
        correctIndex: 2,
        explanation: 'Hidden failures have no evidence apparent during normal operation. A backup pump failure isn\'t evident until you need the backup. This classification is crucial because hidden failures require failure-finding tasks.',
      },
    ],
    expertTips: [
      'Walk through the scenario mentally—imagine the failure happening and trace what you\'d observe',
      'Ask operators "then what happens?" repeatedly to trace the full cascade',
      'Consider both worst case and typical case—don\'t focus only on extremes',
      'Don\'t forget recovery—how does the system return to normal after repair?',
    ],
    commonMistakes: [
      'Being too brief ("pump stops" tells almost nothing)',
      'Missing evidence of failure (how would operators know?)',
      'Ignoring secondary damage (what else gets damaged?)',
      'Forgetting repair time (how long is the system down?)',
      'Not considering failure progression (degradation before complete failure)',
    ],
    reflectionPrompts: [
      'Pick a recent failure at your facility. Can you describe its complete effect including evidence, immediate effects, secondary effects, and repair requirements?',
      'How long did it take from first symptom to functional failure? Was there time for intervention?',
      'Were there any hidden failures in your systems that you only discovered when the function was demanded?',
    ],
  },
  {
    id: 6,
    slug: 'consequence-evaluation',
    title: 'Consequence Evaluation',
    subtitle: 'Classifying failure consequences to drive appropriate maintenance responses',
    duration: '55-65 min',
    content: `
## Why Consequences Drive Everything

All failure modes are not equal. Some failures could kill someone. Others merely require a minor repair. The consequence category determines:

- How rigorously we must prevent the failure
- What resources are justified for maintenance
- Whether "no scheduled maintenance" is acceptable

This is where RCM becomes a resource allocation tool, not just failure analysis.

---

## The Four Consequence Categories

RCM classifies consequences into four categories, evaluated in a specific sequence:

### 1. Hidden Failure Consequences

**First question**: Is this failure evident to operating personnel during normal operation?

If **NO**, it's a hidden failure with special consequences:
- The failure on its own may have no immediate effect
- Combined with another failure, the consequences multiply
- Protective devices, standby equipment, and backup systems often have hidden failure modes

**Example**: The backup pump has failed, but the primary pump is running fine. There's no indication of the backup failure. If the primary now fails, you have no pumping capability—a much worse consequence than either single failure alone.

**Why hidden failures are dangerous**: They create vulnerability to multiple failure scenarios. The backup exists precisely to protect against primary failure—if the backup has silently failed, that protection is gone.

### 2. Safety and Environmental Consequences

**Second question**: Could this failure on its own (or combined with another failure for hidden functions) cause injury, death, or environmental breach?

**Safety consequences include**:
- Personnel injury or fatality
- Fire or explosion hazard
- Toxic exposure
- Other immediate hazards

**Environmental consequences include**:
- Releases exceeding permit limits
- Contamination of land, water, or air
- Regulatory breaches with environmental impact

**Critical point**: If a failure has safety or environmental consequences, prevention is not optional. You must either find an effective proactive task or redesign to eliminate the hazard.

### 3. Operational Consequences

**Third question**: Does this failure affect production, output, quality, or customer service?

**Operational consequences include**:
- Production loss or reduction
- Product quality problems
- Delivery delays
- Customer service impact

**Economic consideration**: For operational consequences, maintenance tasks must be economically justified—the cost of prevention should be less than the cost of failure.

### 4. Non-Operational Consequences

**Fourth category** (by elimination): Failures where the only consequence is the cost of repair.

The equipment doesn't directly affect production, safety, or environment. Examples:
- Convenience features
- Redundant capacity (if plenty of margin exists)
- Aesthetic functions

**For non-operational consequences**: Run-to-failure is often the most appropriate strategy. Don't spend money preventing failures that don't matter.

---

## The Consequence Evaluation Sequence

The sequence matters because it determines task selection rigour:

**Decision Flow:**

1. Is failure evident? → NO → HIDDEN failure (special handling)
2. Is failure evident? → YES → Could it cause injury/environmental harm?
3. Could it cause injury/environmental harm? → YES → SAFETY/ENVIRONMENTAL (must find task or redesign)
4. Could it cause injury/environmental harm? → NO → Does it affect operations?
5. Does it affect operations? → YES → OPERATIONAL (economic justification)
6. Does it affect operations? → NO → NON-OPERATIONAL (run-to-failure often OK)

---

## Evaluating Hidden Failures In Depth

Hidden failures require careful analysis because their consequences are conditional.

### The Multiple Failure Question

For hidden failures, ask: **What happens if this failure exists AND the function is demanded?**

**Example—Pressure Relief Valve**:
- Function: Relieve pressure at 10 bar to prevent vessel overpressure
- Failure mode: Relief valve fails stuck closed
- Hidden: No indication during normal operation (pressure normally well below setpoint)
- Consequence IF demanded: Vessel overpressurises → potential rupture → serious safety consequence

So a hidden failure of a protective device can have safety consequences when combined with the protected event.

### Categories of Hidden Failures

**Hidden failure with safety consequence**: Failure of protection that could lead to injury or environmental harm if the protected event occurs

**Hidden failure with environmental consequence**: Failure of protection that could lead to environmental breach

**Hidden failure with economic consequence**: Failure of protection or standby that would cause operational impact if the protected event occurs

### Failure-Finding Task Requirement

Hidden failures require **failure-finding tasks**—periodic checks that the hidden function still works. The interval is determined by the acceptable unavailability level and the probability of the protected event.

---

## Safety and Environmental Assessment

For potential safety/environmental consequences, rigorous assessment is required.

### Questions to Answer

1. **What is the hazard?** Define specifically what could go wrong
2. **What is the mechanism?** How does the failure mode lead to the hazard?
3. **What severity?** Minor injury, major injury, fatality, environmental exceedance?
4. **What controls exist?** Are there barriers between failure and consequence?
5. **Could those controls fail too?** Multiple protection layers analysis

### Evaluating Existing Safeguards

Don't assume safeguards will always work. For each safeguard, ask:
- What's its reliability?
- Does it require operator action?
- Is it a hidden function (and thus vulnerable)?
- Is it independent of the failure being analysed?

**Example**:
- Failure mode: High pressure develops in vessel
- Existing safeguard: Pressure relief valve
- But: Relief valve could also be failed (hidden failure)
- Analysis must consider: What if high pressure develops AND relief valve has failed?

### Layer of Protection Analysis (LOPA)

For complex safety scenarios, use structured analysis:

| Protection Layer | Description | Reliability Assumption |
|-----------------|-------------|------------------------|
| Process design | Operating pressure well below design limits | N/A (inherent) |
| Basic process control | Pressure control loop | 0.1 PFD* |
| High pressure alarm | Operator response to alarm | 0.1 PFD |
| Safety shutdown | Automatic trip on very high pressure | 0.01 PFD |
| Relief valve | Mechanical overpressure protection | 0.01 PFD |

*PFD = Probability of Failure on Demand

Multiple independent layers reduce combined probability of failure to consequence.

---

## Economic Consequence Analysis

For operational consequences, economic justification is required.

### The Basic Equation

**Cost of Prevention** vs. **Cost of Failure × Probability of Failure**

If prevention costs less than expected failure costs, the task is economically justified.

### Cost of Failure Includes

- **Direct repair costs**: Parts, labour, contractors
- **Production loss**: Value of lost output during downtime
- **Secondary damage**: Damage to other equipment caused by failure
- **Quality costs**: Scrap, rework, customer returns
- **Overtime and expediting**: Premium costs for urgent repair
- **Reputation/customer impact**: Harder to quantify but real

### Example Calculation

**Failure mode**: Pump bearing failure
**Mean Time Between Failures (without maintenance)**: 3 years
**Average repair cost**: £2,500
**Production loss during repair**: 8 hours × £1,000/hour = £8,000
**Total cost per failure**: £10,500
**Annual expected cost**: £10,500 ÷ 3 = £3,500/year

**Proposed maintenance**: Annual vibration monitoring
**Annual cost**: £500

**Benefit**: If monitoring prevents 80% of failures:
**Failures prevented**: 0.8 ÷ 3 = 0.27 failures/year
**Avoided cost**: 0.27 × £10,500 = £2,835/year
**Net benefit**: £2,835 - £500 = £2,335/year

**Conclusion**: Economically justified

---

## Multiple Consequence Scenarios

Real failures may have multiple consequences depending on circumstances.

**Example**: Cooling water pump fails
- If backup pump works → Operational consequence (brief switchover disruption)
- If backup pump has also failed → Safety consequence (loss of emergency cooling)

**How to handle**:
1. Analyse the primary consequence (pump failure alone)
2. Recognise the hidden failure potential (backup pump)
3. Ensure hidden failure is separately addressed with failure-finding

---

## Practical Application: Consequence Classification

Let's work through classification for several failure modes:

**Failure Mode 1**: Motor bearing fails due to fatigue
- Evident? Yes—noise, vibration, heat indication before seizure
- Safety/Environmental? No direct hazard from bearing failure
- Operational? Yes—pump stops, process affected
- **Classification**: Operational

**Failure Mode 2**: Relief valve fails stuck closed
- Evident? No—no indication during normal operation
- **Classification**: Hidden
- If demanded? Vessel overpressure could cause rupture → safety
- **Classification**: Hidden with safety consequences

**Failure Mode 3**: Instrument air leak at fitting
- Evident? Yes—audible leak, visible frost if large
- Safety/Environmental? Possibly—loss of instrument air could cause safety system failures
- Must analyse: What fails if instrument air is lost?
- **Classification**: Depends on what the air supplies

**Failure Mode 4**: External light bulb fails (area lighting)
- Evident? Yes—light doesn't work
- Safety/Environmental? Possibly—if lighting required for safe egress
- Operational? If just convenience lighting, no
- **Classification**: Could be safety (emergency lighting) or non-operational (general lighting)

---

## Expert Tips: Consequence Evaluation

**Challenge "it's never happened"**. Low-probability doesn't mean zero-probability. Consider what would happen IF the failure occurred.

**Think like an operator.** Would they notice this failure during normal rounds? If it requires special inspection or test to detect, it's probably hidden.

**Consider time-to-consequence.** A failure that leads to safety consequences in seconds requires different treatment than one that takes hours—the latter may give time for intervention.

**Document your reasoning.** Future analysts need to understand why you classified consequences as you did. Capture the logic, not just the conclusion.

**Be honest about uncertainty.** If you're unsure whether something could cause injury, err on the side of treating it as safety-related until proven otherwise.
    `,
    keyTakeaways: [
      'Consequences are classified in sequence: hidden, then safety/environmental, then operational, then non-operational',
      'Hidden failures require failure-finding tasks because they create vulnerability to multiple failure scenarios',
      'Safety/environmental consequences require either effective proactive tasks or redesign—run-to-failure is not acceptable',
      'Operational consequences require economic justification—cost of prevention vs. cost of failure',
      'Non-operational consequences often justify run-to-failure as the best strategy',
    ],
    quiz: [
      {
        question: 'Why are hidden failures evaluated first in consequence classification?',
        options: [
          'Because they\'re the most common type',
          'Because SAE JA1011 requires this sequence',
          'Because a hidden failure may have no immediate consequence on its own, but serious consequences combined with another failure',
          'Because hidden failures are always the most severe',
        ],
        correctIndex: 2,
        explanation: 'Hidden failures must be identified first because their consequences are conditional—they may have no immediate effect, but combined with the failure they protect against, consequences can be severe. This drives the need for failure-finding tasks.',
      },
      {
        question: 'What makes a failure have "safety consequences"?',
        options: [
          'It affects production',
          'It could cause injury, death, or environmental breach',
          'It costs more than £10,000 to repair',
          'It requires specialized contractors',
        ],
        correctIndex: 1,
        explanation: 'Safety consequences mean the failure could cause personnel injury or fatality, or environmental harm. For these consequences, prevention is not optional—you must find an effective proactive task or redesign.',
      },
      {
        question: 'For operational consequences, what makes a maintenance task "economically justified"?',
        options: [
          'Management approves the budget',
          'The manufacturer recommends it',
          'The cost of prevention is less than the expected cost of failure',
          'The task can be done during normal hours',
        ],
        correctIndex: 2,
        explanation: 'Economic justification means: Cost of Prevention < (Cost of Failure × Probability of Failure). If spending £500/year on monitoring prevents £3,000/year in expected failure costs, the task is justified.',
      },
      {
        question: 'When is "run-to-failure" an acceptable strategy?',
        options: [
          'Never—all failures should be prevented',
          'Only for brand new equipment',
          'When consequences are non-operational and no cost-effective prevention exists',
          'Whenever the maintenance team is too busy',
        ],
        correctIndex: 2,
        explanation: 'Run-to-failure is legitimate for non-operational consequences where the only impact is repair cost, and for operational consequences where prevention costs more than expected failure costs. It\'s a conscious decision, not neglect.',
      },
      {
        question: 'Why must you consider "multiple failure scenarios" for hidden failures?',
        options: [
          'To increase the failure count in reports',
          'Because hidden failures create vulnerability—if the backup has failed silently and then the primary fails, both protections are lost',
          'SAE JA1011 requires multiple scenarios',
          'Hidden failures always involve multiple components',
        ],
        correctIndex: 1,
        explanation: 'Hidden failures (like a backup pump or safety device) provide protection. If they\'ve failed silently and the primary failure or protected event occurs, you lose both—a much worse consequence. Analysis must consider this combined scenario.',
      },
      {
        question: 'What should you do if you\'re uncertain whether a failure could have safety consequences?',
        options: [
          'Assume it\'s non-operational to save analysis time',
          'Treat it as safety-related until proven otherwise',
          'Ask management to decide',
          'Skip that failure mode',
        ],
        correctIndex: 1,
        explanation: 'When uncertain about safety consequences, err on the side of caution. Treat potential safety matters as safety-related until you can demonstrate otherwise. The consequences of under-classifying a safety issue are far worse than over-classifying.',
      },
    ],
    expertTips: [
      'Challenge "it\'s never happened"—low probability doesn\'t mean zero probability',
      'Think like an operator—would they notice this failure during normal rounds?',
      'Consider time-to-consequence—seconds vs. hours makes a huge difference',
      'Be honest about uncertainty—err toward safety-related when unsure',
    ],
    commonMistakes: [
      'Failing to identify hidden failures and their conditional consequences',
      'Assuming existing safeguards always work without analysing their reliability',
      'Accepting run-to-failure for failures with potential safety consequences',
      'Not performing economic analysis for operational consequences',
      'Treating all failures as equally important regardless of consequences',
    ],
    reflectionPrompts: [
      'Do you have hidden failures in protective systems at your facility? How do you verify they still work?',
      'Have you ever experienced a multiple failure scenario where a backup also failed? What happened?',
      'For your maintenance tasks, can you demonstrate economic justification?',
    ],
  },
  {
    id: 7,
    slug: 'proactive-task-selection',
    title: 'Proactive Task Selection',
    subtitle: 'Selecting on-condition, scheduled restoration, and scheduled discard tasks',
    duration: '60-70 min',
    content: `
## Selecting the Right Maintenance Approach

With consequences classified, we now select maintenance tasks. This is where RCM becomes practical—translating analysis into action.

Proactive tasks are those that we perform BEFORE failure to either prevent it or provide warning. There are three types:

1. **On-condition tasks** (predictive maintenance)
2. **Scheduled restoration** (overhaul at fixed intervals)
3. **Scheduled discard** (replace at fixed intervals)

Each has specific criteria for technical feasibility and worth doing. Let's master task selection.

---

## On-Condition Tasks (Predictive Maintenance)

On-condition tasks detect that failure is in progress, with enough warning to act before functional failure occurs.

### How On-Condition Works

Equipment doesn't usually fail instantly. It degrades through stages:
1. **Good as new** — No detectable degradation
2. **Potential failure (P)** — Degradation becomes detectable
3. **Functional failure (F)** — Equipment no longer meets function

The time between P and F is the **P-F interval**—the warning period.

**On-condition maintenance**: Inspect or monitor at intervals shorter than the P-F interval. Detect the problem at point P, then intervene before reaching point F.

### Criteria for On-Condition Tasks

**Technical feasibility**:
1. There must be a clearly definable potential failure condition
2. The P-F interval must be reasonably consistent
3. It must be practical to monitor or inspect at intervals shorter than the P-F interval
4. The net P-F interval (after accounting for detection to action time) must be long enough to take action

**Worth doing** (for operational/non-operational):
5. The cost of the task over time must be less than the cost of failures it prevents

### The P-F Interval in Detail

**What defines P (potential failure)?**
- The earliest point at which degradation can be reliably detected
- Depends on the monitoring technique sensitivity
- Different techniques have different P points

**Example—Bearing Degradation**:
| Detection Method | Typical P-F Interval |
|-----------------|---------------------|
| Ultrasonic (high frequency) | 1-3 months |
| Vibration velocity | 1-6 weeks |
| Infrared thermography | 1-3 weeks |
| Audible noise | 1-7 days |
| Touch temperature | Hours to 1-2 days |

Different techniques detect degradation at different stages—and thus have different P-F intervals.

### Task Interval Selection

**Rule**: Inspection interval ≤ P-F interval ÷ 2

Why half? Because you might inspect just before P, then the next inspection would be at P + interval. If interval = P-F, you'd inspect exactly at F—too late.

**Example**:
- Vibration monitoring P-F interval: 6 weeks
- Recommended interval: ≤ 3 weeks
- If P-F is 1 week, interval must be ≤ 3-4 days

### Common On-Condition Techniques

| Technique | What It Detects | Typical P-F |
|-----------|----------------|-------------|
| Vibration analysis | Rotating equipment degradation | 1-6 weeks |
| Oil analysis | Contamination, wear particles | 2-8 weeks |
| Thermography | Electrical hot spots, insulation | 1-4 weeks |
| Ultrasonic | Leaks, early bearing wear, arcing | 1-12 weeks |
| Visual inspection | Corrosion, leaks, wear, damage | Variable |
| Performance trending | Efficiency, capacity degradation | Weeks-months |
| Pressure testing | Integrity, leak detection | Variable |

---

## Scheduled Restoration (Overhaul)

Scheduled restoration restores capability to a specified standard at fixed intervals.

### How Scheduled Restoration Works

At defined intervals, overhaul or refurbish the equipment regardless of apparent condition. Examples:
- Strip and rebuild gearbox every 5 years
- Rewind motor every 10 years
- Repack valve every 2 years

### Criteria for Scheduled Restoration

**Technical feasibility**:
1. There is an identifiable age at which reliability decreases
2. A sufficiently large proportion of the population survives to that age
3. The task restores the item's ability to withstand future failure to a level acceptable to the owner

**Worth doing** (for operational/non-operational):
- Cost of restoration over time less than cost of failures prevented

### Understanding Age-Related Failure Patterns

Scheduled restoration only works for items with age-related failure—the classic "wear-out" pattern.

**Pattern A (Bathtub curve)**: High early failures, low stable period, increasing failures with age
**Pattern B (Wear-out)**: Low failures initially, increasing with age
**Pattern C (Fatigue)**: Gradually increasing failure rate with age

For these patterns, scheduled restoration at the right age can be effective.

**But most failures aren't age-related.** Research shows only 11% of items show patterns where scheduled overhaul reduces failure probability. For the other 89%, scheduled overhaul may add no value—or even introduce problems.

### When Scheduled Restoration Works

**Good candidates**:
- Items with known wear-out mechanisms (brake pads, clutches)
- Items with documented age-reliability relationships
- Simple items where restoration genuinely restores "good as new"

**Poor candidates**:
- Complex assemblies with many potential failure modes
- Items with random or infant-mortality failure patterns
- Items where overhaul introduces quality risks

---

## Scheduled Discard (Replacement)

Scheduled discard replaces items at fixed intervals regardless of condition.

### How Scheduled Discard Works

At defined intervals, remove and replace the item. The old item is discarded even if it appears fine. Examples:
- Replace seals every 2 years
- Replace elastomeric couplings every 3 years
- Replace batteries every 5 years

### Criteria for Scheduled Discard

Same as scheduled restoration:
1. Identifiable age where reliability decreases
2. Most items survive to that age
3. Economically justified

### Scheduled Discard vs. Restoration

**Use discard when**:
- Replacement is more practical than overhaul
- Item is not repairable
- Restoration labour cost exceeds replacement cost
- Quality of restoration is uncertain

**Use restoration when**:
- Item is repairable and expensive
- Restoration demonstrably restores capability
- Environmental concerns about disposal
- Long lead time for replacement items

---

## Selecting Between Proactive Task Types

When multiple task types could apply, use this hierarchy:

**1. On-condition preferred when**:
- P-F interval is long enough for practical monitoring
- Monitoring technology is mature for this failure mode
- Monitoring is cost-effective

**2. Scheduled restoration/discard when**:
- On-condition not feasible (no detectable warning)
- Age-reliability relationship is well-established
- Task genuinely restores/replaces at-risk items

**Why on-condition is often preferred**:
- Only replaces items that need it (age-based replaces some items that would have lasted longer)
- Provides warning time for planned intervention
- Applicable to random failure patterns (age-based isn't)

---

## Task Selection by Failure Pattern

| Failure Pattern | On-Condition | Scheduled Restoration | Scheduled Discard |
|----------------|--------------|----------------------|-------------------|
| Wear-out (increasing with age) | ✓ If detectable | ✓ If age known | ✓ If age known |
| Random (constant rate) | ✓ If detectable | ✗ No benefit | ✗ No benefit |
| Infant mortality | ✓ After run-in | ✗ May worsen | ✗ May worsen |
| Fatigue (gradual increase) | ✓ Usually possible | ✓ If life known | ✓ If life known |

**Key insight**: For random failure patterns (most common), on-condition is the only proactive option. Scheduled replacement adds no value because failure probability doesn't depend on age.

---

## Worked Example: Task Selection

**Failure mode**: Pump mechanical seal fails due to wear

**Analysis**:

1. **Is there a detectable potential failure?**
   - Yes: Increasing leakage, visible weepage, seal face damage visible on inspection

2. **What's the P-F interval?**
   - Visual leakage detection: P-F approximately 2-4 weeks
   - Seal temperature rise: P-F approximately 1-2 weeks

3. **On-condition task feasible?**
   - Yes: Weekly visual inspection of seal area for leakage
   - Yes: Continuous seal temperature monitoring with alarm

4. **Is there an age-reliability relationship?**
   - Partial: Seals do wear over time, but many fail from process upset, dry running, or installation issues (random causes)

5. **Would scheduled discard work?**
   - Possible but wasteful: Many seals would be replaced unnecessarily
   - Better to monitor and replace when degradation detected

**Selected task**: Weekly visual inspection for seal weepage; continuous temperature monitoring where fitted

---

## Combining Tasks

Sometimes a combination of tasks provides better coverage:

**Example—Rotating Equipment**:
- On-condition: Continuous vibration monitoring for bearing wear
- On-condition: Quarterly oil analysis for lubrication condition
- Scheduled: Annual alignment check
- Scheduled discard: Replace coupling element every 5 years (known elastomer degradation)

Each task addresses different failure modes or provides complementary detection.

---

## Expert Tips: Proactive Task Selection

**Match technique to failure mode.** Vibration monitoring catches bearing wear but not corrosion. Oil analysis catches contamination but not electrical faults. Select the right tool for each failure mode.

**Consider the whole P-F interval.** Detection is only valuable if you can act in time. If P-F is 2 weeks but parts lead time is 8 weeks, you have a problem.

**Don't overdo it.** More monitoring isn't always better. Each additional technique costs money. Focus resources where consequences justify investment.

**Question scheduled tasks.** If proposing scheduled restoration or discard, ask: What evidence do we have that age-related failure occurs? Many scheduled tasks exist because "we've always done it" rather than because they're technically valid.

**Watch for maintenance-induced failures.** Every intervention creates risk of introducing problems. Scheduled tasks should reduce failure risk overall, not just shift it.
    `,
    keyTakeaways: [
      'On-condition tasks detect potential failure with enough warning to act—the P-F interval is key',
      'Task interval should be less than half the P-F interval to ensure detection before functional failure',
      'Scheduled restoration/discard only work for age-related failure patterns—most failures are random',
      'On-condition is preferred when feasible because it only replaces items that need it',
      'Combine tasks when different techniques address different failure modes or provide complementary detection',
    ],
    quiz: [
      {
        question: 'What is the P-F interval?',
        options: [
          'The time between preventive maintenance tasks',
          'The planned failure interval',
          'The time between detectable potential failure (P) and functional failure (F)',
          'The time between failures',
        ],
        correctIndex: 2,
        explanation: 'The P-F interval is the warning period—the time between when degradation becomes detectable (potential failure, P) and when the equipment can no longer perform its function (functional failure, F). On-condition task intervals must be shorter than this.',
      },
      {
        question: 'Why should the inspection interval be at most half the P-F interval?',
        options: [
          'Because SAE JA1011 requires it',
          'To double the number of inspections',
          'Because you might inspect just before P occurs, and need to detect it before F',
          'To reduce workload',
        ],
        correctIndex: 2,
        explanation: 'If interval equals P-F, you might inspect just before P (no detection) and then next inspect at P + interval = F—too late. Half the P-F interval ensures you\'ll detect the problem before it becomes functional failure.',
      },
      {
        question: 'When does scheduled restoration (overhaul at fixed intervals) work?',
        options: [
          'For all failure modes',
          'Only when there\'s an identifiable age where reliability decreases and most items survive to that age',
          'Whenever the manufacturer recommends it',
          'Only for new equipment',
        ],
        correctIndex: 1,
        explanation: 'Scheduled restoration only works for age-related failure patterns. Research shows only about 11% of items exhibit wear-out patterns where scheduled overhaul reduces failure probability. For random failures, it adds no value.',
      },
      {
        question: 'Why is on-condition maintenance often preferred over scheduled replacement?',
        options: [
          'It\'s always cheaper',
          'It\'s required by regulations',
          'It only replaces items that need it, provides warning time, and works for random failure patterns',
          'It requires less skill',
        ],
        correctIndex: 2,
        explanation: 'On-condition maintenance replaces only items showing degradation (not those that would have lasted longer), provides advance warning for planned repair, and works for random failure patterns where scheduled replacement offers no benefit.',
      },
      {
        question: 'For random failure patterns (constant failure rate regardless of age), which proactive task is valid?',
        options: [
          'Scheduled restoration every 5 years',
          'Scheduled discard every 3 years',
          'On-condition monitoring if degradation is detectable',
          'None—random failures cannot be addressed proactively',
        ],
        correctIndex: 2,
        explanation: 'For random failure patterns, age-based tasks (restoration/discard) provide no benefit because failure probability doesn\'t depend on age. On-condition monitoring can still work if there\'s a detectable degradation phase before failure.',
      },
      {
        question: 'What should you consider besides the P-F interval when selecting on-condition tasks?',
        options: [
          'Only the cost of the monitoring equipment',
          'Whether you can act in time—parts lead time, repair resources, planning time',
          'What other sites are doing',
          'The colour of the equipment',
        ],
        correctIndex: 1,
        explanation: 'Detection is only useful if you can act in time. If P-F is 2 weeks but parts take 8 weeks to arrive, you\'ll detect the problem but can\'t prevent failure. Consider the whole chain: detection, decision, planning, parts, and execution.',
      },
    ],
    expertTips: [
      'Match technique to failure mode—vibration for bearings, oil analysis for lubrication, thermography for electrical',
      'Consider the whole P-F interval including detection-to-action time',
      'Don\'t overdo monitoring—focus resources where consequences justify investment',
      'Question scheduled tasks—what evidence shows age-related failure occurs?',
    ],
    commonMistakes: [
      'Setting task intervals longer than the P-F interval',
      'Applying scheduled restoration to random failure patterns (no benefit)',
      'Assuming all failures can be detected by a single monitoring technique',
      'Ignoring parts lead time and repair time when considering P-F intervals',
      'Adding monitoring without considering whether action can be taken in time',
    ],
    reflectionPrompts: [
      'For your key equipment, do you know the P-F intervals for major failure modes?',
      'Are your scheduled overhaul intervals based on evidence of age-related failure, or just tradition?',
      'Do you have monitoring in place that detects degradation but leaves insufficient time to act?',
    ],
  },
  {
    id: 8,
    slug: 'default-actions',
    title: 'Default Actions & Redesign',
    subtitle: 'When proactive maintenance isn\'t the answer',
    duration: '45-55 min',
    content: `
## When Proactive Tasks Don't Apply

For every failure mode, we first look for proactive tasks (on-condition, scheduled restoration, scheduled discard). But sometimes:
- No proactive task is technically feasible
- No proactive task is economically justified
- The failure has special characteristics requiring different approaches

This is where default actions come in.

---

## The Default Action Hierarchy

When no proactive task is selected, the action depends on consequence category:

### Hidden Failures → Failure-Finding

If a hidden failure has no suitable proactive task, a **failure-finding task** is required to periodically check that the hidden function still works.

### Safety/Environmental → Redesign

If a safety/environmental failure has no suitable proactive task, **redesign is mandatory**. You cannot accept these failures through run-to-failure.

### Operational → Run-to-Failure or Redesign

If an operational failure has no cost-effective proactive task:
- **Run-to-failure**: Accept the failure and deal with it when it occurs
- **Redesign**: If run-to-failure is unacceptable even though not safety-related

### Non-Operational → Run-to-Failure

If a non-operational failure has no cost-effective proactive task, **run-to-failure** is usually the appropriate default.

---

## Failure-Finding Tasks

Failure-finding tasks are periodic checks that hidden functions still work. They don't prevent failure—they detect that failure has already occurred (silently).

### Why Failure-Finding Is Different

On-condition: Detects degradation BEFORE failure
Failure-finding: Detects that failure HAS OCCURRED (but wasn't evident)

**Examples**:
- Testing that a backup pump starts when called
- Testing that a pressure relief valve lifts at setpoint
- Testing that an emergency alarm sounds when activated
- Testing that a fire suppression system operates

### Failure-Finding Task Criteria

1. It must be possible to check the function without causing unacceptable consequences
2. The task must actually verify the function (not just check components)
3. The interval must be appropriate for the risk (more on this below)

### Setting Failure-Finding Intervals

The interval is based on acceptable unavailability and the probability of the protected event.

**Basic formula**:

> Failure-Finding Interval = (Reliability of Hidden Function × Acceptable Unavailability × 2) / MTBF of Hidden Function

But this gets complex. For practical purposes:

**For hidden failures with safety consequences**:
- Formal risk analysis determines acceptable unavailability
- Intervals typically short (weekly to monthly for critical devices)
- Multiple protection layers affect calculation

**For hidden failures with operational consequences**:
- Economic analysis determines acceptable unavailability
- Balance cost of testing against cost of unavailability
- Typical intervals: monthly to annually

### Failure-Finding Examples

| Hidden Function | Failure-Finding Task | Typical Interval |
|-----------------|---------------------|------------------|
| Backup pump starts automatically | Function test: simulate primary failure, verify auto-start | Monthly |
| Relief valve opens at setpoint | Pop test or in-situ test with test rig | Annually |
| High level alarm activates | Raise level to alarm point (or simulate) | Quarterly |
| Fire detection and alarm | Planned test activating detectors | Quarterly |
| Emergency shutdown system | Partial trip test with output monitoring | Quarterly |
| Standby generator starts | Start test with load application | Monthly |

### Failure-Finding Considerations

**Can the test cause problems?**
- Testing a relief valve may cause premature seat damage
- Cycling a standby may introduce wear
- False alarms during testing can cause confusion

**Does the test verify the actual function?**
- Testing that a motor runs doesn't verify the pump will prime and deliver flow
- Pushing a test button doesn't verify sensor calibration
- Partial tests may miss some failure modes

**What's the condition after the test?**
- Some tests leave the equipment in a different state
- Ensure proper restoration after testing

---

## Run-to-Failure (Planned Corrective Maintenance)

Run-to-failure means accepting that the failure will occur and dealing with it when it does. This is NOT neglect—it's a conscious decision based on analysis.

### When Run-to-Failure Is Appropriate

**Non-operational consequences**: The only impact is repair cost
- Example: Convenience features, redundant capacity, aesthetic elements

**Operational consequences where prevention isn't economic**:
- Cost of proactive maintenance exceeds expected failure cost
- No technically feasible proactive task exists

### Run-to-Failure Is NOT Appropriate

**Safety/environmental consequences**: Must prevent these failures

**Hidden failures**: Must use failure-finding to verify function

**Failures with unacceptable business impact**: Even if not safety-related, some operational consequences may be intolerable

### Making Run-to-Failure Work

Run-to-failure doesn't mean ignore it. You still need:

1. **Spare parts availability**: If you're accepting failure, be ready to repair quickly
2. **Maintenance procedures**: Know how to repair when failure occurs
3. **Failure recognition**: Operators must recognize when failure has occurred
4. **Response planning**: Know who does what when it fails

---

## Redesign Decisions

Sometimes neither proactive maintenance nor default actions are acceptable. The answer is redesign.

### When Redesign Is Required

**Mandatory**:
- Hidden failures with safety consequences where no task reduces risk sufficiently
- Safety/environmental failures where no proactive task is technically feasible

**Discretionary but advised**:
- Operational failures where consequences are unacceptable but no economic prevention exists
- Repeated failures despite maintenance efforts
- Chronic problems affecting reliability or safety

### Types of Redesign

**Equipment modification**:
- Add redundancy (backup system)
- Change materials (corrosion-resistant)
- Improve design (eliminate failure mechanism)
- Add protection (guards, controls)

**Process modification**:
- Change operating parameters (reduce stress)
- Improve process control (reduce upsets)
- Change process fluid (less corrosive/erosive)

**Operational modification**:
- Change operating procedures
- Add inspections or checks
- Modify startup/shutdown procedures

**Adding monitoring**:
- Install sensors where none existed
- Add alarm systems
- Enable predictive monitoring

### Redesign Considerations

1. **Does it actually solve the problem?** Don't just shift the failure mode elsewhere
2. **What new failure modes does it introduce?** Modifications can create new problems
3. **Is it cost-effective?** Compare redesign cost to ongoing maintenance/failure costs
4. **What's the implementation timeline?** Can you accept current risk until redesign complete?

---

## Combination Strategies

Sometimes the best approach combines multiple strategies:

**Example 1: Belt-and-braces**
- On-condition monitoring to detect degradation
- PLUS scheduled task as backup if monitoring fails
- For high-consequence failures where one approach might miss something

**Example 2: Layered protection**
- Failure-finding on primary protection
- Failure-finding on backup protection
- Combined unavailability acceptable

**Example 3: Run-to-failure with mitigation**
- Accept the failure will occur
- But reduce consequences through spares, training, procedures

---

## Decision Documentation

Document default action decisions clearly:

| Failure Mode | Consequence | Proactive Task? | Default Action | Rationale |
|--------------|-------------|-----------------|----------------|-----------|
| Backup pump fails to start | Hidden (operational) | On-condition not feasible (no degradation indicator) | Failure-finding: Monthly function test | Required for hidden failure; monthly based on availability target |
| Light bulb fails | Non-operational | Not economically justified | Run-to-failure with spares | Low consequence; maintenance cost exceeds prevention value |
| Relief valve fails stuck | Hidden (safety) | Scheduled discard selected (5 years) | Failure-finding between discards: Annual pop test | Safety consequence requires both proactive task and verification |
| Pipe corrodes through | Safety | No feasible proactive task | Redesign: Replace with corrosion-resistant material | Safety consequence; cannot accept failure |

---

## Expert Tips: Default Actions

**Run-to-failure is not failure of RCM.** It's a legitimate outcome for appropriate situations. Document it as a conscious decision.

**Failure-finding tests the function, not the components.** Don't confuse checking that a motor turns with verifying that the backup pump actually delivers flow when the primary fails.

**Consider the full test cycle.** If testing requires shutdown, how often can you actually test? Practical constraints may limit ideal intervals.

**Redesign isn't always expensive.** Sometimes simple changes (better materials, improved procedures) address the problem at low cost.

**Track run-to-failure outcomes.** If failures occur more often or cost more than expected, revisit the decision.

---

## Common Mistakes

**Mistake 1**: Using "monitor and trend" as a catch-all for everything
- Monitoring requires a detectable degradation phase
- If failure is sudden, monitoring doesn't help

**Mistake 2**: Setting failure-finding intervals arbitrarily
- Intervals should reflect acceptable unavailability and risk
- "Annually because that's what we do" isn't analysis

**Mistake 3**: Defaulting to run-to-failure without proper preparation
- Spares, procedures, training, and response planning needed
- Run-to-failure without preparation is just reactive chaos

**Mistake 4**: Avoiding redesign when it's the right answer
- Sometimes maintaining a bad design isn't the answer
- Consider lifecycle cost, not just immediate capital

**Mistake 5**: Forgetting to verify protective systems regularly
- Hidden functions need regular failure-finding
- Assumptions about backup reliability must be validated
    `,
    keyTakeaways: [
      'Default actions depend on consequence category: failure-finding for hidden, redesign for safety, run-to-failure for operational/non-operational where economic',
      'Failure-finding tasks verify that hidden functions still work—they don\'t prevent failure, they detect it',
      'Run-to-failure is a legitimate strategy when properly prepared with spares, procedures, and response planning',
      'Redesign is mandatory for safety failures without effective proactive tasks',
      'Combination strategies provide layered protection for high-consequence failures',
    ],
    quiz: [
      {
        question: 'What is a failure-finding task?',
        options: [
          'A task that prevents failure',
          'A task that detects degradation before failure',
          'A task that checks if a hidden function has already failed',
          'A task that finds the root cause of failure',
        ],
        correctIndex: 2,
        explanation: 'Failure-finding tasks check whether a hidden function still works. Unlike on-condition tasks that detect degradation before failure, failure-finding tasks discover that failure has already occurred (silently).',
      },
      {
        question: 'When is redesign mandatory as a default action?',
        options: [
          'Whenever maintenance costs are too high',
          'For hidden failures with safety/environmental consequences where no other task reduces risk sufficiently',
          'Only when requested by management',
          'When equipment is more than 10 years old',
        ],
        correctIndex: 1,
        explanation: 'Redesign is mandatory when safety or environmental consequences exist and no proactive or failure-finding task can reduce risk to acceptable levels. You cannot simply accept safety-related failures.',
      },
      {
        question: 'What makes run-to-failure appropriate for some failure modes?',
        options: [
          'When consequences are non-operational or operational but prevention isn\'t economically justified',
          'When you don\'t have time for proper analysis',
          'Run-to-failure is never appropriate',
          'Only for new equipment during the warranty period',
        ],
        correctIndex: 0,
        explanation: 'Run-to-failure is legitimate when the only consequence is repair cost (non-operational), or when operational consequences exist but the cost of prevention exceeds the expected cost of failure.',
      },
      {
        question: 'What must be in place for run-to-failure to work effectively?',
        options: [
          'Only good documentation',
          'Spare parts, maintenance procedures, failure recognition, and response planning',
          'Management approval',
          'Nothing—run-to-failure means no planning needed',
        ],
        correctIndex: 1,
        explanation: 'Run-to-failure isn\'t neglect—it\'s planned corrective maintenance. You need spares ready, procedures written, operators able to recognize failure, and a response plan. Without these, run-to-failure becomes reactive chaos.',
      },
      {
        question: 'Why is testing a motor\'s ability to rotate NOT sufficient failure-finding for a backup pump?',
        options: [
          'Because motors never fail',
          'Because failure-finding must verify the actual function (pump delivers flow), not just components',
          'Because it takes too long',
          'Because motors require different tests',
        ],
        correctIndex: 1,
        explanation: 'Failure-finding must verify the function, not just components. A motor might turn, but the pump might not prime, the isolation valve might be closed, or discharge path might be blocked. Test the whole function: "Does backup pump deliver flow when primary fails?"',
      },
      {
        question: 'What determines the interval for a failure-finding task?',
        options: [
          'Whatever is convenient for the maintenance schedule',
          'The manufacturer\'s recommendation',
          'The acceptable unavailability level and the risk of the protected event occurring',
          'Annual is always sufficient',
        ],
        correctIndex: 2,
        explanation: 'Failure-finding intervals are based on how much unavailability is acceptable (considering the probability and consequence of the protected event occurring while the hidden function is failed). This requires analysis, not arbitrary selection.',
      },
    ],
    expertTips: [
      'Run-to-failure is not failure of RCM—it\'s a legitimate documented decision',
      'Failure-finding tests the function, not components—verify the backup pump delivers flow, not just that the motor runs',
      'Consider practical constraints—if testing requires shutdown, how often can you really test?',
      'Track run-to-failure outcomes—if failures cost more than expected, revisit the decision',
    ],
    commonMistakes: [
      'Using "monitor and trend" when there\'s no detectable degradation phase',
      'Setting failure-finding intervals arbitrarily instead of based on risk analysis',
      'Adopting run-to-failure without proper preparation (spares, procedures, training)',
      'Avoiding redesign when it\'s the economically correct long-term answer',
      'Forgetting to verify protective systems regularly',
    ],
    reflectionPrompts: [
      'Do you have failure-finding tasks for your hidden functions? Are the intervals based on risk analysis?',
      'What equipment at your facility runs to failure? Is it a conscious decision with proper preparation?',
      'Have you ever avoided necessary redesign? What were the long-term consequences?',
    ],
  },
  {
    id: 9,
    slug: 'facilitating-analyses',
    title: 'Facilitating RCM Analyses',
    subtitle: 'Leading teams to successful analysis outcomes',
    duration: '50-60 min',
    content: `
## The Human Side of RCM

RCM methodology is rigorous, but it's implemented by people. The success of an RCM analysis depends as much on facilitation skill as on technical knowledge.

A skilled facilitator:
- Keeps the team focused and productive
- Draws out knowledge from all participants
- Manages disagreements constructively
- Ensures the methodology is followed correctly
- Produces high-quality, implementable results

---

## Team Composition

The right team is essential. Too few people means missing perspectives; too many becomes unwieldy.

### Core Team Members

**Facilitator** (1 person)
- Guides the process
- Ensures methodology compliance
- Manages discussion flow
- Documents results (or directs scribe)
- Usually NOT a subject matter expert on this specific equipment

**Operations representative** (1-2 people)
- Knows how the equipment behaves in normal operation
- Understands operating context
- Can identify when function is/isn't being delivered
- Knows startup, shutdown, and abnormal procedures

**Maintenance representative** (1-2 people)
- Knows failure history and patterns
- Understands what's difficult to repair
- Has hands-on knowledge of equipment condition
- Knows parts availability and repair times

**Engineering/Technical representative** (1 person)
- Understands design intent
- Can explain technical failure mechanisms
- Has access to design documentation
- May represent manufacturer knowledge

### Optional Participants

**Management sponsor** (for key decisions)
- Available for decisions requiring authority
- Not present for entire analysis (typically)

**Safety/Environmental specialist** (for relevant systems)
- Assesses safety/environmental consequences
- Ensures regulatory compliance

**Reliability/Maintenance planning** (1 person)
- Understands current maintenance strategy
- Will implement RCM recommendations

### Team Size

**Ideal**: 4-6 people
**Minimum viable**: 3 people (facilitator + operator + maintainer)
**Maximum practical**: 8 people (beyond this, discussions become inefficient)

---

## Session Planning

### Before the Analysis

**1. Select and bound the system**
- Clear boundaries on P&ID
- Agreed-upon scope
- Equipment list

**2. Gather documentation**
- P&IDs and drawings
- Equipment data sheets
- Maintenance history (CMMS reports)
- Operating procedures
- Manufacturer information
- Previous FMEA or RCA reports

**3. Define operating context**
- Document before sessions begin (can refine during)
- Team should review in advance

**4. Prepare participants**
- Brief on RCM methodology
- Explain roles and expectations
- Share pre-reading materials

**5. Logistics**
- Meeting room with projection capability
- Access to CMMS if needed
- Whiteboard for diagrams
- Refreshments (these can be long sessions)

### Scheduling Sessions

**Session duration**: 2-4 hours (longer sessions lose effectiveness)
**Session frequency**: Daily or several per week for momentum; weekly minimum

**Estimate**: For a moderately complex system
- Simple equipment (pump, motor): 4-8 hours
- Complex system (compressor train): 20-40 hours
- Complex process system (reactor section): 40-80 hours

---

## Facilitation Techniques

### Starting Sessions

1. **Set context**: Remind team of objectives and progress
2. **Review previous work**: Summarise where we left off
3. **Preview today's goals**: What we aim to accomplish
4. **Housekeeping**: Breaks, interruptions, time management

### During Analysis

**Keep focus on the right level**
- Pull back discussions that go too detailed
- Push for detail when too vague
- "Is that specific enough to identify a maintenance task?"

**Manage dominant voices**
- Direct questions to quieter participants
- "Sarah, from an operations view, does that match what you see?"
- Rotate who speaks first on different topics

**Handle technical disagreements**
- "Let's capture both perspectives"
- "What information would help resolve this?"
- "Can we test this or get data?"
- Park items that need research

**Maintain pace**
- Time-box difficult discussions
- "We've spent 15 minutes on this failure mode. Let's capture what we have and move on."
- Not everything deserves equal time

**Document in real-time**
- Participants see what's being captured
- Correct misunderstandings immediately
- Builds ownership of results

### Common Facilitation Challenges

**Challenge**: Team member keeps returning to "the way we've always done it"
**Response**: "That's helpful context. Let's apply the RCM criteria and see if the analysis supports that approach or suggests something different."

**Challenge**: Strong opinion not supported by evidence
**Response**: "What evidence or experience supports that? Let's capture both the opinion and the supporting information."

**Challenge**: Perfectionism—endless discussion about details
**Response**: "Is this detail necessary to select the right maintenance task? If not, let's note it and move on."

**Challenge**: Subject matter expert disagrees with methodology
**Response**: "The RCM process requires us to answer these questions in this sequence. Your expertise helps us answer them correctly."

**Challenge**: Low energy, disengaged participants
**Response**: Take a break. Change seating. Ask direct questions. Consider shorter sessions.

---

## Managing Disagreements

Disagreements are normal and valuable—they often reveal important nuances. The facilitator's job is to channel disagreement productively.

### Types of Disagreement

**Data disagreement**: Different information about failure rates, consequences, etc.
- Resolution: Find the data. Review records. Contact manufacturer. Conduct test.

**Interpretation disagreement**: Same data, different conclusions
- Resolution: Apply RCM criteria explicitly. What does the decision logic say?

**Value disagreement**: Different risk tolerances or priorities
- Resolution: Escalate to management. Document both positions.

**Experience disagreement**: Different experiences with the equipment
- Resolution: Understand the context of each experience. Are operating conditions different?

### Structured Disagreement Resolution

1. **Clarify the disagreement**: "Let me make sure I understand. You're saying X, and you're saying Y. Is that right?"

2. **Identify common ground**: "You both agree that... The disagreement is specifically about..."

3. **Understand the basis**: "What leads you to that conclusion? What evidence or experience?"

4. **Seek resolution**: "What would help resolve this? Is there data we can check? Can we test?"

5. **Document if unresolved**: Capture both positions. Note action to resolve. Continue with conservative assumption.

### When to Escalate

Escalate to management when:
- Disagreement involves significant resource commitment
- Resolution requires authority the team doesn't have
- Safety implications where precautionary approach needed
- Impasse that is blocking progress

---

## Quality Assurance

### During Analysis

**Methodology compliance checks**:
- Are functions stated with performance standards?
- Are failure modes at the right level of detail?
- Do failure effects include all required elements?
- Is consequence classification following the sequence?
- Are task selection criteria being properly applied?

**Completeness checks**:
- Have we covered all operating modes?
- Have we considered all function categories (primary, secondary, protective)?
- Have we included maintenance-induced failure modes?
- Have we considered hidden failures?

### After Analysis

**Peer review**:
- Another trained facilitator reviews methodology application
- Subject matter experts review technical content

**Management review**:
- Results consistent with business context?
- Resource implications acceptable?
- Implementation feasible?

**Operator/maintainer validation**:
- Does this reflect their reality?
- Are recommended tasks practical?
- Any concerns about implementation?

---

## Documentation Standards

Good documentation enables:
- Implementation of results
- Future updates as conditions change
- Audit and review
- Knowledge transfer

### Essential Documentation

1. **Operating context document**
2. **System boundary definition** (with diagram)
3. **Equipment/component list**
4. **FMEA worksheets** (functions, failures, modes, effects)
5. **Task selection worksheets** (consequence, task selected, rationale)
6. **Action list** (tasks to implement, responsibilities, timing)
7. **Assumptions register** (what we assumed and why)
8. **Outstanding issues** (unresolved items requiring follow-up)

### Documentation Tips

**Capture rationale, not just conclusions**: Future analysts need to understand WHY decisions were made.

**Be specific enough to act**: "Vibration monitoring" is less useful than "Vibration monitoring quarterly at bearing housings, alarm at 4.5 mm/s, shutdown at 7.1 mm/s."

**Record dissenting views**: If the team didn't fully agree, note the alternative view and the reasons.

**Version control**: Track changes and update dates. RCM is a living document.

---

## Expert Tips: Facilitation

**You're facilitating, not analysing.** Your job is to help the team apply the methodology correctly, not to provide the answers. Ask questions; don't give solutions.

**Create psychological safety.** People must feel safe to admit uncertainty, disagree with seniors, and say "I don't know." Model this yourself.

**Energy management matters.** Schedule complex topics for high-energy times (morning, after breaks). Save routine items for low-energy periods.

**Celebrate progress.** RCM analysis is a marathon. Acknowledge milestones. Show how much ground the team has covered.

**Protect the team's time.** Minimise interruptions. Handle logistics so the team can focus on analysis.
    `,
    keyTakeaways: [
      'Team composition should include operations, maintenance, and engineering perspectives (4-6 people ideal)',
      'Good facilitation keeps focus at the right level, manages dominant voices, and maintains pace',
      'Disagreements are valuable—channel them productively toward resolution or documented alternatives',
      'Document rationale, not just conclusions—future analysts need to understand why decisions were made',
      'Facilitators guide the process; they don\'t provide the answers',
    ],
    quiz: [
      {
        question: 'What is the ideal size for an RCM analysis team?',
        options: [
          '1-2 people for efficiency',
          '4-6 people with diverse perspectives',
          '10-12 people to cover all viewpoints',
          'As many as possible',
        ],
        correctIndex: 1,
        explanation: 'The ideal team is 4-6 people. Smaller teams miss perspectives (operations, maintenance, engineering need representation). Larger teams become unwieldy and discussions lose effectiveness. Maximum practical is about 8.',
      },
      {
        question: 'What is the facilitator\'s primary role during RCM analysis?',
        options: [
          'To provide the technical answers based on their expertise',
          'To guide the team in applying the methodology correctly',
          'To document everything the team says',
          'To make final decisions about task selection',
        ],
        correctIndex: 1,
        explanation: 'The facilitator guides the process and ensures methodology is followed correctly—they don\'t provide the technical answers. They ask questions, manage discussion, and help the team reach conclusions based on RCM principles.',
      },
      {
        question: 'How should a facilitator handle a disagreement between team members?',
        options: [
          'Side with the senior team member',
          'Make the decision themselves',
          'Clarify the disagreement, find common ground, seek evidence, and document if unresolved',
          'Table all disagreements for later',
        ],
        correctIndex: 2,
        explanation: 'Disagreements are valuable. The facilitator should clarify what\'s actually disputed, find common ground, understand the basis for each view, seek evidence to resolve, and document both positions if unresolved. This channels disagreement productively.',
      },
      {
        question: 'Why should RCM documentation capture rationale, not just conclusions?',
        options: [
          'To make documents longer',
          'Because auditors require it',
          'So future analysts understand why decisions were made and can update appropriately',
          'To assign blame if things go wrong',
        ],
        correctIndex: 2,
        explanation: 'Rationale documentation enables future updates. When operating context changes, future analysts need to understand the reasoning behind current tasks to determine if the logic still applies or needs revision.',
      },
      {
        question: 'When should a facilitator escalate disagreements to management?',
        options: [
          'Whenever any disagreement occurs',
          'Never—the team should resolve everything',
          'When disagreement involves significant resources, authority, safety, or creates impasse',
          'Only at the end of the analysis',
        ],
        correctIndex: 2,
        explanation: 'Escalate when the disagreement involves significant resource commitment, requires authority beyond the team, has safety implications requiring precaution, or creates an impasse blocking progress. Most disagreements should be resolved within the team.',
      },
    ],
    expertTips: [
      'You\'re facilitating, not analysing—guide the team, don\'t provide answers',
      'Create psychological safety so people feel safe to admit uncertainty',
      'Energy management matters—schedule complex topics for high-energy times',
      'Celebrate progress—RCM is a marathon, acknowledge milestones',
    ],
    commonMistakes: [
      'Facilitator providing technical answers instead of guiding the team',
      'Allowing dominant personalities to override quieter expertise',
      'Spending equal time on all failure modes regardless of consequence',
      'Inadequate documentation that doesn\'t capture rationale',
      'Sessions too long without breaks (more than 3-4 hours)',
    ],
    reflectionPrompts: [
      'Have you participated in group analysis sessions? What made them effective or ineffective?',
      'How do you typically handle disagreements in technical discussions?',
      'What would help you facilitate an RCM analysis at your facility?',
    ],
  },
  {
    id: 10,
    slug: 'implementation',
    title: 'Implementation & Living Program',
    subtitle: 'Translating analysis into action and sustaining RCM over time',
    duration: '45-55 min',
    content: `
## Analysis Complete—Now What?

An RCM analysis sitting in a filing cabinet (or buried on a shared drive) provides zero value. Implementation is where benefits are realised—or lost.

This module covers translating RCM results into action and building a sustainable program.

---

## Translating Analysis to Action

### From RCM Worksheet to Maintenance Task

RCM analysis produces task recommendations. But these need to become:
- Work orders in your CMMS
- Procedures technicians follow
- Parts in your storeroom
- Skills on your team

### Task Definition Requirements

For each recommended task, define:

**What**: Specific activities to perform
- Not "check pump" but "Inspect seal area for visible leakage, check seal temperature vs. baseline, verify seal flush flow"

**When**: Interval and trigger
- Calendar-based: "Every 3 months"
- Usage-based: "Every 2,000 operating hours"
- Condition-based: "When vibration exceeds 4.0 mm/s"

**How**: Procedure or method
- Step-by-step if complex
- Reference to existing procedures if available
- Training requirements if new technique

**Who**: Skill and qualifications needed
- Operators vs. maintenance
- Special certifications required
- External contractor requirements

**Resources**: What's needed
- Tools and equipment
- Parts and materials
- Time estimate
- Access requirements

### Example Task Translation

**RCM Output**: "On-condition task: Monitor bearing condition via vibration analysis. Interval based on P-F interval of 6 weeks; recommend monthly monitoring."

**CMMS Work Order**:
- Task: Vibration Analysis - Cooling Water Pump P-101
- Equipment: P-101A/B (both pumps)
- Frequency: Monthly
- Duration: 30 minutes per pump
- Procedure: VP-101 Vibration Monitoring Procedure
- Skill: Predictive Maintenance Technician (vibration certified)
- Equipment: Portable vibration analyser
- Measurement points: DE bearing horizontal, vertical, axial; NDE bearing same
- Alarm limits: Alert at 4.5 mm/s, Shutdown at 7.1 mm/s
- Trend baseline: See historian database for normal patterns

---

## Rationalising with Existing Maintenance

RCM doesn't exist in a vacuum. You have existing maintenance programs that need to mesh with RCM recommendations.

### The Rationalisation Process

1. **List RCM-recommended tasks** for the analysed equipment
2. **List current maintenance tasks** for the same equipment
3. **Compare and categorise**:
   - Tasks that align (keep, possibly adjust interval)
   - New tasks from RCM (add)
   - Current tasks not justified by RCM (question—may remove)
   - Gaps where RCM found nothing but current task exists (evaluate)

### Questioning Existing Tasks

Not every current task will survive RCM scrutiny. For tasks not supported by RCM analysis:

**Ask**: What failure mode does this task address?
- If no failure mode identified, why are we doing it?
- Was it added after an incident that's no longer relevant?
- Is it manufacturer recommendation not validated for our context?

**Options**:
- Add the failure mode to analysis if legitimate gap
- Adjust or remove the task if not justified
- Extend interval if task frequency is excessive
- Consolidate with other tasks if duplication exists

### The Difficult Conversation

Removing or reducing maintenance feels risky. Address concerns:
- "We've done this for 20 years"—But what failures did it prevent? Evidence?
- "The manufacturer recommends it"—Our operating context may differ
- "What if something fails?"—RCM considers that; consequences acceptable or addressed differently

---

## Change Management

RCM implementation is change. People resist change even when it's logical.

### Sources of Resistance

**Maintenance teams**: "We know what works. This is just paperwork."
- Address by: Involving them in analysis, explaining rationale, showing how it reduces busywork

**Operations**: "Don't mess with what keeps us running."
- Address by: Showing how RCM protects availability, involving them in consequence evaluation

**Management**: "This costs time and money—what's the payback?"
- Address by: Tracking metrics, demonstrating early wins, showing cost/benefit analysis

### Change Management Tactics

**Involve stakeholders from the start**: People support what they help create

**Communicate clearly**: Why we're doing this, what it means for you, what's changing

**Start with wins**: Pilot on equipment where success is visible

**Celebrate successes**: Share stories of failures prevented, costs saved

**Provide training**: People need skills for new tasks

**Address concerns promptly**: Resistance often stems from legitimate worry—listen and respond

---

## Updating Procedures and Systems

### CMMS Updates

- Create/modify PM work orders
- Adjust frequencies
- Update procedures referenced
- Set up alerts and triggers
- Configure spare parts linkages

### Procedure Updates

- Operating procedures (monitoring by operators)
- Maintenance procedures (task-specific methods)
- Inspection procedures (what to look for)
- Response procedures (what to do when abnormalities found)

### Training Programs

- New monitoring techniques
- Equipment-specific knowledge
- Procedure changes
- RCM methodology awareness (for those who'll update the analysis)

### Spare Parts

- Review spares based on RCM failure mode analysis
- Add parts for new tasks
- Remove parts for eliminated failure modes
- Adjust stock levels based on failure frequency and consequences

---

## Building a Living Program

RCM isn't a one-time project. Conditions change. Equipment ages. Failures provide learning.

### Feedback Mechanisms

**Failure feedback loop**:
1. Failure occurs
2. RCA determines failure mode
3. Check if failure mode was in RCM analysis
4. If yes: Was task being performed? Was it effective?
5. If no: Should this failure mode be added?
6. Update analysis and tasks as needed

**Effectiveness reviews**:
- Are tasks preventing failures?
- Are we finding degradation during inspections?
- What's our failure rate trend?

### Triggers for RCM Update

**Significant failure**: A failure occurs that the analysis should have addressed—review the analysis.

**Operating context change**:
- Production rate changes
- Process modifications
- Environmental changes
- Regulatory changes

**Equipment modification**: Any change to the equipment invalidates assumptions.

**Scheduled review**: Periodic review even without triggers (e.g., every 5 years).

**New information**: Industry developments, manufacturer bulletins, new failure data.

### Age Exploration

For scheduled restoration/discard tasks, track actual condition at replacement:
- Was the replaced item near failure?
- Was significant life remaining?
- Should we extend or shorten the interval?

This "age exploration" optimises task intervals over time.

---

## Metrics and Measurement

Track indicators to demonstrate RCM value and guide improvement.

### Leading Indicators

- Task completion rates (are we doing what we said?)
- Inspection findings (are we finding problems?)
- Condition monitoring alerts (early detection working?)
- Near-misses and degradation catches

### Lagging Indicators

- Unplanned downtime trends
- Maintenance cost per unit output
- Mean Time Between Failures (MTBF)
- Failure rates by failure mode
- PM/CM ratio (preventive vs. corrective)

### Business Impact Indicators

- Production availability
- Quality metrics affected by reliability
- Safety incidents related to equipment failure
- Environmental exceedances

### Demonstrating Value

Build a "reliability story" with:
- Baseline measurements before RCM
- Post-implementation measurements
- Specific examples of failures prevented
- Cost avoidance calculations
- Trend improvements over time

---

## Sustaining Capability

For RCM to provide ongoing value, maintain organisational capability:

### Knowledge Management

- Document analyses thoroughly
- Store in accessible, searchable system
- Link to equipment in CMMS/asset registry
- Include original team members as contacts

### Capability Development

- Train new facilitators
- Maintain trained team member pool
- Refresh training periodically
- Share lessons learned across teams

### Program Governance

- Clear ownership of RCM program
- Review schedule for existing analyses
- Criteria for new analyses
- Resources budgeted for RCM activities

---

## Expert Tips: Implementation

**Start implementing before analysis is 100% complete.** Don't wait for perfection—start acting on high-confidence recommendations while refining others.

**Quick wins build momentum.** Implement easy, high-visibility changes first to demonstrate value.

**Track everything initially.** When RCM is new, over-document results. You'll need evidence to show value and refine approach.

**Be prepared for the "gotcha" failure.** The first failure after implementing RCM will be scrutinised. Have a response: "RCM predicted this with X consequence, which is what we saw. The task we selected [did/didn't work because...]."

**Build coalitions.** Find RCM champions in operations, maintenance, and engineering. Let them advocate with their peers.
    `,
    keyTakeaways: [
      'RCM tasks must be translated into specific CMMS work orders with what, when, how, who, and resources',
      'Rationalise RCM recommendations with existing maintenance—question tasks not supported by analysis',
      'Change management is critical—involve stakeholders, communicate clearly, start with wins',
      'Build feedback loops so failures drive analysis updates and continuous improvement',
      'Track metrics to demonstrate value and guide program improvement',
    ],
    quiz: [
      {
        question: 'What must be defined for each RCM-recommended task to enable implementation?',
        options: [
          'Just the task name and interval',
          'What, when, how, who, and resources required',
          'Only the failure mode it addresses',
          'The cost justification',
        ],
        correctIndex: 1,
        explanation: 'Full task definition includes: What (specific activities), When (interval/trigger), How (procedure/method), Who (skills required), and Resources (tools, parts, time). Without this detail, tasks can\'t be properly implemented.',
      },
      {
        question: 'What should you do with existing maintenance tasks not justified by RCM analysis?',
        options: [
          'Always remove them immediately',
          'Always keep them for safety',
          'Question them—add missing failure modes to analysis, or consider removing/adjusting the task',
          'Double the frequency to be safe',
        ],
        correctIndex: 2,
        explanation: 'Tasks not supported by RCM analysis should be questioned, not automatically removed or kept. The failure mode may have been missed (add it), the task may be unjustified (remove/adjust), or operating context may have changed.',
      },
      {
        question: 'What triggers an update to an existing RCM analysis?',
        options: [
          'Only on the scheduled review date',
          'Significant failures, operating context changes, equipment modifications, or new information',
          'Whenever management requests it',
          'Only when CMMS is upgraded',
        ],
        correctIndex: 1,
        explanation: 'RCM analyses should be updated when significant failures occur, operating context changes, equipment is modified, new information becomes available, or scheduled reviews are due. They\'re living documents, not fixed analyses.',
      },
      {
        question: 'What is "age exploration" in RCM context?',
        options: [
          'Researching equipment age',
          'Tracking actual condition at scheduled replacement to optimise future intervals',
          'Exploring old equipment for spare parts',
          'Documenting equipment history',
        ],
        correctIndex: 1,
        explanation: 'Age exploration tracks the actual condition of items at scheduled replacement. If items have significant life remaining, intervals can be extended. If items are near failure, intervals may need shortening. This optimises task frequency over time.',
      },
      {
        question: 'Why should you start implementing before analysis is 100% complete?',
        options: [
          'To meet project deadlines',
          'Because high-confidence recommendations can provide immediate value while refining others',
          'To test if RCM works',
          'Because analysis is never complete anyway',
        ],
        correctIndex: 1,
        explanation: 'Don\'t wait for perfection. High-confidence recommendations can be implemented immediately, providing value and building momentum. Continue refining other areas in parallel. Perfect is the enemy of good.',
      },
    ],
    expertTips: [
      'Start implementing before analysis is 100% complete—don\'t wait for perfection',
      'Quick wins build momentum—implement easy, high-visibility changes first',
      'Track everything initially—you\'ll need evidence to demonstrate value',
      'Build coalitions with RCM champions in operations, maintenance, and engineering',
    ],
    commonMistakes: [
      'Completing analysis but never implementing results',
      'Implementing RCM tasks without adjusting or removing existing unjustified tasks',
      'Treating RCM as a one-time project rather than a living program',
      'Not tracking metrics to demonstrate value',
      'Ignoring change management—just mandating new tasks without stakeholder buy-in',
    ],
    reflectionPrompts: [
      'What percentage of your RCM recommendations have actually been implemented?',
      'Do you have a process for updating analyses when failures occur or context changes?',
      'Can you demonstrate the value of your maintenance strategy with metrics?',
    ],
  },
  {
    id: 11,
    slug: 'case-studies',
    title: 'Interactive Case Studies',
    subtitle: 'Apply your RCM knowledge to realistic equipment scenarios',
    duration: '90-120 min',
    content: `
## Learn by Doing

Theory is necessary but not sufficient. This module presents four realistic case studies where you'll apply RCM methodology to real-world equipment.

Each case study includes:
- Equipment context and operating conditions
- Analysis decisions you'll make
- Feedback on your choices
- Complete worked solutions

**Work through these actively**—don't just read the solutions. The learning happens in the struggle.

---

## Case Study 1: Centrifugal Cooling Water Pump

### Scenario

You're facilitating an RCM analysis for a centrifugal cooling water pump in a chemical manufacturing plant.

**Equipment**: Horizontal centrifugal pump, 75 kW motor, mechanical seal, rolling element bearings
**Service**: Primary cooling water supply to process heat exchangers
**Operating context**: Continuous operation, outdoor installation, temperate climate
**Backup**: Standby pump (P-101B) auto-starts on low discharge pressure
**Current maintenance**: Quarterly bearing greasing, annual seal replacement, reactive maintenance for other failures

### Part A: Function Definition

Before starting, define the primary function with a proper performance standard.

**Think about**: What must this pump deliver? What parameters matter?

---

**Revealed Answer**:

> To transfer cooling water from the sump to the heat exchanger headers at 450-550 m³/hr at 2.8-3.5 bar discharge pressure

Notice: The function specifies the range (not just minimum), source and destination, and both flow and pressure. This level of precision enables meaningful analysis.

---

### Part B: Failure Mode Analysis

For the functional failure "Unable to transfer any cooling water," identify at least 5 reasonably likely failure modes.

**Think about**: What could cause complete loss of pumping?

---

**Revealed Answer**:

1. Motor fails to start due to electrical supply failure
2. Motor winding fails due to insulation breakdown
3. Motor bearing fails due to fatigue
4. Pump bearing fails due to lubrication failure
5. Mechanical seal fails catastrophically (major leak forces shutdown)
6. Impeller fails due to cavitation erosion (severe case)
7. Shaft fails due to fatigue
8. Coupling fails due to elastomer degradation
9. Suction line blocked (strainer fouling)

These are specific enough to identify maintenance approaches but not excessively detailed.

---

### Part C: Consequence Evaluation

For the failure mode "Pump bearing fails due to lubrication failure":

1. Is this failure evident or hidden?
2. What consequence category applies?

**Think about**: Would operators notice? What happens when it fails?

---

**Revealed Answer**:

1. **Evident**: Yes. Bearing failure produces audible noise, increased vibration, elevated temperature—all observable during normal operation.

2. **Consequence category**: **Operational**
   - Not hidden (evident to operators)
   - Not safety/environmental (bearing failure doesn't directly harm people or environment)
   - Affects operations: pump stops, cooling water supply interrupted, process temperature rises
   - Backup pump auto-starts, so production continues, but single-point vulnerability created

This means we need to find an economically justified proactive task, or run-to-failure may be acceptable.

---

### Part D: Task Selection

For "Pump bearing fails due to lubrication failure," select an appropriate maintenance strategy.

**Consider**:
- Is there a detectable potential failure?
- What's the P-F interval?
- What about scheduled restoration or discard?

---

**Revealed Answer**:

**On-condition task selected**: Vibration monitoring

**Rationale**:
- Bearing degradation produces detectable vibration changes
- P-F interval: Typically 2-8 weeks from first detectable change to functional failure
- Recommended interval: Monthly monitoring (half of minimum P-F)
- Also: Oil/grease analysis can detect lubrication problems early

**Supporting tasks**:
- Lubrication task: Quarterly grease top-up per manufacturer spec
- This reduces probability of lubrication failure mode occurring

**Why not scheduled replacement?**
- Bearings have random failure patterns for many modes (not pure wear-out)
- Vibration monitoring catches problems regardless of failure pattern
- Scheduled replacement would replace many good bearings unnecessarily

---

## Case Study 2: Medium Voltage Motor

### Scenario

You're analysing a 6.6 kV, 500 kW induction motor driving a critical air compressor.

**Equipment**: Medium voltage motor with anti-friction bearings, Class F insulation
**Service**: Main process air compressor—supplies instrument air and process air
**Operating context**: Runs 8,000 hours/year, controlled environment motor room, VFD-driven
**Backup**: None—this is single train. 30-minute UPS for instrument air only.
**Current maintenance**: Annual insulation testing, quarterly vibration check, bearing replacement every 5 years

### Part A: Operating Context Challenge

The current maintenance includes "bearing replacement every 5 years."

**Question**: What additional information would you need to validate whether this is appropriate?

---

**Revealed Answer**:

To validate scheduled bearing replacement, you need:

1. **Evidence of age-related failure**: Do bearings actually fail due to wear at around 5 years? Or is failure random?
   - Review failure history: Were previous bearing failures age-related or random?
   - Check manufacturer data for bearing L10 life calculations

2. **Operating hours vs. calendar time**: 5 years = 40,000 hours at current utilisation. Is the interval based on hours or calendar time?

3. **Previous bearing condition at replacement**: Were bearings showing degradation at 5 years, or significant life remaining?

4. **Alternative detection methods**: Could vibration monitoring catch bearing problems with enough warning to avoid scheduled replacement?

If bearing failures are random (common), scheduled replacement adds no reliability benefit. Condition monitoring would be more effective.

---

### Part B: Hidden Function Identification

This motor has a winding temperature protection system (RTDs connected to motor protection relay that trips on high temperature).

**Question**: What type of function is this, and what special consideration does it require?

---

**Revealed Answer**:

**This is a protective function with hidden failure potential**.

Function: To trip the motor automatically if winding temperature exceeds 130°C

The RTD system can fail (open RTD, faulty relay, incorrect settings) without being evident during normal operation—winding temperature is normally well below trip point.

**If the hidden failure occurs AND motor overheats**:
- Protection doesn't activate
- Motor winding insulation damages
- Potential motor fire
- Consequence: Could be safety (fire) and certainly operational (motor destruction)

**Required action**: Failure-finding task to verify temperature protection still works
- Example: Annual functional test—simulate high temperature, verify trip
- Or: Continuous monitoring—verify RTD readings are reasonable/tracked

---

### Part C: VFD Considerations

The motor is driven by a Variable Frequency Drive (VFD).

**Question**: How does this affect your failure mode analysis compared to a direct-on-line motor?

---

**Revealed Answer**:

VFD introduces additional failure modes not present in direct-on-line motors:

**Motor-side considerations**:
- Bearing currents: VFD waveforms can induce currents through bearings, causing fluting damage
  - May require shaft grounding rings or insulated bearings
  - Increases bearing failure mode frequency
  
- Insulation stress: Voltage spikes from VFD can stress winding insulation
  - May require inverter-duty rated motor
  - Could affect insulation life
  
- Cooling at low speeds: Self-cooled motors lose airflow at low speeds
  - May require supplemental cooling
  - Affects thermal failure modes

**VFD-side failure modes**:
- Power electronics failure (IGBTs, capacitors)
- Control board failure
- Cooling system failure (VFD generates heat)
- Software/programming errors

**Task implications**:
- Vibration monitoring: Include high-frequency (enveloped) analysis for bearing fluting
- Insulation testing: Consider more frequent testing with surge comparison
- Thermal monitoring: Especially at low-speed operation
- VFD maintenance: Include capacitor health, cooling system, firmware updates

---

## Case Study 3: Control Valve

### Scenario

A pneumatic control valve regulates feed flow to a reactor.

**Equipment**: 4" globe valve, pneumatic actuator, positioner, fail-closed on air failure
**Service**: Feed rate control—maintains reactor level and stoichiometry
**Operating context**: Continuous control, frequent modulation, clean process fluid
**Consequences of failure**: Reactor level upset; worst case requires emergency shutdown
**Safety**: Part of Safety Instrumented Function for high reactor level

### Part A: Multiple Failure Types

This valve can fail in several ways. Identify functional failures for both:
1. Normal control function
2. Safety function (fail-closed on loss of air/signal)

---

**Revealed Answer**:

**Control function failures**:
1. Valve fails to respond to control signal (stuck)
2. Valve responds erratically (hunting, sticking, jerking)
3. Valve control accuracy degraded (offset from setpoint, slow response)
4. Valve leaks through when fully closed (pass-through)
5. Valve leaks externally (stem/body leakage)

**Safety function failures** (fail-closed on air failure):
1. Valve fails to close when air supply fails (safety function not achieved)
2. Valve spuriously closes when air supply is normal (spurious trip)

Note: The safety function is HIDDEN during normal operation—air is normally present, so failure to close on air loss isn't evident until tested or demanded.

---

### Part B: Stuck Valve Analysis

For "Valve fails to respond to control signal (stuck)," trace through complete analysis.

---

**Revealed Answer**:

**Failure modes causing stuck valve**:
1. Packing overtightened (excessive friction)
2. Process deposits on stem (fouling)
3. Actuator diaphragm fails (loss of motive force)
4. Positioner fails (no output signal)
5. Tubing blocked or leaking (pneumatic signal lost)
6. Mechanical binding (corrosion, damage)

**Failure effect**:
- Valve position freezes
- Control system increases output trying to move valve
- DCS may alarm on control deviation
- Operator notices process variable deviation
- If no operator intervention: process upset, potential emergency shutdown
- Repair: Requires isolation, may need full valve removal

**Consequence**: Evident, operational (affects reactor control), potentially safety if leads to trip

**Task selection**:
- On-condition: Valve signature testing (partial stroke test, response time check)—detects developing problems
- Interval: Quarterly PST (Partial Stroke Test) with positioner feedback analysis
- Scheduled: Actuator overhaul per manufacturer interval (validates as part of analysis)

---

### Part C: SIF Integrity

The fail-closed function is part of a Safety Instrumented Function.

**Question**: What special requirements apply to hidden safety functions?

---

**Revealed Answer**:

For hidden functions with safety consequences:

**1. Must have failure-finding task**
- Regular proof testing required
- Test must verify actual safety function (valve actually closes on air loss)
- Not just component checks

**2. Test interval determined by SIL requirements**
- SIL (Safety Integrity Level) sets target PFD (Probability of Failure on Demand)
- Test interval affects PFD
- More frequent testing reduces PFD

**3. Proof test must achieve required coverage**
- What percentage of failure modes does the test detect?
- Partial stroke test: ~50-70% coverage
- Full stroke test: ~90%+ coverage
- Complete removal/bench test: ~99%

**4. Documentation requirements**
- Test results recorded
- Failures documented and analysed
- Test due dates tracked
- Overdue tests escalated

**Example for this valve**:
- SIL 1 requirement: PFD < 0.1
- Proof test interval: Annual full stroke test during maintenance window
- Quarterly partial stroke test for trending
- Document all results in SIS register

---

## Case Study 4: Fire Detection System

### Scenario

You're analysing the fire detection system for a process area.

**Equipment**: 20 point-type smoke detectors, 10 heat detectors, fire alarm panel, connection to plant fire system
**Function**: Detect fire conditions and initiate alarm/suppression
**Operating context**: ATEX Zone 2 area, dusty environment
**Current maintenance**: Annual detector cleaning, functional test during fire protection audits

### Part A: Hidden Function Challenge

**Question**: What makes fire detection a particularly challenging example of hidden functions?

---

**Revealed Answer**:

Fire detection is challenging because:

**1. Multiple hidden elements**:
- Each detector could be failed
- Panel electronics could be failed
- Wiring could be damaged
- Suppression activation circuit could be failed
- Power supply could be failed

**2. Testing concerns**:
- Full functional test (actual smoke/heat) risks unwanted activation
- Simulated tests may not verify actual sensing capability
- Area testing is disruptive
- Some failure modes only revealed by real conditions

**3. Environmental degradation**:
- Dusty environment contaminates smoke detectors
- Reduces sensitivity over time (hidden degradation)
- May cause spurious alarms OR missed detection

**4. Success on demand is binary**:
- The system either works when needed or doesn't
- Partial degradation may not be evident
- "Working" during test doesn't guarantee "working" during fire

**5. Consequence of hidden failure + demand**:
- Fire not detected early
- Escalates before suppression activates
- Potential for serious injury, fatality, major asset damage

---

### Part B: Comprehensive Strategy

Design a comprehensive maintenance and testing strategy for this fire detection system.

---

**Revealed Answer**:

**Continuous monitoring** (automated):
- Panel fault monitoring: Any detector or circuit fault generates immediate alarm
- Power supply monitoring: Battery condition, mains supply status
- Ground fault monitoring: Wiring integrity

**Scheduled inspection** (visual):
- Monthly: Visual check of detectors for damage, obstruction, contamination
- Monthly: Panel status check (no fault indications)
- Ensures obvious problems caught early

**Scheduled maintenance** (preventive):
- Annual: Detector cleaning per manufacturer procedure
- Removes contamination that affects sensitivity
- Annual: Battery replacement or capacity test

**Failure-finding tests**:
- Quarterly: Detector sensitivity check (with manufacturer test equipment)
  - Verifies detector responds to appropriate stimulus level
  - Catches sensitivity drift before it causes missed detection

- Semi-annual: Panel functional test
  - Simulate detector activation, verify panel responds
  - Verify alarm transmission to fire brigade/control room
  - Verify outputs activate (suppression, ventilation, etc.)

- Annual: Full system test
  - Test percentage of detectors with realistic stimulus
  - Verify complete chain: detection → alarm → suppression
  - Done during planned outage to minimise disruption

**Documentation**:
- All test results recorded
- Trend detector sensitivity over time
- Track any failures found and corrective action
- Compliance with fire regulations

**Special considerations for Zone 2**:
- Use only ATEX-certified test equipment
- Ensure hot work permits if any ignition sources during testing
- Coordinate with safety department

---

## Key Lessons from Case Studies

1. **Operating context shapes everything**: The VFD-driven motor has different failure modes than a direct-on-line motor. The chemical plant pump operates differently than the same pump in a different service.

2. **Hidden functions need explicit attention**: Protective systems, backup equipment, and safety devices all have hidden failure modes that require failure-finding tasks.

3. **Multiple failure types for same equipment**: A control valve has both control function failures and safety function failures—different analyses needed.

4. **Real-world complexity**: Actual equipment has many interacting failure modes. The case studies illustrate realistic complexity, not textbook simplicity.

5. **Task combinations are normal**: Most equipment ends up with a combination of on-condition monitoring, scheduled tasks, failure-finding tests, and some run-to-failure decisions.
    `,
    keyTakeaways: [
      'Operating context shapes failure modes—VFD-driven motors differ from DOL motors, different services have different risks',
      'Hidden functions (protection, backup systems) require explicit failure-finding tasks',
      'Equipment often has multiple function types requiring separate analysis (control and safety functions)',
      'Real equipment requires combinations of maintenance approaches, not single silver-bullet solutions',
      'Walking through realistic scenarios builds analysis skill better than theory alone',
    ],
    quiz: [
      {
        question: 'In Case Study 1, why is scheduled bearing replacement every 5 years potentially unjustified?',
        options: [
          'Because 5 years is too long',
          'Because bearing failures often have random patterns, where scheduled replacement adds no reliability benefit',
          'Because bearings never fail',
          'Because the manufacturer said so',
        ],
        correctIndex: 1,
        explanation: 'Scheduled replacement only works for age-related failure patterns. Many bearing failures are random (lubrication issues, contamination, installation errors), where failure probability doesn\'t increase with age. Condition monitoring catches problems regardless of pattern.',
      },
      {
        question: 'What makes the motor temperature protection system a hidden function?',
        options: [
          'The RTDs are hidden inside the motor',
          'The protection is invisible',
          'Failure wouldn\'t be evident during normal operation because temperature is normally below trip point',
          'Management hides protection failures',
        ],
        correctIndex: 2,
        explanation: 'The protection only activates when temperature exceeds 130°C. During normal operation (temperature well below setpoint), a failed RTD or relay would not be noticed. The failure is only revealed when protection is demanded—or tested.',
      },
      {
        question: 'For a control valve that\'s also a Safety Instrumented Function, what special testing is required?',
        options: [
          'No special testing needed',
          'Proof testing at intervals determined by SIL requirements, with documented coverage analysis',
          'Just annual calibration',
          'Testing only when it fails',
        ],
        correctIndex: 1,
        explanation: 'SIF components require proof testing at intervals determined by SIL requirements and target PFD. Test coverage (percentage of failure modes detected) must be analysed. Results must be documented in the SIS register.',
      },
      {
        question: 'Why is fire detection system maintenance particularly challenging?',
        options: [
          'Fire detectors are expensive',
          'Multiple hidden elements, testing risks unwanted activation, and environmental degradation affects sensitivity',
          'Fire systems never fail',
          'Only firefighters can work on them',
        ],
        correctIndex: 1,
        explanation: 'Fire detection has many hidden elements (each detector, panel, wiring, power), full testing risks false alarms or system activation, dusty environments degrade detector sensitivity silently, and the consequence of hidden failure during a real fire is severe.',
      },
    ],
    expertTips: [
      'Work through case studies actively—struggle with the questions before reading answers',
      'Real equipment always has more complexity than textbook examples',
      'Multiple function types (control and safety) on the same equipment need separate analysis',
      'Hidden functions are the most commonly missed aspect of RCM analysis',
    ],
    commonMistakes: [
      'Applying scheduled replacement to random failure patterns',
      'Missing hidden functions in protective systems',
      'Treating safety functions the same as operational functions',
      'Underestimating the complexity of real equipment',
      'Not considering how operating context (like VFD) changes failure modes',
    ],
    reflectionPrompts: [
      'How would you approach analysing equipment at your facility that has both control and safety functions?',
      'What hidden functions exist in your critical systems? Are they being tested adequately?',
      'Have you validated that your scheduled replacements address age-related failure patterns?',
    ],
  },
  {
    id: 12,
    slug: 'final-assessment',
    title: 'Final Assessment',
    subtitle: 'Demonstrate your RCM practitioner competency',
    duration: '60-90 min',
    content: `
## Comprehensive Assessment

This final assessment tests your understanding across all modules. You'll need to demonstrate competency in:

- Operating context definition
- Function statement writing
- Failure mode and effects analysis
- Consequence evaluation
- Task selection
- Default actions
- Facilitation and implementation

### Assessment Structure

- **Questions**: 35 questions
- **Passing score**: 80% (28 correct)
- **Time**: Untimed, but expect 60-90 minutes
- **Feedback**: Detailed explanations for all answers

### Tips for Success

1. **Read carefully**: Many questions test precision in RCM terminology
2. **Apply the methodology**: Don't guess—think through the RCM logic
3. **Consider context**: Several questions have context-dependent answers
4. **Use process of elimination**: Rule out clearly wrong answers first

---

## Ready?

The assessment covers everything from Module 1 through Module 11. If you've worked through the course materials and case studies, you're prepared.

**Good luck!**

---

*Note: The actual assessment questions are presented in the interactive quiz component below. Each question includes detailed feedback on the correct answer and common misconceptions.*
    `,
    keyTakeaways: [
      'The assessment tests comprehensive understanding across all RCM practitioner topics',
      'Passing requires 80% (28/35 questions correct)',
      'Questions test both knowledge and application of RCM methodology',
      'Detailed feedback helps identify areas for further study',
      'Successful completion demonstrates readiness to lead RCM analyses',
    ],
    quiz: [
      // Module 1: Operating Context
      {
        question: 'What are the five dimensions of operating context?',
        options: [
          'Cost, quality, delivery, safety, morale',
          'Physical environment, duty cycle, process conditions, performance requirements, regulatory context',
          'Design, operation, maintenance, reliability, availability',
          'Mechanical, electrical, instrumentation, structural, civil',
        ],
        correctIndex: 1,
        explanation: 'The five dimensions are: physical environment (where it operates), duty cycle (how hard and when it works), process conditions (what it handles), performance requirements (what it must deliver), and regulatory context (external requirements). Each dimension affects failure modes and appropriate maintenance.',
      },
      {
        question: 'A pump runs continuously at 85% capacity but experiences quarterly startups after maintenance outages. Why is it important to document the startup mode separately?',
        options: [
          'Startups are more expensive',
          'Different failure modes and stresses occur during startup (thermal transients, seal flush initiation) than during steady-state operation',
          'Manufacturers require it',
          'It\'s only important if startups cause immediate failures',
        ],
        correctIndex: 1,
        explanation: 'Startup mode involves different stresses: thermal gradients, flow instabilities, seal flush initiation, and control system transients. These can cause failure modes that don\'t occur during steady-state operation. Each significant operating mode deserves separate analysis.',
      },
      // Module 2: Functions
      {
        question: 'Which function statement is complete and correct?',
        options: [
          'To pump cooling water to the heat exchangers',
          'Cooling water pump provides water to heat exchangers at adequate flow',
          'To transfer cooling water from the main sump to the heat exchanger headers at 450-550 m³/hr at 2.5-3.0 bar discharge pressure',
          'The pump is designed to deliver 500 m³/hr',
        ],
        correctIndex: 2,
        explanation: 'A complete function has a verb (to transfer), object (cooling water), source/destination (sump to headers), and quantified performance standard (450-550 m³/hr, 2.5-3.0 bar). Options A lacks standards, B uses wrong format and vague standard, D is description not function.',
      },
      {
        question: 'A standby diesel generator must start automatically within 10 seconds of mains failure. What type of function is this?',
        options: [
          'Primary function',
          'Secondary function',
          'Protective function with hidden failure potential',
          'Superfluous function',
        ],
        correctIndex: 2,
        explanation: 'This is a protective function (activates on abnormal condition—mains failure). It has hidden failure potential because during normal operation (mains present), generator starting capability isn\'t tested. Failure would only be evident when mains actually fails.',
      },
      // Module 3: Functional Failures
      {
        question: 'For the function "To maintain bearing temperature below 80°C during continuous operation," which is NOT a valid functional failure?',
        options: [
          'Bearing temperature exceeds 80°C during continuous operation',
          'Unable to determine bearing temperature (if monitoring included)',
          'Bearing fails due to fatigue',
          'Bearing temperature reading is inaccurate (if monitoring included)',
        ],
        correctIndex: 2,
        explanation: '"Bearing fails due to fatigue" is a FAILURE MODE (the cause), not a functional failure (the state). Functional failures describe the state of not meeting the function—like temperature exceeding limits or inability to determine temperature.',
      },
      {
        question: 'A protective relay can fail two ways: not tripping when it should, and tripping when it shouldn\'t. Why must both be analysed?',
        options: [
          'To increase documentation volume',
          'Because they have different consequences (unprotected hazard vs. spurious shutdown) and different failure modes',
          'Only the first failure matters',
          'Regulations require documenting both',
        ],
        correctIndex: 1,
        explanation: 'Both failures matter: "Fails to trip" leaves hazard unprotected (safety consequence). "Spurious trip" causes unnecessary shutdown (operational consequence). Different failure modes cause each, and different maintenance approaches may apply.',
      },
      // Module 4: Failure Modes
      {
        question: 'What makes "pump fails" an inadequate failure mode statement?',
        options: [
          'It\'s too negative',
          'It\'s too vague—many different mechanisms could cause pump failure, each requiring different maintenance',
          'Pumps don\'t fail',
          'It should include the manufacturer name',
        ],
        correctIndex: 1,
        explanation: 'Failure modes must be specific enough to identify appropriate maintenance. "Pump fails" could mean bearing failure, seal failure, impeller damage, motor problems—each with different patterns and maintenance approaches. Better: "Pump bearing fails due to fatigue."',
      },
      {
        question: 'Which of these failure modes is MOST likely to be missing from equipment history databases?',
        options: [
          'Failure modes that have occurred frequently',
          'Failure modes that have been successfully prevented by current maintenance',
          'Failure modes that caused production loss',
          'Failure modes with high repair costs',
        ],
        correctIndex: 1,
        explanation: 'Equipment history shows what HAS failed—not what\'s been prevented. If current maintenance successfully prevents a failure mode, it won\'t appear in failure records. This is why multiple sources (history, manufacturer data, expert knowledge) are needed.',
      },
      {
        question: 'What is the "reasonably likely" criterion for including failure modes?',
        options: [
          'Only include failure modes that occurred in the last 5 years',
          'Include every conceivable failure mode',
          'Include failure modes that have occurred, could occur in your context, or would have significant consequences even if low probability',
          'Only include failure modes listed in manufacturer documentation',
        ],
        correctIndex: 2,
        explanation: 'The "reasonably likely" criterion balances completeness with practicality. Include modes that have occurred (history), could reasonably occur (context), or would have significant consequences if they did occur (even if low probability).',
      },
      // Module 5: Failure Effects
      {
        question: 'A complete failure effect description must include which elements?',
        options: [
          'Just the immediate symptom',
          'Evidence of failure, immediate effects, secondary effects, and repair requirements',
          'Probability and severity',
          'Cost estimate only',
        ],
        correctIndex: 1,
        explanation: 'Complete failure effects include: evidence (how operators know), immediate effects (what happens right away), secondary effects (cascading damage/impacts), and repair requirements (what\'s needed to restore function). This information enables consequence evaluation and task selection.',
      },
      {
        question: 'A failure effect states "Pump vibration increases, leading to bearing failure within 2-6 weeks if unaddressed." What does this timing information tell you?',
        options: [
          'Nothing useful',
          'The P-F interval is 2-6 weeks, which determines appropriate monitoring interval',
          'The failure is unpredictable',
          'No maintenance is possible',
        ],
        correctIndex: 1,
        explanation: 'This describes the P-F interval—time from detectable potential failure (increased vibration) to functional failure (bearing failure). This tells you monitoring intervals should be less than half the minimum (1 week or less) to catch problems in time.',
      },
      // Module 6: Consequences
      {
        question: 'Why are hidden failures evaluated FIRST in consequence classification?',
        options: [
          'Because they\'re most common',
          'Because SAE JA1011 requires it',
          'Because a hidden failure may have no immediate consequence alone, but severe consequences when combined with another failure',
          'Because they\'re easiest to identify',
        ],
        correctIndex: 2,
        explanation: 'Hidden failures must be identified first because their consequences are conditional—they may have no immediate effect, but combined with the failure they protect against, consequences can be severe (e.g., backup pump failed + primary pump fails = no pumping).',
      },
      {
        question: 'A relief valve failure has no immediate consequence during normal operation. It\'s designed to protect against vessel overpressure, which could cause rupture and injury. What is the consequence classification?',
        options: [
          'Non-operational (no immediate consequence)',
          'Operational (affects equipment availability)',
          'Hidden failure with safety consequences',
          'Safety (could cause injury)',
        ],
        correctIndex: 2,
        explanation: 'The relief valve failure is hidden (not evident during normal operation—pressure is normally below setpoint). The consequence when demanded (overpressure occurs + relief valve has failed) is safety (vessel rupture, potential injury). Classification: hidden with safety consequences.',
      },
      {
        question: 'For operational consequences, when is run-to-failure acceptable?',
        options: [
          'Never',
          'When the cost of prevention exceeds the expected cost of failure',
          'Only for new equipment',
          'Whenever convenient',
        ],
        correctIndex: 1,
        explanation: 'For operational consequences, run-to-failure is acceptable when no cost-effective proactive task exists—that is, when the cost of prevention (monitoring, scheduled replacement) exceeds the expected cost of failures (probability × consequence cost).',
      },
      // Module 7: Proactive Tasks
      {
        question: 'What is the P-F interval?',
        options: [
          'Time between preventive maintenance tasks',
          'Time from first detectable potential failure to functional failure',
          'Time between failures',
          'Planned failure interval',
        ],
        correctIndex: 1,
        explanation: 'The P-F interval is the time between potential failure (P)—when degradation first becomes detectable—and functional failure (F)—when the equipment can no longer perform its function. This determines on-condition task intervals.',
      },
      {
        question: 'Why should on-condition task interval be at most half the P-F interval?',
        options: [
          'To double the number of inspections',
          'Because SAE JA1011 requires it',
          'Because you might inspect just before P, and need to catch the failure before F',
          'To reduce costs',
        ],
        correctIndex: 2,
        explanation: 'If inspection interval equals P-F interval, you might inspect just before potential failure occurs (nothing detected) and then not inspect again until after functional failure (too late). Half the P-F interval ensures detection before functional failure.',
      },
      {
        question: 'Scheduled restoration (overhaul) is technically feasible only when:',
        options: [
          'The equipment is expensive',
          'There is an identifiable age where reliability decreases, and most items survive to that age',
          'The manufacturer recommends it',
          'The CMMS is programmed for it',
        ],
        correctIndex: 1,
        explanation: 'Scheduled restoration works only for age-related failure patterns where there\'s a definable wear-out age and most items survive to that age. Only ~11% of equipment shows such patterns. For random failures, scheduled overhaul provides no benefit.',
      },
      {
        question: 'Which failure pattern does NOT benefit from scheduled replacement?',
        options: [
          'Wear-out (increasing failure rate with age)',
          'Random (constant failure rate regardless of age)',
          'Fatigue (gradually increasing failure rate)',
          'Bathtub curve (early failures, stable period, wear-out)',
        ],
        correctIndex: 1,
        explanation: 'Random failures have constant failure rate regardless of age—the item is just as likely to fail tomorrow whether it\'s new or old. Scheduled replacement adds no reliability benefit because age doesn\'t affect failure probability.',
      },
      // Module 8: Default Actions
      {
        question: 'What is a failure-finding task?',
        options: [
          'A task that finds the root cause of failures',
          'A task that detects degradation before failure',
          'A task that checks whether a hidden function has already failed',
          'A task that finds missing parts',
        ],
        correctIndex: 2,
        explanation: 'Failure-finding tasks check whether a hidden function still works. Unlike on-condition tasks (detect degradation before failure), failure-finding tasks discover that failure has already occurred but wasn\'t evident (e.g., testing that backup pump starts).',
      },
      {
        question: 'For a hidden failure with safety consequences, what happens if no proactive task is technically feasible?',
        options: [
          'Run-to-failure is acceptable',
          'Increase inspection frequency',
          'Redesign is mandatory',
          'Document and accept the risk',
        ],
        correctIndex: 2,
        explanation: 'For hidden failures with safety consequences, you cannot simply accept the risk. If no proactive task (on-condition, scheduled, failure-finding) reduces risk sufficiently, redesign is mandatory—change the equipment or process to eliminate or mitigate the hazard.',
      },
      {
        question: 'Run-to-failure requires what to be effective?',
        options: [
          'Management approval only',
          'Spare parts, procedures, failure recognition capability, and response planning',
          'Nothing—run-to-failure means no planning',
          'Just good documentation',
        ],
        correctIndex: 1,
        explanation: 'Run-to-failure isn\'t neglect—it\'s planned corrective maintenance. For it to work, you need: spares available, procedures for repair, operators able to recognise failure, and a response plan. Without preparation, run-to-failure becomes reactive chaos.',
      },
      // Module 9: Facilitation
      {
        question: 'What is the ideal size for an RCM analysis team?',
        options: [
          '1-2 people for efficiency',
          '4-6 people with operations, maintenance, and engineering perspectives',
          '10+ people to capture all viewpoints',
          'Just the facilitator and scribe',
        ],
        correctIndex: 1,
        explanation: 'Ideal is 4-6 people. You need diverse perspectives (operations, maintenance, engineering) but too many people makes discussion unwieldy. Minimum viable is 3 (facilitator + operator + maintainer). Maximum practical is 8.',
      },
      {
        question: 'What is the facilitator\'s primary role?',
        options: [
          'Provide technical answers based on expertise',
          'Document everything the team says',
          'Guide the team in applying RCM methodology correctly',
          'Make final decisions about task selection',
        ],
        correctIndex: 2,
        explanation: 'The facilitator guides the process and ensures methodology compliance—they don\'t provide technical answers (that\'s the team\'s job). They ask questions, manage discussion, and help the team apply RCM principles correctly.',
      },
      {
        question: 'Why is documenting rationale important, not just conclusions?',
        options: [
          'To make documents longer',
          'Because auditors require it',
          'So future analysts understand why decisions were made and can update appropriately when conditions change',
          'To assign blame',
        ],
        correctIndex: 2,
        explanation: 'Rationale enables future updates. When operating context changes, future analysts need to understand WHY current tasks were selected to determine if the logic still applies. Without rationale, analysts may blindly continue inappropriate tasks or change appropriate ones.',
      },
      // Module 10: Implementation
      {
        question: 'What must be defined for each RCM task to enable implementation?',
        options: [
          'Just task name and interval',
          'What, when, how, who, and resources required',
          'Only the failure mode addressed',
          'Cost justification only',
        ],
        correctIndex: 1,
        explanation: 'Full task definition includes: What (specific activities), When (interval/trigger), How (procedure), Who (skills required), and Resources (tools, parts, time). Without this detail, tasks cannot be properly implemented in CMMS or executed correctly.',
      },
      {
        question: 'An existing maintenance task is not supported by RCM analysis. What should you do?',
        options: [
          'Always remove it immediately',
          'Always keep it for safety',
          'Question it—add missing failure mode to analysis if justified, or consider removing/adjusting',
          'Double the frequency',
        ],
        correctIndex: 2,
        explanation: 'Tasks not supported by analysis should be questioned. Either the failure mode was missed (add it to analysis), the task is unjustified (remove/adjust), or context has changed. Don\'t automatically remove or keep—investigate.',
      },
      {
        question: 'What triggers an update to an existing RCM analysis?',
        options: [
          'Only the scheduled 5-year review',
          'Significant failures, operating context changes, equipment modifications, new information',
          'Management requests only',
          'When equipment reaches 10 years old',
        ],
        correctIndex: 1,
        explanation: 'RCM analyses should be updated when: significant failures occur (learn from them), operating context changes (new requirements), equipment is modified (different failure modes), new information emerges (manufacturer bulletins, industry learnings), or scheduled review is due.',
      },
      // Module 11: Case Studies / Application
      {
        question: 'A VFD-driven motor is analysed. Compared to a direct-on-line motor, which additional failure modes should be considered?',
        options: [
          'None—motors are motors',
          'Bearing currents from VFD waveforms, insulation stress from voltage spikes, cooling issues at low speed',
          'Only VFD failures',
          'Only software problems',
        ],
        correctIndex: 1,
        explanation: 'VFDs introduce motor failure modes not present in DOL applications: bearing currents causing fluting damage, voltage spikes stressing insulation, and reduced cooling airflow at low speeds for self-cooled motors. Analysis must consider these context-specific modes.',
      },
      {
        question: 'A control valve is part of a Safety Instrumented Function. What testing requirement applies?',
        options: [
          'Same testing as non-safety valves',
          'Proof testing at intervals determined by SIL requirements, with documented test coverage',
          'No testing needed if valve is new',
          'Testing only when valve fails',
        ],
        correctIndex: 1,
        explanation: 'SIF components require proof testing at intervals based on SIL requirements and target PFD. Test coverage (percentage of failure modes detected by test) must be analysed. Results must be documented. This is additional to any reliability-based maintenance.',
      },
      {
        question: 'In the fire detection case study, why is the system particularly challenging for RCM?',
        options: [
          'Detectors are expensive',
          'Multiple hidden elements, testing risks false activation, environmental degradation affects sensitivity without evident signs',
          'Fire systems are simple',
          'Only specialists can analyse them',
        ],
        correctIndex: 1,
        explanation: 'Fire detection has many hidden functions (each detector, panel, wiring could be silently failed). Full testing risks unwanted activation. Dust degrades detector sensitivity without obvious indication. The combined effect of hidden failure + real fire is catastrophic.',
      },
      // Comprehensive Questions
      {
        question: 'You\'re analysing a standby pump that auto-starts on low pressure. The pump hasn\'t run in 6 months. What\'s your primary concern?',
        options: [
          'The pump is wearing out from age',
          'Hidden failure—the pump may not start when needed, and we\'d have no indication until the primary fails',
          'The pump needs lubrication',
          'The motor is overheating',
        ],
        correctIndex: 1,
        explanation: 'Standby equipment has hidden functions—failure isn\'t evident during normal operation. The pump could have failed (stuck, seized, control circuit fault) without indication. When the primary fails and backup is called, it might not start. Failure-finding testing is essential.',
      },
      {
        question: 'An operator says "we\'ve replaced this pump\'s bearings every 2 years for 20 years and never had a failure." What should you conclude?',
        options: [
          'The 2-year interval is correct',
          'The task is effective because there are no failures',
          'The interval may be too short—bearings might last longer. Age exploration could optimise it.',
          'The task should be eliminated',
        ],
        correctIndex: 2,
        explanation: 'No failures might mean the interval is correct—or too conservative. Were replaced bearings near failure, or with significant life remaining? "Age exploration" (examining replaced bearings) would show whether interval could be extended, saving unnecessary replacements.',
      },
      {
        question: 'For an on-condition vibration monitoring task with a P-F interval of 8 weeks, what monitoring interval should be used?',
        options: [
          '8 weeks',
          '4 weeks or less (half the P-F interval)',
          '16 weeks',
          '1 week',
        ],
        correctIndex: 1,
        explanation: 'Task interval should be at most half the P-F interval. With 8-week P-F, monitor every 4 weeks or less. This ensures you\'ll detect potential failure before it becomes functional failure, even if timing is worst-case.',
      },
      {
        question: 'Which statement best describes the relationship between RCM and existing maintenance programs?',
        options: [
          'RCM replaces all existing maintenance',
          'RCM is added on top of existing maintenance',
          'RCM validates, adjusts, adds, and potentially removes tasks based on systematic analysis',
          'RCM only applies to new equipment',
        ],
        correctIndex: 2,
        explanation: 'RCM rationalises with existing programs—validating justified tasks, adjusting frequencies where needed, adding tasks for previously unaddressed failure modes, and questioning/removing unjustified tasks. The result is optimised maintenance, not just more or less.',
      },
    ],
    expertTips: [
      'Read questions carefully—many test precision in RCM terminology',
      'Apply the methodology—think through RCM logic rather than guessing',
      'Consider context—some answers depend on specific circumstances',
      'Use process of elimination—rule out clearly wrong answers first',
    ],
    commonMistakes: [
      'Confusing functional failures with failure modes',
      'Forgetting that hidden failures require failure-finding tasks',
      'Applying scheduled tasks to random failure patterns',
      'Setting task intervals longer than the P-F interval',
      'Treating all failures as equally important regardless of consequences',
    ],
    reflectionPrompts: [
      'After completing this assessment, which areas do you feel most confident in?',
      'Which topics might benefit from additional review?',
      'How will you apply what you\'ve learned to your facility?',
    ],
  },
];

// Helper functions
export function getPractitionerLesson(slug: string): PractitionerLesson | undefined {
  return practitionerLessons.find((l) => l.slug === slug);
}

export function getPractitionerLessonById(id: number): PractitionerLesson | undefined {
  return practitionerLessons.find((l) => l.id === id);
}

export function getNextPractitionerLesson(currentId: number): PractitionerLesson | undefined {
  return practitionerLessons.find((l) => l.id === currentId + 1);
}

export function getPreviousPractitionerLesson(currentId: number): PractitionerLesson | undefined {
  return practitionerLessons.find((l) => l.id === currentId - 1);
}