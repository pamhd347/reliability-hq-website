import { Slide } from '@/components/SlideViewer';

// Module 1: What is RCM? - Slide-based content
export const module1Slides: Slide[] = [
  {
    id: 1,
    title: "Welcome to RCM",
    type: 'intro',
    content: `Reliability Centred Maintenance (RCM) is one of the most powerful methodologies in maintenance engineering.

In this module, you'll learn where RCM came from, what makes it different, and why it's become the gold standard for developing maintenance strategies.

Let's start at the beginning.`
  },
  {
    id: 2,
    title: "The Aviation Problem",
    type: 'concept',
    content: `RCM emerged from the aviation industry in the 1960s and 70s.

Airlines faced a serious problem: **maintenance costs were skyrocketing**, yet aircraft reliability wasn't improving proportionally.

The prevailing assumption was that equipment wore out predictably over time, and that scheduled overhauls prevented failures. But the data told a different story.

Something had to change.`
  },
  {
    id: 3,
    title: "The Surprising Discovery",
    type: 'keypoint',
    content: `In 1978, Stan Nowlan and Howard Heap published their seminal report for United Airlines. Their research challenged everything.

**They discovered that only 11% of equipment actually exhibited age-related failure patterns.**

The remaining 89% showed random or even *increasing* failure rates at the start of life (infant mortality).

This meant that most time-based preventive maintenance was not only wasteful—it could actually be making things worse.`
  },
  {
    id: 4,
    title: "John Moubray and RCM II",
    type: 'concept',
    content: `In 1991, John Moubray published **"RCM II: Reliability-centered Maintenance"**—the definitive guide for implementing RCM in industrial settings.

Moubray took the aviation methodology and made it applicable to any industry: manufacturing, utilities, processing plants, maritime, you name it.

His book remains the essential reference for RCM practitioners worldwide.`
  },
  {
    id: 5,
    title: "What RCM is Really About",
    type: 'concept',
    content: `Moubray emphasised that RCM isn't just about preventing failures. It's about understanding:

- **What the asset is supposed to do** (its functions)
- **How it can fail to fulfil those functions** (functional failures)
- **Why it fails** (failure modes)
- **What happens when it fails** (failure effects)
- **Whether it matters** (failure consequences)

This systematic understanding drives better decisions.`
  },
  {
    id: 6,
    title: "The SAE JA1011 Standard",
    type: 'concept',
    content: `In 1999, the Society of Automotive Engineers (SAE) published **JA1011: "Evaluation Criteria for Reliability-Centered Maintenance (RCM) Processes."**

This standard defines the minimum requirements a process must meet to be called RCM.

**Why does this matter?** Without a standard, anyone could claim their maintenance approach was "RCM." The standard ensures rigour and consistency.`
  },
  {
    id: 7,
    title: "The Seven Questions",
    type: 'keypoint',
    content: `JA1011 specifies that a valid RCM process must answer **seven questions**, in sequence, for each asset:

1. Define the operating context
2. Identify functions and performance standards
3. Determine functional failures
4. Identify failure modes
5. Assess failure effects
6. Evaluate failure consequences
7. Select appropriate maintenance tasks

**If your process doesn't do all of this, it's not RCM—it's something else.**`
  },
  {
    id: 8,
    title: "The Two Maintenance Traps",
    type: 'concept',
    content: `Traditional maintenance often falls into two traps:

**1. Too much maintenance**
Overhauling equipment on fixed schedules regardless of condition. This wastes money and sometimes *introduces* problems.

**2. Too little maintenance**
Waiting for things to break. This leads to unplanned downtime, safety incidents, and costly repairs.

RCM provides a logical framework for finding the right balance.`
  },
  {
    id: 9,
    title: "Why RCM Works",
    type: 'concept',
    content: `RCM recognises fundamental truths about equipment and maintenance:

- Not all failures have the same consequences
- Different failure modes require different responses
- Some failures are acceptable to let happen
- Resources should focus where they matter most

The result? **More reliability with less wasted effort.**`
  },
  {
    id: 10,
    title: "What RCM is NOT",
    type: 'concept',
    content: `Let's clear up some common misconceptions:

- **RCM is not "maintenance optimisation"** — It develops the right strategy from first principles, not tweaking what exists

- **RCM is not software** — Tools help, but RCM is a methodology driven by human analysis

- **RCM is not "RCM-lite"** — Shortcuts that skip steps aren't RCM

- **RCM is not a one-time exercise** — It's a living process that should be reviewed as conditions change`
  },
  {
    id: 11,
    title: "The Bottom Line",
    type: 'summary',
    content: `RCM is a **structured, evidence-based methodology** for developing maintenance strategies.

It focuses on **preserving system function**—not just keeping equipment running. When done properly, it ensures you're doing:

- The **right maintenance**
- On the **right equipment**
- For the **right reasons**

In the next lesson, we'll dive into the heart of RCM: the seven questions that drive every analysis.`
  }
];

// Module 2: The 7 RCM Questions - Slide-based content
export const module2Slides: Slide[] = [
  {
    id: 1,
    title: "The Heart of RCM",
    type: 'intro',
    content: `Every RCM analysis revolves around seven questions. These aren't arbitrary—they follow a logical sequence that ensures you understand your equipment thoroughly before making maintenance decisions.

**The questions must be asked in order.** Skipping ahead or taking shortcuts defeats the purpose.

In this module, you'll master all seven questions and understand why each one matters.`
  },
  {
    id: 2,
    title: "Why Sequence Matters",
    type: 'keypoint',
    content: `The seven questions aren't a checklist you can tackle in any order. Each question builds on the answers from previous questions.

**You can't assess consequences** without first understanding failure effects.

**You can't select maintenance tasks** without knowing consequences.

**You can't identify failure modes** without first defining what "failure" means for that specific function.

Skipping steps leads to gaps in understanding—and flawed maintenance decisions.`
  },
  {
    id: 3,
    title: "Question 1: Functions",
    type: 'concept',
    content: `**"What are the functions and associated performance standards?"**

Before you can maintain something, you need to know what it's supposed to do. This seems obvious, but it's often overlooked.

A function statement must include three elements:
- **A verb** — what the item does
- **An object** — what it acts upon
- **A performance standard** — how well it must do it

Without all three, you can't properly assess whether the function is being fulfilled.`
  },
  {
    id: 4,
    title: "Writing Good Function Statements",
    type: 'example',
    content: `**Bad example:** "The pump pumps water"

This tells us nothing useful. How much water? To where? How fast?

**Good example:** "Transfer cooling water from the reservoir to the heat exchanger at a minimum flow rate of 500 litres per minute"

Notice the specificity. Without that performance standard (500 L/min), how would you know if the pump is "failing"?

A pump moving 400 L/min might be running perfectly mechanically—but it's not meeting its function.`
  },
  {
    id: 5,
    title: "Types of Functions",
    type: 'concept',
    content: `Assets often have multiple functions. Don't just focus on the obvious one.

**Primary functions** — The main reason the asset exists (pumping water, generating power)

**Secondary functions** — Additional requirements like containment, structural integrity, appearance, safety features

**Protective functions** — Safety devices, alarms, trips, relief valves—things that protect against consequences of other failures

Each function needs its own analysis through the remaining six questions.`
  },
  {
    id: 6,
    title: "Question 2: Functional Failures",
    type: 'concept',
    content: `**"In what ways can it fail to fulfil its functions?"**

Once you know the functions, identify *functional failures*—the ways the asset can fail to deliver its required performance.

For our pump with a 500 L/min requirement:
- **Total failure:** Complete inability to transfer water
- **Partial failure:** Transfers less than 500 L/min
- **Degraded performance:** Transfers water but with excessive leakage
- **Intermittent failure:** Sometimes works, sometimes doesn't

Each function can have multiple functional failures. You need to identify them all.`
  },
  {
    id: 7,
    title: "Question 3: Failure Modes",
    type: 'concept',
    content: `**"What causes each functional failure?"**

Now we get into **failure modes**—the specific events or conditions that lead to each functional failure.

For "transfers less than 500 L/min," failure modes might include:
- Impeller wear
- Cavitation damage
- Blocked suction strainer
- Worn seals allowing air ingress
- Motor speed reduction due to winding degradation
- Coupling misalignment causing efficiency loss

**Be specific.** The level of detail matters.`
  },
  {
    id: 8,
    title: "The Right Level of Detail",
    type: 'keypoint',
    content: `**Too vague:** "Pump breaks"

This doesn't help you select a maintenance task. What broke? Why?

**Just right:** "Impeller erosion due to abrasive particles in fluid"

This points to a specific mechanism you can address.

**Too detailed:** "Third vane on impeller erodes at the leading edge due to 50-micron silica particles at velocities exceeding 3m/s"

Unless you're doing root cause analysis, this level is excessive.

**Rule of thumb:** Enough specificity to identify an appropriate maintenance task, but not so much that you're drowning in detail.`
  },
  {
    id: 9,
    title: "Question 4: Failure Effects",
    type: 'concept',
    content: `**"What happens when each failure occurs?"**

Failure effects describe the evidence and immediate consequences of each failure mode. Include:

- **What the operator sees, hears, or notices** — Alarms, unusual sounds, visual indicators
- **Whether the system continues running or stops** — Immediate vs. gradual impact
- **Physical damage or secondary effects** — Does this failure cause other problems?
- **Time and resources to repair** — Downtime, parts, labour required`
  },
  {
    id: 10,
    title: "Failure Effects Example",
    type: 'example',
    content: `For "impeller erosion causing reduced flow":

*"Flow rate gradually decreases over 2-3 months. Low-flow alarm activates when output drops below 450 L/min. Heat exchanger outlet temperature rises above setpoint within 15 minutes of alarm. Requires shutdown of production line within 30 minutes to prevent overheating. Repair requires pump disassembly; typical time 4-6 hours including impeller replacement. Spare impeller cost: £450."*

This level of detail is crucial for the next question—assessing consequences.`
  },
  {
    id: 11,
    title: "Question 5: Consequences",
    type: 'concept',
    content: `**"In what way does each failure matter?"**

Not all failures are equal. A critical safety system failing is very different from a cosmetic issue.

RCM categorises failure consequences into **four types**:

1. Hidden failure consequences
2. Safety and environmental consequences
3. Operational consequences
4. Non-operational consequences

The category determines how much effort is justified to prevent the failure.`
  },
  {
    id: 12,
    title: "Hidden Failures",
    type: 'keypoint',
    content: `**Hidden failures** won't be noticed under normal circumstances.

Examples:
- A standby pump that only runs when the primary fails
- A relief valve that only lifts during overpressure
- A backup generator that only starts on power loss
- A fire suppression system waiting for a fire

**Why are these dangerous?** Because you won't know it's failed until you need it—and then it's too late.

Hidden failures can lead to **multiple failures**—the protected system fails, then the protection fails too.`
  },
  {
    id: 13,
    title: "Safety & Environmental Consequences",
    type: 'keypoint',
    content: `**Safety consequences** — The failure could hurt or kill someone.

**Environmental consequences** — The failure could breach environmental regulations or cause ecological damage.

These get **top priority**. Human life and environmental protection trump economics.

For these consequences, you must find a proactive task that reduces the risk to an acceptable level—or redesign to eliminate the hazard.

*"Run to failure" is never acceptable for safety consequences.*`
  },
  {
    id: 14,
    title: "Operational Consequences",
    type: 'concept',
    content: `**Operational consequences** affect output, quality, or customer service—but don't threaten safety or environment.

Examples:
- Production line stops
- Product quality degrades
- Delivery deadlines missed
- Customer complaints increase

For operational consequences, maintenance decisions become **economic**. Compare the cost of prevention against the cost of failure.

If a task costs more than the failures it prevents, it's not worth doing.`
  },
  {
    id: 15,
    title: "Non-Operational Consequences",
    type: 'concept',
    content: `**Non-operational consequences** — The only impact is the cost of repair.

The equipment doesn't directly affect operations, safety, or environment. Examples:
- Redundant equipment (backup already covers it)
- Non-critical auxiliary systems
- Equipment in standby or mothballed state

For these failures, **run-to-failure is often the right answer**. Why spend money preventing a failure when the failure itself costs less than the prevention?`
  },
  {
    id: 16,
    title: "Question 6: Proactive Tasks",
    type: 'concept',
    content: `**"What can be done to predict or prevent each failure?"**

Now you're ready to select maintenance tasks. For each failure mode, consider these options:

1. **Scheduled on-condition tasks** (predictive maintenance)
2. **Scheduled restoration** (overhauls)
3. **Scheduled discard** (replacement)
4. **Failure-finding tasks** (for hidden failures)

Each has specific criteria that must be met for it to be applicable.`
  },
  {
    id: 17,
    title: "On-Condition Tasks",
    type: 'concept',
    content: `**On-condition (predictive) maintenance** — Check for signs of impending failure, then act if found.

Examples: Vibration analysis, oil analysis, thermography, ultrasound, visual inspection.

**Only works if:**
- The failure has a detectable warning period (P-F interval)
- That interval is consistent enough to act upon
- The task is practical to perform
- You can actually do something when you detect deterioration

This is often the most cost-effective approach when applicable.`
  },
  {
    id: 18,
    title: "Scheduled Restoration",
    type: 'concept',
    content: `**Scheduled restoration** — Overhaul or refurbish at fixed intervals regardless of condition.

**Only works if:**
- There's an identifiable age at which reliability decreases
- Most items survive to that age
- The task restores the item to its original capability

**The catch:** Remember, only 11% of failures are age-related. Most equipment doesn't have a "wear-out age" that justifies scheduled overhauls.

Doing this when it's not applicable wastes money and can introduce problems.`
  },
  {
    id: 19,
    title: "Scheduled Discard",
    type: 'concept',
    content: `**Scheduled discard** — Replace items at fixed intervals regardless of condition.

Used for items where:
- Restoration isn't possible or practical
- The item is relatively inexpensive
- Failure consequences justify the cost

Examples: Seals, filters, gaskets, sacrificial anodes, safety-critical items with known life limits.

Unlike restoration, you're not rebuilding—you're replacing entirely.`
  },
  {
    id: 20,
    title: "Failure-Finding Tasks",
    type: 'keypoint',
    content: `**Failure-finding tasks** — Periodic checks that hidden functions still work.

These apply **only to hidden failures**—things you wouldn't notice during normal operation.

Examples:
- Testing the backup generator monthly
- Function-testing relief valves
- Exercising standby pumps
- Testing emergency shutdowns

The interval depends on how often you need to confirm the protection is available.`
  },
  {
    id: 21,
    title: "Question 7: Default Actions",
    type: 'concept',
    content: `**"What should be done if no proactive task is applicable?"**

Sometimes, no scheduled task is technically appropriate or economically justified. Then you have these options:

- **Redesign** — Change the equipment or process to eliminate the failure mode or reduce its consequences
- **Run to failure** — Accept the failure and deal with it when it happens
- **Combination of tasks** — Use multiple approaches together

This isn't defeat—it's a conscious, informed decision.`
  },
  {
    id: 22,
    title: "Run to Failure is Legitimate",
    type: 'keypoint',
    content: `**"Run to failure" gets a bad reputation, but it's a valid strategy.**

It's appropriate when:
- Consequences are non-operational (only repair costs)
- Some operational consequences where prevention costs more than the failures
- No on-condition task can detect the failure in time
- No restoration/discard task is applicable

The key: It must be a **conscious decision** based on analysis—not neglect or ignorance.

Don't waste resources preventing failures that don't matter.`
  },
  {
    id: 23,
    title: "The Complete Picture",
    type: 'summary',
    content: `The seven questions form a **complete decision-making framework**.

By working through them systematically, you:
- **Understand** what you're maintaining and why
- **Know** every way it can fail and what causes those failures
- **Assess** the impact of each failure
- **Select** tasks based on evidence, not tradition or guesswork

The result is a maintenance programme built on **logic and analysis**, not habit or assumption.`
  },
  {
    id: 24,
    title: "Coming Up Next",
    type: 'summary',
    content: `You now understand the framework that drives every RCM analysis.

**In the next lesson**, we'll take a deeper dive into **failure modes and effects analysis**—where most of the analytical work happens.

You'll learn:
- How to identify failure modes systematically
- How to write effective failure effect statements
- Common pitfalls and how to avoid them
- Practical techniques for real-world analysis`
  }
];

// Module 3: Understanding Failure Modes & Effects - Slide-based content
export const module3Slides: Slide[] = [
  {
    id: 1,
    title: "The Analytical Core",
    type: 'intro',
    content: `Failure Modes and Effects Analysis (FMEA) isn't unique to RCM—it's used across many industries. But in RCM, it takes on a specific purpose.

FMEA provides the **evidence base for maintenance task selection**.

It answers Questions 3 and 4 of the RCM process:
- What causes each functional failure? *(Failure modes)*
- What happens when each failure occurs? *(Failure effects)*

This is where the real analytical work happens.`
  },
  {
    id: 2,
    title: "What Is a Failure Mode?",
    type: 'concept',
    content: `A failure mode is **a single event** that causes a functional failure.

It's not:
- A symptom (what you observe)
- A consequence (what happens after)
- Multiple events combined

Think of it as the specific mechanism or cause that leads from "working correctly" to "not meeting function."`
  },
  {
    id: 3,
    title: "Good Failure Mode Statements",
    type: 'example',
    content: `These are well-written failure modes:

- **"Bearing seizes due to lubricant contamination"**
  *Specific mechanism, clear cause*

- **"Seal deteriorates due to chemical attack from process fluid"**
  *Identifies the degradation mechanism*

- **"Control board fails due to capacitor degradation"**
  *Points to specific component and failure mechanism*

Each one is specific enough to identify what maintenance approach might work.`
  },
  {
    id: 4,
    title: "Bad Failure Mode Statements",
    type: 'example',
    content: `These failure modes need improvement:

- **"Pump doesn't work"**
  *Too vague—describes the functional failure, not the cause*

- **"Maintenance error"**
  *What specifically went wrong? Which step? What error?*

- **"Multiple failures occur"**
  *Each failure mode should be listed separately*

- **"Motor fails"**
  *This could be a dozen different failure modes, each needing different maintenance*`
  },
  {
    id: 5,
    title: "The Goldilocks Zone",
    type: 'keypoint',
    content: `Failure modes need to be at the right level of detail:

**Too high-level:** "Motor fails"
*Could be bearings, windings, insulation, connections—each needs different maintenance*

**Too detailed:** "Third bearing ball in inner race cracks due to fatigue initiated at subsurface inclusion at 34,000 hours"
*More detail than needed for maintenance decisions*

**Just right:** "Motor bearing fails due to fatigue"
*Specific enough to identify a maintenance approach*

Rule of thumb: **Enough detail to select a task, no more.**`
  },
  {
    id: 6,
    title: "Where to Find Failure Modes",
    type: 'concept',
    content: `Multiple sources feed into your FMEA:

1. **Equipment history** — Your CMMS and maintenance records
2. **Manufacturer information** — Manuals, technical bulletins
3. **Generic databases** — OREDA, military handbooks, industry standards
4. **Similar equipment** — Experience from other sites or plants
5. **Expert knowledge** — Your maintenance team and operators

No single source is complete. Use them all.`
  },
  {
    id: 7,
    title: "Equipment History",
    type: 'concept',
    content: `Your CMMS or maintenance records are **goldmines**.

What has actually failed? How often? Under what conditions?

This is **real data about your operating context**—not theoretical, not generic.

The technician who's worked on that pump for 20 years knows things no database contains. Capture that knowledge.

**Warning:** History only shows what has happened, not everything that could happen. New failure modes can emerge.`
  },
  {
    id: 8,
    title: "Generic Databases",
    type: 'concept',
    content: `Industry databases like OREDA (offshore) or military handbooks provide starting points.

But remember:
- **Manufacturers don't know your operating context** — Your duty cycle, environment, and process conditions differ
- **Generic ≠ Specific** — A failure mode common in one industry may be rare in yours
- **Starting point, not gospel** — Every failure mode should be validated for your context

Use databases to prompt thinking, not replace it.`
  },
  {
    id: 9,
    title: "Describing Failure Effects",
    type: 'concept',
    content: `A failure effect statement must describe four things:

1. **Evidence of failure** — What does the operator see, hear, smell, or notice?

2. **Impact on operations** — Does production stop? Quality suffer? Customer impact?

3. **Secondary damage** — Does this failure cause other problems?

4. **Repair requirements** — What's needed to restore function? Time? Parts? Skills?

Without all four, you can't properly assess consequences.`
  },
  {
    id: 10,
    title: "Failure Effect Example",
    type: 'example',
    content: `For "bearing failure due to inadequate lubrication":

*"Abnormal noise audible from pump housing. Vibration alarm activates on local panel at 4mm/s threshold. If not addressed, complete bearing seizure occurs within 2-48 hours depending on load. Shaft damage likely if seizure occurs. Requires pump shutdown for bearing replacement. Spare bearings typically available in stores. Repair time: 6-8 hours including cool-down and realignment."*

This tells you everything needed to assess consequences and justify maintenance.`
  },
  {
    id: 11,
    title: "Evidence Must Be Observable",
    type: 'keypoint',
    content: `The evidence portion of failure effects must describe what someone would actually notice.

**Good evidence descriptions:**
- "Low-flow alarm activates on control panel"
- "Visible leakage at seal housing"
- "Increased vibration detectable by hand"
- "Burning smell from motor housing"

**Poor evidence descriptions:**
- "Internal damage occurs" *(Can't see it)*
- "Efficiency decreases" *(How would you know?)*

If you can't observe it, it's a **hidden failure**—which changes everything.`
  },
  {
    id: 12,
    title: "Reasonably Likely Failure Modes",
    type: 'concept',
    content: `You can't document every conceivable failure mode. Focus on those **reasonably likely** in your context.

**Include failure modes that:**
- Have occurred before (on this equipment or similar)
- Are known to occur in your industry
- Could reasonably occur given operating conditions
- Would have significant consequences if they occurred

**Exclude failure modes that:**
- Are so improbable they're not worth considering
- Require multiple simultaneous failures
- Are already prevented by existing design features`
  },
  {
    id: 13,
    title: "Don't Ignore Catastrophic Failures",
    type: 'keypoint',
    content: `**Important exception:** Don't exclude catastrophic failure modes just because they haven't happened yet.

If consequences are severe enough, even low-probability events deserve consideration.

A pressure vessel explosion might have never occurred at your site—but if one did, the consequences would be devastating.

**Risk = Probability × Consequence**

For very high consequences, even low probability justifies analysis.`
  },
  {
    id: 14,
    title: "Common Mistake #1",
    type: 'concept',
    content: `**Copying generic lists without thinking**

Industry databases are starting points, not gospel.

Every failure mode should be validated for your specific operating context. Ask:
- Does this apply to our equipment configuration?
- Is this relevant to our operating environment?
- Has this ever happened here or at similar sites?
- Are the conditions that cause this present in our operation?

Blindly copying a generic FMEA is not analysis—it's paperwork.`
  },
  {
    id: 15,
    title: "Common Mistake #2",
    type: 'concept',
    content: `**Confusing failure modes with functional failures**

These are different things:

- **Functional failure:** "Pump doesn't deliver required flow"
  *This is the outcome—the function not being met*

- **Failure mode:** "Impeller wear due to abrasive particles"
  *This is the cause—what leads to the functional failure*

Multiple failure modes can cause the same functional failure. Each needs its own analysis.`
  },
  {
    id: 16,
    title: "Common Mistake #3",
    type: 'concept',
    content: `**Listing maintenance errors as failure modes**

"Failed to tighten bolts correctly" isn't a failure mode in the traditional sense—it's a **maintenance-induced failure**.

These are real and should be addressed, but the solution is different:
- Better procedures
- Training and competency
- Supervision and verification
- Tool calibration

You can't "monitor" for maintenance errors the same way you monitor for bearing wear.`
  },
  {
    id: 17,
    title: "Common Mistake #4",
    type: 'concept',
    content: `**Insufficient detail in failure effects**

"Pump stops working" doesn't tell you enough.

You need to know:
- How do you know it's stopped? *(Alarm? Visual? Downstream impact?)*
- What happens next? *(Production impact? Safety issue?)*
- How long to fix it? *(Hours? Days?)*
- What's needed? *(Parts? Skills? Special equipment?)*

Without this detail, you can't properly assess consequences or select tasks.`
  },
  {
    id: 18,
    title: "Common Mistake #5",
    type: 'concept',
    content: `**Analysis paralysis**

Some organisations spend months on FMEA, documenting hundreds of failure modes for a single asset.

This is often overkill.

**Focus effort where consequences are highest.** A critical safety system deserves more analysis than a non-essential auxiliary pump.

Perfect is the enemy of good. A practical FMEA completed is better than a perfect one never finished.`
  },
  {
    id: 19,
    title: "FMEA in Practice: Pump Example",
    type: 'example',
    content: `**Failure Mode:** Impeller erosion due to cavitation

**Failure Effect:** Gradual flow reduction noticed on trending. No immediate alarms. If uncorrected, leads to insufficient cooling in downstream process. Requires impeller replacement during scheduled shutdown. Parts lead time: 2 weeks.

**Maintenance implication:** Condition monitoring via flow trending or vibration analysis can detect this gradually developing failure.`
  },
  {
    id: 20,
    title: "FMEA in Practice: Seal Example",
    type: 'example',
    content: `**Failure Mode:** Mechanical seal failure due to dry running

**Failure Effect:** Leakage visible at seal housing. Depending on fluid, may create safety/environmental hazard. Pump can continue running short-term with minor leakage but risk increases. Repair requires pump isolation and seal replacement (4-6 hours).

**Maintenance implication:** Regular inspection can detect early leakage. For hazardous fluids, seal monitoring instrumentation may be justified.`
  },
  {
    id: 21,
    title: "FMEA in Practice: Bearing Example",
    type: 'example',
    content: `**Failure Mode:** Bearing failure due to inadequate lubrication

**Failure Effect:** Increased noise and vibration. Vibration alarm triggers at 4mm/s. If ignored, complete bearing seizure occurs within 2-48 hours depending on load. Shaft damage likely. Repair time: 8-24 hours.

**Maintenance implication:** Vibration monitoring provides early warning. Lubrication regime review and oil analysis can address root cause.`
  },
  {
    id: 22,
    title: "From FMEA to Tasks",
    type: 'keypoint',
    content: `Good FMEA makes task selection almost obvious:

- **Impeller erosion** (gradual, detectable) → Vibration trending, flow monitoring

- **Seal failure** (visible symptoms) → Regular inspection, seal monitoring

- **Bearing failure** (detectable deterioration) → Vibration monitoring, oil analysis

When failure modes and effects are well-described, the appropriate maintenance approach often becomes clear.

This connection is formalised in the **RCM Decision Diagram**—our next topic.`
  },
  {
    id: 23,
    title: "Key Principles",
    type: 'summary',
    content: `**Failure modes:**
- Single events at the right level of detail
- Specific enough to identify maintenance approaches
- Sourced from history, manufacturers, databases, and experts

**Failure effects:**
- Evidence, operational impact, secondary damage, repair requirements
- Observable symptoms that would be noticed
- Enough detail to assess consequences

**Focus:** Reasonably likely failure modes with significant consequences.`
  },
  {
    id: 24,
    title: "Coming Up Next",
    type: 'summary',
    content: `You now understand how to identify failure modes and describe their effects—the analytical engine of RCM.

**In the next lesson**, we'll explore the **RCM Decision Diagram**—the tool that formalises maintenance task selection.

You'll learn:
- How the decision diagram works
- The logic behind each decision path
- How to apply it to real failure modes
- When each type of task is appropriate`
  }
];

// Module 4: The RCM Decision Diagram - Slide-based content
export const module4Slides: Slide[] = [
  {
    id: 1,
    title: "From Analysis to Action",
    type: 'intro',
    content: `You've identified functions, functional failures, failure modes, and effects. You've categorised consequences.

Now comes the critical step: **selecting maintenance tasks.**

The RCM Decision Diagram is a logical framework that guides this selection. It ensures consistency and prevents the common trap of applying preferred solutions regardless of the problem.`
  },
  {
    id: 2,
    title: "The Logic Structure",
    type: 'concept',
    content: `The decision diagram follows a consistent pattern:

1. **Classify the consequence** — Hidden, safety/environmental, operational, or non-operational

2. **Consider proactive tasks** — On-condition, scheduled restoration, scheduled discard

3. **Apply selection criteria** — Is the task technically feasible? Is it worth doing?

4. **Default action** — What to do if no proactive task is selected

Let's walk through each branch.`
  },
  {
    id: 3,
    title: "Hidden Failures",
    type: 'concept',
    content: `**Hidden failures** are not evident to operating crew under normal circumstances.

Examples:
- Standby equipment that only operates during emergencies
- Protective devices (pressure relief valves, circuit breakers)
- Backup systems (emergency generators, redundant pumps)
- Safety interlocks and trips

**Why they're dangerous:** A hidden failure on its own doesn't cause immediate problems.`
  },
  {
    id: 4,
    title: "The Multiple Failure Problem",
    type: 'keypoint',
    content: `Hidden failures become dangerous when combined with another failure.

**Example scenario:**
- The backup pump has failed silently
- Then the primary pump fails
- Result: **Zero pumping capacity**

If the backup had been working, the primary pump failure would have been a minor inconvenience. With the hidden failure, it becomes a crisis.

This is why detecting hidden failures is critical.`
  },
  {
    id: 5,
    title: "Tasks for Hidden Failures",
    type: 'concept',
    content: `Task selection sequence for hidden failures:

1. **Scheduled on-condition task** — Can you detect degradation before failure?

2. **Scheduled restoration or discard** — Can you restore or replace at fixed intervals?

3. **Failure-finding task** — Periodic checks to confirm the item still works

4. **Redesign** — If nothing else works and the risk is unacceptable

For hidden failures with safety consequences, task intervals must ensure unavailability risk is acceptably low.`
  },
  {
    id: 6,
    title: "Failure-Finding Tasks",
    type: 'keypoint',
    content: `**Failure-finding tasks** are unique to hidden failures.

These are periodic checks to confirm the hidden function still works:
- Testing the backup generator monthly
- Function-testing relief valves
- Exercising standby pumps
- Testing emergency shutdowns
- Checking smoke detectors

The interval depends on:
- Required availability of the protected function
- Consequence severity if both primary and backup fail`
  },
  {
    id: 7,
    title: "Safety/Environmental Branch",
    type: 'concept',
    content: `When a failure mode could **hurt someone** or **cause environmental harm**, it gets the most rigorous treatment.

This branch has the strictest requirements:
- Proactive maintenance is mandatory
- Economic considerations are secondary to risk reduction
- "Run to failure" is **never acceptable**

The goal: Reduce risk to an acceptable level through reliable task selection—or eliminate the hazard through redesign.`
  },
  {
    id: 8,
    title: "Tasks for Safety/Environmental",
    type: 'concept',
    content: `Task selection sequence:

1. **Scheduled on-condition task**
   - Is there a detectable degradation period?
   - Can we detect it reliably?
   - Can we act before the hazardous failure occurs?

2. **Scheduled restoration or discard**
   - Is there a predictable wear-out age?
   - Do most items survive to that age?

3. **Redesign** — If no proactive task can reduce risk to acceptable levels`
  },
  {
    id: 9,
    title: "No 'Run to Failure' for Safety",
    type: 'keypoint',
    content: `**Critical point:** For safety consequences, "no scheduled maintenance" is NOT acceptable.

You must either:
- Find an effective proactive task that reduces risk to acceptable levels, OR
- Redesign to eliminate or mitigate the hazard

There is no third option.

Human life and environmental protection trump economics. If you can't maintain it safely, change the design.`
  },
  {
    id: 10,
    title: "Operational Branch",
    type: 'concept',
    content: `**Operational failures** affect production, quality, or customer service—but don't threaten safety or environment.

The selection criteria now include **economic justification**.

The key question becomes: **Is preventing this failure worth the cost of prevention?**

Compare the total cost of the maintenance task over time against the expected cost of failures it would prevent.`
  },
  {
    id: 11,
    title: "Tasks for Operational",
    type: 'concept',
    content: `Task selection sequence:

1. **Scheduled on-condition task**
   - Technically feasible, AND
   - Cost of task over time < cost of failures prevented

2. **Scheduled restoration or discard**
   - Technically feasible, AND
   - Economically justified

3. **No scheduled maintenance**
   - Accept the failure when it occurs (run to failure)

The economic question: Would spending £X on maintenance save more than £X in avoided failures?`
  },
  {
    id: 12,
    title: "Non-Operational Branch",
    type: 'concept',
    content: `**Non-operational failures** — The only consequence is the direct cost of repair.

The equipment doesn't affect:
- Production output
- Product quality
- Customer service
- Safety
- Environment

Examples: Redundant equipment (backup already covers it), non-critical auxiliaries, mothballed equipment.`
  },
  {
    id: 13,
    title: "Tasks for Non-Operational",
    type: 'concept',
    content: `Task selection sequence:

1. **Scheduled on-condition task** — Only if cost-effective

2. **Scheduled restoration or discard** — Only if cost-effective

3. **No scheduled maintenance** — Often the right choice

For non-operational failures, **run to failure is frequently appropriate**.

Don't spend money preventing failures that don't matter. Repair costs are often lower than prevention costs.`
  },
  {
    id: 14,
    title: "On-Condition Tasks",
    type: 'concept',
    content: `**On-condition (predictive) maintenance** detects that failure is in progress before it causes functional failure.

Examples:
- Vibration monitoring for bearing wear
- Oil analysis for contamination and wear particles
- Thermography for electrical hot spots
- Ultrasonic testing for leaks and valve issues
- Process parameter trending (flow, pressure, temperature)`
  },
  {
    id: 15,
    title: "On-Condition Criteria",
    type: 'keypoint',
    content: `For an on-condition task to be applicable:

1. **Detectable deterioration exists** — The failure develops progressively, not suddenly

2. **Consistent P-F interval** — The time from detectable degradation to failure is predictable

3. **Task interval < P-F interval** — You check often enough to catch it in time

4. **Practical to perform** — You can actually do the monitoring/inspection

If any criterion fails, on-condition isn't appropriate for this failure mode.`
  },
  {
    id: 16,
    title: "The P-F Interval",
    type: 'keypoint',
    content: `The **P-F interval** is crucial for on-condition tasks.

**P** = Point where degradation becomes detectable (Potential failure)
**F** = Functional failure

The task interval must be shorter than P-F to catch failures in time.

**Example:** If bearing deterioration is detectable 4 weeks before failure, check at least every 2 weeks.

If P-F is too short or unpredictable, on-condition monitoring won't work.`
  },
  {
    id: 17,
    title: "Scheduled Restoration",
    type: 'concept',
    content: `**Scheduled restoration** restores capability at fixed intervals through overhaul or refurbishment.

Selection criteria:
- There's an identifiable age at which reliability decreases
- A sufficiently large proportion of items survive to that age
- The task restores original condition

**Remember:** Only 11% of failures are age-related. Most equipment doesn't have a predictable "wear-out age."`
  },
  {
    id: 18,
    title: "Scheduled Discard",
    type: 'concept',
    content: `**Scheduled discard** replaces items at fixed intervals regardless of condition.

Same criteria as restoration, but:
- Replacement is more practical than overhaul
- Item is relatively inexpensive
- Restoration isn't possible (e.g., seals, filters)

Examples:
- Seals and gaskets
- Filters
- Sacrificial anodes
- Items with defined life limits (aerospace components)`
  },
  {
    id: 19,
    title: "Default Actions Summary",
    type: 'concept',
    content: `When no proactive task is selected:

**Hidden failures:** Failure-finding task, then redesign if unavailability is unacceptable

**Safety/environmental:** Redesign is mandatory—you cannot accept these failures

**Operational:** No scheduled maintenance (run to failure) if economically justified

**Non-operational:** No scheduled maintenance (run to failure)`
  },
  {
    id: 20,
    title: "Walk-Through Example",
    type: 'example',
    content: `**Failure mode:** "Heat exchanger tubes fail due to corrosion"

**Step 1:** Is this hidden? *No—tube failure shows via temperature changes and leakage*

**Step 2:** Safety/environmental consequences? *Assume no (cooling water, non-hazardous)*

**Step 3:** Operational consequences? *Yes—affects process temperature, causes production issues*

Now we evaluate tasks for operational consequences...`
  },
  {
    id: 21,
    title: "Walk-Through: Task Selection",
    type: 'example',
    content: `**Continuing the heat exchanger example...**

**On-condition task feasible?**
- Yes: Periodic eddy current testing detects wall thinning
- Economic: Testing cost vs. failure cost—assume yes

→ **Select: Scheduled eddy current inspection**

If on-condition wasn't feasible, we'd ask:
- Is scheduled tube bundle replacement feasible and economic?
- If not: Accept failures and repair when they occur`
  },
  {
    id: 22,
    title: "Key Principles",
    type: 'keypoint',
    content: `**Follow the logic** — Don't jump to your favourite maintenance type. Let the diagram guide you.

**Technical feasibility first, then economics** — A task must work before asking if it's worth it.

**Default wisely** — "No scheduled maintenance" isn't failure; it's a conscious decision.

**Document your reasoning** — Future analysts need to understand why tasks were selected.`
  },
  {
    id: 23,
    title: "Try It Yourself",
    type: 'concept',
    content: `Want to practice using the decision diagram?

Our **interactive RCM Decision Diagram tool** lets you work through real scenarios step by step.

You'll input:
- Failure mode details
- Consequence category
- Task feasibility answers

And the tool guides you to the appropriate maintenance decision.

Find it in the **Tools** section of this site.`
  },
  {
    id: 24,
    title: "Coming Up Next",
    type: 'summary',
    content: `You now understand the decision logic that drives RCM task selection.

**In the final lesson**, we'll cover **implementing RCM in your organisation**:

- How to scope and prioritise RCM studies
- Building the right team
- Facilitating effective analysis sessions
- Turning analysis into working maintenance programs
- Making RCM a living process`
  }
];

// Module 5: Implementing RCM in Your Organisation - Slide-based content
export const module5Slides: Slide[] = [
  {
    id: 1,
    title: "From Theory to Practice",
    type: 'intro',
    content: `Understanding RCM methodology is one thing. Implementing it successfully in your organisation is another.

**Many RCM initiatives fail**—not because the analysis was wrong, but because implementation was mishandled.

In this final module, you'll learn what actually makes RCM succeed in the real world.`
  },
  {
    id: 2,
    title: "Critical Success Factor #1",
    type: 'keypoint',
    content: `**Management Commitment**

RCM requires resources:
- Time for analysis sessions
- Skilled facilitators
- Changes to maintenance practices
- Budget for training and tools

Without management buy-in, you'll struggle to get these.

**Don't start with:** "Let's try RCM on this small project and see if it works."

**Do start with:** "We're committed to RCM because [business reasons]. Here's our implementation plan."`
  },
  {
    id: 3,
    title: "Critical Success Factor #2",
    type: 'keypoint',
    content: `**Clear Objectives**

Why are you implementing RCM? Define this clearly:

- Reduce unplanned downtime?
- Cut maintenance costs?
- Improve safety performance?
- Meet regulatory requirements?
- Extend asset life?

Your objective shapes:
- Where you start
- What you measure
- How you define success`
  },
  {
    id: 4,
    title: "Critical Success Factor #3",
    type: 'keypoint',
    content: `**Realistic Expectations**

RCM is not a quick fix.

A thorough analysis of a complex system takes **weeks or months**.

Benefits take time to materialise as new maintenance practices bed in.

**Typical timeline:** 6-18 months before significant measurable improvements.

Set expectations accordingly. This is an investment with long-term payoff.`
  },
  {
    id: 5,
    title: "Selecting Your First Analysis",
    type: 'concept',
    content: `**Don't start with your most critical, complex asset.**

**Don't start with something trivial.**

Choose a system that:
- Is important enough to justify the effort
- Has sufficient failure history to inform analysis
- Has knowledgeable operators and maintainers available
- Isn't in crisis mode (you need focused time)
- Will produce visible results to build momentum`
  },
  {
    id: 6,
    title: "Good First Candidate",
    type: 'example',
    content: `**Ideal characteristics:**

A moderately critical production system with:
- Known reliability issues (so improvements are visible)
- Engaged stakeholders (people who want it to work)
- Reasonable complexity (not overwhelming)
- Available documentation (P&IDs, manuals, history)

**Example:** A packaging line with recurring downtime issues, where the operators and maintenance team are frustrated and want solutions.

Early success builds momentum for expanding RCM.`
  },
  {
    id: 7,
    title: "Building the Analysis Team",
    type: 'concept',
    content: `RCM is a team sport. You need diverse perspectives:

- **Facilitator** — Guides process, ensures methodology, documents results
- **Operators** — Know normal behaviour, first to notice changes
- **Maintainers** — Know failure history, repair challenges
- **Technical experts** — Engineers, reliability specialists
- **Management representative** — Decision authority, business reality

**Typical team size:** 4-7 people. Too few loses perspective; too many becomes unwieldy.`
  },
  {
    id: 8,
    title: "The Facilitator Role",
    type: 'concept',
    content: `The facilitator is critical. They:

- Guide the team through the 7 questions
- Keep discussions focused and productive
- Ensure methodology is followed correctly
- Manage team dynamics and conflicts
- Document results accurately
- Challenge assumptions constructively

**Essential:** The facilitator should be trained in RCM methodology. This isn't a role for "whoever's available."`
  },
  {
    id: 9,
    title: "Why Operators & Maintainers Matter",
    type: 'keypoint',
    content: `**Operators** know things no documentation captures:
- How equipment behaves in normal operation
- Early warning signs of problems
- Workarounds currently in use
- Operating context nuances

**Maintainers** know:
- What actually fails and how often
- What's difficult to repair
- Where maintenance time really goes
- Failure modes the manuals don't mention

This tacit knowledge is invaluable. **Never do RCM without frontline input.**`
  },
  {
    id: 10,
    title: "Preparation Phase",
    type: 'concept',
    content: `Before analysis sessions, gather:

- **Documentation:** P&IDs, equipment lists, manuals
- **Maintenance history:** Work orders, failure records
- **Operating context:** Performance requirements, duty cycles

Also:
- Define system boundaries clearly
- Identify all functions and sub-systems
- Schedule analysis sessions (typically 2-4 hour blocks)
- Brief team members on the process`
  },
  {
    id: 11,
    title: "Conducting Analysis Sessions",
    type: 'concept',
    content: `Work through the 7 questions systematically:

1. Document functions with performance standards
2. Identify all functional failures
3. List reasonably likely failure modes
4. Describe failure effects
5. Classify consequences
6. Select maintenance tasks using the decision diagram
7. Document default actions where no task selected

**Pace yourself:** A complex system might take 20-40 hours of facilitated analysis. This is an investment, not an expense.`
  },
  {
    id: 12,
    title: "Documentation Matters",
    type: 'keypoint',
    content: `Record everything. Future analysts need to understand your reasoning.

Good documentation includes:
- Complete FMEA worksheets
- Task selection rationale (why this task?)
- Assumptions and operating context
- Dissenting opinions and how resolved

**Poor documentation** means the analysis can't be updated, questioned, or validated later. It becomes a black box.`
  },
  {
    id: 13,
    title: "Analysis Without Implementation...",
    type: 'keypoint',
    content: `**...is just an expensive documentation exercise.**

The analysis report isn't the deliverable. **Changed maintenance practices** are the deliverable.

Too many organisations complete beautiful RCM analyses that sit on shelves gathering dust.

Ensure clear ownership of implementation before analysis begins.`
  },
  {
    id: 14,
    title: "Implementing Results",
    type: 'concept',
    content: `Compare RCM recommendations to current practices:

- What **new tasks** are needed?
- What existing tasks should be **removed** or modified?
- What task **frequencies** change?

**Key insight:** RCM often eliminates unnecessary maintenance while adding targeted new tasks.

The goal is **better** maintenance, not **more** maintenance.`
  },
  {
    id: 15,
    title: "Update Systems & Procedures",
    type: 'concept',
    content: `Make changes real by updating:

- **CMMS work orders** — New tasks, revised frequencies
- **Standard operating procedures** — Changed practices
- **Training materials** — New methods or checks

Also critical:
- **Brief maintenance teams** on changes and reasons
- **Establish feedback mechanisms** — How will you know if it's working?`
  },
  {
    id: 16,
    title: "Pilot Before Full Rollout",
    type: 'concept',
    content: `Don't change everything at once.

Implement changes on a **subset of equipment** first:
- Validate that tasks work as expected
- Identify practical problems
- Refine procedures
- Build confidence

Then expand to remaining equipment.

This reduces risk and builds evidence for broader rollout.`
  },
  {
    id: 17,
    title: "Failure #1: Analysis Paralysis",
    type: 'concept',
    content: `**The trap:** Spending so long on analysis that enthusiasm dies before implementation.

Teams pursue "perfect" analysis indefinitely. Meanwhile:
- Stakeholders lose interest
- Team members move on
- Conditions change
- Nothing improves

**The fix:** Set time limits. Accept "good enough." A practical analysis completed beats a perfect one never finished.`
  },
  {
    id: 18,
    title: "Failure #2: No Implementation Ownership",
    type: 'concept',
    content: `**The trap:** The analysis team finishes, hands over a report, and moves on.

Who implements? Without clear ownership, nothing changes.

**The fix:** Assign implementation ownership before analysis begins. The owner should:
- Attend analysis sessions
- Understand the reasoning
- Have authority to make changes
- Be accountable for results`
  },
  {
    id: 19,
    title: "Failure #3: Resistance from Teams",
    type: 'concept',
    content: `**The trap:** "We've always done it this way" is powerful.

Maintenance teams resist changes they don't understand or weren't consulted about.

**The fix:**
- Involve maintenance in analysis (not just as information sources)
- Explain the reasoning behind changes
- Show early wins to build credibility
- Listen to concerns—they may have valid points`
  },
  {
    id: 20,
    title: "Failure #4: No Feedback Loop",
    type: 'concept',
    content: `**The trap:** RCM isn't a one-time exercise, but it's treated as one.

Failures still occur. Operating context changes. New failure modes emerge. Without feedback, the analysis becomes stale.

**The fix:** Build mechanisms to update analyses when:
- Significant failures occur
- Operating conditions change
- New failure modes are discovered
- Equipment is modified`
  },
  {
    id: 21,
    title: "Sustaining RCM",
    type: 'concept',
    content: `**Living system approach:**

RCM analyses should be updated regularly, not filed and forgotten.

**Track metrics that show RCM is working:**
- Unplanned downtime trends
- Maintenance cost per unit of output
- Mean time between failures (MTBF)
- Failure rates for analysed equipment

If tasks aren't preventing failures, revisit the analysis. If failures aren't occurring, perhaps tasks can be extended.`
  },
  {
    id: 22,
    title: "Knowledge Management",
    type: 'keypoint',
    content: `**People leave. Institutional knowledge walks out the door.**

Protect against this by:
- Documenting thoroughly (rationale, not just decisions)
- Building capability in multiple individuals
- Training replacements before departures
- Making RCM part of onboarding

The analysis is only as valuable as the organisation's ability to understand and update it.`
  },
  {
    id: 23,
    title: "Resources for Your Journey",
    type: 'concept',
    content: `**Templates:** Use structured FMEA worksheets to guide analysis

**Tools:** Our RCM Decision Diagram tool helps work through task selection

**Training:** Facilitator training is essential for leading analyses effectively

**Standards:** Keep SAE JA1011 and JA1012 handy as references

**Community:** Connect with other reliability professionals to share experiences`
  },
  {
    id: 24,
    title: "Congratulations!",
    type: 'summary',
    content: `You've completed the **RCM Fundamentals** course.

You now understand:
- What RCM is and where it came from
- The 7 questions that drive every analysis
- How to analyse failure modes and effects
- How to use the decision diagram to select tasks
- How to implement RCM successfully

**But knowledge without application is potential unfulfilled.**`
  },
  {
    id: 25,
    title: "Your Next Steps",
    type: 'summary',
    content: `**1. Apply these concepts** to a real piece of equipment in your facility

**2. Consider our premium courses** for deeper expertise (RCM Practitioner Preparation)

**3. Explore our templates and tools** to accelerate your work

**4. Join our community** of reliability professionals

**Congratulations on taking this step in your reliability journey.**

Now go make your equipment work better. 🔧`
  }
];

// Map of lesson IDs to their slides
export const lessonSlides: Record<number, Slide[]> = {
  1: module1Slides,
  2: module2Slides,
  3: module3Slides,
  4: module4Slides,
  5: module5Slides,
};

// Helper function to check if a lesson has slides
export function hasSlides(lessonId: number): boolean {
  return lessonId in lessonSlides;
}

// Helper function to get slides for a lesson
export function getSlides(lessonId: number): Slide[] | undefined {
  return lessonSlides[lessonId];
}
