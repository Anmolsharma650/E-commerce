import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Cart from './Pages/Cart'
import Header from './component/Header/Header'
import MenuIcon from './Pages/MenuIcon'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Footer from './component/Footer'
import SingleProductPage from './Pages/singleProductPage'


function App() {
  const [location, setlocation] = useState()
  const [openDropDown,setOpenDropDown]= useState(false)
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLoctaion = location.data.address
        setlocation(exactLoctaion)
        setOpenDropDown(false)
        console.log(exactLoctaion);
        
      } catch (error) {
        console.log(error);

      }
    })

  }
  
  return (
    <BrowserRouter>
      <Header location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart location={location} getLocation={getLocation}/>} />
        <Route path="/menuicon" element={<MenuIcon />} />
      </Routes>
     <Footer/>
    </BrowserRouter>
  )
}

export default App
