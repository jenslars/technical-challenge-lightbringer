import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import BlogPage from "@/components/pages/BlogPage/BlogPage";
import { BlogDataProvider } from "@/hooks/useBlogData";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Taskly AI Blog",
  description: "A responsive blog explorer built with Next.js",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow bg-gray-50">
          <BlogDataProvider>
            <BlogPage />
          </BlogDataProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
