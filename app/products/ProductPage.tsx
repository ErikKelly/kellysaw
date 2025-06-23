"use client";

import { useState, useCallback } from "react";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
import ProductDefault from "./ProductDefault";
import { Product, ProductLookup } from "../types/product";

interface Props {
  data: Product[];
  dataLookup: ProductLookup;
}

export default function ProductPage({ data, dataLookup }: Props) {
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [activeMode, setActiveMode] = useState("none"); // 'filter', 'search', 'none'

  // Determine what to display
  const getDisplayData = () => {
    switch (activeMode) {
      case "filter":
        return filteredData;
      case "search":
        return searchResults;
      default:
        return [];
    }
  };
  const handleFilterResults = useCallback((results: Product[]) => {
    setFilteredData(results);
    setActiveMode("filter");
    setSearchResults([]);
  }, []);

  const handleSearchResults = (results: Product[]) => {
    setSearchResults(results);
    setActiveMode("search");
    // Clear filter when search is used
    setFilteredData([]);
  };

  const clearAll = () => {
    setActiveMode("none");
    setFilteredData([]);
    setSearchResults([]);
  };

  // const [isChecked, setIsChecked] = useState(true);

  return (
    <div className="relative z-10 flex flex-col items-stretch">
      <div className="mb-4 flex justify-between w-full">
        <div>
          <label className="flex items-center gap-2">
            {/*
            <input
              type="checkbox"
              checked={isChecked}
              style={{ accentColor: "#4CBB17" }}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4"
            />
            <span>In store pick up</span>
            */}
          </label>
        </div>
        <ProductSearch
          data={data}
          onSearchResults={handleSearchResults}
          onClear={clearAll}
          isActive={activeMode === "search"}
        />
      </div>

      <ProductFilter
        data={data}
        onFilterChange={handleFilterResults} // Now this won't change on every render
        onClear={clearAll}
        isActive={activeMode === "filter"}
      />

      {getDisplayData().length === 0 ? (
        <ProductDefault dataLookup={dataLookup} />
      ) : (
        <ProductList data={getDisplayData()} />
      )}
    </div>
  );
}
