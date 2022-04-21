-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2022 a las 13:03:09
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `campeonato`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id_comentario` int(11) NOT NULL,
  `id_jugador` int(11) NOT NULL,
  `comentario` varchar(300) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id_comentario`, `id_jugador`, `comentario`, `fecha`) VALUES
(1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non dignissim justo, iaculis ullamcorper ligula. Nulla facilisi. Duis viverra lectus at maximus varius. Suspendisse tincidunt tincidunt tortor, quis pulvinar dolor varius eu. Aenean et blandit justo. Sed nec ligula justo. Nunc sodale', '2022-04-21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `Id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `Contrasena` varchar(40) NOT NULL,
  `rol` enum('admin','jugador') NOT NULL DEFAULT 'jugador'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`Id`, `email`, `Contrasena`, `rol`) VALUES
(1, 'Juan', 'd7f080b6a24c541cfcd8241012460afb1a800a4c', 'jugador'),
(2, 'Maria', 'acfc263082190360dce09f701f19b17f1042c22d', 'jugador'),
(3, 'Pedro', '6ee711a10b67ff90bf67b04534e28307ffcc0ada', 'jugador'),
(4, 'Luis', '70f106fd19de33baf34bc6866b5f76c9b5803978', 'jugador'),
(5, 'Julia', '18d5ef443335f1cb23a43ca2ba567f275e99bf83', 'jugador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participacion`
--

CREATE TABLE `participacion` (
  `IdP` int(11) NOT NULL,
  `IdJ` int(11) NOT NULL,
  `Posicion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `participacion`
--

INSERT INTO `participacion` (`IdP`, `IdJ`, `Posicion`) VALUES
(1, 3, 4),
(1, 4, 3),
(1, 2, 2),
(1, 1, 1),
(2, 4, 2),
(2, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidas`
--

CREATE TABLE `partidas` (
  `Id` int(11) NOT NULL,
  `FechaInicio` datetime NOT NULL,
  `FechaFinal` datetime NOT NULL,
  `Duracion` time GENERATED ALWAYS AS (timediff(`FechaFinal`,`FechaInicio`)) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `partidas`
--

INSERT INTO `partidas` (`Id`, `FechaInicio`, `FechaFinal`) VALUES
(1, '2022-01-14 20:20:00', '2022-01-14 20:25:00'),
(2, '2021-12-12 20:20:00', '2021-12-12 20:30:00'),
(3, '2021-12-06 20:20:00', '2021-12-07 23:20:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `id_jugador` (`id_jugador`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `participacion`
--
ALTER TABLE `participacion`
  ADD KEY `IdP` (`IdP`),
  ADD KEY `IdJ` (`IdJ`);

--
-- Indices de la tabla `partidas`
--
ALTER TABLE `partidas`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id_comentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_jugador`) REFERENCES `jugadores` (`Id`);

--
-- Filtros para la tabla `participacion`
--
ALTER TABLE `participacion`
  ADD CONSTRAINT `participacion_ibfk_1` FOREIGN KEY (`IdP`) REFERENCES `partidas` (`Id`),
  ADD CONSTRAINT `participacion_ibfk_2` FOREIGN KEY (`IdJ`) REFERENCES `jugadores` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
