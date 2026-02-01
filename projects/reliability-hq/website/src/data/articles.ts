export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'rcm-basics' | 'implementation' | 'case-studies' | 'industry-news';
  author: string;
  publishDate: string;
  readTime: number; // minutes
  featured: boolean;
  metaDescription: string;
  relatedSlugs: string[];
}

export const categoryLabels: Record<Article['category'], string> = {
  'rcm-basics': 'RCM Basics',
  'implementation': 'Implementation',
  'case-studies': 'Case Studies',
  'industry-news': 'Industry News',
};

export const articles: Article[] = [
  {
    slug: 'what-is-rcm',
    title: 'What is RCM? A Complete Guide for Maintenance Professionals',
    excerpt: 'Everything you need to know about Reliability Centred Maintenance—its history, definition, the 7 questions, and how to apply it in your organisation.',
    category: 'rcm-basics',
    author: 'Reliability HQ',
    publishDate: '2026-01-15',
    readTime: 12,
    featured: true,
    metaDescription: 'Learn what RCM (Reliability Centred Maintenance) is, its history from aviation to industry, the 7 RCM questions, SAE JA1011 compliance, and how to implement it effectively.',
    relatedSlugs: ['7-rcm-questions-explained', 'rcm-vs-pm-optimization', 'fmea-step-by-step-guide'],
    content: `
## Introduction

Reliability Centred Maintenance (RCM) is a structured methodology for determining the maintenance requirements of physical assets in their operating context. If you've worked in maintenance or reliability engineering, you've likely heard the term thrown around—but what does it actually mean, and why does it matter?

In this comprehensive guide, we'll explore everything you need to know about RCM: where it came from, how it works, and how you can apply it to improve reliability and reduce maintenance costs in your organisation.

## A Brief History of RCM

### The Aviation Origins

RCM didn't emerge from a factory floor or a university research lab. It was born out of necessity in the commercial aviation industry during the 1960s.

At that time, the prevailing maintenance philosophy was simple: the older something gets, the more likely it is to fail. Therefore, preventive maintenance meant overhauling or replacing components at fixed intervals. The problem? Aircraft were becoming increasingly complex, and this approach was becoming prohibitively expensive.

In 1960, the Federal Aviation Administration (FAA) established a task force with representatives from the airlines to re-examine maintenance practices. What they discovered challenged fundamental assumptions about equipment failure.

### The MSG Process

The task force developed what became known as Maintenance Steering Group (MSG) logic—a decision-based approach to determining maintenance requirements. This evolved through several iterations:

- **MSG-1 (1968):** Applied to the Boeing 747
- **MSG-2 (1970):** Refined the logic further
- **MSG-3 (1980):** Still used in aviation today

The key insight was revolutionary: **most equipment failure modes do not follow a predictable age-related pattern**. In fact, their research showed that only about 11% of failures were age-related, while 89% were random.

### From Aviation to Industry

In 1978, the US Department of Defense commissioned Stanley Nowlan and Howard Heap of United Airlines to document the methodology. Their report, "Reliability-Centered Maintenance," became the foundation for modern RCM.

John Moubray later adapted these principles for general industry in his landmark book "RCM II" (1991), which remains the definitive reference for practitioners. His work made RCM accessible beyond aviation, applying it to manufacturing, utilities, and process industries.

## What is RCM? A Definition

At its core, RCM is a process used to determine what must be done to ensure that any physical asset continues to fulfil its intended functions in its present operating context.

Let's break that down:

- **"What must be done"** — We're determining maintenance requirements, not assuming them
- **"Physical asset"** — Equipment, systems, infrastructure—things that can fail
- **"Intended functions"** — Not just "keep it running," but what it needs to actually do
- **"Operating context"** — The specific environment and conditions where it operates

RCM is fundamentally about asking the right questions. It doesn't assume that maintenance is always the answer. Sometimes, the right response to a failure mode is to run the equipment to failure. Other times, it's to redesign the system entirely.

## The Seven Questions of RCM

Every RCM analysis follows a structured questioning process. These seven questions form the backbone of the methodology:

### 1. What are the functions and associated performance standards of the asset in its present operating context?

Before you can preserve function, you must define it. This isn't just "the pump pumps water." It's specific: "Transfer cooling water at 150 litres per minute at 4 bar pressure from the reservoir to the heat exchanger."

Functions can be:
- **Primary functions:** The main reason the asset exists
- **Secondary functions:** Safety, containment, control, comfort, efficiency, environmental compliance, structural integrity

### 2. In what ways can it fail to fulfil its functions?

A functional failure is the inability to fulfil a function to a standard acceptable to the user. For our pump example:
- Unable to transfer any water (complete failure)
- Unable to transfer water at 150 L/min (reduced capacity)
- Unable to maintain 4 bar pressure (performance degradation)

### 3. What causes each functional failure?

These are the failure modes—the specific events that lead to functional failure. For the pump:
- Impeller wear
- Seal failure
- Motor bearing failure
- Electrical fault in motor windings
- Coupling failure
- Blocked suction strainer

Good RCM analysis identifies failure modes at a level of detail that allows appropriate maintenance action.

### 4. What happens when each failure occurs?

Failure effects describe what happens when the failure mode occurs—the sequence of events. This includes:
- Evidence that the failure has occurred
- How it affects safety or the environment
- How it affects operations
- What physical damage results
- What must be done to repair it

### 5. In what way does each failure matter?

This question assesses failure consequences. RCM categorises these as:

- **Hidden failure consequences:** The failure isn't evident under normal conditions
- **Safety and environmental consequences:** Could hurt someone or breach regulations
- **Operational consequences:** Affects output, quality, customer service, or costs
- **Non-operational consequences:** Only involves the cost of repair

### 6. What should be done to predict or prevent each failure?

This is where we select proactive maintenance tasks:

- **Scheduled restoration:** Restore to original capability at fixed intervals
- **Scheduled discard:** Replace at fixed intervals
- **Scheduled on-condition tasks:** Check for potential failures (inspections, testing)

A task is only worth doing if it deals with the consequences of failure effectively and is worth doing compared to not doing it.

### 7. What should be done if a suitable proactive task cannot be found?

When no proactive task is appropriate or cost-effective:

- **Failure-finding tasks:** For hidden failures, periodic checks to determine if something has failed
- **Redesign:** Change the equipment or operating conditions
- **Run to failure:** Accept the consequences and fix it when it breaks

## SAE JA1011: The RCM Standard

In 1999, the Society of Automotive Engineers published SAE JA1011, "Evaluation Criteria for Reliability-Centered Maintenance (RCM) Processes." This standard defines the minimum criteria any process must meet to be called "RCM."

### Key Requirements

To comply with SAE JA1011, an RCM process must:

1. Define functions and performance standards in operating context
2. Determine how the asset can fail to fulfil its functions
3. Identify failure modes likely to cause each functional failure
4. Describe failure effects for each failure mode
5. Classify failure consequences
6. Select maintenance tasks that are applicable and effective
7. Address situations where no applicable task can be found

### Why Compliance Matters

Many organisations claim to do "RCM" but are actually doing something else—perhaps equipment-based FMEA, or simplified PM optimisation. There's nothing wrong with these approaches for appropriate applications, but they're not RCM.

SAE JA1011 compliance matters because:

- It ensures rigour and consistency
- It provides a benchmark for auditing
- It gives credibility to your programme
- It ensures you're getting the full benefit of the methodology

## Benefits of RCM

When properly implemented, RCM delivers significant benefits:

### Improved Reliability

By understanding how equipment actually fails and selecting appropriate maintenance tasks, you address the real causes of failure rather than applying blanket PM schedules.

### Reduced Maintenance Costs

Studies consistently show 40-70% reduction in routine maintenance costs. This comes from:
- Eliminating unnecessary time-based maintenance
- Extending intervals where justified
- Running appropriate items to failure
- Focusing resources on what matters

### Better Safety

RCM explicitly addresses safety consequences. Hidden failures that could compromise safety systems are identified and managed through appropriate failure-finding tasks.

### Knowledge Capture

The RCM process documents how equipment works, how it fails, and why maintenance is done. This knowledge often exists only in the heads of experienced personnel—RCM captures it systematically.

### Regulatory Compliance

Many industries require documented justification for maintenance programmes. RCM provides an auditable process that satisfies regulators.

## Key Takeaways

- **RCM originated in aviation** in the 1960s and was adapted for general industry by John Moubray
- **It's a structured process** based on seven questions about functions, failures, and consequences
- **SAE JA1011** defines the minimum criteria for a genuine RCM process
- **RCM is context-specific**—the same equipment in different applications may need different maintenance strategies
- **Benefits include** improved reliability, reduced costs, better safety, and knowledge capture
- **RCM is rigorous but practical**—it's about doing the right maintenance, not more maintenance

## Getting Started with RCM

If you're ready to implement RCM in your organisation, start with these steps:

1. **Build understanding:** Ensure key stakeholders understand what RCM is and isn't
2. **Select a pilot asset:** Choose something important but manageable
3. **Assemble the right team:** Include operators, maintainers, and engineers
4. **Use proper tools:** [Our RCM FMEA Template Pack](/products/rcm-fmea-template-pack) provides SAE JA1011 compliant worksheets
5. **Document everything:** The analysis is only valuable if it's recorded properly
6. **Implement and review:** Put the tasks into your CMMS and monitor results

RCM isn't a quick fix—it requires investment in training and time. But for critical assets where reliability matters, it's the most thorough and effective approach available.

---

*Ready to start your RCM journey? Explore our [RCM Starter Bundle](/products/rcm-starter-bundle) for everything you need, or try our [free RCM Decision Diagram tool](/tools/rcm-decision-diagram) to see the methodology in action.*
`
  },
  {
    slug: 'rcm-vs-pm-optimization',
    title: 'RCM vs PM Optimisation: Which Approach is Right for You?',
    excerpt: 'Comparing Reliability Centred Maintenance and PM Optimisation—understand the differences, pros and cons, and when to use each methodology.',
    category: 'rcm-basics',
    author: 'Reliability HQ',
    publishDate: '2026-01-20',
    readTime: 10,
    featured: false,
    metaDescription: 'Compare RCM and PM Optimisation methodologies. Learn the key differences, advantages, disadvantages, and how to choose the right approach for your maintenance strategy.',
    relatedSlugs: ['what-is-rcm', 'rcm-implementation-mistakes', '7-rcm-questions-explained'],
    content: `
## Introduction

When organisations decide to improve their maintenance strategy, two methodologies often come up: **Reliability Centred Maintenance (RCM)** and **PM Optimisation (PMO)**. Both aim to improve maintenance effectiveness, but they take fundamentally different approaches.

Understanding these differences is crucial. Choosing the wrong methodology—or applying one incorrectly—can waste significant time and resources while delivering disappointing results.

In this article, we'll compare RCM and PM Optimisation, explain when each is appropriate, and help you make the right choice for your situation.

## Understanding the Two Approaches

### RCM: Starting from Functions

Reliability Centred Maintenance is a zero-based approach. It starts with a blank sheet and asks: "What must be done to ensure this asset continues to fulfil its intended functions?"

RCM begins with functions, not tasks. It systematically identifies:
- What the asset must do (functions)
- How it can fail to do that (functional failures)
- What causes those failures (failure modes)
- What happens when failures occur (effects)
- What the consequences are (safety, operational, non-operational)
- What maintenance should be done as a result

The output is a complete maintenance strategy built from first principles.

### PM Optimisation: Starting from Tasks

PM Optimisation takes a different starting point. It looks at your existing preventive maintenance programme and asks: "Which of these tasks are adding value, and which can be eliminated or improved?"

PMO typically involves:
- Reviewing existing PM tasks
- Assessing whether each task is technically appropriate
- Evaluating cost-effectiveness
- Identifying gaps in coverage
- Eliminating redundant or value-destroying tasks
- Adjusting intervals based on evidence

The output is a refined version of your existing programme.

## Key Differences

### Scope and Depth

**RCM** is comprehensive. It examines every function of an asset and systematically identifies all significant failure modes. This thoroughness means nothing is missed, but it also means the process takes longer.

**PMO** is focused. It works with existing knowledge embedded in your current PM tasks. It's faster but relies on your current programme being reasonably complete.

### Resource Requirements

**RCM Analysis** typically requires:
- A cross-functional team (operations, maintenance, engineering)
- A trained facilitator
- 2-4 days per system/asset for initial analysis
- Significant documentation effort

**PM Optimisation** typically requires:
- One or two experienced analysts
- Access to maintenance history and current PM procedures
- 1-2 days per system for review
- Less documentation (building on existing records)

### Starting Point

**RCM** assumes nothing. Even if you've been maintaining equipment for decades, RCM goes back to first principles. This is powerful for complex or critical systems but can feel inefficient for straightforward equipment.

**PMO** assumes your existing programme captures most of what needs to be done. It's about refinement rather than reinvention.

### Information Sources

**RCM** draws primarily on:
- Equipment design documentation
- Operating context information
- Experienced personnel (operators, maintainers, engineers)
- Failure data where available

**PMO** draws primarily on:
- Current PM task lists
- Maintenance history and failure records
- Vendor recommendations
- Industry standards and guidelines

## When to Use RCM

RCM is the right choice when:

### The Asset is New or Unfamiliar

When introducing new equipment or technology, you don't have an existing maintenance programme to optimise. RCM builds one from scratch based on understanding how the equipment can fail.

### The Consequences of Failure are Severe

For assets where failure could cause safety incidents, environmental damage, or major production losses, RCM's rigorous approach is justified. The thorough analysis ensures nothing critical is overlooked.

### You're Starting with a Poor Baseline

If your current maintenance programme is known to be inadequate, ineffective, or based on outdated assumptions, RCM provides a clean-slate approach. Optimising a poor programme just gives you a slightly better poor programme.

### Regulatory Requirements Demand It

Some industries require documented justification for maintenance strategies. Nuclear, aerospace, and some defence applications specifically require RCM or RCM-like processes.

### You Need to Capture Knowledge

RCM creates comprehensive documentation of how equipment works and fails. If you're losing experienced personnel or need to standardise across sites, RCM captures institutional knowledge systematically.

## When to Use PM Optimisation

PM Optimisation is the right choice when:

### You Have a Mature Programme

If your existing PM programme has evolved over years and generally works, PMO helps refine it without starting over. You preserve what works while eliminating waste.

### Resources are Limited

PMO is typically faster and requires fewer people. If you can't dedicate a cross-functional team for extended analysis sessions, PMO may be more practical.

### The Risk Profile is Lower

For general plant equipment where failure consequences are primarily economic, PMO provides sufficient rigour. Not every pump needs a full RCM analysis.

### You Need Quick Results

PMO can deliver improvements faster than RCM. If you're under pressure to show results, optimising your existing programme can produce measurable benefits in weeks rather than months.

### You're Dealing with Many Similar Assets

For fleets of similar equipment (identical pumps, standard motors, common valves), PMO can quickly identify improvements that apply across the population.

## The Hybrid Approach

In practice, many successful organisations use both methodologies strategically:

**Use RCM for:**
- Safety-critical systems
- Production-critical equipment
- Complex or novel assets
- Assets with high failure consequences

**Use PMO for:**
- General plant equipment
- Standard, well-understood assets
- Large populations of similar equipment
- Situations requiring quick improvements

This tiered approach focuses rigorous analysis where it delivers the most value while using more streamlined methods elsewhere.

## Common Mistakes

### Mistake 1: Using PMO When RCM is Needed

Optimising an existing programme assumes that programme is fundamentally sound. If your PM tasks don't address actual failure modes, optimising them just rearranges the deck chairs.

**Example:** A plant "optimised" their pump maintenance by extending intervals and eliminating some tasks. Failures increased because the original tasks weren't addressing the real failure modes—which would have been identified by RCM.

### Mistake 2: Using RCM When PMO Would Suffice

Full RCM analysis on every piece of equipment is overkill and unsustainable. It consumes resources that could be better used elsewhere.

**Example:** A facility spent months conducting detailed RCM analysis on standard instrument air compressors—equipment with well-established maintenance practices and modest failure consequences.

### Mistake 3: Calling PMO "Streamlined RCM"

Some consultants market PM review processes as "streamlined RCM" or "RCM-lite." If the process doesn't meet SAE JA1011 criteria, it isn't RCM—regardless of what it's called.

This matters because:
- You may not get RCM benefits from a non-RCM process
- It can create false confidence in your maintenance strategy
- It may not satisfy regulatory requirements that specify RCM

## A Practical Decision Framework

Here's a simple framework for choosing between RCM and PMO:

### Step 1: Assess Criticality

Use a criticality analysis to rank your assets. Consider:
- Safety consequences of failure
- Environmental consequences
- Production/operational impact
- Cost of failure vs cost of maintenance

### Step 2: Evaluate Your Existing Programme

For each asset or system, ask:
- Do we have a documented maintenance programme?
- Is it based on understanding of failure modes?
- Has it been effective (low unplanned failures)?
- Is it current (reviewed in last 5 years)?

### Step 3: Choose Your Approach

| Criticality | Existing Programme Quality | Recommended Approach |
|-------------|---------------------------|---------------------|
| High | Poor or None | RCM |
| High | Good | RCM or PMO |
| Medium | Poor or None | RCM (simplified) |
| Medium | Good | PMO |
| Low | Any | PMO or Run to Failure |

### Step 4: Resource Accordingly

Whatever approach you choose, ensure adequate resources:
- **RCM:** Trained facilitator, cross-functional team, 2-4 days per system
- **PMO:** Experienced analyst, maintenance history access, 1-2 days per system

## Key Takeaways

- **RCM and PMO are different tools** for different situations—neither is universally "better"
- **RCM is zero-based:** It builds maintenance requirements from first principles
- **PMO is refinement-based:** It improves existing programmes
- **Use RCM for** critical, complex, or novel assets where thoroughness is justified
- **Use PMO for** general equipment with established maintenance practices
- **A hybrid approach** often makes the most sense—apply RCM where it matters most, PMO elsewhere
- **Don't confuse the two:** PMO is not "streamlined RCM" and won't deliver RCM benefits

## Making Your Choice

The right methodology depends on your specific situation. Consider your asset criticality, existing programme maturity, resource availability, and time constraints.

If you're unsure, start with criticality analysis to identify your most important assets. Those typically warrant RCM. The rest can often be addressed through PM Optimisation.

---

*Need help deciding? Our [Criticality Analysis Tool](/products/criticality-analysis-tool) helps you prioritise your assets objectively. For full RCM analysis, our [RCM FMEA Template Pack](/products/rcm-fmea-template-pack) provides everything you need to get started.*
`
  },
  {
    slug: '7-rcm-questions-explained',
    title: 'The 7 RCM Questions Explained with Practical Examples',
    excerpt: 'A deep dive into each of the seven RCM questions with real-world examples from industrial equipment—pumps, motors, valves, and more.',
    category: 'rcm-basics',
    author: 'Reliability HQ',
    publishDate: '2026-01-25',
    readTime: 15,
    featured: true,
    metaDescription: 'Master the 7 RCM questions with practical examples from industrial settings. Learn how to apply each question to pumps, motors, valves, and other equipment.',
    relatedSlugs: ['what-is-rcm', 'fmea-step-by-step-guide', 'rcm-implementation-mistakes'],
    content: `
## Introduction

The seven questions of RCM form the backbone of the methodology. Every RCM analysis, regardless of the asset or industry, follows this same logical sequence. Understanding these questions—and how to answer them properly—is essential for anyone conducting or participating in RCM analysis.

In this article, we'll examine each question in detail, with practical examples drawn from common industrial equipment. By the end, you'll have a solid grasp of how to apply RCM thinking to any asset.

## The Seven Questions at a Glance

Before diving deep, here are the seven questions:

1. What are the functions and associated performance standards?
2. In what ways can it fail to fulfil its functions?
3. What causes each functional failure?
4. What happens when each failure occurs?
5. In what way does each failure matter?
6. What should be done to predict or prevent each failure?
7. What should be done if no proactive task is appropriate?

Now let's examine each one.

---

## Question 1: What Are the Functions?

**"What are the functions and associated performance standards of the asset in its present operating context?"**

This question establishes what we're trying to preserve. Before we can prevent failure, we must define success.

### Primary vs Secondary Functions

**Primary functions** are why the asset exists. They're the main reason it was installed.

**Secondary functions** are additional expectations. These typically include:
- Safety/environmental containment
- Control and indication
- Comfort and appearance
- Structural integrity
- Efficiency
- Compliance

### The Importance of Performance Standards

Functions must be quantified. "The pump pumps water" is not useful. "The pump transfers cooling water at 150 L/min minimum at 4 bar to the heat exchanger" is actionable.

Without performance standards, you can't determine whether something has failed or is deteriorating.

### Practical Example: Centrifugal Cooling Water Pump

**Operating Context:** Provides cooling water to heat exchangers in a chemical process. Runs 24/7. Redundant pump available (standby).

**Primary Function:**
- Transfer cooling water from the reservoir to heat exchangers at a minimum flow rate of 200 L/min at 5 bar discharge pressure

**Secondary Functions:**
- Contain the cooling water (no leaks exceeding 10 mL/hour)
- Allow flow to be isolated when required
- Indicate running status to the control room
- Operate without vibration exceeding 4 mm/s RMS at the bearings
- Consume no more than 15 kW electrical power
- Comply with noise limits (<85 dB at 1m)

Notice how each function is specific and measurable. This clarity is essential for the questions that follow.

---

## Question 2: How Can It Fail?

**"In what ways can it fail to fulfil its functions?"**

A functional failure is the inability of an asset to fulfil a function to a standard acceptable to the user. Each function typically has at least two functional failures:
- Complete loss of function
- Partial loss or degradation of function

### Practical Example: Cooling Water Pump

For the function "Transfer cooling water at 200 L/min at 5 bar":

| Functional Failure Code | Description |
|------------------------|-------------|
| A1 | Unable to transfer any water |
| A2 | Unable to transfer water at 200 L/min |
| A3 | Unable to maintain 5 bar discharge pressure |

For the function "Contain the cooling water (leaks <10 mL/hour)":

| Functional Failure Code | Description |
|------------------------|-------------|
| B1 | External leak exceeding 10 mL/hour |

Each function gets examined for ways it can fail. This ensures comprehensive coverage.

---

## Question 3: What Causes Each Failure?

**"What causes each functional failure?"**

These are the failure modes—the specific events that can cause the functional failure. This is where the analysis gets technical.

### What is a Failure Mode?

A failure mode is a single event that causes a functional failure. Good failure modes are:
- **Reasonably likely to occur:** Not purely theoretical
- **At an appropriate level of detail:** Specific enough to select maintenance, not so detailed it's impractical
- **Single events:** Not combinations of failures

### Example: Failure Modes for "Unable to transfer any water"

For functional failure A1 (unable to transfer any water), failure modes might include:

| FM | Failure Mode |
|----|-------------|
| 1 | Impeller completely worn/eroded |
| 2 | Impeller detached from shaft |
| 3 | Drive motor burnt out (winding failure) |
| 4 | Motor bearing seized |
| 5 | Coupling sheared |
| 6 | Suction strainer completely blocked |
| 7 | Discharge valve closed and jammed |
| 8 | Pump casing cracked |
| 9 | Control system failure preventing start command |

### Level of Detail

The right level of detail allows you to select appropriate maintenance. Consider:

**Too vague:** "Motor fails" — Which part? What maintenance would address this?

**About right:** "Motor bearing fails due to wear" — Can address with vibration monitoring or greasing

**Too detailed:** "Motor drive-end bearing inner race fails due to subsurface fatigue initiating at machining marks" — More detail than needed for maintenance selection

---

## Question 4: What Happens When It Fails?

**"What happens when each failure occurs?"**

Failure effects describe what happens when the failure mode occurs. This information is used later to assess consequences and evaluate maintenance options.

### What to Include in Failure Effects

A good failure effect description includes:
1. **Evidence of failure:** What indicates it has happened?
2. **Safety/environmental impact:** Any hazards created?
3. **Operational impact:** Effect on production, quality, service?
4. **Secondary damage:** Does the failure damage other equipment?
5. **Corrective action:** What's needed to restore function?

### Practical Example: Motor Bearing Seized

**Failure Mode:** Motor bearing seized

**Failure Effect:**

"High-pitched squealing noise heard from motor for 1-2 minutes before motor stops. Control room receives motor trip alarm. Standby pump starts automatically. No safety hazard. Production continues on standby pump. Repair requires motor removal to workshop for bearing replacement (2x 6205-2RS bearings, £40). Estimated repair time 4 hours with two fitters. Motor may need rewinding if operated while seized (additional £800 and 2 weeks if sent away)."

Notice this effect tells us:
- There's warning before complete failure (opportunity for condition monitoring)
- It's not safety-critical (standby available)
- The consequence is primarily repair cost
- Early detection saves significant money

---

## Question 5: In What Way Does It Matter?

**"In what way does each failure matter?"**

This question assesses the consequences of each failure mode. RCM categorises consequences into four types, which directly influence what maintenance (if any) is appropriate.

### Consequence Categories

**Hidden failures:** The failure is not evident to the operating crew under normal circumstances. Examples include:
- Standby equipment that's not running
- Safety devices (relief valves, trips, alarms)
- Protective systems

**Safety/environmental consequences:** The failure could injure someone or breach environmental regulations.

**Operational consequences:** The failure affects output, product quality, customer service, or operating costs (beyond repair cost).

**Non-operational consequences:** The failure only involves the direct cost of repair.

### Why Consequences Matter

Consequences drive maintenance selection:

- **Hidden failures** require failure-finding tasks to detect degradation
- **Safety/environmental** consequences justify more expensive maintenance
- **Operational** consequences may justify proactive maintenance if it's cost-effective
- **Non-operational** consequences often mean run-to-failure is acceptable

### Practical Example: Pump Seal Failure

**Failure Mode:** Mechanical seal failure

**Consequence Assessment:**

*Is the failure evident under normal operating conditions?*  
Yes — seal leak is visible during routine rounds.

*Does the failure cause a safety or environmental hazard?*  
No — cooling water is non-hazardous, contained in drip tray.

*Does the failure affect operations?*  
Marginally — increased seal water consumption (~£5/week). Pump continues operating.

**Consequence category:** Non-operational

This means the failure can potentially be allowed to occur, provided repair cost is reasonable and there's no secondary damage.

---

## Question 6: What Should Be Done?

**"What should be done to predict or prevent each failure?"**

Now we select proactive maintenance tasks. RCM recognises three types of proactive tasks:

### Scheduled On-Condition Tasks

These tasks detect the potential failure before functional failure occurs, giving time to intervene.

**Requirements:**
- There must be a detectable potential failure condition
- There must be a consistent interval between potential and functional failure (P-F interval)
- The task interval must be less than the P-F interval
- It must be practical to do the task at that interval

**Examples:**
- Vibration monitoring (detects bearing wear)
- Thermography (detects electrical hotspots)
- Oil analysis (detects wear particles)
- Visual inspection (detects leaks, corrosion)

### Scheduled Restoration Tasks

These tasks restore the asset's original capability at fixed intervals.

**Requirements:**
- There must be an identifiable age at which wear-out begins
- Most items must survive to that age
- The task must restore original capability

**Examples:**
- Bearing replacement at fixed hours
- Pump impeller restoration
- Filter element replacement

### Scheduled Discard Tasks

These tasks replace items at fixed intervals regardless of condition.

**Requirements:**
- There must be an identifiable wear-out age
- Most items must survive to that age
- Running to failure is unacceptable

**Examples:**
- Safety relief valve replacement
- Seal replacement
- Belt replacement

### Practical Example: Motor Bearing Failure

**Failure Mode:** Motor bearing wear leading to seizure

**Task Selection:**

*Can we detect potential failure?*  
Yes — vibration increase, temperature rise, noise change

*What's the P-F interval?*  
Typically 1-3 months from first detectable vibration change to failure

*Is it practical to monitor at less than that interval?*  
Yes — monthly vibration readings are practical

**Selected Task:** Monthly vibration monitoring (portable analyser), alarm at 4mm/s, action at 7mm/s

**Alternative Considered:** Scheduled bearing replacement at 4 years  
**Why not selected:** Bearings show random failure pattern; 30% fail before 4 years, some last 10+ years. On-condition is more effective.

---

## Question 7: What If No Task Works?

**"What should be done if a suitable proactive task cannot be found?"**

When no proactive task is technically feasible and worth doing, RCM provides three default actions:

### Failure-Finding Tasks

For hidden failures only. Periodic checks to determine if something has already failed.

**Example:** Weekly functional test of emergency shutdown system

### Redesign

Change something to eliminate the failure mode or reduce its consequences.

**Example:** Add redundancy, install better materials, modify operating procedures

### Run to Failure (No Scheduled Maintenance)

Accept the consequences and fix it when it breaks.

**Requirements:**
- The failure must have no safety or environmental consequences
- The failure must be evident
- The cost of repair must be acceptable
- No secondary damage must result

**Example:** Let indicator lights burn out and replace on failure (evident, low consequence, no secondary damage)

### Default Action Selection

| Consequence Category | If No Proactive Task Found |
|---------------------|---------------------------|
| Hidden | Failure-finding is mandatory. If not possible: redesign |
| Safety/Environmental | Redesign is mandatory |
| Operational | Run-to-failure if cost-effective; otherwise redesign |
| Non-operational | Run-to-failure acceptable |

---

## Putting It All Together

Let's trace one complete failure mode through all seven questions:

### Asset: Air-Operated Control Valve

**Q1 — Function:**  
Regulate flow of process fluid from 0-100% proportional to 4-20mA signal, fail-closed on air loss

**Q2 — Functional Failure:**  
Unable to regulate flow proportional to signal

**Q3 — Failure Mode:**  
Positioner feedback linkage disconnected

**Q4 — Failure Effect:**  
"Valve drives to fully open or closed regardless of control signal. Control room operator notices flow deviation alarm within 5 minutes. Manual control can be established via handwheel. Process upset may result in batch quality issue (£5,000 value). Reconnecting linkage takes 30 minutes, one technician."

**Q5 — Consequence:**  
Evident, no safety impact, operational consequence (batch quality risk)

**Q6 — Proactive Task:**  
On-condition task: Weekly visual inspection during rounds to check linkage integrity and tightness. Tighten if loose. Time: 2 minutes.

**Q7 — Default Action:**  
N/A — proactive task identified

---

## Key Takeaways

- **Question 1** establishes what we're protecting — functions must be specific and quantified
- **Question 2** identifies how functions can be lost — both complete and partial failure
- **Question 3** determines what causes failures — at a level allowing maintenance selection
- **Question 4** describes the evidence and impact — essential for consequence assessment
- **Question 5** categorises consequences — this drives maintenance selection
- **Question 6** selects proactive tasks — only if applicable AND worth doing
- **Question 7** provides defaults — failure-finding, redesign, or run-to-failure

The seven questions form a rigorous logic that ensures maintenance is justified, appropriate, and focused on preserving function rather than just "maintaining equipment."

---

*Want to apply these questions to your equipment? Our [RCM FMEA Template Pack](/products/rcm-fmea-template-pack) guides you through each question systematically. Or explore our [FMEA step-by-step guide](/blog/fmea-step-by-step-guide) for detailed instructions on documenting your analysis.*
`
  },
  {
    slug: 'rcm-implementation-mistakes',
    title: 'Common RCM Implementation Mistakes (And How to Avoid Them)',
    excerpt: 'The top 10 mistakes organisations make when implementing RCM—and practical advice to ensure your programme succeeds.',
    category: 'implementation',
    author: 'Reliability HQ',
    publishDate: '2026-01-28',
    readTime: 11,
    featured: false,
    metaDescription: 'Avoid the common RCM implementation mistakes that derail maintenance improvement programmes. Learn from real-world failures and practical solutions.',
    relatedSlugs: ['what-is-rcm', '7-rcm-questions-explained', 'rcm-vs-pm-optimization'],
    content: `
## Introduction

RCM is a powerful methodology. When properly implemented, it delivers significant improvements in reliability, safety, and maintenance costs. Yet many organisations struggle to realise these benefits. Their RCM programmes stall, produce disappointing results, or quietly fade away.

Why? Usually, it's not the methodology that fails—it's the implementation. After observing numerous RCM programmes succeed and fail, clear patterns emerge. In this article, we'll examine the ten most common mistakes and how to avoid them.

## Mistake #1: Analysing Everything

**The Problem:**

Enthusiastic teams decide to "do RCM" on their entire plant. They start with Area 1, then move to Area 2, with plans to eventually cover everything. Three years later, they're still analysing and have implemented almost nothing.

RCM analysis is thorough, which means it's time-consuming. A complex system can take 2-4 days to analyse properly. A typical plant might have hundreds of systems. The maths doesn't work.

**The Solution:**

Prioritise ruthlessly. Use criticality analysis to identify your most important assets—typically 10-20% of equipment that drives 80% of risk and cost. Apply full RCM only to these critical systems. Use lighter-touch methods (PM Optimisation, equipment-type templates) for the rest.

**Rule of thumb:** If you haven't completed analysis and started implementing within 6 months, your programme is probably too ambitious.

---

## Mistake #2: Analysis Without Implementation

**The Problem:**

The team conducts excellent analysis sessions, producing detailed FMEA worksheets with hundreds of recommended tasks. These documents are filed carefully... and nothing changes. The maintenance programme continues as before.

Analysis without implementation is just an expensive exercise in documentation.

**The Solution:**

Plan for implementation from the start. For every analysis session, schedule follow-up time to:
- Review and approve recommended tasks
- Create or modify work orders in your CMMS
- Update PM schedules
- Train technicians on new tasks
- Remove or modify existing tasks that have been superseded

A good target: tasks from an analysis should be in your CMMS within 30 days.

---

## Mistake #3: Poor Team Composition

**The Problem:**

RCM analysis requires input from multiple perspectives:
- Operations knowledge (how the equipment is used)
- Maintenance knowledge (how it fails, what's practical)
- Technical/engineering knowledge (design intent, failure physics)

Some organisations run analysis sessions with only engineers, or only maintenance personnel. The results are incomplete or impractical.

**The Solution:**

Every analysis team should include:
- An experienced operator for that equipment
- A skilled maintainer who works on it
- An engineer who understands the technical aspects
- A trained facilitator to guide the process

Don't compromise on team composition. If key people aren't available, reschedule the session.

---

## Mistake #4: Untrained Facilitators

**The Problem:**

Facilitation looks easy until you try it. An untrained facilitator struggles to:
- Keep the session on track
- Maintain the right level of detail
- Challenge assumptions constructively
- Document properly while guiding discussion
- Handle dominant personalities

Poor facilitation produces poor analysis—or exhausted teams who don't want to participate again.

**The Solution:**

Invest in facilitator training. This should include:
- Deep understanding of RCM principles
- Practical facilitation skills
- Hands-on practice with feedback
- Understanding of your industry and equipment

Many organisations certify internal facilitators; others bring in external experts for critical systems while developing internal capability.

---

## Mistake #5: Wrong Level of Detail

**The Problem:**

There are two common failures here:

**Too much detail:** Teams spend hours debating whether to list "motor winding fails due to overheating" and "motor winding fails due to moisture ingress" separately. The analysis bogs down in minutiae.

**Too little detail:** Everything is listed as "pump fails," "motor fails," "valve fails." There's not enough specificity to select appropriate maintenance.

**The Solution:**

Failure modes should be at a level where:
- The failure mode can occur independently (not requiring other failures)
- Different maintenance tasks would address different failure modes
- The team can reasonably estimate likelihood and consequences

A useful test: If two failure modes would be addressed by the same maintenance task, they probably don't need to be listed separately.

---

## Mistake #6: Ignoring Operating Context

**The Problem:**

RCM is context-specific. The same pump in two different applications may need entirely different maintenance strategies. Teams sometimes develop "generic" analyses that ignore:
- Duty cycle (continuous vs intermittent)
- Environment (corrosive, hot, dusty, etc.)
- Criticality (with backup vs single point of failure)
- Performance requirements (minimum acceptable output)

**The Solution:**

Always start by documenting operating context:
- What does this equipment need to do?
- Under what conditions?
- What's the consequence if it can't?
- What redundancy exists?

Review context at the start of every analysis. If context changes significantly (new process, increased production, environment change), the analysis should be reviewed.

---

## Mistake #7: Copying Manufacturer Recommendations Uncritically

**The Problem:**

"The manufacturer says change the oil every 500 hours, so that's what we do."

Manufacturer recommendations are starting points, not gospel. They're typically developed for:
- Average conditions
- Worst-case liability protection
- Sometimes, selling spare parts

They may be far too frequent for your actual conditions—or occasionally, not frequent enough.

**The Solution:**

Use manufacturer recommendations as input, not as output. During RCM analysis:
- Understand why the recommendation exists (what failure mode does it address?)
- Evaluate whether that failure mode is significant in your context
- Consider whether a different task might be more effective
- Use operating experience and failure data to adjust intervals

Many organisations find 30-50% of manufacturer-recommended tasks can be safely eliminated or extended.

---

## Mistake #8: Not Documenting Properly

**The Problem:**

Analysis sessions produce lots of discussion and decisions. If not captured properly, that knowledge is lost. Six months later, no one remembers why a particular task was specified or why another approach was rejected.

Poor documentation also prevents effective review and improvement.

**The Solution:**

Document every analysis using proper worksheets. Record:
- Functions and performance standards
- Functional failures
- Failure modes (at appropriate detail)
- Failure effects (including evidence, consequences, corrective action)
- Consequence category
- Selected tasks with justification
- Items deferred for redesign or further investigation

Store documentation where it's accessible and searchable. Link it to your CMMS where possible.

---

## Mistake #9: Treating RCM as a One-Time Event

**The Problem:**

Some organisations treat RCM analysis as a project with a completion date. Once "done," they move on and never look back. But operating context changes, equipment ages, and new failure modes emerge.

**The Solution:**

Build in living system reviews:

- **After incidents:** Any unexpected failure should trigger review of the relevant analysis
- **After modifications:** Equipment or process changes require analysis update
- **Periodic review:** Even without specific triggers, review analyses every 3-5 years
- **Continuous improvement:** Track maintenance outcomes and adjust tasks based on evidence

RCM analysis is a living document, not a historical record.

---

## Mistake #10: Expecting Instant Results

**The Problem:**

RCM takes time—to analyse, implement, and see results. Organisations sometimes pull the plug after 6-12 months, declaring the programme unsuccessful before it's had time to deliver.

Or they expect dramatic cost reductions immediately, when the real benefits may take 2-3 years to fully materialise.

**The Solution:**

Set realistic expectations:

- **Year 1:** Analysis of critical systems, initial implementation, learning
- **Year 2:** Expanded implementation, process refinement, early indicators of improvement
- **Year 3+:** Measurable reliability improvements, cost reductions, culture change

Track leading indicators, not just lagging outcomes:
- Number of systems analysed and implemented
- PM task changes (eliminations, additions, interval changes)
- Failure mode documentation coverage
- Team capability development

Communicate progress and celebrate small wins while building toward larger benefits.

---

## Bonus: The Cultural Challenge

Beyond these ten specific mistakes, there's an overarching challenge: culture.

RCM represents a different way of thinking about maintenance. It challenges assumptions. It asks "why?" repeatedly. It sometimes recommends running equipment to failure, which feels wrong to people conditioned to "maintain everything."

Successful RCM implementation requires:
- **Leadership support:** Visible commitment from management
- **Patience with learning:** Teams will make mistakes initially
- **Willingness to change:** The whole point is to do things differently
- **Evidence-based decisions:** Let data guide adjustments, not opinions

Technical methodology is the easy part. Changing how people think about maintenance is harder—and more important.

---

## Key Takeaways

| Mistake | Solution |
|---------|----------|
| Analysing everything | Prioritise critical assets; use appropriate methods for others |
| Analysis without implementation | Plan implementation from the start; 30-day target for CMMS entry |
| Poor team composition | Include operators, maintainers, engineers, and trained facilitator |
| Untrained facilitators | Invest in proper facilitator training |
| Wrong level of detail | Failure modes should link to specific, different maintenance tasks |
| Ignoring operating context | Document context first; review when context changes |
| Copying manufacturer recommendations | Use as input, evaluate critically for your context |
| Poor documentation | Use proper worksheets; store accessibly; link to CMMS |
| One-time event thinking | Build in reviews after incidents, modifications, and periodically |
| Expecting instant results | Plan for 2-3 year journey; track leading indicators |

---

## Getting It Right

RCM works. The methodology is sound, and thousands of organisations have achieved significant benefits. The key is implementing it properly—avoiding these common mistakes and maintaining focus on the ultimate goal: doing the right maintenance for the right reasons.

Start small, learn as you go, document everything, and implement what you analyse. The results will come.

---

*Ready to implement RCM the right way? Our [RCM Starter Bundle](/products/rcm-starter-bundle) includes implementation guides and facilitator checklists to help you avoid these common mistakes. Or start with our [guide to what RCM is](/blog/what-is-rcm) to build foundational understanding.*
`
  },
  {
    slug: 'fmea-step-by-step-guide',
    title: 'How to Build an Effective FMEA: A Step-by-Step Guide',
    excerpt: 'A practical tutorial for creating Failure Mode and Effects Analysis documentation—with templates, examples, and tips for common equipment.',
    category: 'implementation',
    author: 'Reliability HQ',
    publishDate: '2026-02-01',
    readTime: 14,
    featured: true,
    metaDescription: 'Learn how to create effective FMEA documentation with this step-by-step guide. Includes practical examples, templates, and tips for industrial equipment analysis.',
    relatedSlugs: ['what-is-rcm', '7-rcm-questions-explained', 'rcm-implementation-mistakes'],
    content: `
## Introduction

Failure Mode and Effects Analysis (FMEA) is the heart of the RCM process. It's where you systematically document how equipment can fail and what happens when it does. Well-executed FMEA drives effective maintenance strategy; poor FMEA leads to missed failures and wasted resources.

This guide walks you through creating effective FMEA documentation step by step. We'll use a practical example throughout—a motor-driven centrifugal pump—to illustrate each stage.

## What is FMEA?

FMEA is a structured approach to identifying:
- How an item can fail (failure modes)
- What causes each failure (mechanisms)
- What happens when it fails (effects)
- How severe and likely each failure is

In the RCM context, FMEA feeds directly into maintenance task selection. The quality of your FMEA determines the quality of your maintenance programme.

### RCM FMEA vs Design FMEA

There are different types of FMEA. Design FMEA (DFMEA) is used during product development to identify potential design weaknesses. Process FMEA (PFMEA) examines manufacturing processes.

RCM FMEA (sometimes called operational FMEA) focuses on:
- Equipment already in service
- The specific operating context
- Maintenance task selection as the output

This guide focuses on RCM FMEA.

## Before You Start: Preparation

Good preparation makes analysis sessions far more productive.

### 1. Define the System Boundaries

Be clear about what's included and excluded. For our pump example:

**Included:**
- Pump casing and internals (impeller, wear rings, shaft, seals)
- Drive motor
- Coupling
- Baseplate and foundation bolts
- Local instrumentation (pressure gauge, flow indicator)
- Suction strainer

**Excluded:**
- Upstream and downstream piping (separate system)
- Electrical supply (covered under electrical distribution)
- Control system (covered under DCS/PLC analysis)
- Lubrication supply system (separate system)

Document these boundaries so everyone is aligned.

### 2. Gather Reference Information

Collect before the session:
- P&IDs and equipment drawings
- Equipment datasheets and specifications
- Manufacturer maintenance manuals
- Operating procedures
- Maintenance history and failure records
- Any previous analysis documentation

### 3. Assemble the Team

The ideal FMEA team includes:
- **Facilitator:** Guides the process, documents outputs
- **Operator:** Knows how equipment behaves in service
- **Maintainer:** Knows how it fails and what's practical
- **Engineer:** Understands design intent and failure physics

For a pump, you might have a process operator, mechanical technician, and reliability engineer, plus the facilitator.

### 4. Schedule Adequate Time

For a system like our pump, plan for 3-4 hours. Complex systems may need multiple sessions. Avoid rushing—incomplete analysis is worse than no analysis.

---

## Step 1: Define Functions

Start by listing everything the equipment must do. Functions answer: "What do users expect this equipment to accomplish?"

### Primary Functions

These are the main reasons the equipment exists.

**Example — Centrifugal Pump Primary Function:**

| Function No | Function Description |
|------------|---------------------|
| 1 | Transfer cooling water from reservoir to heat exchangers at minimum 200 L/min at 5 bar discharge pressure |

Be specific. Include:
- What substance (cooling water)
- From where to where (reservoir to heat exchangers)
- How much (200 L/min minimum)
- At what conditions (5 bar)

### Secondary Functions

These are additional expectations beyond the primary purpose.

**Example — Pump Secondary Functions:**

| Function No | Function Description |
|------------|---------------------|
| 2 | Contain the cooling water (external leaks not to exceed 10 mL/hour) |
| 3 | Allow flow to be isolated when required (suction and discharge isolation valves) |
| 4 | Indicate discharge pressure locally (gauge reading within ±5% of actual) |
| 5 | Indicate running status to control room (run signal within 2 seconds of start) |
| 6 | Operate without excessive vibration (< 4.5 mm/s RMS at bearing housings) |
| 7 | Operate within acceptable temperature limits (bearing temp < 80°C) |
| 8 | Start reliably when called upon |

### Tips for Functions

- Use the format "To [verb] [noun] [performance standard]"
- Quantify wherever possible
- Consider safety, environmental, control, and efficiency aspects
- Ask operators: "What would make you say this isn't working properly?"

---

## Step 2: Identify Functional Failures

For each function, determine how it can fail. Functional failures are states where the function is no longer fulfilled to the required standard.

### Example — Functional Failures

| Function | Functional Failure Code | Functional Failure Description |
|----------|------------------------|-------------------------------|
| 1 (Transfer water at 200 L/min at 5 bar) | 1A | Unable to transfer any water |
| 1 (Transfer water at 200 L/min at 5 bar) | 1B | Unable to transfer water at 200 L/min (reduced flow) |
| 1 (Transfer water at 200 L/min at 5 bar) | 1C | Unable to maintain 5 bar discharge pressure |
| 2 (Contain water, <10 mL/hour leak) | 2A | External leak exceeding 10 mL/hour |
| 5 (Indicate running status) | 5A | Indicates running when not running |
| 5 (Indicate running status) | 5B | Indicates not running when actually running |
| 8 (Start reliably) | 8A | Fails to start when commanded |

Notice that functions can have multiple functional failures:
- Complete loss vs partial loss
- Fails high vs fails low (for instrumentation)

---

## Step 3: Identify Failure Modes

For each functional failure, list the specific events that could cause it. These are failure modes—the "what" that goes wrong.

### Example — Failure Modes for "Unable to transfer any water"

| Functional Failure | FM | Failure Mode |
|-------------------|-----|--------------|
| 1A (No water transfer) | 1 | Impeller completely worn/eroded |
| 1A | 2 | Impeller loose on shaft/detached |
| 1A | 3 | Shaft sheared |
| 1A | 4 | Motor winding failure (burn out) |
| 1A | 5 | Motor bearing seized |
| 1A | 6 | Coupling failure (sheared/disconnected) |
| 1A | 7 | Suction strainer completely blocked |
| 1A | 8 | Pump casing cracked/split |
| 1A | 9 | Loss of prime (air-bound) |

### Finding Failure Modes

Good sources include:
- **Team experience:** "What failures have we seen?"
- **Maintenance history:** Work order records, failure reports
- **Generic failure mode libraries:** Standard lists for equipment types
- **Manufacturer documentation:** Known failure modes
- **Industry publications:** Papers, case studies, standards

### Level of Detail

The right level is where:
- Different failure modes need different maintenance responses
- You can describe what happens when it occurs
- You can assess likelihood and severity

**Too vague:** "Pump fails" — Not useful for task selection  
**Just right:** "Mechanical seal fails (leaks excessively)" — Actionable  
**Too detailed:** "Mechanical seal secondary O-ring fails due to chemical attack on Viton material" — Probably unnecessary unless you're seeing this specific issue

---

## Step 4: Describe Failure Effects

For each failure mode, describe what happens when it occurs. This is crucial for consequence assessment and maintenance task justification.

### What to Include

1. **Evidence of failure:** How would someone know it happened?
2. **Immediate effects:** What happens to the process/production?
3. **Safety/environmental impact:** Any hazards created?
4. **Secondary damage:** Does it damage other equipment?
5. **Corrective action required:** What's needed to restore function?
6. **Downtime/duration:** How long to repair?

### Example — Failure Effect

**Failure Mode:** Motor bearing seized

**Failure Effect:**

"Motor makes increasing noise (high-pitched grinding) for approximately 24-48 hours before seizing. When bearing seizes, motor trips on overload. Control room receives motor trip alarm. Standby pump auto-starts. No safety or environmental impact. If detected early (on noise), bearing can be replaced in situ—4 hours, two fitters, £50 parts. If motor runs while seized, motor rewind required—remove motor, send to shop, 2 weeks, £1,200. No secondary equipment damage."

### Tips for Failure Effects

- Write in complete sentences
- Be specific about times, people, costs
- Distinguish between early detection and run-to-failure scenarios
- Include evidence that would be apparent to operators/maintainers

---

## Step 5: Assess Consequences

For each failure mode, categorise the consequences. This directly influences maintenance task selection.

### Consequence Categories (SAE JA1011)

| Category | Definition | Implications |
|----------|-----------|--------------|
| Hidden | Failure not evident under normal circumstances | Failure-finding task mandatory |
| Safety/Environmental | Could cause injury or environmental breach | Proactive task must reduce risk to acceptable level; redesign if not possible |
| Operational | Affects output, quality, or customer service | Proactive task if cost-effective |
| Non-operational | Only involves repair cost | Run-to-failure often acceptable |

### Assessment Questions

Work through these in order:

1. **Is the failure evident to operators under normal conditions?**
   - If NO → Hidden failure consequence
   - If YES → Continue to question 2

2. **Does the failure cause or contribute to a safety or environmental hazard?**
   - If YES → Safety/Environmental consequence
   - If NO → Continue to question 3

3. **Does the failure affect operations (output, quality, service)?**
   - If YES → Operational consequence
   - If NO → Non-operational consequence

### Example — Consequence Assessment

| Failure Mode | Evident? | Safety/Env? | Operational? | Consequence |
|--------------|----------|-------------|--------------|-------------|
| Motor bearing seized | Yes (noise, alarm) | No | Minor (standby available) | Non-operational |
| Mechanical seal failure | Yes (visible leak) | No | Minor (continues operating) | Non-operational |
| Relief valve fails to open | No (only evident on demand) | Yes (overpressure possible) | — | Hidden + Safety |

---

## Step 6: Select Maintenance Tasks

Based on failure effects and consequences, select appropriate maintenance tasks.

### Task Selection Logic

For each failure mode, ask (in order):

**For hidden failures:**
1. Is there an on-condition task that will detect potential failure?
2. Is there a scheduled restoration or discard task?
3. Is there a failure-finding task?
4. Redesign may be necessary

**For evident failures:**
1. Is there an on-condition task that's worth doing?
2. Is there a scheduled restoration or discard task that's worth doing?
3. For safety/environmental: redesign may be necessary
4. For operational/non-operational: run-to-failure may be acceptable

### Task Types Summary

| Task Type | What It Does | When to Use |
|-----------|--------------|-------------|
| On-condition | Detects potential failure before functional failure | When P-F interval exists and task is practical |
| Scheduled restoration | Restores original capability | When wear-out age is identifiable and most survive to it |
| Scheduled discard | Replaces item | When wear-out age is identifiable and failure unacceptable |
| Failure-finding | Checks if item has failed | For hidden failures only |
| Combination | Multiple tasks together | When single task doesn't address adequately |
| Run-to-failure | No scheduled maintenance | When consequences are acceptable |

### Example — Task Selection

**Failure Mode:** Motor bearing wear leading to seizure

**Task selection reasoning:**

*Is there a potential failure condition?*  
Yes — vibration increase, noise, temperature rise

*Is there a P-F interval?*  
Yes — typically weeks to months

*Is monitoring practical?*  
Yes — monthly vibration readings take 5 minutes

*Is it worth doing?*  
Yes — early detection prevents expensive motor rewind

**Selected task:** Monthly vibration monitoring (portable). Set alert at 4.5 mm/s, action at 7 mm/s. Repair time: 4 hours vs 2 weeks if undetected.

---

## Step 7: Document and Review

### The FMEA Worksheet

Standard RCM FMEA uses two worksheets:

**Information Worksheet:** Captures functions, functional failures, failure modes, and failure effects

**Decision Worksheet:** Records consequence assessment, task selection logic, and recommended tasks

### Example FMEA Information Worksheet Extract

| Function | Functional Failure | Failure Mode | Failure Effect |
|----------|-------------------|--------------|----------------|
| 1. Transfer cooling water at 200 L/min at 5 bar | 1A. Unable to transfer any water | 1A.1 Motor bearing seized | Motor makes grinding noise 24-48 hrs before seizing. Motor trips on overload. Standby pump starts. 4 hr repair if detected early (£50), 2 weeks + £1,200 if motor damaged. |
| 1. Transfer cooling water at 200 L/min at 5 bar | 1A. Unable to transfer any water | 1A.2 Coupling failure | Sudden loss of flow. Motor continues running (no load). Control room sees flow alarm and motor amps drop. 2 hr repair, £150 coupling. |
| 2. Contain water (<10 mL/hr leak) | 2A. External leak >10 mL/hr | 2A.1 Mechanical seal worn | Progressive increase in seal leak over weeks. Visible dripping. Pump continues operating. Seal replacement requires pump isolation, 3 hrs, £280 seal kit. |

### Review and Approval

Before implementing, FMEA should be reviewed by:
- Someone not on the analysis team (fresh eyes)
- Operations management (will they accept the tasks?)
- Maintenance management (can they resource the tasks?)
- Engineering authority (technically sound?)

Document the review and any changes made.

---

## Common Pitfalls to Avoid

### 1. Incomplete Functions
Missing secondary functions means missing failure modes. Always consider containment, safety, control, indication, and efficiency.

### 2. Copying Other Analyses
Generic FMEAs for "pumps" ignore your operating context. Adapt—don't adopt.

### 3. Risk Ranking as the Output
Some FMEA approaches focus on calculating Risk Priority Numbers (RPN). RCM FMEA focuses on task selection. High-risk items need effective tasks; the ranking itself isn't the point.

### 4. Stopping at FMEA
FMEA without implementation is just documentation. Every failure mode should result in either a task or a conscious decision to run to failure.

### 5. One-Time Exercise
Equipment, processes, and knowledge evolve. Review FMEAs after failures, modifications, or at regular intervals.

---

## Key Takeaways

- **Prepare thoroughly:** Gather documentation, assemble the right team, define boundaries
- **Start with functions:** Clear, quantified functions drive good analysis
- **Be systematic:** Work through functional failures, then failure modes for each
- **Write useful failure effects:** Include evidence, impact, and repair requirements
- **Assess consequences properly:** Hidden, safety, operational, non-operational
- **Select appropriate tasks:** Based on P-F intervals, wear-out ages, and consequence severity
- **Document everything:** Future reviewers (and future you) will thank you
- **Implement what you analyse:** FMEA isn't complete until tasks are in your CMMS

---

## Tools and Templates

A well-designed template guides analysis and ensures consistency. Key features to look for:

- Clear prompts for each field
- Space for adequate detail in failure effects
- Decision logic diagram integration
- Easy transfer to CMMS

Our [RCM FMEA Template Pack](/products/rcm-fmea-template-pack) includes:
- Information Worksheet template
- Decision Worksheet template
- RCM Decision Diagram
- Completed example analysis
- Quick-start guide

*Need a starting point for failure modes? Our [Failure Mode Library](/products/failure-mode-library) contains 500+ documented failure modes for common industrial equipment.*

---

FMEA is a skill that improves with practice. Your first analysis will be slower and rougher than your tenth. The key is to start, learn, and continuously improve. Every completed analysis makes your maintenance programme stronger and builds your team's capability.

Good luck—and thorough analysis!
`
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getArticlesByCategory(category: Article['category']): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getRelatedArticles(slug: string): Article[] {
  const article = getArticleBySlug(slug);
  if (!article) return [];
  return article.relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter((a): a is Article => a !== undefined);
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
