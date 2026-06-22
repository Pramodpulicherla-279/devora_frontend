// src/root.jsx — React Router framework-mode root route.
// Replaces index.html: it renders the full HTML document for every page.
//   • <Meta/>  → per-route meta from each route's `meta` export
//   • <Links/> → per-route <link> tags (favicons, fonts, canonical)
//   • <Scripts/> → the app's client JS bundle
// Site-wide JSON-LD (Organization + WebSite + course sitelinks) lives here so it
// appears on every page; page-specific schemas come from each route's meta.
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import './index.css';

const BASE = 'https://dev-el.co';

// Site-wide structured data (was the static block in index.html)
const SITE_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      '@id': `${BASE}/#org`,
      name: 'Dev.EL',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/dev-el-logo-v2.png`, width: 192, height: 192 },
      description:
        'Dev.EL transforms beginners into advanced developers with free interactive courses in HTML, CSS, JavaScript, React, Node.js, SQL, Git, and more — with live coding, AI tutoring, quizzes, and roadmaps.',
      sameAs: [BASE],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      url: BASE,
      name: 'Dev.EL',
      publisher: { '@id': `${BASE}/#org` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${BASE}/#site-navigation`,
      name: 'Dev.EL — Free Coding Courses',
      itemListElement: [
        { '@type': 'SiteNavigationElement', position: 1, name: 'HTML Course — Free', url: `${BASE}/course/html/introduction-to-html` },
        { '@type': 'SiteNavigationElement', position: 2, name: 'CSS Course — Free', url: `${BASE}/course/css/css-get-started` },
        { '@type': 'SiteNavigationElement', position: 3, name: 'JavaScript Course — Free', url: `${BASE}/course/javascript/variables-data-types` },
        { '@type': 'SiteNavigationElement', position: 4, name: 'Node.js & Express Course — Free', url: `${BASE}/course/backend-nodejs-express/introduction-to-nodejs-and-node-repl` },
        { '@type': 'SiteNavigationElement', position: 5, name: 'SQL Course — Free', url: `${BASE}/course/sql/every-app-runs-on-a-database` },
        { '@type': 'SiteNavigationElement', position: 6, name: 'Git & GitHub Course — Free', url: `${BASE}/course/git-and-github/introduction-to-git-and-github-version-control-essentials` },
        { '@type': 'SiteNavigationElement', position: 7, name: 'Developer Roadmaps', url: `${BASE}/roadmaps` },
      ],
    },
  ],
};

// Favicons + fonts (was <link> block in index.html).
export const links = () => [
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/dev-el-logo-v2.png' },
  { rel: 'apple-touch-icon', href: '/favicon.png' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap',
  },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="application-name" content="Dev.EL" />
        <meta name="author" content="Dev.EL" />
        <meta name="theme-color" content="#7c3aed" />
        <Meta />
        <Links />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3983165432103513"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// Shown briefly while a non-prerendered route hydrates in SPA mode.
export function HydrateFallback() {
  return null;
}
