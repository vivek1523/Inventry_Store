import React,{useState} from 'react'
import { BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import './Product.css'
import ProductsPage from './Components/ProductsPage'
import AddProducts from './Components/AddProducts'
import Footer from './Components/Footer'
//import DashBoard from './Components/DashBoard'

const Product = () => {
  return (
    <div className='Product'>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/products' element={<ProductsPage/>}/>
            <Route path='/addproducts' element={<AddProducts/>}/>
          </Routes>
          <Footer/>
        {/* <Navbar/>
        <Home/>
        <Link to="/viwe-products">View Products</Link> */}
    </div>
  )
}

export default Product
