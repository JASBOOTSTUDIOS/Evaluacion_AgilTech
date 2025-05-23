import { Router } from 'express';
import {
  createProduct,
  listProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authMiddleware } from '../middleware/AuthMiddleware';

const router = Router();

router.post('/productos',authMiddleware, createProduct);
router.get('/productos',authMiddleware, listProduct);
router.put('/productos/:id',authMiddleware, updateProduct);
router.delete('/productos/:id',authMiddleware, deleteProduct);

export default router;
