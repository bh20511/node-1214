-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2022 年 11 月 30 日 13:16
-- 伺服器版本： 10.4.21-MariaDB
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
-- 資料表結構 `room_service`
--
DROP TABLE IF EXISTS `room_service`;
CREATE TABLE `room_service` (
  `room_service_sid` int(20) NOT NULL,
  `room_service_name` varchar(255) NOT NULL,
  `room_service_icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `room_service`
--

INSERT INTO `room_service` (`room_service_sid`, `room_service_name`, `room_service_icon`) VALUES
(1, '淋浴', '1.png'),
(2, '沐浴用品', '2.png'),
(3, '吹風機', '3.png'),
(4, '毛巾', '4.png'),
(5, '空調', '5.png'),
(6, '電風扇', '6.png'),
(7, '免費wifi', '7.png'),
(8, '早餐', '8.png'),
(9, '登山口接駁', '9.png'),
(10, '登山諮詢', '10.png'),
(11, '飲水機', '11.png'),
(12, '插座', '12.png');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `room_service`
--
ALTER TABLE `room_service`
  ADD PRIMARY KEY (`room_service_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `room_service`
--
ALTER TABLE `room_service`
  MODIFY `room_service_sid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
