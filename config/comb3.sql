-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 17-07-2023 a las 15:45:50
-- Versión del servidor: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- Versión de PHP: 8.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `comb3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autorizo`
--

CREATE TABLE `autorizo` (
  `uid` varchar(100) NOT NULL,
  `combustible` varchar(100) NOT NULL,
  `cantidad` varchar(100) NOT NULL,
  `entidad` varchar(100) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `autorizo`
--

INSERT INTO `autorizo` (`uid`, `combustible`, `cantidad`, `entidad`, `fecha`) VALUES
('444e8bb8-2b21-43db-a623-0a7b7bb47aa2', '7209d09f-51bf-422e-8924-858031f3ea95', '500', 'd40e9d34-c5a3-463b-a746-9e972c67e323', '2023-08-01'),
('5ba0f874-36b2-4ef6-98d1-a2bbec3b4a7a', '7209d09f-51bf-422e-8924-858031f3ea95', '500', 'd40e9d34-c5a3-463b-a746-9e972c67e323', '2023-07-01'),
('a79ede2d-5c30-4fb2-b221-895ffe016e3c', '23e032c1-0dad-4eb2-b32c-76668c74a7ea', '500', 'd40e9d34-c5a3-463b-a746-9e972c67e323', '2023-07-16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `combustible`
--

CREATE TABLE `combustible` (
  `uid` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `combustible`
--

INSERT INTO `combustible` (`uid`, `nombre`) VALUES
('23e032c1-0dad-4eb2-b32c-76668c74a7ea', 'Gasolina Regular'),
('45fc902e-b554-4513-859e-90fdc4ebe573', 'Gasolina Especial'),
('7209d09f-51bf-422e-8924-858031f3ea95', 'Diésel'),
('88cd55bd-6976-4d74-8374-c7106152e059', 'Gasolina Motor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `despacho`
--

CREATE TABLE `despacho` (
  `uid` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `combustible` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `despacho`
--

INSERT INTO `despacho` (`uid`, `cantidad`, `fecha`, `combustible`) VALUES
('bf2705b4-d72a-4bb1-8856-0d3c405e77a4', 1000, '2023-07-16', '23e032c1-0dad-4eb2-b32c-76668c74a7ea'),
('c42836e5-6def-453a-8c0c-eb46694c6d59', 1000, '2023-07-01', '7209d09f-51bf-422e-8924-858031f3ea95'),
('d6d26f75-2166-48e6-91d4-b89a937278be', 1000, '2023-08-01', '7209d09f-51bf-422e-8924-858031f3ea95');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `distribucion`
--

CREATE TABLE `distribucion` (
  `uid` varchar(100) NOT NULL,
  `combustible` varchar(100) NOT NULL,
  `cantidad` varchar(100) NOT NULL,
  `entidad` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `prioridad` varchar(100) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `distribucion`
--

INSERT INTO `distribucion` (`uid`, `combustible`, `cantidad`, `entidad`, `fecha`, `prioridad`, `observaciones`) VALUES
('338a22c6-5636-4abd-880d-b29edf8a2fd9', '23e032c1-0dad-4eb2-b32c-76668c74a7ea', '100', 'b536ef18-7dea-418d-8185-8bdb4a79912c', '2023-07-16', 'Naranja', 'Observaciones'),
('55423cd7-0a01-4670-b492-c7aa1280f283', '23e032c1-0dad-4eb2-b32c-76668c74a7ea', '100', 'fd05f8b0-e6f6-4451-bda7-144f785fb436', '2023-07-16', 'soya', 'Observaciones'),
('66b64d67-66b8-4231-a849-2440c4860222', '7209d09f-51bf-422e-8924-858031f3ea95', '100', 'b536ef18-7dea-418d-8185-8bdb4a79912c', '2023-07-01', 'Naranja', 'Observaciones'),
('84527a3b-e8cc-4892-a09b-7772d77c6ed4', '23e032c1-0dad-4eb2-b32c-76668c74a7ea', '25', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', '2023-07-16', 'Papa', 'Papa'),
('931f26dc-5a64-4011-9c9b-ab238958be3a', '7209d09f-51bf-422e-8924-858031f3ea95', '50', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', '2023-07-16', 'Naranja', 'Observaciones'),
('a59a0c9d-08d8-444b-bf6f-e38d4a95116d', '7209d09f-51bf-422e-8924-858031f3ea95', '15', '8258a2a0-e737-48c9-a604-7475f76fbc0f', '2023-07-01', 'Naranja', 'oiuytgfvbn'),
('bcfb8df0-9e7f-4b9e-bf12-fe3954424b92', '23e032c1-0dad-4eb2-b32c-76668c74a7ea', '5', '24601383-9550-4da7-9aee-b88f50e4426e', '2023-07-16', 'Naranja', 'Observaciones'),
('cc98e0bd-3e1e-460b-a671-d323dc099a9a', '7209d09f-51bf-422e-8924-858031f3ea95', '5', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', '2023-07-01', 'Naranja', 'mnbvcx');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entidad`
--

CREATE TABLE `entidad` (
  `uid` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `subordinado` varchar(100) DEFAULT NULL,
  `subordinacion` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entidad`
--

INSERT INTO `entidad` (`uid`, `nombre`, `subordinado`, `subordinacion`) VALUES
('0700c924-b2c9-4655-aa96-a333ee4e9cae', 'Empresa Pecuaria Genética Turiguanó', '1b9c42a4-1320-4118-a174-30701c3939b1', 1),
('14ea904d-3565-4518-9ac3-8e4f862c93f1', 'Empresa de Suministros Agropecuarios', 'ae8cbee4-c8ef-4869-96b6-9820b85a6f87', 1),
('1b9c42a4-1320-4118-a174-30701c3939b1', 'Grupo Empresarial Ganadero', '', 1),
('208a050f-5425-4294-b49c-6afe8c7b8b32', 'EICMA (Empresa de informática y comunicaciones del Ministerio de la Agricultura)', 'ae8cbee4-c8ef-4869-96b6-9820b85a6f87', 0),
('20e0c87d-17d8-40bd-9962-e8f161822b5c', 'Empresa Genética Porcino', '1b9c42a4-1320-4118-a174-30701c3939b1', 1),
('24601383-9550-4da7-9aee-b88f50e4426e', 'Productor 4', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', 0),
('291b233d-3b0a-464d-a222-f0326a78f5e5', 'Empresa Agropecuaria Ruta Invasora', '1b9c42a4-1320-4118-a174-30701c3939b1', 1),
('2a5f30af-5c8f-4f3a-ad23-fc01b3de3716', 'Productor 5', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', 0),
('30b10b4e-e923-4df9-a09e-99c610132d61', 'Empresa Acopio Ciego de Ávila', '', 1),
('36028c07-ad08-4088-89d8-5c62523c7b0e', 'Unidad Empresarial Semillas Varias', 'd40e9d34-c5a3-463b-a746-9e972c67e323', 1),
('3a673f26-65d6-4bd9-acc5-5868fc1dbe21', 'Empresa Porcino Ciego de Ávila', '1b9c42a4-1320-4118-a174-30701c3939b1', 1),
('3c952477-2361-4b61-8bcd-3ee04f846437', 'Gobierno Provincial', '', 1),
('40e6aeec-6f8b-48d9-9a1c-a77ced2f0102', 'EGAME (Empresa de Ganado Menor)', '1b9c42a4-1320-4118-a174-30701c3939b1', 1),
('508343e7-53f6-4b5b-8535-d4d5e521b4fa', 'Empresa Avícola Ciego de Ávila', '1b9c42a4-1320-4118-a174-30701c3939b1', 1),
('5ead998a-c1db-4ea3-b714-d7fd2dfbb2af', 'Unidad Empresarial Apicultura', 'e970a876-33d3-4c13-8961-b0bb0197ca98', 0),
('7263f402-8ad3-4460-930c-e5ee9b7fd921', 'Grupo Empresarial Flora y Fauna', '', 1),
('762abd45-f7df-4f26-8b27-aa63728ffe87', 'Productor 2', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', 0),
('80dfee40-fa1f-4445-9ffc-30fc872f8a60', 'Empresa Agroforestal Ciego de Ávila', 'e970a876-33d3-4c13-8961-b0bb0197ca98', 1),
('8258a2a0-e737-48c9-a604-7475f76fbc0f', 'Productor 1', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', 0),
('82d07bda-39da-44c1-b8c8-d7ce91bb6717', 'Empresa Agroindustrial de Granos Máximo Gómez', 'd40e9d34-c5a3-463b-a746-9e972c67e323', 1),
('916b0c17-4837-420b-91ce-ad8bcad54289', 'Productor 3', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', 0),
('92a4ab41-5f61-4479-96c8-9550801c1ccc', 'Grupo Empresarial de Tabaco de Cuba', '', 1),
('959d49d1-4626-42db-9a2a-c571aa28105a', 'Empresa Integral Agropecuaria Ciego de Ávila', 'd40e9d34-c5a3-463b-a746-9e972c67e323', 1),
('9c4da418-f954-4fd0-b49f-8ab53b31038d', 'Empresa Provincial Labiofam ', '', 1),
('9efb2b9d-f2f1-4640-82c5-5856b98d3250', 'Empresa Agropecuaria Arnaldo Ramírez', 'd40e9d34-c5a3-463b-a746-9e972c67e323', 1),
('a24f9416-93d7-48c5-83d8-1c660ff082ae', 'Unidad Empresarial Flora y Fauna', '7263f402-8ad3-4460-930c-e5ee9b7fd921', 1),
('a7a0280f-5db3-4892-a969-28e722561772', 'ENPA (Empresa Nacional de Proyectos Agropecuarios)', 'ae8cbee4-c8ef-4869-96b6-9820b85a6f87', 1),
('a8f566ac-23e0-4d92-b432-69eaa678406c', 'Unidad Empresarial Desmonte y Construcción', 'ae8cbee4-c8ef-4869-96b6-9820b85a6f87', 0),
('abadba01-0f9f-4277-b9ed-934a9a411e74', 'Empresa Agropecuaria La Cuba ', 'd40e9d34-c5a3-463b-a746-9e972c67e323', 1),
('ae8cbee4-c8ef-4869-96b6-9820b85a6f87', 'Grupo Empresarial Agropecuario', '', 1),
('b536ef18-7dea-418d-8185-8bdb4a79912c', 'Empresa Agroindustrial Ceballos', 'd40e9d34-c5a3-463b-a746-9e972c67e323', 1),
('c4977405-2a2d-450a-b09a-f9a17eec6d24', 'Empresa Agropecuaria Chambas', '1b9c42a4-1320-4118-a174-30701c3939b1', 1),
('d2cad589-33b6-40a4-b161-88a9947a48a7', 'Unidad Empresarial Frutas Selectas', 'd40e9d34-c5a3-463b-a746-9e972c67e323', 1),
('d40e9d34-c5a3-463b-a746-9e972c67e323', 'Grupo Empresarial Agrícola', '', 1),
('dc19c4b6-a05e-4180-abef-dcf840b70269', 'Empresa Agropecuaria Florencia', '92a4ab41-5f61-4479-96c8-9550801c1ccc', 1),
('dc38fedc-1a4b-43ee-8e60-172d9a31a078', 'CCS 5 de julio', 'b536ef18-7dea-418d-8185-8bdb4a79912c', 1),
('e970a876-33d3-4c13-8961-b0bb0197ca98', 'Grupo Empresarial Agroforestal', '', 1),
('f1fb4a92-c836-49a7-93cb-98c846032b3b', 'Unidad Empresarial Talleres Agropecuarios', 'ae8cbee4-c8ef-4869-96b6-9820b85a6f87', 1),
('fb5ca9b9-645c-47c5-94e6-a06e3a337552', 'Unidad Empresarial Aseguramiento y Servicios', 'ae8cbee4-c8ef-4869-96b6-9820b85a6f87', 0),
('fd05f8b0-e6f6-4451-bda7-144f785fb436', 'Empresa Agropecuaria Cubasoy', 'd40e9d34-c5a3-463b-a746-9e972c67e323', 1),
('fe4bf07a-c2d5-49ab-80ea-971b060b1dcc', 'Unidad Empresarial Transporte Agropecuario', 'ae8cbee4-c8ef-4869-96b6-9820b85a6f87', 0),
('ff09c778-51e3-434d-a53c-b15fdcaff1cf', 'Unidad Empresarial Transporte Cítrico Caribe Semillas Varias', 'd40e9d34-c5a3-463b-a746-9e972c67e323', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `uid` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `entidad` varchar(100) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `activo` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`uid`, `nombre`, `usuario`, `correo`, `contrasena`, `entidad`, `rol`, `activo`) VALUES
('022486c4-0b3c-4e01-83f6-4df1a8998e37', 'CCS 5 de julio', '54455921', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', 'administrador', 1),
('2330846d-6f68-404b-8ca5-2f7494a06cc8', 'Empresa Agropecuaria Chambas', '53328271', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', 'c4977405-2a2d-450a-b09a-f9a17eec6d24', 'administrador', 0),
('3cbd5372-8e8d-47b8-98ce-23aefb888e3e', 'Empresa Agropecuaria Ruta Invasora', '53971221', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', '291b233d-3b0a-464d-a222-f0326a78f5e5', 'administrador', 1),
('4f874d3e-8450-40f7-a2e0-63122bf42f1e', 'Empresa Porcino Ciego de Ávila', '53502915', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', '3a673f26-65d6-4bd9-acc5-5868fc1dbe21', 'administrador', 1),
('67931c82-e852-4148-9c4a-356fda6b4bf8', 'Empresa Pecuaria Genética Turiguanó', '53820892', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', '0700c924-b2c9-4655-aa96-a333ee4e9cae', 'administrador', 1),
('84754d06-0dbf-4568-a130-4172af2ce6e4', 'Empresa Agroindustrial Ceballos', '53890192', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', 'b536ef18-7dea-418d-8185-8bdb4a79912c', 'administrador', 1),
('a914e920-9e29-4d4d-9c1b-3e3248a1d6ee', 'EGAME (Empresa de Ganado Menor)', '53425171', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', '40e6aeec-6f8b-48d9-9a1c-a77ced2f0102', 'administrador', 1),
('bc1ccb93-264a-4ae9-8344-ab17134fc4cf', 'Grupo Empresarial Agrícola', '53348230', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', 'd40e9d34-c5a3-463b-a746-9e972c67e323', 'administrador', 1),
('bd05e7e1-aece-4fc8-b39a-12f31850cbbe', 'Empresa Genética Porcino', '53724787', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', '20e0c87d-17d8-40bd-9962-e8f161822b5c', 'administrador', 1),
('e194bc49-79f9-46eb-bbd8-1b59a9796e0b', 'Lazaro', '59958885', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', '3c952477-2361-4b61-8bcd-3ee04f846437', 'superadmin', 1),
('f80f82fb-b2cc-44fb-a2c1-2faa61c6ad4d', 'Grupo Empresarial Ganadero', '53919352', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', '1b9c42a4-1320-4118-a174-30701c3939b1', 'administrador', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autorizo`
--
ALTER TABLE `autorizo`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `combustible_i1` (`combustible`),
  ADD KEY `entidad_e1` (`entidad`);

--
-- Indices de la tabla `combustible`
--
ALTER TABLE `combustible`
  ADD PRIMARY KEY (`uid`);

--
-- Indices de la tabla `despacho`
--
ALTER TABLE `despacho`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `combustible_id` (`combustible`);

--
-- Indices de la tabla `distribucion`
--
ALTER TABLE `distribucion`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `entidad_id` (`entidad`),
  ADD KEY `combustible_ed` (`combustible`);

--
-- Indices de la tabla `entidad`
--
ALTER TABLE `entidad`
  ADD PRIMARY KEY (`uid`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `subordinado_id1` (`entidad`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `autorizo`
--
ALTER TABLE `autorizo`
  ADD CONSTRAINT `combustible_i1` FOREIGN KEY (`combustible`) REFERENCES `combustible` (`uid`),
  ADD CONSTRAINT `entidad_e1` FOREIGN KEY (`entidad`) REFERENCES `entidad` (`uid`);

--
-- Filtros para la tabla `despacho`
--
ALTER TABLE `despacho`
  ADD CONSTRAINT `combustible_id` FOREIGN KEY (`combustible`) REFERENCES `combustible` (`uid`);

--
-- Filtros para la tabla `distribucion`
--
ALTER TABLE `distribucion`
  ADD CONSTRAINT `combustible_ed` FOREIGN KEY (`combustible`) REFERENCES `combustible` (`uid`),
  ADD CONSTRAINT `entidad_id` FOREIGN KEY (`entidad`) REFERENCES `entidad` (`uid`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `subordinado_id1` FOREIGN KEY (`entidad`) REFERENCES `entidad` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
