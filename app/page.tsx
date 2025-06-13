// app/abstract-design/page.tsx
// "use client";

import { useEffect, useState } from "react";
import Products from "./products/page";
import { Metadata } from "next";
import ClientHomePage from "./ClientHomePage";

export const metadata: Metadata = {
  title: "Professional Power Tools Denton TX | Kelly Saw and Tool Since 1980",
  description:
    "Denton's premier tool store serving contractors and woodworkers with professional-grade power tools, saw blades, and expert sharpening services throughout the DFW area.",
  keywords:
    "power tools Denton, saw blades Denton TX, tool store Denton, woodworking tools, contractor supplies, tool sharpening Denton",
  openGraph: {
    title: "Professional Power Tools Denton TX | KellySaw and Tool",
    description:
      "Quality tools and expert service in Denton, Texas for over 50 years",
    url: "https://kellysaw.com",
    siteName: "Kelly Saw and Tool",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://kellysaw.com",
  },
};

export default function AbstractDesignPage() {
  return (
    <>
      <h1>
        Denton, Texas\' Premier Tool Store - Professional Power Tools Since 1966
      </h1>
      <ClientHomePage />
    </>
  );
}
