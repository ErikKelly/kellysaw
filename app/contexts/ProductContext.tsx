"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Papa from "papaparse";

interface ProductContextType {
  data: any[];
  dataLookup: Record<string, any>;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

let cachedData: any[] | null = null;
let cachedDataLookup: Record<string, any> | null = null;

export function ProductProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<any[]>(cachedData || []);
  const [dataLookup, setDataLookup] = useState<Record<string, any>>(
    cachedDataLookup || {}
  );
  const [loading, setLoading] = useState(!cachedData);

  useEffect(() => {
    if (cachedData) return;

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

        const itemLookup: Record<string, any> = {};
        result.data.forEach((item: any) => {
          if (item["Item Number"]) {
            itemLookup[item["Item Number"]] = item;
          }
        });

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

  return (
    <ProductContext.Provider value={{ data, dataLookup, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductData() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductData must be used within a ProductProvider");
  }
  return context;
}
