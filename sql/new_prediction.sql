-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2018 at 10:25 PM
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
-- Table structure for table `new_prediction`
--

CREATE TABLE `new_prediction` (
  `Whale` varchar(200) NOT NULL,
  `location` varchar(1000) NOT NULL,
  `months` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `new_prediction`
--

INSERT INTO `new_prediction` (`Whale`, `location`, `months`) VALUES
('Common dolphin', 'Victor Harbour,South Australia', '1'),
('Common dolphin', 'Victor Harbour,South Australia', '2'),
('Common dolphin', 'Victor Harbour,South Australia', '3'),
('Common dolphin', 'Central Coast, New South Wales', '1'),
('Common dolphin', 'Central Coast, New South Wales', '3'),
('Common dolphin', 'Central Coast, New South Wales', '7'),
('Common dolphin', 'Port Lincoln,South Australia', '1'),
('Common dolphin', 'Port Lincoln,South Australia', '2'),
('Common dolphin', 'Port Lincoln,South Australia', '3'),
('Common dolphin', 'Port Lincoln,South Australia', '4'),
('Common dolphin', 'Port Lincoln,South Australia', '5'),
('Common dolphin', 'Port Lincoln,South Australia', '6'),
('Common dolphin', 'Port Lincoln,South Australia', '7'),
('Common dolphin', 'Port Lincoln,South Australia', '8'),
('Common dolphin', 'Port Lincoln,South Australia', '9'),
('Common dolphin', 'Port Lincoln,South Australia', '10'),
('Common dolphin', 'Port Lincoln,South Australia', '11'),
('Common dolphin', 'Port Lincoln,South Australia', '12'),
('Common dolphin', 'Victor Harbour,South Australia', '4'),
('Common dolphin', 'Victor Harbour,South Australia', '5'),
('Common dolphin', 'Victor Harbour,South Australia', '6'),
('Common dolphin', 'Victor Harbour,South Australia', '7'),
('Common dolphin', 'Victor Harbour,South Australia', '8'),
('Common dolphin', 'Victor Harbour,South Australia', '9'),
('Common dolphin', 'Victor Harbour,South Australia', '10'),
('Common dolphin', 'Victor Harbour,South Australia', '11'),
('Common dolphin', 'Victor Harbour,South Australia', '12'),
('Common dolphin', 'Tamboon,Victoria', '2'),
('Common dolphin', 'Sorronto,Victoria', '5'),
('Common dolphin', 'Sorronto,Victoria', '6'),
('Common dolphin', 'Sorronto,Victoria', '7'),
('Common dolphin', 'Sorronto,Victoria', '8'),
('Common dolphin', 'Sorronto,Victoria', '10'),
('Dward minke whale', 'Parsel Bay Reserve, New South wales', '5'),
('Dward minke whale', 'Parsel Bay Reserve, New South wales', '5'),
('Dward minke whale', 'Parsel Bay Reserve, New South wales', '7'),
('Dward minke whale', 'Tamboon,Victoria', '9'),
('Dward minke whale', 'Sorronto,Victoria', '9'),
('Humpback whale', 'Victor Harbour,South Australia', '4'),
('Humpback whale', 'Victor Harbour,South Australia', '6'),
('Humpback whale', 'Victor Harbour,South Australia', '7'),
('Humpback whale', 'Victor Harbour,South Australia', '8'),
('Humpback whale', 'Warrnambool, Victoria', '2'),
('Humpback whale', 'Warrnambool, Victoria', '5'),
('Humpback whale', 'Warrnambool, Victoria', '6'),
('Humpback whale', 'Warrnambool, Victoria', '7'),
('Humpback whale', 'Warrnambool, Victoria', '8'),
('Humpback whale', 'Portland, Victoria', '5'),
('Humpback whale', 'Portland, Victoria', '6'),
('Humpback whale', 'Portland, Victoria', '7'),
('Humpback whale', 'Portland, Victoria', '8'),
('Humpback whale', 'Philip Island, Victoria', '1'),
('Humpback whale', 'Philip Island, Victoria', '2'),
('Humpback whale', 'Philip Island, Victoria', '3'),
('Humpback whale', 'Philip Island, Victoria', '5'),
('Humpback whale', 'Philip Island, Victoria', '6'),
('Humpback whale', 'Philip Island, Victoria', '7'),
('Humpback whale', 'Philip Island, Victoria', '8'),
('Humpback whale', 'Philip Island, Victoria', '10'),
('Humpback whale', 'Gosford, New South Wales', '3'),
('Humpback whale', 'Manly, New South Wales', '6'),
('Humpback whale', 'Whale Beach, New South Wales', '6'),
('Humpback whale', 'Whale Beach, New South Wales', '10'),
('Humpback whale', 'Whale Beach, New South Wales', '11'),
('Humpback whale', 'Whale Beach, New South Wales', '12'),
('Humpback whale', 'Copacabana, New South Wales', '6'),
('Humpback whale', 'Evans head, New South Wales', '6'),
('Humpback whale', 'Wilson Promontory Park, Victoria', '6'),
('Humpback whale', 'Wilson Promontory Park, Victoria', '7'),
('Humpback whale', 'Wilson Promontory Park, Victoria', '8'),
('Humpback whale', 'Wilson Promontory Park, Victoria', '9'),
('Humpback whale', 'Wilson Promontory Park, Victoria', '10'),
('Humpback whale', 'Wilson Promontory Park, Victoria', '11'),
('Humpback whale', 'Withsunday, Queensland', '7'),
('Humpback whale', 'Withsunday, Queensland', '8'),
('Humpback whale', 'Eden, New South Wales', '10'),
('Humpback whale', 'Eden, New South Wales', '11'),
('Humpback whale', 'Eden, New South Wales', '12'),
('Killer whale', 'Philip Island, Victoria', '5'),
('Killer whale', 'Philip Island, Victoria', '6'),
('Killer whale', 'Philip Island, Victoria', '7'),
('Killer whale', 'Philip Island, Victoria', '8'),
('Killer whale', 'Philip Island, Victoria', '10'),
('Killer whale', 'Philip Island, Victoria', '11'),
('Killer whale', 'Philip Island, Victoria', '12'),
('Killer whale', 'Sorronto,Victoria', '5'),
('Killer whale', 'Sorronto,Victoria', '6'),
('Killer whale', 'Sorronto,Victoria', '7'),
('Killer whale', 'Sorronto,Victoria', '8'),
('Killer whale', 'Sorronto,Victoria', '10'),
('Killer whale', 'Sorronto,Victoria', '12'),
('Killer whale', 'Great Ocean Road, Victoria', '4'),
('Killer whale', 'Great Ocean Road, Victoria', '6'),
('Killer whale', 'Great Ocean Road, Victoria', '7'),
('Killer whale', 'Great Ocean Road, Victoria', '8'),
('Killer whale', 'Great Ocean Road, Victoria', '10'),
('Killer whale', 'Great Ocean Road, Victoria', '12'),
('Killer whale', 'Portland, Victoria', '2'),
('Killer whale', 'Portland, Victoria', '5'),
('Killer whale', 'Portland, Victoria', '6'),
('Killer whale', 'Portland, Victoria', '7'),
('Killer whale', 'Portland, Victoria', '8'),
('Killer whale', 'Portland, Victoria', '9'),
('Killer whale', 'Portland, Victoria', '12'),
('Killer whale', 'Warrnambool, Victoria', '6'),
('Killer whale', 'Warrnambool, Victoria', '7'),
('Killer whale', 'Warrnambool, Victoria', '8'),
('Killer whale', 'Warrnambool, Victoria', '12'),
('Spinner dolphin', 'Cairns, Queensland', '1'),
('Spinner dolphin', 'Galiwinku, Northern Territory', '4'),
('Spinner dolphin', 'Percy Group, Queensland', '7'),
('Spinner dolphin', 'Percy Group, Queensland', '8'),
('Spinner dolphin', 'Yeppoon, Queensland', '7'),
('Spinner dolphin', 'Minjilang, Queensland', '10'),
('Spinner dolphin', 'Wigram Island, Northern Territory', '11'),
('Southern right whale', 'Philip Island, Victoria', '1'),
('Southern right whale', 'Warrnambool, Victoria', '2'),
('Southern right whale', 'Warrnambool, Victoria', '3'),
('Southern right whale', 'Warrnambool, Victoria', '4'),
('Southern right whale', 'Warrnambool, Victoria', '5'),
('Southern right whale', 'Warrnambool, Victoria', '6'),
('Southern right whale', 'Warrnambool, Victoria', '7'),
('Southern right whale', 'Warrnambool, Victoria', '8'),
('Southern right whale', 'Warrnambool, Victoria', '9'),
('Southern right whale', 'Warrnambool, Victoria', '10'),
('Southern right whale', 'Warrnambool, Victoria', '11'),
('Southern right whale', 'Portland, Victoria', '4'),
('Southern right whale', 'Portland, Victoria', '5'),
('Southern right whale', 'Portland, Victoria', '6'),
('Southern right whale', 'Portland, Victoria', '7'),
('Southern right whale', 'Portland, Victoria', '8'),
('Southern right whale', 'Portland, Victoria', '9'),
('Southern right whale', 'Portland, Victoria', '10'),
('Southern right whale', 'Portland, Victoria', '11'),
('Southern right whale', 'Victor Harbour,South Australia', '4'),
('Southern right whale', 'Victor Harbour,South Australia', '5'),
('Southern right whale', 'Victor Harbour,South Australia', '6'),
('Southern right whale', 'Victor Harbour,South Australia', '7'),
('Southern right whale', 'Victor Harbour,South Australia', '8'),
('Southern right whale', 'Victor Harbour,South Australia', '9'),
('Southern right whale', 'Victor Harbour,South Australia', '10'),
('Southern right whale', 'Victor Harbour,South Australia', '11'),
('Southern right whale', 'Bayron bay, New South wales', '11'),
('Australian humpback dolphin', 'Tiwi Island, Northern Territory', '10'),
('Australian humpback dolphin', 'Tiwi Island, Northern Territory', '12'),
('Australian humpback dolphin', 'Coburg Costal Camp, Northern Territory', '3'),
('Australian humpback dolphin', 'Coburg Costal Camp, Northern Territory', '6'),
('Australian humpback dolphin', 'Coburg Costal Camp, Northern Territory', '9'),
('Australian humpback dolphin', 'Coburg Costal Camp, Northern Territory', '10'),
('Australian humpback dolphin', 'Coburg Costal Camp, Northern Territory', '12'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '1'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '2'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '3'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '4'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '5'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '6'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '7'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '8'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '9'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '10'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '11'),
('Australian humpback dolphin', 'Darwin, Northern Territory', '12'),
('Australian humpback dolphin', 'Field Island, Northern Territory', '3'),
('Australian humpback dolphin', 'Field Island, Northern Territory', '8'),
('Australian humpback dolphin', 'Field Island, Northern Territory', '12'),
('Australian humpback dolphin', 'Amity Point, Queensland', '1'),
('Australian humpback dolphin', 'Amity Point, Queensland', '2'),
('Australian humpback dolphin', 'Amity Point, Queensland', '3'),
('Australian humpback dolphin', 'Amity Point, Queensland', '4'),
('Australian humpback dolphin', 'Amity Point, Queensland', '5'),
('Australian humpback dolphin', 'Amity Point, Queensland', '6'),
('Australian humpback dolphin', 'Amity Point, Queensland', '7'),
('Australian humpback dolphin', 'Amity Point, Queensland', '8'),
('Australian humpback dolphin', 'Amity Point, Queensland', '9'),
('Australian humpback dolphin', 'Amity Point, Queensland', '10'),
('Australian humpback dolphin', 'Amity Point, Queensland', '11'),
('Australian humpback dolphin', 'Amity Point, Queensland', '12'),
('Australian snubfin dolphin', 'Darwin, Northern Territory', '1'),
('Australian snubfin dolphin', 'Darwin, Northern Territory', '2'),
('Australian snubfin dolphin', 'Darwin, Northern Territory', '3'),
('Australian snubfin dolphin', 'Darwin, Northern Territory', '4'),
('Australian snubfin dolphin', 'Darwin, Northern Territory', '5'),
('Australian snubfin dolphin', 'Darwin, Northern Territory', '6'),
('Australian snubfin dolphin', 'Darwin, Northern Territory', '7'),
('Australian snubfin dolphin', 'Darwin, Northern Territory', '8'),
('Australian snubfin dolphin', 'Darwin, Northern Territory', '10'),
('Australian snubfin dolphin', 'Darwin, Northern Territory', '11'),
('Australian snubfin dolphin', 'Field Island, Northern Territory', '2'),
('Australian snubfin dolphin', 'Field Island, Northern Territory', '4'),
('Australian snubfin dolphin', 'Field Island, Northern Territory', '7'),
('Australian snubfin dolphin', 'Field Island, Northern Territory', '8'),
('Australian snubfin dolphin', 'Field Island, Northern Territory', '11'),
('Australian snubfin dolphin', 'Field Island, Northern Territory', '12'),
('Australian snubfin dolphin', 'Coburg Costal Camp, Northern Territory', '3'),
('Australian snubfin dolphin', 'Coburg Costal Camp, Northern Territory', '4'),
('Australian snubfin dolphin', 'Coburg Costal Camp, Northern Territory', '9'),
('Australian snubfin dolphin', 'Coburg Costal Camp, Northern Territory', '11'),
('Australian snubfin dolphin', 'Pellew Island, Northwen Territory', '11'),
('Common bottlenose dolphin', 'Sorronto,Victoria', '1'),
('Common bottlenose dolphin', 'Sorronto,Victoria', '2'),
('Common bottlenose dolphin', 'Sorronto,Victoria', '3'),
('Common bottlenose dolphin', 'Sorronto,Victoria', '4'),
('Common bottlenose dolphin', 'Sorronto,Victoria', '5'),
('Common bottlenose dolphin', 'Sorronto,Victoria', '6'),
('Common bottlenose dolphin', 'Sorronto,Victoria', '8'),
('Common bottlenose dolphin', 'Sorronto,Victoria', '10'),
('Common bottlenose dolphin', 'Sorronto,Victoria', '11'),
('Common bottlenose dolphin', 'Sorronto,Victoria', '12'),
('Common bottlenose dolphin', 'Paynesvilla', '7'),
('Common bottlenose dolphin', 'Paynesvilla', '8'),
('Common bottlenose dolphin', 'Batemans bay, New south wales', '1'),
('Common bottlenose dolphin', 'Batemans bay, New south wales', '3'),
('Common bottlenose dolphin', 'New castle , New South Whales', '4'),
('Common bottlenose dolphin', 'New castle , New South Whales', '5'),
('Common bottlenose dolphin', 'New castle , New South Whales', '12'),
('Common bottlenose dolphin', 'Manning point, New south wales', '8'),
('Common bottlenose dolphin', 'Manning point, New south wales', '12'),
('Common bottlenose dolphin', 'Darwin, Northern Territory', '10'),
('Common bottlenose dolphin', 'Anuguru, North Territory', '11');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
