-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2022 年 12 月 09 日 11:03
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
-- 資料表結構 `product_order`
--
DROP TABLE IF EXISTS `product_order`;
CREATE TABLE `product_order` (
  `order_sid` int(11) NOT NULL,
  `order_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_german2_ci NOT NULL,
  `products_sid` int(11) NOT NULL,
  `size` varchar(255) NOT NULL,
  `qty` int(255) NOT NULL,
  `total` int(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `star` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `messageTime` date DEFAULT NULL,
  `created_time` datetime NOT NULL DEFAULT current_timestamp(),
  `custom_img` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `product_order`
--

INSERT INTO `product_order` (`order_sid`, `order_num`, `products_sid`, `size`, `qty`, `total`, `img`, `star`, `message`, `messageTime`, `created_time`, `custom_img`) VALUES
(1, '1670377450811', 142, 'M', 2, 15360, '20220907184132871_2.png', 4, '藍色超好看Der，爬七星山都不會冷，超讚的配送速度！！！', '2022-12-07', '2022-12-07 09:45:31', NULL),
(2, '1670382498231', 142, 'L', 1, 7680, '20220907184132871_2.png', 5, '爬山必備的吧！\n賣家出貨很快，Pchome 24H沒兩樣\n一定推薦朋友來買\n5星好評！！！', '2022-12-07', '2022-12-07 11:10:49', NULL),
(3, '1670382867744', 142, 'L', 1, 7680, '20220907184132871_2.png', 4, '買給男友穿~\n他說還行，下次考慮回購', '2022-12-07', '2022-12-07 11:19:07', NULL),
(4, '1670403974992', 142, 'M', 1, 7680, '20220907184132871_2.png', 4, '質感很好，雖然小貴，但實用', '2022-12-07', '2022-12-07 17:07:35', NULL),
(5, '1670404435644', 142, 'M', 1, 7680, '20220907184132871_2.png', 5, '這東西實屬牛B，雙擊給個讚', '2022-12-07', '2022-12-07 17:14:40', NULL),
(6, '1670404595916', 142, 'L', 1, 7680, '20220907184132871_2.png', 5, '防水度很好，不用撐傘都可以行走江湖', '2022-12-07', '2022-12-07 17:17:22', NULL);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `product_order`
--
ALTER TABLE `product_order`
  ADD PRIMARY KEY (`order_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_order`
--
ALTER TABLE `product_order`
  MODIFY `order_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
