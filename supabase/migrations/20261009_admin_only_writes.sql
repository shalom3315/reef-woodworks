-- ============================================================
-- Admin-only writes (applied to production 2026-10-09)
--
-- Before this, every write policy checked only "is signed in", and email
-- signup was open, so anyone could register and edit or delete all content.
-- Worse, two earlier fixes in this folder (fix_upsert_settings_auth.sql,
-- testimonials_moderation.sql) were never applied, so upsert_site_settings
-- could be called with the public anon key and no login at all, and anyone
-- could upload files to the SSSS bucket.
--
-- Signup is also disabled in Auth settings. The email list in is_admin()
-- must match src/lib/admin.ts.
-- ============================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT coalesce(lower(auth.jwt() ->> 'email'), '') = ANY (ARRAY['shalom3315@gmail.com'])
$$;

-- projects ---------------------------------------------------
DROP POLICY IF EXISTS "auth_all_projects" ON projects;
DROP POLICY IF EXISTS "projects_auth_write" ON projects;
CREATE POLICY "admin_write_projects" ON projects
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- videos -----------------------------------------------------
DROP POLICY IF EXISTS "auth delete videos" ON videos;
DROP POLICY IF EXISTS "auth insert videos" ON videos;
DROP POLICY IF EXISTS "videos_auth_write" ON videos;
CREATE POLICY "admin_write_videos" ON videos
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- faqs -------------------------------------------------------
DROP POLICY IF EXISTS "auth delete" ON faqs;
DROP POLICY IF EXISTS "auth insert" ON faqs;
DROP POLICY IF EXISTS "auth update" ON faqs;
DROP POLICY IF EXISTS "faqs_auth_write" ON faqs;
CREATE POLICY "admin_write_faqs" ON faqs
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- site_settings ----------------------------------------------
DROP POLICY IF EXISTS "auth_all_settings" ON site_settings;
CREATE POLICY "admin_write_settings" ON site_settings
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- testimonials: public form submits unapproved reviews, admin approves --
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS approved boolean NOT NULL DEFAULT false;
UPDATE testimonials SET approved = true;  -- everything already live stays live

DROP POLICY IF EXISTS "auth_all_testimonials" ON testimonials;
DROP POLICY IF EXISTS "testimonials_auth_delete" ON testimonials;
DROP POLICY IF EXISTS "testimonials_auth_modify" ON testimonials;
DROP POLICY IF EXISTS "public insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "testimonials_anon_insert" ON testimonials;
DROP POLICY IF EXISTS "public_read_testimonials" ON testimonials;
DROP POLICY IF EXISTS "testimonials_public_read" ON testimonials;
CREATE POLICY "testimonials_public_read" ON testimonials
  FOR SELECT USING (approved);
CREATE POLICY "testimonials_public_submit" ON testimonials
  FOR INSERT WITH CHECK (approved = false);
CREATE POLICY "admin_write_testimonials" ON testimonials
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- upsert_site_settings: SECURITY DEFINER bypasses RLS, so it must check itself --
CREATE OR REPLACE FUNCTION public.upsert_site_settings(settings jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;

  INSERT INTO site_settings (key, value)
  SELECT (elem->>'key')::text, (elem->>'value')::text
  FROM jsonb_array_elements(settings) AS elem
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
END;
$$;
REVOKE ALL ON FUNCTION public.upsert_site_settings(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.upsert_site_settings(jsonb) FROM anon;
GRANT EXECUTE ON FUNCTION public.upsert_site_settings(jsonb) TO authenticated;

-- storage: public bucket stays readable, only the admin can upload/change --
DROP POLICY IF EXISTS "SSSS_upload" ON storage.objects;
CREATE POLICY "SSSS_admin_insert" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'SSSS' AND public.is_admin());
CREATE POLICY "SSSS_admin_update" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'SSSS' AND public.is_admin());
CREATE POLICY "SSSS_admin_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'SSSS' AND public.is_admin());
