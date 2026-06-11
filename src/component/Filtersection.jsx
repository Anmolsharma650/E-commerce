import React, { useState } from "react";
import { getData } from "../Context/DataContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Filtersection({
  search,
  setSearch,
  Category,
  brand,
  pricerange,
  setBrand,
  setCategory,
  setPriceRange,
  handleCategoryChange,
  handleBrandChange,
}) {
  const { categoryOnlyData, brandOnlyData } = getData();

  const [openCategory, setOpenCategory] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);

  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setSearch("");
    setBrand("All");
    setCategory("All");
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md mt-5 lg:mt-10">

      {/* ================= MOBILE + TABLET ================= */}
      <div className="lg:hidden">

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white p-2 rounded-md border"
        />

        {/* Category */}
        <div className="mt-4">
          <button
            onClick={() => setOpenCategory(!openCategory)}
            className="w-full flex justify-between items-center font-semibold text-lg"
          >
            Category
            {openCategory ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {openCategory && (
            <div className="mt-3 flex flex-col gap-2">
              {categoryOnlyData?.map((item, index) => (
                <label key={index} className="flex gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Category === item}
                    value={item}
                    onChange={handleCategoryChange}
                    className="accent-red-500"
                  />
                  <span className="uppercase">{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Brand */}
        <div className="mt-4">
          <button
            onClick={() => setOpenBrand(!openBrand)}
            className="w-full flex justify-between items-center font-semibold text-lg"
          >
            Brand
            {openBrand ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {openBrand && (
            <select
              value={brand}
              onChange={handleBrandChange}
              className="mt-3 w-full p-2 bg-white rounded-md border"
            >
              {brandOnlyData?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Price Range */}
        <div className="mt-4">
          <button
            onClick={() => setOpenPrice(!openPrice)}
            className="w-full flex justify-between items-center font-semibold text-lg"
          >
            Price Range
            {openPrice ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {openPrice && (
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-2">
                <span>$0</span>
                <span>${pricerange[1]}</span>
              </div>

              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={pricerange[1]}
                onChange={(e) =>
                  setPriceRange([0, Number(e.target.value)])
                }
                className="w-full accent-red-500"
              />
            </div>
          )}
        </div>

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold transition"
        >
          Reset Filter
        </button>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block">

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white text-black p-2 rounded-md border border-gray-200 w-full"
        />

        <h1 className="mt-5 font-semibold text-xl">
          Category
        </h1>

        <div className="flex flex-col gap-2 mt-3">
          {categoryOnlyData?.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                name={item}
                checked={Category === item}
                value={item}
                onChange={handleCategoryChange}
                className="accent-red-500"
              />
              <button className="cursor-pointer uppercase">
                {item}
              </button>
            </div>
          ))}
        </div>

        <h1 className="mt-5 font-semibold text-xl">
          Brand
        </h1>

        <select
          className="mt-4 bg-white w-full p-2 text-black border border-gray-200 rounded-md"
          value={brand}
          onChange={handleBrandChange}
        >
          {brandOnlyData?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <h1 className="mt-5 font-semibold text-xl">
          Price Range
        </h1>

        <div className="mt-5">

          <div className="flex justify-between text-sm mb-2">
            <span>$0</span>
            <span>${pricerange[1]}</span>
          </div>

          <input
            type="range"
            min="0"
            max="5000"
            step="50"
            value={pricerange[1]}
            onChange={(e) =>
              setPriceRange([0, Number(e.target.value)])
            }
            className="w-full accent-red-500 cursor-pointer"
          />

          <button
            onClick={resetFilters}
            className="mt-5 w-full cursor-pointer text-white px-3 py-2 font-semibold rounded-md bg-red-500 hover:bg-red-600 transition"
          >
            Reset Filter
          </button>
        </div>

      </div>
    </div>
  );
}

export default Filtersection;
