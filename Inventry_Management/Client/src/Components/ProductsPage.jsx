import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import ProductSection from './ProductSection'

const ProductsPage = () => {
  const [product, setProduct] = useState()

  useEffect(() => {
      const fetch = async()=>{
        await axios.get("http://localhost:4000/api/auth/getproducts")
        .then((res)=>{
          setProduct(res.data.products);
        })
      }
      fetch();
  })
  
  return (
    <div className='bg-dark' style={{ minHeight:"91.5vh"}}>
      <div className='d-flex justify-content-center align-items-center py-3'>
        <h3 className='text-white'>Products Section</h3>
      </div>
      { product ? <ProductSection product={product}/>:<div className='text-white'>Loading.....</div>}
    </div>
  )
}

export default ProductsPage