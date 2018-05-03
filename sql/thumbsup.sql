-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 03, 2018 at 03:40 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asiadock`
--

-- --------------------------------------------------------

--
-- Table structure for table `thumbsup`
--

CREATE TABLE `thumbsup` (
  `ip` varchar(20) NOT NULL,
  `filename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `thumbsup`
--

INSERT INTO `thumbsup` (`ip`, `filename`) VALUES
('110.22.93.24', '1525260488e2.jpeg'),
('110.22.93.24', '1525258118bg212.jpg'),
('110.22.93.24', '1525258118bg24.jpg'),
('110.22.93.24', '1525258118bg211.jpg'),
('110.22.93.24', '1525258118bg210.jpg'),
('110.22.93.24', '1525258118bg213.jpg'),
('110.22.93.24', '1525258118bg27.jpg'),
('110.22.93.24', '1525258118bg28.jpg'),
('110.22.93.24', '1525258118bg29.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
