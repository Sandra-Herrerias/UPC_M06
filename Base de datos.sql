-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2022 a las 13:03:09
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

DROP DATABASE IF EXISTS upc_explodingkittens;
CREATE DATABASE upc_explodingkittens;

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

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `id_player` int(11) NOT NULL,
  `comment` varchar(300) NOT NULL,
 `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comments` (`id`, `id_player`, `comment`, `created_at`) VALUES
(1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non dignissim justo, iaculis ullamcorper ligula. Nulla facilisi. Duis viverra lectus at maximus varius. Suspendisse tincidunt tincidunt tortor, quis pulvinar dolor varius eu. Aenean et blandit justo. Sed nec ligula justo. Nunc sodale', '2022-04-21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(40) NOT NULL,
  `role` enum('admin','player') NOT NULL DEFAULT 'player'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `players`
--

INSERT INTO `players` (`id`, `email`, `password`, `role`) VALUES
(1, 'Juan', 'd7f080b6a24c541cfcd8241012460afb1a800a4c', 'player'),
(2, 'Maria', 'acfc263082190360dce09f701f19b17f1042c22d', 'player'),
(3, 'Pedro', '6ee711a10b67ff90bf67b04534e28307ffcc0ada', 'player'),
(4, 'Luis', '70f106fd19de33baf34bc6866b5f76c9b5803978', 'player'),
(5, 'Julia', '18d5ef443335f1cb23a43ca2ba567f275e99bf83', 'player');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participation`
--

CREATE TABLE `participation` (
  `idP` int(11) NOT NULL,
  `idJ` int(11) NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `participation`
--

INSERT INTO `participation` (`idP`, `idJ`, `position`) VALUES
(1, 3, 4),
(1, 4, 3),
(1, 2, 2),
(1, 1, 1),
(2, 4, 2),
(2, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `initial_date` datetime NOT NULL,
  `final_date` datetime NOT NULL,
  `duration` time GENERATED ALWAYS AS (timediff(`final_date`,`initial_date`)) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `games`
--

INSERT INTO `games` (`id`, `initial_date`, `final_date`) VALUES
(1, '2022-01-14 20:20:00', '2022-01-14 20:25:00'),
(2, '2021-12-12 20:20:00', '2021-12-12 20:30:00'),
(3, '2021-12-06 20:20:00', '2021-12-07 23:20:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_player` (`id_player`);

--
-- Indices de la tabla `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `participation`
--
ALTER TABLE `participation`
  ADD KEY `idP` (`idP`),
  ADD KEY `idJ` (`idJ`);

--
-- Indices de la tabla `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_player`) REFERENCES `players` (`id`);

--
-- Filtros para la tabla `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `participation_ibfk_1` FOREIGN KEY (`idP`) REFERENCES `games` (`id`),
  ADD CONSTRAINT `participation_ibfk_2` FOREIGN KEY (`idJ`) REFERENCES `players` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
