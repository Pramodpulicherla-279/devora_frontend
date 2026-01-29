# Sitemap Architecture

## Overview

The Dev.eL website uses a **backend-generated dynamic sitemap** for optimal SEO and real-time content updates.

## Architecture

```
┌─────────────────┐
│  Search Engine  │
│   (Googlebot)   │
└────────┬────────┘
         │ GET /sitemap.xml
         ↓
┌─────────────────┐
│  Firebase CDN   │
│   (Frontend)    │
└────────┬────────┘
         │ 301 Redirect
         ↓
┌─────────────────┐
│  Backend API    │
│ /sitemap.xml    │
└────────┬────────┘
         │ Query Database
         ↓
┌─────────────────┐
│   MongoDB       │
│ - Courses       │
│ - Parts         │
│ - Lessons       │
└─────────────────┘
```

## How It Works

### Production Flow

1. **User/Search Engine** requests `https://www.dev-el.co/sitemap.xml`
2. **Firebase** redirects (301) to `https://devora-backend.onrender.com/sitemap.xml`
3. **Backend API** queries MongoDB for:
   - All courses with slugs
   - All lessons with course relationships
   - Updated timestamps for lastmod dates
4. **Backend** generates XML sitemap dynamically
5. **Response** sent to client with complete, up-to-date sitemap

### Development Flow (Fallback)

1. **Developer** runs `npm run generate-sitemap`
2. **Script** attempts to fetch data from backend API
3. **Fallback** to hardcoded course data if API unavailable
4. **Static sitemap** generated in `/public/sitemap.xml`

## Files

### Backend
- `routes/sitemap.js` - Dynamic sitemap generation endpoint
- Queries: Courses, Parts, Lessons with population

### Frontend
- `firebase.json` - Redirect configuration (301 to backend)
- `scripts/generate-sitemap.cjs` - Fallback static generator
- `public/sitemap.xml` - Static fallback (for development)

## Benefits of Backend Generation

✅ **Real-time updates**: New courses/lessons immediately in sitemap
✅ **Accurate dates**: Uses actual database `updatedAt` timestamps
✅ **No rebuilds**: Content changes reflected without frontend deployment
✅ **Complete data**: Direct database access ensures all content included
✅ **Reduced build time**: No API calls during frontend build

## URL Structure

### Static Pages
- `https://www.dev-el.co/` (priority: 1.0)
- `https://www.dev-el.co/terms` (priority: 0.6)
- `https://www.dev-el.co/privacy` (priority: 0.4)

### Dynamic Course Pages
- `https://www.dev-el.co/course/{courseSlug}` (priority: 0.8)
- Example: `https://www.dev-el.co/course/html/introduction-to-html`

### Dynamic Lesson Pages
- `https://www.dev-el.co/course/{courseSlug}/{lessonSlug}` (priority: 0.7)
- Example: `https://www.dev-el.co/course/html/html-basics`

## Change Frequency

- **Homepage**: daily
- **Course pages**: weekly
- **Lesson pages**: weekly
- **Static pages**: monthly to yearly

## Configuration

### Firebase (firebase.json)
```json
{
  "redirects": [
    {
      "source": "/sitemap.xml",
      "destination": "https://devora-backend.onrender.com/sitemap.xml",
      "type": 301
    }
  ]
}
```

### Backend Environment
```javascript
const baseUrl = process.env.FRONTEND_URL || "https://dev-el.co";
```

## Maintenance

### Adding New Content
1. Create course/lesson in admin panel
2. Content saved to MongoDB
3. Sitemap **automatically updated** on next request
4. No deployment needed

### Updating URLs
If you change URL structure:
1. Update backend sitemap generation logic
2. Update frontend route configuration
3. Deploy both backend and frontend

### Monitoring
- Check sitemap in Search Console
- Verify all pages are indexed
- Monitor crawl errors
- Review sitemap access logs

## Troubleshooting

### Sitemap Not Loading
1. Check backend is running: `curl https://devora-backend.onrender.com/sitemap.xml`
2. Verify Firebase redirect in hosting console
3. Check for DNS/SSL issues

### Missing Pages
1. Verify courses/lessons have proper slugs in database
2. Check course → part → lesson relationships
3. Review backend sitemap query logic

### Development Testing
```bash
# Generate static sitemap for local testing
npm run generate-sitemap

# Build with static sitemap
npm run build:with-sitemap

# Standard build (uses backend redirect)
npm run build
```

## Migration Notes

**Previous Approach**: Static sitemap generated during frontend build
**Current Approach**: Dynamic sitemap from backend with 301 redirect
**Benefit**: Real-time updates without frontend deployments

## Related Documentation

- `SEARCH_CONSOLE_SETUP.md` - Google Search Console setup
- `scripts/README.md` - Fallback generator documentation
- Backend: `routes/sitemap.js` - Implementation details
