// src/types.ts
export interface Producto {
  id_producto: number;
  nombre_producto: string;
  descripcion: string;
  precio: number;
  id_categoria: number | null;
}
