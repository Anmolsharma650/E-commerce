import axios from "axios"
import { createContext, useState, useCallback, useContext } from "react"

export const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([])

  const fetchAllProducts = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://dummyjson.com/products?limit=200&skip=0"
      )

      // 🔥 IMPORTANT FIX
      setData(res.data.products)

    } catch (error) {
      console.error(error)
    }
  }, [])
   
  const getUniqeCatagory = (data, property) => {
          let newVal = data?.map((curElem) => {
              return curElem[property]
          })
           newVal =["All",...new Set(newVal)]
           return newVal
      }
      const categoryOnlyData = getUniqeCatagory(data,'category')
      const brandOnlyData = getUniqeCatagory(data,'brand')

  return (
    <DataContext.Provider value={{ data, fetchAllProducts, categoryOnlyData ,brandOnlyData}}>
      {children}
    </DataContext.Provider>
  )
}

export const getData = () => useContext(DataContext)
