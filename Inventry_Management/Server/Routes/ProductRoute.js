const router = require('express').Router();
const Product = require('../Models/ProductModels');
//const Connect = require('../Connection/Mongo')

// Product POST Request
router.post('/addproducts', async (req, res) => {
  try {
    const data = req.body;
    const newProduct = new Product(data);
    await newProduct.save();
    res.status(200).json({ message: 'Product Added Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


// Products GET Request
router.get('/getproducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Products GET Request By ID
router.get('/getproducts/:id' ,async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id});
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
router.put('/updateproduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, price, image, productCount } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { productName, description, price, image, productCount },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product Updated Successfully', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Products DELETE Request
router.delete('/deleteproduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ _id: id });
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