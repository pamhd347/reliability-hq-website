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

// Map of lesson IDs to their slides
export const lessonSlides: Record<number, Slide[]> = {
  1: module1Slides,
  // Future modules will be added here
  // 2: module2Slides,
  // etc.
};

// Helper function to check if a lesson has slides
export function hasSlides(lessonId: number): boolean {
  return lessonId in lessonSlides;
}

// Helper function to get slides for a lesson
export function getSlides(lessonId: number): Slide[] | undefined {
  return lessonSlides[lessonId];
}
