import React from "react";

import SEO, { SEOProps } from "./SEO";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cookie from "./Cookie";

import { root } from "./index.module.css";

interface LayoutProps extends SEOProps {
  children: React.ReactNode;
  lang?: string;
}

export default function Layout({ children, lang, ...props }: LayoutProps) {
  return (
    <div className={root}>
      <SEO {...props} />
      <Navbar />
      <main lang={lang}>{children}</main>
      <Cookie />
      <Footer />
    </div>
  );
}
