"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import ProductPage from "./ProductPage";

export default function Products() {
  const [data, setData] = useState([]);
  const [dataLookup, setDataLookup] = useState({}); // Add this
  const [loading, setLoading] = useState(true);

  const loadCSV = async () => {
    try {
      const response = await fetch("/data/product_list.csv");
      const csvText = await response.text();

      const result = Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
      });

      setData(result.data);

      const itemLookup = {};
      result.data.forEach((item) => {
        if (item["Item Number"]) {
          // Replace with your actual column name
          itemLookup[item["Item Number"]] = item;
        }
      });
      setDataLookup(itemLookup);

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

  return <ProductPage data={data} dataLookup={dataLookup} />;
}
