"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { navLinks } from "../../constants/navLinks";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className="w-full bg-white sticky z-50 top-0 shadow-md shadow-black/5">
      <nav className="flex justify-between items-center max-w-[1810px] mx-auto p-2 font-playfair">
        <Link href="/">
          <p className="font-bold text-3xl max-sm:text-2xl ">Emily Kontu</p>
        </Link>
        <div className="flex items-center gap-6 text-2xl max-sm:hidden">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="underline hover:no-underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden max-sm:block mr-2">
          <CiMenuBurger className="text-xl" onClick={toggleMenu} />
        </div>
        {isMenuOpen && (
          <div className="fixed flex flex-col justify-center items-center gap-20 w-screen h-screen top-0 left-0 bg-slate-50">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="underline hover:no-underline text-5xl  p-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="hidden max-sm:block absolute right-4 top-4">
              <IoCloseOutline
                className="text-3xl w-10 h-10"
                onClick={toggleMenu}
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
