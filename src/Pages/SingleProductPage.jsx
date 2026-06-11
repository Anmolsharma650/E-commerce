import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IoCartOutline } from 'react-icons/io5'
import Loading from '../assets/Loading4.webm'
import Breadcrums from '../component/Breadcrums'
import { useCart } from '../Context/CartContext'

function SingleProductPage() {

    const { id } = useParams()
    const { addToCart } = useCart()

    const [singleProduct, setSingleProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)

    // Fetch single product
    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`https://dummyjson.com/products/${id}`)
            setSingleProduct(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSingleProduct()
    }, [id])

    // Loading state
    if (!singleProduct) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <video muted autoPlay loop className='w-40'>
                    <source src={Loading} type='video/webm' />
                </video>
            </div>
        )
    }

    // Calculate original price
    const OriginalPrice = Math.round(
        singleProduct.price +
        (singleProduct.price * singleProduct.discountPercentage) / 100
    )

    // Add to cart function
   const handleAddToCart = () => {
    addToCart({
        ...singleProduct,
        quantity
    })
}

    return (
        <div className='max-w-6xl mx-auto px-4 pb-10'>

            {/* Breadcrumb */}
            <Breadcrums title={singleProduct.title} />

            {/* Main Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-6'>

                {/* Product Image */}
                <div className='bg-gray-50 rounded-2xl flex items-center justify-center p-10'>
                    <img
                        src={singleProduct.thumbnail}
                        alt={singleProduct.title}
                        className='max-h-[400px] w-auto object-contain'
                    />
                </div>

                {/* Product Details */}
                <div className='flex flex-col gap-6'>

                    <h1 className='text-3xl font-bold text-black'>
                        {singleProduct.title}
                    </h1>

                    <div className='text-gray-600 uppercase text-sm'>
                        {singleProduct.brand} / {singleProduct.category}
                    </div>

                    <p className='text-gray-700'>
                        {singleProduct.description}
                    </p>

                    {/* Price Section */}
                    <div className='text-3xl font-semibold text-green-500'>
                        ${singleProduct.price}
                        <span className='text-gray-500 text-lg line-through ml-3'>
                            ${OriginalPrice}
                        </span>
                        <span className='bg-red-500 text-white text-sm px-3 py-1 rounded-full ml-3'>
                            {singleProduct.discountPercentage}% OFF
                        </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className='flex items-center gap-4'>
                        <label className='text-sm font-medium text-gray-700'>
                            Quantity
                        </label>

                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => {
                                const value = Math.max(1, Number(e.target.value))
                                setQuantity(value)
                            }}
                            className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500'
                        />
                    </div>

                    {/* Add to Cart Button */}
                    <div className='flex gap-4 mt-4'>
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className='px-6 py-3 flex items-center gap-2 text-lg bg-red-500 text-white rounded-md hover:bg-red-600 transition'
                        >
                            <IoCartOutline />
                            Add to Cart
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SingleProductPage
