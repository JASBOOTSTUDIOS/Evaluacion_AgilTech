
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



USE inventario;


INSERT INTO Categorias (nombre_categoria) VALUES
('Electrónica'),
('Ropa'),
('Alimentos'),
('Juguetes'),
('Hogar');


INSERT INTO Productos (nombre_producto, descripcion, precio, id_categoria) VALUES
('Televisor LED 42"', 'Televisor de alta definición Full HD', 350.00, 1),
('Smartphone Galaxy', 'Teléfono inteligente de última generación', 799.99, 1),
('Laptop HP', 'Portátil para estudiantes y profesionales', 620.00, 1),
('Camisa Casual', 'Camisa de algodón para hombre', 25.50, 2),
('Pantalón Jean', 'Pantalón denim azul oscuro', 35.00, 2),
('Zapatos Deportivos', 'Zapatos cómodos para correr', 50.00, 2),
('Arroz 10kg', 'Saco de arroz premium', 12.75, 3),
('Aceite Vegetal', 'Botella de 1 litro', 3.20, 3),
('Leche Entera', 'Caja de leche de 1L', 1.10, 3),
('Cereal Infantil', 'Cereal fortificado para niños', 4.80, 3),
('Muñeca Barbie', 'Muñeca clásica de colección', 18.99, 4),
('Carro de Juguete', 'Auto a control remoto', 22.50, 4),
('Lego City', 'Juego de construcción para niños', 39.90, 4),
('Silla de Oficina', 'Silla ergonómica ajustable', 89.00, 5),
('Lámpara LED', 'Lámpara de escritorio con luz blanca', 19.99, 5),
('Escritorio de Madera', 'Mesa para oficina o estudio', 129.99, 5),
('Microondas', 'Horno microondas con grill', 98.50, 1),
('Camiseta Blanca', 'Camiseta básica unisex', 10.00, 2),
('Toalla de Baño', 'Toalla 100% algodón', 7.80, 5),
('Juego de Sábanas', 'Sábanas suaves de microfibra', 45.00, 5);


INSERT INTO Inventario (id_producto, stock_actual, stock_minimo, fecha_actualizacion) VALUES
(1, 15, 5, '2025-05-20'),
(2, 10, 3, '2025-05-20'),
(3, 8, 2, '2025-05-20'),
(4, 30, 10, '2025-05-20'),
(5, 25, 10, '2025-05-20'),
(6, 20, 5, '2025-05-20'),
(7, 50, 20, '2025-05-20'),
(8, 60, 15, '2025-05-20'),
(9, 40, 10, '2025-05-20'),
(10, 35, 10, '2025-05-20'),
(11, 12, 3, '2025-05-20'),
(12, 18, 5, '2025-05-20'),
(13, 10, 4, '2025-05-20'),
(14, 7, 2, '2025-05-20'),
(15, 14, 5, '2025-05-20'),
(16, 5, 2, '2025-05-20'),
(17, 11, 3, '2025-05-20'),
(18, 50, 10, '2025-05-20'),
(19, 30, 8, '2025-05-20'),
(20, 9, 3, '2025-05-20');



