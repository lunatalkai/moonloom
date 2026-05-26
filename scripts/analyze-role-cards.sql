-- Moonloom role card quality analysis.
-- Read-only queries for LunaTalk production or staging replicas.

SELECT COUNT(*) AS total_roles,
       SUM(roleVisibility='public') AS public_roles,
       SUM(roleVisibility='private') AS private_roles,
       SUM(reviewStatus='passed') AS passed_roles,
       SUM(themeId IS NOT NULL AND themeId <> '') AS theme_cards,
       SUM(talkNumReal > 0) AS roles_with_talks,
       MAX(talkNumReal) AS max_talks
FROM characterrole;

SELECT MAX(snapshot_date) AS latest_snapshot,
       MIN(snapshot_date) AS first_snapshot,
       COUNT(*) AS rows_cnt,
       COUNT(DISTINCT character_role_id) AS roles_cnt
FROM card_talk_snapshot;

WITH role_metrics AS (
  SELECT cr.characterRoleId,
         cr.roleType,
         cr.language,
         cr.roleVisibility,
         cr.reviewStatus,
         cr.recommendStatus,
         cr.talkNumReal,
         CHAR_LENGTH(cr.roleDesc) AS desc_len,
         CHAR_LENGTH(cr.roleDetailDesc) AS detail_len,
         CHAR_LENGTH(cr.roleWelcome) AS welcome_len,
         CHAR_LENGTH(cr.talkExample) AS example_len,
         CHAR_LENGTH(cr.jailbreak) AS jailbreak_len,
         CHAR_LENGTH(cr.roleTag) AS tag_len,
         CASE
           WHEN cr.roleWelcome LIKE '%<div%'
             OR cr.roleWelcome LIKE '%<p%'
             OR cr.roleWelcome LIKE '%<hc-%'
             OR cr.roleWelcome LIKE '%<!DOCTYPE%'
           THEN 1 ELSE 0
         END AS welcome_html,
         CASE
           WHEN cr.roleWelcome LIKE '%【%'
             OR cr.roleWelcome LIKE '%[%]%'
             OR cr.roleWelcome LIKE '%[%'
           THEN 1 ELSE 0
         END AS has_state_markers,
         CASE
           WHEN cr.roleWelcome LIKE '%1.%'
             OR cr.roleWelcome LIKE '%1:%'
             OR cr.roleWelcome LIKE '%①%'
             OR cr.roleWelcome LIKE '%選擇%'
             OR cr.roleWelcome LIKE '%选择%'
           THEN 1 ELSE 0
         END AS has_choices
  FROM characterrole cr
  WHERE cr.roleVisibility='public' AND cr.talkNumReal > 0
)
SELECT 'top_1000' AS cohort,
       COUNT(*) cnt,
       ROUND(AVG(talkNumReal),1) avg_talks,
       ROUND(AVG(desc_len),1) avg_desc_len,
       ROUND(AVG(detail_len),1) avg_detail_len,
       ROUND(AVG(welcome_len),1) avg_welcome_len,
       ROUND(AVG(example_len),1) avg_example_len,
       ROUND(AVG(jailbreak_len),1) avg_jailbreak_len,
       ROUND(AVG(tag_len),1) avg_tag_len,
       ROUND(AVG(welcome_html),3) html_rate,
       ROUND(AVG(has_state_markers),3) state_marker_rate,
       ROUND(AVG(has_choices),3) choice_rate
FROM (SELECT * FROM role_metrics ORDER BY talkNumReal DESC LIMIT 1000) x
UNION ALL
SELECT 'bottom_1000',
       COUNT(*),
       ROUND(AVG(talkNumReal),1),
       ROUND(AVG(desc_len),1),
       ROUND(AVG(detail_len),1),
       ROUND(AVG(welcome_len),1),
       ROUND(AVG(example_len),1),
       ROUND(AVG(jailbreak_len),1),
       ROUND(AVG(tag_len),1),
       ROUND(AVG(welcome_html),3),
       ROUND(AVG(has_state_markers),3),
       ROUND(AVG(has_choices),3)
FROM (SELECT * FROM role_metrics ORDER BY talkNumReal ASC LIMIT 1000) y;

WITH recent AS (
  SELECT character_role_id,
         SUM(msg_count) AS msg_7d,
         SUM(user_count) AS user_7d
  FROM card_talk_snapshot
  WHERE snapshot_date >= DATE_SUB((SELECT MAX(snapshot_date) FROM card_talk_snapshot), INTERVAL 6 DAY)
  GROUP BY character_role_id
), role_metrics AS (
  SELECT cr.characterRoleId,
         cr.roleType,
         cr.language,
         recent.msg_7d,
         recent.user_7d,
         CHAR_LENGTH(cr.roleDesc) AS desc_len,
         CHAR_LENGTH(cr.roleDetailDesc) AS detail_len,
         CHAR_LENGTH(cr.roleWelcome) AS welcome_len,
         CHAR_LENGTH(cr.talkExample) AS example_len,
         CHAR_LENGTH(cr.jailbreak) AS jailbreak_len,
         CHAR_LENGTH(cr.roleTag) AS tag_len,
         CASE
           WHEN cr.roleWelcome LIKE '%<div%'
             OR cr.roleWelcome LIKE '%<p%'
             OR cr.roleWelcome LIKE '%<hc-%'
             OR cr.roleWelcome LIKE '%<!DOCTYPE%'
           THEN 1 ELSE 0
         END AS welcome_html,
         CASE
           WHEN cr.roleWelcome LIKE '%【%'
             OR cr.roleWelcome LIKE '%[%]%'
             OR cr.roleWelcome LIKE '%[%'
           THEN 1 ELSE 0
         END AS has_state_markers,
         CASE
           WHEN cr.roleWelcome LIKE '%1.%'
             OR cr.roleWelcome LIKE '%1:%'
             OR cr.roleWelcome LIKE '%①%'
             OR cr.roleWelcome LIKE '%選擇%'
             OR cr.roleWelcome LIKE '%选择%'
           THEN 1 ELSE 0
         END AS has_choices
  FROM recent
  JOIN characterrole cr ON cr.characterRoleId = recent.character_role_id
  WHERE cr.roleVisibility='public' AND recent.msg_7d > 0
)
SELECT 'recent_top_300' AS cohort,
       COUNT(*) cnt,
       ROUND(AVG(msg_7d),1) avg_msg_7d,
       ROUND(AVG(user_7d),1) avg_user_7d,
       ROUND(AVG(desc_len),1) avg_desc_len,
       ROUND(AVG(detail_len),1) avg_detail_len,
       ROUND(AVG(welcome_len),1) avg_welcome_len,
       ROUND(AVG(example_len),1) avg_example_len,
       ROUND(AVG(jailbreak_len),1) avg_jailbreak_len,
       ROUND(AVG(tag_len),1) avg_tag_len,
       ROUND(AVG(welcome_html),3) html_rate,
       ROUND(AVG(has_state_markers),3) state_marker_rate,
       ROUND(AVG(has_choices),3) choice_rate
FROM (SELECT * FROM role_metrics ORDER BY msg_7d DESC LIMIT 300) x
UNION ALL
SELECT 'recent_bottom_300',
       COUNT(*),
       ROUND(AVG(msg_7d),1),
       ROUND(AVG(user_7d),1),
       ROUND(AVG(desc_len),1),
       ROUND(AVG(detail_len),1),
       ROUND(AVG(welcome_len),1),
       ROUND(AVG(example_len),1),
       ROUND(AVG(jailbreak_len),1),
       ROUND(AVG(tag_len),1),
       ROUND(AVG(welcome_html),3),
       ROUND(AVG(has_state_markers),3),
       ROUND(AVG(has_choices),3)
FROM (SELECT * FROM role_metrics ORDER BY msg_7d ASC LIMIT 300) y;
