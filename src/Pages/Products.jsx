import React, { useEffect, useState } from 'react'
import { getData } from '../Context/DataContext'
import Filtersection from '../component/Filtersection'
import Loading from "../assets/Loading4.webm"
import ProductCard from '../component/ProductCard'
import Pagination from '../component/Pagination'
import Lottie from 'lottie-react'
import notfound from "../assets/notfound.json"

function Products() {
  const { data, fetchAllProducts } = getData()
  const [search, setSearch] = useState("")
  const [Category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [pricerange, setPriceRange] = useState([0, 5000])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchAllProducts()
    window.scrollTo(0, 0)
  }, [])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setPage(1)
  }

  const handleBrandChange = (e) => {
    setBrand(e.target.value)
    setPage(1)
  }

  const pageHandler = (selectedPage) => {
    setPage(selectedPage)
  }

  const filterData = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (Category === "All" || item.category === Category) &&
    (brand === "All" || item.brand === brand) &&
    item.price >= pricerange[0] && item.price <= pricerange[1]
  )

  const totalPages = Math.ceil(filterData?.length / 12)

  return (
    <div className='max-w-7xl mx-auto mb-10 px-4'>
      {
        data?.length > 0 ? (
          <div className='flex flex-col lg:flex-row gap-8'>

            {/* Filter Section */}
            <div className='w-full lg:w-1/4'>
              <Filtersection
                search={search}
                setSearch={setSearch}
                Category={Category}
                setCategory={setCategory}
                brand={brand}
                setBrand={setBrand}
                pricerange={pricerange}
                setPriceRange={setPriceRange}
                handleBrandChange={handleBrandChange}
                handleCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Product Section */}
            <div className='w-full lg:w-3/4 flex flex-col items-center'>

              {
                filterData?.length > 0 ? (
                  <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full'>
                      {
                        filterData
                          ?.slice(page * 12 - 12, page * 12)
                          .map((product, index) => (
                            <ProductCard key={index} product={product} />
                          ))
                      }
                    </div>

                    <div className='mt-8'>
                      <Pagination
                        page={page}
                        pageHandler={pageHandler}
                        dynamicPage={totalPages}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center w-full mt-16">
                    <Lottie animationData={notfound} className="w-[250px] sm:w-[350px] md:w-[450px]" />
                  </div>
                )
              }

            </div>
          </div>
        ) : (
          <div className='flex justify-center items-center h-[400px]'>
            <video muted autoPlay loop className='w-40 sm:w-52 md:w-64'>
              <source src={Loading} type='video/webm' />
            </video>
          </div>
        )
      }
    </div>
  )
}

export default Products
