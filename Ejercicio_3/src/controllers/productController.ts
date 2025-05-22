import { Request, Response } from 'express';
import { pool } from '../db/connection';

// Crear nuevo producto
export const crearProducto = async (req: Request, res: Response) => {
  const { nombre_producto, descripcion, precio, id_categoria } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO Productos (nombre_producto, descripcion, precio, id_categoria) VALUES (?, ?, ?, ?)`,
      [nombre_producto, descripcion, precio, id_categoria || null]
    );
    res.status(201).json({ message: 'Producto creado', id_producto: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto', details: error });
  }
};

// Listar productos con su categoría e inventario
export const listarProductos = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.id_producto, p.nombre_producto, p.descripcion, p.precio, c.nombre_categoria, i.stock_actual, i.stock_minimo, i.fecha_actualizacion
       FROM Productos p
       LEFT JOIN Categorias c ON p.id_categoria = c.id_categoria
       LEFT JOIN Inventario i ON p.id_producto = i.id_producto`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar productos', details: error });
  }
};

// Actualizar producto
export const actualizarProducto = async (req: Request, res: Response) => {
  const id_producto = req.params.id;
  const { nombre_producto, descripcion, precio, id_categoria } = req.body;
  try {
    const [result] = await pool.query(
      `UPDATE Productos SET nombre_producto = ?, descripcion = ?, precio = ?, id_categoria = ? WHERE id_producto = ?`,
      [nombre_producto, descripcion, precio, id_categoria || null, id_producto]
    );
    if ((result as any).affectedRows === 0) {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto', details: error });
  }
};

// Eliminar producto
export const eliminarProducto = async (req: Request, res: Response) => {
  const id_producto = req.params.id;
  try {
    const [result] = await pool.query(
      `DELETE FROM Productos WHERE id_producto = ?`,
      [id_producto]
    );
    if ((result as any).affectedRows === 0) {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto', details: error });
  }
};
