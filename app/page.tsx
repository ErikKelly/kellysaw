// app/abstract-design/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import Products from "./products/page";
import { Metadata } from "next";
import { defaultMetadata } from "./lib/metadata";

import ClientHomePage from "./ClientHomePage";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Kelly Saw and Tool",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Kelly Saw and Tool",
  },
};

export default function AbstractDesignPage() {
  return (
    <>
      <ClientHomePage />
    </>
  );
}
