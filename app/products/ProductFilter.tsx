import { useState, useEffect } from "react";

interface Props {
  data: Record<string, string>[]; // Your existing data type
  onFilterChange: (filteredData: Record<string, string>[]) => void;
  onClear: () => void;
  isActive: boolean;
}

export default function ProductFilter({
  data,
  onFilterChange,
  onClear,
  isActive,
}: Props) {
  // Unique options for each dropdown
  const [uniqueProductGroup, setProductGroupValues] = useState([]);
  const [uniqueCategory, setCategoryValues] = useState([]);
  const [uniqueSubCategory, setSubCategoryValues] = useState([]);

  // Selected values for each dropdown
  const [selectedProductGroupValue, setSelectedProductGroupValue] =
    useState("");
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");
  const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState("");

  // Get field names for easier reference
  const getFieldNames = () => {
    if (data.length === 0) return {};
    const keys = Object.keys(data[0]);
    return {
      productGroup: keys[2],
      category: keys[3],
      subCategory: keys[4],
      product: keys[5],
    };
  };

  // Function to get currently filtered data based on selections
  const getFilteredData = () => {
    const fields = getFieldNames();
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

  // Send filtered data to parent whenever any selection changes
  useEffect(() => {
    const filteredData = getFilteredData();

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
  ]);

  // 1. Initialize Product Group options
  useEffect(() => {
    if (data.length > 0) {
      const fields = getFieldNames();
      const unique = [
        ...new Set(
          data
            .map((row) => row[fields.productGroup])
            .filter((value) => value != null)
        ),
      ].sort();
      setProductGroupValues(unique);
    }
  }, [data]);

  // 2. When Product Group changes, update Category options
  useEffect(() => {
    if (data.length > 0 && selectedProductGroupValue) {
      const fields = getFieldNames();

      // Filter data where Product Group matches selection
      const filteredData = data.filter(
        (row) => row[fields.productGroup] === selectedProductGroupValue
      );

      // Get unique values for Category from filtered data
      const uniqueCategories = [
        ...new Set(
          filteredData
            .map((row) => row[fields.category])
            .filter((value) => value != null && value !== "")
        ),
      ].sort();
      setCategoryValues(uniqueCategories);

      // Reset subsequent selections
      setSelectedCategoryValue("");
      setSelectedSubCategoryValue("");
      setSubCategoryValues([]);
    } else {
      // If no Product Group selected, clear dependent dropdowns
      setCategoryValues([]);
      setSelectedCategoryValue("");
      setSelectedSubCategoryValue("");
      setSubCategoryValues([]);
    }
  }, [data, selectedProductGroupValue]);

  // 3. When Category changes, update SubCategory options
  useEffect(() => {
    if (data.length > 0 && selectedProductGroupValue && selectedCategoryValue) {
      const fields = getFieldNames();

      // Filter data where both Product Group and Category match selections
      const filteredData = data.filter(
        (row) =>
          row[fields.productGroup] === selectedProductGroupValue &&
          row[fields.category] === selectedCategoryValue
      );

      // Get unique values for SubCategory from filtered data
      const uniqueSubCategories = [
        ...new Set(
          filteredData
            .map((row) => row[fields.subCategory])
            .filter((value) => value != null && value !== "")
        ),
      ].sort();

      setSubCategoryValues(uniqueSubCategories);

      // Reset subsequent selections
      setSelectedSubCategoryValue("");
    } else {
      setSubCategoryValues([]);
      setSelectedSubCategoryValue("");
    }
  }, [data, selectedProductGroupValue, selectedCategoryValue]);

  // Clear all filters function
  const handleClear = () => {
    setSelectedProductGroupValue("");
    setSelectedCategoryValue("");
    setSelectedSubCategoryValue("");
    setCategoryValues([]);
    setSubCategoryValues([]);
    onClear();
  };

  return (
    <>
      {/* Quick preview */}
      <div className="bg-[#4CBB17] w-full p-2 rounded-tl-lg rounded-tr-lg border-l-2 border-r-2 border-t-2 border-black">
        <div className="flex gap-5 px-5">
          {/* Product Group Dropdown */}
          <div className=" ">
            <select
              value={selectedProductGroupValue}
              onChange={(e) => setSelectedProductGroupValue(e.target.value)}
              className="bg-white rounded-lg p-1"
            >
              <option value="">Select Product Group</option>
              {uniqueProductGroup.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategoryValue}
              onChange={(e) => setSelectedCategoryValue(e.target.value)}
              disabled={!selectedProductGroupValue}
              className="bg-white rounded-lg p-1"
            >
              <option value="">Select Category</option>
              {uniqueCategory.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* SubCategory Dropdown */}
          <div>
            <select
              value={selectedSubCategoryValue}
              onChange={(e) => setSelectedSubCategoryValue(e.target.value)}
              disabled={!selectedCategoryValue}
              className="bg-white rounded-lg p-1"
            >
              <option value="">Select SubCategory</option>
              {uniqueSubCategory.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
