import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

const BASE_URL = 'https://infortic.vercel.app'; // Replace with your actual domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  type TableName = 'lomba' | 'beasiswa' | 'magang';

  const fetchSitemapEntries = async (tableName: TableName) => {
    const { data, error } = await supabase.from(tableName).select('slug, created_at');
    if (error) {
      console.error(`Sitemap: Error fetching from ${tableName}:`, error.message);
      return [];
    }
    return data || [];
  };

  const [lombaEntries, beasiswaEntries, magangEntries] = await Promise.all([
    fetchSitemapEntries('lomba'),
    fetchSitemapEntries('beasiswa'),
    fetchSitemapEntries('magang'),
  ]);

  const createUrls = (entries: { slug: string; created_at: string }[], path: string) => {
    return entries.map(({ slug, created_at }) => ({
      url: `${BASE_URL}/${path}/${slug}`,
      lastModified: new Date(created_at).toISOString(),
    }));
  };

  const lombaUrls = createUrls(lombaEntries, 'lomba');
  const beasiswaUrls = createUrls(beasiswaEntries, 'beasiswa');
  const magangUrls = createUrls(magangEntries, 'magang');

  // Static routes
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/lomba`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/beasiswa`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/magang`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tentang-kami`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kontak`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  return [...staticUrls, ...lombaUrls, ...beasiswaUrls, ...magangUrls];
}
