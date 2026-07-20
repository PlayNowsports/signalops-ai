# Executive case: ship a renewal decision system, not another forecast spreadsheet

To: CRO and GTM leadership  
From: Revenue Operations  
Subject: 90-day pilot for a weekly renewal and expansion control loop

## Decision requested

Approve a 90-day pilot of SignalOps AI as the weekly triage layer for the FY27 renewal book. The tool should initially inform human decisions; it should not write back to Salesforce or automatically change forecast categories.

## Why this is worth shipping

The supplied FY27 file contains 256 open renewal opportunities representing $14.65M of Renewal ARR across 223 accounts. The operating problem is not a lack of fields. It is that structured signals, customer text, and contradictory data are spread across 43 columns and interpreted inconsistently from one review to the next.

On the supplied file, the default rule set prioritizes 30 Critical accounts, 64 High-risk accounts, and 49 expansion candidates. Those are triage categories, not probability estimates. Their value is to narrow where humans look first and to make the evidence and action owner visible.

## Proposed operating change

Replace manual first-pass scanning with a reproducible weekly sequence:

1. RevOps uploads the latest Salesforce export.
2. Blocking schema issues stop the run; contradictions remain visible as quality findings.
3. CSM and Sales leaders review Critical/High accounts and expansion candidates with the underlying evidence.
4. Owners accept, amend, or reject proposed interventions.
5. RevOps updates rule versions only after reviewing outcomes and false positives.

The tool is deliberately deterministic. A generative model could produce smoother narratives, but it would add output variance, authentication, cost, and a harder audit problem before the basic operating loop is proven.

## Measurable pilot outcome

The pilot should continue only if it achieves all four:

- at least 90% of Critical/High accounts receive an owner and dated next action within five business days;
- weekly first-pass preparation time falls by at least 50% from the measured baseline;
- at least 70% of reviewed flags are accepted as directionally useful by the account owner;
- false positives and overrides are captured by rule/version, allowing quarterly calibration.

Secondary outcome measures: renewal forecast error, gross retention, downsell ARR, expansion conversion, and time from signal to action. Ninety days is too short to claim causal retention lift, so operational leading indicators should control the pilot decision.

## Cost and trade-offs

The application has no model API or hosting runtime cost when served through GitHub Pages. The meaningful cost is operating capacity: approximately two RevOps hours per week, one hour each from CSM and Sales leadership for inspection, and quarterly rule calibration.

What does not ship in the pilot: Salesforce write-back, automated customer messages, black-box churn probabilities, or an LLM-generated executive narrative. Those add governance and failure modes before the evidence loop is stable.

## Primary risks

- The point weights are expert heuristics, not outcome-calibrated probabilities.
- Twenty-six accounts have conflicting health or utilization signals across current open renewals in the supplied file.
- Text matching can miss negation or novel language.
- Users may mistake a ranked queue for ground truth.

Controls: evidence is always shown, low-quality inputs are flagged, raw data stays in the browser, rule changes are versioned, and all forecast/customer actions require human approval.

## Recommendation

Run the 90-day pilot with RevOps as product owner and CSM/Sales leaders as decision owners. Do not fund deeper automation until the team proves that the queue changes actions and that override data can calibrate the rules.
