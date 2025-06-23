export interface Product {
  "Item Number": string;
"In Stock": string;
"Brand": string;
"Product Group": string;
"Category": string;
"Sub Category": string;
"Product Title": string;
"Sub-Brand": string;
"Marketing Copy": string;
"Marketing Bullet 1": string;
"Marketing Bullet 2": string;
"Marketing Bullet 3": string;
"Marketing Bullet 4": string;
"Marketing Bullet 5": string;
"Marketing Bullet 6": string;
"Marketing Bullet 7": string;
"Marketing Bullet 8": string;
"Marketing Bullet 9": string;
"Marketing Bullet 10": string;
"Application": string;
"Usage": string;
"Pack Quantity": string;
"Set Piece Count": string;
"Set Contents": string;
"Main Image": string;
"Package Image": string;
"List Price": string;
"Suggested Retail Price": string;
"Minimum Order Quantity": string;
"Item UPC": string;
"Item Quantity": string;
"Item Height (in)": string;
"Item Width (in)": string;
"Item Depth (in)": string;
"Item Weight (lb)": string;
"Inner Case UPC": string;
"Inner Case Quantity": string;
"Inner Case Height (in)": string;
"Inner Case Width (in)": string;
"Inner Case Depth (in)": string;
"Inner Case Weight (lb)": string;
"Master Case UPC": string;
"Master Case Quantity": string;
"Master Case Height (in)": string;
"Master Case Width (in)": string;
"Master Case Depth (in)": string;
"Master Case Weight (lb)": string;
"Country of Origin": string;
"Diameter": string;
"Size": string;
"Length": string;
"Width": string;
"Teeth": string;
"Arbor": string;
"Kerf": string;
"Hook Angle": string;
"Plate": string;
"Tooth Design": string;
"Teeth Per Inch": string;
"Shank": string;
"Working Length": string;
"Head Type": string;
"Number of Cutters": string;
"Width of Cut": string;
"Cut Depth": string;
"Interface": string;
"Grit": string;
"Grit Blend": string;
"Grit Description": string;
"Hole Pattern": string;
"Backing": string;
"Rim Design": string;
"Hub Type": string;
"Thickness": string;
"Chisel Type": string;
"Nutsetter Size": string;
"Wire": string;
"Wire Material": string;
"Wire Gauge": string;
"Screwdriver Style": string;
"Screwdriver Head": string;
"Max RPM": string;
"Angle": string;
"Angle (A)": string;
"Angle (d)": string;
"Angle (d2)": string;
"Angle (Included)": string;
"Angle (Side)": string;
"Arbor Dia. (D)": string;
"Arbor Height (h2)": string;
"Assorted Pack": string;
"Bearing Dia. (B)": string;
"Bearing Type": string;
"Bore Dia. (n)": string;
"Bore Diameter": string;
"Carbide Height (h)": string;
"Chippers": string;
"Max. Hole Depth": string;
"Overall Dia. (D)": string;
"Grind": string;
"Height (H)": string;
"Minor Height (m)": string;
"Minor Height (m2)": string;
"Inside Diameter": string;
"Keyways": string;
"Length (L)": string;
"Overall Length (H)": string;
"Number of Cutting Edges": string;
"Number of Pieces": string;
"Number of Teeth (Z)": string;
"Number of Wings (Z)": string;
"Overhang Amount (C)": string;
"Piece Count": string;
"Pinholes": string;
"Radius (R)": string;
"Small Radius (R2)": string;
"Small Radius (R3)": string;
"Large Radius (R)": string;
"Large Radius (R1)": string;
"Rotation": string;
"Rub Collar Number": string;
"Shank Dia. (A)": string;
"Shank Length": string;
"Shims": string;
"Small Dia. (n)": string;
"Stud Height (h1)": string;
"Thickness (T)": string;
"Upcut Length": string;
"Number of Steps": string;
"Type": string;
"Adapter Size": string;
"Grout Thickness": string;
"Tools": string;
"Materials": string;
  // Add other CSV columns as needed
  [key: string]: string; // This allows for additional dynamic properties
}

export interface ProductLookup {
  [itemNumber: string]: Product;
}

// Component prop interfaces
export interface ProductDefaultProps {
  dataLookup: ProductLookup;
}

export interface ProductListProps {
  data: Product[];
}

export interface ProductFilterProps {
  data: Product[];
  onFilterChange: (filteredData: Product[]) => void;
  onClear: () => void;
  isActive: boolean;
  onSearchTermChange?: (state: { searchTerm: string, handleSearchTermChange: (term: string) => void }) => void;
}