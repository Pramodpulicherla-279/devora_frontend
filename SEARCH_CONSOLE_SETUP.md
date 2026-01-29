# Google Search Console Setup Guide

This document provides instructions on how to verify and set up your website in Google Search Console to make it discoverable in search results.

## Prerequisites

- A deployed website at `https://www.dev-el.co/`
- A Google account
- Access to modify the website's HTML files

## Step 1: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click on "Add Property"

## Step 2: Choose Verification Method

Google offers several verification methods. We recommend using the **HTML tag method**:

### HTML Tag Verification (Recommended)

1. In Google Search Console, select "URL prefix" property type
2. Enter your website URL: `https://www.dev-el.co/`
3. Choose "HTML tag" as the verification method
4. Google will provide you with a meta tag like:
   ```html
   <meta name="google-site-verification" content="your-unique-verification-code" />
   ```

5. Add this meta tag to `/index.html` in the placeholder section:
   ```html
   <!-- Google Search Console Verification -->
   <meta name="google-site-verification" content="your-unique-verification-code" />
   ```

6. Rebuild and redeploy your website:
   ```bash
   npm run build
   firebase deploy
   ```

7. Return to Google Search Console and click "Verify"

### Alternative Verification Methods

- **HTML file upload**: Upload a verification file to your website's root directory
- **DNS record**: Add a TXT record to your domain's DNS settings
- **Google Analytics**: Use your existing Google Analytics tracking code
- **Google Tag Manager**: Use your existing Google Tag Manager container

## Step 3: Submit Your Sitemap

Once your site is verified:

1. In Google Search Console, go to "Sitemaps" in the left sidebar
2. Enter your sitemap URL: `https://www.dev-el.co/sitemap.xml`
3. Click "Submit"

Google will now start crawling and indexing your website.

## Step 4: Monitor Your Website

After verification, you can use Google Search Console to:

- **View search performance**: See which queries bring users to your site
- **Check indexing status**: Ensure all your pages are being indexed
- **Fix issues**: Identify and fix crawl errors, mobile usability issues, etc.
- **Test URLs**: Use the URL Inspection tool to see how Google views your pages
- **Request indexing**: Ask Google to recrawl specific URLs

## What's Already Configured

Your website already has the following SEO elements in place:

✅ **robots.txt**: Located at `/robots.txt` - Allows all search engines to crawl your site
✅ **sitemap.xml**: Located at `/sitemap.xml` - Lists all important pages on your site
✅ **manifest.json**: Located at `/manifest.json` - Progressive Web App manifest
✅ **SEO meta tags**: Title, description, keywords, author
✅ **Open Graph tags**: For social media sharing
✅ **Twitter Card tags**: For Twitter sharing
✅ **Structured data**: JSON-LD schema for educational organization
✅ **Canonical URL**: Prevents duplicate content issues
✅ **Mobile-friendly**: Responsive design with proper viewport settings
✅ **Theme color**: Consistent branding across browsers

## Sitemap Contents

The sitemap is dynamically generated and includes:

- **Static pages**: Homepage (`/`), Terms of Service (`/terms`), Privacy Policy (`/privacy-policy`)
- **Course pages**: All available courses (e.g., `/course/html/introduction-to-html`)
- **Lesson pages**: Individual lessons within each course (when API is accessible)

### Dynamic Sitemap Generation

The sitemap is automatically generated during the build process using `scripts/generate-sitemap.cjs`. This script:

1. Attempts to fetch all courses and lessons from the backend API
2. Falls back to hardcoded course data if the API is unavailable
3. Generates a complete sitemap with all discoverable URLs

### Regenerating the Sitemap

To manually regenerate the sitemap:

```bash
npm run generate-sitemap
```

This will:
- Fetch the latest courses and lessons from the API
- Update `/public/sitemap.xml` with all current URLs
- Include static pages, course pages, and lesson pages

**Note**: The sitemap is automatically regenerated every time you run `npm run build`.

### Adding New Content

When you add new courses or lessons through the admin panel:

1. They will be automatically included in the sitemap on the next build
2. Run `npm run build` to regenerate the sitemap and build
3. Deploy the updated build to make new pages discoverable

No manual sitemap editing is required!

## Best Practices

1. **Regular monitoring**: Check Search Console weekly for any issues
2. **Keep sitemap updated**: Add new pages to the sitemap as you create them
3. **Fix errors promptly**: Address any crawl errors or indexing issues quickly
4. **Create quality content**: Focus on valuable content for your users
5. **Mobile optimization**: Ensure your site works well on mobile devices (already configured)
6. **Page speed**: Monitor and improve loading times
7. **Secure connection**: Use HTTPS (already configured)

## Troubleshooting

### Site Not Appearing in Search Results

- **Wait time**: It can take 1-4 weeks for Google to index your site
- **Check indexing status**: Use the URL Inspection tool in Search Console
- **Request indexing**: Manually request indexing for important pages
- **Check robots.txt**: Ensure it's not blocking important pages

### Verification Failed

- **Clear browser cache**: Try in an incognito window
- **Check meta tag**: Ensure the verification tag is in the `<head>` section
- **Wait and retry**: Sometimes verification takes a few minutes

### Sitemap Not Processed

- **Check URL**: Ensure sitemap URL is correct
- **Validate XML**: Use an XML validator to check for errors
- **Check robots.txt**: Ensure sitemap URL is listed

## Additional Resources

- [Google Search Console Help](https://support.google.com/webmasters/)
- [SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Schema.org](https://schema.org/) - Structured data reference

## Support

If you encounter any issues with the setup, please:

1. Check the [Google Search Console Help Center](https://support.google.com/webmasters/)
2. Verify all files are correctly deployed
3. Use the URL Inspection tool to diagnose specific issues
4. Check the browser console for any JavaScript errors

---

**Last Updated**: January 29, 2026
