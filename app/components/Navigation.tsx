"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="z-30">
      <div className="max-w-7xl mx-auto flex space-x-4 justify-end text-xl">
        <Link
          href="/"
          className={`px-3 rounded ${
            pathname === "/"
              ? "bg-kelly-green text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Home
        </Link>
        <Link
          href="/visit"
          className={`px-3  rounded ${
            pathname === "/visit"
              ? "bg-kelly-green text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Visit
        </Link>
      </div>
    </nav>
  );
}
