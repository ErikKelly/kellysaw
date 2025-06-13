import { useState } from "react";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
import ProductDefault from "./ProductDefault";

export default function ProductPage({ data }: Props) {
  const [filteredData, setFilteredData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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
  const handleFilterResults = (results) => {
    setFilteredData(results);
    setActiveMode("filter");
    // Clear search when filter is used
    setSearchResults([]);
  };

  const handleSearchResults = (results) => {
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

  const [isChecked, setIsChecked] = useState(true);

  return (
    <div className="mx-[10vw] w-full">
      <div className="mb-4 flex justify-between w-full">
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isChecked}
              style={{ accentColor: "#4CBB17" }}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4"
            />
            <span>In store pick up</span>
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
        onFilterChange={handleFilterResults}
        onClear={clearAll}
        isActive={activeMode === "filter"}
      />

      {activeMode === "none" ? (
        <ProductDefault />
      ) : (
        <>
          <ProductList data={getDisplayData()} />
        </>
      )}
    </div>
  );
}
