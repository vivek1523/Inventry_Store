import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import ProductSection from './ProductSection'

const ProductsPage = () => {
  const [product, setProduct] = useState([])

  useEffect(() => {
      const fetch = async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njg5OGNmYjJkMDQxOWM0NTcwN2MxZDMiLCJpYXQiOjE3MjAyOTA1NTYsImV4cCI6MTcyODA2NjU1Nn0.2AR0zyB8Sv8DAO5Q50O1chgnUbWOc2IejrQg92PMw_w'
        const config = {
          headers: { 'authorization': `Bearer ${token}` }
        };

        
        try {
            const res = await axios.get("http://localhost:4000/api/auth/getproducts",config)
              setProduct(res.data.products); 
        } catch (error) {
            console.error("There was an error fetching the products!", error);
        }
      }
      fetch();
  },[]);
  
  return (
    <div className='bg-dark' style={{ minHeight:"91.5vh"}}>
      <div className='d-flex justify-content-center align-items-center py-3'>
        <h3 className='text-white'>Products Section</h3>
      </div>
      { product.length > 0 ? <ProductSection product={product}/>:<div className='text-white'>Please Add Products</div>}
    </div>
  )
}

export default ProductsPage
