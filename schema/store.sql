-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2022 年 12 月 11 日 10:55
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
-- 資料表結構 `store`
--
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `store_sid` int(11) NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `store_address_zone` varchar(255) NOT NULL,
  `store_address` varchar(255) NOT NULL,
  `delivery_fee_level` int(11) NOT NULL,
  `store_img` varchar(255) DEFAULT NULL,
  `store_introduction` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `store`
--

INSERT INTO `store` (`store_sid`, `store_name`, `store_address_zone`, `store_address`, `delivery_fee_level`, `store_img`, `store_introduction`) VALUES
(1, '大安店', '北區', '台北市大安區資展路一段', 1, '大安店.jpeg', '你印象中的戶外用品專賣店，是那種店面小小、卻塞滿商品，\n每次走進去都像在尋寶的地方嗎？這幾年，露營爬山這件事，\n可以說已經成為了全民運動。\n大安店走出單純的購買跟租借商品，而是致力打造體驗的氛圍，\n讓客人賓至如歸。'),
(2, '八德店', '北區', '桃園市八德區永安街1號', 1, '八德店.jpeg', '八德埤塘公園旁，有一間規模迷你、品項又極少的outdoor店家，在這個極富文青氣息的商圈出現，別小看八德店，從開幕至今已經培養出一群死忠客群，因為他們就是有辦法找到最特別的東西，用他們的語言說故事。\n除此之外這裡的店員，不只了解產品，還得測試產品的各種機能，必須上山下海！為了把自家服飾、背包、鞋子穿搭出最有風格的樣子，如果在挑選登山用品不知道如何選擇的話，這間店就是你最好的選擇。'),
(3, '臺中店', '中區', '臺中巿西區五權西路2號', 2, '臺中店.jpeg', '臺中店不定期會舉辦Deco Camp露營活動，直接示範給大家看。\n最迷人的是每一場都有日本職人陪大家做營燈燈飾、焚火台烤麵包、手沖咖啡，10月才剛結束的活動中，連國外知名登山youtuber，也來教大家如何挑選適合自己的登山露營設備。\n想時髦的入門戶外裝備，這裡保證好逛好買又好玩。'),
(4, '高雄店', '南區', '高雄市鳳山區光復路二段132號', 5, '高雄店.jpeg', '在2015年登山露營風潮大起之時，選擇在高雄一處靜巷內開張。店內空間有別於老牌戶外用品店的擺設，陳列跟裝潢融合工業風與Outdoor風，加上店外豐富且細心照料的的植栽，看得出來用了很多心思要營造舒適的購物空間，走進室內就像走到戶外。'),
(5, '花蓮店', '東區', '花蓮縣壽豐鄉志學村大學路2段1號', 9, '花蓮店.jpeg', '地處優美的東部市區，店內服飾、配件以民族戶外風為主要導向，兼具流行與機能，不用從東部上台北就能直接買到知名品牌的最新款商品，像是Manastash、Aldies、go slow caravan...而店內具有特色的民族風帳篷，反而還會吸引外地人特地前來挑選。');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `store`
--
ALTER TABLE `store`
  MODIFY `store_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
