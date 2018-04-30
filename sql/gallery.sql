-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 30, 2018 at 02:11 PM
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
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `filename` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `lat` decimal(15,12) DEFAULT NULL,
  `lng` decimal(15,12) DEFAULT NULL,
  `author` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`filename`, `date`, `lat`, `lng`, `author`, `description`) VALUES
('a1.jpg', '2018-04-15 00:00:00', '0.000000000000', '0.000000000000', '', ''),
('a2.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a3.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a4.jpg', '2018-04-07 00:00:00', NULL, NULL, '', ''),
('a5.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a6.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a7.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a8.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a9.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a10.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a11.jpg', '2018-04-15 00:00:00', '0.000000000000', '0.000000000000', '', ''),
('a12.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a13.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a14.jpg', '2018-04-07 00:00:00', NULL, NULL, '', ''),
('a15.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a16.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a17.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a18.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a19.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a20.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a21.jpg', '2018-04-15 00:00:00', '0.000000000000', '0.000000000000', '', ''),
('a22.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a23.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a24.jpg', '2018-04-07 00:00:00', NULL, NULL, '', ''),
('a25.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a26.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a27.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a28.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a29.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a30.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a31.jpg', '2018-04-15 00:00:00', '0.000000000000', '0.000000000000', '', ''),
('a32.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a33.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a34.jpg', '2018-04-07 00:00:00', NULL, NULL, '', ''),
('a35.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a36.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a37.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a38.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a39.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a40.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a41.jpg', '2018-04-15 00:00:00', '0.000000000000', '0.000000000000', '', ''),
('a42.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a43.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a44.jpg', '2018-04-07 00:00:00', NULL, NULL, '', ''),
('a45.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a46.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a47.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a48.jpg', '2018-04-02 00:00:00', NULL, NULL, '', ''),
('a49.jpg', '2018-04-03 00:00:00', NULL, NULL, '', ''),
('a50.jpg', '2018-04-03 00:00:00', NULL, NULL, '', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
