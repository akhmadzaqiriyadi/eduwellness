import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'EduWellness - IoT Health Education & Real-Time Monitoring',
  description: 'Platform IoT memantau suhu tubuh MLX90614 & detak jantung MAX30102 real-time, plus edukasi kesehatan siswa Gen Z.',
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
