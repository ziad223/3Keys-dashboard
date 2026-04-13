// layout.tsx - بدون تغيير كبير، فقط تعديل بسيط
import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import localFont from 'next/font/local';
import Sidebar from "@/components/sidebar";

const jannaRegular = localFont({
  src: '../../public/fonts/janna-reg.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-janna-regular',
  display: 'swap',
});

const jannaBold = localFont({
  src: '../../public/fonts/janna-bold.ttf',
  weight: '700',
  style: 'normal',
  variable: '--font-janna-bold',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '3Keys - dashboard',
  description: 'dashboard',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    // NotFound();
  }
  
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={` ${jannaRegular.variable} ${jannaBold.variable} h-full antialiased`}
    >
      <body className="h-screen overflow-hidden flex flex-col bg-[#000000] text-white">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <div className="hidden lg:block">
              <Sidebar isCollapsed={false} />
            </div>
            <main className="flex-1 overflow-y-auto w-full bg-[#000000] text-white">
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}