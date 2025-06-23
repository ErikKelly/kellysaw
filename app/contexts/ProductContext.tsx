"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Papa from "papaparse";
import { Product, ProductLookup } from "../types/product";

interface ProductContextType {
  data: Product[];
  dataLookup: ProductLookup;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

let cachedData: Product[] | null = null;
let cachedDataLookup: ProductLookup | null = null;

export function ProductProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Product[]>(cachedData || []);
  const [dataLookup, setDataLookup] = useState<ProductLookup>(
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

        const itemLookup: ProductLookup = {};
        const typedData = result.data as Product[];

        typedData.forEach((item) => {
          if (item["Item Number"]) {
            itemLookup[item["Item Number"]] = item;
          }
        });

        cachedData = result.data as Product[];
        cachedDataLookup = itemLookup;

        setData(result.data as Product[]);
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
