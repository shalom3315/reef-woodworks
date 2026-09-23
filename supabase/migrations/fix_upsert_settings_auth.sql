-- הרץ פעם אחת בלבד ב-Supabase SQL Editor
-- ============================================================
-- תיקון אבטחה: upsert_site_settings היא SECURITY DEFINER (עוקפת RLS
-- בכוונה) אבל לא בדקה מי קורא לה. פונקציית RPC נגישה ב-Supabase דרך
-- REST גם למפתח ה-anon הציבורי (חשוף בדפדפן), כך שכל אחד יכול היה
-- לקרוא לה ישירות ולשנות/להשחית site_settings (כולל bot_ שמזינים את
-- הצ'אטבוט) בלי להתחבר בכלל ובלי לעבור דרך /api/settings.
-- ============================================================

CREATE OR REPLACE FUNCTION upsert_site_settings(settings jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF auth.role() <> 'authenticated' THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;

  INSERT INTO site_settings (key, value)
  SELECT
    (elem->>'key')::text,
    (elem->>'value')::text
  FROM jsonb_array_elements(settings) AS elem
  ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value;
END;
$$;

-- הידוק נוסף: מנע קריאה מתפקיד anon ברמת ה-grant עצמו (הגנה כפולה)
REVOKE ALL ON FUNCTION upsert_site_settings(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION upsert_site_settings(jsonb) FROM anon;
GRANT EXECUTE ON FUNCTION upsert_site_settings(jsonb) TO authenticated;
