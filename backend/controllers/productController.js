import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// #desc  Fetch All Products
// #route GET '/api/products'
// #access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .populate('category', 'title')
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// #desc  Fetch Single Product by id
// #route GET '/api/products/:id'
// #access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    'category',
    'title'
  );
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// #desc  Fetch Single Product by url
// #route GET '/api/products/:url'
// #access Public
const getProductByUrl = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ url: req.params.url });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// #desc  Delete a product
// #route GET '/api/products/id/:id'
// #access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await product.remove();
  res.json({ message: 'Product removed' });
});

// #desc  Create a product
// #route POST '/api/products'
// #access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    brand: 'Sample brand',
    numReviews: 0,
    url: `sample-name${Math.random().toString(36).slice(2)}`,
    description: 'Sample description',
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// #desc  Update a product
// #route PUT '/api/products/id/:id'
// #access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    url,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.url = url;
    if (category) {
      product.category = category;
    }
    product.countInStock = countInStock;
    const updatedProduct = product.save();
    return res.json(updatedProduct);
  }
  res.status(404);
  throw new Error('Product not found');
});

// #desc  Create new review
// #route POST '/api/products/id/:id/reviews'
// #access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  }
  res.status(404);
  throw new Error('Product not found');
});

// #desc  Get Top Rated Products
// #route GET '/api/products/top'
// #access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getProductById,
  getProducts,
  getProductByUrl,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
};
