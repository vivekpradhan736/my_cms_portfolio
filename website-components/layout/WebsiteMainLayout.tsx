import React, { ReactNode, useContext  } from "react";
import Header from "@/website-components/Header";
import Footer from "@/website-components/Footer";
import ThemeContext from "@/app/context/ThemeContext";

interface LayoutProps {
  children: ReactNode;
  toggleTheme: () => void;
}

function WebsiteMainLayout({ children, toggleTheme }: LayoutProps) {
  const theme = useContext(ThemeContext);
  return (
    <>
    <div className={`${
            theme === 'darkMode' ? 'dark' : ''
        }`}>
      <Header toggleThemeClick={toggleTheme} />
      <main id="home" className="container pt-24 max-w-6xl website-bg-static z-10">
        {children}
      </main>
      <footer className="container max-w-6xl relative z-40">
        <Footer />
      </footer>
      </div>
    </>
  );
}

export default WebsiteMainLayout;