-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 14-11-2025 a las 16:32:41
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.2.27
CREATE DATABASE IF NOT EXISTS gimnasio DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE gimnasio;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gimnasio`
--
DROP TABLE IF EXISTS `reservation`;
DROP TABLE IF EXISTS `activity`;
DROP TABLE IF EXISTS `assessment`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `membership`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activity`
--

CREATE TABLE `activity` (
  `id_activity` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `activity_day` datetime NOT NULL,
  `duration` decimal(10,0) NOT NULL,
  `available` tinyint(1) NOT NULL,
  `id_trainer` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `activity`
--

INSERT INTO `activity` (`id_activity`, `name`, `description`, `activity_day`, `duration`, `available`, `id_trainer`) VALUES
(1, 'Yoga', 'Sesión de relajación y estiramientos.', '2025-01-10 10:00:00', 2, 1, 1),
(2, 'Spinning', 'Entrenamiento de alta intensidad en bicicleta.', '2025-01-11 18:00:00', 1, 1, 1),
(3, 'CrossFit', 'Rutina de fuerza y resistencia.', '2025-01-12 19:00:00', 1, 1, 1),
(4, 'Pilates', 'Fortalecimiento del core y mejora de la postura.', '2025-01-13 09:00:00', 1, 1, 1),
(5, 'Zumba', 'Clase de baile y cardio con ritmo latino.', '2025-01-14 17:00:00', 1, 1, 1),
(6, 'Boxeo', 'Entrenamiento de técnica y resistencia física.', '2025-01-15 20:00:00', 2, 1, 1),
(7, 'Body Pump', 'Sesión de levantamiento de pesas con música.', '2025-01-16 19:30:00', 1, 1, 1),
(8, 'Natación', 'Entrenamiento en piscina climatizada.', '2025-01-17 08:30:00', 1, 1, 1),
(9, 'Cardio HIIT', 'Entrenamiento por intervalos de alta intensidad.', '2025-01-18 18:30:00', 1, 1, 1),
(10, 'Funcional', 'Sesión de ejercicios de cuerpo completo.', '2025-01-19 10:30:00', 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `assessment`
--

CREATE TABLE `assessment` (
  `id_assessment` int NOT NULL,
  `value` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `assessment`
--

INSERT INTO `assessment` (`id_assessment`, `value`) VALUES
(1, 'excellent'),
(2, 'good'),
(3, 'average'),
(4, 'poor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `membership`
--

CREATE TABLE `membership` (
  `id_membership` int NOT NULL,
  `plan` varchar(20) COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `membership`
--

INSERT INTO `membership` (`id_membership`, `plan`) VALUES
(1, 'mensual'),
(2, 'anual'),
(3, 'premium'),
(4, 'trial');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservation`
--

CREATE TABLE `reservation` (
  `id_reservation` int NOT NULL,
  `name` varchar(40) NOT NULL,
  `id_user` int NOT NULL,
  `id_activity` int NOT NULL,
  `reservation_date` date NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `id_assessment` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `reservation`
--

INSERT INTO `reservation` (`id_reservation`, `name`, `id_user`, `id_activity`, `reservation_date`, `is_active`, `id_assessment`) VALUES
(1, 'Primera clase de yoga del año.', 1, 1, '2025-01-09', 1, 1),
(2, 'Confirmada asistencia.', 2, 4, '2025-01-10', 1, 2),
(3, 'Segunda reserva en spinning.', 3, 2, '2025-01-11', 1, 3),
(4, 'Clase de CrossFit con grupo avanzado.', 4, 3, '2025-01-12', 1, 4),
(5, 'Cancelada por lesión leve.', 5, 5, '2025-01-13', 0, 2),
(6, 'Participa con su grupo habitual.', 6, 7, '2025-01-14', 1, 1),
(7, 'Clase de prueba.', 7, 6, '2025-01-15', 1, 3),
(8, 'Primera vez en Zumba.', 8, 5, '2025-01-16', 1, 4),
(9, 'Entrenamiento de alta intensidad.', 9, 9, '2025-01-17', 1, 2),
(10, 'Sesión matutina de natación.', 10, 8, '2025-01-18', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(70) NOT NULL,
  `registration_date` date NOT NULL,
  `age` int NOT NULL,
  `vip` tinyint(1) NOT NULL,
  `observation` text NOT NULL,
  `id_membership` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id_user`, `name`, `email`, `registration_date`, `age`, `vip`, `observation`, `id_membership`) VALUES
(1, 'Carlos Pérez', 'carlos.perez@example.com', '2024-03-15', 29, 1, 'Asiste regularmente al gimnasio.', 1),
(2, 'María López', 'maria.lopez@example.com', '2024-04-02', 34, 0, 'Prefiere clases de yoga.', 2),
(3, 'Antonio García', 'antonio.garcia@example.com', '2024-06-20', 41, 0, 'Recientemente inscrito.', 4),
(4, 'Lucía Fernández', 'lucia.fernandez@example.com', '2024-08-11', 25, 1, 'Usuaria activa en spinning.', 3),
(5, 'David Ruiz', 'david.ruiz@example.com', '2024-09-05', 37, 0, 'Interesado en entrenamiento funcional.', 1),
(6, 'Sara Gómez', 'sara.gomez@example.com', '2024-09-18', 28, 1, 'Participa en múltiples actividades.', 2),
(7, 'Javier Ortega', 'javier.ortega@example.com', '2024-10-03', 32, 0, 'Nuevo socio en musculación.', 3),
(8, 'Marta Sánchez', 'marta.sanchez@example.com', '2024-11-10', 30, 1, 'Le gusta el pilates.', 4),
(9, 'Andrés Torres', 'andres.torres@example.com', '2025-01-15', 35, 0, 'Viene tres veces por semana.', 1),
(10, 'Elena Martín', 'elena.martin@example.com', '2025-02-20', 27, 1, 'Participa en clases de cardio.', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id_activity`),
  ADD KEY `FK_activity_user` (`id_trainer`);

--
-- Indices de la tabla `assessment`
--
ALTER TABLE `assessment`
  ADD PRIMARY KEY (`id_assessment`);

--
-- Indices de la tabla `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`id_membership`);

--
-- Indices de la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id_reservation`),
  ADD KEY `FK_reservation_user` (`id_user`),
  ADD KEY `FK_reservation_activity` (`id_activity`),
  ADD KEY `FK_reservation_assessment` (`id_assessment`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `FK_user_membership` (`id_membership`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activity`
--
ALTER TABLE `activity`
  MODIFY `id_activity` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `assessment`
--
ALTER TABLE `assessment`
  MODIFY `id_assessment` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `membership`
--
ALTER TABLE `membership`
  MODIFY `id_membership` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id_reservation` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `FK_activity_user` FOREIGN KEY (`id_trainer`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FK_reservation_activity` FOREIGN KEY (`id_activity`) REFERENCES `activity` (`id_activity`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_reservation_assessment` FOREIGN KEY (`id_assessment`) REFERENCES `assessment` (`id_assessment`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_reservation_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_user_membership` FOREIGN KEY (`id_membership`) REFERENCES `membership` (`id_membership`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
