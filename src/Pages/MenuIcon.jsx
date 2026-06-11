import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"

function MenuIcon() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleNavigate = (path) => {
    setIsOpen(false)
    setTimeout(() => {
      navigate(path)
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      {/* Sliding Menu */}
      <div
        className={`h-full w-64 bg-white p-6
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <div
          className="text-3xl font-bold cursor-pointer mb-8"
          onClick={() => handleNavigate(-1)}
        >
          ✕
        </div>

        {/* Menu Links */}
        <ul className="flex flex-col gap-6 text-xl font-semibold">
          <li onClick={() => handleNavigate("/")}>Home</li>
          <li onClick={() => handleNavigate("/about")}>About</li>
          <li onClick={() => handleNavigate("/contact")}>Contact</li>
          <li onClick={() => handleNavigate("/products")}>Products</li>
        </ul>

        {/* Auth Section */}
        <div className="mt-10">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-full bg-red-500 text-white py-2 rounded-md font-semibold">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton className= "" />
          </SignedIn>
        </div>
      </div>
    </div>
  )
}

export default MenuIcon
