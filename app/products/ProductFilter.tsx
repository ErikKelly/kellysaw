import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Product } from "../types/product";
//   const [filteredData, setFilteredData] = useState<Product[]>([]);

interface Props {
  data: Product[]; // Your existing data type
  onFilterChange: (filteredData: Product[]) => void;
  onClear: () => void;
  isActive: boolean;
}

interface FieldNames {
  productGroup: string;
  category: string;
  subCategory: string;
  product: string;
}

// ✅ Move getFieldNames HERE - after interfaces, before component
const getFieldNames = (data: Product[]): FieldNames | null => {
  if (data.length === 0) return null;
  const keys = Object.keys(data[0]);
  return {
    productGroup: keys[2],
    category: keys[3],
    subCategory: keys[4],
    product: keys[5],
  };
};

// Function to get currently filtered data based on selections
const getFilteredData = (
  data: Product[],
  selectedProductGroupValue: string,
  selectedCategoryValue: string,
  selectedSubCategoryValue: string
) => {
  const fields = getFieldNames(data);
  if (!fields) return [];
  if (!fields.productGroup) return [];

  let filtered = data;

  // Apply Product Group filter if selected
  if (selectedProductGroupValue) {
    filtered = filtered.filter(
      (row) => row[fields.productGroup] === selectedProductGroupValue
    );
  }

  // Apply Category filter if selected
  if (selectedCategoryValue) {
    filtered = filtered.filter(
      (row) => row[fields.category] === selectedCategoryValue
    );
  }

  // Apply SubCategory filter if selected
  if (selectedSubCategoryValue) {
    filtered = filtered.filter(
      (row) => row[fields.subCategory] === selectedSubCategoryValue
    );
  }

  return filtered;
};

export default function ProductFilter({
  data,
  onFilterChange,
  onClear,
}: Props) {
  const searchParams = useSearchParams();
  // const [isRestoringFromURL, setIsRestoringFromURL] = useState(true);
  const isInitialMount = useRef(true);

  // Unique options for each dropdown
  const [uniqueProductGroup, setProductGroupValues] = useState<string[]>([]);
  const [uniqueCategory, setCategoryValues] = useState<string[]>([]);
  const [uniqueSubCategory, setSubCategoryValues] = useState<string[]>([]);

  // Selected values for each dropdown
  const [selectedProductGroupValue, setSelectedProductGroupValue] =
    useState("");
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");
  const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState("");

  // Update URL when filters change
  const updateURL = (
    productGroup: string,
    category: string,
    subCategory: string
  ) => {
    const params = new URLSearchParams();
    if (productGroup) params.set("productGroup", productGroup);
    if (category) params.set("category", category);
    if (subCategory) params.set("subCategory", subCategory);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  };

  // Update URL when any filter changes
  useEffect(() => {
    updateURL(
      selectedProductGroupValue,
      selectedCategoryValue,
      selectedSubCategoryValue
    );
  }, [
    selectedProductGroupValue,
    selectedCategoryValue,
    selectedSubCategoryValue,
  ]);

  /*

  // Get field names for easier reference
  const getFieldNames = (): FieldNames | null => {
    if (data.length === 0) return null; // Change {} to null
    const keys = Object.keys(data[0]);
    return {
      productGroup: keys[2],
      category: keys[3],
      subCategory: keys[4],
      product: keys[5],
    };
  };
*/

  // Send filtered data to parent whenever any selection changes
  useEffect(() => {
    const filteredData = getFilteredData(
      data,
      selectedProductGroupValue,
      selectedCategoryValue,
      selectedSubCategoryValue
    );
    // Send results if any filter is selected, otherwise send empty array
    if (
      selectedProductGroupValue ||
      selectedCategoryValue ||
      selectedSubCategoryValue
    ) {
      onFilterChange(filteredData);
    } else {
      onFilterChange([]);
    }
  }, [
    selectedProductGroupValue,
    selectedCategoryValue,
    selectedSubCategoryValue,
    data,
    onFilterChange,
  ]);

  // Initialize from URL and set up all dropdowns on mount
  useEffect(() => {
    if (data.length > 0 && isInitialMount.current) {
      const fields = getFieldNames(data);

      if (!fields) return;

      // Set up Product Group options
      const unique = [
        ...new Set(
          data
            .map((row) => row[fields.productGroup])
            .filter((value) => value != null)
        ),
      ].sort();
      setProductGroupValues(unique);

      // Get URL values
      const urlProductGroup = searchParams.get("productGroup") || "";
      const urlCategory = searchParams.get("category") || "";
      const urlSubCategory = searchParams.get("subCategory") || "";

      // Set the selected values from URL
      setSelectedProductGroupValue(urlProductGroup);
      setSelectedCategoryValue(urlCategory);
      setSelectedSubCategoryValue(urlSubCategory);

      // Populate dependent dropdowns based on URL values
      if (urlProductGroup) {
        const filteredForCategory = data.filter(
          (row) => row[fields.productGroup] === urlProductGroup
        );
        const uniqueCategories = [
          ...new Set(
            filteredForCategory
              .map((row) => row[fields.category])
              .filter((value) => value != null && value !== "")
          ),
        ].sort();
        setCategoryValues(uniqueCategories);

        if (urlCategory) {
          const filteredForSubCategory = data.filter(
            (row) =>
              row[fields.productGroup] === urlProductGroup &&
              row[fields.category] === urlCategory
          );
          const uniqueSubCategories = [
            ...new Set(
              filteredForSubCategory
                .map((row) => row[fields.subCategory])
                .filter((value) => value != null && value !== "")
            ),
          ].sort();
          setSubCategoryValues(uniqueSubCategories);
        }
      }

      isInitialMount.current = false;
      //    setIsRestoringFromURL(false);
    }
  }, [data, searchParams]);

  // Handle Product Group changes (user interactions only)
  const handleProductGroupChange = (value: string) => {
    setSelectedProductGroupValue(value);

    if (value) {
      const fields = getFieldNames(data);
      if (!fields) return;

      const filteredData = data.filter(
        (row) => row[fields.productGroup] === value
      );
      const uniqueCategories = [
        ...new Set(
          filteredData
            .map((row) => row[fields.category])
            .filter((value) => value != null && value !== "")
        ),
      ].sort();
      setCategoryValues(uniqueCategories);
    } else {
      setCategoryValues([]);
    }

    // Reset dependent selections
    setSelectedCategoryValue("");
    setSelectedSubCategoryValue("");
    setSubCategoryValues([]);
  };

  // Handle Category changes (user interactions only)
  const handleCategoryChange = (value: string) => {
    setSelectedCategoryValue(value);

    if (value && selectedProductGroupValue) {
      const fields = getFieldNames(data);
      if (!fields) return;

      const filteredData = data.filter(
        (row) =>
          row[fields.productGroup] === selectedProductGroupValue &&
          row[fields.category] === value
      );
      const uniqueSubCategories = [
        ...new Set(
          filteredData
            .map((row) => row[fields.subCategory])
            .filter((value) => value != null && value !== "")
        ),
      ].sort();
      setSubCategoryValues(uniqueSubCategories);
    } else {
      setSubCategoryValues([]);
    }

    // Reset dependent selections
    setSelectedSubCategoryValue("");
  };

  // Handle SubCategory changes (user interactions only)
  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategoryValue(value);
  };

  // Clear all filters function
  const handleClear = () => {
    setSelectedProductGroupValue("");
    setSelectedCategoryValue("");
    setSelectedSubCategoryValue("");
    setCategoryValues([]);
    setSubCategoryValues([]);
    onClear();
  };

  // Your JSX here with the new handlers...
  return (
    <div className="bg-primary w-full p-2 rounded-tl-lg rounded-tr-lg border-l-2 border-r-2 border-t-2 border-black">
      <div className="flex gap-1 md:gap-5 px-1 md:px-5">
        {/* Product Group Dropdown */}
        <select
          value={selectedProductGroupValue}
          onChange={(e) => handleProductGroupChange(e.target.value)}
          className="bg-white text-[10px] md:text-base rounded-lg p-1"
        >
          <option value="">Select Product Group</option>
          {uniqueProductGroup.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        {/* Category Dropdown */}
        <select
          value={selectedCategoryValue}
          onChange={(e) => handleCategoryChange(e.target.value)}
          disabled={!selectedProductGroupValue}
          className="bg-white text-[10px] md:text-base rounded-lg p-1"
        >
          <option value="">Select Category</option>
          {uniqueCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* SubCategory Dropdown */}
        <select
          value={selectedSubCategoryValue}
          onChange={(e) => handleSubCategoryChange(e.target.value)}
          className="bg-white text-[10px] md:text-base rounded-lg p-1"
          disabled={!selectedCategoryValue}
        >
          <option value="">Select SubCategory</option>
          {uniqueSubCategory.map((subCategory) => (
            <option key={subCategory} value={subCategory}>
              {subCategory}
            </option>
          ))}
        </select>

        {/* Clear Button */}
        <button onClick={handleClear}>Clear Filters</button>
      </div>
    </div>
  );
}
