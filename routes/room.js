const express = require("express");
const router = express.Router();
const db = require(__dirname + "/../modules/db_connect2.js");
const upload = require(__dirname + "/../modules/upload-img");

//訂房主頁面
router.get("/list", async (req, res) => {
  // LEFT JOIN booking_order ON room.room_sid=booking_order.room_sid

  // const [rows] = await db.query('SELECT * FROM room JOIN mountain on room.mountain_sid=mountain.mountain_sid')
  const [M1rows] = await db.query(
    "SELECT room.*, mountain.*, location.*, booking_order.star,SUM(booking_order.star)/COUNT(booking_order.star) as Average, COUNT(booking_order.star) as commentQty FROM room JOIN mountain on room.mountain_sid=mountain.mountain_sid JOIN location ON location.sid=room.location_sid LEFT JOIN booking_order ON room.room_sid=booking_order.room_sid WHERE room.mountain_sid=3 GROUP BY room.room_sid ORDER BY booking_order.star DESC LIMIT 4"
  );
  const [M2rows] = await db.query(
    "SELECT room.*, mountain.*, location.*, booking_order.star,SUM(booking_order.star)/COUNT(booking_order.star) as Average, COUNT(booking_order.star) as commentQty FROM room JOIN mountain on room.mountain_sid=mountain.mountain_sid JOIN location ON location.sid=room.location_sid LEFT JOIN booking_order ON room.room_sid=booking_order.room_sid WHERE room.mountain_sid=40 GROUP BY room.room_sid ORDER BY booking_order.star DESC LIMIT 4"
  );
  const [M3rows] = await db.query(
    "SELECT room.*, mountain.*, location.*, booking_order.star,SUM(booking_order.star)/COUNT(booking_order.star) as Average, COUNT(booking_order.star) as commentQty FROM room JOIN mountain on room.mountain_sid=mountain.mountain_sid JOIN location ON location.sid=room.location_sid LEFT JOIN booking_order ON room.room_sid=booking_order.room_sid WHERE room.mountain_sid=5 GROUP BY room.room_sid ORDER BY booking_order.star DESC LIMIT 4"
  );

  res.json({
    // rows:rows,
    M1rows: M1rows,
    M2rows: M2rows,
    M3rows: M3rows,
  });
});

//SearchBar 內容
router.get("/searchbar", async (req, res) => {
  const [locationRows] = await db.query("SELECT * FROM location");
  const [mountainRows] = await db.query("SELECT * FROM mountain");

  res.json({
    locationRows: locationRows,
    mountainRows: mountainRows,
  });
});

//SearchBar SELECT連動
router.get("/searchbar/getlocation", async (req, res) => {
  const { location_sid } = req.query;
  const [locationRows] = await db.query(`SELECT * FROM location `);
  const [mountainRows] = await db.query(
    `SELECT * FROM mountain WHERE location_sid=${location_sid}`
  );

  res.json({
    locationRows: locationRows,
    mountainRows: mountainRows,
  });

  //SearchBar SELECT連動下方卡片
  router.get("/searchbar/getroom", async (req, res) => {
    const { mountain_sid } = req.query;

    const [roomRows] = await db.query(
      `SELECT room.*, mountain.*, location.*, booking_order.star,SUM(booking_order.star)/COUNT(booking_order.star) as Average, COUNT(booking_order.star) as commentQty FROM room JOIN mountain on room.mountain_sid=mountain.mountain_sid JOIN location ON location.sid=room.location_sid LEFT JOIN booking_order ON room.room_sid=booking_order.room_sid WHERE room.mountain_sid=${mountain_sid} GROUP BY room.room_sid ORDER BY booking_order.star DESC LIMIT 4`
    );

    res.json({
      roomRows: roomRows,
    });
  });

  // SearchBar 關鍵字模糊搜尋
  router.get("/searchbar/namegetroom", async (req, res) => {
    const { roomname } = req.query;
    const { mountain } = req.query;
    // console.log(req.params.selectRoom)
    // console.log(req.params.roomname)
    const [roomRows] = await db.query(
      `SELECT room.*, mountain.*, location.*, booking_order.star,SUM(booking_order.star)/COUNT(booking_order.star) as Average, COUNT(booking_order.star) as commentQty FROM room JOIN mountain on room.mountain_sid=mountain.mountain_sid JOIN location ON location.sid=room.location_sid LEFT JOIN booking_order ON room.room_sid=booking_order.room_sid  WHERE room.mountain_sid=${mountain} AND room.room_name LIKE '%${roomname}%' GROUP BY room.room_sid ORDER BY booking_order.star`
    );

    res.json({
      roomRows: roomRows,
      // ABC:'123'
    });
  });
});

//FilterPage
//SearchBar SELECT連動FilterPage
router.get("/searchbar/getmountain", async (req, res) => {
  const { location_sid } = req.query;
  const [locationRows] = await db.query(`SELECT * FROM location `);
  const [mountainRows] = await db.query(
    `SELECT * FROM mountain WHERE location_sid=${location_sid}`
  );

  res.json({
    locationRows: locationRows,
    mRows: mountainRows,
  });
});
//SearchBar SELECT連動下方卡片
router.get("/searchbar/FageGetRoom", async (req, res) => {
  const { mountain_sid } = req.query;
  const [roomRows] = await db.query(
    `SELECT room.*, mountain.*, location.*, booking_order.star,SUM(booking_order.star)/COUNT(booking_order.star) as Average, COUNT(booking_order.star) as commentQty FROM room JOIN mountain on room.mountain_sid=mountain.mountain_sid JOIN location ON location.sid=room.location_sid LEFT JOIN booking_order ON room.room_sid=booking_order.room_sid  WHERE room.mountain_sid=${mountain_sid} GROUP BY room.room_sid ORDER BY booking_order.star DESC`
  );

  res.json({
    selRoomRows: roomRows,
  });
});

//房間細節內頁
router.get('/getRoomDetail/:room_sid', async (req, res)=>{
    const {room_sid} = req.params 
    // const [rows] = await db.query(`
    // SELECT room.*, mountain.*, \`location\`.sid, \`location\`.name AS location_name, members.*, \`order\`.*, booking_order.*, SUM(booking_order.star)/COUNT(booking_order.star) as Average, COUNT(booking_order.star) as commentQty FROM room JOIN mountain on room.mountain_sid=mountain.mountain_sid JOIN location ON location.sid=room.location_sid LEFT JOIN booking_order ON room.room_sid=booking_order.room_sid JOIN  \`order\` ON booking_order.order_sid= \`order\`.order_sid JOIN members ON  \`order\`.member_sid=members.member_sid WHERE room.room_sid=${room_sid} GROUP BY room.room_sid ORDER BY booking_order.star`) ;

    const [rows] = await db.query(`
    SELECT room.*, mountain.*, \`location\`.sid, \`location\`.name AS location_name, members.*, \`order\`.*, booking_order.*, SUM(booking_order.star)/COUNT(booking_order.star) as Average, COUNT(booking_order.star) as commentQty FROM room JOIN mountain on room.mountain_sid=mountain.mountain_sid JOIN location ON location.sid=room.location_sid LEFT JOIN booking_order ON room.room_sid=booking_order.room_sid JOIN  \`order\` ON booking_order.order_num= \`order\`.order_num JOIN members ON  \`order\`.member_sid=members.member_sid WHERE room.room_sid=${room_sid} GROUP BY room.room_sid ORDER BY booking_order.star`) ;
    
    const [rowsForComment] = await db.query(`
    SELECT * FROM booking_order JOIN \`order\` ON booking_order.order_num= \`order\`.order_num JOIN members ON \`order\`.member_sid=members.member_sid WHERE booking_order.room_sid=${room_sid}`) ;
    
    const [rowsNoComment] = await db.query(`
    SELECT room.*, mountain.*, location.sid, location.name AS location_name FROM room JOIN mountain on room.mountain_sid=mountain.mountain_sid JOIN location ON location.sid=room.location_sid WHERE room.room_sid=${room_sid}`)

  rows.length > 0 && (rows[0].room_imgs = rows[0].room_imgs.split(","));
  rows.length > 0 &&
    (rows[0].room_service_sid = rows[0].room_service_sid.split(","));

  rows.length <= 0 &&
    rowsNoComment.length > 0 &&
    (rowsNoComment[0].room_imgs = rowsNoComment[0].room_imgs.split(","));
  rows.length <= 0 &&
    rowsNoComment.length > 0 &&
    (rowsNoComment[0].room_service_sid =
      rowsNoComment[0].room_service_sid.split(","));

    res.json({
        rows:[...rows,rowsNoComment[0]],
        rowsForComment:rowsForComment,
        rowsNoComment:rowsNoComment,
        });
});

//爬山折價券

router.get("/coupon", async (req, res) => {
  const { coupon_sid } = req.query;
  const [couponRows] = await db.query(`SELECT * FROM coupon`);

  res.json({
    couponRows: couponRows,
  });
});
//PO文data

router.get('/post',async (req,res)=>{

    let sql = "SELECT `posts`.*, `mountain`.*, `location`.sid, `location`.name as location_name, `members`.* FROM `posts` JOIN `mountain` ON posts.mountain_sid = mountain.mountain_sid JOIN `location` ON mountain.location_sid = location.sid JOIN `members` ON posts.member_sid = members.member_sid ORDER BY posts.post_sid DESC LIMIT 8"
    const [postRows] = await db.query(sql) 
   
    res.json({
        postRows:postRows,
        });
})
  //一日單攻活動data

router.get('/oneday',async (req,res)=>{

    let sql = "SELECT campaign.*, mountain.*, location.*, campaign_order.* ,SUM(campaign_order.people) as totalPeople FROM `campaign` JOIN `mountain` ON campaign.mountain_sid = mountain.mountain_sid JOIN `location` ON location.sid = campaign.location_sid JOIN `campaign_order` ON campaign.c_sid = campaign_order.campaign_sid WHERE campaign.c_sid=36"
    const [onedayRows] = await db.query(sql) 
    onedayRows[0].brife_describe =onedayRows[0].brife_describe.split('。')[1]
    onedayRows[0].detailImages =onedayRows[0].detailImages.split(', ')


  res.json({
    onedayRows: onedayRows,
  });
});

module.exports = router;
