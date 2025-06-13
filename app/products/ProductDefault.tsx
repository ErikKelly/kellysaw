import Image from "next/image";

export default function ProductDefault() {
  return (
    <>
      <div className="testclass w-full bg-black items-center justify-center flex">
        <Image
          src="/inventory.jpg"
          alt="Saw shop image"
          width={500}
          height={600}
          className=""
          priority
        />
      </div>
    </>
  );
}
