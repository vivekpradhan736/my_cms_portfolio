import React, { ReactNode } from "react";
import Header from "@/website-components/Header";
import Footer from "@/website-components/Footer";

function WebsiteMainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="home" className="container pt-24 max-w-6xl website-bg-static z-10">
        {children}
      </main>
      <footer className="container max-w-6xl relative z-40">
        <Footer />
      </footer>
    </>
  );
}

export default WebsiteMainLayout;