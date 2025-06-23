"use client";

import { useEffect, useState } from "react";
import Products from "./products/page";

export default function ClientHomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative  w-full overflow-hidden">
      {/* Abstract Background */}
      <div className="fixed inset-0 -z-10">
        {/* Large Blocks */}
        {/* Large Blocks */}
        <div className="absolute top-0 left-0 h-1/3 w-1/2 bg-slate-200 opacity-70"></div>
        <div className="absolute top-1/3 left-0 h-1/4 w-1/4 bg-gray-300 opacity-50"></div>
        <div className="absolute top-0 right-0 h-1/2 w-1/4 bg-zinc-200 opacity-60"></div>
        <div className="absolute bottom-0 right-0 h-1/3 w-1/3 bg-slate-100 opacity-80"></div>
        <div className="absolute bottom-0 left-0 h-1/3 w-1/3 bg-neutral-200 opacity-40"></div>

        {/* Medium Blocks */}
        <div className="absolute top-1/4 left-1/4 h-1/4 w-1/6 bg-zinc-300 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 h-1/5 w-1/5 bg-gray-400 opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 h-1/6 w-1/6 bg-slate-300 opacity-50"></div>
        <div className="absolute top-2/3 left-1/6 h-1/6 w-1/4 bg-zinc-100 opacity-60"></div>

        {/* Small Accent Blocks */}
        <div className="absolute top-1/3 right-1/4 h-[120px] w-[120px] bg-slate-400 opacity-40"></div>
        <div className="absolute bottom-1/2 left-1/3 h-[150px] w-[100px] bg-zinc-500 opacity-20"></div>
        <div className="absolute top-2/3 right-1/2 h-[80px] w-[200px] bg-gray-300 opacity-30"></div>
        <div className="absolute top-[15%] left-[40%] h-[90px] w-[90px] bg-neutral-300 opacity-40"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-stretch  transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Products />
      </div>
    </div>
  );
}
