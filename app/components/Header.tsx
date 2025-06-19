// app/components/Header.jsx or Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "./Navigation";

export default function Header({ siteName = "Kelly Saw", delay = 500 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    // Set loaded to true after component mounts
    setLoaded(true);
  }, []);

  return (
    <header className="fixed top-0 w-full left-0 bg-black shadow-md z-20 h-[50px] md:h-[60px] overflow-visible">
      <div
        className={`absolute right-2 md:right-10 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-4000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navigation />
      </div>

      <div
        className={`
      flex h-full relative
      transition-transform duration-[1.2s] ease-[cubic-bezier(0.34,1.56,0.64,1)]
      ${isVisible ? "translate-x-0" : "-translate-x-full"}
    `}
      >
        <h1 className="absolute  left-18 md:left-50 text-primary text-3xl md:text-7xl font-racing uppercase whitespace-nowrap">
          <Link href="/">{siteName}</Link>
        </h1>
      </div>
      <div style={{ paddingLeft: "100px" }}>
        <div className="font-racing text-xl  pl-[80px] mt-[10px] md:pl-[100px] lg:pl-[80px]">
          Family owned since 19??
        </div>
        <div className="flex gap-4 absolute right-0 border-l-2 border-b-2 px-4 py-1 rounded-bl-2xl top-[60px]">
          <div className="">
            <a
              href="mailto:info@kellysaw.com"
              className="text-black hover:text-red-800 underline text-sm md:text-base lg:text-lg"
            >
              info@kellysaw.com
            </a>
          </div>
          <div className="">
            <a
              href="tel:+19403877241"
              className="text-kelly-green hover:text-red-800 underline text-sm md:text-base lg:text-lg"
            >
              (940) 387-7241
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
