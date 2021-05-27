import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// #desc  Fetch All Categories
// #route GET '/api/categories'
// #access Public
const getCategories = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Category.countDocuments({});
  const categories = await Category.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ categories, page, pages: Math.ceil(count / pageSize) });
});

// #desc  Fetch Single Category by id
// #route GET '/api/categories/id/:id'
// #access Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  res.json(category);
});

// #desc  Update a category
// #route PUT '/api/categories/id/:id'
// #access Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { title, article, url, image } = req.body;

  const category = await Category.findById(req.params.id);
  if (category) {
    category.title = title;
    category.article = article;
    category.url = url;
    category.image = image;
    const updatedCategory = category.save();
    return res.json(updatedCategory);
  }
  res.status(404);
  throw new Error('Category not found');
});

// #desc  Fetch Products by category url
// #route GET '/api/categories/url/:url'
// #access Public
const getProductsByCategoryUrl = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const sortByPrice = Number(req.query.orderByPrice)
    ? {
        price: Number(req.query.orderByPrice),
      }
    : null;

  let category = await Category.find({ url: req.params.url });
  category = category[0];
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }
  const count = await Product.countDocuments({ category: category._id });
  let products = await Product.find({ category: category._id })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sortByPrice);

  if (!products) {
    res.status(404);
    throw new Error('No products found under the category');
  }
  res.json({ category, products, page, pages: Math.ceil(count / pageSize) });
});

// #desc  Delete a category
// #route GET '/api/categories/:id'
// #access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('Product not found');
  }
  await category.remove();
  res.json({ message: 'Category removed' });
});

// #desc  Create a category
// #route POST '/api/categories'
// #access Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    title: 'Sample Title',
    article: 'Sample Article',
    url: `sample-name${Math.random().toString(36).slice(2)}`,
    name: 'Sample name',
  });

  const createdCategory = await category.save();

  res.status(201).json(createdCategory);
});

export {
  getCategories,
  getProductsByCategoryUrl,
  deleteCategory,
  getCategoryById,
  updateCategory,
  createCategory,
};
