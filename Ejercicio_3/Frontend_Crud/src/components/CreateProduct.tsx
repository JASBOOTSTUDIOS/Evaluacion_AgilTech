import { useState } from 'react';

interface Props {
  onSave: () => void;
}

const CreateProduct = ({ onSave }: Props) => {
  const [formData, setFormData] = useState({
    nombre_producto: '',
    descripcion: '',
    precio: '',
    id_categoria: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          precio: parseFloat(formData.precio),
          id_categoria: parseInt(formData.id_categoria),
        }),
      });
      setFormData({
        nombre_producto: '',
        descripcion: '',
        precio: '',
        id_categoria: '',
      });
      onSave();
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col">
          <input
            type="text"
            name="nombre_producto"
            className="form-control"
            placeholder="Nombre"
            value={formData.nombre_producto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="descripcion"
            className="form-control"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            type="number"
            name="precio"
            className="form-control"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col">
          <input
            type="number"
            name="id_categoria"
            className="form-control"
            placeholder="ID Categoría"
            value={formData.id_categoria}
            onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-success">Agregar</button>
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;