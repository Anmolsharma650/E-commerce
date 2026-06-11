import React, { useEffect } from 'react'
import { getData } from './Context/DataContext'

function Categry() {
    const { categoryOnlyData } = getData()

    return (
       
       <div className="bg-gray-100">
  <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 py-7 px-4">
    {categoryOnlyData?.map((item, index) => (
      <button
        key={index}
        className="
          min-w-[120px]
          text-center
          uppercase
          bg-gradient-to-r from-red-500 to-purple-500
          text-white
          font-semibold
          px-4 py-2
          rounded-full
          shadow-md
          hover:scale-105
          hover:shadow-lg
          transition-all duration-300
          truncate
        "
      >
        {item}
      </button>
    ))}
  </div>
</div>

    )
}

export default Categry