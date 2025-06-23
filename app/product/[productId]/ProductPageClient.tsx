"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useProductData } from "../../contexts/ProductContext"; // Updated import

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const [productId, setProductId] = useState<string>("");
  const { dataLookup, loading } = useProductData();

  useEffect(() => {
    params.then(({ productId }) => setProductId(productId));
  }, [params]);

  if (loading || !productId) return <div>Loading...</div>;

  const product = dataLookup[productId];

  if (!product) return <div>Product not found</div>;

  return (
    <div key={product["Item Number"]} className="p-8 flex gap-4 bg-white">
      <div className="flex-2/3">
        <div className="flex">
          <p className="text-2xl text-gray-600 mb-2 font-semibold">
            {product["Product Title"]}
          </p>
        </div>
        <p className="font-bold pb-3 text-gray-400">
          Item#: {product["Item Number"]}
        </p>
        <div className="block md:hidden">
          <Image
            src={product["Main Image"]}
            alt="Product Image"
            width={400}
            height={400}
            className="w-full h-full object-contain rounded mb-2"
          />
        </div>
        <p className=" text-gray-700">{product["Marketing Copy"]}</p>
        <div className="flex gap-4 mt-5 mb-[100px] md:mb-0">
          <div className="flex-2/3">
            {product["Usage"] && (
              <p className=" pt-3 text-gray-700">
                <span className="font-bold">Usage:</span> {product["Usage"]}
              </p>
            )}
            <div className="text-center mt-15 bg-white md:bg-transparent border-t-1 md:border-0 fixed bottom-0 md:relative">
              <div className="text-primary  pt-2 md:pt-0 pb-2 text-3xl font-bold">
                Contact us for pricing!
              </div>
              <div className="text-2xl md:text-3xl mb-5 md:mb-0">
                {" "}
                <a
                  href="tel:+19403877241"
                  className="text-kelly-green text-black font-bold hover:text-red-800 underline text-2xl lg:text-3xl"
                >
                  (940) 387-7241
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1/3">
            <h3 className="text-lg font-semibold mt-3 text-black">
              Technical Specs:
            </h3>
            <table className="border-collapse text-sm">
              <tbody>
                {[
                  { label: "Diameter", key: "Diameter" },
                  { label: "Teeth", key: "Teeth" },
                  { label: "Arbor", key: "Arbor" },
                  { label: "Hub Type", key: "Hub Type" },
                  { label: "Type", key: "Type" },
                  { label: "Wire", key: "Wire" },
                  { label: "Wire Gauge", key: "Wire Gauge" },
                  { label: "Wire Material", key: "Wire Material" },
                  { label: "Kerf", key: "Kerf" },
                  { label: "Hook Angle", key: "Hook Angle" },
                  { label: "Plate", key: "Plate" },
                  { label: "Max RPM", key: "Max RPM" },
                  { label: "Shank", key: "Shank" },
                  { label: "Length", key: "Length" },
                  { label: "Working Length", key: "Working Length" },
                  { label: "Pack Quantity", key: "Pack Quantity" },
                ]
                  .filter(({ key }) => product[key] && product[key] !== "")
                  .map(({ label, key }, index, array) => (
                    <tr
                      key={key}
                      className={
                        index < array.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }
                    >
                      <td className="py-2 pr-4 font-medium text-gray-700">
                        {label}
                      </td>
                      <td className="py-2 text-gray-700">{product[key]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="md:flex-1/3 hidden md:block">
        <Image
          src={product["Main Image"]}
          alt="Product Image"
          width={400}
          height={400}
          className="w-full h-full object-contain rounded mb-2"
        />
      </div>
    </div>
  );
}
