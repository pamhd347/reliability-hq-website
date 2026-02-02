(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,10007,e=>{"use strict";var t=e.i(43476),n=e.i(22016);function i({href:e,variant:i="primary",size:a="md",children:s,className:o="",type:r="button",onClick:l}){let c=`inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${{primary:"bg-deep-teal text-white hover:bg-slate-navy focus:ring-deep-teal",secondary:"bg-industrial-amber text-white hover:bg-orange-600 focus:ring-industrial-amber",outline:"border-2 border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white focus:ring-deep-teal"}[i]} ${{sm:"px-4 py-2 text-sm",md:"px-6 py-3 text-base",lg:"px-8 py-4 text-lg"}[a]} ${o}`;return e?(0,t.jsx)(n.default,{href:e,className:c,children:s}):(0,t.jsx)("button",{type:r,className:c,onClick:l,children:s})}e.s(["default",()=>i])},44799,52355,e=>{"use strict";var t=e.i(71645);let n=[{id:1,slug:"what-is-rcm",title:"What is RCM?",subtitle:"Understanding the fundamentals of Reliability Centred Maintenance",duration:"15-20 min",content:`
## The Origins of RCM

Reliability Centred Maintenance (RCM) emerged from the aviation industry in the 1960s and 70s. Airlines faced a problem: maintenance costs were skyrocketing, yet aircraft reliability wasn't improving proportionally. Something had to change.

In 1978, Stan Nowlan and Howard Heap published their seminal report for United Airlines, establishing the foundations of what we now call RCM. Their research challenged the prevailing assumption that equipment wore out predictably over time and that scheduled overhauls prevented failures.

**They discovered something surprising**: only 11% of equipment actually exhibited age-related failure patterns. The remaining 89% showed random or even increasing failure rates at the start of life (infant mortality).

## John Moubray and RCM II

In 1991, John Moubray published "RCM II: Reliability-centered Maintenance," which became the definitive guide for implementing RCM in industrial settings. Moubray took the aviation methodology and made it applicable to any industry—manufacturing, utilities, processing plants, you name it.

His work emphasised that RCM isn't just about preventing failures. It's about understanding:
- **What the asset is supposed to do** (its functions)
- **How it can fail to fulfil those functions** (functional failures)
- **Why it fails** (failure modes)
- **What happens when it fails** (failure effects)
- **Whether it matters** (failure consequences)

## The SAE JA1011 Standard

In 1999, the Society of Automotive Engineers (SAE) published JA1011: "Evaluation Criteria for Reliability-Centered Maintenance (RCM) Processes." This standard defines the minimum requirements a process must meet to be called RCM.

**Why does this matter?** Because without a standard, anyone could claim their maintenance approach was "RCM." The standard ensures rigour and consistency.

JA1011 specifies that a valid RCM process must answer seven questions, in sequence, for each asset. It must:
1. Define the operating context
2. Identify functions and performance standards
3. Determine functional failures
4. Identify failure modes
5. Assess failure effects
6. Evaluate failure consequences
7. Select appropriate maintenance tasks

**If your process doesn't do all of this, it's not RCM—it's something else.**

## Why RCM Works

Traditional maintenance often falls into two traps:

1. **Too much maintenance**: Overhauling equipment on fixed schedules regardless of condition, wasting money and sometimes introducing problems.

2. **Too little maintenance**: Waiting for things to break, leading to unplanned downtime, safety incidents, and costly repairs.

RCM provides a logical framework for finding the right balance. It recognises that:
- Not all failures have the same consequences
- Different failure modes require different responses
- Some failures are acceptable to let happen
- Resources should focus where they matter most

The result? **More reliability with less wasted effort.**

## RCM Is Not...

Let's clear up some common misconceptions:

- **RCM is not "maintenance optimisation"** — It's about developing the right strategy from first principles, not tweaking what already exists.
- **RCM is not software** — Tools can help, but RCM is a methodology driven by human analysis and decision-making.
- **RCM is not "RCM-lite"** — Shortcuts that skip steps aren't RCM. They might be useful, but they're not the real thing.
- **RCM is not a one-time exercise** — It's a living process that should be reviewed as operating conditions change.

## The Bottom Line

RCM is a structured, evidence-based methodology for developing maintenance strategies. It focuses on preserving system function—not just keeping equipment running. When done properly, it ensures you're doing the right maintenance, on the right equipment, for the right reasons.

In the next lesson, we'll dive into the heart of RCM: the seven questions that drive every analysis.
    `,keyTakeaways:["RCM originated in aviation during the 1960s-70s to address ineffective maintenance strategies","Only 11% of equipment shows age-related wear patterns—most failures are random",'John Moubray\'s "RCM II" adapted the methodology for industrial applications',"SAE JA1011 defines the standard criteria any RCM process must meet","RCM focuses on preserving function, not just preventing failures"],quiz:[{question:"What percentage of equipment was found to exhibit age-related failure patterns in Nowlan and Heap's research?",options:["50%","89%","11%","25%"],correctIndex:2,explanation:"Nowlan and Heap discovered that only 11% of equipment exhibited age-related failure patterns. The remaining 89% showed random or infant mortality patterns, challenging traditional time-based maintenance assumptions."},{question:"What does SAE JA1011 define?",options:["The best maintenance software to use","How often to perform maintenance","Minimum criteria for a process to be called RCM","A list of approved RCM consultants"],correctIndex:2,explanation:"SAE JA1011 defines the evaluation criteria—the minimum requirements a process must meet to be legitimately called Reliability Centred Maintenance."},{question:'Who wrote the definitive industrial RCM book "RCM II"?',options:["Stan Nowlan","Howard Heap","John Moubray","Henry Ford"],correctIndex:2,explanation:'John Moubray published "RCM II: Reliability-centered Maintenance" in 1991, adapting aviation RCM principles for industrial applications.'},{question:"What is the primary focus of RCM?",options:["Reducing maintenance costs at any expense","Preserving system function","Replacing equipment before it fails","Eliminating all maintenance tasks"],correctIndex:1,explanation:"RCM focuses on preserving system function—ensuring equipment continues to do what users need it to do within its operating context."}]},{id:2,slug:"seven-rcm-questions",title:"The 7 RCM Questions",subtitle:"The systematic framework that drives every RCM analysis",duration:"20-25 min",content:`
## The Heart of RCM

Every RCM analysis revolves around seven questions. These aren't arbitrary—they follow a logical sequence that ensures you understand your equipment thoroughly before making maintenance decisions.

**The questions must be asked in order.** Skipping ahead or taking shortcuts defeats the purpose.

Let's examine each question in detail.

---

## Question 1: What are the functions and associated performance standards?

Before you can maintain something, you need to know what it's supposed to do. This seems obvious, but it's often overlooked.

A function statement should include:
- **A verb** (what the item does)
- **An object** (what it acts upon)
- **A performance standard** (how well it must do it)

**Example**: A pump doesn't just "pump water." Its function might be: *"Transfer cooling water from the reservoir to the heat exchanger at a minimum flow rate of 500 litres per minute."*

Notice the specificity. Without that performance standard, how would you know if the pump is "failing"? A pump moving 400 L/min might be running perfectly mechanically—but it's not meeting its function.

**Key insight**: Assets often have multiple functions, including primary functions, secondary functions (like containment), and protective functions.

---

## Question 2: In what ways can it fail to fulfil its functions?

Once you know the functions, you identify *functional failures*—the ways the asset can fail to deliver its required performance.

For our pump example:
- Complete inability to transfer water (total failure)
- Transfers less than 500 L/min (partial failure)
- Transfers water but with excessive leakage

Each function can have multiple functional failures. You need to identify them all.

---

## Question 3: What causes each functional failure?

This is where we get into **failure modes**—the specific events or conditions that lead to functional failures.

For "transfers less than 500 L/min":
- Impeller wear
- Cavitation damage
- Blocked suction strainer
- Worn seals allowing air ingress
- Motor speed reduction due to winding degradation

**Be specific.** "Pump breaks" isn't a failure mode. "Impeller erosion due to abrasive particles in fluid" is.

The level of detail matters. You need enough specificity to identify an appropriate maintenance task, but not so much that you're documenting every molecule.

---

## Question 4: What happens when each failure occurs?

**Failure effects** describe the evidence that a failure has occurred and its immediate consequences. This includes:
- What the operator sees, hears, or notices
- Whether the system continues running or stops
- Physical damage or secondary effects
- Time required to repair

Example: *"Vibration alarm activates. Heat exchanger outlet temperature rises above setpoint within 15 minutes. Requires shutdown of production line. Typical repair time: 4-6 hours including impeller replacement."*

This information is crucial for the next question.

---

## Question 5: In what way does each failure matter?

Now we assess **failure consequences**. Not all failures are equal. RCM categorises consequences into four types:

### Hidden failures
Failures that won't be noticed under normal circumstances (e.g., a standby pump that only runs when the primary fails). These are dangerous because they can lead to multiple failures.

### Safety and environmental consequences
Failures that could hurt someone or breach environmental regulations. These get top priority.

### Operational consequences
Failures that affect production output, product quality, or customer service. These have economic impact.

### Non-operational consequences
Failures where the only consequence is the cost of repair. The equipment doesn't directly affect operations, safety, or environment.

**This categorisation drives task selection.** Safety consequences justify expensive prevention; non-operational failures might be acceptable to run to failure.

---

## Question 6: What can be done to predict or prevent each failure?

Now you're ready to select maintenance tasks. For each failure mode, consider:

### Scheduled restoration or replacement
Overhauling or replacing at fixed intervals. Only works if:
- There's an identifiable age at which reliability decreases
- Most items survive to that age
- The task restores original capability

### Scheduled on-condition tasks
Predictive maintenance—checking for signs of impending failure. Only works if:
- The failure has a detectable warning period
- The interval between detection and functional failure is consistent enough to act upon
- The task is practical

### Failure-finding tasks
Periodic checks that hidden functions still work (testing the backup generator, checking the relief valve). Only applies to hidden failures.

### Scheduled discard
Replacing items at fixed intervals regardless of condition (like seals or filters). Only if failure consequences justify the cost.

---

## Question 7: What should be done if a suitable task cannot be found?

Sometimes, no proactive maintenance task is technically appropriate or worth doing. Then you have options:

- **Redesign** — Change the equipment or process to eliminate the failure mode
- **Run to failure** — Accept the failure and deal with it when it happens (only acceptable for non-operational consequences and some operational ones)
- **Combination of tasks** — Use multiple complementary approaches

**Running to failure is a legitimate strategy**—when the consequences are acceptable. Don't waste resources preventing failures that don't matter.

---

## Putting It Together

These seven questions form a decision-making framework. By working through them systematically, you:

1. Understand what you're maintaining and why
2. Know every way it can fail
3. Understand the impact of each failure
4. Select tasks based on evidence, not tradition

The result is a maintenance programme built on logic, not guesswork.

In the next lesson, we'll take a deeper dive into failure modes and effects analysis—where most of the analytical work happens.
    `,keyTakeaways:["The 7 RCM questions must be answered in sequence—no shortcuts","Functions must include performance standards to be meaningful","Failure modes should be specific enough to identify appropriate tasks","Consequences are categorised: hidden, safety/environmental, operational, non-operational","Not every failure needs preventing—run-to-failure is sometimes the right answer"],quiz:[{question:"What must a complete function statement include?",options:["Just the equipment name","A verb, object, and performance standard","The maintenance schedule","The equipment cost"],correctIndex:1,explanation:"A function statement must include a verb (what the item does), an object (what it acts upon), and a performance standard (how well it must do it). Without all three, you can't properly assess whether the function is being fulfilled."},{question:"What are the four categories of failure consequences in RCM?",options:["Minor, moderate, major, catastrophic","Hidden, safety/environmental, operational, non-operational","Predictable, random, sudden, gradual","Mechanical, electrical, hydraulic, pneumatic"],correctIndex:1,explanation:"RCM categorises failure consequences as: Hidden (not evident under normal operation), Safety/Environmental, Operational (affects production/quality), and Non-operational (only repair costs matter)."},{question:'When is "run to failure" an acceptable maintenance strategy?',options:["Never—all failures must be prevented","Only when no other option exists","When failure consequences are acceptable and no cost-effective prevention exists","Only for brand new equipment"],correctIndex:2,explanation:"Run to failure is a legitimate RCM strategy when the consequences of failure are acceptable (non-operational or some operational) and no proactive task is worth doing. It's a conscious decision, not neglect."},{question:"What type of maintenance task is used specifically for hidden failures?",options:["Scheduled restoration","On-condition monitoring","Failure-finding tasks","Scheduled replacement"],correctIndex:2,explanation:"Failure-finding tasks are periodic checks that confirm hidden functions still work (like testing backup systems or safety devices). They're specifically designed for failures that wouldn't be evident during normal operation."},{question:"Why must the 7 RCM questions be asked in sequence?",options:["To save time","Because SAE JA1011 requires it as a formality","Each question builds on information from the previous answers","To make documentation easier"],correctIndex:2,explanation:"The questions follow a logical sequence where each answer informs the next. You can't assess consequences without knowing failure effects, and you can't select tasks without understanding consequences."}]},{id:3,slug:"failure-modes-effects",title:"Understanding Failure Modes & Effects",subtitle:"The analytical core of RCM—where the real work happens",duration:"25-30 min",content:`
## The Analytical Engine of RCM

Failure Modes and Effects Analysis (FMEA) isn't unique to RCM—it's used across many industries. But in RCM, it takes on a specific purpose: to provide the evidence base for maintenance task selection.

An FMEA answers Questions 3 and 4 of the RCM process:
- What causes each functional failure? (Failure modes)
- What happens when each failure occurs? (Failure effects)

Let's break down how to do this effectively.

---

## What Is a Failure Mode?

A failure mode is **a single event** that causes a functional failure. It's not a symptom, not a consequence, and not multiple events combined.

### Good failure mode statements:
- "Bearing seizes due to lubricant contamination"
- "Seal deteriorates due to chemical attack from process fluid"
- "Control board fails due to capacitor degradation"

### Bad failure mode statements:
- "Pump doesn't work" — Too vague, describes the functional failure not the cause
- "Maintenance error" — What specifically went wrong?
- "Multiple failures occur" — Each should be listed separately

### The Goldilocks Zone

Failure modes need to be at the right level of detail:

**Too high-level**: "Motor fails" — This could be a dozen different failure modes, each needing different maintenance.

**Too detailed**: "Third bearing ball in inner race cracks due to fatigue initiated at subsurface inclusion at 34,000 hours" — More detail than needed for maintenance decisions.

**Just right**: "Motor bearing fails due to fatigue" — Specific enough to identify a maintenance approach.

---

## Sources of Failure Mode Information

Where do you find failure modes? Multiple sources:

### 1. Equipment history
Your CMMS or maintenance records are goldmines. What has actually failed? How often? This is real data about your operating context.

### 2. Manufacturer information
Manuals, maintenance recommendations, and technical bulletins. But remember—manufacturers don't always know how you operate the equipment.

### 3. Generic failure mode databases
Industry databases like OREDA (offshore) or military handbooks provide starting points, but must be validated for your context.

### 4. Similar equipment experience
If you've maintained similar equipment elsewhere, that experience transfers. But beware of different operating conditions.

### 5. Expert knowledge
Your maintenance team and operators have invaluable tacit knowledge. The technician who's worked on that pump for 20 years knows things no database contains.

---

## Describing Failure Effects

A failure effect statement should describe:

1. **Evidence of failure** — What does the operator see, hear, smell, or notice?
2. **Impact on operations** — Does production stop? Quality suffer? 
3. **Secondary damage** — Does this failure cause other problems?
4. **Repair requirements** — What's needed to restore function?

### Example:

*"Abnormal noise audible from pump housing. Vibration alarm activates on local panel. If not addressed, bearing failure occurs within 1-4 hours, causing shaft damage. Requires pump shutdown for bearing replacement. Spare bearing typically available. Repair time: 6-8 hours including cool-down."*

This tells you everything needed to assess consequences and justify maintenance.

---

## Reasonably Likely Failure Modes

You can't document every conceivable failure mode. Focus on those that are **reasonably likely** to occur in your operating context.

Include failure modes that:
- Have occurred before (on this equipment or similar)
- Are known to occur in your industry
- Could reasonably occur given operating conditions
- Would have significant consequences if they occurred

Exclude failure modes that:
- Are so improbable they're not worth considering
- Require multiple simultaneous failures (unless you're doing fault tree analysis)
- Are already prevented by existing design features

**However**: Don't exclude catastrophic failure modes just because they haven't happened yet. If consequences are severe enough, even low-probability events deserve consideration.

---

## Common FMEA Mistakes

### Mistake 1: Copying generic lists without thinking
Industry databases are starting points, not gospel. Every failure mode should be validated for your specific operating context.

### Mistake 2: Confusing failure modes with functional failures
"Pump doesn't deliver required flow" is a functional failure. "Impeller wear" is a failure mode that causes that functional failure.

### Mistake 3: Listing maintenance errors as failure modes
"Failed to tighten bolts correctly" isn't a failure mode—it's a maintenance-induced failure that should be addressed through procedures and training.

### Mistake 4: Insufficient detail in failure effects
"Pump stops working" doesn't tell you enough. How do you know it's stopped? What happens next? How long to fix it?

### Mistake 5: Getting lost in analysis paralysis
Some organisations spend months on FMEA, documenting hundreds of failure modes for a single asset. This is often overkill. Focus effort where consequences are highest.

---

## FMEA in Practice

Here's a simplified example for a centrifugal pump:

| Failure Mode | Failure Effect |
|-------------|----------------|
| Impeller erosion due to cavitation | Gradual flow reduction noticed on trending. No immediate alarms. If uncorrected, leads to insufficient cooling in downstream process. Requires impeller replacement during scheduled shutdown. Parts lead time: 2 weeks. |
| Mechanical seal failure | Leakage visible at seal housing. Depending on fluid, may create safety hazard. Pump can continue running short-term with minor leakage but environmental/safety risk increases. Repair requires pump isolation and seal replacement (4-6 hours). |
| Bearing failure due to inadequate lubrication | Increased noise and vibration. Vibration alarm triggers at 4mm/s. If ignored, complete bearing seizure occurs within 2-48 hours depending on load. Shaft damage likely. Repair time: 8-24 hours. |

Notice how each entry gives you the information needed to make maintenance decisions.

---

## Connecting to Maintenance Tasks

The FMEA feeds directly into task selection:

- **Impeller erosion** (gradual degradation) → Condition monitoring via vibration trending
- **Mechanical seal failure** (potential safety/environmental) → Regular inspection or condition monitoring
- **Bearing failure** (detectable deterioration) → Vibration monitoring, oil analysis, or scheduled replacement

Good failure mode and effect descriptions make task selection almost obvious.

In the next lesson, we'll explore the RCM Decision Diagram—the tool that formalises this task selection process.
    `,keyTakeaways:["Failure modes must be single events at the right level of detail—not too vague, not too specific","Failure effects must include evidence, operational impact, secondary damage, and repair requirements","Use multiple sources: equipment history, manufacturers, databases, and expert knowledge",'Focus on "reasonably likely" failure modes for your specific operating context',"Good FMEA makes maintenance task selection straightforward"],quiz:[{question:"Which of the following is a properly stated failure mode?",options:["Pump fails to deliver required flow","Bearing seizes due to lubricant contamination","Equipment stops working","Multiple mechanical problems"],correctIndex:1,explanation:'"Bearing seizes due to lubricant contamination" is specific enough to identify a maintenance approach. The other options are either too vague or describe functional failures rather than failure modes.'},{question:"What should a complete failure effect statement include?",options:["Only the immediate symptom","Evidence, operational impact, secondary damage, and repair requirements","Just the cost of repair","Only what the operator should do"],correctIndex:1,explanation:"A complete failure effect statement includes: evidence of failure (what operator notices), impact on operations, secondary damage, and repair requirements. This information is essential for assessing consequences."},{question:"Why should you validate generic failure mode databases for your context?",options:["Because they're usually wrong","Operating conditions and equipment configurations vary—generic lists are starting points, not gospel","To reduce the number of failure modes","Because regulators require it"],correctIndex:1,explanation:"Generic databases provide useful starting points, but your specific operating context (environment, duty cycle, process fluid, etc.) affects which failure modes are relevant and how they manifest."},{question:'What is the "Goldilocks zone" for failure mode detail?',options:["As detailed as possible","As brief as possible","Specific enough to identify maintenance approaches but not excessively detailed","Whatever the manufacturer recommends"],correctIndex:2,explanation:"Failure modes need to be at the right level—specific enough to determine an appropriate maintenance task, but not so detailed you're specifying metallurgical failure mechanisms."}]},{id:4,slug:"rcm-decision-diagram",title:"The RCM Decision Diagram",subtitle:"Selecting the right maintenance task for each failure mode",duration:"20-25 min",content:`
## From Analysis to Action

You've identified functions, functional failures, failure modes, and effects. You've categorised consequences. Now comes the critical step: **selecting maintenance tasks.**

The RCM Decision Diagram is a logical framework that guides this selection. It ensures consistency and prevents the common trap of applying preferred solutions regardless of the problem.

---

## The Logic Structure

The decision diagram follows a consistent pattern:

1. **Classify the consequence** — Hidden, safety/environmental, operational, or non-operational
2. **Consider proactive tasks** — On-condition, scheduled restoration, scheduled discard
3. **Apply selection criteria** — Is the task technically feasible? Is it worth doing?
4. **Default action** — What to do if no proactive task is selected

Let's walk through each branch.

---

## Hidden Failures Branch

Hidden failures are those not evident to operating crew under normal circumstances. Examples:
- Standby equipment that only operates during emergencies
- Protective devices (pressure relief valves, circuit breakers)
- Backup systems

**Why they're dangerous**: A hidden failure on its own doesn't cause problems. But combined with another failure, the consequences multiply. If the backup pump has failed silently, and then the primary pump fails, you have no pumping capacity at all.

### Task selection for hidden failures:

1. **Scheduled on-condition task** — Can you detect degradation before failure?
2. **Scheduled restoration or discard** — Can you restore or replace at fixed intervals?
3. **Failure-finding task** — Periodic checks to confirm the item still works (e.g., testing the backup monthly)
4. **Redesign** — If nothing else works and the risk is unacceptable

**Note**: For hidden failures with safety consequences, failure-finding task intervals must ensure the unavailability risk is acceptably low.

---

## Safety/Environmental Consequences Branch

When a failure mode could hurt someone or cause environmental harm, it gets the most rigorous treatment.

### Task selection for safety/environmental:

1. **Scheduled on-condition task** — Is there a detectable degradation period? Can we detect it reliably? Can we act before the hazardous failure occurs?
2. **Scheduled restoration or discard** — Is there a predictable wear-out age? Do most items survive to that age?
3. **Redesign** — If no proactive task can reduce risk to acceptable levels

**Critical point**: For safety consequences, "no scheduled maintenance" is NOT acceptable. You must either find an effective proactive task or redesign to eliminate the hazard.

---

## Operational Consequences Branch

Operational failures affect production, quality, or customer service. The selection criteria now include economic justification.

### Task selection for operational:

1. **Scheduled on-condition task** — Technically feasible AND the cost of the task over time is less than the cost of failures it prevents
2. **Scheduled restoration or discard** — Technically feasible AND economically justified
3. **No scheduled maintenance** — Accept the failure when it occurs (run to failure)

**The economic question**: Would spending \xa3X on this maintenance task save more than \xa3X in avoided failure costs? If not, run to failure may be the right answer.

---

## Non-Operational Consequences Branch

These are failures where the only consequence is the direct cost of repair. The equipment doesn't directly affect production, safety, or environment.

### Task selection for non-operational:

1. **Scheduled on-condition task** — If cost-effective
2. **Scheduled restoration or discard** — If cost-effective
3. **No scheduled maintenance** — Often the right choice

For non-operational failures, running to failure is frequently appropriate. Don't spend money preventing failures that don't matter.

---

## Types of Proactive Tasks

### On-Condition Tasks (Predictive Maintenance)
Detecting that a failure is in progress before it causes functional failure.

**Examples**:
- Vibration monitoring for bearing wear
- Oil analysis for contamination
- Thermography for electrical hot spots
- Ultrasonic testing for leaks

**Selection criteria**:
- There's a detectable deterioration
- The P-F interval (potential failure to functional failure) is consistent
- The task interval is less than the P-F interval
- It's practical to perform

### Scheduled Restoration
Restoring capability at fixed intervals through overhaul or refurbishment.

**Selection criteria**:
- There's an identifiable age at which reliability decreases
- A sufficiently large proportion of items survive to that age
- The task restores original condition

### Scheduled Discard
Replacing items at fixed intervals regardless of condition.

**Selection criteria**:
- Same as restoration, but replacement is more practical than overhaul
- Typically used for items where wear is certain but condition monitoring isn't practical

---

## Default Actions

When no proactive task is selected:

**Hidden failures**: Failure-finding, then redesign if unavailability is unacceptable

**Safety/environmental**: Redesign is mandatory—you cannot accept these failures

**Operational**: No scheduled maintenance (run to failure) if economically justified

**Non-operational**: No scheduled maintenance (run to failure)

---

## Using the Decision Diagram

Here's a simplified walk-through for a failure mode:

**Failure mode**: "Heat exchanger tubes fail due to corrosion"

1. **Is this a hidden failure?** No—tube failure would be evident from temperature changes and possible leakage.

2. **Does it have safety/environmental consequences?** Depends on the fluid. Assume no (cooling water system, no hazardous materials).

3. **Does it have operational consequences?** Yes—heat exchanger failure affects process temperature control, causing production issues.

4. **Is an on-condition task feasible and economic?** 
   - Feasibility: Yes, periodic inspection or eddy current testing can detect wall thinning
   - Economic: Inspection cost \xd7 frequency vs. failure cost \xd7 probability
   - If yes → Schedule on-condition inspection

5. **If no on-condition task, is scheduled restoration/discard feasible and economic?**
   - Scheduled tube bundle replacement? Depends on corrosion rate predictability
   - If predictable → Schedule replacement before expected failure

6. **If neither proactive task works**: Accept failures and repair when they occur (if consequences are tolerable)

---

## Interactive Tool

Want to practice using the decision diagram? Try our [interactive RCM Decision Diagram tool](/tools/rcm-decision-diagram) to work through real scenarios step by step.

---

## Key Principles

1. **Follow the logic** — Don't jump to your favourite maintenance type
2. **Technical feasibility first, then economics** — A task must work before asking if it's worth it
3. **Default wisely** — No scheduled maintenance isn't failure; it's a conscious decision
4. **Document your reasoning** — Future analysts need to understand why tasks were selected

In our final lesson, we'll cover how to implement RCM in your organisation—turning analysis into action.
    `,keyTakeaways:["The decision diagram ensures consistent, logical task selection based on failure consequences","Hidden failures require failure-finding tasks to detect dormant problems","Safety/environmental failures must have proactive tasks or require redesign—run-to-failure is not acceptable","Economic justification is required for operational and non-operational failure tasks","No scheduled maintenance is a legitimate outcome when consequences are acceptable"],quiz:[{question:'What makes a failure "hidden"?',options:["It happens inside the equipment","It's not evident to operating crew under normal circumstances","It's too small to see","It happens at night"],correctIndex:1,explanation:"Hidden failures are those that won't be noticed under normal operating conditions—like a backup pump that doesn't run until the primary fails, or a safety device that only activates during emergencies."},{question:"For a failure with safety consequences, what happens if no proactive maintenance task is feasible?",options:["Run to failure is acceptable","Increase inspection frequency","Redesign is mandatory","Document it and move on"],correctIndex:2,explanation:"For safety/environmental consequences, you cannot simply accept the failure. If no proactive task can reduce risk to acceptable levels, redesign to eliminate or mitigate the hazard is mandatory."},{question:"What is the P-F interval?",options:["The time between purchases","The period from potential failure (detectable degradation) to functional failure","The planned failure interval","The production floor interval"],correctIndex:1,explanation:"The P-F interval is the time between when deterioration becomes detectable (potential failure, P) and when functional failure occurs (F). On-condition task intervals must be shorter than this to catch failures in time."},{question:'When is "no scheduled maintenance" (run to failure) an appropriate outcome?',options:["Never—all equipment needs maintenance","When consequences are operational or non-operational and no cost-effective proactive task exists","Only for brand new equipment","When budget is limited"],correctIndex:1,explanation:"Run to failure is legitimate when failure consequences are acceptable (operational or non-operational) and no proactive task is technically feasible or economically justified."},{question:"What type of task is specifically used for hidden failures?",options:["Scheduled discard","On-condition monitoring","Failure-finding tasks","Predictive maintenance"],correctIndex:2,explanation:"Failure-finding tasks are periodic checks specifically designed to detect whether hidden functions are still working—like testing backup systems or safety devices that don't operate under normal conditions."}]},{id:5,slug:"implementing-rcm",title:"Implementing RCM in Your Organisation",subtitle:"Turning analysis into action—making RCM work in the real world",duration:"20-25 min",content:`
## From Theory to Practice

Understanding RCM methodology is one thing. Implementing it successfully in your organisation is another. Many RCM initiatives fail—not because the analysis was wrong, but because implementation was mishandled.

Let's cover what actually makes RCM succeed.

---

## Before You Start: Critical Success Factors

### 1. Management commitment
RCM requires resources: time for analysis, skilled facilitators, and eventually, changes to maintenance practices. Without management buy-in, you'll struggle to get these.

**Don't start with**: "Let's try RCM on this small project and see if it works."
**Do start with**: "We're committed to RCM because [business reasons]. Here's our implementation plan."

### 2. Clear objectives
Why are you implementing RCM? Possible answers:
- Reduce unplanned downtime
- Cut maintenance costs
- Improve safety performance
- Meet regulatory requirements
- Extend asset life

Your objective shapes where you start and how you measure success.

### 3. Realistic expectations
RCM is not a quick fix. A thorough analysis of a complex system takes weeks or months. Benefits take time to materialise as new maintenance practices bed in.

**Typical timeline**: 6-18 months before significant measurable improvements.

---

## Selecting the First Analysis

Don't start with your most critical, complex asset. And don't start with something trivial. Choose a system that:

- Is important enough to justify the effort
- Has sufficient failure history to inform analysis
- Has knowledgeable operators and maintainers available
- Isn't in crisis mode (you need focused time)
- Will produce visible results to build momentum

**Good first candidate**: A moderately critical production system with known reliability issues and engaged stakeholders.

---

## Building the Analysis Team

RCM is a team sport. You need:

### Facilitator
Guides the process, ensures methodology is followed correctly, manages the team, documents results. Should be trained in RCM methodology.

### Operators
Know how the equipment behaves in normal operation. First to notice when something changes. Understand the operating context intimately.

### Maintainers
Know how things fail, what's hard to fix, where maintenance effort goes. Have invaluable tacit knowledge about failure modes.

### Technical experts
Engineers, reliability specialists, or vendor technical support for complex equipment. Bring deeper technical understanding.

### Management representative
Decision-making authority on resources and implementation. Keeps analysis grounded in business reality.

**Typical team size**: 4-7 people. Too few loses perspective; too many becomes unwieldy.

---

## Conducting the Analysis

### Preparation phase
- Gather documentation: P&IDs, equipment lists, maintenance history, manuals
- Define system boundaries clearly
- Identify operating context and performance requirements
- Schedule analysis sessions (typically 2-4 hour blocks)

### Analysis sessions
Work through the 7 questions systematically:
1. Document functions with performance standards
2. Identify all functional failures
3. List reasonably likely failure modes
4. Describe failure effects
5. Classify consequences
6. Select maintenance tasks using the decision diagram
7. Document default actions where no task selected

**Pace yourself**: Don't rush. A complex system might take 20-40 hours of facilitated analysis. This is an investment, not an expense.

### Documentation
Record everything. Future analysts need to understand your reasoning. Good documentation includes:
- Complete FMEA worksheets
- Task selection rationale
- Assumptions and operating context
- Dissenting opinions and how they were resolved

---

## Implementing the Results

Analysis without implementation is just an expensive documentation exercise.

### Review maintenance plans
Compare RCM recommendations to current practices:
- What new tasks are needed?
- What existing tasks should be removed or modified?
- What task frequencies change?

### Rationalise with existing work
Don't just add RCM tasks on top of everything else. RCM often eliminates unnecessary maintenance while adding targeted new tasks. The goal is better maintenance, not more maintenance.

### Update procedures and systems
- Modify CMMS work orders
- Update standard operating procedures
- Brief maintenance teams on changes and reasons
- Establish feedback mechanisms

### Pilot before full rollout
Implement changes on a subset of equipment first. Validate that tasks work as expected. Refine before expanding.

---

## Common Implementation Failures

### Failure 1: Analysis paralysis
Spending so long on analysis that enthusiasm dies before implementation. Set time limits. "Good enough" analysis beats perfect analysis never completed.

### Failure 2: No implementation ownership
The analysis team finishes, hands over a report, and moves on. Who implements? Without clear ownership, nothing changes.

### Failure 3: Resistance from maintenance teams
"We've always done it this way" is powerful. Combat this by involving maintenance in analysis, explaining the reasoning, and showing early wins.

### Failure 4: No feedback loop
RCM isn't a one-time exercise. Failures still occur. Operating context changes. Without a mechanism to learn and update, the analysis becomes stale.

### Failure 5: Inadequate training
People can't implement what they don't understand. Train facilitators properly. Brief teams on the methodology and their role.

---

## Sustaining RCM

### Living system approach
Build mechanisms to update analyses when:
- Significant failures occur
- Operating conditions change
- New failure modes are discovered
- Equipment is modified

### Metrics and measurement
Track indicators that show RCM is working:
- Unplanned downtime trends
- Maintenance cost per unit of output
- Mean time between failures (MTBF)
- Failure rates for analysed equipment

### Continuous improvement
Use failure data to validate or adjust maintenance tasks. If a task isn't preventing failures, revisit the analysis. If failures aren't occurring, perhaps the task can be extended.

### Knowledge management
People leave. Institutional knowledge walks out the door. Document thoroughly. Build capability in multiple individuals.

---

## Resources for Success

- **Templates**: Use structured FMEA worksheets (we have them in our [products](/products))
- **Tools**: The [RCM Decision Diagram tool](/tools/rcm-decision-diagram) helps work through task selection
- **Training**: Facilitator training is essential for leading analyses effectively
- **Standards**: Keep SAE JA1011 and JA1012 handy as references

---

## Your RCM Journey

You've completed the RCM Fundamentals course. You now understand:
- What RCM is and where it came from
- The 7 questions that drive every analysis
- How to analyse failure modes and effects
- How to use the decision diagram to select tasks
- How to implement RCM successfully

**But knowledge without application is potential unfulfilled.**

Your next steps:
1. Apply these concepts to a real piece of equipment in your facility
2. Consider our premium courses for deeper expertise
3. Explore our templates and tools to accelerate your work
4. Join our community of reliability professionals

Congratulations on taking this step in your reliability journey. Now go make your equipment work better.
    `,keyTakeaways:["Management commitment and clear objectives are prerequisites for successful RCM implementation","Build cross-functional teams: operators, maintainers, engineers, and management","Start with a moderately critical system—not the most complex or most trivial","Analysis without implementation is wasted effort—ensure clear ownership of results","RCM is a living process that needs feedback loops and periodic updates"],quiz:[{question:"What is typically the best choice for a first RCM analysis?",options:["Your most critical, complex system","A trivial, non-essential system","A moderately critical system with known issues and engaged stakeholders","Whatever management picks"],correctIndex:2,explanation:"Start with something important enough to justify effort but not so complex or critical that you're overwhelmed. You want early success to build momentum and demonstrate value."},{question:"Who should be on an RCM analysis team?",options:["Only engineers","Only management","A cross-functional team including operators, maintainers, engineers, and management","Only the equipment manufacturer"],correctIndex:2,explanation:"RCM requires diverse perspectives: operators know normal behaviour, maintainers know failure history, engineers provide technical depth, and management ensures business alignment."},{question:'What is "analysis paralysis" in RCM implementation?',options:["Not enough analysis","Spending so long on analysis that implementation never happens","Analysing the wrong equipment","Using the wrong software"],correctIndex:1,explanation:'Analysis paralysis occurs when teams pursue perfect analysis indefinitely, losing momentum and enthusiasm before anything is implemented. Set time limits and accept "good enough."'},{question:"Why is a feedback loop important for sustaining RCM?",options:["It's required by regulations","It generates reports for management","It allows analyses to be updated as failures occur and conditions change","It reduces paperwork"],correctIndex:2,explanation:"RCM isn't static. Equipment ages, operating conditions change, and new failure modes emerge. A feedback mechanism ensures analyses remain relevant and tasks stay effective."},{question:"What should happen when RCM analysis identifies a task that already exists?",options:["Add it again anyway","Delete the existing task","Compare and rationalise—modify frequency or scope if needed","Ignore the RCM recommendation"],correctIndex:2,explanation:"RCM often validates existing practices but may recommend different frequencies or scopes. Rationalise recommendations with current work to avoid duplication while ensuring tasks are optimised."}]}];function i(e){return n.find(t=>t.slug===e)}function a(e){return n.find(t=>t.id===e+1)}function s(e){return n.find(t=>t.id===e-1)}e.s(["getLesson",()=>i,"getNextLesson",()=>a,"getPreviousLesson",()=>s,"lessons",0,n],52355);let o="rcm-fundamentals-progress",r={completedLessons:[],completedQuizzes:[],quizScores:{}};function l(){let[e,i]=(0,t.useState)(r),[a,s]=(0,t.useState)(!1);(0,t.useEffect)(()=>{{let e=localStorage.getItem(o);if(e)try{i(JSON.parse(e))}catch(e){console.error("Failed to parse course progress",e)}s(!0)}},[]);let l=(0,t.useCallback)(e=>{localStorage.setItem(o,JSON.stringify(e)),i(e)},[]),c=(0,t.useCallback)(e=>{i(t=>{if(t.completedLessons.includes(e))return t;let n={...t,completedLessons:[...t.completedLessons,e],startedAt:t.startedAt||new Date().toISOString()};return l(n),n})},[l]),d=(0,t.useCallback)((e,t)=>{i(i=>{let a={...i.quizScores,[e]:t},s=i.completedQuizzes.includes(e)?i.completedQuizzes:[...i.completedQuizzes,e],o=n.every(t=>i.completedLessons.includes(t.id)||t.id===e),r=n.every(e=>s.includes(e.id)),c={...i,completedQuizzes:s,quizScores:a,completedAt:o&&r?new Date().toISOString():i.completedAt};return l(c),c})},[l]),u=(0,t.useCallback)(()=>{localStorage.removeItem(o),i(r)},[]),h=2*n.length,m=Math.round((e.completedLessons.length+e.completedQuizzes.length)/h*100),p=e.completedLessons.length===n.length&&e.completedQuizzes.length===n.length,f=(0,t.useCallback)(()=>{for(let t of n)if(!e.completedLessons.includes(t.id)||!e.completedQuizzes.includes(t.id))return t;return null},[e]);return{progress:e,isLoaded:a,completedLessons:e.completedLessons,completedQuizzes:e.completedQuizzes,quizScores:e.quizScores,overallProgress:m,isComplete:p,completeLesson:c,completeQuiz:d,resetProgress:u,getNextIncompleteLesson:f}}e.s(["useCourseProgress",()=>l],44799)},25634,e=>{"use strict";var t=e.i(43476),n=e.i(22016),i=e.i(10007),a=e.i(44799),s=e.i(52355);function o(){let{progress:e,completedLessons:i,completedQuizzes:o,overallProgress:r}=(0,a.useCourseProgress)();return(0,t.jsxs)("div",{className:"bg-white rounded-xl shadow-sm border border-light-grey p-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,t.jsx)("h3",{className:"font-heading font-semibold text-lg text-slate-navy",children:"Your Progress"}),(0,t.jsxs)("span",{className:"text-deep-teal font-semibold",children:[r,"%"]})]}),(0,t.jsx)("div",{className:"w-full bg-light-grey rounded-full h-3 mb-6",children:(0,t.jsx)("div",{className:"bg-deep-teal h-3 rounded-full transition-all duration-500",style:{width:`${r}%`}})}),(0,t.jsx)("div",{className:"space-y-3",children:s.lessons.map(e=>{let a=i.includes(e.id),s=o.includes(e.id),r=a&&s;return(0,t.jsxs)(n.default,{href:`/training/rcm-fundamentals/${e.slug}`,className:`flex items-center gap-3 p-3 rounded-lg transition-colors ${r?"bg-green-50 hover:bg-green-100":"bg-off-white hover:bg-light-grey"}`,children:[(0,t.jsx)("div",{className:`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${r?"bg-green-500 text-white":a?"bg-industrial-amber text-white":"bg-light-grey text-mid-grey"}`,children:r?(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.5 12.75l6 6 9-13.5"})}):(0,t.jsx)("span",{className:"font-semibold text-sm",children:e.id})}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("p",{className:`font-medium truncate ${r?"text-green-700":"text-slate-navy"}`,children:e.title}),(0,t.jsxs)("p",{className:"text-xs text-mid-grey",children:[a&&!s&&"Quiz pending",r&&"Completed",!a&&e.duration]})]}),(0,t.jsx)("svg",{className:"w-5 h-5 text-mid-grey flex-shrink-0",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 4.5l7.5 7.5-7.5 7.5"})})]},e.id)})}),100===r&&(0,t.jsx)("div",{className:"mt-6 pt-6 border-t border-light-grey",children:(0,t.jsxs)(n.default,{href:"/training/certificate",className:"flex items-center gap-3 p-4 bg-gradient-to-r from-deep-teal to-slate-navy rounded-lg text-white hover:opacity-90 transition-opacity",children:[(0,t.jsx)("div",{className:"w-10 h-10 bg-white/20 rounded-full flex items-center justify-center",children:(0,t.jsx)("svg",{className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"})})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"font-semibold",children:"Claim Your Certificate!"}),(0,t.jsx)("p",{className:"text-sm text-white/80",children:"You've completed all lessons"})]})]})})]})}function r(){let{isLoaded:e,completedLessons:r,completedQuizzes:l,overallProgress:c,isComplete:d,getNextIncompleteLesson:u}=(0,a.useCourseProgress)(),h=u();return(0,t.jsxs)("div",{className:"bg-off-white min-h-screen",children:[(0,t.jsx)("section",{className:"bg-gradient-to-br from-deep-teal to-slate-navy text-white",children:(0,t.jsx)("div",{className:"container-max px-4 sm:px-6 lg:px-8 py-16 md:py-20",children:(0,t.jsxs)("div",{className:"max-w-4xl",children:[(0,t.jsx)("div",{className:"inline-flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full mb-6",children:(0,t.jsx)("span",{className:"text-white font-semibold text-sm",children:"FREE COURSE"})}),(0,t.jsx)("h1",{className:"font-heading text-4xl md:text-5xl font-bold leading-tight",children:"RCM Fundamentals"}),(0,t.jsx)("p",{className:"mt-4 text-xl text-gray-200 leading-relaxed",children:"Master the core principles of Reliability Centred Maintenance in 5 practical lessons. Learn the methodology that's transformed maintenance strategies worldwide."}),(0,t.jsxs)("div",{className:"mt-8 flex flex-wrap items-center gap-6 text-gray-200",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"})}),(0,t.jsx)("span",{children:"5 Lessons"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,t.jsx)("span",{children:"2-3 Hours Total"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"})}),(0,t.jsx)("span",{children:"5 Quizzes"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"})}),(0,t.jsx)("span",{children:"Certificate"})]})]}),e&&(0,t.jsx)("div",{className:"mt-10",children:d?(0,t.jsx)(i.default,{href:"/training/certificate",variant:"secondary",size:"lg",children:"Get Your Certificate →"}):h?(0,t.jsxs)(i.default,{href:`/training/rcm-fundamentals/${h.slug}`,variant:"secondary",size:"lg",children:[c>0?"Continue Learning":"Start Learning"," →"]}):(0,t.jsx)(i.default,{href:"/training/rcm-fundamentals/what-is-rcm",variant:"secondary",size:"lg",children:"Start Learning →"})})]})})}),(0,t.jsx)("div",{className:"container-max px-4 sm:px-6 lg:px-8 py-12",children:(0,t.jsxs)("div",{className:"grid lg:grid-cols-3 gap-8",children:[(0,t.jsxs)("div",{className:"lg:col-span-2 space-y-8",children:[(0,t.jsxs)("section",{className:"bg-white rounded-xl shadow-sm border border-light-grey p-8",children:[(0,t.jsx)("h2",{className:"font-heading text-2xl font-bold text-slate-navy mb-6",children:"About This Course"}),(0,t.jsxs)("div",{className:"prose max-w-none text-charcoal",children:[(0,t.jsx)("p",{children:"Reliability Centred Maintenance (RCM) is the methodology used by industries worldwide to develop optimal maintenance strategies. This free course gives you a solid foundation in RCM principles— whether you're new to reliability engineering or need a refresher on the fundamentals."}),(0,t.jsx)("p",{className:"mt-4",children:"By the end of this course, you'll understand:"}),(0,t.jsxs)("ul",{className:"mt-4 space-y-2",children:[(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)("svg",{className:"w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.5 12.75l6 6 9-13.5"})}),(0,t.jsx)("span",{children:"The history and principles of RCM (Moubray, SAE JA1011)"})]}),(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)("svg",{className:"w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.5 12.75l6 6 9-13.5"})}),(0,t.jsx)("span",{children:"How to apply the 7 RCM questions systematically"})]}),(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)("svg",{className:"w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.5 12.75l6 6 9-13.5"})}),(0,t.jsx)("span",{children:"The fundamentals of Failure Modes and Effects Analysis (FMEA)"})]}),(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)("svg",{className:"w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.5 12.75l6 6 9-13.5"})}),(0,t.jsx)("span",{children:"How to use the RCM Decision Diagram to select maintenance tasks"})]}),(0,t.jsxs)("li",{className:"flex items-start gap-2",children:[(0,t.jsx)("svg",{className:"w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.5 12.75l6 6 9-13.5"})}),(0,t.jsx)("span",{children:"Practical strategies for implementing RCM in your organisation"})]})]})]})]}),(0,t.jsxs)("section",{className:"bg-white rounded-xl shadow-sm border border-light-grey p-8",children:[(0,t.jsx)("h2",{className:"font-heading text-2xl font-bold text-slate-navy mb-6",children:"Course Curriculum"}),(0,t.jsx)("div",{className:"space-y-4",children:s.lessons.map(e=>{let i=r.includes(e.id),a=l.includes(e.id),s=i&&a;return(0,t.jsx)(n.default,{href:`/training/rcm-fundamentals/${e.slug}`,className:`block p-6 rounded-xl border-2 transition-all hover:shadow-md ${s?"border-green-200 bg-green-50 hover:border-green-300":"border-light-grey bg-white hover:border-deep-teal"}`,children:(0,t.jsxs)("div",{className:"flex items-start gap-4",children:[(0,t.jsx)("div",{className:`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${s?"bg-green-500 text-white":i?"bg-industrial-amber text-white":"bg-deep-teal/10 text-deep-teal"}`,children:s?(0,t.jsx)("svg",{className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.5 12.75l6 6 9-13.5"})}):(0,t.jsx)("span",{className:"font-heading font-bold text-lg",children:e.id})}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-1",children:[(0,t.jsx)("h3",{className:"font-heading font-semibold text-lg text-slate-navy",children:e.title}),(0,t.jsx)("span",{className:"text-sm text-mid-grey",children:e.duration})]}),(0,t.jsx)("p",{className:"text-mid-grey text-sm",children:e.subtitle}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mt-3",children:[(0,t.jsx)("span",{className:`text-xs px-2 py-1 rounded-full ${i?"bg-green-100 text-green-700":"bg-gray-100 text-gray-600"}`,children:i?"✓ Lesson":"Lesson"}),(0,t.jsx)("span",{className:`text-xs px-2 py-1 rounded-full ${a?"bg-green-100 text-green-700":"bg-gray-100 text-gray-600"}`,children:a?"✓ Quiz":"Quiz"})]})]}),(0,t.jsx)("svg",{className:"w-6 h-6 text-mid-grey flex-shrink-0",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 4.5l7.5 7.5-7.5 7.5"})})]})},e.id)})})]}),(0,t.jsxs)("section",{className:"bg-white rounded-xl shadow-sm border border-light-grey p-8",children:[(0,t.jsx)("h2",{className:"font-heading text-2xl font-bold text-slate-navy mb-6",children:"Who Is This Course For?"}),(0,t.jsxs)("div",{className:"grid sm:grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{className:"p-4 bg-off-white rounded-lg",children:[(0,t.jsx)("h4",{className:"font-semibold text-slate-navy mb-2",children:"Reliability Engineers"}),(0,t.jsx)("p",{className:"text-sm text-mid-grey",children:"New to RCM or need a structured refresher on the fundamentals."})]}),(0,t.jsxs)("div",{className:"p-4 bg-off-white rounded-lg",children:[(0,t.jsx)("h4",{className:"font-semibold text-slate-navy mb-2",children:"Maintenance Managers"}),(0,t.jsx)("p",{className:"text-sm text-mid-grey",children:"Want to understand RCM to support implementation in your teams."})]}),(0,t.jsxs)("div",{className:"p-4 bg-off-white rounded-lg",children:[(0,t.jsx)("h4",{className:"font-semibold text-slate-navy mb-2",children:"Asset Managers"}),(0,t.jsx)("p",{className:"text-sm text-mid-grey",children:"Need to make evidence-based decisions about maintenance strategy."})]}),(0,t.jsxs)("div",{className:"p-4 bg-off-white rounded-lg",children:[(0,t.jsx)("h4",{className:"font-semibold text-slate-navy mb-2",children:"Operations Personnel"}),(0,t.jsx)("p",{className:"text-sm text-mid-grey",children:"Involved in RCM analysis teams and want to contribute effectively."})]})]})]})]}),(0,t.jsx)("div",{className:"lg:col-span-1",children:(0,t.jsxs)("div",{className:"sticky top-24 space-y-6",children:[e&&(0,t.jsx)(o,{}),(0,t.jsxs)("div",{className:"bg-white rounded-xl shadow-sm border border-light-grey p-6",children:[(0,t.jsx)("h3",{className:"font-heading font-semibold text-lg text-slate-navy mb-4",children:"Related Resources"}),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)(n.default,{href:"/tools/rcm-decision-diagram",className:"flex items-center gap-3 text-mid-grey hover:text-deep-teal transition-colors",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"})}),(0,t.jsx)("span",{className:"text-sm",children:"RCM Decision Diagram Tool"})]}),(0,t.jsxs)(n.default,{href:"/products",className:"flex items-center gap-3 text-mid-grey hover:text-deep-teal transition-colors",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"})}),(0,t.jsx)("span",{className:"text-sm",children:"RCM Templates & Tools"})]}),(0,t.jsxs)(n.default,{href:"/training/rcm-practitioner",className:"flex items-center gap-3 text-mid-grey hover:text-deep-teal transition-colors",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"})}),(0,t.jsx)("span",{className:"text-sm",children:"RCM Practitioner Certification"})]})]})]}),(0,t.jsxs)("div",{className:"bg-gradient-to-br from-deep-teal to-slate-navy rounded-xl p-6 text-white",children:[(0,t.jsx)("div",{className:"w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4",children:(0,t.jsx)("svg",{className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"})})}),(0,t.jsx)("h3",{className:"font-heading font-semibold text-lg mb-2",children:"Earn Your Certificate"}),(0,t.jsx)("p",{className:"text-sm text-white/80",children:"Complete all 5 lessons and quizzes to earn your RCM Fundamentals completion certificate."})]})]})})]})})]})}e.s(["default",()=>r],25634)}]);