"use client";

import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Logo from "@/public/images/vivek_logo.png";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { config } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeContext from "@/app/context/ThemeContext";

// Destructure the prop `toggleThemeClick` here
function Header({ toggleThemeClick }: { toggleThemeClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const theme = useContext(ThemeContext);

  const glassmorphismClass = "bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg";

  const onPageScroll = () => {
    const navHeight = 82;
    if (window.scrollY > navHeight) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", onPageScroll);
    return () => {
      document.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-50 delay-75 transition-all ${
        scrolled ? `${glassmorphismClass} shadow-sm` : glassmorphismClass
      }`}
    >
      <div className="dark:bg-[#1a202c] py-2">
      <div className="container max-w-6xl flex justify-between items-center">
        <Link href="/">
          <Image
            src={Logo || "/placeholder.svg"}
            priority={true}
            alt="Logo"
            style={{
              width: "120px",
            }}
          />
        </Link>
        <div className="hidden md:block">
          <div className="flex gap-4 items-center">
            {config.header.leftMenu.map((menu, index) => (
              <Link
                href={menu.id}
                className="text-slate-500 dark:text-slate-100 hover:text-slate-950 hover:dark:text-primaryColor cursor-pointer"
                key={index.toString()}
              >
                {menu.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:flex md:items-center md:gap-2">
          {config.header.rightMenu.map((menu, index) => (
            <Link
              href="/images/resume.pdf"
              className=" border border-primaryColor py-2 px-4 text-primaryColor hover:bg-primaryColor transition-all delay-75 hover:text-white rounded-sm cursor-pointer"
              key={index.toString()}
            >
              {menu.name}
            </Link>
          ))}
        <StyledWrapper>
            <label htmlFor="switch" className="switch">
              <input
                id="switch"
                type="checkbox"
                checked={theme === "darkMode"}
                onChange={toggleThemeClick}
              />
              <span className="slider" />
              <span className="decoration" />
            </label>
          </StyledWrapper>
        </div>
        <div className="md:hidden ">
          <Sheet modal key={212}>
            <SheetTrigger asChild>
              <HamburgerMenuIcon
                className="text-slate-400 "
                width={24}
                height={24}
              />
            </SheetTrigger>
            <SheetContent>
              <SheetDescription>
                <div className="flex flex-col gap-4 items-center mt-4">
                  {config.header.leftMenu.map((menu, index) => (
                    <Link
                      href={menu.id}
                      className="text-lg text-slate-400 hover:text-slate-950 cursor-pointer"
                      key={index.toString()}
                    >
                      <SheetClose>{menu.name}</SheetClose>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-4 items-center mt-6">
                  {config.header.rightMenu.map((menu, index) => (
                    <Link
                      href="/images/resume.pdf"
                      className="text-lg border border-primaryColor py-2 px-5 hover:bg-primaryColor transition-all delay-75 hover:text-white rounded-sm cursor-pointer"
                      key={index.toString()}
                    >
                      {menu.name}
                    </Link>
                  ))}
                </div>
              </SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      </div>
    </header>
  );
}

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
  cursor: pointer;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  --background: #2c353f;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background);
  transition: 0.5s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.4em;
  width: 1.4em;
  border-radius: 50%;
  left: 10%;
  bottom: 15%;
  box-shadow: inset 8px -4px 0px 0px #ececd9, -4px 1px 4px 0px #dadada;
  background: var(--background);
  transition: 0.5s;
}

.decoration {
  position: absolute;
  content: "";
  height: 2px;
  width: 2px;
  border-radius: 50%;
  right: 20%;
  top: 15%;
  background: #e5f041e6;
  backdrop-filter: blur(10px);
  transition: all 0.5s;
  box-shadow: -7px 10px 0 #e5f041e6, 8px 15px 0 #e5f041e6, -17px 1px 0 #e5f041e6,
    -20px 10px 0 #e5f041e6, -7px 23px 0 #e5f041e6, -15px 25px 0 #e5f041e6;
}

input:checked ~ .decoration {
  transform: translateX(-20px);
  width: 10px;
  height: 10px;
  background: white;
  box-shadow: -12px 0 0 white, -6px 0 0 1.6px white, 5px 15px 0 1px white,
    1px 17px 0 white, 10px 17px 0 white;
}

input:checked + .slider {
  background-color: #5494de;
}

input:checked + .slider:before {
  transform: translateX(100%);
  box-shadow: inset 15px -4px 0px 15px #efdf2b, 0 0 10px 0px #efdf2b;
}

`;

export default Header;

