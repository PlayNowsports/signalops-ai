# SignalOps AI: first 90 days

| Window | What ships | Owner | Trigger | Success check |
|---|---|---|---|---|
| Days 1–15 | Baseline manual prep time; confirm field contract; review default rules with RevOps, CSM Ops, and Sales Ops; nominate one segment pilot | RevOps product owner | Pilot approval | Signed field/rule contract; baseline measured; no unresolved blocker |
| Days 16–30 | Weekly read-only runs; Critical/High queue review; owner acceptance/rejection captured outside the tool; rule pack exported after approved changes | RevOps analyst + CSM/Sales leaders | Fresh weekly export passes validation | ≥90% of priority accounts assigned; every override has a reason |
| Days 31–60 | Add expansion review; compare flags with actual account-owner judgment; remove low-precision rules; publish a weekly operating scorecard | RevOps product owner | Four stable runs completed | ≥70% flag usefulness; ≥50% prep-time reduction; rule changes versioned |
| Days 61–90 | Evaluate renewal/expansion leading indicators; review false negatives; decide stop/iterate/integrate | CRO staff + RevOps | Eight to twelve runs and sufficient review labels | Go/no-go memo with observed precision, adoption, operating cost, and integration recommendation |

## Operating model

| Artifact | Producer | Consumer | Cadence | Decision |
|---|---|---|---|---|
| Data-quality gate | RevOps analyst | RevOps owner, system admins | Weekly | Run, repair, or stop |
| Critical/High queue | SignalOps + RevOps review | CSM/Sales leaders | Weekly | Save-plan owner, dated action, forecast inspection |
| Expansion queue | SignalOps + CSM review | AE/CSM leaders | Weekly | Discovery, sizing, or reject |
| Rule pack and change log | RevOps product owner | GTM Ops council | Monthly/quarterly | Keep, change, deactivate, or add rule |
| Pilot scorecard | RevOps product owner | CRO staff | Biweekly | Continue, narrow, or stop pilot |

## Governance

- Only RevOps product owners edit the production rule pack.
- Every change includes a reason and creates a new version.
- Changes are tested against the same frozen file before the next live run.
- A score cannot directly trigger customer outreach or a forecast write-back.
- False positives, rejected actions, and missed churn/expansion events become labeled calibration data.

## Later, only if the pilot works

1. Persist reviewer dispositions in an authenticated backend.
2. Calibrate point weights against realized renewal/downsell/expansion outcomes.
3. Add governed Salesforce ingestion and write-back.
4. Add an LLM only for bounded summarization with structured output, fixed prompt version, evaluation cases, and human approval.
