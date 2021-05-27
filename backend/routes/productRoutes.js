import express from 'express';
const router = express.Router();
import {
  getProductById,
  getProductByUrl,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/url/:url').get(getProductByUrl);
router.get('/top', getTopProducts);
router
  .route('/id/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route('/id/:id/reviews').post(protect, createProductReview);

export default router;
