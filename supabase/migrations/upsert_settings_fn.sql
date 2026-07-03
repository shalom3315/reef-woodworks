-- הרץ אחת בלבד בתוך Supabase SQL Editor
-- יוצר פונקציית RPC שמבצעת upsert אטומי על site_settings תחת transaction אחד

CREATE OR REPLACE FUNCTION upsert_site_settings(settings jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO site_settings (key, value)
  SELECT
    (elem->>'key')::text,
    (elem->>'value')::text
  FROM jsonb_array_elements(settings) AS elem
  ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value;
END;
$$;
