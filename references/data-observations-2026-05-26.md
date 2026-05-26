# Data Observations: Role Card Quality Baseline

This note records the first Moonloom quality pass against LunaTalk production role
card data. It is evidence for the writing framework, not a final causal model.

Query date: 2026-05-26
Latest `card_talk_snapshot`: 2026-05-24

## Dataset shape

- `characterrole` rows: 42,985
- Public roles: 8,491
- Private roles: 34,475
- Roles with `talkNumReal > 0`: 35,734
- Public roles with snapshot history: available through `card_talk_snapshot`
- Snapshot coverage: 2025-05-01 through 2026-05-24

## Performance signal used

Use `talkNumReal` for lifetime traction and `card_talk_snapshot.msg_count` for
recent activity. `followNum` in `characterrole` was not useful for this pass
because sampled rows mostly showed zero denormalized values.

Recent activity was computed from the latest 7 snapshot days:

```sql
SUM(msg_count), SUM(user_count), SUM(conv_count)
```

## Cohort comparison

Public role lifetime cohort, top 1,000 by `talkNumReal` vs bottom 1,000 with
positive `talkNumReal`:

| Cohort | Avg talks | Avg desc | Avg detail | Avg welcome | HTML rate | State marker rate | Choice rate |
|---|---:|---:|---:|---:|---:|---:|---:|
| top 1,000 | 15,389.7 | 198.1 | 4,044.6 | 719.5 | 22.8% | 29.0% | 43.6% |
| bottom 1,000 | 12.9 | 174.3 | 2,170.3 | 688.0 | 11.1% | 8.0% | 22.1% |

Recent 7-day cohort, top 300 vs bottom 300 active public roles:

| Cohort | Avg msg 7d | Avg users 7d | Avg desc | Avg detail | Avg welcome | HTML rate | State marker rate | Choice rate |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| recent top 300 | 1,394.7 | 55.5 | 229.4 | 6,090.6 | 1,331.8 | 43.3% | 34.3% | 71.3% |
| recent bottom 300 | 1.0 | 1.0 | 182.2 | 3,028.4 | 709.3 | 21.3% | 15.7% | 37.0% |

## Length observations

Detail length buckets among public roles with positive `talkNumReal`:

| Detail length | Count | Avg talks | Max talks |
|---|---:|---:|---:|
| 0 | 7 | 24,232.6 | 165,758 |
| <200 | 1,439 | 1,186.7 | 180,565 |
| 200-799 | 1,660 | 2,231.1 | 173,847 |
| 800-2,499 | 1,993 | 3,218.8 | 733,712 |
| 2,500-7,999 | 2,114 | 1,999.0 | 113,706 |
| 8,000+ | 1,025 | 3,387.5 | 269,120 |

Welcome length buckets:

| Welcome length | Count | Avg talks | Max talks |
|---|---:|---:|---:|
| <50 | 2,255 | 1,384.5 | 173,847 |
| 50-199 | 2,056 | 4,125.0 | 733,712 |
| 200-799 | 1,415 | 2,073.0 | 124,369 |
| 800-1,999 | 1,744 | 2,154.7 | 269,120 |
| 2,000+ | 768 | 1,822.8 | 113,706 |

Interpretation: detail depth helps, especially for systems and worlds, but raw
length alone is not enough. Welcome text should create action quickly; very long
welcome screens are not consistently better.

## Role type observations

Recent 7-day activity by role type:

| Role type | Active roles | Total msg 7d | Avg msg 7d | Max msg 7d |
|---|---:|---:|---:|---:|
| hudong | 1,154 | 160,446 | 139.0 | 17,179 |
| system | 1,466 | 153,500 | 104.7 | 5,934 |
| create | 2,459 | 108,406 | 44.1 | 11,683 |
| interactive | 677 | 77,998 | 115.2 | 10,298 |
| anime | 1,394 | 50,655 | 36.3 | 4,436 |
| original | 132 | 16,990 | 128.7 | 4,647 |
| story | 265 | 15,584 | 58.8 | 4,455 |
| func | 74 | 9,698 | 131.1 | 3,503 |

Interpretation: repeatable interaction loops dominate usage. Single-character
cards can still perform well when the fantasy is sharp, the first scene creates
tension, and the role responds consistently.

## Derived product lessons

1. Top cards usually have a play loop, not just a persona.
2. Strong cards put dense rules and world knowledge behind a short playable front.
3. Choice scaffolds, state panels, or explicit player setup prompts correlate with
   higher activity, especially for system/world/RPG cards.
4. Concise high-tension openings can outperform ornate openings for companion and
   relationship cards.
5. HTML appears more often among top recent cards, but this is likely creator
   sophistication plus visual affordance, not proof that HTML is inherently better.
6. The quality framework should optimize for agency, replayability, context
   stability, render safety, and token economy at the same time.
