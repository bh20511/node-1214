-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-12-08 15:15:49
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
-- 資料表結構 `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `member_sid` int(11) NOT NULL,
  `post_sid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `likes`
--

INSERT INTO `likes` (`member_sid`, `post_sid`) VALUES
(1, 42),
(1, 45),
(1, 46),
(1, 51),
(2, 48),
(2, 52),
(2, 53),
(2, 54),
(3, 53),
(3, 54),
(4, 46),
(4, 48),
(4, 51),
(4, 52),
(4, 53),
(4, 54),
(4, 56),
(5, 42),
(5, 45),
(5, 54),
(5, 57),
(5, 58),
(5, 60),
(5, 61),
(6, 42),
(6, 46),
(6, 48),
(7, 42),
(7, 45),
(7, 46),
(7, 48),
(7, 51),
(7, 52),
(7, 53),
(7, 54),
(7, 56),
(7, 57),
(7, 58),
(7, 60),
(8, 42),
(8, 45),
(8, 46),
(8, 48),
(8, 51),
(8, 52),
(8, 53),
(8, 54);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`member_sid`,`post_sid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
