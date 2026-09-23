# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Homeowners and property owners in Israel looking for custom outdoor woodworking (decks, pergolas, outdoor furniture, etc.), browsing the marketing site to evaluate the business and get in touch. Secondary user: אלי מרקוס (business owner), who edits site text inline and manages content through the admin panel.

## Product Purpose

Marketing/lead-generation site for "ריף וודוורקס" (Reef Woodworks), a custom outdoor woodworking business. It showcases past projects (gallery), builds trust (testimonials, videos, blog), answers common questions (FAQ, chatbot), and converts visitors into leads (WhatsApp contact, chatbot).

## Positioning

Undecided / not yet articulated by the business owner. When asked what differentiates Reef from competitors, the answer given was "general work, not tied to any one specialty" — i.e. no confirmed narrow specialty or unique mechanism has been established. Future work should not invent a specific craft/material/price differentiator without checking with the owner first.

## Operating Context

- Content (projects, testimonials, videos, FAQs, most site text) is managed by the business owner via an inline edit mode on the public site and via `/admin` dashboard tabs (Projects, Videos, Testimonials, FAQ, Bot settings, Site settings).
- A chatbot (`/api/chat`, Claude Haiku) answers visitor questions using bot personality/pricing built from `site_settings`.
- Blog and color swatches are static, code-only content with no admin UI — updating them requires a code change and redeploy.
- Data lives in Supabase; if the Supabase project is unreachable (billing/inactivity pause), dynamic content (gallery, videos, testimonials, FAQs) fails to load and only `DEFAULT_SETTINGS` fallback text remains.

## Capabilities and Constraints

- Next.js 14 App Router, Hebrew RTL throughout, deployed on Vercel.
- Row-level security in Supabase is the only write protection — there is no privileged server-side client.
- `/api/describe-image` exists but is currently unused/orphaned in `src/`.
- Undecided: confirmed number of completed projects, years of experience, awards, or other concrete proof points — none were provided during this interview ("." — no evidence supplied). Do not fabricate testimonials, project counts, or credentials.

## Brand Commitments

- Business name: ריף וודוורקס (Reef Woodworks). Owner: אלי מרקוס.
- All UI text is Hebrew.

## Evidence on Hand

None confirmed at this time. Testimonials/projects exist in Supabase tables (`testimonials`, `projects`) but their content is dynamic and owner-managed, not fixed facts to hardcode. Do not invent specific numbers, names, or claims beyond what is actually stored there.

## Product Principles

- Preserve Hebrew RTL correctness and existing accessibility features (widget + accessibility statement page) in all design work.
- Don't invent positioning, proof points, or claims the owner hasn't confirmed — flag the gap instead.
- Content editability (inline edit + admin panel) is a constraint: new UI must remain compatible with `EditField`/`useEditContext` where it touches editable text.
- Treat Supabase-backed content as unreliable-by-default when reviewing UI (empty states matter, since the DB has previously gone unavailable).

## Accessibility & Inclusion

Two required accessibility surfaces already exist and must be preserved in any redesign: the floating accessibility widget (text size, high contrast, grayscale, reset) and the accessibility statement page linked from the footer.
