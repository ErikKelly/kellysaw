import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/product";

export default function ProductHighlight({ data }: { data: Product }) {
  return (
    <>
      <div key={data["Item Number"]} className="p-8 flex gap-4">
        <div className="md:flex-2/3">
          <div className="flex">
            <p className="md:text-2xl text-gray-600 mb-2 font-semibold">
              {data["Product Title"]}
            </p>
          </div>
          <p className="font-bold pb-3">Item#: {data["Item Number"]}</p>

          <div className="md:hidden">
            <Image
              src={data["Main Image"]}
              alt="Product Image"
              width={400}
              height={400}
              className="w-full h-full object-contain rounded mb-2"
            />
          </div>

          <p className="text-sm text-gray-700">{data["Marketing Copy"]}</p>
          <p className="text-sm pt-3 text-gray-700">
            Usage: {data["Application"]}
          </p>
          <p className="text-sm text-gray-700 text-center mt-5">
            <Link href={`/product/${data["Item Number"]}`}>
              <button className="px-4 py-2 bg-primary text-white font-bold rounded hover:bg-secondary">
                View Product
              </button>
            </Link>
          </p>
        </div>

        <div className="md:flex-1/3 hidden md:block">
          <Image
            src={data["Main Image"]}
            alt="Product Image"
            width={400}
            height={400}
            className="w-full h-full object-contain rounded mb-2"
          />
        </div>
      </div>
    </>
  );
}
