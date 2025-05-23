import { useEffect, useState } from 'react';
import CreateProduct from '../../components/CreateProduct';
import ProductoList from '../../components/ProductList';
import type { Producto } from '../../types';

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  const cargarProductos = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch('http://localhost:3000/api/productos',{
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <CreateProduct onSave={cargarProductos} />
     {productos &&  <ProductoList productos={productos} onDelete={cargarProductos} onUpdate={cargarProductos} />}
    </div>
  );
};

export default Productos;