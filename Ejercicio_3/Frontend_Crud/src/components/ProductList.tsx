import type { Producto } from "../types";


interface Props {
  productos: Producto[];
  onDelete: () => void;
  onUpdate: () => void;
}

const ProductList = ({ productos, onDelete }: Props) => {
  const eliminar = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: 'DELETE',
      });
      onDelete();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>ID Categoría</th>
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
            <td>
              <button className="btn btn-danger btn-sm" onClick={() => eliminar(p.id_producto)}>
                Eliminar
              </button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;