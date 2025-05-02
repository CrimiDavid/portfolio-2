import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: 'David Crimi, Software Engineer.',
    description: 'Portfolio and projects by David Crimi, a software engineer.',
    openGraph: {
        title: 'David Crimi: Software Engineer',
        description: 'Explore the portfolio, projects, and skills of David Crimi, a software engineer.',
        url: 'https://david-crimi.com',
        siteName: 'David Crimi',
        images: [
            {
                url: 'https://davidcrimi.com/og-image.jpg', // Replace with your actual image URL
                width: 1200,
                height: 630,
                alt: 'David Crimi portfolio preview image',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'David Crimi: Software Engineer',
        description: 'Explore the portfolio and development work of David Crimi.',
        images: ['https://davidcrimi.com/og-image.jpg'], // Replace with your actual image URL
    },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
