import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProducts from './AddProducts';
import { useAuth } from '../Contexts/AuthContext';
import { message } from 'antd';
import useUniqueUser from '../Hooks/useUniqueUser'; 

const ProductSection = ({product}) => {
    const [products, setProducts] = useState(Array.isArray(product) ? product : []);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { getProducts, addProduct, updateProduct, deleteProduct } = useUniqueUser();
    const { token } = useAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            if (token) {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            }
        };
        fetchProducts();
    }, [token]);

    // const handleDelete = async (id) => {
    //     try {
    //         const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njg5OGNmYjJkMDQxOWM0NTcwN2MxZDMiLCJpYXQiOjE3MjAyOTA1NTYsImV4cCI6MTcyODA2NjU1Nn0.2AR0zyB8Sv8DAO5Q50O1chgnUbWOc2IejrQg92PMw_w'
    //          const config = {
    //             headers: { 'authorization': `Bearer ${token}` }
    //           };
    //         await axios.delete(`http://localhost:4000/api/auth/deleteproduct/${id}`, config);
    //         setProducts(products.filter((item) => item._id !== id));
    //         console.log("Product Deleted Successfully");
    //     } catch (error) {
    //         console.error("There was an error deleting the product!", error);
    //     }
    // };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter((item) => item._id !== id));
            message.success("Product Deleted Successfully");
        } catch (error) {
            console.error("There was an error deleting the product!", error);
        }
    };

    const handleUpdate = (product) => {
        setSelectedProduct(product);
    };

    // useEffect(() => {
    //     setProducts(Array.isArray(product) ? product : []);
    // }, [product]);

    return (
        <div className='d-flex justify-content-around align-items-center flex-wrap'>
            {products.map((item, index) => (
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
                    Userproducts={products}
                    setSelectedProduct={setSelectedProduct}
                />
            )}
        </div>
    );
};

export default ProductSection;