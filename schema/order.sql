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
-- 資料表結構 `order`
--
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `order_sid` int(11) NOT NULL,
  `order_num` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL,
  `member_sid` int(11) NOT NULL,
  `total` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL,
  `recipient` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL COMMENT '收件人',
  `recipient_address` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL COMMENT '收件人地址',
  `recipient_phone` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL COMMENT '收件人電話',
  `payment` varchar(255) COLLATE utf8mb4_german2_ci NOT NULL COMMENT '付款方式',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_german2_ci NOT NULL COMMENT '備註',
  `created_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_german2_ci;

--
-- 傾印資料表的資料 `order`
--

INSERT INTO `order` (`order_sid`, `order_num`, `member_sid`, `total`, `recipient`, `recipient_address`, `recipient_phone`, `payment`, `remark`, `created_time`) VALUES
(1, '1670377450811', 2, '15360', '力誠chen', '宜蘭市龜山島57巷10號1樓', '0955633089', '信用卡', '', '2022-12-07 09:44:23'),
(2, '1670382498231', 1, '7680', '阿儒', '新北市新莊區中正路87號2樓', '0955633089', 'LINE PAY', '', '2022-12-07 11:08:29'),
(3, '1670382867744', 3, '7680', '鎧維', '新北市新莊區民安路97號8樓', '0977787666', 'ATM匯款', '', '2022-12-07 11:14:39'),
(4, '1670385022991', 3, '500', '鎧維', '新北市泰山區太平路93號8號', 'aa', 'ATM匯款', '', '2022-12-07 11:50:38'),
(5, '1670387651768', 3, '500', '鎧維', '保平路93巷7號7樓', '0955633089', 'ATM匯款', '', '2022-12-07 12:34:26'),
(6, '1670387824351', 3, '700', '鎧維', '保平路93巷7號7樓', '0955633089', 'ATM匯款', '', '2022-12-07 12:37:19'),
(7, '1670403974992', 4, '7680', '恩齊', '新北市汐沚區平安路111號19樓', '0911111111', 'ATM匯款', '', '2022-12-07 17:06:34'),
(8, '1670404435644', 5, '7680', '柏宏', '桃園市平鎮區大愛路99巷87號1樓', '09123456999', 'ATM匯款', '', '2022-12-07 17:14:13'),
(9, '1670404595916', 6, '7680', '潛之', '台北市士林區至善路二段100巷10號2樓', '0938334528', 'ATM匯款', '', '2022-12-07 17:16:50'),
(10, '1670486554273', 4, '13940', '恩齊', '台北市大安區大安路60號', '09118181811', 'LINE PAY', '', '2022-12-08 16:02:43');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order`
--
ALTER TABLE `order`
  MODIFY `order_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
