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
  const [uniqueProduct, setProductValues] = useState([]);

  // Selected values for each dropdown
  const [selectedProductGroupValue, setSelectedProductGroupValue] =
    useState("");
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");
  const [selectedSubCategoryValue, setSelectedSubCategoryValue] = useState("");
  const [selectedProductValue, setSelectedProductValue] = useState("");

  useEffect(() => {
    if (data.length > 0) {
      const fieldName = Object.keys(data[0])[2];
      const unique = [
        ...new Set(
          data.map((row) => row[fieldName]).filter((value) => value != null) // Excludes null and undefined
        ),
      ];
      setProductGroupValues(unique); // Store in state
    }
  }, [data]);

  useEffect(() => {
    if (data.length > 0 && selectedProductGroupValue) {
      const productGroupField = Object.keys(data[0])[2];
      const categoryField = Object.keys(data[0])[3];

      // Filter data where Product Group matches selection
      const filteredData = data.filter(
        (row) => row[productGroupField] === selectedProductGroupValue
      );

      // Get unique values for Category from filtered data
      const uniqueCategories = [
        ...new Set(
          filteredData
            .map((row) => row[categoryField])
            .filter((value) => value != null && value !== "")
        ),
      ].sort();
      setCategoryValues(uniqueCategories);

      // Reset subsequent selections
      setSelectedCategoryValue("");
      setSelectedSubCategoryValue("");
      setSelectedProductValue("");
      setSubCategoryValues([]);
      setProductValues([]);
    } else {
      // If no Product Group selected, clear dependent dropdowns
      setCategoryValues([]);
      setSelectedCategoryValue("");
      setSelectedSubCategoryValue("");
      setSelectedProductValue("");
      setSubCategoryValues([]);
      setProductValues([]);
    }
  }, [data, selectedProductGroupValue]);

  // 3. When Category changes, update SubCategory options
  useEffect(() => {
    if (data.length > 0 && selectedProductGroupValue && selectedCategoryValue) {
      const productGroupField = Object.keys(data[0])[2];
      const categoryField = Object.keys(data[0])[3];
      const subCategoryField = Object.keys(data[0])[4];

      // Filter data where both Product Group and Category match selections
      const filteredData = data.filter(
        (row) =>
          row[productGroupField] === selectedProductGroupValue &&
          row[categoryField] === selectedCategoryValue
      );

      // Get unique values for SubCategory from filtered data
      const uniqueSubCategories = [
        ...new Set(
          filteredData
            .map((row) => row[subCategoryField])
            .filter((value) => value != null && value !== "")
        ),
      ].sort();

      setSubCategoryValues(uniqueSubCategories);

      // Reset subsequent selections
      setSelectedSubCategoryValue("");
      setSelectedProductValue("");
      setProductValues([]);
    } else {
      setSubCategoryValues([]);
      setSelectedSubCategoryValue("");
      setSelectedProductValue("");
      setProductValues([]);
    }
  }, [data, selectedProductGroupValue, selectedCategoryValue]);

  // 4. When SubCategory changes, update final Product values
  useEffect(() => {
    if (
      data.length > 0 &&
      selectedProductGroupValue &&
      selectedCategoryValue &&
      selectedSubCategoryValue
    ) {
      const productGroupField = Object.keys(data[0])[2];
      const categoryField = Object.keys(data[0])[3];
      const subCategoryField = Object.keys(data[0])[4];
      const productField = Object.keys(data[0])[5];

      // Filter data where Product Group, Category, and SubCategory all match selections
      const filteredData = data.filter(
        (row) =>
          row[productGroupField] === selectedProductGroupValue &&
          row[categoryField] === selectedCategoryValue &&
          row[subCategoryField] === selectedSubCategoryValue
      );
      setProductValues(filteredData);
    } else {
      setProductValues([]);
    }
  }, [
    data,
    selectedProductGroupValue,
    selectedCategoryValue,
    selectedSubCategoryValue,
  ]);

  // 5. Send filtered results to parent whenever uniqueProduct changes
  useEffect(() => {
    if (uniqueProduct.length > 0) {
      onFilterChange(uniqueProduct);
    } else if (
      selectedProductGroupValue ||
      selectedCategoryValue ||
      selectedSubCategoryValue
    ) {
      onFilterChange([]);
    }
  }, [
    uniqueProduct,
    selectedProductGroupValue,
    selectedCategoryValue,
    selectedSubCategoryValue,
  ]);

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
