import React from 'react'
import { useNavigate } from 'react-router-dom'

function Breadcrums({ title }) {
  const navigate = useNavigate()

  return (
    <div className='max-w-6xl mx-auto px-4 mt-6'>
      <p className='text-gray-600 text-sm'>
        <span 
          className='cursor-pointer hover:text-black'
          onClick={() => navigate("/")}
        >
          Home
        </span>
        {" / "}
        <span 
          className='cursor-pointer hover:text-black'
          onClick={() => navigate("/products")}
        >
          Products
        </span>
        {" / "}
        <span className='text-black font-medium'>
          {title}
        </span>
      </p>
    </div>
  )
}

export default Breadcrums
