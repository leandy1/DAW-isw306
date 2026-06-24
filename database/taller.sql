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
 
-- ─────────────────────────────────────────
-- TABLAS DE CATÁLOGO
-- ─────────────────────────────────────────

CREATE TABLE marcas (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE estados (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE tecnicos (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE grupos (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE servicios (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  nombre   VARCHAR(100) NOT NULL UNIQUE,
  precio   DECIMAL(10,2) NOT NULL,
  grupo_id INT NOT NULL,
  FOREIGN KEY (grupo_id) REFERENCES grupos(id)
);

-- ─────────────────────────────────────────
-- DATOS
-- ─────────────────────────────────────────

INSERT INTO marcas (nombre) VALUES
  ('RAV4'), ('HYUNDAI'), ('HONDA'),
  ('TOYOTA'), ('SUZUKI'), ('FORD');

INSERT INTO estados (nombre) VALUES
  ('Completado'), ('Pendiente'), ('Esperando Pieza');

INSERT INTO tecnicos (nombre) VALUES
  ('Técnico 1'), ('Técnico 2'), ('Técnico 3');

INSERT INTO grupos (nombre) VALUES
  ('Mecanica'), ('Electricidad'), ('Carroceria'), ('Otros');

INSERT INTO servicios (nombre, precio, grupo_id) VALUES
  ('Cambio de aceite y filtro',  800,  (SELECT id FROM grupos WHERE nombre = 'Mecanica')),
  ('Frenos',                    1500,  (SELECT id FROM grupos WHERE nombre = 'Mecanica')),
  ('Suspensión y dirección',    2000,  (SELECT id FROM grupos WHERE nombre = 'Mecanica')),
  ('Transmisión y caja',        5000,  (SELECT id FROM grupos WHERE nombre = 'Mecanica')),
  ('Motor',                     8000,  (SELECT id FROM grupos WHERE nombre = 'Mecanica')),
  ('Correa de distribución',    3000,  (SELECT id FROM grupos WHERE nombre = 'Mecanica')),
  ('Diagnóstico eléctrico',      600,  (SELECT id FROM grupos WHERE nombre = 'Electricidad')),
  ('Sistema de arranque y batería', 1200, (SELECT id FROM grupos WHERE nombre = 'Electricidad')),
  ('Luces y señales',            500,  (SELECT id FROM grupos WHERE nombre = 'Electricidad')),
  ('Sistema de carga',          1800,  (SELECT id FROM grupos WHERE nombre = 'Electricidad')),
  ('Hojalatería y pintura',     4000,  (SELECT id FROM grupos WHERE nombre = 'Carroceria')),
  ('Vidrios y plásticos',       2500,  (SELECT id FROM grupos WHERE nombre = 'Carroceria')),
  ('Aire acondicionado',        3500,  (SELECT id FROM grupos WHERE nombre = 'Otros')),
  ('Alineación y balanceo',      900,  (SELECT id FROM grupos WHERE nombre = 'Otros')),
  ('Cambio de gomas',            700,  (SELECT id FROM grupos WHERE nombre = 'Otros')),
  ('Inspección general',         400,  (SELECT id FROM grupos WHERE nombre = 'Otros'))
