-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-12-08 15:15:40
-- 伺服器版本： 10.5.17-MariaDB
-- PHP 版本： 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `hiking`
--

-- --------------------------------------------------------

--
-- 資料表結構 `follows`
--
DROP TABLE IF EXISTS `follows`;
CREATE TABLE `follows` (
  `member_sid` int(11) NOT NULL,
  `follow_sid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `follows`
--

INSERT INTO `follows` (`member_sid`, `follow_sid`) VALUES
(1, 3),
(1, 4),
(1, 8),
(2, 3),
(2, 4),
(2, 7),
(2, 8),
(2, 9),
(3, 4),
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(4, 7),
(4, 9),
(6, 2),
(6, 3),
(6, 4),
(6, 7),
(6, 8),
(6, 9),
(7, 2),
(7, 3),
(7, 4),
(7, 6),
(7, 8),
(8, 4),
(8, 6),
(8, 7),
(8, 9);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`member_sid`,`follow_sid`),
  ADD KEY `follow_sid` (`follow_sid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
