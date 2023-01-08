const express = require('express');
const router = express.Router();
const db = require(__dirname + '/../modules/db_connect2.js');
const upload = require(__dirname + '/../modules/upload-img')

//大項分類title
router.get('/title',async (req,res)=>{
    // const [rows] = await db.query('SELECT * FROM `campaign` JOIN `campaign_type` ON `campaign`.`campaign_type_sid` =`campaign_type`.`sid`')
    const [rows] = await db.query('SELECT DISTINCT `campaign_type`.`campaign_type_name`, `campaign_type`.`camptype_sid` FROM `campaign` JOIN `campaign_type` ON `campaign`.`campaign_type_sid` =`campaign_type`.`camptype_sid` ORDER BY `campaign_type`.`camptype_sid` ASC')
    // const [rows] = await db.query('SELECT * FROM campaign')
    res.json(rows);
})

//全部資料
router.get('/all',async (req,res)=>{
    const [rows] = await db.query('SELECT * FROM `campaign` JOIN `campaign_type` ON `campaign`.`campaign_type_sid` =`campaign_type`.`camptype_sid` JOIN `campaign_days` ON `campaign`.`campaign_days_sid` = `campaign_days`.`campday_sid`')
      res.json(rows);
})

//select天數分類
router.get('/select',async (req,res)=>{
  const [rows] = await db.query('SELECT DISTINCT `campaign_days`.`dayname`, `campaign_days`.`campday_sid` FROM `campaign` JOIN `campaign_days` ON `campaign`.`campaign_days_sid` =`campaign_days`.`campday_sid` ORDER BY `campaign_days`.`campday_sid` ASC')
  res.json(rows);
})

//select難度分類
router.get('/level',async (req,res)=>{
  const [rows] = await db.query('SELECT DISTINCT `mountain`.`level` FROM `campaign` JOIN `mountain` ON `campaign`.`mountain_sid` =`mountain`.`mountain_sid` ORDER BY `mountain`.`mountain_sid` DESC')
  res.json(rows);
})

//活動報名人數
router.get('/joinnum',async (req,res)=>{
  let cid = req.query.cid
  // const [rows] = await db.query(`SELECT SUM(\`campaign_order\`.\`people\`) as pnum FROM \`campaign\`  JOIN  \`campaign_order\` ON \`campaign\`.\`c_sid\` = \`campaign_order\`.\`campaign_sid\` WHERE \`campaign\`.\`c_sid\` = ${cid}`)
  //     res.json(rows);
  const [rows] = await db.query(`SELECT \`campaign_order\`.* , SUM(\`campaign_order\`.\`people\`) as pnum FROM \`campaign\`  JOIN  \`campaign_order\` ON \`campaign\`.\`c_sid\` = \`campaign_order\`.\`campaign_sid\` GROUP BY \`campaign_order\`.\`campaign_sid\` ORDER BY \`campaign_order\`.\`campaign_sid\` `)

//   const [rows] = await db.query(`SELECT \`campaign\`.\`c_sid\`,\`campaign_order\`.\`people\` as pnum FROM \`campaign\` JOIN \`campaign_order\` ON \`campaign\`.\`c_sid\` = \`campaign_order\`.campaign_sid GROUP BY \`campaign_order\`.\`people\` ORDER BY \`campaign_order\`.\`campaign_sid\` )
  res.json(rows)
})

//評價資料
router.get('/comm',async (req,res)=>{
  const [rows] = await db.query('SELECT * FROM `campaign` JOIN `campaign_type` ON `campaign`.`campaign_type_sid` =`campaign_type`.`camptype_sid` JOIN `campaign_days` ON `campaign`.`campaign_days_sid` = `campaign_days`.`campday_sid` JOIN `campaign_order` ON `campaign`.`c_sid` = `campaign_order`.`campaign_sid`' )
    res.json(rows);
})

//評論 獲得"山高"、"評論留言"、"星數"
router.get('/comment',async (req,res)=>{
  let cid = req.query.cid
  //rows = "會員的評論留言跟會員的累積高度"
  const [rows] = await db.query(`SELECT members.member_sid,members.avatar,members.total_height,members.nickname,campaign_order.star,campaign_order.message,campaign_order.messageTime FROM \`campaign_order\` join \`order\` on order.order_num = campaign_order.order_num join members on order.member_sid = members.member_sid WHERE campaign_order.campaign_sid = ${cid}`)
  //rows2 = "星數"
  const [rows2] = await db.query(`SELECT ROUND(SUM(campaign_order.star)/COUNT(campaign_order.star),1) as avgStar FROM \`campaign_order\` join \`order\` on order.order_num = campaign_order.order_num join members on order.member_sid = members.member_sid WHERE campaign_order.campaign_sid = ${cid}`)
  console.log(rows2);
  res.json({rows:rows,rows2:rows2});
})

//camp_sid 細節頁
router.get('/:sid',async (req,res)=>{
  let sid = req.params.sid ? req.params.sid.trim() : '';
  where ='WHERE 1'
  console.log(sid)
  if(sid){
    where = `WHERE campaign.c_sid=${sid}`;
  }
  console.log(where)
    const [rows] = await db.query(`SELECT * FROM \`campaign\` JOIN \`location\` ON \`campaign\`.\`location_sid\` =\`location\`.\`sid\` JOIN \`mountain\` ON \`campaign\`.\`mountain_sid\` =\`mountain\`.\`mountain_sid\` ${where}`)
      

      rows.map((v, i) =>  v.detailImages = v.detailImages.split(', ')
    )
    res.json(rows);
})



module.exports = router;