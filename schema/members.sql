-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-12-08 15:15:58
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
-- 資料表結構 `members`
--
DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `member_sid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `nickname` varchar(255) NOT NULL,
  `member_level` int(11) NOT NULL DEFAULT 1,
  `total_height` int(11) NOT NULL DEFAULT 0,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `intro` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `verification` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `members`
--

INSERT INTO `members` (`member_sid`, `name`, `password`, `email`, `mobile`, `address`, `birthday`, `nickname`, `member_level`, `total_height`, `avatar`, `created_at`, `intro`, `token`, `verification`) VALUES
(1, '阿儒', '$2b$10$SggwzWCMVDaewd6H7uT7YuXL4ks1NUDQUZo60QnpSWbjbhpnhwXf2', 'yiru@hiking.com', '', '', NULL, '阿儒', 1, 3145, 'c2570fdb-33d4-4788-ac39-a7d623b78ba3.jpg', '2022-12-05 17:37:26', '', NULL, NULL),
(2, '力誠', '$2b$10$Za6fZxcQyi6nvKaLcMWoEepUnX8tR7crIxuqYD72gfkjVY28lIkVG', 'zx@hiking.com', '', '宜蘭市龜山島57巷10號1樓', NULL, 'ZX', 1, 5216, 'b9f67774-82b1-4797-b389-feadfdce4512.jpg', '2022-12-05 17:39:29', '爬山好好玩，歡迎來一起爬山，增加抵抗力!!!', NULL, NULL),
(3, '鎧維', '$2b$10$Z3uQ6Ja2rp5J7z3tvtAI.uWRhSSewcb3sh2e.0V2VEpIwFtpAGqyi', 'wei@hiking.com', '', '', NULL, '貝果三號', 1, 4265, '8840d304-2d50-4b21-8212-bdb045ddc27c.jpg', '2022-12-05 17:40:43', '', NULL, NULL),
(4, '恩齊', '$2b$10$wzBGlL/pb87Y0LxQjqBFEeD2Ib/zOY5m/joqKkPyhXqZtjKpYGSey', 'n7@hiking.com', '', '', NULL, 'N7', 1, 2736, NULL, '2022-12-05 17:41:32', '', NULL, NULL),
(5, '柏宏', '$2b$10$mJBEi4Tp70rgz9NqQTUYduAckdjSVlgIokwddN6UtFTeCQIhhQJwu', 'bert@hiking.com', '', '', NULL, '伯特', 1, 1522, 'e5b46ef9-47f1-4d2f-b7a6-67cec5dd161e.jpg', '2022-12-05 17:42:22', '這是正牌女帝，不用懷疑。馬蚤。', NULL, NULL),
(6, '潛之', '$2b$10$P8ygYfBQV0mKxmkQWCFcu.rQTCZIEIiIXzvvMfmf90mrtcrw.0GsC', 'yeh@hiking.com', '', '', NULL, '趴趴', 1, 6763, '95c0361a-62ea-49c8-a7b3-cc6697431659.jpg', '2022-12-05 17:42:59', '大家好～我是趴趴！我喜歡山上新鮮的空氣，想在這邊認識更多的同好！\r\n\r\n請多指教！\r\n', NULL, NULL),
(7, '王苗苗', '$2b$10$KvsxRlMhfxS/O55RtNIOhea1PwejzyHvDIDAb2vJ.KcLpROQYgqJy', 'meow@hiking.com', '0911222333', '喵喵市', '2000-12-12', '帥氣小苗', 1, 11049, 'e3c85b54-860d-4ee9-b412-790c15f43053.png', '2022-12-06 18:07:53', '我就愛喵喵喵～喵喵喵～ 喵喵喵～\r\n喵～！', NULL, NULL),
(8, '趴趴', '$2b$10$EGgnFKuwENbHiQZzdZuzYe/9n1caWbCRreKMBucVw8PsZaXtLmZOy', 'miroyeh1986@gmail.com', '', '', '1990-09-11', '葉紙', 1, 0, '', '2022-12-08 00:54:18', '', NULL, NULL),
(9, '詹姆士', '$2b$10$ZqqgOUJJs392PG2Qah/n7OgiIn51BMmixkfh6R//xlvX5vgfikSz2', 'buyuser1214@gmail.com', '0911222333', '', NULL, '詹姆士', 1, 0, '', '2022-12-08 19:22:31', '我是訂單測試用的特派員 ～～\r\n\r\n詹氏．胖！', NULL, NULL);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `members`
--
ALTER TABLE `members`
  MODIFY `member_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
