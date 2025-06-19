import React from "react";
import Slider from "react-slick";
import ProductHighlight from "./ProductHighlight";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";

export default function ProductDefault({ dataLookup }) {
  const settings = {
    dots: true,
    fade: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    // beforeChange: (current, next) => setActiveSlide(next),
    accessibility: true,
  };

  const topSellers = [
    "D1280X",
    "LU79R010",
    "D1080X",
    "CB35057R",
    "D0641A",
    "50-118",
    "BP80057L",
    "D1060X",
    "64-100A",
    "99-036",
  ];

  const topSellerProducts = topSellers
    .map((itemNumber) => dataLookup[itemNumber])
    .filter(Boolean);

  return (
    <div className="p-4 bg-white border-x-2 border-b-2 pb-10">
      <div className="text-3xl font-sriracha font-bold text-red-700 -rotate-4 inline-block">
        Top Sellers...
      </div>
      <Slider {...settings}>
        {topSellerProducts.map((data) => (
          <div key={data["Item Number"]}>
            <ProductHighlight data={data} />
          </div>
          //    <div key={product["Item Number"]}>{product["Item Number"]}</div>
        ))}
      </Slider>
    </div>
  );
}
