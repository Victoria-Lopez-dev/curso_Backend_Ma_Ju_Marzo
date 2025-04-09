-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 09-04-2025 a las 00:18:49
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_productos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `ID` int(10) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Categoria` varchar(20) NOT NULL,
  `Descripcion` varchar(100) NOT NULL,
  `Peso` int(10) NOT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `Stock` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`ID`, `Nombre`, `Categoria`, `Descripcion`, `Peso`, `Precio`, `Stock`) VALUES
(1, 'Bolson_Mayor', 'Premium', 'Incluye la mejor seleccion de  14 variedades de frutas y verduras agroecologicas de estación', 10, '7000.00', 25),
(2, 'Bolson_Medio', 'Standar1', 'Incluye 10 variedades de frutas y verduras agroecologicas', 7, '4500.00', 90),
(3, 'Bolson_Chico', 'Standar2', 'Incluye 6 variedades de frutas y verduras agroecologicas', 4, '3000.00', 50),
(4, 'Bolson_HojasVerdes', 'Solo_Verdes', 'Incluye solo productos de hoja verde agroecologicas', 3, '2500.00', 112),
(5, 'Bolson_Frutas', 'Solo_Futas', 'Solo frutas agroecologicas de estacion', 7, '5500.00', 150),
(6, 'Bolson  Especial', 'Premium', 'Tipo gourmet', 7, '4500.00', 20);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
