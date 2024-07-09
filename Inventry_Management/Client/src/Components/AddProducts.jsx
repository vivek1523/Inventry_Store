import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { message } from 'antd';
import useUniqueUser from '../Hooks/useUniqueUser';

const AddProducts = ({ product, setProducts, Userproducts , setSelectedProduct }) => {
  const [prod, setProd] = useState({
    productName: "",
    description: "",
    price: "",
    Image: "",
    productCount: "",
  });

  const { addProduct, updateProduct } = useUniqueUser();

  useEffect(() => {
    if (product) {
      setProd({
        productName: product.productName,
        description: product.description,
        price: product.price,
        Image: product.Image,
        productCount: product.productCount,
      });
    }
  }, [product]);

  const productChange = (e) => {
    const { name, value } = e.target;
    setProd({ ...prod, [name]: value });
  };

  const HandleSubmit = async (e) => {
        e.preventDefault();
        //const token = localStorage.getItem('user_data')?.userToken;
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Njg5OGNmYjJkMDQxOWM0NTcwN2MxZDMiLCJpYXQiOjE3MjAyOTA1NTYsImV4cCI6MTcyODA2NjU1Nn0.2AR0zyB8Sv8DAO5Q50O1chgnUbWOc2IejrQg92PMw_w'
        // const config = {
        //   headers: { 'authorization': `Bearer ${token}` }
        // };
    
        try {
          if (product) {
            // Updating Exsisting Product
            //const res = await axios.put(`http://localhost:4000/api/auth/updateproduct/${product._id}`, prod,config)
            const res = await updateProduct(product._id, prod);
                //message.success(res.data.message);
                message.success(res.message);
                setProducts(Userproducts.map((item) => (item._id === product._id ? { ...item, ...prod } : item)));
                setSelectedProduct(null);
          } else {
            // Adding New Product
            //const res = await axios.post("http://localhost:4000/api/auth/addproducts", prod, config)
            const res = await addProduct(prod);
                //message.success(res.data.message);
                message.success(res.message);
                setProducts(Array.isArray(Userproducts) ? [...Userproducts, res.data.product]: [res.data.product]);
                //setProducts([...Userproducts, res.product]);
          }
          setProd({
            productName: "",
            description: "",
            price: "",
            Image: "",
            productCount: "",
          });  
        } catch (error) {
          console.error("Error submitting the product:", error);
        }
      };

  return (
    <div className='bg-dark d-flex justify-content-center align-items-center' style={{ minHeight: "91.5vh" }}>
      <div className='container'>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label text-white">Product Name</label>
          <input type="text" name='productName' value={prod.productName} className="form-control" id="exampleFormControlInput1" placeholder="Enter Your Product" onChange={productChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor="exampleFormControlInput1" className="form-label text-white">Product Price</label>
          <input type="number" name='price' value={prod.price} className="form-control" id="exampleFormControlInput1" placeholder="Enter the Product Price" onChange={productChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor="exampleFormControlInput1" className="form-label text-white">Stock Count</label>
          <input type="number" name='productCount' value={prod.productCount} className="form-control" id="exampleFormControlInput1" placeholder="Enter The Product Count" onChange={productChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor="exampleFormControlInput1" className="form-label text-white">Image URL</label>
          <input type="text" name='Image' value={prod.Image} className="form-control" id="exampleFormControlInput1" placeholder="Enter The Product Count" onChange={productChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor="exampleFormControlInput1" className="form-label text-white">Product Description</label>
          <textarea name='description' value={prod.description} className="form-control" id="exampleFormControlInput1" placeholder="Enter The Product Count" rows={3} onChange={productChange} />
        </div>
        <button className='btn btn-success' onClick={HandleSubmit}>{product ? 'Update' : 'Submit'}</button>
      </div>
    </div>
  )
}

export default AddProducts;
