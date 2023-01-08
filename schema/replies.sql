-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-12-08 15:16:17
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
-- 資料表結構 `replies`
--

DROP TABLE IF EXISTS `replies`;
CREATE TABLE `replies` (
  `sid` int(11) NOT NULL,
  `post_sid` int(11) NOT NULL,
  `parent_sid` int(11) DEFAULT NULL,
  `member_sid` int(11) NOT NULL,
  `context` varchar(255) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `replies`
--

INSERT INTO `replies` (`sid`, `post_sid`, `parent_sid`, `member_sid`, `context`, `datetime`) VALUES
(14, 45, NULL, 7, '天空好藍 😊', '2022-12-08 18:05:47'),
(15, 48, NULL, 7, '顏色看起來好棒喔~', '2022-12-08 18:08:57'),
(16, 46, NULL, 7, '真的很有高山的感覺', '2022-12-08 18:09:39'),
(17, 46, NULL, 2, '天氣好好', '2022-12-08 18:17:10'),
(18, 45, NULL, 2, '這張好看', '2022-12-08 18:17:30'),
(19, 42, NULL, 2, '我也要+1', '2022-12-08 18:17:51'),
(20, 51, NULL, 1, '下次一起去', '2022-12-08 18:20:59'),
(21, 45, NULL, 1, '改天一起去啊', '2022-12-08 18:21:27'),
(22, 42, NULL, 1, '+1', '2022-12-08 18:22:10'),
(23, 52, NULL, 2, '很夢幻', '2022-12-08 18:39:28'),
(24, 54, NULL, 2, '真的超美', '2022-12-08 18:39:44'),
(25, 54, NULL, 8, '超美的', '2022-12-08 18:41:24'),
(26, 53, NULL, 8, '拍的好看～', '2022-12-08 18:41:41'),
(27, 52, NULL, 8, '好夢幻喔', '2022-12-08 18:41:54'),
(28, 51, NULL, 8, '夕陽好美', '2022-12-08 18:42:05'),
(29, 54, NULL, 4, '超級美 😊', '2022-12-08 18:45:27'),
(30, 53, NULL, 4, '好看喔~', '2022-12-08 18:45:42'),
(31, 56, NULL, 7, '超美的～～～', '2022-12-08 18:54:43'),
(32, 60, NULL, 5, '顏色好看', '2022-12-08 20:25:42'),
(33, 57, NULL, 5, '超會拍', '2022-12-08 20:25:56'),
(34, 56, NULL, 5, '跟我一樣美', '2022-12-08 20:29:10'),
(35, 58, NULL, 5, '好長喔', '2022-12-08 20:29:48');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `replies`
--
ALTER TABLE `replies`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
