import Image from "next/image";

export default function Sharpening() {
  return (
    <div>
      {/* Abstract Background */}
      <div className="fixed inset-0 -z-10">
        {/* Large Blocks */}
        {/* Large Blocks */}
        <div className="absolute top-0 left-0 h-1/3 w-1/2 bg-slate-200 opacity-70"></div>
        <div className="absolute top-1/3 left-0 h-1/4 w-1/4 bg-gray-300 opacity-50"></div>
        <div className="absolute top-0 right-0 h-1/2 w-1/4 bg-zinc-200 opacity-60"></div>
        <div className="absolute bottom-0 right-0 h-1/3 w-1/3 bg-slate-100 opacity-80"></div>
        <div className="absolute bottom-0 left-0 h-1/3 w-1/3 bg-neutral-200 opacity-40"></div>

        {/* Medium Blocks */}
        <div className="absolute top-1/4 left-1/4 h-1/4 w-1/6 bg-zinc-300 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 h-1/5 w-1/5 bg-gray-400 opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 h-1/6 w-1/6 bg-slate-300 opacity-50"></div>
        <div className="absolute top-2/3 left-1/6 h-1/6 w-1/4 bg-zinc-100 opacity-60"></div>

        {/* Small Accent Blocks */}
        <div className="absolute top-1/3 right-1/4 h-[120px] w-[120px] bg-slate-400 opacity-40"></div>
        <div className="absolute bottom-1/2 left-1/3 h-[150px] w-[100px] bg-zinc-500 opacity-20"></div>
        <div className="absolute top-2/3 right-1/2 h-[80px] w-[200px] bg-gray-300 opacity-30"></div>
        <div className="absolute top-[15%] left-[40%] h-[90px] w-[90px] bg-neutral-300 opacity-40"></div>
      </div>
      <div className="text-sm mx-4 md:mx-0 md:text-2xl font-bold">
        <div className="flex justify-between">
          <div>Saw Blades</div>
          <div>Cutters</div>
          <div>Router Bits</div>
          <div>Planer Knives</div>
        </div>
        <div></div>
        <div className="text-center text-2xl md:text-5xl mt-5">
          Sharpened to Precision!
        </div>
      </div>
      <div className="flex gap-4">
        <div className="mx-5 md:mx-0 md:flex-2/3">
          <div className="text-base my-8 bg-white/50 rounded-lg p-5 border-1 border-primary">
            <p>
              Since 1985, we&apos;ve specialized in sharpening the tools that
              keep North Texas working — from high-performance saw blades to
              router bits, cutters, and planer knives. Whether you&apos;re in
              woodworking, construction, manufacturing, or cabinetry, we deliver
              sharp, reliable results that keep your work clean and efficient.
            </p>
            <p className="mt-5">
              With nearly four decades of hands-on experience, we&apos;ve earned
              the trust of professionals and businesses across the region. And
              as a locally owned operation, we&apos;re proud to support the
              people and projects that shape our community.
            </p>
          </div>
        </div>
        <div className="hidden md:block md:flex-1/3 rounded-lg overflow-hidden pt-8">
          <Image
            src="/sawblade.jpg"
            alt="Saw Blade Img"
            width={400}
            height={400}
            className="w-full h-auto object-contain rounded-lg mb-2"
          />
        </div>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-center">
        Sharper tools. Smoother work. Stronger results.
      </div>
    </div>
  );
}
