import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import NextTopLoader from 'nextjs-toploader';


const readexRegular = localFont({
  src: '../public/fonts/ReadexPro-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-readex-regular',
  display: 'swap',
});

const readexBold = localFont({
  src: '../public/fonts/ReadexPro-Bold.ttf',
  weight: '700',
  style: 'normal',
  variable: '--font-readex-bold',
  display: 'swap',
});

const readexMedium = localFont({
  src: '../public/fonts/ReadexPro-Medium.ttf',
  weight: '500',
  style: 'normal',
  variable: '--font-readex-medium',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Diyar-Dashboard',
  description: 'Diyar-Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${readexRegular.variable} ${readexBold.variable} ${readexMedium.variable} h-full antialiased`}
    >
      <body className="h-screen overflow-hidden flex flex-col bg-[#f4f3ef]">
        <NextTopLoader
          color="#00614E"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #00614E,0 0 5px #00614E"
        />
        {children}
      </body>
    </html>
  );
}

