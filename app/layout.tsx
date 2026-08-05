import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://eduwellness.vercel.app'),
  title: 'EduWellness: Web IoT Sensor Suhu & Detak Jantung Siswa',
  description: 'EduWellness: Pengembangan Aplikasi Web Berbasis IoT Terintegrasi Sensor Suhu dan Detak Jantung untuk Menumbuhkan Literasi Kesehatan serta Kebiasaan Hidup Sehat bagi Siswa.',
  keywords: [
    'EduWellness',
    'Aplikasi Web IoT',
    'Sensor Suhu',
    'Sensor Detak Jantung',
    'Literasi Kesehatan Siswa',
    'Kebiasaan Hidup Sehat',
    'MLX90614',
    'MAX30102',
    'IoT Health Education',
  ],
  authors: [{ name: 'EduWellness Team' }],
  openGraph: {
    title: 'EduWellness: Aplikasi Web IoT Sensor Suhu & Detak Jantung Siswa',
    description: 'Pengembangan Aplikasi Web Berbasis IoT Terintegrasi Sensor Suhu dan Detak Jantung untuk Menumbuhkan Literasi Kesehatan serta Kebiasaan Hidup Sehat bagi Siswa.',
    siteName: 'EduWellness',
    images: ['/logoeduwellnesss.png'],
    locale: 'id_ID',
    type: 'website',
  },
  icons: {
    icon: '/logoeduwellnesss.png',
    shortcut: '/logoeduwellnesss.png',
    apple: '/logoeduwellnesss.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased flex flex-col min-h-screen text-slate-100">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
