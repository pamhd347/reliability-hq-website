# The Complete Guide to Building Mission Control: AI Agent Squad

*Saved from Apple Notes, 2026-02-01. Original author built this with OpenClaw (formerly Clawdbot).*

---

## Overview

A system where 10 AI agents work together like a real team. Each agent is a separate OpenClaw session with its own personality, memory, and scheduled heartbeats.

## Architecture

### The Agents

| Agent | Role | Session Key |
|-------|------|-------------|
| Jarvis | Squad Lead / Coordinator | agent:main:main |
| Shuri | Product Analyst | agent:product-analyst:main |
| Fury | Customer Researcher | agent:customer-researcher:main |
| Vision | SEO Analyst | agent:seo-analyst:main |
| Loki | Content Writer | agent:content-writer:main |
| Quill | Social Media Manager | agent:social-media-manager:main |
| Wanda | Designer | agent:designer:main |
| Pepper | Email Marketing | agent:email-marketing:main |
| Friday | Developer | agent:developer:main |
| Wong | Documentation | agent:notion-agent:main |

### Key Components

1. **Sessions** — Each agent is an independent OpenClaw session with its own history and context
2. **SOUL.md** — Personality file defining who each agent is
3. **AGENTS.md** — Operating manual for how agents work
4. **Heartbeats** — Cron jobs wake agents every 15 minutes to check for work
5. **Mission Control** — Shared Convex database for tasks, comments, @mentions
6. **Notification daemon** — Polls for @mentions and delivers to agent sessions

### Heartbeat Schedule (Staggered)

```
:00 Pepper
:02 Shuri
:04 Friday
:06 Loki
:07 Wanda
:08 Vision
:10 Fury
:12 Quill
```

### Memory Stack

- **Session Memory** — Clawdbot built-in conversation history
- **WORKING.md** — Current task state (most important file)
- **Daily Notes** — /memory/YYYY-MM-DD.md logs
- **MEMORY.md** — Curated long-term memory

### Task Lifecycle

Inbox → Assigned → In Progress → Review → Done (or Blocked)

### Mission Control Database (Convex)

Six tables:
- agents (name, role, status, currentTaskId, sessionKey)
- tasks (title, description, status, assigneeIds)
- messages (taskId, fromAgentId, content, attachments)
- activities (type, agentId, message)
- documents (title, content, type, taskId)
- notifications (mentionedAgentId, content, delivered)

### Thread Subscriptions

Auto-subscribe when you:
- Comment on a task
- Get @mentioned
- Get assigned

Then you receive ALL future comments without explicit @mentions.

### Daily Standup

Cron at 11:30 PM compiles:
- Completed today
- In progress
- Blocked
- Needs review
- Key decisions

## Lessons Learned

1. **Start smaller** — Get 2-3 agents solid before adding more
2. **Use cheaper models for heartbeats** — Save expensive models for creative work
3. **Memory is hard** — Put everything in files, not "mental notes"
4. **Let agents surprise you** — They may contribute to unassigned tasks

## Replication Steps

1. Install OpenClaw, add API keys, start gateway
2. Create 2 agents (coordinator + specialist)
3. Write SOUL files with specific roles
4. Set up heartbeat crons (*/15 * * * *)
5. Create shared task system (Convex, Notion, or files)
6. Scale up: stagger heartbeats, build UI, add notifications

---

*The secret: treat AI agents like team members. Roles, memory, collaboration, accountability.*
