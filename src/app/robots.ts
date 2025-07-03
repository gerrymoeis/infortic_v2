import { MetadataRoute } from 'next';

const BASE_URL = 'https://infortic.netlify.app'; // Replace with your actual domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example: disallow crawling of a private directory
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
