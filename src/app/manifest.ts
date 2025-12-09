import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Placeholder – Placeholder',
    short_name: 'Placeholder',
    description: 'Premium clothing for children, designed with comfort and style.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#a3856b',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
