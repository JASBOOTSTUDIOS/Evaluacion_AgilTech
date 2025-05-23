export type Product = {
  id_producto?: number;
  nombre_producto: string;
  descripcion: string;
  precio: number;
  id_categoria: number;
  nombre_categoria?: string;
  stock_actual?: number;
}
