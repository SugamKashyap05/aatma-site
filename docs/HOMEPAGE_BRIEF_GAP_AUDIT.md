# Homepage coverage vs final client brief

**Audit date:** 2026-10-22
**Scope:** Main `/` route and its topic sections, compared with the final brief represented by `src/data/about-spine.ts`. This is a topic-level coverage audit, not a claim that all homepage redesign work is complete.

## Summary

The full brief remains accessible from the homepage: expanding About reveals the editorial and ten source-ordered sections, and each item opens its full text; `/about` remains the dedicated reader. Therefore, the entries below are gaps in the subject-specific homepage sections, not paragraphs missing from the full brief reader.

Implemented in the targeted client follow-up:

- Added the source-provided 20 December 2011 MoEF meeting and briefing to Critical Era as a new fourth detail card, following the combined 2016 card as requested.
- Combined the 24 August 2016 Minister's Initiative and 28 October 2016 National Conference in one 2016 card.
- Removed the standalone Legal Procurement Certificate (LPC) card from Agar Story per the client request. The full brief remains unaltered in the reader, and the separate Critical Era account still mentions the 2000 stoppage of LPC issuance.

## Remaining topic-level gaps

| Homepage area | Brief material not yet surfaced in that topic section |
|---|---|
| Agar Story / Trade (brief §§II–III) | The section covers the Sylhet origin, Hojai distillation, late-1960s NEFA/Bhutan leases, the 1982 standstill, Far-East imports, the 2000 seminar, and the Manipur–Bombay route. It does not yet surface the brief's wider market distribution and rising perfumery demand; the Barpather start and Karbi Anglong/Naga Hills sourcing; the later Naharani/Jorhat/Sibsagar home-grown supply; or the Hojai employment figure of about 5,000. The dedicated LPC card is intentionally excluded. |
| Formation (brief §IV) | The homepage covers the 1975–76 formation context, 1976 founding, registration number, and advocacy. It does not surface the 2000 general-meeting reorganization. The source names remain in the complete reader and are not duplicated in the home summary. |
| National Seminar (brief §V) | The existing Agar Story card shows the November 2000 seminar, Guwahati venue, scientist attendance, and Dr P.K. Hajra. It does not surface the proceedings/reports, the seminar's role in encouraging private plantations across the named states, the AATMA–Assam Government survey, or the source's cultivated-tree and livelihood statements. |
| Critical Era (brief §VI) | The requested 2011 meeting is now included; the two 2016 events share one card. The section's current dialog details cover the remaining critical-era paragraphs. |
| Achievement (brief §VII) | The 2021 memorandum, 2023 Rules, and 14 February 2023 Stakeholders Conference are represented. The brief's explicit statement that the Rules would support plantation development is not yet stated in this homepage section. |
| NDF Findings (brief §VIII) | The homepage shows the BSI report/date, CR and CITES status, population estimate/qualifier, and districts. It does not show the named NDF methodology, the Article IV explanation, the Hojai/Calicut market survey, or the full list of states where units were visited. |
| Rules (brief §IX) | The homepage shows registration instead of licensing, current-location operation, five-year registration, unit categories, and basic CITES traceability. It does not explain the Assam Trees Outside Forest (Sustainable Management) Rules 2022 or the brief's claim about the end-to-end online platform, transparency, and timely permissions. The industrial-estate/Supreme Court context appears in Critical Era, not in this Rules section. |
| Challenges (brief §X) | The homepage covers high fees, lengthy registration at a high level, single-window advocacy, buyer losses, and the 26 August 2026 workshop. It does not spell out the NOC chain (DGFT, State Forest Department, MoEFCC/SU Division, CITES, Customs, and WCCB), the possible 30-working-day Ministry step, or the full reason the source says buyers are lost. |

## Boundary and next work

These omissions are confirmed against the current homepage components: `AgarStory.tsx`, `FormationSection.tsx`, `AchievementSection.tsx`, `NdfFindingsSection.tsx`, `RulesSection.tsx`, and `ChallengesSection.tsx`. They are not silently filled here; the wider brief-to-topic mapping and any further homepage copy/layout changes remain separate work. Do not infer that the LPC removal request applies to all historical or policy references: this update removes the pictured standalone Agar Story card only.
