(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,44799,52355,e=>{"use strict";var t=e.i(71645);let n=[{id:1,slug:"what-is-rcm",title:"What is RCM?",subtitle:"Understanding the fundamentals of Reliability Centred Maintenance",duration:"15-20 min",content:`
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
    `,keyTakeaways:["Management commitment and clear objectives are prerequisites for successful RCM implementation","Build cross-functional teams: operators, maintainers, engineers, and management","Start with a moderately critical system—not the most complex or most trivial","Analysis without implementation is wasted effort—ensure clear ownership of results","RCM is a living process that needs feedback loops and periodic updates"],quiz:[{question:"What is typically the best choice for a first RCM analysis?",options:["Your most critical, complex system","A trivial, non-essential system","A moderately critical system with known issues and engaged stakeholders","Whatever management picks"],correctIndex:2,explanation:"Start with something important enough to justify effort but not so complex or critical that you're overwhelmed. You want early success to build momentum and demonstrate value."},{question:"Who should be on an RCM analysis team?",options:["Only engineers","Only management","A cross-functional team including operators, maintainers, engineers, and management","Only the equipment manufacturer"],correctIndex:2,explanation:"RCM requires diverse perspectives: operators know normal behaviour, maintainers know failure history, engineers provide technical depth, and management ensures business alignment."},{question:'What is "analysis paralysis" in RCM implementation?',options:["Not enough analysis","Spending so long on analysis that implementation never happens","Analysing the wrong equipment","Using the wrong software"],correctIndex:1,explanation:'Analysis paralysis occurs when teams pursue perfect analysis indefinitely, losing momentum and enthusiasm before anything is implemented. Set time limits and accept "good enough."'},{question:"Why is a feedback loop important for sustaining RCM?",options:["It's required by regulations","It generates reports for management","It allows analyses to be updated as failures occur and conditions change","It reduces paperwork"],correctIndex:2,explanation:"RCM isn't static. Equipment ages, operating conditions change, and new failure modes emerge. A feedback mechanism ensures analyses remain relevant and tasks stay effective."},{question:"What should happen when RCM analysis identifies a task that already exists?",options:["Add it again anyway","Delete the existing task","Compare and rationalise—modify frequency or scope if needed","Ignore the RCM recommendation"],correctIndex:2,explanation:"RCM often validates existing practices but may recommend different frequencies or scopes. Rationalise recommendations with current work to avoid duplication while ensuring tasks are optimised."}]}];function i(e){return n.find(t=>t.slug===e)}function a(e){return n.find(t=>t.id===e+1)}function s(e){return n.find(t=>t.id===e-1)}e.s(["getLesson",()=>i,"getNextLesson",()=>a,"getPreviousLesson",()=>s,"lessons",0,n],52355);let o="rcm-fundamentals-progress",r={completedLessons:[],completedQuizzes:[],quizScores:{}};function l(){let[e,i]=(0,t.useState)(r),[a,s]=(0,t.useState)(!1);(0,t.useEffect)(()=>{{let e=localStorage.getItem(o);if(e)try{i(JSON.parse(e))}catch(e){console.error("Failed to parse course progress",e)}s(!0)}},[]);let l=(0,t.useCallback)(e=>{localStorage.setItem(o,JSON.stringify(e)),i(e)},[]),c=(0,t.useCallback)(e=>{i(t=>{if(t.completedLessons.includes(e))return t;let n={...t,completedLessons:[...t.completedLessons,e],startedAt:t.startedAt||new Date().toISOString()};return l(n),n})},[l]),d=(0,t.useCallback)((e,t)=>{i(i=>{let a={...i.quizScores,[e]:t},s=i.completedQuizzes.includes(e)?i.completedQuizzes:[...i.completedQuizzes,e],o=n.every(t=>i.completedLessons.includes(t.id)||t.id===e),r=n.every(e=>s.includes(e.id)),c={...i,completedQuizzes:s,quizScores:a,completedAt:o&&r?new Date().toISOString():i.completedAt};return l(c),c})},[l]),u=(0,t.useCallback)(()=>{localStorage.removeItem(o),i(r)},[]),h=2*n.length,m=Math.round((e.completedLessons.length+e.completedQuizzes.length)/h*100),p=e.completedLessons.length===n.length&&e.completedQuizzes.length===n.length,f=(0,t.useCallback)(()=>{for(let t of n)if(!e.completedLessons.includes(t.id)||!e.completedQuizzes.includes(t.id))return t;return null},[e]);return{progress:e,isLoaded:a,completedLessons:e.completedLessons,completedQuizzes:e.completedQuizzes,quizScores:e.quizScores,overallProgress:m,isComplete:p,completeLesson:c,completeQuiz:d,resetProgress:u,getNextIncompleteLesson:f}}e.s(["useCourseProgress",()=>l],44799)},18566,(e,t,n)=>{t.exports=e.r(76562)},10341,e=>{"use strict";var t=e.i(43476),n=e.i(71645),i=e.i(18566),a=e.i(22016),s=e.i(52355);let o={1:[{id:1,title:"Welcome to RCM",type:"intro",content:`Reliability Centred Maintenance (RCM) is one of the most powerful methodologies in maintenance engineering.

In this module, you'll learn where RCM came from, what makes it different, and why it's become the gold standard for developing maintenance strategies.

Let's start at the beginning.`},{id:2,title:"The Aviation Problem",type:"concept",content:`RCM emerged from the aviation industry in the 1960s and 70s.

Airlines faced a serious problem: **maintenance costs were skyrocketing**, yet aircraft reliability wasn't improving proportionally.

The prevailing assumption was that equipment wore out predictably over time, and that scheduled overhauls prevented failures. But the data told a different story.

Something had to change.`},{id:3,title:"The Surprising Discovery",type:"keypoint",content:`In 1978, Stan Nowlan and Howard Heap published their seminal report for United Airlines. Their research challenged everything.

**They discovered that only 11% of equipment actually exhibited age-related failure patterns.**

The remaining 89% showed random or even *increasing* failure rates at the start of life (infant mortality).

This meant that most time-based preventive maintenance was not only wasteful—it could actually be making things worse.`},{id:4,title:"John Moubray and RCM II",type:"concept",content:`In 1991, John Moubray published **"RCM II: Reliability-centered Maintenance"**—the definitive guide for implementing RCM in industrial settings.

Moubray took the aviation methodology and made it applicable to any industry: manufacturing, utilities, processing plants, maritime, you name it.

His book remains the essential reference for RCM practitioners worldwide.`},{id:5,title:"What RCM is Really About",type:"concept",content:`Moubray emphasised that RCM isn't just about preventing failures. It's about understanding:

- **What the asset is supposed to do** (its functions)
- **How it can fail to fulfil those functions** (functional failures)
- **Why it fails** (failure modes)
- **What happens when it fails** (failure effects)
- **Whether it matters** (failure consequences)

This systematic understanding drives better decisions.`},{id:6,title:"The SAE JA1011 Standard",type:"concept",content:`In 1999, the Society of Automotive Engineers (SAE) published **JA1011: "Evaluation Criteria for Reliability-Centered Maintenance (RCM) Processes."**

This standard defines the minimum requirements a process must meet to be called RCM.

**Why does this matter?** Without a standard, anyone could claim their maintenance approach was "RCM." The standard ensures rigour and consistency.`},{id:7,title:"The Seven Questions",type:"keypoint",content:`JA1011 specifies that a valid RCM process must answer **seven questions**, in sequence, for each asset:

1. Define the operating context
2. Identify functions and performance standards
3. Determine functional failures
4. Identify failure modes
5. Assess failure effects
6. Evaluate failure consequences
7. Select appropriate maintenance tasks

**If your process doesn't do all of this, it's not RCM—it's something else.**`},{id:8,title:"The Two Maintenance Traps",type:"concept",content:`Traditional maintenance often falls into two traps:

**1. Too much maintenance**
Overhauling equipment on fixed schedules regardless of condition. This wastes money and sometimes *introduces* problems.

**2. Too little maintenance**
Waiting for things to break. This leads to unplanned downtime, safety incidents, and costly repairs.

RCM provides a logical framework for finding the right balance.`},{id:9,title:"Why RCM Works",type:"concept",content:`RCM recognises fundamental truths about equipment and maintenance:

- Not all failures have the same consequences
- Different failure modes require different responses
- Some failures are acceptable to let happen
- Resources should focus where they matter most

The result? **More reliability with less wasted effort.**`},{id:10,title:"What RCM is NOT",type:"concept",content:`Let's clear up some common misconceptions:

- **RCM is not "maintenance optimisation"** — It develops the right strategy from first principles, not tweaking what exists

- **RCM is not software** — Tools help, but RCM is a methodology driven by human analysis

- **RCM is not "RCM-lite"** — Shortcuts that skip steps aren't RCM

- **RCM is not a one-time exercise** — It's a living process that should be reviewed as conditions change`},{id:11,title:"The Bottom Line",type:"summary",content:`RCM is a **structured, evidence-based methodology** for developing maintenance strategies.

It focuses on **preserving system function**—not just keeping equipment running. When done properly, it ensures you're doing:

- The **right maintenance**
- On the **right equipment**
- For the **right reasons**

In the next lesson, we'll dive into the heart of RCM: the seven questions that drive every analysis.`}]};var r=e.i(44799);function l({questions:e,lessonId:i,onComplete:a,isCompleted:s,previousScore:o}){let[r,l]=(0,n.useState)(0),[c,d]=(0,n.useState)(null),[u,h]=(0,n.useState)(!1),[m,p]=(0,n.useState)(Array(e.length).fill(null)),[f,g]=(0,n.useState)(!1),[y,x]=(0,n.useState)(!1),b=e[r],v=c===b.correctIndex;if(s&&!y||f){let n=f?Math.round((m.filter((t,n)=>t===e[n].correctIndex).length+ +(c===e[r].correctIndex))/e.length*100):o||0,i=n>=60;return(0,t.jsxs)("div",{className:"bg-white rounded-xl border border-light-grey p-8 text-center",children:[(0,t.jsx)("div",{className:`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${i?"bg-green-100":"bg-amber-100"}`,children:i?(0,t.jsx)("svg",{className:"w-10 h-10 text-green-600",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}):(0,t.jsx)("svg",{className:"w-10 h-10 text-amber-600",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"})})}),(0,t.jsx)("h3",{className:"font-heading text-2xl font-bold text-slate-navy mb-2",children:i?"Quiz Complete!":"Keep Learning!"}),(0,t.jsxs)("p",{className:"text-mid-grey mb-4",children:["You scored ",(0,t.jsxs)("span",{className:`font-bold ${i?"text-green-600":"text-amber-600"}`,children:[n,"%"]}),i?" — Great job!":" — Review the lesson and try again."]}),(0,t.jsx)("div",{className:"flex items-center justify-center gap-2 mb-6",children:e.map((n,i)=>{let a=m[i]===e[i].correctIndex;return(0,t.jsx)("div",{className:`w-3 h-3 rounded-full ${null===m[i]?"bg-gray-200":a?"bg-green-500":"bg-red-400"}`},i)})}),(0,t.jsx)("button",{onClick:()=>{l(0),d(null),h(!1),p(Array(e.length).fill(null)),g(!1),x(!0)},className:"text-deep-teal font-medium hover:underline",children:"Retry Quiz"})]})}return(0,t.jsxs)("div",{className:"bg-white rounded-xl border border-light-grey overflow-hidden",children:[(0,t.jsxs)("div",{className:"bg-off-white px-6 py-4 border-b border-light-grey",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("h3",{className:"font-heading font-semibold text-slate-navy",children:["Lesson ",i," Quiz"]}),(0,t.jsxs)("span",{className:"text-sm text-mid-grey",children:["Question ",r+1," of ",e.length]})]}),(0,t.jsx)("div",{className:"flex items-center gap-2 mt-3",children:e.map((n,i)=>(0,t.jsx)("div",{className:`h-2 flex-1 rounded-full ${i<r?m[i]===e[i].correctIndex?"bg-green-500":"bg-red-400":i===r?"bg-deep-teal":"bg-gray-200"}`},i))})]}),(0,t.jsxs)("div",{className:"p-6",children:[(0,t.jsx)("p",{className:"font-medium text-lg text-slate-navy mb-6",children:b.question}),(0,t.jsx)("div",{className:"space-y-3",children:b.options.map((e,n)=>{let i=c===n,a=n===b.correctIndex,s="border-light-grey hover:border-deep-teal hover:bg-off-white";return u?a?s="border-green-500 bg-green-50":i&&!v&&(s="border-red-400 bg-red-50"):i&&(s="border-deep-teal bg-deep-teal/5"),(0,t.jsx)("button",{onClick:()=>!u&&d(n),disabled:u,className:`w-full text-left p-4 rounded-lg border-2 transition-colors ${s}`,children:(0,t.jsxs)("div",{className:"flex items-start gap-3",children:[(0,t.jsxs)("div",{className:`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${u&&a?"border-green-500 bg-green-500":u&&i&&!v?"border-red-400 bg-red-400":i?"border-deep-teal bg-deep-teal":"border-gray-300"}`,children:[(u&&a||i&&!u)&&(0,t.jsx)("svg",{className:"w-4 h-4 text-white",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.5 12.75l6 6 9-13.5"})}),u&&i&&!v&&(0,t.jsx)("svg",{className:"w-4 h-4 text-white",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})]}),(0,t.jsx)("span",{className:"text-charcoal",children:e})]})},n)})}),u&&(0,t.jsx)("div",{className:`mt-6 p-4 rounded-lg ${v?"bg-green-50 border border-green-200":"bg-amber-50 border border-amber-200"}`,children:(0,t.jsxs)("div",{className:"flex items-start gap-3",children:[v?(0,t.jsx)("svg",{className:"w-6 h-6 text-green-600 flex-shrink-0",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}):(0,t.jsx)("svg",{className:"w-6 h-6 text-amber-600 flex-shrink-0",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:`font-semibold ${v?"text-green-700":"text-amber-700"}`,children:v?"Correct!":"Not quite right"}),(0,t.jsx)("p",{className:"text-sm text-gray-600 mt-1",children:b.explanation})]})]})}),(0,t.jsx)("div",{className:"mt-6 flex justify-end",children:u?(0,t.jsx)("button",{onClick:()=>{if(r<e.length-1)l(r+1),d(null),h(!1);else{let t=Math.round((m.filter((t,n)=>t===e[n].correctIndex).length+ +!!v)/e.length*100);g(!0),a(t)}},className:"px-6 py-3 rounded-lg font-semibold bg-deep-teal text-white hover:bg-slate-navy transition-colors",children:r<e.length-1?"Next Question":"Finish Quiz"}):(0,t.jsx)("button",{onClick:()=>{if(null===c)return;let e=[...m];e[r]=c,p(e),h(!0)},disabled:null===c,className:`px-6 py-3 rounded-lg font-semibold transition-colors ${null===c?"bg-gray-200 text-gray-400 cursor-not-allowed":"bg-deep-teal text-white hover:bg-slate-navy"}`,children:"Check Answer"})})]})]})}function c({slides:e,lessonTitle:i,onComplete:a}){let[s,o]=(0,n.useState)(0),[r,l]=(0,n.useState)("next"),[c,d]=(0,n.useState)(!1),u=e.length,h=e[s],m=(s+1)/u*100,p=(0,n.useCallback)((e,t)=>{c||e<0||e>=u||(l(t),d(!0),setTimeout(()=>{o(e),d(!1)},150))},[c,u]),f=(0,n.useCallback)(()=>{s<u-1?p(s+1,"next"):a&&a()},[s,u,p,a]),g=(0,n.useCallback)(()=>{s>0&&p(s-1,"prev")},[s,p]);(0,n.useEffect)(()=>{let e=e=>{"ArrowRight"===e.key||" "===e.key?(e.preventDefault(),f()):"ArrowLeft"===e.key&&(e.preventDefault(),g())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[f,g]);let y=e=>e.replace(/\*\*(.+?)\*\*/g,'<strong class="font-semibold text-slate-navy">$1</strong>').replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" class="text-deep-teal hover:underline">$1</a>').replace(/`(.+?)`/g,'<code class="bg-off-white px-1.5 py-0.5 rounded text-sm font-mono text-slate-navy">$1</code>'),x=e=>{switch(e){case"intro":return(0,t.jsx)("svg",{className:"w-8 h-8",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"})});case"keypoint":return(0,t.jsx)("svg",{className:"w-8 h-8 text-industrial-amber",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"})});case"summary":return(0,t.jsx)("svg",{className:"w-8 h-8 text-deep-teal",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})});default:return null}};return(0,t.jsxs)("div",{className:"w-full",children:[(0,t.jsxs)("div",{className:"mb-6",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between text-sm text-mid-grey mb-2",children:[(0,t.jsx)("span",{children:i}),(0,t.jsxs)("span",{children:[s+1," of ",u]})]}),(0,t.jsx)("div",{className:"h-2 bg-light-grey rounded-full overflow-hidden",children:(0,t.jsx)("div",{className:"h-full bg-gradient-to-r from-deep-teal to-slate-navy transition-all duration-300 ease-out",style:{width:`${m}%`}})})]}),(0,t.jsx)("div",{className:"flex justify-center gap-1.5 mb-6",children:e.map((e,n)=>(0,t.jsx)("button",{onClick:()=>p(n,n>s?"next":"prev"),className:`h-2 rounded-full transition-all duration-200 ${n===s?"w-8 bg-deep-teal":n<s?"w-2 bg-deep-teal/50 hover:bg-deep-teal/70":"w-2 bg-light-grey hover:bg-mid-grey"}`,"aria-label":`Go to slide ${n+1}`},n))}),(0,t.jsxs)("div",{className:`rounded-2xl shadow-lg p-8 md:p-12 min-h-[400px] flex flex-col transition-all duration-150 ${c?"next"===r?"opacity-0 translate-x-4":"opacity-0 -translate-x-4":"opacity-100 translate-x-0"} ${(e=>{switch(e){case"intro":return"bg-gradient-to-br from-deep-teal to-slate-navy text-white";case"keypoint":return"bg-gradient-to-br from-industrial-amber/10 to-industrial-amber/5 border-2 border-industrial-amber/20";case"summary":return"bg-gradient-to-br from-slate-navy/5 to-deep-teal/5 border-2 border-deep-teal/20";default:return"bg-white border border-light-grey"}})(h.type)}`,children:[x(h.type)&&(0,t.jsx)("div",{className:"mb-4",children:x(h.type)}),h.title&&(0,t.jsx)("h2",{className:`font-heading text-2xl md:text-3xl font-bold mb-6 ${"intro"===h.type?"text-white":"text-slate-navy"}`,children:h.title}),(0,t.jsx)("div",{className:`flex-grow ${"intro"===h.type?"[&_p]:text-white/90 [&_strong]:text-white":""}`,children:(e=>{let n=e.trim().split("\n"),i=[],a=[],s=!1,o=()=>{a.length>0&&(s?i.push((0,t.jsx)("ol",{className:"space-y-3 my-4",children:a.map((e,n)=>(0,t.jsxs)("li",{className:"flex items-start gap-3",children:[(0,t.jsx)("span",{className:"flex-shrink-0 w-7 h-7 bg-deep-teal text-white rounded-full flex items-center justify-center text-sm font-semibold",children:n+1}),(0,t.jsx)("span",{className:"text-charcoal pt-0.5",dangerouslySetInnerHTML:{__html:y(e)}})]},n))},`list-${i.length}`)):i.push((0,t.jsx)("ul",{className:"space-y-3 my-4",children:a.map((e,n)=>(0,t.jsxs)("li",{className:"flex items-start gap-3",children:[(0,t.jsx)("svg",{className:"w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),(0,t.jsx)("span",{className:"text-charcoal",dangerouslySetInnerHTML:{__html:y(e)}})]},n))},`list-${i.length}`)),a=[],s=!1)};for(let e of n){if(!e.trim()){o();continue}e.startsWith("- ")?a.push(e.replace("- ","")):e.match(/^\d+\. /)?(0===a.length&&(s=!0),a.push(e.replace(/^\d+\. /,""))):(o(),i.push((0,t.jsx)("p",{className:"text-charcoal text-lg leading-relaxed my-4",dangerouslySetInnerHTML:{__html:y(e)}},`p-${i.length}`)))}return o(),i})(h.content)})]}),(0,t.jsxs)("div",{className:"flex items-center justify-between mt-6",children:[(0,t.jsxs)("button",{onClick:g,disabled:0===s,className:`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${0===s?"text-mid-grey cursor-not-allowed":"text-charcoal hover:bg-light-grey"}`,children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5L8.25 12l7.5-7.5"})}),"Previous"]}),(0,t.jsx)("div",{className:"text-sm text-mid-grey",children:"Use ← → arrow keys"}),(0,t.jsxs)("button",{onClick:f,className:"flex items-center gap-2 px-6 py-3 bg-deep-teal text-white rounded-lg font-medium hover:bg-slate-navy transition-colors",children:[s===u-1?"Complete":"Next",(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 4.5l7.5 7.5-7.5 7.5"})})]})]})]})}function d(){let e=(0,i.useParams)(),d=e?.slug,u=(0,s.getLesson)(d),{isLoaded:h,completedLessons:m,completedQuizzes:p,quizScores:f,overallProgress:g,completeLesson:y,completeQuiz:x}=(0,r.useCourseProgress)(),[b,v]=(0,n.useState)(!1),[w,k]=(0,n.useState)(!1),[M,j]=(0,n.useState)(!1),C=u?(0,s.getNextLesson)(u.id):void 0,q=u?(0,s.getPreviousLesson)(u.id):void 0,N=!!u&&m.includes(u.id),R=!!u&&p.includes(u.id),T=!!u&&u.id in o,I=u?o[u.id]:void 0;if((0,n.useEffect)(()=>{if(u&&h&&!w)if(T)M&&(y(u.id),k(!0));else{let e=setTimeout(()=>{y(u.id),k(!0)},5e3);return()=>clearTimeout(e)}},[u,h,y,w,T,M]),!u)return(0,t.jsx)("div",{className:"min-h-screen bg-off-white flex items-center justify-center",children:(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("h1",{className:"font-heading text-2xl font-bold text-slate-navy mb-4",children:"Lesson Not Found"}),(0,t.jsx)(a.default,{href:"/training/rcm-fundamentals",className:"text-deep-teal hover:underline",children:"← Back to Course"})]})});let S=e=>e.replace(/\*\*(.+?)\*\*/g,'<strong class="font-semibold text-slate-navy">$1</strong>').replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" class="text-deep-teal hover:underline">$1</a>');return(0,t.jsxs)("div",{className:"min-h-screen bg-off-white",children:[(0,t.jsx)("div",{className:"bg-white border-b border-light-grey sticky top-0 z-40",children:(0,t.jsx)("div",{className:"container-max px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"flex items-center justify-between h-14",children:[(0,t.jsxs)(a.default,{href:"/training/rcm-fundamentals",className:"flex items-center gap-2 text-mid-grey hover:text-deep-teal transition-colors",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5L8.25 12l7.5-7.5"})}),(0,t.jsx)("span",{className:"text-sm font-medium",children:"Back to Course"})]}),(0,t.jsxs)("div",{className:"hidden sm:flex items-center gap-3",children:[(0,t.jsx)("div",{className:"flex items-center gap-1",children:s.lessons.map(e=>{let n=m.includes(e.id)&&p.includes(e.id),i=e.id===u.id;return(0,t.jsx)(a.default,{href:`/training/rcm-fundamentals/${e.slug}`,className:`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${n?"bg-green-500 text-white":i?"bg-deep-teal text-white":"bg-light-grey text-mid-grey hover:bg-mid-grey hover:text-white"}`,children:n?(0,t.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.5 12.75l6 6 9-13.5"})}):e.id},e.id)})}),(0,t.jsxs)("span",{className:"text-sm text-mid-grey",children:[g,"% complete"]})]}),(0,t.jsxs)("div",{className:"text-sm text-mid-grey",children:["Lesson ",u.id," of ",s.lessons.length]})]})})}),(0,t.jsx)("div",{className:"container-max px-4 sm:px-6 lg:px-8 py-8",children:(0,t.jsxs)("div",{className:"max-w-3xl mx-auto",children:[(0,t.jsxs)("div",{className:"mb-8",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3 mb-4",children:[(0,t.jsxs)("span",{className:"bg-deep-teal/10 text-deep-teal text-sm font-medium px-3 py-1 rounded-full",children:["Lesson ",u.id]}),(0,t.jsx)("span",{className:"text-mid-grey text-sm",children:u.duration}),T&&(0,t.jsxs)("span",{className:"bg-industrial-amber/10 text-industrial-amber text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1",children:[(0,t.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"})}),"Interactive"]}),N&&R&&(0,t.jsxs)("span",{className:"bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1",children:[(0,t.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.5 12.75l6 6 9-13.5"})}),"Completed"]})]}),(0,t.jsx)("h1",{className:"font-heading text-3xl md:text-4xl font-bold text-slate-navy mb-2",children:u.title}),(0,t.jsx)("p",{className:"text-lg text-mid-grey",children:u.subtitle})]}),T&&I?(0,t.jsx)("div",{className:"mb-8",children:(0,t.jsx)(c,{slides:I,lessonTitle:u.title,onComplete:()=>{j(!0)}})}):(0,t.jsx)("article",{className:"bg-white rounded-xl shadow-sm border border-light-grey p-6 md:p-10 mb-8",children:(0,t.jsx)("div",{className:"prose max-w-none",children:(e=>{let n=e.trim().split("\n"),i=[],a=[],s=!1,o=!1,r=[],l=()=>{a.length>0&&(s?i.push((0,t.jsx)("ol",{className:"list-decimal pl-6 space-y-2 my-4",children:a.map((e,n)=>(0,t.jsx)("li",{className:"text-charcoal",dangerouslySetInnerHTML:{__html:S(e)}},n))},`list-${i.length}`)):i.push((0,t.jsx)("ul",{className:"list-disc pl-6 space-y-2 my-4",children:a.map((e,n)=>(0,t.jsx)("li",{className:"text-charcoal",dangerouslySetInnerHTML:{__html:S(e)}},n))},`list-${i.length}`)),a=[],s=!1)},c=()=>{r.length>0&&(i.push((0,t.jsx)("div",{className:"overflow-x-auto my-6",children:(0,t.jsxs)("table",{className:"w-full border-collapse border border-light-grey",children:[(0,t.jsx)("thead",{children:(0,t.jsx)("tr",{className:"bg-off-white",children:r[0].map((e,n)=>(0,t.jsx)("th",{className:"border border-light-grey px-4 py-2 text-left font-semibold text-slate-navy",dangerouslySetInnerHTML:{__html:S(e)}},n))})}),(0,t.jsx)("tbody",{children:r.slice(2).map((e,n)=>(0,t.jsx)("tr",{children:e.map((e,n)=>(0,t.jsx)("td",{className:"border border-light-grey px-4 py-2 text-charcoal",dangerouslySetInnerHTML:{__html:S(e)}},n))},n))})]})},`table-${i.length}`)),r=[],o=!1)};for(let e=0;e<n.length;e++){let d=n[e];if(!d.trim()){l();continue}if(d.startsWith("|")){o||(o=!0);let e=d.split("|").filter(e=>e.trim()).map(e=>e.trim());d.includes("---")||r.push(e);continue}if(o&&c(),d.startsWith("## ")){l();let e=d.replace("## ","");i.push((0,t.jsx)("h2",{className:"font-heading text-2xl font-bold text-slate-navy mt-10 mb-4",dangerouslySetInnerHTML:{__html:S(e)}},`h2-${i.length}`))}else if(d.startsWith("### ")){l();let e=d.replace("### ","");i.push((0,t.jsx)("h3",{className:"font-heading text-xl font-semibold text-deep-teal mt-8 mb-3",dangerouslySetInnerHTML:{__html:S(e)}},`h3-${i.length}`))}else d.startsWith("---")?(l(),i.push((0,t.jsx)("hr",{className:"my-8 border-light-grey"},`hr-${i.length}`))):d.startsWith("- ")?a.push(d.replace("- ","")):d.match(/^\d+\. /)?(0===a.length&&(s=!0),a.push(d.replace(/^\d+\. /,""))):(l(),i.push((0,t.jsx)("p",{className:"text-charcoal leading-relaxed my-4",dangerouslySetInnerHTML:{__html:S(d)}},`p-${i.length}`)))}return l(),c(),i})(u.content)})}),(!T||M)&&(0,t.jsxs)("div",{className:"bg-gradient-to-r from-deep-teal/10 to-slate-navy/10 rounded-xl p-6 md:p-8 mb-8 border border-deep-teal/20",children:[(0,t.jsxs)("h3",{className:"font-heading text-xl font-bold text-slate-navy mb-4 flex items-center gap-2",children:[(0,t.jsx)("svg",{className:"w-6 h-6 text-deep-teal",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"})}),"Key Takeaways"]}),(0,t.jsx)("ul",{className:"space-y-3",children:u.keyTakeaways.map((e,n)=>(0,t.jsxs)("li",{className:"flex items-start gap-3",children:[(0,t.jsx)("svg",{className:"w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M4.5 12.75l6 6 9-13.5"})}),(0,t.jsx)("span",{className:"text-charcoal",children:e})]},n))})]}),(!T||M)&&(0,t.jsx)("div",{className:"mb-8",children:b||R?(0,t.jsx)(l,{questions:u.quiz,lessonId:u.id,onComplete:e=>{x(u.id,e)},isCompleted:R,previousScore:f[u.id]}):(0,t.jsxs)("div",{className:"bg-white rounded-xl shadow-sm border border-light-grey p-8 text-center",children:[(0,t.jsx)("div",{className:"w-16 h-16 bg-industrial-amber/10 rounded-full flex items-center justify-center mx-auto mb-4",children:(0,t.jsx)("svg",{className:"w-8 h-8 text-industrial-amber",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"})})}),(0,t.jsx)("h3",{className:"font-heading text-xl font-bold text-slate-navy mb-2",children:"Ready to Test Your Knowledge?"}),(0,t.jsx)("p",{className:"text-mid-grey mb-6",children:"Take a quick quiz to reinforce what you've learned in this lesson."}),(0,t.jsx)("button",{onClick:()=>v(!0),className:"bg-deep-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-navy transition-colors",children:"Start Quiz"})]})}),(!T||M)&&(0,t.jsxs)("div",{className:"flex items-center justify-between gap-4",children:[q?(0,t.jsxs)(a.default,{href:`/training/rcm-fundamentals/${q.slug}`,className:"flex items-center gap-2 px-6 py-3 bg-white rounded-lg border border-light-grey text-charcoal hover:border-deep-teal hover:text-deep-teal transition-colors",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 19.5L8.25 12l7.5-7.5"})}),(0,t.jsxs)("div",{className:"text-left",children:[(0,t.jsx)("div",{className:"text-xs text-mid-grey",children:"Previous"}),(0,t.jsx)("div",{className:"font-medium text-sm",children:q.title})]})]}):(0,t.jsx)("div",{}),C?(0,t.jsxs)(a.default,{href:`/training/rcm-fundamentals/${C.slug}`,className:"flex items-center gap-2 px-6 py-3 bg-deep-teal rounded-lg text-white hover:bg-slate-navy transition-colors",children:[(0,t.jsxs)("div",{className:"text-right",children:[(0,t.jsx)("div",{className:"text-xs text-white/70",children:"Next"}),(0,t.jsx)("div",{className:"font-medium text-sm",children:C.title})]}),(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 4.5l7.5 7.5-7.5 7.5"})})]}):(0,t.jsxs)(a.default,{href:"/training/certificate",className:"flex items-center gap-2 px-6 py-3 bg-industrial-amber rounded-lg text-white hover:bg-orange-600 transition-colors",children:[(0,t.jsxs)("div",{className:"text-right",children:[(0,t.jsx)("div",{className:"text-xs text-white/70",children:"Completed all lessons!"}),(0,t.jsx)("div",{className:"font-medium text-sm",children:"Get Your Certificate"})]}),(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"})})]})]})]})})]})}e.s(["default",()=>d],10341)}]);