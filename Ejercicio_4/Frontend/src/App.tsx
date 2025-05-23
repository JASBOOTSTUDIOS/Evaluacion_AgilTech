import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home/Home';
import Productos from './pages/Productos/Productos';
import Categorias from './pages/Categorias/Categorias';

function App() {
  return (
    <div className="container py-4">
      <nav className="mb-4">
        <NavLink to="/" className="btn btn-outline-primary me-2">Inicio</NavLink>
        <NavLink to="/productos" className="btn btn-outline-primary me-2">Productos</NavLink>
        <NavLink to="/categorias" className="btn btn-outline-primary">Categorías</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </div>
  );
}

export default App;
