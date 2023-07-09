-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 09-07-2023 a las 06:45:21
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
-- Estructura de tabla para la tabla `asignacion`
--

CREATE TABLE `asignacion` (
  `uid` varchar(100) NOT NULL,
  `combustible` varchar(100) NOT NULL,
  `cantidad` varchar(100) NOT NULL,
  `entidad` varchar(100) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignacion`
--

INSERT INTO `asignacion` (`uid`, `combustible`, `cantidad`, `entidad`, `fecha`) VALUES
('1924586e-901d-4bd5-83bc-39a9999082b6', '7209d09f-51bf-422e-8924-858031f3ea95', '50', '8258a2a0-e737-48c9-a604-7475f76fbc0f', '2023-07-01'),
('241dded4-bf8b-4527-a6ce-54ac3b004bd1', '88cd55bd-6976-4d74-8374-c7106152e059', '50', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', '2023-08-01'),
('29a2e4fc-6bce-4a06-ad92-3394b50092f2', '88cd55bd-6976-4d74-8374-c7106152e059', '15', '24601383-9550-4da7-9aee-b88f50e4426e', '2023-08-01'),
('383fa138-497e-440d-9911-6ced628c2d1b', '23e032c1-0dad-4eb2-b32c-76668c74a7ea', '10', '762abd45-f7df-4f26-8b27-aa63728ffe87', '2023-07-01'),
('eb5bc470-9033-42f8-9a88-f7bdbb3f9afc', '23e032c1-0dad-4eb2-b32c-76668c74a7ea', '100', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', '2023-07-01'),
('f0469afb-1b88-4f58-9fd4-a0f8c82c929c', '7209d09f-51bf-422e-8924-858031f3ea95', '100', 'dc38fedc-1a4b-43ee-8e60-172d9a31a078', '2023-07-01');

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
('028cd167-51c4-46ce-b6fe-1dd427312761', 1000, '2023-07-01', '7209d09f-51bf-422e-8924-858031f3ea95'),
('0549e2ec-d77d-4865-872d-c35863d8a9fe', 500, '2023-08-01', '88cd55bd-6976-4d74-8374-c7106152e059'),
('171d1320-d854-491d-bf32-c96a12c07eee', 1000, '2023-07-02', '23e032c1-0dad-4eb2-b32c-76668c74a7ea'),
('2a8fdc13-1807-4536-97f6-7874766a6d42', 1000, '2023-07-04', '7209d09f-51bf-422e-8924-858031f3ea95'),
('2b771bcb-2f0d-45b0-bfb8-7270be11819f', 1000, '2023-07-07', '7209d09f-51bf-422e-8924-858031f3ea95'),
('3065bac4-7e96-48f7-bd42-e23d2105360a', 1000, '2023-07-03', '23e032c1-0dad-4eb2-b32c-76668c74a7ea'),
('43f3417a-2aea-4c23-b8c5-e49a531da52f', 1000, '2023-07-01', '88cd55bd-6976-4d74-8374-c7106152e059'),
('522b2398-a480-4b34-9c6c-75e41f424bc3', 1000, '2023-07-07', '88cd55bd-6976-4d74-8374-c7106152e059'),
('5288006d-36fa-4efa-b08f-16520db03456', 1000, '2023-07-07', '23e032c1-0dad-4eb2-b32c-76668c74a7ea'),
('60fcdd21-cac6-4266-a461-2b5742aed8b2', 1000, '2023-07-04', '23e032c1-0dad-4eb2-b32c-76668c74a7ea'),
('72b487db-4570-4ad0-8613-5042157b9221', 1000, '2023-07-03', '7209d09f-51bf-422e-8924-858031f3ea95'),
('8fe187aa-024b-49a5-89eb-124e28356690', 1000, '2023-07-06', '7209d09f-51bf-422e-8924-858031f3ea95'),
('ac144de7-f705-4418-ac3a-2d75b4613ce9', 1000, '2023-07-05', '23e032c1-0dad-4eb2-b32c-76668c74a7ea'),
('af71c31d-cd40-4a41-b686-8b3ad22f01f8', 1000, '2023-07-06', '23e032c1-0dad-4eb2-b32c-76668c74a7ea'),
('b8dad18d-2bf7-4a61-864f-8f083389b4d5', 1000, '2023-07-06', '88cd55bd-6976-4d74-8374-c7106152e059'),
('ce7b9393-dd75-4b66-92da-81dfd25f6c21', 1000, '2023-07-05', '88cd55bd-6976-4d74-8374-c7106152e059'),
('d3e980ff-6001-4825-9473-e76ce2a30d83', 1000, '2023-07-02', '88cd55bd-6976-4d74-8374-c7106152e059'),
('d64e8918-d7cc-46d7-9081-3d13fe6e9adb', 1000, '2023-07-02', '7209d09f-51bf-422e-8924-858031f3ea95'),
('da507f5c-286f-458c-b792-f8905f5283a3', 1000, '2023-07-04', '88cd55bd-6976-4d74-8374-c7106152e059'),
('e3a941a5-d44f-4057-ba24-263687482a8b', 1000, '2023-07-01', '23e032c1-0dad-4eb2-b32c-76668c74a7ea'),
('e977c1fe-b5c4-4f6e-99c2-3158db98d8b7', 1000, '2023-07-03', '88cd55bd-6976-4d74-8374-c7106152e059'),
('f4ba3db0-17f5-40fa-bc60-cadfd4cfabf9', 1000, '2023-07-05', '7209d09f-51bf-422e-8924-858031f3ea95');

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
('a914e920-9e29-4d4d-9c1b-3e3248a1d6ee', 'EGAME (Empresa de Ganado Menor)', '53425171', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', '40e6aeec-6f8b-48d9-9a1c-a77ced2f0102', 'administrador', 1),
('bd05e7e1-aece-4fc8-b39a-12f31850cbbe', 'Empresa Genética Porcino', '53724787', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', '20e0c87d-17d8-40bd-9962-e8f161822b5c', 'administrador', 1),
('e194bc49-79f9-46eb-bbd8-1b59a9796e0b', 'Lazaro', '59958885', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', '3c952477-2361-4b61-8bcd-3ee04f846437', 'superadmin', 1),
('f80f82fb-b2cc-44fb-a2c1-2faa61c6ad4d', 'Grupo Empresarial Ganadero', '53919352', 'lrodriguezplaceres@gmail.com', '$2a$10$CwTysUXWue0Thq9StjUK0uQS8W.OIzRcdSKO4Q6rHnZoBkryJaMS.', '1b9c42a4-1320-4118-a174-30701c3939b1', 'administrador', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignacion`
--
ALTER TABLE `asignacion`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `entidad_id` (`entidad`),
  ADD KEY `combustible_ed` (`combustible`);

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
-- Filtros para la tabla `asignacion`
--
ALTER TABLE `asignacion`
  ADD CONSTRAINT `combustible_ed` FOREIGN KEY (`combustible`) REFERENCES `combustible` (`uid`),
  ADD CONSTRAINT `entidad_id` FOREIGN KEY (`entidad`) REFERENCES `entidad` (`uid`);

--
-- Filtros para la tabla `despacho`
--
ALTER TABLE `despacho`
  ADD CONSTRAINT `combustible_id` FOREIGN KEY (`combustible`) REFERENCES `combustible` (`uid`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `subordinado_id1` FOREIGN KEY (`entidad`) REFERENCES `entidad` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
