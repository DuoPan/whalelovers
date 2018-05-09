-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2018 at 12:44 PM
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
-- Table structure for table `prediction`
--

CREATE TABLE `prediction` (
  `State` varchar(100) NOT NULL,
  `Whales` varchar(1000) NOT NULL,
  `Months` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prediction`
--

INSERT INTO `prediction` (`State`, `Whales`, `Months`) VALUES
('Victoria', 'Common bottlenose dolphin ', '2,3,4'),
('Victoria', 'Humpback whale', '5,6,7,8,9,10'),
('Victoria', 'Southern right whale', '5,6,7,8,9,10'),
('New South Wales', 'Common bottlenose dolphin', '10,11,12'),
('New South Wales', 'Common dolphin ', '6,7'),
('New South Wales', 'Humpback whale', '7,8,9,10,11,12'),
('New South Wales', 'Southern right whale', '7,8,9'),
('Northern Territory', 'Australian humpback dolphin', '3,4,5,6,10,11,12'),
('Northern Territory', 'Australian snubfin dolphin', '3,4,5,10,11,12'),
('South Australia', 'Common bottlenose dolphin', '3,4,5,6,7,8,9'),
('South Australia', 'Common dolphin', '2,3,4,5,6,7'),
('South Australia', 'Humpback whale', '5,6,7,8'),
('South Australia', 'Southern right whale', '5,6,7,8,9'),
('Queensland', 'Australian humpback dolphin', '7,8,9,10,11'),
('Queensland', 'Humpback whale', '6,78,9'),
('Queensland', 'Spinner dolphin', '6,7,8'),
('Tasmania', 'Common bottlenose dolphin', '1,2,3'),
('Tasmania', 'Common dolphin', '1,2,3,4,5'),
('Tasmania', 'Humpback whale', '11,12'),
('Tasmania', 'Killer whale', '1,2,3'),
('Western Australia', 'Blue whale', '3,4'),
('Western Australia', 'Common bottlenose dolphin ', '3,4,5,6'),
('Western Australia', 'Humpback whale', '7,8,9,10'),
('Victoria', 'Killer whale', '3,4,5,6'),
('South Australia', 'Killer whale', '4,5,6');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
