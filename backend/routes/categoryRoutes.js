import express from 'express';
const router = express.Router();
import {
  getCategories,
  getProductsByCategoryUrl,
  deleteCategory,
  getCategoryById,
  updateCategory,
  createCategory,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getCategories).post(protect, admin, createCategory);
router.route('/:url').get(getProductsByCategoryUrl);
router
  .route('/id/:id')
  .get(getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory);

export default router;
