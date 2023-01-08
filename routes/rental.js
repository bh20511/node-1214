const express = require("express");
const router = express.Router();
const db = require(__dirname + "/../modules/db_connect2.js");
const upload = require(__dirname + "/../modules/upload-img.js");
const fetch = require("node-fetch");
const axios = require("axios");

//商品大頁搜尋 廢棄
// async function api(req) {
//   // const sql = `SELECT * FROM "rental" WHERE 1 AND "rental_brand" IN ("TiiTENT","Snow Peak")`;//這個是錯誤的由於標點符號
//   const sql = `SELECT * FROM \`rental\` WHERE 1 AND \`rental_brand\` IN ("TiiTENT","Snow Peak")`;
//   [rows] = await db.query(sql);
//   const sql2 = `SELECT COUNT(1) FROM rental`;
//   [[count]] = await db.query(sql2);
//   // console.log(count['COUNT(1)'])
//   // console.log(rows)
//   rows.map((v, i) => {
//     return (v.rental_img = v.rental_img.split(","));
//   });
//   rows.map((v, i) => {
//     return (v.rental_label = v.rental_label.split(","));
//   });

//   return rows, count;
// }
// router.get("/api", async (req, res) => {
//   await api(req);
//   res.json({ rows: rows, count: count });
// });

// 分頁製作
async function getPageData(req) {
  const perPage = 20;
  let page = +req.query.page || 1;

  //看看有沒有要求排序
  let order_by = "";
  if (req.query.order_by === "price_DESC") {
    order_by = "rental_price DESC";
  } else if (req.query.order_by === "price_ASC") {
    order_by = "rental_price ASC";
  } else if (req.query.order_by === "time_DESC") {
    order_by = "rental_time DESC";
  } else {
    order_by = "sid DESC";
  }
  // console.log("helloo", order_by);
  //看看有沒走要字串搜尋
  let search = req.query.search ? req.query.search.trim() : "";
  let where = `WHERE 1 `;

  let category = req.query.category ? req.query.category.trim() : "";
  if (category) {
    where += `AND \`rental_category\` = '${category}'`;
  }

  let brand = req.query.brand ? req.query.brand.trim() : "";
  if (brand) {
    const brandwords = brand.split(",");
    where += `AND \`rental_brand\` in ('${brandwords.join("','")}')`;
  }

  let label = req.query.label ? req.query.label.trim() : "";
  if (label) {
    const labelword = label.split(",");
    // console.log(labelword);
    where += `AND (rental_label LIKE '%${labelword.join(
      "' OR rental_label LIKE '%"
    )}%')`;

    // (rental_label LIKE '%二人帳%' OR rental_label LIKE '%四人帳%')
  }

  if (search) {
    where += `AND (\`rental_name\` LIKE ${db.escape("%" + search + "%")})`;
  }

  const sql1 = `SELECT COUNT(1) count FROM rental ${where} `;
  //  "TiiTENT","Snow Peak"
  console.log(sql1);
  [[{ count }]] = await db.query(sql1);
  let totalPages = 0;
  let rows = [];
  if (count > 0) {
    totalPages = Math.ceil(count / perPage);
  }
  const sql = `SELECT * FROM rental  ${where} ORDER  BY ${order_by} LIMIT ${
    (page - 1) * perPage
  },${perPage} `;
  [rows] = await db.query(sql);

  //這邊單純是我的資料加工成我要的樣子
  rows.map((v, i) => {
    return (v.rental_img = v.rental_img.split(","));
  });
  rows.map((v, i) => {
    return (v.rental_label = v.rental_label.split(","));
  });
  return { rows, count, totalPages };
}
router.get("/pageApi", async (req, res) => {
  res.json(await getPageData(req));
});

//商品細節內頁
async function getDetailData(req) {
  const { sid } = req.params;
  const sql = `SELECT * FROM rental where sid =${sid}`;
  [rows] = await db.query(sql);
  rows[0].rental_img = rows[0].rental_img.split(",");
  console.log(rows);
  return { rows };
}
router.get("/getDetailData/:sid", async (req, res) => {
  res.json(await getDetailData(req));
});

// 評論 獲得"山高"、"評論留言"、"星數"
//SELECT members.avatar,members.total_height,members.name,product_order.star,product_order.message,product_order.messageTime FROM (`product_order` join `order` on order.order_num = product_order.order_num) join members on order.member_sid = members.member_sid WHERE product_order.products_sid = ;
router.get("/comment", async (req, res) => {
  let sid = req.query.sid;
  const [rows] = await db.query(
    `SELECT members.member_sid,members.avatar,members.total_height,members.nickname,rental_order.star,rental_order.message,rental_order.messageTime FROM \`rental_order\` join \`order\` on order.order_num = rental_order.order_num join members on order.member_sid = members.member_sid WHERE rental_order.rental_sid = ${sid}`
  );
  const [rows2] = await db.query(
    `SELECT ROUND(SUM(rental_order.star)/COUNT(rental_order.star),1) as avgStar FROM \`rental_order\` join \`order\` on order.order_num = rental_order.order_num join members on order.member_sid = members.member_sid WHERE rental_order.rental_sid = ${sid}`
  );
  console.log(rows2);
  res.json({ rows: rows, rows2: rows2 });
});

//細節頁店點
async function getStore(req) {
  const sql = `SELECT * FROM store`;
  [rows] = await db.query(sql);
  return { rows };
}
router.get("/getStore", async (req, res) => {
  res.json(await getStore(req));
});

//細節頁猜你喜歡
async function getLike(req) {
  const sql = `SELECT * FROM rental ORDER BY RAND() LIMIT 3`;
  [rows] = await db.query(sql);
  rows.map((v, i) => {
    return (v.rental_img = v.rental_img.split(","));
  });
  rows.map((v, i) => {
    return (v.rental_label = v.rental_label.split(","));
  });
  return { rows };
}
router.get("/getLike", async (req, res) => {
  res.json(await getLike(req));
});
//商品名稱模糊搜尋 廢棄
// async function getSearchData(req) {
//   const { search } = req.query;
//   const sql = `SELECT * FROM rental where rental_name LIKE "%${search}%"`;
//   [rows] = await db.query(sql);
//   rows.map((v, i) => {
//     return (v.rental_img = v.rental_img.split(","));
//   });
//   rows.map((v, i) => {
//     return (v.rental_label = v.rental_label.split(","));
//   });
//   console.log(rows);
//   return { rows };
// }
// router.get("/getSearchData", async (req, res) => {
//   res.json(await getSearchData(req));
// });

//Azure 串接
router.post("/ai", upload.none(), async (req, res) => {
  const url = process.env.AI_URL;

  const key = process.env.AI_Key;
  const question = {
    question: req.body.question,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": key,
    },
  })
    .then((r) => r.json())
    .then((obj) => {
      // console.log(obj);
      const reply = obj.answers[0];
      res.send(reply);
    });
  1;
});

module.exports = router;
