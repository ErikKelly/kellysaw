import ProductCard from "./ProductCard";
import { Product } from "../types/product";

// import ProductDefault from "./ProductDefault";

export default function ProductHighlight({ data }: { data: Product[] }) {
  return (
    <>
      {data.length > 0 && (
        <div className="p-4 bg-gray-100 border-x-2 border-b-2">
          <h3 className="text-lg font-semibold mb-4">
            Available Products ({data.length}):
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((row, index) => (
              <ProductCard key={index} row={row} index={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
