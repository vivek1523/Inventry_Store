const router = require('express').Router();
const Product = require('../Models/ProductModels');
const { authMiddleware }= require('../Controllers/AuthController');
//const Connect = require('../Connection/Mongo')

//Product POST Request
router.post('/addproducts', authMiddleware,async (req, res) => {
  const { productName, description, price, Image, productCount } = req.body;
  try {
    const newProduct = new Product({
        //...req.body,
      productName,
      description,
      price,
      Image,
      productCount,
        user: req.user._id 
    });
    const savedProduct = await newProduct.save();
    res.status(200).json({ product: savedProduct, message: 'Product added successfully' });
} catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
}
});


//Products GET Request
router.get('/getproducts', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Products GET Request By ID
router.get('/getproducts/:id' , authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id, user: req.user._id});
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Products UPDATE Request
router.put('/updateproduct/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, price, image, productCount } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { productName, description, price, image, productCount },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ product: updatedProduct, message: 'Product updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Products DELETE Request
router.delete('/deleteproduct/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndDelete({ _id: id, user: req.user._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(201).json({ message: 'Product Deleted Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;