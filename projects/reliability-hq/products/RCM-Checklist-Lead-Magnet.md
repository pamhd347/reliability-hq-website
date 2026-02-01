# RCM Analysis Checklist
## Your Pre-Analysis Preparation Guide

**From Reliability HQ** | reliabilityhq.com

---

## Before You Start: The RCM Readiness Checklist

A successful RCM analysis requires proper preparation. Use this checklist to ensure you're ready before the facilitation session begins.

### ☐ Operating Context Defined

- [ ] System/equipment boundary clearly defined
- [ ] Normal operating conditions documented (flow rates, pressures, temperatures)
- [ ] Operating modes identified (startup, normal, shutdown, standby)
- [ ] Production/performance requirements stated
- [ ] Environmental conditions noted (ambient temp, humidity, contaminants)
- [ ] Regulatory and statutory requirements identified
- [ ] Safety and environmental limits documented

### ☐ Documentation Gathered

- [ ] P&IDs (Piping & Instrumentation Diagrams)
- [ ] Equipment datasheets and specifications
- [ ] Operating procedures
- [ ] Existing maintenance procedures and schedules
- [ ] Historical failure data (CMMS records)
- [ ] Manufacturer's maintenance recommendations
- [ ] Previous FMEA or risk assessments (if any)

### ☐ Team Assembled

- [ ] Facilitator trained in RCM methodology
- [ ] Operations representative confirmed
- [ ] Maintenance representative confirmed
- [ ] Engineering/technical support available
- [ ] HSE representative (for safety-critical equipment)
- [ ] All team members briefed on schedule and expectations

### ☐ Logistics Arranged

- [ ] Meeting room booked (allow 2-4 hours per session)
- [ ] Visual aids available (whiteboard, projector)
- [ ] FMEA template ready (paper or electronic)
- [ ] Refreshments organised (brain fuel!)
- [ ] Follow-up sessions scheduled if needed

---

## RCM Quick Refresher

### The Seven Questions of RCM

For each asset, systematically answer:

1. **What are the functions?** (What is it supposed to do?)
2. **What are the functional failures?** (How can it fail to do it?)
3. **What are the failure modes?** (What causes each failure?)
4. **What are the failure effects?** (What happens when it fails?)
5. **What are the consequences?** (Does it matter?)
6. **What can be done to predict/prevent it?** (Proactive tasks)
7. **What if no task is applicable?** (Default actions)

### Consequence Categories

| Category | Definition | Task Selection Approach |
|----------|------------|------------------------|
| **Hidden** | Failure not evident to operators during normal duties | Failure-finding task, or redesign |
| **Safety** | Could injure or kill someone | Proactive task must reduce risk to tolerable level, else redesign compulsory |
| **Environmental** | Could breach environmental standards | Proactive task must reduce risk to tolerable level, else redesign compulsory |
| **Operational** | Direct adverse effect on operations (output, cost, quality) | Task must be cost-effective vs failure consequences |
| **Non-operational** | Only direct cost of repair | Task must cost less than failure over time |

### Task Types at a Glance

| Task Type | Code | When to Use |
|-----------|------|-------------|
| **On-Condition** (Condition-Based) | CBM | Clear potential failure (P) detectable before functional failure (F). P-F interval allows action. |
| **Scheduled Restoration** | TBR | Age-related failure pattern. Large population shows consistent wear-out age. |
| **Scheduled Discard** | TBD | Age-related failure pattern. Item cannot be restored cost-effectively. |
| **Failure-Finding** | FF | Hidden function only. Checks if item has failed. |
| **Run to Failure** | RTF | Non-operational consequence and no cost-effective proactive task. |
| **Redesign** | — | No task reduces risk to tolerable level (safety/environmental), or one-time change eliminates problem. |

### The P-F Interval

```
         P                    F
         │                    │
         ▼                    ▼
    ┌────●━━━━━━━━━━━━━━━━━━━━●────┐
    │ Potential              Functional │
    │ Failure                Failure    │
    │ (detectable)           (loss)     │
    └──────────────────────────────────┘
              P-F Interval
              
    Task interval must be < P-F interval
    (typically ½ to ⅓ of P-F)
```

---

## Common Pitfalls to Avoid

❌ **Functions without performance standards** — "Pump water" vs "Pump water at 500 L/min"

❌ **Failure modes that are really failure effects** — Focus on *what fails*, not *what happens*

❌ **Copying manufacturer's maintenance blindly** — Question everything; make it fit your context

❌ **Skipping the consequence evaluation** — This determines which tasks are applicable

❌ **One-size-fits-all intervals** — Base intervals on P-F data, not gut feel

❌ **Analysis paralysis** — Perfect is the enemy of good; document decisions and move on

---

## Post-Analysis Actions

After completing the RCM analysis:

- [ ] Review all recommended tasks for feasibility
- [ ] Update PM schedules in CMMS
- [ ] Train technicians on new/modified tasks
- [ ] Create/update maintenance procedures
- [ ] Establish task feedback mechanism
- [ ] Schedule living program review (annually)

---

## Key Reference Standards

- **SAE JA1011** — Evaluation Criteria for RCM Processes
- **SAE JA1012** — A Guide to the RCM Standard  
- **Moubray, J.** — *Reliability-centred Maintenance* (RCM II), 2nd Edition

---

## Ready to Go Deeper?

This checklist is just the start. For comprehensive, professional templates:

**Visit [reliabilityhq.com](https://reliabilityhq.com)** for:

- ✅ Complete FMEA Template Pack (SAE JA1011 compliant)
- ✅ Criticality Analysis Calculator with auto-ranking
- ✅ RCM Decision Diagram Worksheet
- ✅ Expert guides and training resources

**Questions?** hello@reliabilityhq.com

---

*© 2026 Reliability HQ | reliabilityhq.com*

*Helping reliability engineers work smarter, not harder.*
