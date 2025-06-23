import { useState, useEffect } from "react";
import Papa from "papaparse";

let cachedData = null;
let cachedDataLookup = null;

export function useProductData() {
  const [data, setData] = useState(cachedData || []);
  const [dataLookup, setDataLookup] = useState(cachedDataLookup || {});
  const [loading, setLoading] = useState(!cachedData);

  useEffect(() => {
    if (cachedData) return; // Already loaded

    const loadCSV = async () => {
      try {
        const response = await fetch("/data/product-data-20250620.csv");
        const csvText = await response.text();

        const result = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
        });

        const itemLookup = {};
        result.data.forEach((item) => {
          if (item["Item Number"]) {
            itemLookup[item["Item Number"]] = item;
          }
        });

        // Cache the data
        cachedData = result.data;
        cachedDataLookup = itemLookup;

        setData(result.data);
        setDataLookup(itemLookup);
      } catch (error) {
        console.error("Error loading CSV:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCSV();
  }, []);

  return { data, dataLookup, loading };
}
