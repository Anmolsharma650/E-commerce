import { MapPin, ShoppingCartIcon } from 'lucide-react'
import { FaCaretDown, FaCartArrowDown } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { CgClose } from 'react-icons/cg'
import { useCart } from '../../Context/CartContext'


function Header({ location, getLocation, openDropDown, setOpenDropDown }) {
  const { CartItem } = useCart()

  const toggleDropdown = () => {
    setOpenDropDown(!openDropDown)

  }

  return (
    <div className=' bg-gray-100 shadow-2xl py-3'>
      <div className='max-w-6xl mx-auto flex  justify-between items-center'>
        {/*logo */}
        <div className='flex  justify-center gap-5 items-center'>
          <Link to={"/"}>
            <h1 className='font-bold ml-5 text-3xl'><span className='text-red-500 font-serif'>Z</span>eptro</h1>
          </Link>  <div className='flex  items-center cursor-pointer gap-2'>
            <MapPin className=' md:flex hidden text-red-500' />
            <span className='   md:flex hidden font-semibold'>{location ? <div className='-space-y-2'>
              <p>{location.county}</p>
              <p>{location.state}</p>
            </div> : "Add Location"}</span>
            <FaCaretDown onClick={toggleDropdown} className=' md:flex hidden justify-center items-center font-medium' />
          </div>
          {
            openDropDown ? <div className='`w-[250px]` h-max flex justify-center flex-col shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md '>
              <h1 className=' font-semibold mb-4 text-xl flex items-center gap-2 justify-between'>  Change Location<span onClick={toggleDropdown}><CgClose /> </span></h1>
              <button onClick={getLocation} className='  cursor-pointer text-black px-4 py-1 font-semibold rounded-md bg-red-500'>Detect My Location</button>
            </div> : null
          }
        </div>
        {/*menu*/}
        <div className='flex text-[20px]  items-center gap-7'>
          <ul className='   hidden  md:flex justify-center gap-7 font-semibold '>
            <NavLink to={'/'} className={({ isActive }) => `${isActive ? "border-b-2 translate-all border-red-500 " : 'text-black '} cursor-pointer`} ><li>Home</li></NavLink>
            <NavLink to={'/products'} className={({ isActive }) => `${isActive ? "border-b-2 translate-all border-red-500 " : 'text-black '} cursor-pointer`} ><li>Produts</li></NavLink>
            <NavLink to={'/about'} className={({ isActive }) => `${isActive ? "border-b-2 translate-all border-red-500 " : 'text-black '} cursor-pointer`} ><li>About</li></NavLink>
            <NavLink to={'/contact'} className={({ isActive }) => `${isActive ? "border-b-2 translate-all border-red-500 " : 'text-black '} cursor-pointer`} ><li>Contact</li></NavLink>
          </ul>
          {/*cart icon*/}

          <div className="relative flex items-center justify-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative flex items-center justify-center w-9 h-9">
              <IoCartOutline className="w-7 h-7 text-gray-800 hover:text-black" />

              <span
                className="absolute -top-1 -right-1
      w-4 h-4 text-[10px]
      bg-red-500 text-white rounded-full
      flex items-center justify-center"
              >
              {CartItem.length}
              </span>
            </Link>

            {/* Menu Icon (SM only) */}
            <Link
              to="/menuicon"
              className="sm:hidden flex items-center justify-center w-9 h-9 text-3xl font-bold text-gray-700"
            >
              &#8801;
            </Link>
          </div>


          {/*Button */}
          <div>
            <SignedOut >
              <SignInButton className="hidden md:flex   justify-center cursor-pointer text-black px-4 py-1 font-semibold rounded-md bg-red-500" />
            </SignedOut>
            <SignedIn>
              <div className="hidden md:flex">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header 