import Image from "next/image";

export default function ProductCard({
  row,
  index,
}: {
  row: Record<string, string>;
  index: number;
}) {
  return (
    <>
      <div
        key={index}
        className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm"
      >
        <p className="font-medium text-gray-800">{row["Brand"]}</p>
        <p className="text-sm text-gray-600 mb-2 font-semibold">
          {row["Product Title"]}
        </p>
        <Image
          src={row["Main Image"]}
          alt="Product Image"
          width={200}
          height={200}
          className="w-full h-48 object-contain rounded mb-2"
        />
        <p className="text-sm text-gray-700">{row["Marketing Copy"]}</p>
      </div>
    </>
  );
}
