import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger
} from '@/components/ui/menubar';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Image from 'next/image';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'Anchery Design',
  description: 'Logo price calculation!'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100`}
      >
        <Menubar className="my-2">
          <Image
            height="54"
            width="150"
            alt="anchery design logo"
            src="/images/logo-with-name.svg"
          ></Image>
        </Menubar>
        {children}
      </body>
    </html>
  );
}
