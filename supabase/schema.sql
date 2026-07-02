-- =========================================
-- בן-דוד נגרות – Supabase Schema
-- =========================================
-- הרץ קובץ זה ב-Supabase SQL Editor לאחר יצירת הפרויקט

-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =================== TABLES ===================

CREATE TABLE IF NOT EXISTS projects (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  description  TEXT DEFAULT '',
  material     TEXT DEFAULT '',
  duration     TEXT DEFAULT '',
  image_url    TEXT NOT NULL,
  category     TEXT DEFAULT 'ריהוט',
  featured     BOOLEAN DEFAULT false,
  order_index  INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  location    TEXT DEFAULT '',
  text        TEXT NOT NULL,
  project     TEXT DEFAULT '',
  rating      INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =================== RLS ===================

ALTER TABLE projects       ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials   ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings  ENABLE ROW LEVEL SECURITY;

-- Public: read only
CREATE POLICY "public_read_projects"      ON projects       FOR SELECT USING (true);
CREATE POLICY "public_read_testimonials"  ON testimonials   FOR SELECT USING (true);
CREATE POLICY "public_read_settings"      ON site_settings  FOR SELECT USING (true);

-- Authenticated: full access (admin panel)
CREATE POLICY "auth_all_projects"      ON projects       FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_testimonials"  ON testimonials   FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_settings"      ON site_settings  FOR ALL USING (auth.role() = 'authenticated');

-- =================== SEED DATA ===================

INSERT INTO projects (title, description, material, duration, image_url, category, featured, order_index)
VALUES
  ('שולחן אוכל אגוז', 'שולחן אוכל מוצק מעץ אגוז אמריקאי, ל-8 מקומות ישיבה. רגליים מעוגלות בעיבוד ידני. גוון טבעי עם שמן דנמרק.', 'אגוז אמריקאי', '4 שבועות', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', 'שולחנות', true, 1),
  ('ספרייה מרצפה לתקרה', 'ספרייה בנויה לפי מידות מרצפה לתקרה, עם ארונות תחתונים ותאים פתוחים מעץ אלון מעושן.', 'אלון מעושן', '6 שבועות', 'https://images.unsplash.com/photo-1594312915251-48db9280c8f1?w=800&q=80', 'ריהוט', true, 2),
  ('שידת לילה מינימליסטית', 'זוג שידות לילה מעץ שיטה טבעי. עיצוב נקי עם מגירה ומדף. גוון ושעווה בגימור מט.', 'שיטה טבעי', '2 שבועות', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', 'חדר שינה', false, 3),
  ('ספסל כניסה עם אחסון', 'ספסל כניסה עם מגירות אחסון נסתרות, ידיות פליז וכרית עור. עיצוב ייחודי לפי דרישת הלקוח.', 'אלמוג + פליז', '3 שבועות', 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80', 'ריהוט', false, 4),
  ('שולחן קפה – ריינה חי', 'שולחן מרכזי עם לוח עץ ריינה עם שפה חיה, ממולא אפוקסי כחול. רגליים ממתכת שחורה.', 'ריינה + אפוקסי + מתכת', '3 שבועות', 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80', 'שולחנות', false, 5),
  ('ארונות מטבח עץ מלא', 'מטבח שלם מעץ אגוז מלא עם חזיתות ידיות משוקעות. לפיות עץ מוצק תואמות.', 'אגוז + ספיר', '8 שבועות', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', 'מטבח', true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (name, location, text, project, rating)
VALUES
  ('מיכל כ.', 'תל אביב', 'שולחן האוכל שהזמנו הפך לנקודת המוקד של הבית שלנו. כל מי שמגיע שואל עליו. איכות שלא ראיתי אף פעם בקנייה רגילה.', 'שולחן אוכל אגוז', 5),
  ('דני א.', 'הרצליה', 'הוא הקשיב בסבלנות לכל מה שרצינו ויצר משהו שמעבר לכל ציפייה. מקצוען אמיתי שאוהב את מה שהוא עושה – זה מרגישים.', 'ספרייה מרצפה לתקרה', 5),
  ('יעל ר.', 'רמת גן', 'מדפי הספרים שבנה לנו הם יצירת אמנות. גם ההסבר, גם הזמן, גם התוצאה – הכל היה מושלם. ממליצה בחום!', 'מדפי ספרים', 5)
ON CONFLICT DO NOTHING;

INSERT INTO site_settings (key, value)
VALUES
  ('business_name', 'בן-דוד נגרות'),
  ('hero_title', 'עבודות עץ בהתאמה אישית'),
  ('hero_subtitle', 'רהיטים, שולחנות ופתרונות עץ בעבודת יד. מחומרים מהטבע, עם תשומת לב לכל פרט.'),
  ('about_text', 'עם למעלה מ-15 שנות ניסיון בנגרות אמנותית, אני מאמין שכל חתיכת עץ מספרת סיפור. כל פרויקט מתחיל בשיחה, מתפתח לרעיון, ומסתיים ביצירה שתשרת אתכם שנים קדימה.'),
  ('phone', '050-123-4567'),
  ('whatsapp', '972501234567'),
  ('email', 'info@bendavid-woodwork.co.il'),
  ('address', 'כפר סבא, מרכז הארץ'),
  ('instagram', '#'),
  ('facebook', '#')
ON CONFLICT (key) DO NOTHING;

-- =================== STORAGE (Optional) ===================
-- כדי לאפשר העלאת תמונות דרך פאנל הניהול:
-- 1. לכו ל-Supabase Dashboard → Storage → New bucket
-- 2. שם: "project-images"
-- 3. Public bucket: Yes
-- 4. הוסיפו policy: Authenticated users can upload
