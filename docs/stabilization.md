# Design System Stabilization Tracker

> **Purpose:** This document defines the stabilization framework for the PartsSource Design System — covering issue severity definitions, the issue tracker structure, component ownership, change approval rules, and the monthly health checklist.

---

## Severity Definitions

All reported issues must be assigned a severity level before triage.

### P0 — Critical (Blocker)

- Breaks a core user flow (e.g., cannot submit a form, buttons non-functional)
- Causes an accessibility regression that violates WCAG AA
- Affects production and has no workaround
- **Response SLA:** Acknowledged within 2 hours, fix deployed within 24 hours
- **Owner:** On-call engineer (rotates monthly)

### P1 — High

- Visible component rendering error in a primary surface (ProProcure, marketplace)
- Token drift that causes incorrect color, spacing, or typography in a shipped component
- Test suite failure that blocks CI on main branch
- **Response SLA:** Acknowledged within 1 business day, fix in next patch release
- **Owner:** Component owner (see Ownership Matrix)

### P2 — Medium

- Visual inconsistency that does not break functionality
- Storybook story fails to render but component works in production
- Missing or incorrect documentation
- **Response SLA:** Triaged within 3 business days, fix in next minor release
- **Owner:** Design Systems team

### P3 — Low

- Minor cosmetic issue with no functional impact
- Enhancement request for an existing component
- Documentation improvement
- **Response SLA:** Added to backlog, addressed in next quarterly planning cycle
- **Owner:** Design Systems team (on availability)

---

## Issue Tracker Structure

All design system issues are tracked as GitHub Issues in the NotTheVeal/design-system repository. Use the labels below consistently.

### Required Labels

| Label | Color | When to Apply |
|-------|-------|---------------|
`bug` | Red | Confirmed defect in a component or token |
`p0-critical` | Dark red | P0 severity |
`p1-high` | Orange | P1 severity |
`p2-medium` | Yellow | P2 severity |
`p3-low` | Light gray | P3 severity |
`token-drift` | Purple | Token value mismatch vs. Figma/spec |
`accessibility` | Blue | A11y regression or gap |
`storybook` | Teal | Storybook/Chromatic-only issue |
`documentation` | Light blue | Docs gap or error |
`pm-reference` | Light green | PM reference doc update needed |
`needs-triage` | Gray | Newly filed, not yet reviewed |
`breaking-change` | Black | Change that breaks existing consumer API |

### Issue Template

Every bug report must include:

1. **Component name** — which component is affected
2. **Severity** — P0/P1/P2/P3 with rationale
3. **Steps to reproduce** — exact steps to observe the defect
4. **Expected behavior** — what should happen
5. **Actual behavior** — what is actually happening
6. **Environment** — browser, OS, Storybook version or production URL
7. **Screenshot or video** — always required for visual bugs
8. **Token violation** — if applicable, which token is incorrect

### Triage Cadence

- **Daily (P0/P1):** On-call engineer reviews all open P0/P1 issues each morning
- **Weekly (P2):** Design Systems team triages all new P2 issues every Monday
- **Monthly (P3):** P3 backlog reviewed during monthly health review

---

## Component Ownership Matrix

| Component | Primary Owner | Backup Owner | Figma Owner |
|-----------|--------------|--------------|-------------|
| Button | Design Systems Eng | Frontend Platform | UX Design |
| Input / Text Field | Design Systems Eng | Frontend Platform | UX Design |
| Select / Dropdown | Design Systems Eng | Frontend Platform | UX Design |
| Checkbox | Design Systems Eng | Frontend Platform | UX Design |
| Radio | Design Systems Eng | Frontend Platform | UX Design |
| Toggle | Design Systems Eng | Frontend Platform | UX Design |
| Badge | Design Systems Eng | Any | UX Design |
| Alert | Design Systems Eng | Any | UX Design |
| Modal | Design Systems Eng | Frontend Platform | UX Design |
| Drawer / Sheet | Design Systems Eng | Frontend Platform | UX Design |
| Table | Frontend Platform | Design Systems Eng | UX Design |
| Pagination | Design Systems Eng | Any | UX Design |
| Tabs | Design Systems Eng | Frontend Platform | UX Design |
| Tooltip | Design Systems Eng | Any | UX Design |
| Breadcrumb | Design Systems Eng | Any | UX Design |
| Loading / Spinner | Design Systems Eng | Any | UX Design |
| Avatar | Design Systems Eng | Any | UX Design |
| Skeleton | Design Systems Eng | Any | UX Design |
| Accordion | Design Systems Eng | Any | UX Design |
| File Upload | Frontend Platform | Design Systems Eng | UX Design |
| Navigation | Frontend Platform | Design Systems Eng | UX Design |
| Metric / Stat Card | Frontend Platform | Design Systems Eng | UX Design |
| Design Tokens | Design Systems Eng | Design Ops | UX Design |
| Storybook / Chromatic | Design Systems Eng | DevOps | — |
| CI / GitHub Actions | DevOps | Design Systems Eng | — |

---

## Change Approval Process

### Tier 1 — Patch (Bug Fix, No API Change)

**Examples:** Token value fix, visual alignment correction, test fix, documentation update

**Approval required:** 1 engineer peer review

**Process:** Open PR > Link issue > Include before/after screenshots > CI must pass > 1 approval > Merge and publish patch release

### Tier 2 — Minor (New Feature or Non-Breaking Enhancement)

**Examples:** New component variant, new prop on existing component, new token

**Approval required:** 1 engineer review + Design Systems lead sign-off

**Process:** Design proposal issue > UX/Figma review > Feature branch PR > CI + Chromatic + accessibility audit > 2 approvals > Update CHANGELOG > Merge and publish minor release

### Tier 3 — Major (Breaking Change)

**Examples:** Renamed prop, removed component, token name change, changed API signature

**Approval required:** Full team review + Product sign-off + 2-week notice period

**Process:**
1. Open a breaking-change RFC issue
2. 2-week comment period for stakeholder input
3. Deprecation warning added in current version before removal
4. Consumer teams notified via Slack + email with migration guide
5. PR requires 2 peer reviews + Design Systems lead + Product Manager approval
6. Major version bump in semver
7. Migration guide added to docs/
8. Update CHANGELOG.md with BREAKING CHANGE section

---

## Monthly Health Checklist

Run this checklist on the first Monday of every month. The token-drift-monitor workflow runs automatically on the 1st — review its output in the Actions tab.

### Automated Checks (GitHub Actions — token-drift-monitor.yml)

- [ ] Token drift report reviewed — no unexpected deviations from Figma spec
- [ ] Stale components report reviewed — components not updated in 90+ days flagged
- [ ] Test coverage report reviewed — coverage above 80% for all components
- [ ] Chromatic health report reviewed — no unreviewed visual changes outstanding
- [ ] Monthly summary written to workflow step summary and reviewed by lead

### Manual Checks

- [ ] Review all open P0/P1 GitHub issues — confirm none are stale
- [ ] Review Chromatic builds from the past month — confirm all approved or pending
- [ ] Verify npm publish workflow ran successfully for any releases this month
- [ ] Confirm CHANGELOG.md is up to date with all changes since last release
- [ ] Spot-check Figma library vs. published Storybook (5 components minimum)
- [ ] Review any new component requests from Product/Design — triage and label
- [ ] Update on-call rotation if needed

### Quarterly Additions (Every 3 Months)

- [ ] Full accessibility audit on all components using jest-axe + manual screen reader test
- [ ] Update the Component Ownership Matrix if team changes occurred
- [ ] Review and update docs/pm-reference.md for any new or changed components
- [ ] Conduct a token audit — compare all token values against latest Figma library export
- [ ] Review deprecation queue — confirm deprecated items are ready for removal in next major

---

## Escalation Path

| Situation | Action |
|-----------|--------|
| P0 unresolved > 4 hours | Ping Engineering Manager + Design Systems lead in #design-system-alerts |
| P1 unresolved > 2 business days | Raise in weekly standup; assign to available engineer |
| P2 unresolved > 2 sprints | Add to sprint planning agenda for prioritization discussion |
| Chromatic unreviewed > 5 business days | Auto-notified by token-drift-monitor; escalate if not cleared |

---

## Release Versioning

The design system follows semantic versioning (semver): MAJOR.MINOR.PATCH

- **PATCH** (e.g., 1.0.1) — Bug fixes, no API changes
- **MINOR** (e.g., 1.1.0) — New features, backward-compatible
- **MAJOR** (e.g., 2.0.0) — Breaking changes

Releases are published automatically via the npm-publish.yml GitHub Actions workflow when a version tag is pushed.

---

*This document is owned by the Design Systems team. To propose changes, open a GitHub issue with the label* `stabilization-docs`.

*Last updated: June 2026*
