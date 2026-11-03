# Nexoratech: local React + PostgreSQL setup

The public React site can display its built-in content even when the API is offline. Saving in the admin area and receiving form enquiries require PostgreSQL and the local API.

## Requirements

- Node.js 20.19+ and npm
- PostgreSQL 16+ running locally, **or** Docker with Compose
- A browser at `http://localhost:5173`

## One-time database setup

1. Install dependencies: `npm install`.
2. Copy `.env.example` to `.env`. Set `ADMIN_EMAIL`, a strong `ADMIN_PASSWORD` (12+ characters), and a random `JWT_SECRET` (32+ characters). Keep `.env` private.
3. If using Docker, run `docker compose up -d`. The included `compose.yaml` creates the `nexoratech` PostgreSQL database and a persistent volume. Its demo DB password is `change_this_password`; change it **in both** `compose.yaml` and `.env` before using the project outside local development. If PostgreSQL is already installed, create a database named `nexoratech` and give the user in `DATABASE_URL` access to it instead.
4. Initialize tables and create your admin login: `node server/setup.mjs`. Running setup again updates the configured admin password.

## Start the local site

Use two terminal windows (both in the project directory):

1. API: `node server/index.mjs`. It listens on `http://localhost:3001`.
2. React dev server: `npm run dev`. It normally opens at `http://localhost:5173`.

Open `http://localhost:5173/#/admin` and sign in using `ADMIN_EMAIL` and `ADMIN_PASSWORD`. The public site is `http://localhost:5173/#/`. In the admin header, a green dot means the PostgreSQL API is connected.

On the first successful admin visit, the application imports the built-in company settings, eight core services, six blog posts and six case studies into PostgreSQL. The 63 sub-services are nested in their core-service documents and may also receive separate overrides. This import is idempotent and does not overwrite existing records.

For a **built local server on one port**, run `npm run build`, then `node server/index.mjs` and visit `http://localhost:3001/#/`. Rebuild after making code changes. The API serves `dist/index.html` if it exists.

## CMS usage

- **Overview:** database-backed content and enquiries summary with a chart of real form submissions. Counts for services/posts come from live content.
- **Page Content & SEO:** override hero title, hero description, SEO title/description, section headings, FAQs, or any exact text fragment on each route. Copy the exact visible text from the live page to use the text-replacement editor.
- **Services:** edit the structured core and sub-service information, including arrays for FAQs, features, technology, benefits and nested items. An advanced JSON editor exposes the whole record.
- **Blog Posts / Case Studies:** edit the structured record, copy, results and FAQs; create new items.
- **Media Library:** upload JPG/PNG/WebP/AVIF (max 5 MB), specify alt text, and optionally assign a cover image to a blog or case study. For other sections, paste the copied image URL into the relevant document field.
- **Colors & Fonts:** only the administrator sets brand, gradient, light-mode text/surface colors and typography. Visitors still have a personal light/dark toggle. Theme updates reach open public tabs at the next 30-second refresh.
- **Site Identity:** update company information, contacts, social profiles, statistics, client marks, partner marks, team and testimonials. Lists use JSON editors.
- **Enquiries:** forms create database records; move them through New, In progress, Closed.

CMS records are stored as JSONB in PostgreSQL. Built-in content remains a fallback until a corresponding record is saved. Deleting an override reverts to that built-in content. Do not confuse this with deleting the original source entry.

## API overview

- `GET /api/health`: database health
- `GET /api/public`: published CMS documents (no credentials required)
- `POST /api/leads`: public contact form
- `POST /api/admin/login`: admin token
- `GET /api/admin/overview`, `GET /api/admin/leads`: authenticated metrics and leads
- `PUT /api/admin/documents/:kind`, `DELETE /api/admin/documents/:kind?key=...`: authenticated document editing
- `POST /api/admin/upload`: authenticated image upload
- `PATCH /api/admin/leads/:id`: authenticated lead status

Writes use parameterized SQL. Passwords are bcrypt-hashed. Admin routes require an 8-hour JWT. Tokens are stored in the browser's sessionStorage, not in the source code. Uploaded files are stored in `public/uploads`; back up that folder alongside PostgreSQL. Protect your admin/API with HTTPS and additional controls before public internet deployment.

## Important pre-launch checks

- Replace sample statistics, case studies, client logos, partner badges, staff, photos and reviews with **verified** information. The current stock portraits do not depict the named reviewers.
- `SITE.domain` is a placeholder. Update it and regenerate the sitemap/robots when the real domain is known.
- The current HashRouter/single-page architecture is for the local prototype. Search crawlers need clean, prerendered/server-rendered URLs; client-side SEO metadata is not sufficient for production SEO.
- The API at port 3001 generates `/sitemap.xml` from the base sitemap plus saved services/articles. Vite's dev server at port 5173 still serves the static base XML; use the API's sitemap for local testing of newly created documents.
- The contact form stores enquiries but does not send email. If you need notifications, add SMTP or a mail service to the API.