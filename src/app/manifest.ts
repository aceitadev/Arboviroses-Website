import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Arboviroses e Machine Learning',
    short_name: 'Arboviroses',
    description:
      'Projeto científico sobre Machine Learning e dados climáticos para antecipar o risco de arboviroses em Florianópolis.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F7FB',
    theme_color: '#F4F7FB',
    lang: 'pt-BR',
    categories: ['education', 'health', 'science'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
