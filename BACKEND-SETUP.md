# PTUT Website — Backend Setup Guide

The website now has a real backend:

- **Supabase (Postgres)** stores all content: programs, faculty, news, documents, short courses, settings, and contact-form messages.
- **Supabase Auth** provides the admin login (no public user accounts — this is a public information site).
- **Cloudflare R2** stores every file: images and PDFs.

**The most important thing to know:** the site works with *no* backend configured. Until you plug in the environment variables below, every page renders from the content files already in the code (`src/data/*`). Connecting Supabase simply makes that same content editable — nothing breaks in between.

---

## Architecture

### Data flow

```
 Visitor's browser
      │
      ├── Public pages ──► Server Components ──► repository (src/lib/data.ts)
      │                                               │              │
      │                                          Supabase (anon     │ on error / empty /
      │                                          key, RLS:        │ no env vars
      │                                          published only)  ▼
      │                                                    local data in src/data/*
      │
      ├── Images / PDFs ──► Cloudflare R2 public URL (NEXT_PUBLIC_R2_PUBLIC_URL)
      │
      └── Contact form ──► POST /api/contact ──► contact_messages table
                                                   (service-role key, server only)

 Admin (/admin, login required)
      │
      ├── Upload widget ──► POST /api/admin/upload-url (checks session + role)
      │                          └─► presigned R2 URL ──► browser uploads file
      │                              directly to R2 ──► POST /api/admin/media
      │                              registers the file in media_assets
      └── Quick-add forms ──► Supabase (browser client, RLS admin policies)
```

### Database tables (created by `supabase/migrations/0001_backend.sql`)

| Table | What it holds |
|---|---|
| `profiles` | One row per Supabase Auth user; `role` = admin / editor / viewer |
| `departments` | The 4 faculty departments |
| `faculty_members` | Staff directory (slug, name, designation, email, department, photo) |
| `programs` | The 10 degree programs; curriculum/PEOs/PLOs stored as JSON |
| `documents` | Every downloadable PDF (merit lists, challans, forms, fees, curriculum…) with its R2 file key |
| `news_articles` | Homepage news cards |
| `short_courses` | Short courses (e.g. Denim Supervisor) |
| `leadership_members` | Leadership messages (for future use) |
| `admin_offices` | The 5 administration offices |
| `campus_gallery` | Campus gallery images |
| `content_pages` | Simple free-form pages (for future use) |
| `site_settings` | Key/value site settings (name, phone, email, address…) |
| `media_assets` | Registry of every file uploaded to R2 |
| `contact_messages` | Messages from the public contact form |

Security: Row Level Security is on for every table. The public can only **read published** rows; only users whose profile role is `admin` can change content; contact messages can be submitted by anyone but read only by admins.

### R2 folder map

| Local folder (in `public/`) | R2 folder |
|---|---|
| `public/faculty/*.jpg` | `images/faculty/` |
| news images (`/images/news-*.jpg`) | `images/news/` |
| `public/images/campus-*` | `images/campus/` |
| hero / banner images | `images/hero/` |
| leadership portraits | `images/leadership/` |
| program images | `images/programs/` |
| logo & site graphics | `images/site/` |
| merit list PDFs | `pdfs/merit-lists/` |
| fee challan PDFs | `pdfs/challans/` |
| forms (undertaking, medical…) | `pdfs/forms/` |
| fee structure PDFs | `pdfs/fees/` |
| curriculum / survey PDFs | `pdfs/curriculum/` |
| anything else | `pdfs/general/` |

---

## Step-by-step setup

### Step 1 — Create a NEW Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New project**. Give it a name like `ptut-website`.
   > ⚠️ Do **not** reuse the University Manager Supabase project. That is a different application — keep the databases separate. Using the same Supabase *account* is fine.
3. Set a database password (save it in your password manager) and wait for the project to finish provisioning.

### Step 2 — Create the database tables

1. In the Supabase dashboard, open **SQL Editor → New query**.
2. Open the file `supabase/migrations/0001_backend.sql` from this project, copy the whole file, paste it, and click **Run**. It should finish with "Success".
3. (Optional but recommended) Do the same with `supabase/seed.sql` — it adds the departments, site settings, the 5 admin offices, and the campus gallery entries.

### Step 3 — Create the admin user

1. Dashboard → **Authentication → Users → Add user**. Enter the admin email + a strong password.
2. Back in the SQL Editor, run this (use the same email):

   ```sql
   update public.profiles set role = 'admin'
   where email = 'your-admin-email@example.com';
   ```

   (A profile row is created automatically for every new user with role `viewer`; this promotes yours to `admin`.)

### Step 4 — Create the Cloudflare R2 bucket

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **R2** → **Create bucket**. Name it `ptut-media`.
2. **API keys:** R2 → **Manage R2 API Tokens → Create API Token** — permission **Object Read & Write**, scoped to the `ptut-media` bucket. Copy the **Access Key ID** and **Secret Access Key** (the secret is shown only once). Note your **Account ID** from the R2 overview page.
3. **Public access:** open the bucket → **Settings → Public access** → enable the **r2.dev subdomain** (it looks like `https://pub-xxxxxxxx.r2.dev`). A custom domain (e.g. `media.ptut.edu.pk`) also works and looks more professional — you can switch later without code changes, just update `NEXT_PUBLIC_R2_PUBLIC_URL`.
4. **CORS** (required so the admin upload widget can send files from the browser): bucket → **Settings → CORS policy** → add:

   ```json
   [
     {
       "AllowedOrigins": ["http://localhost:3000", "https://YOUR-SITE-DOMAIN"],
       "AllowedMethods": ["PUT", "GET", "HEAD"],
       "AllowedHeaders": ["*"],
       "MaxAgeSeconds": 3600
     }
   ]
   ```

   Replace `YOUR-SITE-DOMAIN` with the real domain once deployed (you can edit this later).

### Step 5 — Environment variables

Copy `.env.example` to `.env.local` for local work, and add the same variables in **Vercel → Project → Settings → Environment Variables** for production.

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → `anon public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` key (**secret — server only**) |
| `R2_ACCOUNT_ID` | Cloudflare → R2 → Overview |
| `R2_ACCESS_KEY_ID` | The R2 API token from Step 4 |
| `R2_SECRET_ACCESS_KEY` | The R2 API token from Step 4 |
| `R2_BUCKET_NAME` | `ptut-media` (or whatever you named the bucket) |
| `NEXT_PUBLIC_R2_PUBLIC_URL` | The bucket's r2.dev URL or custom domain, e.g. `https://pub-xxxx.r2.dev` |
| `NEXT_PUBLIC_SITE_URL` | The website's public URL |

### Step 6 — Seed the content

With `.env.local` filled in:

```bash
npm install
npm run seed
```

This copies all 10 programs, 19 faculty members, 6 news articles, all document entries (merit lists, fees, program downloads, short-course files) and the Denim Supervisor course from the code into Supabase. It is safe to re-run — it updates instead of duplicating, and it never erases file links you have already uploaded.

### Step 7 — Upload the real images and PDFs

The document entries are seeded with **no file attached** (the old links were all `#`). To attach the real files:

1. Run the site, open **`/admin`**, and sign in.
2. Use the **Upload** widget: pick the right folder (see the folder map above), choose the file, upload. Copy the resulting public URL.
3. For a document, use **Add a Document** only if it's a brand-new file. To link a file to an *existing* seeded document (e.g. "SET 2nd List"), open Supabase → **Table Editor → documents**, find the row, and paste the file's R2 **key** (the part after the bucket URL, e.g. `pdfs/merit-lists/1699-set-2nd-list.pdf`) into `file_key`. The website picks it up within ~5 minutes (pages revalidate every 300 s).

   The same works for faculty photos: upload to `images/faculty/`, then set that member's `image` in `faculty_members` to the key (or full URL).
4. Bulk option: tools like **rclone** can copy the whole `public/` folder tree into the bucket at once if you have many files.

Until a file is linked, its button simply keeps the old `#` behaviour — nothing looks broken.

### Step 8 — Deploy to Vercel

1. Push the project to GitHub and import it in Vercel (or `vercel` from the project folder).
2. Add all Step 5 variables in Vercel project settings.
3. Deploy. Then:
   - Visit `/contact` and send a test message → check Supabase **Table Editor → contact_messages**.
   - Sign in at `/admin` and upload a test image → it should appear under "Recent Uploads" and open via its public URL.
   - Add your production domain to the R2 bucket CORS policy (Step 4.4) so uploads work from the live site.

---

## How the fallback works

Every page reads through `src/lib/data.ts`. Each function:

1. If `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing → returns the local data from `src/data/*`.
2. If Supabase returns an error or zero rows → returns the local data.
3. Otherwise → returns the database content, with image/file fields converted to full URLs (local `/…` paths pass through unchanged; R2 keys get the `NEXT_PUBLIC_R2_PUBLIC_URL` prefix).

So the site can never be "broken" by a missing or empty database, and you can connect Supabase at any time without a redesign.

## Security notes

- `SUPABASE_SERVICE_ROLE_KEY` bypasses all security rules. It is used **only** in server code (contact-form inserts) and the seed script. Never put it in browser code, never commit it, and rotate it if it ever leaks.
- The anon key is safe to expose — RLS decides what it can do (read published content only).
- Uploads are only possible with a valid admin/editor login: the server checks the session and role before issuing a presigned URL, and the URL expires after 15 minutes.
- The contact form has a hidden honeypot field and server-side length validation.
- `.env*` files are already in `.gitignore`. Keep it that way.

## TODO / known notes

- **DONE (2026-11-09):** Supabase project `ptut-website` (ref `tsumybabyvmcksvrkyud`, Mumbai) created, migration + seeds run and verified (10 programs, 19 faculty, 41 documents, 6 news). R2 bucket `ptut-media` created on the Cloudflare account, r2.dev public access on (https://pub-5ccdc7730687457e8b0b90f600cbcaf9.r2.dev), CORS saved for http://localhost:3000, API token `ptut-website-app` (Object Read & Write, bucket-scoped) created. All env vars are filled in `.env.local` (kept out of git/zips). Live test passed: presigned upload → public read → delete all verified against the real bucket. Remaining: add the production domain to the R2 CORS policy after deploying, and upload the real PDFs/images via /admin.
- **TODO:** upload the real merit-list / challan / fee PDFs and link them in the `documents` table (Step 7). Until then those buttons point to `#`, exactly as before.
- **TODO:** update the R2 CORS policy with the production domain after deploying.
- The leadership page and campus gallery still render their built-in content; the `leadership_members` and `campus_gallery` tables + repository functions are ready for when you want them editable too.
- Admin power-features (editing programs/faculty in a GUI, deleting files) are intentionally not built yet — content edits can be done in the Supabase Table Editor, which is safe thanks to RLS + the fallback layer.
