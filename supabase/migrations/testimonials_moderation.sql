-- ============================================================
-- testimonials — ביקורות מהטופס הציבורי ממתינות לאישור לפני שהן מוצגות
-- להריץ פעם אחת ב-Supabase SQL Editor
-- ============================================================

ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS approved boolean NOT NULL DEFAULT false;

-- הביקורות שכבר קיימות היו מוצגות באתר לפני המיגרציה — נשארות מאושרות
UPDATE testimonials SET approved = true;

-- ציבור רואה רק ביקורות מאושרות; אדמין מחובר רואה הכל (כולל ממתינות)
DROP POLICY IF EXISTS "testimonials_public_read" ON testimonials;
CREATE POLICY "testimonials_public_read"
  ON testimonials FOR SELECT USING (approved);

DROP POLICY IF EXISTS "testimonials_auth_read_all" ON testimonials;
CREATE POLICY "testimonials_auth_read_all"
  ON testimonials FOR SELECT TO authenticated USING (true);

-- טופס ציבורי לא יכול לאשר את עצמו
DROP POLICY IF EXISTS "testimonials_anon_insert" ON testimonials;
CREATE POLICY "testimonials_anon_insert"
  ON testimonials FOR INSERT WITH CHECK (approved = false);

-- אדמין מחובר יכול להוסיף המלצה (מאושרת או לא)
DROP POLICY IF EXISTS "testimonials_auth_insert" ON testimonials;
CREATE POLICY "testimonials_auth_insert"
  ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
