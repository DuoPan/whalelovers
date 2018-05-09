-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2018 at 12:45 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

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
-- Table structure for table `predictionplaces`
--

CREATE TABLE `predictionplaces` (
  `State` varchar(100) NOT NULL,
  `Spots` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `predictionplaces`
--

INSERT INTO `predictionplaces` (`State`, `Spots`) VALUES
('Victoria', 'Great Ocean Road,Phillip Island,Portland,Warrmabool'),
('New South Wales', 'Byron Bay,Coffs Harb,Port macquare,Gosford,Wollongo,Batemans Bay'),
('Northern Territory', 'Darwin,Tiwi Island,Cobourg Coastal Camp,Field Island,Pellew Island'),
('Queensland', 'Withsundays,Hervey Bay,Amity Point'),
('South Australia', 'Victor Harbour,Great Australian Bright Marine Park,Port Lincoln'),
('Tasmania', 'Burny Island,Port Arthur'),
('Western Australia', 'Albany Western Australia,Exmouth,Hamelin Bay');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
