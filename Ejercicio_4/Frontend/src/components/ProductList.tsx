import type { Producto } from "../types";
import { useState } from "react";
import UpdateProduct from "./UpdateProduct";

interface Props {
  productos: Producto[];
  onDelete: () => void;
  onUpdate: () => void;
}

const ProductList = ({ productos, onDelete }: Props) => {
  const [formData, setFormData] = useState<Producto>();
  const [visible, setVisible] = useState(false);
  const deleteProduct = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: "DELETE",
      });
      onDelete();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const updateProduct = (data: Producto) => {
    setFormData({
      id_producto: data.id_producto,
      nombre_producto: data.nombre_producto,
      nombre_categoria:data.nombre_categoria,
      descripcion: data.descripcion,
      precio: data.precio,
      id_categoria: data.id_categoria,

    });
    setVisible(true);
  };
  const closeForm = () => {
    setVisible(false);
    onDelete();
  };

  return (
    <>
      {visible && <UpdateProduct onSave={closeForm} dataProduct={formData!} />}
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>ID Categoría</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id_producto}>
              <td>{p.id_producto}</td>
              <td>{p.nombre_producto}</td>
              <td>{p.descripcion}</td>
              <td>{p.precio}</td>
              <td>{p.id_categoria}</td>
              <td>{p.nombre_categoria}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(p.id_producto)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-outline-info btn-sm"
                  onClick={() => updateProduct(p)}
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
