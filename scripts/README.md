# Sitemap Generator

This directory contains the **fallback** sitemap generation script for the Dev.eL website.

## ⚠️ Important Note

**In production, the sitemap is served directly from the backend** at `https://devora-backend.onrender.com/sitemap.xml`. This script is provided as a fallback for development or when the backend is unavailable.

## Overview

The `generate-sitemap.cjs` script generates a static sitemap.xml file that includes:

- **Static pages**: Homepage, Terms of Service, Privacy Policy
- **Dynamic course pages**: All available courses
- **Dynamic lesson pages**: Individual lessons within each course (when API is accessible)

## Production vs Development

### Production (Recommended)
- Sitemap served from backend: `https://devora-backend.onrender.com/sitemap.xml`
- Firebase redirects `/sitemap.xml` → backend
- Always up-to-date with database content
- Includes all courses and lessons in real-time
- No rebuild needed when content changes

### Development (This Script)
- Static sitemap generation on the frontend
- Useful for local development
- Fallback when backend is unavailable
- Requires manual regeneration

## How It Works

1. **Fetches course data** from the backend API (`https://devora-backend.onrender.com/api/courses`)
2. **Falls back to hardcoded data** if the API is unavailable
3. **Fetches lesson details** for each course to include individual lesson URLs
4. **Generates XML sitemap** with proper formatting and metadata
5. **Writes to** `/public/sitemap.xml`

## Usage

### Manual Generation (Development)

To generate a static sitemap for development:

```bash
npm run generate-sitemap
```

### Build with Static Sitemap

To build with a static sitemap (not recommended for production):

```bash
npm run build:with-sitemap
```

Standard build (uses backend sitemap via redirect):

```bash
npm run build
```

## Configuration

You can customize the script behavior by setting environment variables:

- `VITE_API_BASE_URL`: Override the default API URL (default: `https://devora-backend.onrender.com`)
- `SITEMAP_API_DELAY`: Delay in milliseconds between API calls for rate limiting (default: `500`)

Example:
```bash
VITE_API_BASE_URL=http://localhost:5000 npm run generate-sitemap
```

Or with custom delay:
```bash
SITEMAP_API_DELAY=1000 npm run generate-sitemap
```

## Fallback Courses

If the API is unavailable, the script uses hardcoded course data from `src/screens/HomeScreen/homeScreen.jsx` (STATIC_COURSES array):

- HTML
- CSS
- JavaScript
- Terminal / Command Line
- Git & GitHub
- Backend (Node.js / Express)

## Output Format

The generated sitemap follows the [Sitemap Protocol](https://www.sitemaps.org/protocol.html):

```xml
<url>
  <loc>https://www.dev-el.co/course/html/introduction-to-html</loc>
  <lastmod>2026-01-29</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```

### Priority Levels

- **1.0**: Homepage
- **0.9**: Course landing pages
- **0.8**: Individual lesson pages
- **0.5**: Static pages (Terms, Privacy Policy)

### Change Frequency

- **Weekly**: Homepage, course pages, lesson pages
- **Monthly**: Static pages

## Troubleshooting

### API Connection Issues

If you see warnings about API connectivity:

```
Could not fetch courses from API: getaddrinfo ENOTFOUND...
```

This is normal if:
- The backend API is down
- Network connectivity is limited
- DNS resolution fails

The script will automatically use fallback data and continue.

### Missing Lesson Pages

If lesson pages are not included in the sitemap:

```
ℹ Using course landing page only for html/introduction-to-html
```

This means the detailed course data couldn't be fetched from the API. The course landing page will still be included in the sitemap.

## Adding New Courses

When you add new courses through the admin panel:

1. They are stored in the backend database
2. On the next deployment, run `npm run build`
3. The script will fetch the new courses
4. The sitemap will be automatically updated

No manual changes to the script are required!

## Technical Details

- **Language**: CommonJS (Node.js)
- **Dependencies**: Built-in Node.js modules (`fs`, `path`, `https`)
- **Runtime**: Node.js 20+
- **Output**: `/public/sitemap.xml` (copied to `/dist/sitemap.xml` during build)

## Related Files

- `/public/sitemap.xml` - The generated sitemap file
- `/public/robots.txt` - References the sitemap
- `/SEARCH_CONSOLE_SETUP.md` - Documentation for Search Console integration
- `package.json` - Contains the `generate-sitemap` script

## More Information

For details on submitting your sitemap to Google Search Console, see [SEARCH_CONSOLE_SETUP.md](../SEARCH_CONSOLE_SETUP.md).
