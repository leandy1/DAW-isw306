CREATE DATABASE IF NOT EXISTS taller_mecanico;
USE taller_mecanico;
 
-- Tabla principal de citas
CREATE TABLE citas (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  nombre          VARCHAR(100) NOT NULL,
  apellido        VARCHAR(100) NOT NULL,
  cedula          VARCHAR(20),
  telefono        VARCHAR(20),
  correo          VARCHAR(100),
  marca           VARCHAR(50),
  modelo          VARCHAR(50),
  anio            YEAR,
  placa           VARCHAR(20),
  color           VARCHAR(30),
  tiposServicios  TEXT,
  tecnicoAsignado VARCHAR(100),
  estado          VARCHAR(50) DEFAULT 'Pendiente',
  descripcion     TEXT,
  total           DECIMAL(10,2),
  creado_en       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
-- Tabla de configuracion (servicios, tecnicos, estados, marcas)
CREATE TABLE configuracion (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  tipo    VARCHAR(50) NOT NULL,
  nombre  VARCHAR(100) NOT NULL,
  precio  DECIMAL(10,2),
  grupo   VARCHAR(50)
);
 
-- Datos iniciales de configuracion
INSERT INTO configuracion (tipo, nombre, precio, grupo) VALUES
('servicio', 'Cambio de aceite y filtro', 800, 'Mecanica'),
('servicio', 'Frenos', 1500, 'Mecanica'),
('servicio', 'Transmision y caja', 5000, 'Mecanica'),
('servicio', 'Diagnostico electrico', 600, 'Electricidad'),
('servicio', 'Hojalateria y pintura', 4000, 'Carroceria'),
('tecnico', 'Tecnico 1', NULL, NULL),
('tecnico', 'Tecnico 2', NULL, NULL),
('tecnico', 'Tecnico 3', NULL, NULL),
('estado', 'Pendiente', NULL, NULL),
('estado', 'Completado', NULL, NULL),
('estado', 'Esperando Pieza', NULL, NULL),
('marca', 'HONDA', NULL, NULL),
('marca', 'TOYOTA', NULL, NULL),
('marca', 'HYUNDAI', NULL, NULL);
