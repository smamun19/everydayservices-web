import { Metadata } from 'next';
import { Inter, Work_Sans } from 'next/font/google';

import { Provider } from '@/components/ui/provider';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/templates/footer';
import Navigation from '@/templates/navigation';

export const metadata: Metadata = {
  title: 'Everyday Services',
  description: 'Home Services Application',
};

const work = Work_Sans({
  variable: '--font-work-sans',
  weight: ['700'],
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${work.variable} ${inter.variable}`}>
      <body>
        <Provider>
          <Navigation />
          {children}
          <Footer />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
