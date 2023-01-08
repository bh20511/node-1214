-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-12-08 15:16:09
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
-- 資料表結構 `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `post_sid` int(11) NOT NULL,
  `member_sid` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `context` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `mountain_sid` int(11) NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0,
  `comments` int(11) NOT NULL DEFAULT 0,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `posts`
--

INSERT INTO `posts` (`post_sid`, `member_sid`, `image_url`, `context`, `mountain_sid`, `likes`, `comments`, `created_at`) VALUES
(42, 6, '8c17a0c9-6442-4c5d-94ee-e99248e13370.jpg', '天氣晴朗～\r\n上山好日子!', 156, 5, 2, '2022-12-08'),
(45, 6, '2c6d4a53-06c6-4d4e-a969-2cbaeb326533.jpg', '再訪七星山~~~', 156, 4, 3, '2022-12-08'),
(46, 6, 'b2e365e9-c03e-4c13-a2dd-e90ff4060ab3.jpg', '', 27, 5, 2, '2022-12-08'),
(48, 6, '6fc23570-b7c7-4fbc-bc74-f5742cc77b0f.jpg', '夕陽超美的啊 😊', 102, 5, 1, '2022-12-08'),
(50, 2, 'fcab212c-78b0-4375-99b4-09e17710e363.jpg', '', 27, 0, 0, '2022-12-08'),
(51, 2, '3e72f3d1-a66d-413c-952e-a9dd94f714e3.jpg', '', 44, 4, 2, '2022-12-08'),
(52, 1, '82b7192b-9b19-4e5d-96c1-66583678e4b5.jpg', '夢幻的感覺', 5, 4, 2, '2022-12-08'),
(53, 3, 'ee28ccf9-848f-43a2-bb2e-0c55dea6e895.jpg', '今天去爬七星山～😊', 156, 5, 2, '2022-12-08'),
(54, 3, 'b0938fba-9c27-40be-bb07-9d0956c60e81.jpg', '超超超超級美!!!!!\r\n😊😊😊😊😊', 5, 6, 3, '2022-12-08'),
(56, 4, '63cb82bb-1abe-4db2-8495-5a22e16a45bb.jpg', '雲海加花海! 超美的! 😊', 28, 2, 2, '2022-12-08'),
(57, 7, '45a18500-9172-48b1-aba8-9c99948ebfe8.jpg', '美照一發', 5, 2, 1, '2022-12-08'),
(58, 7, 'da5b8212-58f5-40ab-a3ab-139ed848555c.jpg', '樹好美\r\n😊😊😊😊😊', 1, 2, 1, '2022-12-08'),
(60, 7, '466cc410-aff2-45ec-be85-bba271baed12.jpg', '遠方群山', 1, 2, 1, '2022-12-08'),
(61, 5, '64dbc512-38e2-43cd-b050-ca89f9c24827.jpg', '', 121, 1, 0, '2022-12-08');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `posts`
--
ALTER TABLE `posts`
  MODIFY `post_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
