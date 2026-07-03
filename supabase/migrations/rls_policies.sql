-- ============================================================
-- RLS (Row Level Security) — הרץ פעם אחת בלבד ב-Supabase SQL Editor
-- ============================================================

-- 1. אפשר RLS על כל הטבלאות
ALTER TABLE projects        ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials    ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos          ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs            ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- projects — קריאה לכולם, כתיבה לאדמין בלבד
-- ============================================================
CREATE POLICY "projects_public_read"
  ON projects FOR SELECT USING (true);

CREATE POLICY "projects_auth_write"
  ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- testimonials — קריאה + הכנסה לכולם (טופס ציבורי), מחיקה/עדכון לאדמין
-- ============================================================
CREATE POLICY "testimonials_public_read"
  ON testimonials FOR SELECT USING (true);

CREATE POLICY "testimonials_anon_insert"
  ON testimonials FOR INSERT WITH CHECK (true);

CREATE POLICY "testimonials_auth_modify"
  ON testimonials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "testimonials_auth_delete"
  ON testimonials FOR DELETE TO authenticated USING (true);

-- ============================================================
-- site_settings — קריאה לכולם (הגדרות האתר נטענות בדף הראשי)
-- כתיבה רק דרך פונקציית RPC שהיא SECURITY DEFINER (מעקפת RLS בכוונה)
-- ============================================================
CREATE POLICY "settings_public_read"
  ON site_settings FOR SELECT USING (true);

-- ============================================================
-- videos — קריאה לכולם, כתיבה לאדמין בלבד
-- ============================================================
CREATE POLICY "videos_public_read"
  ON videos FOR SELECT USING (true);

CREATE POLICY "videos_auth_write"
  ON videos FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- faqs — קריאה לכולם, כתיבה לאדמין בלבד
-- ============================================================
CREATE POLICY "faqs_public_read"
  ON faqs FOR SELECT USING (true);

CREATE POLICY "faqs_auth_write"
  ON faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- אחרי הרצת ה-SQL, וודא בהגדרות Supabase Storage:
-- Bucket "SSSS" → Policies → הוסף policy שמאפשר INSERT/SELECT לכל מי שמחובר
-- ============================================================
