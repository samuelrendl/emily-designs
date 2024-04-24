"use client";

import Link from "next/link";
import { useState } from "react";

const Footer: React.FC = () => {
  const [currentYear] = useState<number>(new Date().getFullYear());
  return (
    <footer className="relative border border-solid border-l-neutral-50 py-5 mt-auto">
      <div className="flex justify-center items-center">
        <small>&copy; {currentYear} Emily Kontu. All rights reserved.</small>
      </div>
      <small className="absolute bottom-0 right-0 mr-3 text-slate-950/50">
        Made by{" "}
        <Link
          href={"https://www.samuelrendl.com"}
          target="_blank"
          className="underline"
        >
          Samuel Rendl
        </Link>
      </small>
    </footer>
  );
};

export default Footer;
