import { useState, useEffect, useCallback } from "react";

export default function ProductSearch({
  data,
  onSearchResults,
  onClear,
  isActive,
}) {
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
    <div className="">
      <input
        type="text"
        className="border border-primary bg-white focus:border-primary mr-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
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
