# AI workflow log

## Tools and where they were used

- **ChatGPT Codex workspace agent**: requirements extraction, product/operating-model design, rule-engine implementation, test design, and documentation. The exact backend model identifier was not exposed in the workspace UI, so it is not claimed here.
- **Python + openpyxl**: independent inspection of the supplied workbook, field names, row counts, fiscal-year filtering, and ARR control totals.
- **Node.js + SheetJS**: execution of the same browser parsing and scoring engine against the supplied XLSX file.
- **GitHub Pages workflow**: static deployment design with no server, API key, or customer-data transmission.

## Prompts that did the most work

These are the working prompts/instructions used to drive the build, preserved in direct form rather than rewritten as polished hindsight.

### 1. Product scope

> Build Exercise 4 as a reusable weekly churn and expansion operating tool, not a static dashboard. It must run on the supplied Salesforce export, support CRUD for rules, retain rule memory across runs, expose validation failures, and produce an export another RevOps analyst can use without the builder present.

### 2. Reproducibility constraint

> Design the AI layer so identical input and rule version produce identical output. Prefer a deterministic, auditable text-and-structured rule engine over a generative call unless the LLM is necessary. Every score must show evidence, an action owner, and a limit on how it can be used.

### 3. Data contract and validation

> Read the take-home instructions, GTM context, data dictionary, and actual workbook. Identify only validation rules that can materially change renewal risk, expansion targeting, forecast interpretation, or whether the run should stop. Separate blocking schema failures from warnings; never silently repair contradictions.

### 4. Application build

> Create a browser-only static web application deployable on GitHub Pages. Upload XLSX/CSV locally, process raw data in memory, persist only rule versions and privacy-safe run metadata, provide create/read/update/deactivate/delete plus import/export for rules, and export the weekly account queue and quality report.

### 5. Verification

> Run the shipped parsing and scoring engine against the supplied workbook. Independently reconcile source row count, current-FY open renewal count, Renewal ARR, distinct queued accounts, tier counts, and validation findings. Treat conflicting account signals as a product problem to resolve, not a cosmetic issue.

## Where AI saved time

AI accelerated the first complete implementation of the interface, deterministic rule engine, export logic, documentation, and test harness. The rough time saved versus drafting each artifact independently is estimated at four to six hours. The largest gain was keeping the product, code, validation rules, and executive operating case consistent while iterating.

## Wrong, suspect, or misleading output—and how it was caught

### The first aggregation was wrong

The first run included historical closed renewals and expansion records. It produced 503 accounts and mixed `Healthy`, `Critical`, under-utilization, and over-utilization evidence on the same account. The output looked plausible but did not represent the current operating book.

The error was caught by reconciling the result with the independently calculated FY27 open-renewal control totals. The filter was changed to open subscription renewals in Tulip's current fiscal year, reducing the queue to 223 accounts and reconciling to $14,648,694.26 of Renewal ARR.

### The second aggregation still combined contradictory evidence

Even after the fiscal-year filter, multiple open opportunities for the same account could carry different health/utilization values. Combining every triggered rule made the evidence list internally inconsistent. The engine was changed to sum account ARR but use one highest-priority opportunity row as the score/evidence basis. A separate validation warning now reports 26 accounts with conflicting current signals.

### A generative “AI summary” was rejected

An LLM-written account narrative would have made the interface look more obviously AI-driven, but it would introduce non-determinism, key handling, cost, and a risk of turning paraphrased Gong text into invented claims. It was excluded from the first release. The application uses deterministic text extraction and shows source evidence instead.

## What AI is currently bad at here

AI is poor at distinguishing a confident customer signal from stale, copied, contradictory CRM text without reliable timestamps and outcome labels. It can generate convincing explanations from weak records. The safer use is to narrow human attention and make the evidence visible; it should not assert a probability or choose a customer action autonomously.
