import { Router } from 'express';
import {
  createProduct,
  listProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = Router();

router.post('/productos', createProduct);
router.get('/productos', listProduct);
router.put('/productos/:id', updateProduct);
router.delete('/productos/:id', deleteProduct);

export default router;
