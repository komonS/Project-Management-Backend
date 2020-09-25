-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2020 at 11:26 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `memberID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `picture` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`memberID`, `username`, `password`, `fname`, `lname`, `picture`) VALUES
(1, 'admin', '1234', 'admin', '', '83812824_2707459142676018_8809762155059478528_o.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `priority`
--

CREATE TABLE `priority` (
  `priorityID` int(11) NOT NULL,
  `priorityName` varchar(50) NOT NULL,
  `priorityDetail` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `priority`
--

INSERT INTO `priority` (`priorityID`, `priorityName`, `priorityDetail`) VALUES
(1, 'ปกติ', 0),
(2, 'ไม่สำคัญ', 0),
(3, 'ไม่สำคัญ-ด่วน', 1),
(4, 'สำคัญ-ไม่ด่วน', 2),
(5, 'สำคัญ-ด่วน', 3);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `projectID` int(11) NOT NULL,
  `projectName` varchar(100) NOT NULL,
  `descript` text NOT NULL,
  `project_status_ID` int(11) NOT NULL,
  `projectStart` varchar(20) NOT NULL,
  `projectEnd` varchar(20) NOT NULL,
  `projectSuccess` varchar(20) NOT NULL,
  `projectPiorityID` int(11) NOT NULL,
  `projectTypeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`projectID`, `projectName`, `descript`, `project_status_ID`, `projectStart`, `projectEnd`, `projectSuccess`, `projectPiorityID`, `projectTypeID`) VALUES
(1, 'Task', 'Personal Task', 0, '0000-00-00', '0000-00-00', '0000-00-00', 0, 1),
(10, 'test create Project', 'test create Project', 1, '2020-09-25', '2020-09-25', '', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `projecttype`
--

CREATE TABLE `projecttype` (
  `projectTypeID` int(11) NOT NULL,
  `projectTypeName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `projecttype`
--

INSERT INTO `projecttype` (`projectTypeID`, `projectTypeName`) VALUES
(1, 'Task'),
(2, 'Project');

-- --------------------------------------------------------

--
-- Table structure for table `project_detail`
--

CREATE TABLE `project_detail` (
  `project_detail_ID` int(11) NOT NULL,
  `projectID` int(11) NOT NULL,
  `memberID` int(11) NOT NULL,
  `user_project_status` varchar(50) NOT NULL,
  `projectComment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_detail`
--

INSERT INTO `project_detail` (`project_detail_ID`, `projectID`, `memberID`, `user_project_status`, `projectComment`) VALUES
(1, 1, 0, 'master', ''),
(2, 9, 1, 'master', 'test create Project'),
(3, 10, 1, 'master', 'test create Project');

-- --------------------------------------------------------

--
-- Table structure for table `project_status`
--

CREATE TABLE `project_status` (
  `project_status_ID` int(11) NOT NULL,
  `project_status_Name` varchar(50) NOT NULL,
  `status_process` int(11) NOT NULL,
  `status_color` varchar(50) NOT NULL,
  `code_color` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_status`
--

INSERT INTO `project_status` (`project_status_ID`, `project_status_Name`, `status_process`, `status_color`, `code_color`) VALUES
(0, '', 0, 'bg-gray', '#BBBBBB'),
(1, 'Start/Scheduled', 0, 'bg-yelloligth', '#FFFF00'),
(2, 'In progress', 50, 'bg-yellow', '#FF9933'),
(3, 'Implementation', 80, 'bg-maroon', '#FF0099'),
(4, 'User Checking', 90, 'bg-aqua', '#00CCFF'),
(5, 'Completed', 100, 'bg-green', '#00CC00'),
(6, 'Cancel/Postpone/Suspend', 0, 'bg-red-active', '#FF0000');

-- --------------------------------------------------------

--
-- Table structure for table `subproject`
--

CREATE TABLE `subproject` (
  `subProjectID` int(11) NOT NULL,
  `subProjectName` varchar(100) NOT NULL,
  `subProjectDescript` text NOT NULL,
  `projectID` int(11) NOT NULL,
  `subStart` varchar(20) NOT NULL,
  `subEnd` varchar(20) NOT NULL,
  `subSuccess` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subproject`
--

INSERT INTO `subproject` (`subProjectID`, `subProjectName`, `subProjectDescript`, `projectID`, `subStart`, `subEnd`, `subSuccess`) VALUES
(9, 'tt', 'tt', 1, '', '', ''),
(10, 'test', 'test', 1, '', '', ''),
(11, 'test2', 'test2', 1, '', '', ''),
(12, 'test3', 'test3', 1, '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `subproject_detail`
--

CREATE TABLE `subproject_detail` (
  `subProjectDetail_ID` int(11) NOT NULL,
  `subProjectDetailName` varchar(100) NOT NULL,
  `subProjectID` int(11) NOT NULL,
  `memberID` int(11) NOT NULL,
  `project_status_ID` int(11) NOT NULL,
  `subProjectStart` varchar(20) NOT NULL,
  `subProjectEnd` varchar(20) NOT NULL,
  `subProjectSuccess` varchar(20) NOT NULL,
  `subProjectComment` text NOT NULL,
  `subProjectPriorityID` int(11) NOT NULL,
  `requester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subproject_detail`
--

INSERT INTO `subproject_detail` (`subProjectDetail_ID`, `subProjectDetailName`, `subProjectID`, `memberID`, `project_status_ID`, `subProjectStart`, `subProjectEnd`, `subProjectSuccess`, `subProjectComment`, `subProjectPriorityID`, `requester`) VALUES
(7, '', 9, 1, 5, '2020-09-30', '2020-09-30', '2020-09-30', 'tt\ntt', 1, 0),
(8, '', 10, 1, 1, '2020-09-25', '2020-09-25', '', 'test', 1, 0),
(9, '', 11, 1, 1, '2020-09-25', '2020-09-25', '', 'test2', 1, 0),
(10, '', 12, 1, 1, '2020-09-25', '2020-09-25', '', 'test3', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`memberID`);

--
-- Indexes for table `priority`
--
ALTER TABLE `priority`
  ADD PRIMARY KEY (`priorityID`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`projectID`);

--
-- Indexes for table `projecttype`
--
ALTER TABLE `projecttype`
  ADD PRIMARY KEY (`projectTypeID`);

--
-- Indexes for table `project_detail`
--
ALTER TABLE `project_detail`
  ADD PRIMARY KEY (`project_detail_ID`);

--
-- Indexes for table `project_status`
--
ALTER TABLE `project_status`
  ADD PRIMARY KEY (`project_status_ID`);

--
-- Indexes for table `subproject`
--
ALTER TABLE `subproject`
  ADD PRIMARY KEY (`subProjectID`);

--
-- Indexes for table `subproject_detail`
--
ALTER TABLE `subproject_detail`
  ADD PRIMARY KEY (`subProjectDetail_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `memberID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `priority`
--
ALTER TABLE `priority`
  MODIFY `priorityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `projecttype`
--
ALTER TABLE `projecttype`
  MODIFY `projectTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `project_detail`
--
ALTER TABLE `project_detail`
  MODIFY `project_detail_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subproject`
--
ALTER TABLE `subproject`
  MODIFY `subProjectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `subproject_detail`
--
ALTER TABLE `subproject_detail`
  MODIFY `subProjectDetail_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
