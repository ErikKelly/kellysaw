"use client";

import ProductPage from "./ProductPage";
import { useProductData } from "../contexts/ProductContext"; // Updated import

export default function Products() {
  const { data, dataLookup, loading } = useProductData();

  if (loading) return <div>Loading Products...</div>;

  return <ProductPage data={data} dataLookup={dataLookup} />;
}
