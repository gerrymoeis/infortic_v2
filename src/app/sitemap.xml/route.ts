import { getCompetitions, getInternships } from '@/lib/supabase';

const URL = 'https://your-domain.com'; // IMPORTANT: Replace with your actual domain

function generateSitemap(competitions: any[], internships: any[], staticPages: string[]) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  staticPages.forEach(page => {
    xml += `
      <url>
        <loc>${URL}${page}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
  });

  // Add competition pages
  competitions.forEach(competition => {
    xml += `
      <url>
        <loc>${URL}/lomba/${competition.id}</loc>
        <lastmod>${new Date(competition.created_at).toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>`;
  });

  // Add internship pages (pointing to their source for SEO value)
  internships.forEach(internship => {
    xml += `
      <url>
        <loc>${internship.source_url}</loc>
        <lastmod>${new Date(internship.created_at).toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
      </url>`;
  });

  xml += `
</urlset>`;
  return xml;
}

export async function GET() {
  try {
    const [competitions, internships] = await Promise.all([
      getCompetitions({}), // Fetch all competitions
      getInternships({})  // Fetch all internships
    ]);

    const staticPages = ['/', '/lomba', '/magang'];
    
    const body = generateSitemap(competitions, internships, staticPages);

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
