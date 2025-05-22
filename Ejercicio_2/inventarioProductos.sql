
CREATE DATABASE inventario;
USE inventario;


CREATE TABLE Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
) ENGINE=InnoDB;


CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Inventario (
    id_inventario INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT UNIQUE,
    stock_actual INT NOT NULL,
    stock_minimo INT DEFAULT 0,
    fecha_actualizacion DATE,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_nombre_producto ON Productos(nombre_producto);
CREATE INDEX idx_categoria_producto ON Productos(id_categoria);
CREATE INDEX idx_inventario_producto ON Inventario(id_producto);




