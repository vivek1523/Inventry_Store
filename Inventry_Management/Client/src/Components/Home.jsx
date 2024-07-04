import React from 'react'
import '../Product.css'
import '../Styles/Home.css'
import Stock from '../Images/Inventry_home-removebg.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
   <div>
    <div className='Home-Page bg-dark text-white container-fluid d-flex justify-content-center align-items-center'>
      <div className='row container'>
        <div className='col-lg-6 d-flex justify-content-center align-items-start flex-column' style={{ height:"91.5vh"}}>
           <h2 style={{fontSize:"70px"}}>INVENTRY STORE FOR</h2>
           <h2 style={{fontSize:"40px"}}>ADMIN</h2>
           <p className='mb-0' style={{color:"silver"}}>See the Stored Products</p>
           <Link to='/dashboard/products' className='ViewBooks my-3'>View Products</Link>
        </div>
      <div className='col-lg-6 d-flex justify-content-center align-items-center' style={{ height:"91.5vh"}}>
           <img className='Img' src={Stock} alt='/'/>
        </div>
    </div>
    </div>
   </div> 
  )
}

export default Home