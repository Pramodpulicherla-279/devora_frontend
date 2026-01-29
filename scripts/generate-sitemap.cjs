#!/usr/bin/env node

/**
 * Sitemap Generator for Dev.eL
 * 
 * This script generates a comprehensive sitemap.xml file including:
 * - Static pages (homepage, terms, privacy policy)
 * - Dynamic course pages
 * - Dynamic lesson pages
 * 
 * The script will attempt to fetch courses from the backend API.
 * If the API is unavailable, it falls back to hardcoded course data.
 * 
 * Usage: node scripts/generate-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://devora-backend.onrender.com';
const SITE_URL = 'https://www.dev-el.co';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');
const API_DELAY_MS = parseInt(process.env.SITEMAP_API_DELAY || '500', 10); // Delay between API calls

// Static routes that don't change
const STATIC_ROUTES = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    loc: '/terms',
    changefreq: 'monthly',
    priority: '0.5',
  },
  {
    loc: '/privacy-policy',
    changefreq: 'monthly',
    priority: '0.5',
  },
];

// Fallback courses (from homeScreen.jsx STATIC_COURSES)
const FALLBACK_COURSES = [
  {
    slug: 'html/introduction-to-html',
    title: 'HTML',
  },
  {
    slug: 'css/css-get-started',
    title: 'CSS',
  },
  {
    slug: 'javascript/variables-data-types',
    title: 'JavaScript',
  },
  {
    slug: 'terminal-command-line/terminal-basics-for-developers',
    title: 'Terminal / Command Line',
  },
  {
    slug: 'git-and-github/introduction-to-git-and-github-version-control-essentials',
    title: 'Git & Github',
  },
  {
    slug: 'backend-nodejs-express/introduction-to-nodejs-and-node-repl',
    title: 'Backend (Node.js / Express)',
  },
];

/**
 * Make an HTTPS request
 */
function httpsRequest(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse JSON response'));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Fetch all courses from the backend API
 */
async function fetchCourses() {
  try {
    console.log(`Fetching courses from ${API_BASE_URL}/api/courses...`);
    const result = await httpsRequest(`${API_BASE_URL}/api/courses`, 15000);
    
    if (result.success && Array.isArray(result.data)) {
      console.log(`✓ Successfully fetched ${result.data.length} courses from API`);
      return result.data;
    } else {
      console.warn('API response was not in expected format');
      return null;
    }
  } catch (error) {
    console.warn(`Could not fetch courses from API: ${error.message}`);
    return null;
  }
}

/**
 * Fetch detailed course information including lessons
 */
async function fetchCourseDetails(courseSlug) {
  try {
    console.log(`  Fetching details for course: ${courseSlug}`);
    const result = await httpsRequest(`${API_BASE_URL}/api/courses/${courseSlug}`, 15000);
    
    if (result.success && result.data) {
      return result.data;
    } else {
      console.warn(`  Could not fetch details for course: ${courseSlug}`);
      console.warn(`  → Check that the course slug is correct and the API is responding`);
      return null;
    }
  } catch (error) {
    console.warn(`  Error fetching course ${courseSlug}: ${error.message}`);
    console.warn(`  → Verify API connectivity at ${API_BASE_URL}/api/courses/${courseSlug}`);
    return null;
  }
}

/**
 * Extract all lesson URLs from a course
 */
function extractLessonUrls(course) {
  const urls = [];
  
  if (!course || !course.parts || !Array.isArray(course.parts)) {
    return urls;
  }
  
  course.parts.forEach(part => {
    if (part.lessons && Array.isArray(part.lessons)) {
      part.lessons.forEach(lesson => {
        if (lesson.slug && course.slug) {
          urls.push({
            loc: `/course/${course.slug}/${lesson.slug}`,
            changefreq: 'weekly',
            priority: '0.8',
          });
        }
      });
    }
  });
  
  console.log(`  ✓ Found ${urls.length} lessons in course ${course.slug}`);
  return urls;
}

/**
 * Escape XML special characters
 */
function escapeXML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate XML sitemap content
 */
function generateSitemapXML(urls) {
  const lastmod = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';
  xml += '  \n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXML(SITE_URL)}${escapeXML(url.loc)}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${escapeXML(url.changefreq)}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
    xml += '  \n';
  });
  
  xml += '</urlset>\n';
  
  return xml;
}

/**
 * Main function to generate the sitemap
 */
async function generateSitemap() {
  console.log('\n=== Dev.eL Sitemap Generator ===\n');
  
  // Start with static routes
  const allUrls = [...STATIC_ROUTES];
  console.log(`Added ${STATIC_ROUTES.length} static routes`);
  
  // Try to fetch courses from API
  let courses = await fetchCourses();
  
  // Fall back to hardcoded courses if API fails
  if (!courses || courses.length === 0) {
    console.log('\n⚠ Using fallback course data');
    courses = FALLBACK_COURSES;
  }
  
  console.log(`\nProcessing ${courses.length} courses...\n`);
  
  // Process each course
  for (const course of courses) {
    if (!course.slug) {
      console.warn(`  Skipping course without slug: ${course.title || 'Unknown'}`);
      continue;
    }
    
    // Add course landing page
    allUrls.push({
      loc: `/course/${course.slug}`,
      changefreq: 'weekly',
      priority: '0.9',
    });
    
    // Try to fetch course details to get lessons
    const courseDetails = await fetchCourseDetails(course.slug);
    
    if (courseDetails) {
      // Extract and add all lesson URLs
      const lessonUrls = extractLessonUrls(courseDetails);
      allUrls.push(...lessonUrls);
    } else {
      // If we can't fetch details, just add the course page
      console.log(`  ℹ Using course landing page only for ${course.slug}`);
    }
    
    // Rate limiting delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, API_DELAY_MS));
  }
  
  // Generate XML
  console.log(`\nGenerating sitemap with ${allUrls.length} total URLs...`);
  const sitemapXML = generateSitemapXML(allUrls);
  
  // Write to file
  fs.writeFileSync(OUTPUT_PATH, sitemapXML, 'utf8');
  console.log(`✓ Sitemap successfully written to ${OUTPUT_PATH}`);
  
  // Summary
  console.log('\n=== Sitemap Generation Complete ===');
  console.log(`Total URLs: ${allUrls.length}`);
  console.log(`  - Static pages: ${STATIC_ROUTES.length}`);
  console.log(`  - Course pages: ${courses.length}`);
  console.log(`  - Lesson pages: ${allUrls.length - STATIC_ROUTES.length - courses.length}`);
  console.log('\n');
}

// Run the script
if (require.main === module) {
  generateSitemap().catch(error => {
    console.error('\n❌ Error generating sitemap:', error);
    process.exit(1);
  });
}

module.exports = { generateSitemap };
