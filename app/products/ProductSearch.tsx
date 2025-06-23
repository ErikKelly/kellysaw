import { useState, useEffect } from "react";
import { Product } from "../types/product";

interface ProductSearchProps {
  data: Product[];
  onSearchResults: (results: Product[]) => void;
  onClear: () => void;
  isActive: boolean;
  // Add any other props you have
}

export default function ProductSearch({
  data,
  onSearchResults,
  onClear,
}: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search - only runs after user stops typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim().length < 3) {
        if (searchTerm.trim().length === 0) return;
        onSearchResults(data);
      } else {
        const filtered = data.filter(
          (item) =>
            item["Product Title"]
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
          //  ||            item["Brand"]?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        onSearchResults(filtered);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timeoutId); // Clear timeout on new keystroke
  }, [searchTerm, data, onSearchResults]);

  return (
    <div className="text-sm md:text-base mr-5 md:mr-0">
      <input
        type="text"
        className="border border-primary bg-white text-black text-sm md:text-base focus:border-primary mr-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={() => {
          setSearchTerm("");
          onClear();
        }}
      >
        Clear
      </button>
    </div>
  );
}
