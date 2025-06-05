-- init.sql
-- Script de inicialización de la base de datos de usuarios.

-- Elimina la tabla de usuarios si ya existe
DROP TABLE IF EXISTS usuarios;

-- Crea la tabla de usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,                   -- Identificador único
  email VARCHAR(100) NOT NULL UNIQUE,                  -- Email del usuario (único)
  nom VARCHAR(100) NOT NULL,                           -- Nombre del usuario
  contrasenya VARCHAR(255) NOT NULL,                   -- Contraseña (encriptada con bcrypt)
  rol ENUM('admin', 'operador') NOT NULL               -- Rol del usuario (admin u operador)
);

-- Inserta dos usuarios por defecto: uno administrador y uno operador
-- Las contraseñas están encriptadas con bcrypt (12 rondas)
INSERT INTO usuarios (email, nom, contrasenya, rol) VALUES
('aa0000a', 'Administrador', '$2b$12$k25iwCrhhCskzGahoSzQ.uLD/M2Q7qaWSKoHXY7k9tFSc1ZOHwiOW', 'admin'),
('operador', 'Operador', '$2b$12$QQZOihZeN3nfJdD5yeOGwuk3PysHq.RtNxDPBmyixPAdI762W5Spy', 'operador');
