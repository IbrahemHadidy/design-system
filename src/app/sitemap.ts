import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/about-us',
    '/cancellation-policy',
    '/categories',
    '/contact-us',
    '/faqs',
    '/privacy-policy',
    '/refund-policy',
    '/terms-and-conditions',
  ];

  const locales: Locale[] = ['en', 'ar'];
  const now = new Date();

  return locales.flatMap((locale) =>
    staticPages.map((path) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1.0 : 0.8,
    }))
  );
}
