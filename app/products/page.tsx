"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import ProductPage from "./ProductPage";

export default function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCSV = async () => {
    try {
      const response = await fetch("/data/saw_product_list.csv");
      const csvText = await response.text();

      const result = Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
      });

      setData(result.data);
      console.log("CSV loaded:"); // Log the parsed data
      console.log("Number of rows:", result.data.length);
    } catch (error) {
      console.error("Error loading CSV:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCSV();
  }, []);

  if (loading) return <div>Loading Products...</div>;

  return (
    <main
      className={`relative z-10 flex min-h-screen flex-col items-center pt-32`}
    >
      <ProductPage data={data} />
    </main>
  );
}
