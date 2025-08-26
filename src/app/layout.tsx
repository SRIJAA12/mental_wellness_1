import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Mental Wellness Companion - AI-Powered Wellness Platform',
  description: 'Track emotions, discover patterns, and improve mental wellness with AI insights, wearable integration, and personalized support.',
  keywords: 'mental health, wellness, AI companion, mood tracking, emotional wellbeing, wearable integration',
  authors: [{ name: 'Mental Wellness Team' }],
  creator: 'Mental Wellness Companion',
  manifest: '/manifest.json',
  themeColor: '#667eea',
  viewport: { width: 'device-width', initialScale: 1 },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Mental Wellness Companion - AI-Powered Wellness Platform',
    description: 'Track emotions, discover patterns, and improve mental wellness with AI insights',
    siteName: 'Mental Wellness Companion',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-inter" suppressHydrationWarning={true}>
        <div id="root">{children}</div>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
