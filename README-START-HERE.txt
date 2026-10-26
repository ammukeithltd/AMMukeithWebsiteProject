AM MUKEITH LTD - WEBSITE SOURCE FILES
Export date: 26 October 2026
Published website: https://abdhool-mukeith-london.amdmukeith.chatgpt.site
Source version: 11
Source commit: 8def453d432f89eba72994bb65e52c2cebcac807

CONTENTS
app/ - website pages, layouts, styles, sitemap, robots and API routes
components/ and hooks/ - editable interface and shared components
lib/ - default page content, properties, reviews and document references
public/images/ - property photographs, portrait and Keller Williams logo
public/documents/ - all five supplied PDF guides and terms documents
db/ and drizzle/ - database schema, access code and SQL migrations
package.json and package-lock.json - dependencies and build commands
.env.example - blank environment configuration template
.openai/hosting.json - original Sites project configuration

GETTING STARTED
Extract the ZIP and open the AMMukeith-Website folder in your code editor.
The project uses React, TypeScript, Vinext, Vite and Cloudflare Workers/D1.
Use Node.js 22.13 or newer, plus npm.
Install the project dependencies with: npm ci
Run the local development server with: npm run dev
Build the site with: npm run build
Use the local address printed by the development server.

DATABASE AND HOSTING
This is a source-code export, not a complete live database backup.
Default content is included in lib/content.ts and lib/properties.json.
Live enquiries, manager-edited content, tracking settings and database records
are stored in the hosted Cloudflare D1 database and are not included here.
The SQL migration in drizzle/ defines the required tables. A developer must
provision the DB binding and apply the migration for a separate installation.
The original project configuration is retained for reference. If moving to a
different host or creating a separate website, configure the new deployment
and database, update the site origin, and adapt authentication as necessary.
Manager authentication relies on Sites identity headers; do not trust arbitrary
visitor-supplied identity headers when hosting the application elsewhere.

EXCLUSIONS
Passwords, the local .env file, private keys, Git history, node_modules,
build output and temporary caches are excluded. Dependencies can be restored
from the included package-lock.json. Configure runtime secrets separately.
The public Google ownership-verification meta tag is retained in the source.
No change was made to the live website to produce this export.
