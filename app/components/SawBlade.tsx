'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
// import Header from '../components/Header'

export default function SpinningSaw() {
  const [rotation, setRotation] = useState<number>(0)
  const [spinSpeed, setSpinSpeed] = useState<number>(20) // Start with faster speed
  const sawRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  // Handle the animation loop
  useEffect(() => {
    const animate = () => {
      setRotation(prevRotation => {
        // If speed is negligible, stop the animation
        if (spinSpeed < 0.05) {
          return prevRotation;
        }
        return (prevRotation + spinSpeed) % 360;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    }

    // Start the animation
    animationRef.current = requestAnimationFrame(animate);

    // After 2 seconds, start slowing down
    const slowdownTimeout = setTimeout(() => {
      // Gradually slow down the blade
      const slowDownInterval = setInterval(() => {
        setSpinSpeed(prevSpeed => {
          const newSpeed = prevSpeed * 0.92; // Slow down by 8% each interval
          if (newSpeed < 0.05) {
            clearInterval(slowDownInterval);
            // Ensure complete stop
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
              animationRef.current = null;
            }
            return 0;
          }
          return newSpeed;
        });
      }, 100);
    }, 2000);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(slowdownTimeout);
    }
  }, [spinSpeed]);

  return (
    <>
<div className="relative">
<div className="relative z-[200]">
  <div 
    ref={sawRef}
    className="absolute top-0 left-0 w-full h-full flex justify-center items-center filter drop-shadow-lg will-change-transform origin-center"
    style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
  >
    <Image
      src="/saw_blade.png"
      alt="Spinning saw blade"
      width={300}
      height={300}
      className="scale-x-[-1] w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]"
      priority
    />
  </div>
</div>
</div>
    </>
  )
}