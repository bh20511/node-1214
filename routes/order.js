const axios = require("axios");
const { HmacSHA256 } = require("crypto-js");
const Base64 = require("crypto-js/enc-base64");
const express = require("express");
const router = express.Router();
const db = require(__dirname + "/../modules/db_connect2.js");
const upload = require(__dirname + "/../modules/upload-img.js");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const {
  LINEPAY_CHANNEL_ID,
  LINEPAY_CHANNEL_SECRET_KEY,
  LINEPAY_VERSION,
  LINEPAY_SITE,
  LINEPAY_RETURN_HOST,
  LINEPAY_RETURN_CONFIRM_URL,
  LINEPAY_RETURN_CANCEL_URL,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  PHOTO,
} = process.env;
const moneyFormat = (price) => {
  let a = Number(price);
  let b = a.toLocaleString("zh-TW", { style: "currency", currency: "TWD" });
  let c = b.split(".");
  return c[0];
};
router.get("/api", async (req, res) => {
  //母訂單
  const momOrder =
    "SELECT * FROM `order` WHERE `member_sid`=? ORDER BY order_sid DESC ";
  [rows] = await db.query(momOrder, [req.query.sid]);
  //商品
  const childOrder =
    "SELECT * FROM `order` join `product_order` on order.order_num = product_order.order_num join product on product_order.products_sid = product.product_sid WHERE order.member_sid=?";
  [proRows] = await db.query(childOrder, [req.query.sid]);
  //房間
  const childOrder2 =
    "SELECT * FROM `order`join `booking_order` on `order`.order_num = booking_order.order_num join room on booking_order.room_sid= room.room_sid where order.member_sid=?";
  [roomRows] = await db.query(childOrder2, [req.query.sid]);
  //租借
  const childOrder3 =
    "SELECT * FROM `order`join `rental_order` on order.order_num = rental_order.order_num join rental on rental_order.rental_sid= rental.sid where order.member_sid=?";
  [renRows] = await db.query(childOrder3, [req.query.sid]);
  renRows.map((v) => (v.rental_img = v.rental_img.split(",")));

  //活動
  const childOrder4 =
    "SELECT * FROM `order`join `campaign_order` on order.order_num = campaign_order.order_num join campaign on campaign_order.campaign_sid= campaign.c_sid where order.member_sid=?";
  [camRows] = await db.query(childOrder4, [req.query.sid]);
  res.json({
    rows: rows,
    proRows: proRows,
    roomRows: roomRows,
    renRows: renRows,
    camRows: camRows,
  });
});
let orders = {};
let newOrder = {};
router.post("/createOrder", async (req, res) => {
  orders = req.body.order;
  newOrder = req.body;
  try {
    //要送出去的東西
    const linePayBody = {
      ...orders,
      //成功的頁面跟取消的頁面
      redirectUrls: {
        confirmUrl: `${LINEPAY_RETURN_HOST}/${LINEPAY_RETURN_CONFIRM_URL}`,
        cancelUrl: `${LINEPAY_RETURN_HOST}/${LINEPAY_RETURN_CANCEL_URL}`,
      },
    };

    const uri = "/payments/request";
    const headers = createSignature(uri, linePayBody);

    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
    const linePayRes = await axios.post(url, linePayBody, { headers });
    // console.log(linePayRes);
    res.json(linePayRes?.data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/pay/confirm", async (req, res) => {
  const { transactionId, orderId } = req.query;
  const { totalOrder } = newOrder;
  const { pro, room, camp, ren } = totalOrder;
  const { user } = newOrder.totalOrder;
  try {
    const linePayBody = {
      amount: orders.amount,
      currency: orders.currency,
    };
    const uri = `/payments/${transactionId}/confirm`;
    const headers = createSignature(uri, linePayBody);
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
    const linePayRes = await axios.post(url, linePayBody, { headers });
    // console.log(linePayRes);
    if (linePayRes?.data?.returnCode === "0000") {
      console.log(newOrder);
      const sql =
        "INSERT INTO `order`(`order_num`, `member_sid`, `total`, `recipient`, `recipient_address`, `recipient_phone`, `payment`, `remark`, `created_time`) VALUES (?,?,?,?,?,?,?,?,NOW())";
      const [rows] = await db.query(sql, [
        orderId,
        totalOrder.memberSid,
        totalOrder.totalPrice,
        user.name,
        user.address,
        user.mobile,
        totalOrder.pay,
        user.text,
      ]);
      if (pro) {
        for (let i = 0; i < pro.length; i++) {
          if (
            pro[i].sid == 719 ||
            pro[i].sid == 720 ||
            pro[i].sid == 721 ||
            pro[i].sid == 722
          ) {
            const proOrder =
              "INSERT INTO `product_order`(`order_num`, `products_sid`, `size`, `qty`, `total`, `custom_img`,`created_time`) VALUES (?,?,?,?,?,?,NOW())";
            const [proRows] = await db.query(proOrder, [
              orderId,
              pro[i].sid,
              pro[i].size || "",
              pro[i].quantity,
              pro[i].quantity * pro[i].price,
              pro[i].img,
            ]);
          } else {
            const proOrder =
              "INSERT INTO `product_order`(`order_num`, `products_sid`, `size`, `qty`, `total`, `img`,`created_time`) VALUES (?,?,?,?,?,?,NOW())";
            const [proRows] = await db.query(proOrder, [
              orderId,
              pro[i].sid,
              pro[i].size || "",
              pro[i].quantity,
              pro[i].quantity * pro[i].price,
              pro[i].img,
            ]);
          }
        }
      }
      if (room) {
        for (let i = 0; i < room.length; i++) {
          const roomOrder =
            "INSERT INTO `booking_order`(`order_num`, `room_sid`, `start`, `end`, `day`,`qty`, `total`, `img`, `created_time`) VALUES (?,?,?,?,?,?,?,?,NOW())";
          const [roomRows] = await db.query(roomOrder, [
            orderId,
            room[i].sid,
            room[i].startDate,
            room[i].endDate,
            room[i].day,
            room[i].quantity,
            room[i].quantity * room[i].price * room[i].day,
            room[i].img,
          ]);
        }
      }
      if (ren) {
        for (let i = 0; i < ren.length; i++) {
          const renOrder =
            "INSERT INTO `rental_order`(`order_num`, `rental_sid`, `store_out`, `store_back`, `out_date`, `back_date`,`day`, `deliveryFee`, `qty`, `total`, `img`,`created_time`) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW())";
          const renRows = await db.query(renOrder, [
            orderId,
            ren[i].sid,
            ren[i].out,
            ren[i].back,
            ren[i].start,
            ren[i].end,
            ren[i].day,
            ren[i].deliveryFee,
            ren[i].quantity,
            ren[i].quantity * ren[i].price * ren[i].day + ren[i].deliveryFee,
            ren[i].img,
          ]);
        }
      }
      if (camp) {
        for (let i = 0; i < camp.length; i++) {
          const campOrder =
            "INSERT INTO `campaign_order`(`order_num`, `campaign_sid`,dayname, `date_start`,  `people`, `total`, `img`,`created_time`) VALUES (?,?,?,?,?,?,?,NOW())";
          const campRows = await db.query(campOrder, [
            orderId,
            camp[i].sid,
            camp[i].dayname,
            camp[i].startDate,
            camp[i].quantity,
            camp[i].quantity * camp[i].price,
            camp[i].img,
          ]);
        }
      }
      const [whoUser] = await db.query(
        `SELECT nickname FROM members WHERE member_sid=${totalOrder.memberSid}`
      );
      if (rows.affectedRows) {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          auth: {
            user: MAIL_USERNAME,
            pass: MAIL_PASSWORD,
          },
        });
        transporter
          .sendMail({
            from: "gohiking837@gmail.com",
            to: "buyuser1214@gmail.com",
            subject: "訂單成立通知信",
            html: `<div class="container" style='width: 500px; height: 500px;
            border: 1px solid black;
            border-radius: 10px;
            overflow: hidden;'>
                    <div class="imgWrap" style='width: 500px;
                    height: 200px;
                    background-color: #01170d;
                    border-bottom: 1px solid black;'>
                      <img src=${PHOTO} alt="" style="width: 100%;
                      height: 100%;
                      object-fit: contain;">
                    </div>
                      <p style='font-size: 20px;
                      margin-left: 5px;'>親愛的：<span style='font-weight: 700;'>${
                        whoUser[0].nickname
                      }</span>，感謝您的購買</p>
                      <p style='font-size: 20px;
                      margin-left: 5px;'>您的訂單編號為：${orderId}</p>
                      <p style='font-size: 20px;
                      margin-left: 5px;'>訂單總金額：${moneyFormat(
                        totalOrder.totalPrice
                      )}</p>
                      <p style='font-size: 20px;
                      margin-left: 5px;'>詳細訂單連結：http://localhost:3000/member/orders</p>
                  </div>`,
          })
          .then((res) => {
            console.log({ res });
          })
          .catch(console.error);
        res.json(linePayRes?.data);
      }
    }
    // res.json(linePayRes?.data);
  } catch (error) {
    console.log(error);
    res.end();
  }
});
router.post("/cardPay", async (req, res) => {
  const { pro, room, camp, ren, memberSid, totalPrice, pay, user, orderId } =
    req.body;
  const sql =
    "INSERT INTO `order`(`order_num`, `member_sid`, `total`, `recipient`, `recipient_address`, `recipient_phone`, `payment`, `remark`, `created_time`) VALUES (?,?,?,?,?,?,?,?,NOW())";
  const [rows] = await db.query(sql, [
    orderId,
    memberSid,
    totalPrice,
    user.name,
    user.address,
    user.mobile,
    pay,
    user.text,
  ]);
  if (pro) {
    for (let i = 0; i < pro.length; i++) {
      if (
        pro[i].sid == 719 ||
        pro[i].sid == 720 ||
        pro[i].sid == 721 ||
        pro[i].sid == 722
      ) {
        const proOrder =
          "INSERT INTO `product_order`(`order_num`, `products_sid`, `size`, `qty`, `total`, `custom_img`,`created_time`) VALUES (?,?,?,?,?,?,NOW())";
        const [proRows] = await db.query(proOrder, [
          orderId,
          pro[i].sid,
          pro[i].size || "",
          pro[i].quantity,
          pro[i].quantity * pro[i].price,
          pro[i].img,
        ]);
      } else {
        const proOrder =
          "INSERT INTO `product_order`(`order_num`, `products_sid`, `size`, `qty`, `total`, `img`,`created_time`) VALUES (?,?,?,?,?,?,NOW())";
        const [proRows] = await db.query(proOrder, [
          orderId,
          pro[i].sid,
          pro[i].size || "",
          pro[i].quantity,
          pro[i].quantity * pro[i].price,
          pro[i].img,
        ]);
      }
    }
  }
  if (room) {
    for (let i = 0; i < room.length; i++) {
      const roomOrder =
        "INSERT INTO `booking_order`(`order_num`, `room_sid`, `start`, `end`, `day`,`qty`, `total`, `img`, `created_time`) VALUES (?,?,?,?,?,?,?,?,NOW())";
      const [roomRows] = await db.query(roomOrder, [
        orderId,
        room[i].sid,
        room[i].startDate,
        room[i].endDate,
        room[i].day,
        room[i].quantity,
        room[i].quantity * room[i].price * room[i].day,
        room[i].img,
      ]);
    }
  }
  if (ren) {
    for (let i = 0; i < ren.length; i++) {
      const renOrder =
        "INSERT INTO `rental_order`(`order_num`, `rental_sid`, `store_out`, `store_back`, `out_date`, `back_date`,`day`, `deliveryFee`, `qty`, `total`, `img`,`created_time`) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW())";
      const renRows = await db.query(renOrder, [
        orderId,
        ren[i].sid,
        ren[i].out,
        ren[i].back,
        ren[i].start,
        ren[i].end,
        ren[i].day,
        ren[i].deliveryFee,
        ren[i].quantity,
        ren[i].quantity * ren[i].price * ren[i].day + ren[i].deliveryFee,
        ren[i].img,
      ]);
    }
  }
  if (camp) {
    for (let i = 0; i < camp.length; i++) {
      const campOrder =
        "INSERT INTO `campaign_order`(`order_num`, `campaign_sid`,dayname, `date_start`,  `people`, `total`, `img`,`created_time`) VALUES (?,?,?,?,?,?,?,NOW())";
      const campRows = await db.query(campOrder, [
        orderId,
        camp[i].sid,
        camp[i].dayname,
        camp[i].startDate,
        camp[i].quantity,
        camp[i].quantity * camp[i].price,
        camp[i].img,
      ]);
    }
  }
  const [whoUser] = await db.query(
    `SELECT nickname FROM members WHERE member_sid=${memberSid}`
  );
  if (rows.affectedRows) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });
    transporter
      .sendMail({
        from: "gohiking837@gmail.com",
        to: "buyuser1214@gmail.com",
        subject: "訂單成立通知信",
        html: `<div class="container" style='width: 500px; height: 500px;
        border: 1px solid black;
        border-radius: 10px;
        overflow: hidden;'>
                <div class="imgWrap" style='width: 500px;
                height: 200px;
                background-color: #01170d;
                border-bottom: 1px solid black;'>
                  <img src=${PHOTO} alt="" style="width: 100%;
                  height: 100%;
                  object-fit: contain;">
                </div>
                  <p style='font-size: 20px;
                  margin-left: 5px;'>親愛的：<span style='font-weight: 700;'>${
                    whoUser[0].nickname
                  }</span>，感謝您的購買</p>
                  <p style='font-size: 20px;
                  margin-left: 5px;'>您的訂單編號為：${orderId}</p>
                  <p style='font-size: 20px;
                  margin-left: 5px;'>訂單總金額：${moneyFormat(totalPrice)}</p>
                  <p style='font-size: 20px;
                  margin-left: 5px;'>詳細訂單連結：http://localhost:3000/member/orders</p>
              </div>`,
      })
      .then((res) => {})
      .catch(console.error);
  }
  res.json(rows);
});
router.post("/TapPay", async (req, res) => {
  const { prime } = req.body;
  const post_data = {
    prime: prime,
    partner_key:
      "partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM",
    merchant_id: "GlobalTesting_CTBC",
    amount: 1,
    currency: "TWD",
    details: "An apple and a pen.",
    cardholder: {
      phone_number: "+886923456789",
      name: "jack",
      email: "buyuser1214@gmail.com",
    },
    remember: false,
  };
  const TapPayRes = await axios.post(
    "https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime",
    post_data,
    {
      headers: {
        "x-api-key":
          "partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM",
      },
    }
  );
  // console.log(TapPayRes);
  res.json(TapPayRes.data);
});
//寫評價
router.post("/writeEvaPro", async (req, res) => {
  const { sid, text, star } = req.body;
  const sql =
    "UPDATE `product_order` SET `star`=?,`message`=?,`messageTime`=NOW(),`created_time`=NOW() WHERE `order_sid`=?";
  const [rows] = await db.query(sql, [star, text, sid]);
  res.json(rows);
});
router.post("/writeEvaRoom", async (req, res) => {
  const { sid, text, star } = req.body;
  const sql =
    "UPDATE `booking_order` SET `star`=?,`message`=?,`messageTime`=NOW(),`created_time`=NOW() WHERE `order_sid`=?";
  const [rows] = await db.query(sql, [star, text, sid]);
  res.json(rows);
});
router.post("/writeEvaRen", async (req, res) => {
  const { sid, text, star } = req.body;
  const sql =
    "UPDATE `rental_order` SET `star`=?,`message`=?,`messageTime`=NOW(),`created_time`=NOW() WHERE `order_sid`=?";
  const [rows] = await db.query(sql, [star, text, sid]);
  res.json(rows);
});
router.post("/writeEvaCamp", async (req, res) => {
  const { sid, text, star } = req.body;
  const sql =
    "UPDATE `campaign_order` SET `star`=?,`message`=?,`messageTime`=NOW(),`created_time`=NOW() WHERE `order_sid`=?";
  const [rows] = await db.query(sql, [star, text, sid]);
  res.json(rows);
});
//看評價
router.get("/lookEva", async (req, res) => {
  if (req.query.proSid !== undefined) {
    const sql =
      "SELECT * FROM `product_order` join product on product_order.products_sid=product.product_sid WHERE product_order.order_sid=?";
    const [rows] = await db.query(sql, [req.query.proSid]);
    res.json(rows);
  }
  if (req.query.roomSid !== undefined) {
    const sql =
      "SELECT * FROM `booking_order` join room on booking_order.room_sid=room.room_sid WHERE booking_order.order_sid=?";
    const [rows] = await db.query(sql, [req.query.roomSid]);
    res.json(rows);
  }
  if (req.query.renSid !== undefined) {
    const sql =
      "SELECT * FROM `rental_order` join rental on rental_order.rental_sid=rental.sid WHERE rental_order.order_sid=?";
    const [rows] = await db.query(sql, [req.query.renSid]);
    rows.map((v) => (v.rental_img = v.rental_img.split(",")));
    res.json(rows);
  }
  if (req.query.campSid !== undefined) {
    const sql =
      "SELECT * FROM `campaign_order` join campaign on campaign_order.campaign_sid=campaign.c_sid WHERE campaign_order.order_sid=?";
    const [rows] = await db.query(sql, [req.query.campSid]);
    res.json(rows);
  }
});
//建立簽章的function
function createSignature(uri, linePayBody) {
  const nonce = uuidv4();
  const string = `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(
    linePayBody
  )}${nonce}`;
  //製作簽章
  const signature = Base64.stringify(
    HmacSHA256(string, LINEPAY_CHANNEL_SECRET_KEY)
  );
  const headers = {
    "Content-Type": "application/json",
    "X-LINE-ChannelId": LINEPAY_CHANNEL_ID,
    "X-LINE-Authorization-Nonce	": nonce,
    "X-LINE-Authorization	": signature,
  };
  return headers;
}

// router.get("/test", async (req, res) => {
//   const [whoUser] = await db.query(
//     `SELECT nickname FROM members WHERE member_sid=647`
//   );
//   res.json(uuidv4());
//   res.json(whoUser[0].nickname);
// });
// router.post("/test2", (req, res) => {
//   console.log(req.body);
// });
module.exports = router;
