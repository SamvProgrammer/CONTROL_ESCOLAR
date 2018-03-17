-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-03-2018 a las 07:09:21
-- Versión del servidor: 10.1.26-MariaDB
-- Versión de PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdcontrol`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `idAlumno` int(11) NOT NULL,
  `curp` varchar(18) COLLATE utf8_spanish_ci NOT NULL,
  `nombres` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `apPaterno` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `apMaterno` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `colonia` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `calle` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `tipoSangre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `alergias` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `nombreTutor` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `numTel` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `idRol` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `sexo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estatus` int(11) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `promovido` int(11) NOT NULL,
  `procedencia` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`idAlumno`, `curp`, `nombres`, `apPaterno`, `apMaterno`, `colonia`, `calle`, `tipoSangre`, `alergias`, `nombreTutor`, `numTel`, `email`, `password`, `idRol`, `edad`, `sexo`, `estatus`, `fechaNacimiento`, `promovido`, `procedencia`) VALUES
(45, 'VARA110309MOCLSNA2', 'ANTONIA', 'VALLE', 'ROSALES', 'Tepeyac', 'LINDA VISTA', 'ORH-', 'POLVO', 'GRISELDA JIMÉNEZ', '9764563425', 'antonia@hotmail.com', '$2y$10$PLtEx7y7fxuPy0fBjM0u5OV4cONZNIQjyW1pYT/Rfj8BKtkCamWvG', 3, 6, 'M', 1, '0000-00-00', 1, ''),
(46, 'HUDE111210HOCMZDA2', 'EDWING', 'HUMANZOR', 'DIAZ', 'Roma', 'AV. OAXACA', 'ARH+', 'POLLO', 'GLORIA DIAZ', '9874758589', 'edwing@hotmail.com', '$2y$10$xU1d0WWmvWkejjusQFpMkeDGjHAUGq5qWH5C8qak1scEPalZH7Um2', 3, 6, 'H', 1, '0000-00-00', 1, ''),
(47, 'CUME050409HOCRNSA3', 'ESTEBAN', 'CRUZ', 'MENDEZ', 'México', 'OAXACA', 'ORH+', 'PAN DULCE', 'GABRIELA', '98765456', 'esteban@hotmail.com', '$2y$10$RJBJtGgo6ag6d44n6iaun.Xv2gpTOtGuZnDyLa10PkdwwUUuN942G', 3, 12, 'H', 1, '0000-00-00', 1, ''),
(48, 'CUCD050309MOCRRNA7', 'DIANA', 'CRUZ', 'CARMONA', 'Río Grande o Piedra Parada Centro', 'MEXICO', 'ARH-', 'PAN DULCE', 'JOSEFINA', '8765456789', 'diana@hotmail.com', '$2y$10$X1FstJrUz.M6IyFgecA1juqn0nIn4sVQ9HdvPlwQwc.UeI/osevle', 3, 12, 'M', 1, '0000-00-00', 0, ''),
(49, 'CAME050709HOCSNMA3', 'EMMANUEL', 'CASTILLO', 'MONSOON', 'Puerto Escondido Centro', 'LOMAS', 'ARH+', 'MERMELADA', 'GRIMM', '8764567898', 'emma@hotmail.com', '$2y$10$cIiToKrYRl2JY.2IDVEIFe8ef7GHbHa8W2pKl82tFhK81W05XUeLS', 3, 12, 'H', 1, '0000-00-00', 1, ''),
(50, 'CUDC050809MOCNZTA3', 'CATALINA', 'CUANCHE', 'DIAZ', 'Tepeyac', 'PUEBLA', 'ABRH-', 'POLVO', 'CATALINO CRUZ', '9876545678', 'catalina@hotmail.com', '$2y$10$55hy4Yl9fQQkonn.DnO7oOZSj3LK.2.338fCf/5bOsPBsEVhGI0qe', 3, 12, 'M', 1, '0000-00-00', 1, ''),
(51, 'DIMS050809MOCZRRA0', 'SERENA', 'DIAZ', 'MARTINEZ', 'Tepeyac', 'MEXICO', 'ARH-', 'NINGUNA', 'PABLO DIAZ', '8765456789', 'sere@hotmail.com', '$2y$10$SRGYHKDTsVcbrzwsTJiQa.FcuHV3fOuBvzi.RYHuNcekw1jngVizG', 3, 12, 'M', 1, '0000-00-00', 1, ''),
(52, 'DIAL110909MOCZLLA8', 'LOLA', 'DIAZ', 'ALAVEZ', 'Roma', 'ENERO 23', 'ORH+', 'POLVO', 'OLGA ALAVEZ', '8765478987', 'lola@hotmail.com', '$2y$10$yVjBmAo8UXLjE.yzj3kp5uSQxrXRlptcO217ZyXS0ooU4L3fCiJua', 3, 6, 'M', 1, '0000-00-00', 1, '5 DE MAYO'),
(53, 'SACE090909MOCRHSA1', 'ESTELA', 'SARMIENTO', 'CHAVEZ', 'Tepeyac', 'LOMAS', 'ARH+', 'POLVO', 'SATINA', '9876545678', 'estela@hotmail.com', '$2y$10$YRkzF9Ug7/OHY/1rWQ4szONINZ05C1AEB8pD7MFLxjhBpkgqcOli6', 3, 8, 'M', 1, '0000-00-00', 1, 'KINDER JUAN FEDERICO'),
(54, 'MICN080909MOCSRMA1', 'NAOMI', 'MISANTY', 'CURSELL', 'México', 'MEXICO', 'ARH+', 'POLVO', 'BERITA CERUM', '7654567876', 'nao@hotmail.com', '$2y$10$9lFYGG7l/D2yzukWikcugu49ZX9C7T59agtrb3betrt0ehCN7x4Lq', 3, 9, 'M', 1, '0000-00-00', 1, 'PROGRESO KINDER'),
(55, 'VAMJ060509MOCSTSA8', 'JOSEFINA', 'VASQUEZ', 'MOTA', 'Río Grande o Piedra Parada Centro', 'MEXICO', 'BRH-', 'PAN TOSTADO', 'JUANA', '87654567', 'josefi@hotmail.com', '$2y$10$EcP7maQoHIs2IyncjifxFuttb9xV8obgRSXucQoXxKsHpVVznxc8K', 3, 11, 'M', 1, '0000-00-00', 1, 'PROGRESO'),
(56, 'VEVS110909MOCLLFA5', 'SOFIA', 'VELGARA', 'VOLCANES', 'San Luis Potosí Centro', 'PUTLA', 'ARH+', 'POLVO', 'CUNILLO CHINO', '8765456789', 'sofi@hotmail.com', '$2y$10$kQuTU22JBjAVHHdrM8axNOdb9zXA4xy42flEIN7nz3/DPEkbKtQYq', 3, 6, 'M', 1, '0000-00-00', 1, 'MESOAMERICANA'),
(57, 'ROMG050509MOCSLRA2', 'GRISS', 'ROSADO', 'MOLINA', 'Oaxaca', 'MEXICO', 'ARH+', 'NINGUNA', 'FELIPE SANTO', '8765456789', 'griss@hotmail.com', '$2y$10$oay0RwflZs/C1CWAm6kCs.2GbuxDFkZGGi0YWhWZElXOFzW5Ptnom', 3, 12, 'M', 1, '0000-00-00', 1, 'MORELOS');

--
-- Disparadores `alumno`
--
DELIMITER $$
CREATE TRIGGER ` alumnos_ai` AFTER INSERT ON `alumno` FOR EACH ROW insert into users(id_user,curp, email, nombre, apPaterno, apMaterno, password, rol_id,estatus) values
		(new.idAlumno,new.curp, new.email, new.nombres, new.apPaterno, new.apMaterno, new.password, new.idRol,new.estatus)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `alumno_actualiza_info_au` AFTER UPDATE ON `alumno` FOR EACH ROW UPDATE users SET 
users.email=new.email, 
users.nombre=new.nombres, 
users.apPaterno=new.apPaterno, 
users.apMaterno=new.apMaterno,
users.password=new.password, 
users.rol_id=new.idRol,
users.estatus=new.estatus 
WHERE users.id_user=new.idAlumno and users.curp=new.curp
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `eliminarAlumno` AFTER DELETE ON `alumno` FOR EACH ROW BEGIN
	DELETE FROM users WHERE users.id_user=old.idAlumno And users.curp=old.curp;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_grupo`
--

CREATE TABLE `alumno_grupo` (
  `idAlumno` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alumno_grupo`
--

INSERT INTO `alumno_grupo` (`idAlumno`, `idCurso`, `idGrupo`) VALUES
(45, 10, 72),
(46, 10, 72),
(47, 10, 87),
(48, 10, 87),
(49, 10, 87),
(50, 10, 87),
(51, 10, 91),
(52, 10, 72),
(53, 10, 78),
(54, 10, 82),
(55, 10, 89),
(56, 10, 77),
(57, 10, 87);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bimestre`
--

CREATE TABLE `bimestre` (
  `idBimestre` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `bimestre`
--

INSERT INTO `bimestre` (`idBimestre`, `nombre`) VALUES
(1, 'BIMESTRE 1'),
(2, 'BIMESTRE 2'),
(3, 'BIMESTRE 3'),
(4, 'BIMESTRE 4'),
(5, 'BIMESTRE 5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `idCurso` int(11) NOT NULL,
  `anioInicio` date NOT NULL,
  `anioFin` date NOT NULL,
  `estatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`idCurso`, `anioInicio`, `anioFin`, `estatus`) VALUES
(9, '2017-08-06', '2018-01-06', 2),
(10, '2018-08-08', '2019-07-08', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `idDocente` int(11) NOT NULL,
  `rfc` varchar(13) COLLATE utf8_spanish_ci NOT NULL,
  `nombres` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `apPaterno` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `apMaterno` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `tipo` tinyint(1) NOT NULL,
  `numTel` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `colonia` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `calle` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `tipoSangre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `alergias` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `idRol` int(1) NOT NULL,
  `estatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `docente`
--

INSERT INTO `docente` (`idDocente`, `rfc`, `nombres`, `apPaterno`, `apMaterno`, `tipo`, `numTel`, `email`, `password`, `colonia`, `calle`, `tipoSangre`, `alergias`, `idRol`, `estatus`) VALUES
(59, 'MAGN710904VE1', 'NORMA', 'MARTINEZ', 'GALICIA', 2, '9512282599', 'normis0437@gmail.com', '$2y$10$Mdjes6fxpsO0GY/AGhrPzeIfq5AlNiDnCZhoDkK6KljCd0Qlkhbam', 'GOMEZ SANDOVALI', 'FRANCISCO I. MADERO', 'ORH+', 'POLVO', 2, 1),
(61, 'RICI931002HO9', 'IVAN', 'RIOS', 'CRUZ', 1, '9512112409', 'ivan@hotmail.com', '$2y$10$orJBhOpVOT8Sl2FzmHmeiuFkrjDRRy5n16rw2HWDTY.vq.JQZW2yO', 'ROMA', 'MEXICO', 'ORH-', 'PAN TOSTADO', 1, 1),
(62, 'CRHJ9104186P8', 'JAVIER', 'CRUZ', 'HERNANDEZ', 2, '9541519214', 'javi@hotmail.com', '$2y$10$Xeqq5yLhlD.aiJwx1/FeXej2qTKpntNrUypMBjW46S.7nrvagizo2', 'LAZARO', 'FERNANDO MONTES DE OCA', 'ORH+', 'ALACRANES', 2, 1),
(63, 'RIDD970222JN0', 'DANIA', 'RIOS', 'DIAZ', 2, '9541233475', 'dani@hotmail.com', '$2y$10$5GXeGEA23EIdi4MsEqlzC.BHT2py3n1y2iFVTjnBkRi63l9X0Tcfi', 'ROMA', 'OAXACA', 'ORH-', 'SAPOS LOCOS', 2, 1),
(64, 'BALE981212123', 'EDGAR YAEL', 'BARRITA', 'LECHUGA', 2, '9512753570', 'gabriela.cortes@outlook.com', '$2y$10$Bdebybl.NDerh.bkLGJBdecUn6pr26LwTFMI.ZK6x925ELjmQymzm', 'GAGAGAGAGAG', 'CALICANTO', 'ORH+', 'NINGUNA', 2, 0),
(65, 'MOVE7306078V3', 'ELSIE FERNANDA', 'MONZOY', 'VENTRE', 4, '8798778767', 'elsie.monzoy@itoaxaca.edu.mx', '$2y$10$1dexJuegN88dARU4Q8v.julTIxwNOQjeU6x79h/mzWhmFx7UaWVvm', 'REFORMA', 'AMAPOLAS', 'ORH+', 'AL TRABAJO', 4, 1),
(66, 'CLML110909', 'LIAM', 'CLEAR', 'MCGUILLE', 2, '98765678', 'dmnt_srd13@hotmail.com', '$2y$10$lVGM28.fjFvh0cSAnptW/.T1eaYx0exbJ2hjOjKddwSvG3tgMXPHK', 'LOS ALAMAOS', 'PEDREGA', 'ORH-', 'PAN TOSTADO', 2, 1),
(67, 'RIDM110309JN0', 'MIGUEL', 'RIOS', 'DIAZ', 5, '9876578987', 'said-ridi@outlook.com', '$2y$10$QJCiljNkUB51D1S...Qi6u6sexmkqf4rd5BDvNZdvkcwwWksskQua', 'ROMA', 'MEXICO', 'ORH-', 'PAN TOSTADO', 5, 1),
(68, 'ALCM0602264M6', 'MARISOL', 'ALTAMIRANO', 'CABRERA', 2, '9511017075', 'marisol_altamirano@hotmail.com', '$2y$10$L9doNqDpR4Z2oDM.emKv2.62EiJXdKtRC2C4J2fdgcEcO4O89idke', 'Emiliano Zapata', 'PRIVADA DE HIDALGO 109', 'ARH+', 'DE TODO', 2, 1);

--
-- Disparadores `docente`
--
DELIMITER $$
CREATE TRIGGER `docente_actualiza_info_au` AFTER UPDATE ON `docente` FOR EACH ROW UPDATE users SET 
    users.email=new.email, 
    users.nombre=new.nombres, 
    users.apPaterno=new.apPaterno, 
    users.apMaterno=new.apMaterno, 
    users.password=new.password, 
	users.rol_id=new.idRol,
	users.estatus=new.estatus
WHERE users.id_user=new.idDocente AND users.curp=new.rfc
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `docentes_ai` AFTER INSERT ON `docente` FOR EACH ROW insert into users(id_user, curp, email, nombre, apPaterno, apMaterno, password, rol_id,estatus) values
		(new.idDocente,new.rfc, new.email, new.nombres, new.apPaterno, new.apMaterno, new.password, new.idRol,new.estatus)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `eliminarDocente` AFTER DELETE ON `docente` FOR EACH ROW BEGIN
	DELETE FROM users WHERE users.id_user=old.idDocente And users.curp=old.rfc;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente_grupo`
--

CREATE TABLE `docente_grupo` (
  `idDocente` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `docente_grupo`
--

INSERT INTO `docente_grupo` (`idDocente`, `idCurso`, `idGrupo`) VALUES
(62, 10, 72),
(63, 10, 87);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `idAlumno` int(11) NOT NULL,
  `idBimestre` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idDocente` int(11) NOT NULL,
  `idMateria` int(11) NOT NULL,
  `califMateria` decimal(2,1) NOT NULL,
  `promMateria` decimal(2,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`idAlumno`, `idBimestre`, `idCurso`, `idDocente`, `idMateria`, `califMateria`, `promMateria`) VALUES
(47, 1, 10, 63, 100, '9.0', '0.0'),
(47, 2, 10, 63, 100, '8.6', '0.0'),
(47, 1, 10, 63, 105, '8.6', '0.0'),
(47, 2, 10, 63, 105, '9.5', '0.0'),
(47, 3, 10, 63, 100, '9.4', '0.0'),
(47, 4, 10, 63, 100, '9.3', '0.0'),
(47, 1, 10, 63, 104, '7.8', '0.0'),
(47, 2, 10, 63, 104, '8.8', '0.0'),
(47, 4, 10, 63, 105, '8.9', '0.0'),
(47, 5, 10, 63, 100, '8.4', '0.0'),
(47, 1, 10, 63, 98, '9.0', '0.0'),
(47, 2, 10, 63, 98, '9.4', '0.0'),
(47, 3, 10, 63, 105, '8.8', '0.0'),
(47, 1, 10, 63, 103, '8.9', '0.0'),
(47, 4, 10, 63, 104, '8.9', '0.0'),
(47, 5, 10, 63, 105, '8.9', '0.0'),
(47, 2, 10, 63, 103, '9.2', '0.0'),
(47, 3, 10, 63, 104, '9.3', '0.0'),
(47, 1, 10, 63, 101, '9.2', '0.0'),
(47, 4, 10, 63, 98, '9.4', '0.0'),
(47, 5, 10, 63, 104, '9.6', '0.0'),
(47, 2, 10, 63, 101, '9.6', '0.0'),
(47, 3, 10, 63, 98, '8.9', '0.0'),
(47, 1, 10, 63, 102, '9.9', '0.0'),
(47, 4, 10, 63, 103, '9.9', '0.0'),
(47, 5, 10, 63, 98, '9.9', '0.0'),
(47, 3, 10, 63, 103, '9.9', '0.0'),
(47, 1, 10, 63, 99, '9.9', '0.0'),
(47, 2, 10, 63, 102, '9.9', '0.0'),
(47, 4, 10, 63, 101, '9.9', '0.0'),
(47, 5, 10, 63, 103, '9.9', '0.0'),
(47, 3, 10, 63, 101, '9.9', '0.0'),
(47, 2, 10, 63, 99, '9.9', '0.0'),
(47, 3, 10, 63, 102, '9.8', '0.0'),
(47, 5, 10, 63, 101, '9.7', '0.0'),
(47, 4, 10, 63, 102, '9.6', '0.0'),
(47, 3, 10, 63, 99, '9.5', '0.0'),
(47, 5, 10, 63, 102, '9.7', '0.0'),
(47, 4, 10, 63, 99, '9.6', '0.0'),
(47, 5, 10, 63, 99, '9.8', '0.0'),
(48, 3, 10, 63, 100, '5.0', '0.0'),
(48, 2, 10, 63, 100, '0.0', '0.0'),
(48, 1, 10, 63, 100, '5.0', '0.0'),
(48, 4, 10, 63, 100, '9.9', '0.0'),
(48, 3, 10, 63, 105, '5.0', '0.0'),
(48, 5, 10, 63, 100, '5.0', '0.0'),
(48, 1, 10, 63, 105, '5.0', '0.0'),
(48, 2, 10, 63, 105, '5.0', '0.0'),
(48, 4, 10, 63, 105, '5.0', '0.0'),
(48, 3, 10, 63, 104, '5.0', '0.0'),
(48, 2, 10, 63, 104, '5.0', '0.0'),
(48, 1, 10, 63, 104, '5.0', '0.0'),
(48, 5, 10, 63, 105, '5.0', '0.0'),
(48, 4, 10, 63, 104, '5.0', '0.0'),
(48, 1, 10, 63, 98, '5.0', '0.0'),
(48, 2, 10, 63, 98, '5.0', '0.0'),
(48, 5, 10, 63, 104, '5.0', '0.0'),
(48, 3, 10, 63, 98, '5.0', '0.0'),
(48, 4, 10, 63, 98, '5.0', '0.0'),
(48, 1, 10, 63, 103, '5.0', '0.0'),
(48, 2, 10, 63, 103, '5.0', '0.0'),
(48, 3, 10, 63, 103, '9.9', '0.0'),
(48, 4, 10, 63, 103, '5.0', '0.0'),
(48, 1, 10, 63, 101, '5.0', '0.0'),
(48, 5, 10, 63, 98, '5.0', '0.0'),
(48, 2, 10, 63, 101, '5.0', '0.0'),
(48, 3, 10, 63, 101, '5.0', '0.0'),
(48, 1, 10, 63, 102, '5.0', '0.0'),
(48, 4, 10, 63, 101, '5.0', '0.0'),
(48, 3, 10, 63, 102, '5.0', '0.0'),
(48, 2, 10, 63, 102, '5.0', '0.0'),
(48, 4, 10, 63, 102, '5.0', '0.0'),
(48, 5, 10, 63, 103, '5.0', '0.0'),
(48, 1, 10, 63, 99, '5.0', '0.0'),
(48, 3, 10, 63, 99, '5.0', '0.0'),
(48, 4, 10, 63, 99, '5.0', '0.0'),
(48, 2, 10, 63, 99, '5.0', '0.0'),
(48, 5, 10, 63, 101, '5.0', '0.0'),
(48, 5, 10, 63, 102, '5.0', '0.0'),
(48, 5, 10, 63, 99, '5.0', '0.0'),
(48, 1, 9, 0, 98, '0.0', '0.0'),
(48, 1, 9, 0, 99, '0.0', '0.0'),
(48, 1, 9, 0, 100, '0.0', '0.0'),
(48, 1, 9, 0, 101, '0.0', '0.0'),
(48, 1, 9, 0, 102, '0.0', '0.0'),
(48, 1, 9, 0, 103, '0.0', '0.0'),
(48, 1, 9, 0, 104, '0.0', '0.0'),
(48, 1, 9, 0, 105, '0.0', '0.0'),
(48, 2, 9, 0, 98, '0.0', '0.0'),
(48, 2, 9, 0, 99, '0.0', '0.0'),
(48, 2, 9, 0, 100, '0.0', '0.0'),
(48, 2, 9, 0, 101, '0.0', '0.0'),
(48, 2, 9, 0, 102, '0.0', '0.0'),
(48, 2, 9, 0, 103, '0.0', '0.0'),
(48, 2, 9, 0, 104, '0.0', '0.0'),
(48, 2, 9, 0, 105, '0.0', '0.0'),
(48, 3, 9, 0, 98, '0.0', '0.0'),
(48, 3, 9, 0, 99, '0.0', '0.0'),
(48, 3, 9, 0, 100, '0.0', '0.0'),
(48, 3, 9, 0, 101, '0.0', '0.0'),
(48, 3, 9, 0, 102, '0.0', '0.0'),
(48, 3, 9, 0, 103, '0.0', '0.0'),
(48, 3, 9, 0, 104, '0.0', '0.0'),
(48, 3, 9, 0, 105, '0.0', '0.0'),
(48, 4, 9, 0, 98, '0.0', '0.0'),
(48, 4, 9, 0, 99, '0.0', '0.0'),
(48, 4, 9, 0, 100, '0.0', '0.0'),
(48, 4, 9, 0, 101, '0.0', '0.0'),
(48, 4, 9, 0, 102, '0.0', '0.0'),
(48, 4, 9, 0, 103, '0.0', '0.0'),
(48, 4, 9, 0, 104, '0.0', '0.0'),
(48, 4, 9, 0, 105, '0.0', '0.0'),
(48, 5, 9, 0, 98, '0.0', '0.0'),
(48, 5, 9, 0, 99, '0.0', '0.0'),
(48, 5, 9, 0, 100, '0.0', '0.0'),
(48, 5, 9, 0, 101, '0.0', '0.0'),
(48, 5, 9, 0, 102, '0.0', '0.0'),
(48, 5, 9, 0, 103, '0.0', '0.0'),
(48, 5, 9, 0, 104, '0.0', '0.0'),
(48, 5, 9, 0, 105, '0.0', '0.0'),
(49, 1, 10, 63, 100, '0.0', '0.0'),
(49, 3, 10, 63, 100, '0.0', '0.0'),
(49, 1, 10, 63, 105, '0.0', '0.0'),
(49, 2, 10, 63, 100, '0.0', '0.0'),
(49, 3, 10, 63, 105, '0.0', '0.0'),
(49, 1, 10, 63, 104, '0.0', '0.0'),
(49, 2, 10, 63, 105, '0.0', '0.0'),
(49, 4, 10, 63, 100, '0.0', '0.0'),
(49, 3, 10, 63, 104, '0.0', '0.0'),
(49, 5, 10, 63, 100, '0.0', '0.0'),
(49, 1, 10, 63, 98, '0.0', '0.0'),
(49, 4, 10, 63, 105, '0.0', '0.0'),
(49, 2, 10, 63, 104, '0.0', '0.0'),
(49, 1, 10, 63, 103, '0.0', '0.0'),
(49, 3, 10, 63, 98, '0.0', '0.0'),
(49, 5, 10, 63, 105, '0.0', '0.0'),
(49, 4, 10, 63, 104, '0.0', '0.0'),
(49, 1, 10, 63, 101, '0.0', '0.0'),
(49, 3, 10, 63, 103, '0.0', '0.0'),
(49, 2, 10, 63, 98, '0.0', '0.0'),
(49, 5, 10, 63, 104, '0.0', '0.0'),
(49, 1, 10, 63, 102, '0.0', '0.0'),
(49, 4, 10, 63, 98, '0.0', '0.0'),
(49, 3, 10, 63, 101, '0.0', '0.0'),
(49, 5, 10, 63, 98, '0.0', '0.0'),
(49, 1, 10, 63, 99, '0.0', '0.0'),
(49, 4, 10, 63, 103, '0.0', '0.0'),
(49, 2, 10, 63, 103, '0.0', '0.0'),
(49, 3, 10, 63, 102, '0.0', '0.0'),
(49, 4, 10, 63, 101, '0.0', '0.0'),
(49, 2, 10, 63, 101, '0.0', '0.0'),
(49, 5, 10, 63, 103, '0.0', '0.0'),
(49, 3, 10, 63, 99, '0.0', '0.0'),
(49, 4, 10, 63, 102, '0.0', '0.0'),
(49, 5, 10, 63, 101, '0.0', '0.0'),
(49, 2, 10, 63, 102, '0.0', '0.0'),
(49, 4, 10, 63, 99, '0.0', '0.0'),
(49, 5, 10, 63, 102, '0.0', '0.0'),
(49, 2, 10, 63, 99, '0.0', '0.0'),
(49, 5, 10, 63, 99, '0.0', '0.0'),
(50, 1, 10, 63, 100, '0.0', '0.0'),
(50, 2, 10, 63, 100, '0.0', '0.0'),
(50, 1, 10, 63, 105, '0.0', '0.0'),
(50, 2, 10, 63, 105, '0.0', '0.0'),
(50, 3, 10, 63, 100, '0.0', '0.0'),
(50, 1, 10, 63, 104, '0.0', '0.0'),
(50, 4, 10, 63, 100, '0.0', '0.0'),
(50, 2, 10, 63, 104, '0.0', '0.0'),
(50, 1, 10, 63, 98, '0.0', '0.0'),
(50, 3, 10, 63, 105, '0.0', '0.0'),
(50, 5, 10, 63, 100, '0.0', '0.0'),
(50, 2, 10, 63, 98, '0.0', '0.0'),
(50, 2, 10, 63, 103, '0.0', '0.0'),
(50, 4, 10, 63, 105, '0.0', '0.0'),
(50, 1, 10, 63, 103, '0.0', '0.0'),
(50, 3, 10, 63, 104, '0.0', '0.0'),
(50, 5, 10, 63, 105, '0.0', '0.0'),
(50, 2, 10, 63, 101, '0.0', '0.0'),
(50, 1, 10, 63, 101, '0.0', '0.0'),
(50, 4, 10, 63, 104, '0.0', '0.0'),
(50, 3, 10, 63, 98, '0.0', '0.0'),
(50, 2, 10, 63, 102, '0.0', '0.0'),
(50, 4, 10, 63, 98, '0.0', '0.0'),
(50, 3, 10, 63, 103, '0.0', '0.0'),
(50, 1, 10, 63, 102, '0.0', '0.0'),
(50, 5, 10, 63, 104, '0.0', '0.0'),
(50, 2, 10, 63, 99, '0.0', '0.0'),
(50, 4, 10, 63, 103, '0.0', '0.0'),
(50, 3, 10, 63, 101, '0.0', '0.0'),
(50, 1, 10, 63, 99, '0.0', '0.0'),
(50, 5, 10, 63, 98, '0.0', '0.0'),
(50, 4, 10, 63, 101, '0.0', '0.0'),
(50, 5, 10, 63, 103, '0.0', '0.0'),
(50, 3, 10, 63, 102, '0.0', '0.0'),
(50, 4, 10, 63, 102, '0.0', '0.0'),
(50, 3, 10, 63, 99, '0.0', '0.0'),
(50, 5, 10, 63, 101, '0.0', '0.0'),
(50, 4, 10, 63, 99, '0.0', '0.0'),
(50, 5, 10, 63, 102, '0.0', '0.0'),
(50, 5, 10, 63, 99, '0.0', '0.0'),
(51, 2, 10, 63, 100, '0.0', '0.0'),
(51, 3, 10, 63, 100, '0.0', '0.0'),
(51, 2, 10, 63, 105, '0.0', '0.0'),
(51, 1, 10, 63, 100, '0.0', '0.0'),
(51, 4, 10, 63, 100, '0.0', '0.0'),
(51, 3, 10, 63, 105, '0.0', '0.0'),
(51, 2, 10, 63, 104, '0.0', '0.0'),
(51, 4, 10, 63, 105, '0.0', '0.0'),
(51, 1, 10, 63, 105, '0.0', '0.0'),
(51, 3, 10, 63, 104, '0.0', '0.0'),
(51, 5, 10, 63, 100, '0.0', '0.0'),
(51, 2, 10, 63, 98, '0.0', '0.0'),
(51, 4, 10, 63, 104, '0.0', '0.0'),
(51, 1, 10, 63, 104, '0.0', '0.0'),
(51, 3, 10, 63, 98, '0.0', '0.0'),
(51, 5, 10, 63, 105, '0.0', '0.0'),
(51, 2, 10, 63, 103, '0.0', '0.0'),
(51, 3, 10, 63, 103, '0.0', '0.0'),
(51, 1, 10, 63, 98, '0.0', '0.0'),
(51, 4, 10, 63, 98, '0.0', '0.0'),
(51, 5, 10, 63, 104, '0.0', '0.0'),
(51, 2, 10, 63, 101, '0.0', '0.0'),
(51, 3, 10, 63, 101, '0.0', '0.0'),
(51, 1, 10, 63, 103, '0.0', '0.0'),
(51, 3, 10, 63, 102, '0.0', '0.0'),
(51, 4, 10, 63, 103, '0.0', '0.0'),
(51, 2, 10, 63, 102, '0.0', '0.0'),
(51, 5, 10, 63, 98, '0.0', '0.0'),
(51, 1, 10, 63, 101, '0.0', '0.0'),
(51, 2, 10, 63, 99, '0.0', '0.0'),
(51, 3, 10, 63, 99, '0.0', '0.0'),
(51, 5, 10, 63, 103, '0.0', '0.0'),
(51, 1, 10, 63, 102, '0.0', '0.0'),
(51, 4, 10, 63, 101, '0.0', '0.0'),
(51, 5, 10, 63, 101, '0.0', '0.0'),
(51, 1, 10, 63, 99, '0.0', '0.0'),
(51, 4, 10, 63, 102, '0.0', '0.0'),
(51, 5, 10, 63, 102, '0.0', '0.0'),
(51, 4, 10, 63, 99, '0.0', '0.0'),
(51, 5, 10, 63, 99, '0.0', '0.0'),
(52, 2, 10, 62, 68, '0.0', '0.0'),
(52, 3, 10, 62, 68, '0.0', '0.0'),
(52, 1, 10, 62, 68, '0.0', '0.0'),
(52, 4, 10, 62, 68, '0.0', '0.0'),
(52, 2, 10, 62, 67, '0.0', '0.0'),
(52, 3, 10, 62, 67, '0.0', '0.0'),
(52, 4, 10, 62, 67, '0.0', '0.0'),
(52, 1, 10, 62, 67, '0.0', '0.0'),
(52, 2, 10, 62, 63, '0.0', '0.0'),
(52, 3, 10, 62, 63, '0.0', '0.0'),
(52, 4, 10, 62, 63, '0.0', '0.0'),
(52, 5, 10, 62, 68, '0.0', '0.0'),
(52, 3, 10, 62, 65, '0.0', '0.0'),
(52, 2, 10, 62, 65, '0.0', '0.0'),
(52, 4, 10, 62, 65, '0.0', '0.0'),
(52, 3, 10, 62, 66, '0.0', '0.0'),
(52, 1, 10, 62, 63, '0.0', '0.0'),
(52, 5, 10, 62, 67, '0.0', '0.0'),
(52, 4, 10, 62, 66, '0.0', '0.0'),
(52, 2, 10, 62, 66, '0.0', '0.0'),
(52, 3, 10, 62, 64, '0.0', '0.0'),
(52, 4, 10, 62, 64, '0.0', '0.0'),
(52, 5, 10, 62, 63, '0.0', '0.0'),
(52, 1, 10, 62, 65, '0.0', '0.0'),
(52, 2, 10, 62, 64, '0.0', '0.0'),
(52, 5, 10, 62, 65, '0.0', '0.0'),
(52, 1, 10, 62, 66, '0.0', '0.0'),
(52, 5, 10, 62, 66, '0.0', '0.0'),
(52, 1, 10, 62, 64, '0.0', '0.0'),
(52, 5, 10, 62, 64, '0.0', '0.0'),
(57, 1, 10, 63, 100, '7.0', '0.0'),
(57, 2, 10, 63, 100, '0.0', '0.0'),
(57, 1, 10, 63, 105, '7.0', '0.0'),
(57, 2, 10, 63, 105, '0.0', '0.0'),
(57, 1, 10, 63, 104, '8.0', '0.0'),
(57, 2, 10, 63, 104, '9.5', '0.0'),
(57, 3, 10, 63, 100, '0.0', '0.0'),
(57, 1, 10, 63, 98, '7.0', '0.0'),
(57, 4, 10, 63, 100, '0.0', '0.0'),
(57, 2, 10, 63, 98, '0.0', '0.0'),
(57, 5, 10, 63, 100, '0.0', '0.0'),
(57, 1, 10, 63, 103, '7.0', '0.0'),
(57, 2, 10, 63, 103, '0.0', '0.0'),
(57, 4, 10, 63, 105, '0.0', '0.0'),
(57, 3, 10, 63, 105, '0.0', '0.0'),
(57, 5, 10, 63, 105, '0.0', '0.0'),
(57, 1, 10, 63, 101, '7.0', '0.0'),
(57, 2, 10, 63, 101, '0.0', '0.0'),
(57, 4, 10, 63, 104, '0.0', '0.0'),
(57, 5, 10, 63, 104, '0.0', '0.0'),
(57, 1, 10, 63, 102, '7.0', '0.0'),
(57, 3, 10, 63, 104, '0.0', '0.0'),
(57, 4, 10, 63, 98, '0.0', '0.0'),
(57, 2, 10, 63, 102, '0.0', '0.0'),
(57, 5, 10, 63, 98, '0.0', '0.0'),
(57, 4, 10, 63, 103, '0.0', '0.0'),
(57, 2, 10, 63, 99, '0.0', '0.0'),
(57, 1, 10, 63, 99, '7.0', '0.0'),
(57, 3, 10, 63, 98, '0.0', '0.0'),
(57, 5, 10, 63, 103, '0.0', '0.0'),
(57, 4, 10, 63, 101, '0.0', '0.0'),
(57, 3, 10, 63, 103, '0.0', '0.0'),
(57, 5, 10, 63, 101, '0.0', '0.0'),
(57, 3, 10, 63, 101, '0.0', '0.0'),
(57, 4, 10, 63, 102, '0.0', '0.0'),
(57, 5, 10, 63, 102, '0.0', '0.0'),
(57, 3, 10, 63, 102, '0.0', '0.0'),
(57, 4, 10, 63, 99, '0.0', '0.0'),
(57, 5, 10, 63, 99, '0.0', '0.0'),
(57, 3, 10, 63, 99, '0.0', '0.0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fechas_evaluaciones`
--

CREATE TABLE `fechas_evaluaciones` (
  `fecha_inicio_b1` date NOT NULL,
  `fecha_fin_b1` date NOT NULL,
  `fecha_inicio_b2` date NOT NULL,
  `fecha_fin_b2` date NOT NULL,
  `fecha_inicio_b3` date NOT NULL,
  `fecha_fin_b3` date NOT NULL,
  `fecha_inicio_b4` date NOT NULL,
  `fecha_fin_b4` date NOT NULL,
  `fecha_inicio_b5` date NOT NULL,
  `fecha_fin_b5` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `fechas_evaluaciones`
--

INSERT INTO `fechas_evaluaciones` (`fecha_inicio_b1`, `fecha_fin_b1`, `fecha_inicio_b2`, `fecha_fin_b2`, `fecha_inicio_b3`, `fecha_fin_b3`, `fecha_inicio_b4`, `fecha_fin_b4`, `fecha_inicio_b5`, `fecha_fin_b5`) VALUES
('2018-02-19', '2018-02-24', '2018-02-23', '2018-02-25', '2018-02-18', '2018-02-20', '2018-02-22', '2018-02-24', '2018-02-26', '2018-02-28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `idGrupo` int(11) NOT NULL,
  `nombre` varchar(1) COLLATE utf8_spanish_ci NOT NULL,
  `grado` int(11) NOT NULL,
  `maxAlumnos` int(11) NOT NULL,
  `totalAlumnos` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `estatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`idGrupo`, `nombre`, `grado`, `maxAlumnos`, `totalAlumnos`, `idCurso`, `estatus`) VALUES
(72, 'A', 1, 9, 9, 9, 1),
(73, 'B', 1, 45, 5, 9, 1),
(74, 'C', 1, 45, 0, 9, 1),
(75, 'A', 2, 45, 1, 9, 1),
(76, 'B', 2, 45, 1, 9, 1),
(77, 'C', 2, 45, 2, 9, 1),
(78, 'A', 3, 45, 1, 9, 1),
(79, 'B', 3, 45, 2, 9, 1),
(80, 'C', 3, 45, 2, 9, 1),
(82, 'B', 4, 45, 1, 9, 1),
(83, 'C', 4, 45, 0, 9, 1),
(84, 'A', 5, 45, 0, 9, 1),
(85, 'B', 5, 45, 0, 9, 1),
(86, 'C', 5, 45, 0, 9, 1),
(87, 'A', 6, 45, 2, 9, 1),
(88, 'B', 6, 45, 0, 9, 1),
(89, 'C', 6, 45, 1, 9, 1),
(91, 'A', 7, 45, 1, 9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_usuario`
--

CREATE TABLE `historial_usuario` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tipo_usuario` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `accion` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `id_objetivo` int(11) NOT NULL,
  `tipo_objetivo` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `campos_cambiados` varchar(300) COLLATE utf8mb4_spanish_ci NOT NULL,
  `valores_antiguos` varchar(300) COLLATE utf8mb4_spanish_ci NOT NULL,
  `valores_nuevos` varchar(300) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `historial_usuario`
--

INSERT INTO `historial_usuario` (`id`, `id_usuario`, `tipo_usuario`, `accion`, `id_objetivo`, `tipo_objetivo`, `campos_cambiados`, `valores_antiguos`, `valores_nuevos`, `fecha`) VALUES
(1, 59, 'DOCENTE', 'REGISTRO', 61, 'DOCENTE', 'null', 'null', 'null', '2018-02-23 04:02:17'),
(2, 61, 'DOCENTE', 'REGISTRO', 62, 'DOCENTE', 'null', 'null', 'null', '2018-02-23 04:09:49'),
(3, 61, 'DOCENTE', 'REGISTRO', 63, 'DOCENTE', 'null', 'null', 'null', '2018-02-23 04:11:53'),
(4, 62, 'DOCENTE', 'HABILITO', 24, 'ALUMNO', 'null', 'null', 'null', '2018-02-23 04:31:20'),
(5, 62, 'DOCENTE', 'HABILITO', 29, 'ALUMNO', 'null', 'null', 'null', '2018-02-23 04:36:33'),
(6, 62, 'DOCENTE', 'HABILITO', 30, 'ALUMNO', 'null', 'null', 'null', '2018-02-23 04:37:51'),
(7, 61, 'DOCENTE', 'REGISTRO', 64, 'DOCENTE', 'null', 'null', 'null', '2018-02-23 19:25:49'),
(8, 61, 'DOCENTE', 'REGISTRO', 65, 'DOCENTE', 'null', 'null', 'null', '2018-02-23 20:40:08'),
(9, 61, 'DOCENTE', 'HABILITO', 31, 'ALUMNO', 'null', 'null', 'null', '2018-02-24 03:14:04'),
(10, 61, 'DOCENTE', 'HABILITO', 31, 'ALUMNO', 'null', 'null', 'null', '2018-02-24 03:14:05'),
(11, 61, 'DOCENTE', 'HABILITO', 32, 'ALUMNO', 'null', 'null', 'null', '2018-02-24 05:35:02'),
(12, 61, 'DOCENTE', 'HABILITO', 32, 'ALUMNO', 'null', 'null', 'null', '2018-02-24 05:35:02'),
(13, 61, 'DOCENTE', 'HABILITO', 33, 'ALUMNO', 'null', 'null', 'null', '2018-02-25 20:00:55'),
(14, 61, 'DOCENTE', 'HABILITO', 33, 'ALUMNO', 'null', 'null', 'null', '2018-02-25 20:00:56'),
(15, 61, 'DOCENTE', 'REGISTRO', 66, 'DOCENTE', 'null', 'null', 'null', '2018-02-25 20:27:43'),
(16, 66, 'DOCENTE', 'REGISTRO', 67, 'DOCENTE', 'null', 'null', 'null', '2018-02-25 20:36:16'),
(17, 62, 'DOCENTE', 'HABILITO', 34, 'ALUMNO', 'null', 'null', 'null', '2018-02-26 05:36:31'),
(18, 62, 'DOCENTE', 'HABILITO', 35, 'ALUMNO', 'null', 'null', 'null', '2018-02-26 20:29:46'),
(19, 63, 'DOCENTE', 'HABILITO', 36, 'ALUMNO', 'null', 'null', 'null', '2018-02-26 23:17:36'),
(20, 63, 'DOCENTE', 'HABILITO', 37, 'ALUMNO', 'null', 'null', 'null', '2018-02-26 23:53:57'),
(21, 67, 'DOCENTE', 'HABILITO', 38, 'ALUMNO', 'null', 'null', 'null', '2018-02-27 11:04:35'),
(22, 67, 'DOCENTE', 'HABILITO', 39, 'ALUMNO', 'null', 'null', 'null', '2018-02-27 11:07:19'),
(23, 59, 'DOCENTE', 'HABILITO', 40, 'ALUMNO', 'null', 'null', 'null', '2018-02-27 15:23:41'),
(24, 59, 'DOCENTE', 'HABILITO', 41, 'ALUMNO', 'null', 'null', 'null', '2018-02-27 15:27:42'),
(25, 67, 'DOCENTE', 'HABILITO', 42, 'ALUMNO', 'null', 'null', 'null', '2018-02-27 17:30:24'),
(26, 67, 'DOCENTE', 'HABILITO', 43, 'ALUMNO', 'null', 'null', 'null', '2018-02-27 17:32:09'),
(27, 61, 'DOCENTE', 'REGISTRO', 68, 'DOCENTE', 'null', 'null', 'null', '2018-02-27 18:29:20'),
(28, 61, 'DOCENTE', 'HABILITO', 44, 'ALUMNO', 'null', 'null', 'null', '2018-02-27 18:36:14'),
(29, 61, 'DOCENTE', 'HABILITO', 44, 'ALUMNO', 'null', 'null', 'null', '2018-02-27 18:36:14'),
(30, 62, 'DOCENTE', 'HABILITO', 45, 'ALUMNO', 'null', 'null', 'null', '2018-03-01 06:49:33'),
(31, 62, 'DOCENTE', 'HABILITO', 46, 'ALUMNO', 'null', 'null', 'null', '2018-03-01 06:51:12'),
(32, 63, 'DOCENTE', 'HABILITO', 47, 'ALUMNO', 'null', 'null', 'null', '2018-03-03 19:04:08'),
(33, 63, 'DOCENTE', 'HABILITO', 48, 'ALUMNO', 'null', 'null', 'null', '2018-03-03 19:46:21'),
(34, 63, 'DOCENTE', 'HABILITO', 49, 'ALUMNO', 'null', 'null', 'null', '2018-03-03 20:40:34'),
(35, 63, 'DOCENTE', 'HABILITO', 50, 'ALUMNO', 'null', 'null', 'null', '2018-03-03 20:49:05'),
(36, 63, 'DOCENTE', 'HABILITO', 51, 'ALUMNO', 'null', 'null', 'null', '2018-03-03 20:58:43'),
(37, 62, 'DOCENTE', 'HABILITO', 52, 'ALUMNO', 'null', 'null', 'null', '2018-03-04 19:38:54'),
(38, 61, 'DOCENTE', 'HABILITO', 53, 'ALUMNO', 'null', 'null', 'null', '2018-03-04 21:14:27'),
(39, 61, 'DOCENTE', 'HABILITO', 53, 'ALUMNO', 'null', 'null', 'null', '2018-03-04 21:14:27'),
(40, 61, 'DOCENTE', 'HABILITO', 54, 'ALUMNO', 'null', 'null', 'null', '2018-03-04 21:23:39'),
(41, 61, 'DOCENTE', 'HABILITO', 54, 'ALUMNO', 'null', 'null', 'null', '2018-03-04 21:23:39'),
(42, 61, 'DOCENTE', 'HABILITO', 55, 'ALUMNO', 'null', 'null', 'null', '2018-03-05 00:40:58'),
(43, 61, 'DOCENTE', 'HABILITO', 56, 'ALUMNO', 'null', 'null', 'null', '2018-03-05 00:49:34'),
(44, 61, 'DOCENTE', 'HABILITO', 57, 'ALUMNO', 'null', 'null', 'null', '2018-03-05 01:10:34'),
(45, 61, 'DOCENTE', 'HABILITO', 57, 'ALUMNO', 'null', 'null', 'null', '2018-03-05 01:10:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario_temporal`
--

CREATE TABLE `horario_temporal` (
  `idDocente` int(11) NOT NULL,
  `idMateria` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  `hora` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `dia` varchar(11) COLLATE utf8_spanish_ci NOT NULL,
  `idCurso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `horario_temporal`
--

INSERT INTO `horario_temporal` (`idDocente`, `idMateria`, `idGrupo`, `hora`, `dia`, `idCurso`) VALUES
(62, 66, 72, '08:00:00 - 08:50:00', 'Lunes', 10),
(62, 64, 72, '08:50:00 - 09:40:00', 'Lunes', 10),
(62, 63, 72, '09:40:00 - 10:30:00', 'Lunes', 10),
(62, 67, 72, '11:00:00 - 11:50:00', 'Lunes', 10),
(62, 64, 72, '11:50:00 - 12:30:00', 'Lunes', 10),
(62, 64, 72, '08:00:00 - 08:50:00', 'Martes', 10),
(62, 65, 72, '08:50:00 - 09:40:00', 'Martes', 10),
(62, 64, 72, '09:40:00 - 10:30:00', 'Martes', 10),
(62, 66, 72, '11:00:00 - 11:50:00', 'Martes', 10),
(62, 68, 72, '11:50:00 - 12:30:00', 'Martes', 10),
(62, 63, 72, '08:00:00 - 08:50:00', 'Miercoles', 10),
(62, 64, 72, '08:50:00 - 09:40:00', 'Miercoles', 10),
(62, 66, 72, '09:40:00 - 10:30:00', 'Miercoles', 10),
(62, 65, 72, '11:00:00 - 11:50:00', 'Miercoles', 10),
(62, 64, 72, '11:50:00 - 12:30:00', 'Miercoles', 10),
(62, 65, 72, '08:00:00 - 08:50:00', 'Jueves', 10),
(62, 65, 72, '08:50:00 - 09:40:00', 'Jueves', 10),
(62, 68, 72, '09:40:00 - 10:30:00', 'Jueves', 10),
(62, 63, 72, '11:00:00 - 11:50:00', 'Jueves', 10),
(62, 63, 72, '11:50:00 - 12:30:00', 'Jueves', 10),
(62, 63, 72, '08:00:00 - 08:50:00', 'Viernes', 10),
(62, 63, 72, '08:50:00 - 09:40:00', 'Viernes', 10),
(62, 63, 72, '09:40:00 - 10:30:00', 'Viernes', 10),
(62, 63, 72, '11:00:00 - 11:50:00', 'Viernes', 10),
(62, 63, 72, '11:50:00 - 12:30:00', 'Viernes', 10),
(63, 102, 87, '08:00:00 - 08:50:00', 'Lunes', 10),
(63, 100, 87, '08:50:00 - 09:40:00', 'Lunes', 10),
(63, 103, 87, '09:40:00 - 10:30:00', 'Lunes', 10),
(63, 105, 87, '11:00:00 - 11:50:00', 'Lunes', 10),
(63, 103, 87, '11:50:00 - 12:30:00', 'Lunes', 10),
(63, 99, 87, '08:00:00 - 08:50:00', 'Martes', 10),
(63, 98, 87, '08:50:00 - 09:40:00', 'Martes', 10),
(63, 101, 87, '09:40:00 - 10:30:00', 'Martes', 10),
(63, 102, 87, '11:00:00 - 11:50:00', 'Martes', 10),
(63, 104, 87, '11:50:00 - 12:30:00', 'Martes', 10),
(63, 105, 87, '08:00:00 - 08:50:00', 'Miercoles', 10),
(63, 102, 87, '08:50:00 - 09:40:00', 'Miercoles', 10),
(63, 101, 87, '09:40:00 - 10:30:00', 'Miercoles', 10),
(63, 100, 87, '11:00:00 - 11:50:00', 'Miercoles', 10),
(63, 99, 87, '11:50:00 - 12:30:00', 'Miercoles', 10),
(63, 98, 87, '08:00:00 - 08:50:00', 'Jueves', 10),
(63, 99, 87, '08:50:00 - 09:40:00', 'Jueves', 10),
(63, 100, 87, '09:40:00 - 10:30:00', 'Jueves', 10),
(63, 101, 87, '11:00:00 - 11:50:00', 'Jueves', 10),
(63, 99, 87, '11:50:00 - 12:30:00', 'Jueves', 10),
(63, 98, 87, '08:00:00 - 08:50:00', 'Viernes', 10),
(63, 99, 87, '08:50:00 - 09:40:00', 'Viernes', 10),
(63, 98, 87, '09:40:00 - 10:30:00', 'Viernes', 10),
(63, 98, 87, '11:00:00 - 11:50:00', 'Viernes', 10),
(63, 98, 87, '11:50:00 - 12:30:00', 'Viernes', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `idMateria` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `grado` int(1) NOT NULL,
  `horas` int(255) NOT NULL,
  `estatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`idMateria`, `nombre`, `grado`, `horas`, `estatus`) VALUES
(63, 'ESPAÑOL', 1, 9, 1),
(64, 'MATEMÁTICAS', 1, 6, 1),
(65, 'EXPLORACIÓN DE LA NATURALEZA Y LA SOCIEDAD', 1, 4, 1),
(66, 'FORMACIÓN CÍVICA Y ÉTICA', 1, 3, 1),
(67, 'EDUCACIÓN FÍSICA', 1, 1, 1),
(68, 'EDUCACIÓN ARTÍSTICA', 1, 2, 1),
(69, 'ESPAÑOL', 2, 9, 1),
(70, 'MATEMATICAS', 2, 6, 1),
(71, 'EXPLORACIÓN DE LA NATURALEZA Y LA SOCIEDAD', 2, 3, 1),
(72, 'FORMACIÓN CÍVICA Y ÉTICA', 2, 3, 1),
(73, 'EDUCACIÓN FÍSICA', 2, 1, 1),
(74, 'EDUCACIÓN ARTÍSTICA', 2, 3, 1),
(75, 'ESPAÑOL', 3, 6, 1),
(76, 'MATEMÁTICAS', 3, 5, 1),
(77, 'CIENCIAS NATURALES', 3, 4, 1),
(78, 'LA ENTIDAD DONDE VIVO', 3, 4, 1),
(79, 'FORMACIÓN CÍVICA Y ÉTICA', 3, 3, 1),
(80, 'EDUCACIÓN FÍSICA', 3, 1, 1),
(81, 'EDUCACIÓN ARTÍSTICA', 3, 2, 1),
(82, 'ESPAÑOL', 4, 6, 1),
(83, 'MATEMÁTICAS', 4, 5, 1),
(84, 'CIENCIAS NATURALES', 4, 3, 1),
(85, 'GEOGRAFÍA', 4, 3, 1),
(86, 'HISTORIA', 4, 3, 1),
(87, 'FORMACIÓN CÍVICA Y ÉTICA', 4, 2, 1),
(88, 'EDUCACIÓN FÍSICA', 4, 1, 1),
(89, 'EDUCACIÓN ARTÍSTICA', 4, 2, 1),
(90, 'ESPAÑOL', 5, 6, 1),
(91, 'MATEMÁTICAS', 5, 5, 1),
(92, 'CIENCIAS NATURALES', 5, 3, 1),
(93, 'GEOGRAFÍA', 5, 3, 1),
(94, 'HISTORIA', 5, 3, 1),
(95, 'FORMACIÓN CÍVICA Y ÉTICA', 5, 2, 1),
(96, 'EDUCACIÓN FÍSICA', 5, 1, 1),
(97, 'EDUCACIÓN ARTÍSTICA', 5, 2, 1),
(98, 'ESPAÑOL', 6, 6, 1),
(99, 'MATEMÁTICAS', 6, 5, 1),
(100, 'CIENCIAS NATURALES', 6, 3, 1),
(101, 'GEOGRAFÍA', 6, 3, 1),
(102, 'HISTORIA', 6, 3, 1),
(103, 'FORMACIÓN CÍVICA Y ÉTICA', 6, 2, 1),
(104, 'EDUCACIÓN FÍSICA', 6, 1, 1),
(105, 'EDUCACIÓN ARTÍSTICA', 6, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre`) VALUES
(1, 'DIRECTOR'),
(2, 'DOCENTE'),
(3, 'ALUMNO'),
(4, 'ADMINISTRADOR'),
(5, 'EDFISICA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `token_password`
--

CREATE TABLE `token_password` (
  `user` int(200) NOT NULL,
  `correo` varchar(200) COLLATE utf8mb4_spanish_ci NOT NULL,
  `token` varchar(200) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `token_password`
--

INSERT INTO `token_password` (`user`, `correo`, `token`) VALUES
(2, 'dmnt_srd13@hotmail.com', '946a636a3e8d716bcee3a59cc384eb6748da58f1d0c4d5f88bb7e7c70715f28a2d5dc768ebbd52a4ef344beb2984efc9a7ef2454276fce6ada688fd848d539de'),
(1, 'said-ridi@outlook.com', '594db6f54b4e3cbf17e69d3751a37d1ef3cd9afd429a37dc847e1841284bfc221cd846b743ffffafad79acdcdfba1120c3939a51cffa51ad7bfb4bc18c5a5386'),
(2, 'said-ridi@outlook.com', '4a69f972083e7abcee027987c778cab79f912e629a1f31380b7da1d165b63bf761ee269b744e68cbc4e8be872fd25791b4a5c4a2eb7eb8032ee22ac767c05733');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `curp` varchar(18) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `apPaterno` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `apMaterno` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `rol_id` int(11) NOT NULL,
  `estatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `id_user`, `curp`, `email`, `nombre`, `apPaterno`, `apMaterno`, `password`, `rol_id`, `estatus`) VALUES
(116, 59, 'MAGN710904VE1', 'normis0437@gmail.com', 'NORMA', 'MARTINEZ', 'GALICIA', '$2y$10$Mdjes6fxpsO0GY/AGhrPzeIfq5AlNiDnCZhoDkK6KljCd0Qlkhbam', 2, 1),
(123, 61, 'RICI931002HO9', 'ivan@hotmail.com', 'IVAN', 'RIOS', 'CRUZ', '$2y$10$orJBhOpVOT8Sl2FzmHmeiuFkrjDRRy5n16rw2HWDTY.vq.JQZW2yO', 1, 1),
(124, 62, 'CRHJ9104186P8', 'javi@hotmail.com', 'JAVIER', 'CRUZ', 'HERNANDEZ', '$2y$10$Xeqq5yLhlD.aiJwx1/FeXej2qTKpntNrUypMBjW46S.7nrvagizo2', 2, 1),
(125, 63, 'RIDD970222JN0', 'dani@hotmail.com', 'DANIA', 'RIOS', 'DIAZ', '$2y$10$5GXeGEA23EIdi4MsEqlzC.BHT2py3n1y2iFVTjnBkRi63l9X0Tcfi', 2, 1),
(130, 64, 'BALE981212123', 'gabriela.cortes@outlook.com', 'EDGAR YAEL', 'BARRITA', 'LECHUGA', '$2y$10$Bdebybl.NDerh.bkLGJBdecUn6pr26LwTFMI.ZK6x925ELjmQymzm', 2, 0),
(131, 65, 'MOVE7306078V3', 'elsie.monzoy@itoaxaca.edu.mx', 'ELSIE FERNANDA', 'MONZOY', 'VENTRE', '$2y$10$1dexJuegN88dARU4Q8v.julTIxwNOQjeU6x79h/mzWhmFx7UaWVvm', 4, 1),
(135, 66, 'CLML110909', 'dmnt_srd13@hotmail.com', 'LIAM', 'CLEAR', 'MCGUILLE', '$2y$10$lVGM28.fjFvh0cSAnptW/.T1eaYx0exbJ2hjOjKddwSvG3tgMXPHK', 2, 1),
(136, 67, 'RIDM110309JN0', 'said-ridi@outlook.com', 'MIGUEL', 'RIOS', 'DIAZ', '$2y$10$QJCiljNkUB51D1S...Qi6u6sexmkqf4rd5BDvNZdvkcwwWksskQua', 5, 1),
(147, 68, 'ALCM6902264M6', 'marisol_altamirano@hotmail.com', 'MARISOL', 'ALTAMIRANO', 'CABRERA', '$2y$10$L9doNqDpR4Z2oDM.emKv2.62EiJXdKtRC2C4J2fdgcEcO4O89idke', 2, 1),
(149, 45, 'VARA110309MOCLSNA2', 'antonia@hotmail.com', 'ANTONIA', 'VALLE', 'ROSALES', '$2y$10$PLtEx7y7fxuPy0fBjM0u5OV4cONZNIQjyW1pYT/Rfj8BKtkCamWvG', 3, 1),
(150, 46, 'HUDE111210HOCMZDA2', 'edwing@hotmail.com', 'EDWING', 'HUMANZOR', 'DIAZ', '$2y$10$xU1d0WWmvWkejjusQFpMkeDGjHAUGq5qWH5C8qak1scEPalZH7Um2', 3, 1),
(151, 47, 'CUME050409HOCRNSA3', 'esteban@hotmail.com', 'ESTEBAN', 'CRUZ', 'MENDEZ', '$2y$10$RJBJtGgo6ag6d44n6iaun.Xv2gpTOtGuZnDyLa10PkdwwUUuN942G', 3, 1),
(152, 48, 'CUCD050309MOCRRNA7', 'diana@hotmail.com', 'DIANA', 'CRUZ', 'CARMONA', '$2y$10$X1FstJrUz.M6IyFgecA1juqn0nIn4sVQ9HdvPlwQwc.UeI/osevle', 3, 1),
(153, 49, 'CAME050709HOCSNMA3', 'emma@hotmail.com', 'EMMANUEL', 'CASTILLO', 'MONSOON', '$2y$10$cIiToKrYRl2JY.2IDVEIFe8ef7GHbHa8W2pKl82tFhK81W05XUeLS', 3, 1),
(154, 50, 'CUDC050809MOCNZTA3', 'catalina@hotmail.com', 'CATALINA', 'CUANCHE', 'DIAZ', '$2y$10$55hy4Yl9fQQkonn.DnO7oOZSj3LK.2.338fCf/5bOsPBsEVhGI0qe', 3, 1),
(155, 51, 'DIMS050809MOCZRRA0', 'sere@hotmail.com', 'SERENA', 'DIAZ', 'MARTINEZ', '$2y$10$SRGYHKDTsVcbrzwsTJiQa.FcuHV3fOuBvzi.RYHuNcekw1jngVizG', 3, 1),
(156, 52, 'DIAL110909MOCZLLA8', 'lola@hotmail.com', 'LOLA', 'DIAZ', 'ALAVEZ', '$2y$10$yVjBmAo8UXLjE.yzj3kp5uSQxrXRlptcO217ZyXS0ooU4L3fCiJua', 3, 1),
(157, 53, 'SACE090909MOCRHSA1', 'estela@hotmail.com', 'ESTELA', 'SARMIENTO', 'CHAVEZ', '$2y$10$YRkzF9Ug7/OHY/1rWQ4szONINZ05C1AEB8pD7MFLxjhBpkgqcOli6', 3, 1),
(158, 54, 'MICN080909MOCSRMA1', 'nao@hotmail.com', 'NAOMI', 'MISANTY', 'CURSELL', '$2y$10$9lFYGG7l/D2yzukWikcugu49ZX9C7T59agtrb3betrt0ehCN7x4Lq', 3, 1),
(159, 55, 'VAMJ060509MOCSTSA8', 'josefi@hotmail.com', 'JOSEFINA', 'VASQUEZ', 'MOTA', '$2y$10$EcP7maQoHIs2IyncjifxFuttb9xV8obgRSXucQoXxKsHpVVznxc8K', 3, 1),
(160, 56, 'VEVS110909MOCLLFA5', 'sofi@hotmail.com', 'SOFIA', 'VELGARA', 'VOLCANES', '$2y$10$kQuTU22JBjAVHHdrM8axNOdb9zXA4xy42flEIN7nz3/DPEkbKtQYq', 3, 1),
(161, 57, 'ROMG050509MOCSLRA2', 'griss@hotmail.com', 'GRISS', 'ROSADO', 'MOLINA', '$2y$10$oay0RwflZs/C1CWAm6kCs.2GbuxDFkZGGi0YWhWZElXOFzW5Ptnom', 3, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`idAlumno`),
  ADD UNIQUE KEY `curp` (`curp`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `FK_id_rollo` (`idRol`);

--
-- Indices de la tabla `alumno_grupo`
--
ALTER TABLE `alumno_grupo`
  ADD KEY `id_al_fk` (`idAlumno`),
  ADD KEY `id_curso_fk` (`idCurso`),
  ADD KEY `id_gpo_fk` (`idGrupo`);

--
-- Indices de la tabla `bimestre`
--
ALTER TABLE `bimestre`
  ADD PRIMARY KEY (`idBimestre`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`idCurso`);

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`idDocente`),
  ADD UNIQUE KEY `rfc` (`rfc`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `docente_grupo`
--
ALTER TABLE `docente_grupo`
  ADD KEY `id_docen` (`idDocente`),
  ADD KEY `id_cur` (`idCurso`),
  ADD KEY `id_grup` (`idGrupo`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD KEY `fk_idAlum` (`idAlumno`),
  ADD KEY `fk_idBim` (`idBimestre`),
  ADD KEY `fk_idDoc` (`idDocente`),
  ADD KEY `fk_idMat` (`idMateria`),
  ADD KEY `fk_idCursito` (`idCurso`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`idGrupo`),
  ADD KEY `FK_idCur` (`idCurso`);

--
-- Indices de la tabla `historial_usuario`
--
ALTER TABLE `historial_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `horario_temporal`
--
ALTER TABLE `horario_temporal`
  ADD KEY `FK_idDocentito` (`idDocente`),
  ADD KEY `FK_idGrupillo` (`idGrupo`),
  ADD KEY `FK_idCursillo` (`idCurso`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`idMateria`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`email`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `FK_rol_ide` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumno`
--
ALTER TABLE `alumno`
  MODIFY `idAlumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `bimestre`
--
ALTER TABLE `bimestre`
  MODIFY `idBimestre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `docente`
--
ALTER TABLE `docente`
  MODIFY `idDocente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `idGrupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT de la tabla `historial_usuario`
--
ALTER TABLE `historial_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `idMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `FK_id_rollo` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alumno_grupo`
--
ALTER TABLE `alumno_grupo`
  ADD CONSTRAINT `id_al_fk` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_curso_fk` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_gpo_fk` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `docente_grupo`
--
ALTER TABLE `docente_grupo`
  ADD CONSTRAINT `id_cur` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_docen` FOREIGN KEY (`idDocente`) REFERENCES `docente` (`idDocente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_grup` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD CONSTRAINT `fk_idAlum` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idBim` FOREIGN KEY (`idBimestre`) REFERENCES `bimestre` (`idBimestre`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idCursito` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idMat` FOREIGN KEY (`idMateria`) REFERENCES `materia` (`idMateria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `FK_idCur` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `horario_temporal`
--
ALTER TABLE `horario_temporal`
  ADD CONSTRAINT `FK_idCursillo` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_idDocentito` FOREIGN KEY (`idDocente`) REFERENCES `docente` (`idDocente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_idGrupillo` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_rol_ide` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id_rol`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
