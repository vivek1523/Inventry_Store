// import React from 'react'

// const ProductSection = ({ product }) => {
//     console.log(product);
//   return (
//     <div className='d-flex justify-content-center align-items-center flex-column'>
//        {product && product.map((item,index)=>{
//         <>
//         <div className='text-white '>{item.productName}</div>
//         </>
//        })}
//     </div>
//   )
// }

// export default ProductSection

// import React from 'react';
// import axios from 'axios';
// import { useState,useEffect } from 'react';

// const ProductSection = ({ product }) => {
//     const [products, setProducts] = useState(product);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:4000/api/auth/deleteproduct/${id}`);
//             setProducts(products.filter((item) => item._id !== id));
//             console.log("Product Deleted Successfully");
//         } catch (error) {
//             console.error("There was an error deleting the product!", error);
//         }
//     };

//     const handleUpdate = async (id) => {
//         const updatedProduct = prompt("Enter updated product details in JSON format:", JSON.stringify(products.find((item) => item._id === id)));
//         if (updatedProduct) {
//             try {
//                 const productData = JSON.parse(updatedProduct);
//                 await axios.put(`http://localhost:4000/api/auth/updateproduct/${id}`, productData);
//                 setProducts(products.map((item) => (item._id === id ? { ...item, ...productData } : item)));
//                 console.log("Product Updated Successfully");
//             } catch (error) {
//                 console.error("There was an error updating the product!", error);
//             }
//         }
//     };

//     useEffect(() => {
//         setProducts(product);
//     }, [product]);
//     return (
//         <div className='d-flex justify-content-around align-items-center flex-wrap'>
//             {product && product.map((item, index) => (
//                 <div key={index} className='m-3' style={{width:"200px", height:"350px", border:"1px solid white", borderRadius:"20px"}}>
//                     <div>
//                         <img style={{width:"200px", height:"210px", borderTopLeftRadius:"20px",borderTopRightRadius:"20px"}} className='img-fluid' src={item.Image} alt='/'/>
//                     </div>
//                     <h5 style={{fontSize:"17px"}} className='px-2 my-1 text-white'>{item.productName} </h5>
//                     <p style={{fontSize:"30px", color:"red"}} className='m-0 px-2'>Price - {item.price}</p>
//                     <div className='d-flex justify-content-between align-items-center my-2'>
//                     <button className='btn btn-primary' onClick={() => handleUpdate(item._id)}>Update</button>
//                         <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
//                     </div>
//                 </div>
                
//             ))}
//         </div>
//     );
// }

// export default ProductSection;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProducts from './AddProducts'; 

const ProductSection = ({ product }) => {
    const [products, setProducts] = useState(product);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/auth/deleteproduct/${id}`);
            setProducts(products.filter((item) => item._id !== id));
            console.log("Product Deleted Successfully");
        } catch (error) {
            console.error("There was an error deleting the product!", error);
        }
    };

    const handleUpdate = (product) => {
        setSelectedProduct(product);
    };

    useEffect(() => {
        setProducts(product);
    }, [product]);

    return (
        <div className='d-flex justify-content-around align-items-center flex-wrap'>
            {products && products.map((item, index) => (
                <div key={index} className='m-3' style={{width:"300px", height:"auto", border:"1px solid white", borderRadius:"20px"}}>
                    <div>
                        <img style={{width:"300px", height:"240px", borderTopLeftRadius:"20px",borderTopRightRadius:"20px"}} className='img-fluid' src={item.Image} alt='/'/>
                    </div>
                    <h5 style={{fontSize:"17px"}} className='px-2 my-1 text-white'>{item.productName} </h5>
                    <p style={{fontSize:"20px" , color:"white"}} className='m-0 px-2'>Price - {item.price}</p>
                    <p style={{fontSize:"20px", color:"white"}} className='m-0 px-2'>InStock - {item.productCount}</p>
                    <p style={{fontSize:"15px", color:"white"}} className='m-0 px-2'>Description - {item.description}</p>
                    <div className='d-flex justify-content-between align-items-center my-2'>
                        <button className='btn btn-primary' onClick={() => handleUpdate(item)}>Update</button>
                        <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                </div>
            ))}
            {selectedProduct && (
                <AddProducts
                    product={selectedProduct}
                    setProducts={setProducts}
                    products={products}
                    setSelectedProduct={setSelectedProduct}
                />
            )}
        </div>
    );
};

export default ProductSection;
