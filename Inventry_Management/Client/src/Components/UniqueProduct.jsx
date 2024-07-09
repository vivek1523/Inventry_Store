import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import useUniqueUser from '../Hooks/useUniqueUser'; 

const Products = () => {

    const { getProducts, addProducts} = useUniqueUser();

    const [products, setProducts] = useState([]);
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

    return (
        <div>
            {products.map(product => (
                <div key={product._id}>
                    <h3>{product.productName}</h3>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <img src={product.image} alt={product.productName} />
                </div>
            ))}
        </div>
    );
};

export default Products;
