"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="z-30">
      <div className="max-w-7xl mx-auto flex space-x-4 justify-end text-sm md:text-xl font-bold">
        <Link
          href="/"
          className={`px-3 rounded ${
            pathname === "/"
              ? "bg-primary text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Products
        </Link>
        <Link
          href="/sharpening"
          className={`px-3  rounded ${
            pathname === "/sharpening/"
              ? "bg-primary text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Sharpening
        </Link>
        <Link
          href="/visit"
          className={`px-3  rounded ${
            pathname === "/visit/"
              ? "bg-primary text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Visit
        </Link>
      </div>
    </nav>
  );
}
