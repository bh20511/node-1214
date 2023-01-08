-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2022 年 12 月 08 日 16:24
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
-- 資料表結構 `campaign_order`
--
DROP TABLE IF EXISTS `campaign_order`;
CREATE TABLE `campaign_order` (
  `order_sid` int(11) NOT NULL,
  `order_num` varchar(255) NOT NULL,
  `campaign_sid` int(11) NOT NULL,
  `dayname` varchar(255) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `people` int(255) NOT NULL,
  `total` int(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `star` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `messageTime` date DEFAULT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `campaign_order`
--

INSERT INTO `campaign_order` (`order_sid`, `order_num`, `campaign_sid`, `dayname`, `date_start`, `people`, `total`, `img`, `star`, `message`, `messageTime`, `created_time`) VALUES
(1, '1670486554273', 7, '一日遊', '2022-12-23', 3, 3840, 'campmain2.jpg', 5, '超刺激的合歡山 推推！', '2022-12-08', '2022-12-08 16:15:09'),
(2, '1670486554273', 14, '三天兩夜', '2022-12-09', 1, 1200, 'campmain3.jpg', 5, '有導遊帶真的比較好玩', '2022-12-08', '2022-12-08 16:15:29'),
(3, '1670486554273', 40, '一日遊', '2022-12-10', 7, 3500, 'campmain40.jpg', 4, '一天跟大家認識，真有趣呀', '2022-12-08', '2022-12-08 16:15:53'),
(4, '1670486554273', 36, '一日遊', '2022-12-10', 12, 5400, 'campmain36.jpg', 4, '有嚮導帶我們爬刺激的路線！大推呀', '2022-12-08', '2022-12-08 16:16:21');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `campaign_order`
--
ALTER TABLE `campaign_order`
  ADD PRIMARY KEY (`order_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `campaign_order`
--
ALTER TABLE `campaign_order`
  MODIFY `order_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
