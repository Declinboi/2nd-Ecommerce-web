import React from "react";
import Image1 from "../assets/hero/women.png";
import Image2 from "../assets/hero/shopping.png";
import Image3 from "../assets/hero/sale.png";
import Slider from "react-slick";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 50% off on all Men's Wear",
    description:
      "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: Image2,
    title: "30% off on all Women's Wear",
    description:
      "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: Image3,
    title: "70% off on all Products Sale",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const Hero = () => {
  return (
    <div className="relative overflow-clip min-h-[550px] sm:min-h-[650px]  dark:text-gray-700 duration-200">
      {/* background pattern */}
      <div className="h-[700px] w-[700px] bg-orange-300 dark:bg-orange-500 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-10"></div>

      {/* hero section */}
      <div className="container pb-8 sm:pb-0">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content */}
            <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold">
                Lorem ipsum dolor sit.
              </h1>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorum, facilis.
              </p>
              <div>
                <button className="bg-gradient-to-r from-orange-300 to-orange-600 transition-all duration-300 text-white px-4 py-2 hover:scale-105 rounded-full">
                  Order Now
                </button>
              </div>
            </div>
            {/* image section */}
            <div className="order-1 sm:order-2 relative z-10">
              <div>
                <img
                  src={Image1}
                  alt=""
                  className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] sm:scale-125 object-contain mx-auto "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
