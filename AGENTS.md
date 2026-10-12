# AI Coding Agent Instructions — AATMA Website

> Operational instructions for any AI agent working in this repository.
> **Read this file first. Then read the documents it points to.**

---

## 1. Project Context

| Field | Value |
|---|---|
| **Project** | AATMA Website |
| **Purpose** | Public institutional website for AATMA — the All Assam Agar Traders & Agaroil Manufacturers' Association, established 1976 |
| **Primary users** | AATMA members, researchers, regulators, prospective members and trade partners |
| **Stack** | React 19 · Vite 8 · TypeScript 6 · Tailwind CSS v4 · React Router 7 |
| **Live** | `https://sugamkashyap05.github.io/aatma-site/` |
| **Branch** | `master` (auto-deploys to GitHub Pages on push) |

---

## 2. Source of Truth

Before any significant change, **read the relevant documents in `docs/`**.

| Document | Read it when… |
|---|---|
| [`docs/PRD.md`](docs/PRD.md) | You need to know **what** to build, what is in scope, or what a feature must do |
| [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | You are touching **any visual element** — colours, type, spacing, cards, buttons |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | You are adding a route, component, dependency, or need to know where a file belongs |
| [`docs/CODE_STYLE.md`](docs/CODE_STYLE.md) | You are **writing code** — naming, imports, structure, styling |
| [`docs/TESTING.md`](docs/TESTING.md) | You are about to **claim a task is done** |

**Do not contradict these documents without first identifying the conflict and
raising it.** If a document is wrong or incomplete, say so explicitly and
propose the correction — do not silently deviate.

---

## 3. General Rules

- **Understand existing code before modifying it.** Read the file. Read its neighbours.
- **Reuse existing components and utilities** — `PageLayout`, `BentoCard`, `BentoGrid`, `Reveal`, `cn`. Do not rebuild what exists.
- **Follow the design system** — tokens only, never raw hex.
- **Follow the architecture** — features in `features/`, primitives in `components/ui/`.
- **Follow the coding conventions** in `docs/CODE_STYLE.md`.
- **Do not invent business requirements.** Content about AATMA must trace to the client documents in `documents/` or to `src/data/content.ts`.
- **Do not invent facts, statistics, partnerships, or quotations.**
- **Never present sample or placeholder data as real.** Label it.
- **Do not expose secrets.** (None exist here — keep it that way.)
- **Avoid unnecessary dependencies.** Bundle size is the real constraint.
- **Avoid unrelated changes.** One task, one concern.

---

## 4. Planning

Before implementing a non-trivial task:

1. **Inspect the relevant documentation** in `docs/`.
2. **Inspect the relevant code** — the route, its feature folder, and the shared components it uses.
3. **Identify affected files** — list them before editing.
4. **Identify dependencies** — does this need a new import or package?
5. **Identify whether content is sourced** — if the change adds claims about AATMA, name the source document.
6. **Identify how it will be verified** — which route, which command, which check.
7. **Write a concise plan** — then execute it.

For trivial changes (a typo, a colour token swap), skip to implementation.

---

## 5. Implementation

- **Make focused changes.** Do not refactor adjacent code as a side effect.
- **Reuse established patterns.** Copy the shape of an existing similar component.
- **Preserve existing behaviour** unless the task is explicitly to change it.
- **Avoid unnecessary rewrites.** A 10-line fix should not become a 300-line rewrite.
- **Keep code maintainable** — clear names, no clever tricks.
- **Use the `@/` import alias.** Never `../../`.
- **Use design tokens.** Never inline hex.

---

## 6. Validation

After implementation, in this order:

1. **Build** — `npm run build` must exit 0 (this also type-checks).
2. **Lint** — `npm run lint` must exit 0.
3. **Render** — load the affected route in a real browser.
4. **Check** — no broken images, no console errors, correct layout at 375 px and ≥1280 px.
5. **Review changed files** — `git diff` — confirm nothing unintended changed.
6. **Confirm artifacts exist** — if you created a file, verify it is on disk with its expected size.

**Do not claim a check passed unless you ran it.** Report unrun checks as unrun.

---

## 7. Documentation

Update the docs when your change affects:

| Change | Update |
|---|---|
| Product behaviour or scope | `docs/PRD.md` |
| A visual token, component recipe, or pattern | `docs/DESIGN_SYSTEM.md` |
| A route, dependency, or architectural decision | `docs/ARCHITECTURE.md` |
| A coding convention | `docs/CODE_STYLE.md` |
| How something is verified | `docs/TESTING.md` |

---

## 8. Conflict Handling

If requirements conflict, or a document contradicts the code:

**Do not guess.** Identify the conflict explicitly, state which sources disagree,
and ask for a decision. A silent choice becomes a bug that nobody can trace.

---

## 9. Honesty Requirements

This project has a documented history of agents reporting completion for work
that was never done. The following rules exist because of that:

- **Never report a task complete without naming the evidence** — file path, command output, or observed page state.
- **If you could not do something, say so plainly.** A blocked task honestly reported is worth more than a false completion.
- **Do not describe work you did not perform.** No "I generated the images" when no image files exist.
- **Verify before claiming.** `ls`, `grep`, `read_file` — confirm the artifact is real.
- **Report partial success as partial.** If 3 of 5 items are done, say which 3.

---

## 10. Completion Criteria

A task is complete only when:

- [ ] Requirements in `docs/PRD.md` (or the task description) are satisfied.
- [ ] `npm run build` succeeds.
- [ ] `npm run lint` succeeds.
- [ ] The affected route renders correctly in a browser.
- [ ] No unintended files changed (`git diff` reviewed).
- [ ] Sample/placeholder data remains labelled.
- [ ] Documentation updated where behaviour changed.
- [ ] The evidence for each of the above is stated in the completion report.

---

## 11. Environment Notes

| Item | Value |
|---|---|
| OS | Windows 11 |
| Shell | bash (git-bash / MSYS) — POSIX syntax, not PowerShell |
| Project root | `E:/all projects for hermes/aatma-site` |
| Dev server | `npm run dev` → `http://localhost:5173` |
| Verify built output | serve `dist/` (never the project root) on port 4173 |
| Client documents | `documents/` — 5 source files (2 .docx, 2 .pdf, 1 .docx) |

---

## 12. Quick Reference

```bash
npm run dev      # dev server on :5173
npm run build    # tsc -b && vite build  — must exit 0
npm run lint     # oxlint                 — must exit 0
npm run preview  # preview the built output
```

**Before you say "done":** build passes, lint passes, the route renders, and you
can name the file or command output that proves it.
