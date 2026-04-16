-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-03-2026 a las 07:28:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `subastas_ortega`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`) VALUES
(2, 'Artículos vintage'),
(3, 'Coleccionables'),
(7, 'Complementos'),
(6, 'Cuerdas'),
(1, 'Instrumentos musicales'),
(5, 'Percusion'),
(4, 'Vientos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `condicion_objeto`
--

CREATE TABLE `condicion_objeto` (
  `id_condicion_objeto` int(11) NOT NULL,
  `condicion` int(11) DEFAULT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `condicion_objeto`
--

INSERT INTO `condicion_objeto` (`id_condicion_objeto`, `condicion`, `nombre`) VALUES
(1, 1, 'Muy dañado'),
(2, 2, 'Dañado'),
(3, 3, 'Muy desgastado'),
(4, 4, 'Desgastado'),
(5, 5, 'Estado regular'),
(6, 6, 'Aceptable'),
(7, 7, 'Buen estado'),
(8, 8, 'Muy buen estado'),
(9, 9, 'Excelente estado'),
(10, 10, 'Perfecto estado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_objeto`
--

CREATE TABLE `estado_objeto` (
  `id_estado_objeto` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_objeto`
--

INSERT INTO `estado_objeto` (`id_estado_objeto`, `nombre`) VALUES
(1, 'activo'),
(3, 'comprado'),
(4, 'eliminado'),
(2, 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pago`
--

CREATE TABLE `estado_pago` (
  `id_estado_pago` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_pago`
--

INSERT INTO `estado_pago` (`id_estado_pago`, `nombre`) VALUES
(2, 'en proceso'),
(1, 'pendiente'),
(3, 'realizado'),
(4, 'rechazado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_subasta`
--

CREATE TABLE `estado_subasta` (
  `id_estado_subasta` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_subasta`
--

INSERT INTO `estado_subasta` (`id_estado_subasta`, `nombre`) VALUES
(1, '(Borrador)'),
(4, 'Cancelada\r '),
(3, 'Finalizada'),
(2, 'Publicada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_usuario`
--

CREATE TABLE `estado_usuario` (
  `id_estado_usuario` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_usuario`
--

INSERT INTO `estado_usuario` (`id_estado_usuario`, `nombre`) VALUES
(1, 'activo'),
(2, 'bloqueado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objeto`
--

CREATE TABLE `objeto` (
  `id_objeto` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `descripcion` text NOT NULL,
  `id_estado_objeto` int(11) NOT NULL,
  `id_condicion_objeto` int(11) NOT NULL,
  `fecha_registro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `objeto`
--

INSERT INTO `objeto` (`id_objeto`, `id_vendedor`, `nombre`, `descripcion`, `id_estado_objeto`, `id_condicion_objeto`, `fecha_registro`) VALUES
(1, 1, 'Guitarra eléctrica vintage', 'Guitarra eléctrica estilo clásico, excelente sonido.', 3, 7, '2026-02-15 20:30:00'),
(2, 1, 'Tocadiscos Retro', 'Tocadiscos con estética vintage, funcional.', 3, 5, '2026-02-17 07:51:00'),
(3, 1, 'Bajo eléctrico blanco y negro', 'Bajo con estética yin-yang, detalles únicos.', 3, 9, '2026-02-27 14:10:00'),
(6, 1, 'Pruebaaaa2222', 'Probando Postmalone sisisiissisisiis.', 1, 2, '2026-03-19 20:11:03'),
(16, 1, 'Violín Antiguo', 'Violín marrón amaderado creado en 1970, manipulado por músicos reconocidos a nivel latinoamericano', 1, 4, '2026-03-20 23:33:14'),
(17, 1, 'Guitarra acústica antigua', 'Considerados uno de los instrumentos de más fácil aprendizaje, perfecto para conciertos folclóricos y arte al diseño más antiguo', 1, 5, '2026-03-20 23:43:28'),
(18, 2, 'Altavoz dorado Marshall exclusivo', 'Diseño premium y sonido potente. Estilo vintage con acabados elegantes, ideal para amantes de la música que buscan calidad, presencia y distinción.', 2, 9, '2026-03-20 23:43:29'),
(19, 2, 'Telas alfombra ', 'Tela con utilidad de alfombra para decorar tu set de estudio y hacerlo sentir como tu hogar', 2, 10, '2026-03-21 00:10:28'),
(20, 2, 'Disco de Vinilo - Queen', 'Sonido clásico y auténtico. Ideal para coleccionistas y amantes del rock, ofrece una experiencia musical cálida con gran valor nostálgico.', 1, 7, '2026-03-21 16:35:01'),
(21, 2, 'Bateria Yamaha ', 'Batería completa con todas sus partes incluidas,  ', 1, 8, '2026-03-21 16:42:23'),
(28, 2, 'Gramófono edicion beta', ' Gramófono clásico de estilo vintage, pieza decorativa y funcional que evoca la elegancia del pasado. Ideal para coleccionistas y amantes de la música retro.', 1, 5, '2026-03-22 00:17:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objeto_categoria`
--

CREATE TABLE `objeto_categoria` (
  `id_objeto` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `objeto_categoria`
--

INSERT INTO `objeto_categoria` (`id_objeto`, `id_categoria`) VALUES
(1, 1),
(1, 2),
(1, 4),
(1, 6),
(2, 2),
(2, 3),
(3, 1),
(6, 1),
(6, 6),
(16, 1),
(16, 2),
(16, 3),
(16, 6),
(17, 1),
(17, 2),
(17, 3),
(17, 6),
(18, 2),
(18, 3),
(18, 7),
(19, 2),
(19, 3),
(20, 3),
(21, 1),
(21, 2),
(21, 5),
(28, 2),
(28, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objeto_imagen`
--

CREATE TABLE `objeto_imagen` (
  `id_imagen` int(11) NOT NULL,
  `id_objeto` int(11) NOT NULL,
  `url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `objeto_imagen`
--

INSERT INTO `objeto_imagen` (`id_imagen`, `id_objeto`, `url`) VALUES
(1, 1, 'Guitarra_El_ctrica_Vintage_V100_TSB_01.jpg'),
(2, 2, 'tocadiscosretro.jpg'),
(3, 3, 'bajowhiteandblack.jpg'),
(4, 16, 'objeto-69be2d9b12554.png'),
(5, 17, 'objeto-69be300103ff0.jpg'),
(6, 18, 'objeto-69be300261d88.jpg'),
(7, 19, 'objeto-69be36551d5f7.jpg'),
(8, 19, 'objeto-69be42b29686f.png'),
(9, 19, 'objeto-69be42c0c1ff5.jpg'),
(10, 19, 'objeto-69be42c1563b3.jpg'),
(11, 20, 'objeto-69bf1d162cfc1.png'),
(12, 21, 'objeto-69bf1ecfeee02.jpg'),
(15, 16, 'objeto-69bf71f5b03e9.jpg'),
(16, 17, 'objeto-69bf73305c1b0.jpg'),
(17, 18, 'objeto-69bf749703a21.jpg'),
(18, 20, 'objeto-69bf7670237b2.jpg'),
(23, 28, 'objeto-69bf8964aa218.jpg'),
(24, 28, 'objeto-69bf89800e53b.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `id_pago` int(11) NOT NULL,
  `id_subasta` int(11) NOT NULL,
  `id_estado_pago` int(11) NOT NULL,
  `monto` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`id_pago`, `id_subasta`, `id_estado_pago`, `monto`) VALUES
(1, 1, 1, 60000.00),
(2, 2, 2, 32000.00),
(3, 3, 3, 0.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puja`
--

CREATE TABLE `puja` (
  `id_puja` int(11) NOT NULL,
  `id_subasta` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `monto` decimal(12,2) NOT NULL,
  `fecha_hora` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `puja`
--

INSERT INTO `puja` (`id_puja`, `id_subasta`, `id_usuario`, `monto`, `fecha_hora`) VALUES
(1, 1, 3, 55000.00, '2026-02-21 12:10:00'),
(2, 1, 2, 60000.00, '2026-02-22 15:30:00'),
(3, 2, 2, 32000.00, '2026-02-19 11:00:00'),
(4, 4, 3, 62000.00, '2026-03-02 19:00:00'),
(7, 1, 5, 70000.00, '2026-02-24 09:15:00'),
(8, 2, 4, 36000.00, '2026-02-21 16:40:00'),
(9, 3, 1, 46000.00, '2026-02-11 10:00:00'),
(10, 3, 3, 48500.00, '2026-02-12 13:30:00'),
(11, 4, 1, 70000.00, '2026-03-10 11:20:00'),
(12, 5, 3, 16000.00, '2026-04-01 10:30:00'),
(13, 5, 1, 17000.00, '2026-04-02 12:00:00'),
(14, 8, 3, 11000.00, '2026-03-21 10:00:00'),
(15, 8, 1, 12000.00, '2026-03-22 14:45:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre`) VALUES
(3, 'administrador'),
(1, 'cliente'),
(2, 'vendedor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subasta`
--

CREATE TABLE `subasta` (
  `id_subasta` int(11) NOT NULL,
  `id_objeto` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_cierre` datetime NOT NULL,
  `precio_base` decimal(12,2) NOT NULL,
  `incremento_minimo` decimal(12,2) NOT NULL,
  `id_estado_subasta` int(11) NOT NULL,
  `id_puja_ganadora` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subasta`
--

INSERT INTO `subasta` (`id_subasta`, `id_objeto`, `id_vendedor`, `fecha_inicio`, `fecha_cierre`, `precio_base`, `incremento_minimo`, `id_estado_subasta`, `id_puja_ganadora`) VALUES
(1, 1, 2, '2026-02-20 10:00:00', '2026-02-25 10:00:00', 50000.00, 5000.00, 3, 2),
(2, 2, 2, '2026-02-18 09:00:00', '2026-02-23 09:00:00', 30000.00, 2000.00, 3, 3),
(3, 3, 2, '2026-02-10 08:00:00', '2026-02-15 08:00:00', 45000.00, 2500.00, 4, NULL),
(4, 3, 2, '2026-03-08 01:26:24', '2026-03-20 01:26:24', 50000.00, 8000.00, 3, NULL),
(5, 6, 2, '2026-04-01 08:00:00', '2026-04-03 08:00:00', 15000.00, 1000.00, 4, NULL),
(6, 21, 2, '2026-03-26 08:00:00', '2026-03-31 08:00:00', 50000.00, 10000.00, 2, NULL),
(8, 20, 2, '2026-03-21 08:00:00', '2026-03-24 08:00:00', 10000.00, 1000.00, 2, NULL),
(13, 28, 2, '2026-03-21 08:00:00', '2026-03-25 08:00:00', 30000.00, 5000.00, 2, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `cedula` int(11) DEFAULT NULL,
  `correo` varchar(190) NOT NULL,
  `contrasena` text NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellido1` varchar(40) NOT NULL,
  `apellido2` varchar(40) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `id_estado_usuario` int(11) NOT NULL,
  `fecha_registro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `cedula`, `correo`, `contrasena`, `nombre`, `apellido1`, `apellido2`, `id_rol`, `id_estado_usuario`, `fecha_registro`) VALUES
(1, 511152510, 'nosechicharron@correo.com', '12345678', 'Ema', 'Gomez', 'Murillo', 3, 1, '2026-02-14 13:45:00'),
(2, 202020202, 'dayaaaggzs@correo.com', '12345678', 'Dayana', 'Céspedes', 'Saborío', 2, 1, '2026-02-06 07:05:28'),
(3, 303030303, 'danny233@correo.com', '12345678', 'Danny', 'Gutiérrez', 'Campos', 1, 1, '2026-02-09 12:12:12'),
(4, 119280890, 'emaortega@gmail.com', '12345678', 'Emanuel', 'Ortega', 'Quirós', 3, 1, '2026-01-01 11:11:11'),
(5, 209083404, 'clipzzM@outlook.com', '12345678', 'Cloe', 'Martineli', 'Azule', 2, 1, '2026-01-14 08:45:00'),
(6, 519201132, 'walMad111@gmail.com', '12345678', 'Waldinnnn', 'Madrizzzzz', 'Brionessss', 1, 2, '2026-02-09 12:10:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `condicion_objeto`
--
ALTER TABLE `condicion_objeto`
  ADD PRIMARY KEY (`id_condicion_objeto`);

--
-- Indices de la tabla `estado_objeto`
--
ALTER TABLE `estado_objeto`
  ADD PRIMARY KEY (`id_estado_objeto`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `estado_pago`
--
ALTER TABLE `estado_pago`
  ADD PRIMARY KEY (`id_estado_pago`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `estado_subasta`
--
ALTER TABLE `estado_subasta`
  ADD PRIMARY KEY (`id_estado_subasta`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `estado_usuario`
--
ALTER TABLE `estado_usuario`
  ADD PRIMARY KEY (`id_estado_usuario`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `objeto`
--
ALTER TABLE `objeto`
  ADD PRIMARY KEY (`id_objeto`),
  ADD KEY `id_vendedor` (`id_vendedor`),
  ADD KEY `id_estado_objeto` (`id_estado_objeto`),
  ADD KEY `id_condicion_objeto` (`id_condicion_objeto`);

--
-- Indices de la tabla `objeto_categoria`
--
ALTER TABLE `objeto_categoria`
  ADD PRIMARY KEY (`id_objeto`,`id_categoria`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `objeto_imagen`
--
ALTER TABLE `objeto_imagen`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `id_objeto` (`id_objeto`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id_pago`),
  ADD UNIQUE KEY `id_subasta` (`id_subasta`),
  ADD KEY `id_estado_pago` (`id_estado_pago`);

--
-- Indices de la tabla `puja`
--
ALTER TABLE `puja`
  ADD PRIMARY KEY (`id_puja`),
  ADD KEY `id_subasta` (`id_subasta`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `subasta`
--
ALTER TABLE `subasta`
  ADD PRIMARY KEY (`id_subasta`),
  ADD KEY `id_objeto` (`id_objeto`),
  ADD KEY `id_vendedor` (`id_vendedor`),
  ADD KEY `id_estado_subasta` (`id_estado_subasta`),
  ADD KEY `id_puja_ganadora` (`id_puja_ganadora`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_estado_usuario` (`id_estado_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `condicion_objeto`
--
ALTER TABLE `condicion_objeto`
  MODIFY `id_condicion_objeto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `estado_objeto`
--
ALTER TABLE `estado_objeto`
  MODIFY `id_estado_objeto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estado_pago`
--
ALTER TABLE `estado_pago`
  MODIFY `id_estado_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estado_subasta`
--
ALTER TABLE `estado_subasta`
  MODIFY `id_estado_subasta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `estado_usuario`
--
ALTER TABLE `estado_usuario`
  MODIFY `id_estado_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `objeto`
--
ALTER TABLE `objeto`
  MODIFY `id_objeto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `objeto_imagen`
--
ALTER TABLE `objeto_imagen`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `id_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `puja`
--
ALTER TABLE `puja`
  MODIFY `id_puja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `subasta`
--
ALTER TABLE `subasta`
  MODIFY `id_subasta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `objeto`
--
ALTER TABLE `objeto`
  ADD CONSTRAINT `objeto_ibfk_1` FOREIGN KEY (`id_vendedor`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `objeto_ibfk_2` FOREIGN KEY (`id_estado_objeto`) REFERENCES `estado_objeto` (`id_estado_objeto`),
  ADD CONSTRAINT `objeto_ibfk_3` FOREIGN KEY (`id_condicion_objeto`) REFERENCES `condicion_objeto` (`id_condicion_objeto`);

--
-- Filtros para la tabla `objeto_categoria`
--
ALTER TABLE `objeto_categoria`
  ADD CONSTRAINT `objeto_categoria_ibfk_1` FOREIGN KEY (`id_objeto`) REFERENCES `objeto` (`id_objeto`),
  ADD CONSTRAINT `objeto_categoria_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `objeto_imagen`
--
ALTER TABLE `objeto_imagen`
  ADD CONSTRAINT `objeto_imagen_ibfk_1` FOREIGN KEY (`id_objeto`) REFERENCES `objeto` (`id_objeto`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`id_subasta`) REFERENCES `subasta` (`id_subasta`),
  ADD CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`id_estado_pago`) REFERENCES `estado_pago` (`id_estado_pago`);

--
-- Filtros para la tabla `puja`
--
ALTER TABLE `puja`
  ADD CONSTRAINT `puja_ibfk_1` FOREIGN KEY (`id_subasta`) REFERENCES `subasta` (`id_subasta`),
  ADD CONSTRAINT `puja_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `subasta`
--
ALTER TABLE `subasta`
  ADD CONSTRAINT `subasta_ibfk_1` FOREIGN KEY (`id_objeto`) REFERENCES `objeto` (`id_objeto`),
  ADD CONSTRAINT `subasta_ibfk_2` FOREIGN KEY (`id_vendedor`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `subasta_ibfk_3` FOREIGN KEY (`id_estado_subasta`) REFERENCES `estado_subasta` (`id_estado_subasta`),
  ADD CONSTRAINT `subasta_ibfk_5` FOREIGN KEY (`id_puja_ganadora`) REFERENCES `puja` (`id_puja`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_estado_usuario`) REFERENCES `estado_usuario` (`id_estado_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
