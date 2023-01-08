-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2022 年 12 月 02 日 16:05
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
-- 資料表結構 `coupon`
--

DROP TABLE IF EXISTS `coupon`;
CREATE TABLE `coupon` (
  `coupon_sid` int(20) NOT NULL,
  `coupon_name` varchar(255) NOT NULL,
  `coupon_code` varchar(255) NOT NULL,
  `coupon_discount` varchar(255) NOT NULL,
  `coupon_validation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `coupon`
--

INSERT INTO `coupon` (`coupon_sid`, `coupon_name`, `coupon_code`, `coupon_discount`, `coupon_validation`) VALUES
(1, '爬山就找837', 'Hiking837', '100', '2023-03-31'),
(2, '837爬山好手', 'Hero837', '80', '2023-01-31'),
(3, '837爬山趣', 'Happy837', '50', '2023-12-31');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`coupon_sid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
