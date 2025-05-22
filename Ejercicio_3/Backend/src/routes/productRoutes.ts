import { Router } from 'express';
import {
  crearProducto,
  listarProductos,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productController';

const router = Router();

router.post('/productos', crearProducto);
router.get('/productos', listarProductos);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;
