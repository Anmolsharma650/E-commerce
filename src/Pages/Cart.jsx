import React from 'react'
import { useCart } from '../Context/CartContext'
import Lottie from 'lottie-react'
import empty from '../assets/empty.json'
import { FaRegTrashAlt } from 'react-icons/fa'
import { LuNotebook } from 'react-icons/lu'
import { MdDeliveryDining } from 'react-icons/md'
import { FaBagShopping } from 'react-icons/fa6'

function Cart({ location, getLocation }) {
  const { CartItem } = useCart()
  const { removeFromCart } = useCart();
  const { updateQuantity } = useCart();

  const totalprice = Math.round(
    CartItem.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-3 sm:px-4'>
      {CartItem.length > 0 ? (
        <div>
          <h1 className='font-bold text-2xl text-center sm:text-left'>
            My Cart ({CartItem.length})
          </h1>

          <div>
            {/* Cart Items */}
            <div>
              {CartItem.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='bg-gray-100 p-4 sm:p-5 flex flex-col md:flex-row items-center md:justify-between gap-4 mt-3 w-full rounded-md'
                  >
                    <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto'>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className='w-16 h-16 rounded-md object-cover'
                      />

                      <div>
                        <h1 className='w-full sm:w-[300px] line-clamp-2 text-center sm:text-left'>
                          {item.title}
                        </h1>

                        <p className='text-red-500 font-semibold text-lg text-center sm:text-left'>
                          ${item.price}
                        </p>
                      </div>
                    </div>

                    <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
                      <button  onClick={() => updateQuantity(item.id, "decrease")} className='cursor-pointer'>-</button>
                      <span>{item.quantity}</span>
                      <button  onClick={() => updateQuantity(item.id, "increase")} className='cursor-pointer'>+</button>
                    </div>

                    <span className='hover:bg-white/60 transition-all rounded-md p-3 hover:shadow-2xl'>
                      <FaRegTrashAlt onClick={() => removeFromCart(item.id)} className='text-red-500 text-2xl cursor-pointer' />
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Bill + Delivery */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              
              {/* Bill Details - Mobile First */}
              <div className='bg-white border border-gray-100 shadow-xl p-7 mt-4 space-y-2 h-max rounded-md order-1 lg:order-2'>
                <h1 className='text-gray-800 font-bold text-xl'>
                  Bill Details
                </h1>

                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-600'>
                    <span>
                      <LuNotebook />
                    </span>
                    Items Total
                  </h1>

                  <p>${totalprice}</p>
                </div>

                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-600'>
                    <span>
                      <MdDeliveryDining />
                    </span>
                    Delivery Charge
                  </h1>

                  <p className='text-red-600 font-semibold'>
                    <span className='text-gray-600 line-through'>$25</span>{' '}
                    FREE
                  </p>
                </div>

                <div className='flex justify-between items-center'>
                  <h1 className='flex gap-1 items-center text-gray-600'>
                    <span>
                      <FaBagShopping />
                    </span>
                    Handle Charge
                  </h1>

                  <p className='text-red-600 font-semibold'>$5</p>
                </div>

                <hr className='mt-2 text-gray-200' />

                <div className='flex justify-between items-center'>
                  <h1 className='font-semibold text-lg'>Grand Total</h1>
                  <p className='font-semibold text-lg'>${totalprice + 5}</p>
                </div>

                <div>
                  <h1 className='font-semibold mt-7 mb-3 text-gray-700'>
                    Apply Promocode
                  </h1>

                  <div className='flex flex-col sm:flex-row gap-3'>
                    <input
                      type='text'
                      placeholder='Enter Code'
                      className='p-2 rounded-md w-full bg-gray-100'
                    />

                    <button className='bg-gray-100 text-black border border-gray-200 py-2 px-3 rounded-md cursor-pointer'>
                      Apply
                    </button>
                  </div>
                </div>

                <button className='bg-red-500 text-black px-3 py-2 rounded-md w-full cursor-pointer mt-3'>
                  Proceed To Checkout
                </button>
              </div>

              {/* Delivery Info */}
              <div className='bg-gray-100 rounded-md p-5 sm:p-7 mt-4 space-y-4 order-2 lg:order-1'>
                <h1 className='text-gray-800 font-bold text-xl'>
                  Delivery Info
                </h1>

                <div className='flex flex-col space-y-1'>
                  <label>Full Name</label>

                  <input
                    type='text'
                    placeholder='Enter Your Name'
                    className='p-2 rounded-md bg-white'
                  />
                </div>

                <div className='flex flex-col space-y-1'>
                  <label>Address</label>

                  <input
                    type='text'
                    placeholder='Enter Your Address'
                    className='p-2 rounded-md bg-white'
                  />
                </div>

                <div className='flex flex-col sm:flex-row w-full gap-2'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label>State</label>

                    <input
                      type='text'
                      placeholder='Enter Your State'
                      className='p-2 rounded-md bg-white'
                    />
                  </div>

                  <div className='flex flex-col space-y-1 w-full'>
                    <label>PostCode</label>

                    <input
                      type='text'
                      placeholder='Enter Your PostCode'
                      className='p-2 rounded-md bg-white'
                    />
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row w-full gap-2'>
                  <div className='flex flex-col space-y-1 w-full'>
                    <label>Country</label>

                    <input
                      type='text'
                      placeholder='Enter Your Country'
                      className='p-2 rounded-md bg-white'
                    />
                  </div>

                  <div className='flex flex-col space-y-1 w-full'>
                    <label>Phone No</label>

                    <input
                      type='text'
                      placeholder='Enter Your Number'
                      className='p-2 rounded-md bg-white'
                    />
                  </div>
                </div>

                <div>
                  <button className='bg-red-500 rounded-md px-4 py-2 text-white'>
                    Submit
                  </button>
                </div>

                <div className='flex justify-center items-center w-full text-gray-500'>
                  -------Or-------
                </div>

                <div className='flex justify-center'>
                  <button
                    onClick={getLocation}
                    className='bg-red-500 rounded-md px-4 py-2 text-white'
                  >
                    Detect My Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-[400px]'>
          <Lottie
            animationData={empty}
            className='w-40 sm:w-52 md:w-64'
          />
        </div>
      )}
    </div>
  )
}

export default Cart