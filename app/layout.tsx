// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import { Toaster } from 'sonner';
// import { ThemeProvider } from '@/components/theme-provider';
// import { RouteGuard } from '@/components/RouteGuard';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Dental AI',
//   description: 'AI-powered dental assistant',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <RouteGuard>
//             {children}
//           </RouteGuard>
//           <Toaster position="top-center" />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

// 'use client';

// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import { Toaster } from 'sonner';
// import { ThemeProvider } from '@/components/theme-provider';
// import { RouteGuard } from '@/components/RouteGuard';
// import { useEffect } from 'react';
// import { startTokenWatcher } from '../lib/auth'; // ✅ Correct relative import

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Dental AI',
//   description: 'AI-powered dental assistant',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   useEffect(() => {
//     startTokenWatcher(); // ✅ Start auto-logout watcher
//   }, []);

//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <RouteGuard>
//             {children}
//           </RouteGuard>
//           <Toaster position="top-center" />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { RouteGuard } from '@/components/RouteGuard';
import { TokenWatcher } from '@/components/TokenWatcher'; // ✅ import it

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dental AI',
  description: 'AI-powered dental assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RouteGuard>
            <TokenWatcher /> {/* ✅ start the auto-logout timer here */}
            {children}
          </RouteGuard>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}


