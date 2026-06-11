import React from 'react'
import { getData } from '../Context/DataContext'

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
  handleBrandChange
}) 
{
  const { categoryOnlyData, brandOnlyData } = getData()
  return (
    <div className='bg-gray-100 mt-10 p-4 rouned-md-h-max hidden md:block '>
      <input type="text"
        placeholder='search..'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=' bg-white text-black p-2 rounded-md border-gray-200 border-1' />
      <h1 className='mt-5 font-semibold text-xl'>Category</h1>
      <div className=' flex flex-col gap-2 mt-3'>
        {
          categoryOnlyData?.map((item, index) => {
            return <div key={index} className='flex gap-2'> 
              <input type="checkbox"
                name={item}
                checked={Category === item}
                value={item}
                onChange={handleCategoryChange}
                className='accent-red-500' />
              <button className=' cursor-pointer  uppercase'>{item}</button>
            </div>

          })
        }
      </div>
      <h1 className='mt-5 font-semibold text-xl'>Brand</h1>
      <select
        name=""
        id=""
        className='mt-4 bg-white w-full p-2 text-black border-1 border-gray-200 rounded-md'
        value={brand}
        onChange={handleBrandChange}
      >
        {
          brandOnlyData?.map((item, index) => {

            return <option key={index} value={item} >{item}</option>
          })
        }
      </select>

     <h1 className='mt-5 font-semibold text-xl'>Price Range</h1>

<div className="mt-5">

  {/* Label */}
  <div className="flex justify-between text-sm mb-2">
    <span>$0</span>
    <span>${pricerange[1]}</span>
  </div>

  {/* SINGLE SLIDER */}
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

  {/* RESET BUTTON */}
  <button
    onClick={() => {setPriceRange([0, 5000]); setSearch('');setBrand("All");setCategory("All")}}
    className='mt-5 w-full cursor-pointer text-white px-3 py-2 font-semibold rounded-md bg-red-500 hover:bg-red-600 transition'
  >
    Reset Filter
  </button>

</div>


    </div>
  )
}

export default Filtersection