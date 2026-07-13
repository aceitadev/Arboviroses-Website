import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const siteUrl = 'https://arboviroses-ml.vercel.app';
const title = 'Arboviroses e Machine Learning | EEB Jacó Anderle';
const description =
  'Projeto científico sobre o uso de Machine Learning e dados climáticos para antecipar períodos de maior risco de arboviroses em Florianópolis.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Arboviroses e Machine Learning',
  },
  description,
  applicationName: 'Arboviroses e Machine Learning',
  authors: [{ name: 'Turma 208 — EEB Jacó Anderle' }],
  keywords: [
    'arboviroses',
    'dengue',
    'zika',
    'chikungunya',
    'machine learning',
    'Florianópolis',
    'saúde pública',
    'previsão',
    'séries temporais',
    'EEB Jacó Anderle',
  ],
  category: 'education',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteUrl,
    siteName: 'Arboviroses e Machine Learning',
    title,
    description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Arboviroses e Machine Learning' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#F4F7FB',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        {/* Aprimoramento progressivo: marca que o JS está ativo (habilita reveals). */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }}
        />
        {children}
      </body>
    </html>
  );
}
