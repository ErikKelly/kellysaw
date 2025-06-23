// app/abstract-design/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function AbstractDesignPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
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
        className={`relative z-10 flex flex-col items-center px-4 transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-full max-w-4xl rounded-xl bg-white p-8 backdrop-blur-sm">
          <h2 className="mb-3 text-md md:text-3xl font-semibold text-center text-primary">
            1700 Shady Oaks Drive, Suite 118
          </h2>

          <div className="mb-8 text-lg text-gray-700 h-[450px] ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6676.970448035038!2d-97.11756752401492!3d33.20137327348925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864dcae8751cc7af%3A0x718f3895e6ae21e7!2sKelly%20Saw!5e0!3m2!1sen!2sus!4v1743634652299!5m2!1sen!2sus"
              className="w-full h-full border-0"
              width="600"
              height="450"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="grid grid-cols-1">
            <div className="rounded-lg bg-slate-100 p-6 shadow-sm">
              <h2 className="mb-3 text-xl font-semibold text-emerald-700">
                Find Us
              </h2>

              <p className="text-gray-600 pb-5">
                We&apos;re located in Denton, Texas, just a short drive from
                major highways for easy access.
              </p>
              <ul className="text-gray-600 list-disc pl-5">
                <li>
                  If you&apos;re coming from Dallas or Fort Worth, take I-35E
                  North and exit onto Loop 288. From there, it&apos;s a quick
                  drive west to Shady Oaks Drive.
                </li>
                <li>
                  From Denton and the surrounding area, you can take Loop 288 or
                  University Drive (US-380) and head toward Shady Oaks Drive.
                </li>
                <li>
                  If you&apos;re traveling via I-35W, merge onto I-35E North
                  near Denton, then follow the same Loop 288 exit.
                </li>
              </ul>
              <p className="text-gray-600 pt-5">
                Look for us just off Shady Oaks Drive, close to the heart of
                Denton!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
