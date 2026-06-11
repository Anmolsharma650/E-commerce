import React, { useEffect } from "react";
import { getData } from "../Context/DataContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Categry from "../Categry";
import { Link } from "react-router-dom";

function Carousel() {
  const { data, fetchAllProducts } = getData();

  useEffect(() => {
    if (data.length === 0) {
      fetchAllProducts();
    }
  }, [data.length, fetchAllProducts]);

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute left-6 top-1/2 -translate-y-1/2 z-50 cursor-pointer"
    >
      <AiOutlineArrowLeft
        size={40}
        className="bg-red-500 hidden sm:block text-white rounded-full p-2 hover:bg-gray-700 transition"
      />
    </div>
  );

  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute right-6 top-1/2 -translate-y-1/2 z-50 cursor-pointer"
    >
      <AiOutlineArrowRight
        size={40}
        className="bg-red-500 hidden sm:block text-white rounded-full p-2 hover:bg-gray-700 transition"
      />
    </div>
  );

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {data?.slice(0, 7).map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
          >
            <div className="flex flex-col lg:flex-row gap-10 justify-center items-center h-auto lg:h-[500px] px-6 py-12">

              {/* IMAGE - Top on mobile, right on large screen */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="rounded-full w-[220px] sm:w-[260px] md:w-[300px] 
                           hover:scale-105 transition-all duration-300 
                           shadow-2xl shadow-red-400"
              />

              {/* TEXT SECTION */}
              <div className="space-y-6 text-center lg:text-left max-w-[600px]">
                <h2 className="text-red-500 text-sm font-semibold tracking-wide">
                  Choose Your Products And Enjoy.
                </h2>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase line-clamp-2 text-white">
                  {item.title}
                </h1>

                <p className="text-gray-300 line-clamp-3">
                  {item.description}
                </p>

                <Link to={"/products"}>
                  <button className="bg-gradient-to-r from-red-500 to-purple-500 
                                     text-white px-5 py-2 rounded-md 
                                     hover:scale-105 transition-all duration-300">
                    Shop Now
                  </button>
                </Link>
              </div>

            </div>
          </div>
        ))}
      </Slider>

      <Categry />
    </div>
  );
}

export default Carousel;
