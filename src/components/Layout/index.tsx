import React from "react";

import SEO, { SEOProps } from "./SEO";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cookie from "./Cookie";

interface LayoutProps extends SEOProps {
  children: React.ReactNode;
  lang?: string;
};

export default function Layout({ children, lang, ...props }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-800 dark:text-gray-300">
      <SEO {...props} />
      <Navbar />
      <main className="container mx-auto mb-4 px-4 flex-grow" lang={lang}>
        {children}
      </main>
      <Cookie />
      <Footer />
    </div>
  );
}
