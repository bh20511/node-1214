-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-11-24 15:00:12
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
-- 資料表結構 `product_category`
--
DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
  `product_category_sid` int(11) NOT NULL,
  `product_category` varchar(200) NOT NULL,
  `gender` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `product_category`
--

INSERT INTO `product_category` (`product_category_sid`, `product_category`, `gender`) VALUES
(1, '登山杖', NULL),
(2, '帽子', NULL),
(3, '背包', NULL),
(4, '頭燈', NULL),
(5, '睡袋', NULL),
(6, '登山襪', NULL),
(7, '鞋子', '男'),
(8, '鞋子', '女'),
(9, '外套', '男'),
(10, '外套', '女'),
(11, '排汗衫', '男'),
(12, '排汗衫', '女');


--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`product_category_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_category`
--
ALTER TABLE `product_category`
  MODIFY `product_category_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
