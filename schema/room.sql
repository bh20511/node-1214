-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2022 年 12 月 01 日 15:02
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
-- 資料表結構 `room`
--
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `room_sid` int(20) NOT NULL,
  `room_name` varchar(255) DEFAULT NULL,
  `location_sid` int(20) NOT NULL,
  `mountain_sid` int(20) DEFAULT NULL,
  `room_start_date` date NOT NULL,
  `room_end_date` date NOT NULL,
  `room_price` int(20) NOT NULL,
  `room_qty` int(20) NOT NULL,
  `room_details` varchar(255) DEFAULT NULL,
  `room_img` varchar(255) NOT NULL,
  `room_imgs` varchar(255) NOT NULL,
  `room_address` varchar(255) NOT NULL,
  `room_business_hours` varchar(255) NOT NULL,
  `room_telephone` varchar(255) NOT NULL,
  `room_entry_name` varchar(255) NOT NULL,
  `room_entry_address` varchar(255) NOT NULL,
  `room_entry_distance` varchar(255) NOT NULL,
  `room_service_sid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `room`
--

INSERT INTO `room` (`room_sid`, `room_name`, `location_sid`, `mountain_sid`, `room_start_date`, `room_end_date`, `room_price`, `room_qty`, `room_details`, `room_img`, `room_imgs`, `room_address`, `room_business_hours`, `room_telephone`, `room_entry_name`, `room_entry_address`, `room_entry_distance`, `room_service_sid`) VALUES
(1, '南庄老寮Hostel', 4, 63, '2022-12-01', '2023-02-28', 600, 8, 'https://www.facebook.com/mountainlodge2014/', 'ROOM_10020.jpg', 'ROOM_10020.jpg,wash01.jpg,jiali.jpg,jiali2.jpg', '苗栗縣南庄鄉南江街50號', '9：00－18：00', '0963-937-030', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '15', '1,2,3,4,5,6,10,11,12'),
(2, '南庄天堂鳥民宿', 4, 63, '2022-12-01', '2023-03-31', 500, 6, 'https://heavenbird.many30.com/', 'ROOM_10040.jpg', 'ROOM_10040.jpg,wash02.jpg,jiali.jpg,jiali2.jpg', '苗栗縣南庄鄉南江村5鄰東江98號', '10：00－18：00', '0932-665-072', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '20', '1,2,3,4,5,6,9,10,11,12'),
(3, '南庄山行寄野民宿', 4, 63, '2022-12-01', '2023-01-31', 800, 8, 'http://www.037825438.com.tw/', 'ROOM_10026.jpg', 'ROOM_10026.jpg,wash03.jpg,jiali.jpg,jiali2.jpg', '苗栗縣南庄鄉25-1號', '8：30－18：00', '03-782-5438', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '18', '1,2,3,4,5,6,7,8,9,10,11,12'),
(4, '南庄毓琇圖書山莊', 4, 63, '2022-12-01', '2023-02-28', 650, 10, 'http://www.yu-show.com.tw/', 'ROOM_10042.jpg', 'ROOM_10042.jpg,wash04.jpg,jiali.jpg,jiali2.jpg', '苗栗縣南庄鄉里金館路35號', '8：00－17：00', '03-782-3939', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '19', '1,2,3,4,5,6,10,11,12'),
(5, '苗栗南庄光角背包客旅店', 4, 63, '2022-12-01', '2023-02-28', 700, 5, 'https://www.facebook.com/dacaggiog/', 'ROOM_10001.jpg', 'ROOM_10001.jpg,wash05.jpg,jiali.jpg,jiali2.jpg', '苗栗縣南庄鄉中山路53-1號', '8：30－18：00', '0905-601-160', '大坪林登山口', '苗栗縣南庄鄉 一葉蘭蘭園(專區)', '25', '1,2,3,4,5,6,9,10,11,12'),
(6, '南庄漫晨旅店', 4, 63, '2022-12-01', '2023-03-31', 600, 10, 'https://www.manchen.tw/', 'ROOM_10022.jpg', 'ROOM_10022.jpg,wash06.jpg,jiali.jpg,jiali2.jpg', '苗栗縣南庄鄉中山路40號', '8：00－17：00', '0960-954-132', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '35', '1,2,3,4,5,6,7,8,9,10,11,12'),
(7, '石壁彩虹民宿', 4, 63, '2022-12-01', '2023-01-31', 650, 5, 'https://www.booking.com/hotel/tw/shi-bi-cai-hong-min-su.zh-tw.html', 'ROOM_100050.jpg', 'ROOM_100050.jpg,wash07.jpg,jiali.jpg,jiali2.jpg', '苗栗縣南庄鄉石壁21號', '8：30－18：00', '03-782-1255', '大坪林登山口', '苗栗縣南庄鄉 一葉蘭蘭園(專區)', '30', '1,2,3,4,5,6,10,11,12'),
(8, '南庄橄欖樹咖啡民宿', 4, 63, '2022-12-01', '2023-02-28', 700, 8, 'https://www.olive-tree.idv.tw/', 'ROOM_10034.jpg', 'ROOM_10034.jpg,wash08.jpg,jiali.jpg,jiali2.jpg', '苗栗縣南庄鄉蓬萊村42份7-6號', '8：00－19：00', '0919-822-379', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '27.5', '1,2,3,4,5,6,9,10,11,12'),
(9, '南庄老街藝欣山莊', 4, 63, '2022-12-01', '2023-03-31', 800, 6, 'https://www.ysen.com.tw/', 'ROOM_10002.jpg', 'ROOM_10002.jpg,wash09.jpg,jiali.jpg,jiali2.jpg', '苗栗縣南庄鄉中正路240號', '8：00－17：00', '03-782-5868', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '18.5', '1,2,3,4,5,6,7,8,9,10,11,12'),
(10, '遇見台灣百合民宿', 4, 63, '2022-12-01', '2023-01-31', 500, 9, 'https://www.facebook.com/taiwanlilyhome/', 'ROOM_10043.jpg', 'ROOM_10043.jpg,wash10.jpg,jiali.jpg,jiali2.jpg', '苗栗縣三灣鄉圈69-11號', '9：00－20：00', '0911-481-600', '大坪林登山口', '苗栗縣南庄鄉 一葉蘭蘭園(專區)', '37.5', '1,2,3,4,5,6,10,11,12'),
(11, '問樵山居', 4, 63, '2022-12-01', '2023-01-31', 600, 10, 'http://www.wenqiaovilla.com/home.html', 'ROOM_10008.jpg', 'ROOM_10008.jpg,wash08.jpg,jiali.jpg,jiali2.jpg', '苗栗縣南庄鄉田美20號', '10：00－18：00', '0972-725-673', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '28', '1,2,3,4,5,6,9,10,11,12'),
(12, '松茂詩人的家', 5, 40, '2022-12-01', '2023-01-31', 600, 5, 'https://online.fliphtml5.com/ttbbw/ahfe/', 'ROOM_10003.jpg', 'ROOM_10003.jpg,wash01.jpg,MaWu.jpg,MaWu2.jpg', '台中市和平區中興路四段79之1號', '8：00－17：00', '0932-551-878', '雪霸國家公園 環山部落平等吊橋', '台中市和平區武陵路4號', '45', '1,2,3,4,5,6,7,8,9,10,11,12'),
(13, '梨山春發農園', 5, 40, '2022-12-01', '2023-02-28', 600, 8, 'https://lishanchunfa.mystrikingly.com/', 'ROOM_100051.jpg', 'ROOM_100051.jpg,wash03.jpg,MaWu.jpg,MaWu2.jpg', '台中市和平區中興路四段94之1號', '8：30－18：00', '0958-568-050', '雪霸國家公園 環山部落平等吊橋', '台中市和平區武陵路4號', '42', '1,2,3,4,5,6,10,11,12'),
(14, '都瑪斯民宿', 5, 40, '2022-12-01', '2023-03-31', 750, 6, 'https://xn--oct14uckfgtj8i1b.tw/', 'ROOM_10025.jpg', 'ROOM_10025.jpg,wash04.jpg,MaWu.jpg,MaWu2.jpg', '苗栗縣泰安鄉一鄰12-1號', '8：00－19：00', '03-796-2102', '雪霸國家公園 環山部落平等吊橋', '台中市和平區武陵路4號', '38', '1,2,3,4,5,6,9,10,11,12'),
(15, 'Sqoyaw天空', 5, 40, '2022-12-01', '2023-01-31', 800, 10, 'https://www.facebook.com/sqoyawsky/', 'ROOM_10007.jpg', 'ROOM_10007.jpg,wash06.jpg,MaWu.jpg,MaWu2.jpg', '台中市和平區中興路三段42-2號', '8：00－17：00', '0980-003-364', '雪霸國家公園 環山部落平等吊橋', '台中市和平區武陵路4號', '51', '1,2,3,4,5,6,7,8,9,10,11,12'),
(16, '翠峰農場 天文教育園區', 7, 5, '2022-12-01', '2023-01-31', 700, 10, 'https://www.okgocamping.com/', 'ROOM_10004.jpg', 'ROOM_10004.jpg,wash01.jpg,HeHuan.jpg,HeHuan2.jpg', '南投縣仁愛鄉仁和路235號', '10：00－18：00', '0916-483-369', '太魯閣國家公園', '台14甲線37K', '25', '1,2,3,4,5,6,10,11,12'),
(17, '南投清境雲頂山莊', 7, 5, '2022-12-01', '2023-01-31', 800, 5, 'https://www.top-cloud.com.tw/', 'ROOM_10010.jpg', 'ROOM_10010.jpg,wash03.jpg,HeHuan.jpg,HeHuan2.jpg', '南投縣仁愛鄉仁和路182-2號', '8：00－17：00', '04-9280-3788', '太魯閣國家公園', '台14甲線37K', '35', '1,2,3,4,5,6,9,10,11,12'),
(18, '清境木木杉阿彬民宿', 7, 5, '2022-12-01', '2023-01-31', 500, 10, 'https://booking.owlting.com/cingjingabinminshuku', 'ROOM_10035.jpg', 'ROOM_10035.jpg,wash08.jpg,HeHuan.jpg,HeHuan2.jpg', '南投縣仁愛鄉仁和路206之5號', '8：30－18：00', '04-9280-3347', '太魯閣國家公園', '台14甲線37K', '14', '1,2,3,4,5,6,7,8,9,10,11,12'),
(19, '黃慶果園民宿', 7, 5, '2022-12-01', '2023-02-28', 600, 5, 'http://www.homestay.com.tw/', 'ROOM_10006.jpg', 'ROOM_10006.jpg,wash02.jpg,HeHuan.jpg,HeHuan2.jpg', '南投縣仁愛鄉仁和路217之3號', '8：00－17：00', '04-9280-2678', '太魯閣國家公園', '台14甲線37K', '15', '1,2,3,4,5,6,10,11,12'),
(20, '清境31背包客棧', 7, 5, '2022-12-01', '2023-03-31', 600, 8, 'https://booking.owlting.com/nantou31backpack', 'ROOM_100052.jpg', 'ROOM_100052.jpg,wash01.jpg,HeHuan.jpg,HeHuan2.jpg', '南投縣仁愛鄉博望巷27號', '8：00－17：00', '0982-306-573', '太魯閣國家公園', '台14甲線37K', '10', '1,2,3,4,5,6,9,10,11,12'),
(21, '南庄天堂鳥民宿', 3, 32, '2022-12-01', '2023-03-31', 500, 6, 'https://heavenbird.many30.com/', 'ROOM_10037.jpg', 'ROOM_10037.jpg,wash04.jpg,RuChun.jpg,jiali2.jpg', '苗栗縣南庄鄉南江村5鄰東江98號', '10：00－18：00', '0932-665-072', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '20', '1,2,3,4,5,6,7,8,9,10,11,12'),
(22, '南庄山行寄野民宿', 3, 32, '2022-12-01', '2023-01-31', 800, 8, 'http://www.037825438.com.tw/', 'ROOM_10016.jpg', 'ROOM_10016.jpg,wash01.jpg,RuChun.jpg,jiali2.jpg', '苗栗縣南庄鄉25-1號', '8：30－18：00', '03-782-5438', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '18', '1,2,3,4,5,6,9,10,11,12'),
(23, '南庄毓琇圖書山莊', 3, 32, '2022-12-01', '2023-02-28', 650, 10, 'http://www.yu-show.com.tw/', 'ROOM_10005.jpg', 'ROOM_10005.jpg,wash02.jpg,RuChun.jpg,jiali2.jpg', '苗栗縣南庄鄉里金館路35號', '8：00－17：00', '03-782-3939', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '19', '1,2,3,4,5,6,7,8,9,10,11,12'),
(24, '苗栗南庄光角背包客旅店', 3, 32, '2022-12-01', '2023-02-28', 700, 5, 'https://www.facebook.com/dacaggiog/', 'ROOM_10038.jpg', 'ROOM_10038.jpg,wash08.jpg,RuChun.jpg,jiali2.jpg', '苗栗縣南庄鄉中山路53-1號', '9：00－20：00', '0905-601-160', '大坪林登山口', '苗栗縣南庄鄉 一葉蘭蘭園(專區)', '25', '1,2,3,4,5,6,9,10,11,12'),
(25, '南庄漫晨旅店', 3, 32, '2022-12-01', '2023-03-31', 600, 10, 'https://www.manchen.tw/', 'ROOM_10044.jpg', 'ROOM_10044.jpg,wash07.jpg,RuChun.jpg,jiali2.jpg', '苗栗縣南庄鄉中山路40號', '8：00－17：00', '0960-954-132', '鹿場登山口', '苗栗縣南庄鄉東河村鹿場24鄰19-20號', '35', '1,2,3,4,5,6,7,8,9,10,11,12'),
(26, '慈恩隧道何家果園民宿', 14, 10, '2022-12-01', '2023-05-31', 600, 20, 'https://www.facebook.com/ZhongHengCiEnHeJiaGuoYuan/', 'ROOM_10045.jpg', 'ROOM_10045.jpg,wash01.jpg,YANTO.jpg,YanTo2.jpg', '花蓮縣秀林鄉中部橫貫公路3號', '8：30－18：00', '0932-665-072', '羊頭山登山口', '慈恩隧道 中橫公路133.1K處', '5', '1,2,3,4,5,6,7,8,9,10,11,12'),
(27, '加草花園山莊', 5, 3, '2022-12-01', '2023-02-28', 1000, 8, 'https://booking.owlting.com/', 'ROOM_100053.jpg', 'ROOM_100053.jpg,wash01.jpg,shuei.jpg,shuei2.jpg', '新竹縣五峰鄉民石365號', '8：00－20：00', '0912-098-508', '雪山登山口服務站', '台中市和平區武陵路9之3號', '25', '1,2,3,4,5,6,10,11,12'),
(28, '雪霸觀霧天山休閒農場民宿', 5, 3, '2022-12-01', '2023-02-28', 800, 6, 'http://ushop31032.ec99.tw/', 'ROOM_10019.jpg', 'ROOM_10019.jpg,wash02.jpg,shuei.jpg,shuei2.jpg', '新竹縣五峰鄉353之5號臨', '9：00－20：00', '03-585-7022', '雪山登山口服務站', '台中市和平區武陵路9之3號', '20', '1,2,3,4,5,6,10,11,12'),
(29, '松柏民宿', 5, 3, '2022-12-01', '2023-03-31', 800, 10, 'https://booking.owlting.com/', 'ROOM_10047.jpg', 'ROOM_10047.jpg,wash04.jpg,shuei.jpg,shuei2.jpg', '台中市和平區中正路6號', '9：00－20：00', '04-2598-1448', '雪山登山口服務站', '台中市和平區武陵路9之3號', '15', '1,2,3,4,5,6,9,10,11,12'),
(30, '鹿林民宿', 5, 3, '2022-12-01', '2023-05-31', 900, 10, 'https://booking.owlting.com/', 'ROOM_100054.jpg', 'ROOM_100054.jpg,wash07.jpg,shuei.jpg,shuei2.jpg', '新竹縣五峰鄉清泉二零二之三號', '8：30－18：00', '03-585-6636', '雪山登山口服務站', '台中市和平區武陵路9之3號', '35', '1,2,3,4,5,6,7,8,9,10,11,12'),
(31, '嵩河源民宿', 5, 3, '2022-12-01', '2023-03-31', 700, 5, 'http://www.songriver.com.tw/', 'ROOM_100055.jpg', 'ROOM_100055.jpg,wash08.jpg,shuei.jpg,shuei2.jpg', '新竹縣尖石鄉9鄰14號', '8：00－17：00', '03-584-7752', '雪山登山口服務站', '台中市和平區武陵路9之3號', '38', '1,2,3,4,5,6,9,10,11,12');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `room`
--
ALTER TABLE `room`
  MODIFY `room_sid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
