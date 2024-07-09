import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext';

const useUniqueUser = () => {
  const { token } = useAuth();

  const addProduct = async (productData) => {
    try {
      const response = await axios.post('https://inventry-store-server.onrender.com/api/auth/addproducts', productData, {
        headers: {
          //'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get('https://inventry-store-server.onrender.com/api/auth/getproducts', {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  const updateProduct = async (productId, productData) => {
    try {
      const response = await axios.put(`https://inventry-store-server.onrender.com/api/auth/updateproduct/${productId}`, productData, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  };
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`https://inventry-store-server.onrender.com/api/auth/deleteproduct/${productId}`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      return null;
    }
  };

  return { getProducts, addProduct, updateProduct, deleteProduct };
};

export default useUniqueUser;
