// app/components/Header.jsx or Header.tsx
'use client'

import { useState, useEffect } from 'react'

export default function Header({ siteName = "Kelly Saw", delay = 500 }) {
  const [isVisible, setIsVisible] = useState(false)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    // Set loaded to true after component mounts
    setLoaded(true)
  }, [])

  return (
<header className="absolute top-0 w-full left-0 bg-[#dcdbdb] shadow-md z-100 h-[50px] md:h-[60px] overflow-visible">

<div className={`absolute right-2 md:right-30 top-1/2 -translate-y-1/2 z-50 transition-opacity duration-4000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>

<p className="text-right">
          <a href="mailto:info@kellysaw.com" className="text-[#2E8B57] hover:text-red-800 underline text-sm md:text-base lg:text-lg font-merriweather font-black ">
            info@kellysaw.com
          </a>
        </p>
        <p className="text-right">
          <a href="tel:+19403877241" className="text-[#2E8B57] hover:text-red-800 underline text-sm md:text-base lg:text-lg font-merriweather font-black ">
            (940) 387-7241
          </a>

        </p>
      </div>

      <div
        className={`
      flex h-full relative
      transition-transform duration-[1.2s] ease-[cubic-bezier(0.34,1.56,0.64,1)]
      ${isVisible ? 'translate-x-0' : '-translate-x-full'}
    `}
      >




        <h1
          className="absolute top-[60%] md:top-[30%] left-18 md:left-50 text-[#2E8B57] text-3xl md:text-7xl font-merriweather font-black uppercase whitespace-nowrap"
          style={{ filter: 'drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7))' }}
        >
          {siteName}
        </h1>
      </div>
    </header>
  )
}