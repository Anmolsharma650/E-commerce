import React, { useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/CartContext'

function ProductCard({product}) {
    const navigate = useNavigate()
    const {addToCart,CartItem} =useCart()
    console.log(CartItem);

    return (
        <div className='border border-gray-100 rounded-2xl cursor-pointer hover:shadow-2xl transition-all p-3 flex flex-col h-[400px]'>
            
            {/* Fixed Image Height */}
            <div className="w-full h-64 flex items-center justify-center overflow-hidden">
                <img 
                    src={product.thumbnail} 
                    alt="" 
                    onClick={()=>navigate(`/products/${product.id}`)}
                    className="h-full object-contain transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow mt-3">
                <h1 className='line-clamp-2 font-semibold min-h-[50px]'>
                    {product.title}
                </h1>

                <p className='my-2 text-lg text-gray-800 font-bold'>
                    ₹{product.price}
                </p>

                {/* Button always at bottom */}
                <button className='mt-auto bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full flex gap-2 justify-center items-center font-semibold'
                 onClick={()=>addToCart(product)}>
                    <IoCartOutline className='w-6 h-6'/>
                    Add To Cart
                </button>
            </div>

        </div>
    )
}

export default ProductCard
