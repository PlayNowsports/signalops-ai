# SignalOps AI

SignalOps AI is a browser-based renewal and expansion operating tool for RevOps. It ingests a fresh Salesforce XLSX/CSV export, validates the input, applies a versioned deterministic rule engine to structured and customer-text evidence, and produces a weekly account action queue.

The application is intentionally static and browser-only. Customer data does not leave the user's device, no API key is required, and identical input plus the same rule version produces the same output.

## Run it

1. Open the deployed GitHub Pages URL or serve this folder locally with `python -m http.server 8000`.
2. Upload the provided `GTMO_Anonymized_Take_Home.xlsx` file.
3. Review **Data quality** before using the queue.
4. Review Critical, High, and Expansion accounts in **Account queue**.
5. Export the weekly CSV and route actions to the named owner.

No installation, authentication, or external model access is required.

## What it does

- Reads XLSX and CSV files locally in the browser.
- Stops on missing load-bearing schema fields.
- Reports row-level contradictions instead of silently repairing them.
- Limits the operating book to open subscription renewals in the current Tulip fiscal year.
- Combines structured fields with CSM notes and Gong highlights.
- Produces deterministic retention-risk and expansion scores with visible evidence.
- Provides CRUD for validation/scoring rules: create, read, update, activate/deactivate, and delete.
- Persists rule memory and version history in browser storage.
- Imports/exports rule packs for review, handoff, and next-quarter reuse.
- Stores a privacy-safe run audit log (file name/hash, counts, timestamp, rule version), not raw customer data.
- Exports the weekly queue and data-quality findings as CSV.

## Source-field contract

Blocking fields:

- `Account Name`
- `Opportunity Owner`
- `Stage`
- `Opportunity Record Type`

The default rules also use `Won /Lost `, `Close FY`, `Renewal ARR`, `New Committed ARR`, `Forecast Category`, `Health`, `Sold Licenses`, `Utilization - 1 Month Ago`, `CSM Health Note`, `Latest Gong Call Highlight`, and `At Risk/Churn/Downsell Reason` when available.

## Reproducibility

There is no generative inference in the scoring path. Text evidence uses reviewable regular expressions stored in the rule pack. Every queue export includes `rule_version` and a truncated SHA-256 `input_hash`. Rule changes create a new local version.

To verify the supplied fixture from the repository root:

```bash
node tests/run-fixture.js /path/to/GTMO_Anonymized_Take_Home.xlsx
```

Expected supplied-file control totals for the build dated July 19, 2026:

- 1,458 source rows and 43 columns
- 256 open FY27 renewal opportunities
- $14,648,694.26 open FY27 Renewal ARR
- 223 distinct accounts in the operating queue
- 0 blocking schema issues

The opportunity and ARR controls are calculated independently from the source workbook. Account totals are lower than opportunity totals because multiple open renewals can belong to the same account.

## Limits

- Scores are prioritization heuristics, not calibrated churn probabilities.
- Rules can detect text patterns but cannot reliably understand negation, sarcasm, or unusual customer context.
- Missing notes do not mean positive sentiment.
- Conflicting health/utilization values across open renewals remain a warning and require source-system resolution.
- The tool does not send messages, modify Salesforce, or automatically override a forecast.
- Browser storage is device-specific. Export the rule pack to share or back it up.
- The provided data contains no realized future churn outcome for open renewals, so the default point weights cannot yet claim predictive accuracy.

## Operating ownership

RevOps runs the tool weekly and owns schema/rule governance. CSM leaders own adoption and health interventions; Sales leaders own commercial saves and forecast inspection; AEs and CSMs execute the account actions. The CRO consumes the portfolio summary and exceptions, not every row.

See [docs/EXECUTIVE_CASE.md](docs/EXECUTIVE_CASE.md), [docs/90_DAY_ROLLOUT.md](docs/90_DAY_ROLLOUT.md), and [docs/DEMO_RUN.md](docs/DEMO_RUN.md).

## Security and privacy

The uploaded workbook is processed in memory. Raw rows are not sent over the network or written to browser storage. The repository excludes the provided take-home dataset.

## Third-party software

Spreadsheet parsing uses SheetJS Community Edition 0.18.5, distributed under the Apache 2.0 license. The static application loads the pinned browser build from jsDelivr; local verification installs the same pinned npm version.

