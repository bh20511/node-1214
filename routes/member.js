const express = require("express")
const router = express.Router()
const db = require(__dirname + "/../modules/db_connect2.js")
const upload = require(__dirname + "/../modules/upload-img")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const { dirname } = require("path")
const sharp = require("sharp")
const bcrypt = require("bcrypt")
const { auth } = require(__dirname + "/../modules/auth.js")
const nodemailer = require("nodemailer")

// router.get("/api", async (req, res) => {
//   const sql = `SELECT * FROM members WHERE member_sid = ?`;
//   [rows] = await db.query(sql, [req.query.id]);
//   // return {rows};
//   res.send({ rows });
// });

router.post("/login/api", upload.none(), async (req, res) => {
  const sql = "SELECT * FROM `members` WHERE `email` = ?"
  const output = {
    success: false,
    member_sid: "",
    token: "",
  }

  const [result] = await db.query(sql, [req.body.email.toLowerCase()])

  if (
    result[0] &&
    req.body.password &&
    bcrypt.compareSync(req.body.password, result[0].password)
  ) {
    const token = jwt.sign({ member_sid: result[0].member_sid }, "hiking1214")

    output.member_sid = result[0].member_sid
    output.success = true
    output.token = token
  }

  res.json(output)
})

//註冊
router.post("/join/api", upload.none(), async (req, res) => {
  // res.json(req.body);

  const output = {
    success: false,
    code: 0,
    error: "",
    postData: req.body,
    token: "",
    //for debug
  }

  if (
    !req.body.name ||
    !req.body.nickname ||
    !req.body.email ||
    !req.body.password
  ) {
    output.error = ": 必填欄位不得空白"
    return res.json(output)
  }

  if (
    !req.body.email.match(
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    )
  ) {
    output.error = ": 電子信箱格式錯誤"
    return res.json(output)
  }

  if (req.body.mobile && !req.body.mobile.match(/^09\d{2}-?\d{3}-?\d{3}$/)) {
    output.error = ": 手機號碼格式錯誤"
    return res.json(output)
  }

  if (!req.body.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
    output.error = ": 密碼格式錯誤"
    return res.json(output)
  }

  if (req.body.birthday && isNaN(new Date(req.body.birthday))) {
    output.error = ": 生日格式錯誤"
    return res.json(output)
  }

  const sqlCheckMail = "SELECT * FROM `members` WHERE `email` = ?"

  const [rowsCheckMail] = await db.query(
    sqlCheckMail,
    req.body.email.toLowerCase()
  )

  if (rowsCheckMail.length > 0) {
    output.error = ": 信箱已註冊"
    return res.json(output)
  }

  const passBcrypt = bcrypt.hashSync(req.body.password, 10)

  const sql =
    "INSERT INTO `members`(`name`, `password`, `email`, `mobile`, `address`, `birthday`, `nickname`, `intro`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())"

  const [result] = await db.query(sql, [
    req.body.name,
    passBcrypt,
    req.body.email.toLowerCase(),
    req.body.mobile,
    req.body.address,
    req.body.birthday === "" ? null : req.body.birthday,
    req.body.nickname,
    req.body.intro,
  ])

  console.log(result)

  const sqlNew = "SELECT * FROM `members` WHERE `email` = ?"
  const [resultNew] = await db.query(sqlNew, [req.body.email.toLowerCase()])
  const token = jwt.sign({ member_sid: resultNew[0].member_sid }, "hiking1214")

  if (result.affectedRows) {
    output.success = true
    output.token = token
  }

  res.json(output)
})

router.post("/forgotPass/api", upload.none(), async (req, res) => {
  const sql = "SELECT * FROM `members` WHERE `email` = ?"

  const [result] = await db.query(sql, [req.body.email.toLowerCase()])

  if (!result[0]) {
    return res.json({message: "密碼重置信已寄出"})
  }

  const token = jwt.sign(
    { member_sid: result[0].member_sid },
    "hiking1214" + result[0].password
  )

  // const verifiedToken = jwt.verify(token, "hiking1214" + result[0].password)

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "gohiking837@gmail.com",
      pass: "aumabmmefhbnvljl",
    },
  })

  transporter.sendMail(
    {
      from: "gohiking837@gmail.com",
      to: req.body.email.toLowerCase(),
      subject: "[837]會員密碼重設",
      text: `您好\n\n請點選下列網址，完成密碼重設的手續。\n\nhttp://localhost:3000/resetPass?token=${token}&mid=${result[0].member_sid}\n\n■ 若您未曾在837設定本電子郵件帳號，這表示其他用戶很可能輸入錯誤的信箱帳號，\n導致系統傳送本封郵件至此信箱內。\n請直接刪除本封郵件即可。`,
    },
    (err) => {
      console.log("寄件錯誤:" + err)
    }
  )

  return res.json({message: "密碼重置信已寄出", token: token})
})

router.post("/resetPass/api", upload.none(), async(req, res)=> {
  const sqlCheckOldPass = "SELECT * FROM `members` WHERE `member_sid` = ?"

  const [result] = await db.query(sqlCheckOldPass, [req.query.mid.toLowerCase()])

  if (!result[0] || !result[0].password) {
    return res.json({message: "帳號不存在"})
  }

  let jwtInfo = {}

  try {jwt.verify(req.query.token, "hiking1214" + result[0].password)}
  catch {
    return res.json({message: "重置密碼連結無效"})
  }

  jwtInfo = jwt.verify(req.query.token, "hiking1214" + result[0].password)

  if (bcrypt.compareSync(req.body.newPass, result[0].password)) {
    return res.json({message: "新密碼不可與目前密碼相同"})
  }

  const newPassBcrypt = bcrypt.hashSync(req.body.newPass, 10)

  const sqlNewPass = "UPDATE `members` SET `password` = ? WHERE `member_sid` = ?"

  const [resultM] = await db.query(sqlNewPass, [newPassBcrypt, jwtInfo.member_sid])

  if(resultM) {
    const token = jwt.sign({ member_sid: jwtInfo.member_sid }, "hiking1214")
    return res.json({message: "密碼重置成功", token: token})
  }

  return res.json({message: "密碼重置失敗"})
  // res.json(`token: ${req.query.token} | mid: ${req.query.mid} | new pass : ${req.body.newPass}`)
})

router.post(
  "/post/api",
  [auth, upload.single("image_url")],
  async (req, res) => {
    const output = {
      update: false,
      success: false,
      code: 0,
      error: {},
      postData: req.body,
      token: "",
      //for debug
    }

    let mid = 0

    if (res.locals.loginUser) {
      mid = res.locals.loginUser.member_sid
    }

    await sharp(req.file.path)
      .resize({
        fit: sharp.fit.contain,
        width: 400,
      })
      .toFile(__dirname + "/../public/uploads/thumb_" + req.file.filename)

    //save new post
    const sql =
      "INSERT INTO `posts`(`member_sid`, `image_url`, `context`, `mountain_sid`) VALUES (?, ?, ?, ?)"

    const [result] = await db.query(sql, [
      mid,
      req.file.filename,
      req.body.context,
      req.body.mountain_sid,
    ])

    if (result.affectedRows) output.update = true

    //update total_height
    if (!output.update) return res.json(output)

    const sqlM =
      "UPDATE `members` SET `total_height` = `total_height` + ? WHERE `member_sid` = ?"

    const [resultM] = await db.query(sqlM, [req.body.height, mid])

    if (result.affectedRows && resultM.affectedRows) output.success = true
    res.json(output)
  }
)

router.post("/like/api", [auth, upload.none()], async (req, res) => {
  // res.json({mid: req.body.mid, pid: req.body.pid})

  const output = {
    update: false,
    success: false,
  }

  const mid = req.body.mid
  const pid = req.body.pid

  const sqlV = "SELECT * FROM `likes` WHERE `member_sid` = ? AND `post_sid` = ?"

  const [rows] = await db.query(sqlV, [mid, pid]) 

  if(rows[0]) {
    return res.json(output)
  }


  const sql = "INSERT INTO `likes`(`member_sid`, `post_sid`) VALUES (?,?)"

  const [result] = await db.query(sql, [mid, pid])

  if (result.affectedRows) output.update = true

  if (!output.update) return res.json(output)

  const sqlP = "UPDATE `posts` SET `likes` = `likes` + 1 WHERE `post_sid` = ?"

  const [resultP] = await db.query(sqlP, pid)

  if (resultP.affectedRows) output.success = true

  res.json(output)
})
  
router.post("/reply/api", [auth, upload.none()], async (req, res) => {
  // res.json(req.body)
  const output = {
    update: false,
    success: false,
  }

  const sql =
    "INSERT INTO `replies`(`post_sid`, `member_sid`, `context`, `parent_sid`) VALUES (?, ?, ?, ?)"

  const [result] = await db.query(sql, [
    req.body.post_sid,
    req.body.member_sid,
    req.body.context,
    req.body.sid? req.body.sid : null
  ])

  if (result.affectedRows) output.update = true

  if (!output.update) return res.json(output)

  const sqlP =
    "UPDATE `posts` SET `comments` = `comments` + 1 WHERE `post_sid` = ?"

  const [resultP] = await db.query(sqlP, req.body.post_sid)

  if (resultP.affectedRows) output.success = true

  res.json(output)
})

router.post("/follow/api", auth, async (req, res) => {
  const output = {
    success: false,
  }

  const mid = req.query.mid || 0
  const fid = res.locals.loginUser.member_sid || 0

  if (`${mid}` === `${fid}`) {
    return res.json(output)
  }

  const sqlV = "SELECT * FROM `follows` WHERE `member_sid` = ? AND `follow_sid` = ?"

  const [rows] = await db.query(sqlV, [mid, fid]) 

  if(rows[0]) {
    return res.json(output)
  }


  const sql = "INSERT INTO `follows`(`member_sid`, `follow_sid`) VALUES (?, ?)"

  const [result] = await db.query(sql, [mid, fid])

  if (result.affectedRows) output.success = true

  res.json(output)
})

router.get("/follow/api", async (req, res) => {
  const sql =
    "SELECT members.nickname, members.avatar, members.member_sid FROM `follows` JOIN `members` ON follows.follow_sid = members.member_sid WHERE follows.member_sid = ?"

  const [rows] = await db.query(sql, req.query.mid)

  // console.log(rows)

  res.json(rows)
})

router.get("/following/api", async (req, res) => {
  const sql =
    "SELECT members.nickname, members.avatar, members.member_sid FROM `follows` JOIN `members` ON follows.member_sid = members.member_sid WHERE follows.follow_sid = ?"

  const [rows] = await db.query(sql, req.query.fid)

  // console.log(rows)

  res.json(rows)
})

router.get("/reply/api", async (req, res) => {
  const pid = req.query.pid

  const sql =
    "SELECT replies.context, replies.datetime, replies.parent_sid, replies.sid, replies.post_sid, members.member_sid, members.total_height, members.nickname, members.avatar FROM `replies` JOIN `members` on replies.member_sid = members.member_sid WHERE replies.post_sid = ?"

  const [rows] = await db.query(sql, pid)

  res.json(rows)
})

router.get("/like/api", async (req, res) => {
  // res.json(req.query.mid)
  let mid = req.query.mid || 0
  let pid = req.query.pid || 0

  const sql = "SELECT * FROM `likes` WHERE member_sid = ? && post_sid = ?"

  const [rows] = await db.query(sql, [mid, pid])

  // console.log(rows);

  res.json(rows)
})

router.delete("/like/api", async (req, res) => {
  const mid = req.query.mid
  const pid = req.query.pid
  const output = {
    update: false,
    success: false,
  }

  const sqlV = "SELECT * FROM `likes` WHERE `member_sid` = ? AND `post_sid` = ?"

  const [rows] = await db.query(sqlV, [mid, pid]) 

  if(!rows[0]) {
    return res.json(output)
  }

  const sql = "DELETE FROM `likes` WHERE member_sid = ? AND post_sid = ?"

  const [result] = await db.query(sql, [mid, pid])

  if (result.affectedRows) output.update = true

  const sqlP = "UPDATE `posts` SET `likes` = `likes` - 1 WHERE `post_sid` = ?"

  const [resultP] = await db.query(sqlP, pid)

  if (resultP.affectedRows) output.success = true

  res.json(output)
})

router.delete("/reply/api", auth, async (req, res) => {
  const pid = req.query.pid
  const sid = req.query.sid
  const output = {
    update: false,
    success: false,
  }

  const sql = "DELETE FROM `replies` WHERE `sid` = ?"

  const [result] = await db.query(sql, sid)

  if (result.affectedRows) output.update = true
  
  const sqlP = "UPDATE `posts` SET `comments` = `comments` - 1 WHERE `post_sid` = ?"

  const [resultP] = await db.query(sqlP, pid)

  if (resultP.affectedRows) output.success = true

  res.json(output)

})

router.delete("/follow/api", auth, async (req, res) => {
  const mid = req.query.mid
  const fid = res.locals.loginUser.member_sid
  const output = {
    success: false,
  }

  const sqlV = "SELECT * FROM `follows` WHERE `member_sid` = ? AND `follow_sid` = ?"

  const [rows] = await db.query(sqlV, [mid, fid]) 

  if(!rows[0]) {
    return res.json(output)
  }

  const sql = "DELETE FROM `follows` WHERE member_sid = ? AND follow_sid = ?"

  const [result] = await db.query(sql, [mid, fid])

  if (result.affectedRows) output.success = true

  res.json(output)
})

router.get("/post/api", async (req, res) => {
  let mid = req.query.mid

  const sql =
    "SELECT * FROM `posts` JOIN `mountain` ON posts.mountain_sid = mountain.mountain_sid JOIN `location` ON mountain.location_sid = location.sid WHERE member_sid = ?"
  const [rows] = await db.query(sql, mid)

  res.json(rows)
})

router.get("/modal/api", async (req, res) => {
  const mid = req.query.mid

  const sql =
    "SELECT members.nickname, members.total_height, members.avatar FROM members WHERE member_sid = ?"
  const [rows] = await db.query(sql, mid)

  // console.log(rows);

  res.json(rows)
})

router.get("/profile/api", async (req, res) => {
  const mid = req.query.mid

  const sql =
    "SELECT member_sid, nickname, avatar, intro, total_height FROM `members` WHERE member_sid = ?"
  const [rows] = await db.query(sql, mid)
  // console.log({rows});
  res.json({ rows })
})

router.get("/locations/api", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM `location` WHERE 1")
  // console.log(rows)
  res.json({ rows })
})

router.get("/mountains/api", async (req, res) => {
  const sql = "SELECT * FROM `mountain` WHERE location_sid=?"
  const [rows] = await db.query(sql, req.query.id)
  // console.log(rows)
  res.json({ rows })
})

router.get("/social/api", async (req, res) => {
  let sql =
    "SELECT * FROM `posts` JOIN `mountain` ON posts.mountain_sid = mountain.mountain_sid JOIN `location` ON mountain.location_sid = location.sid ORDER BY posts.post_sid DESC"

  if (req.query.fid) {
    sql =
      "SELECT * FROM `posts` JOIN `mountain` ON posts.mountain_sid = mountain.mountain_sid JOIN `location` ON mountain.location_sid = location.sid JOIN `follows` ON follows.member_sid = posts.member_sid WHERE follows.follow_sid =" +
      req.query.fid +
      " ORDER BY posts.post_sid DESC"
  }

  const [rows] = await db.query(sql)

  res.json(rows)
  // res.json(req.query.fid)
})

// router.use("/api", (req, res, next) => {
//   const auth = req.get("Authorization")

//   //console.log({auth}); // { auth: 'Bearer null' }

//   res.locals.loginUser = null
//   try {
//     if (auth && auth.indexOf("Bearer ") === 0) {
//       const token = auth.slice(7)
//       if (token && token.length) {
//         res.locals.loginUser = jwt.verify(token, "hiking1214")
//       }

//     }
//     next()
//   } catch (ex) {
//     res.json("invalid token")
//   }

// })

router.put("/post/api", [auth, upload.none()], async (req, res) => {
  let mid = 0

  console.log(req.body.context)

  const output = {
    success: false,
    code: 0,
    error: {},
    postData: req.body,
    //for debug
  }

  if (res.locals.loginUser) {
    mid = res.locals.loginUser.member_sid
  }
  const sql = "UPDATE `posts` SET `context` = ? WHERE post_sid = ?"
  const [result] = await db.query(sql, [req.body.context, req.body.post_sid])

  if (result.affectedRows) output.success = true
  res.json(output)
})

router.delete("/post/api", [auth, upload.none()], async (req, res) => {
  const output = {
    update: false,
    success: false,
    code: 0,
    error: {},
    //for debug
  }

  fs.unlink(__dirname + `/../public/uploads/${req.query.image_url}`, (err) => {
    console.log(err)
    // if (err) throw err; //handle your error the way you want to;
    //or else the file will be deleted
  })
  fs.unlink(
    __dirname + `/../public/uploads/thumb_${req.query.image_url}`,
    (err) => {
      // if (err) throw err; //handle your error the way you want to;
      //or else the file will be deleted
    }
  )

  const sql = "DELETE FROM `posts` WHERE post_sid = ?"

  const [result] = await db.query(sql, req.query.sid)

  if (result.affectedRows) output.update = true

  if (!output.update) return res.json(output)

  const sqlM =
    "UPDATE `members` SET `total_height` = `total_height` - ? WHERE `member_sid` = ?"

  const [resultM] = await db.query(sqlM, [
    req.query.height,
    res.locals.loginUser.member_sid,
  ])

  const sqlLike = "DELETE FROM `likes` WHERE post_sid = ?"

  const [resultLike] = await db.query(sqlLike, req.query.sid)

  const sqlReply = "DELETE FROM `replies` WHERE post_sid = ?"

  const [resultReply] = await db.query(sqlReply, req.query.sid)

  if (result.affectedRows && resultM.affectedRows) output.success = true
  res.json(output)
})

router.get("/api", auth, async (req, res) => {
  // console.log(mid);

  let mid = 0

  if (res.locals.loginUser) {
    mid = res.locals.loginUser.member_sid
    const sql = `SELECT * FROM members WHERE member_sid = ?`
    const [rows] = await db.query(sql, mid)
    res.json({ rows })
  }
})

router.put("/api/pass", [auth, upload.none()], async (req, res) => {
  // return res.json(res.locals.loginUser.member_sid)
  // 測試傳過來的body

  const output = {
    success: false,
    code: 0,
    error: "",
    postData: req.body,
    //for debug
  }

  if (!req.body.newPass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
    output.error = ": 密碼格式錯誤"
    return res.json(output)
  }

  // console.log(res.locals.loginUser.member_sid)

  const sqlVer = "SELECT `password` from members WHERE member_sid = ?"

  const passBcrypt = bcrypt.hashSync(req.body.newPass, 10)

  const [rows] = await db.query(sqlVer, [res.locals.loginUser.member_sid])

  if (rows[0] && bcrypt.compareSync(req.body.password, rows[0].password)) {
    const sql = "UPDATE `members` SET `password`=? WHERE `member_sid` =?"
    const [result] = await db.query(sql, [
      passBcrypt,
      res.locals.loginUser.member_sid,
    ])
    if (result.affectedRows) output.success = true
    // console.log(result);
    // console.log(result.affectedRows);
  }

  res.json(output)
})

router.put("/api", [auth, upload.single("avatar")], async (req, res) => {
  const output = {
    success: false,
    code: 0,
    error: "",
    postData: req.body,
    //for debug
  }

  if (!req.body.name || !req.body.nickname || !req.body.email) {
    output.error = ": 必填欄位不得空白"
    return res.json(output)
  }

  if (
    !req.body.email.match(
      /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
    )
  ) {
    output.error = ": 電子信箱格式錯誤"
    return res.json(output)
  }

  if (req.body.mobile && !req.body.mobile.match(/^09\d{2}-?\d{3}-?\d{3}$/)) {
    output.error = ": 手機號碼格式錯誤"
    return res.json(output)
  }

  if (req.body.birthday && isNaN(new Date(req.body.birthday))) {
    output.error = ": 生日格式錯誤"
    return res.json(output)
  }

  let mid = 0

  if (res.locals.loginUser) {
    mid = res.locals.loginUser.member_sid
  }

  const sqlCheckMail = "SELECT * FROM `members` WHERE `email` = ?"

  const [rowsCheckMail] = await db.query(
    sqlCheckMail,
    req.body.email.toLowerCase()
  )

  rowsCheckMail.map((v, i) => {
    if (v.member_sid !== mid) {
      output.error = ": 信箱已註冊"
    }
  })

  if (output.error === ": 信箱已註冊") {
    return res.json(output)
  }

  const sql =
    "UPDATE `members` SET `name`=?,`email`=?,`mobile`=?,`address`=?,`birthday`=?,`nickname`=?, `avatar`=?, `intro`=? WHERE `member_sid` =?"

  let avatarFilename = req.body.prevAvatar

  console.log("old avatar:" + avatarFilename)

  if (req.file) {
    avatarFilename = req.file.filename

    const path = "../public/uploads/" + avatarFilename

    // console.log(req.file.path)

    if (req.body.prevAvatar) {
      fs.unlink(
        __dirname + `/../public/uploads/${req.body.prevAvatar}`,
        (err) => {
          // if (err) throw err; //handle your error the way you want to;
          //or else the file will be deleted
        }
      )
      fs.unlink(
        __dirname + `/../public/uploads/avatar_${req.body.prevAvatar}`,
        (err) => {
          // if (err) throw err; //handle your error the way you want to;
          //or else the file will be deleted
        }
      )
    }
  }

  const [result] = await db.query(sql, [
    req.body.name,
    req.body.email.toLowerCase(),
    req.body.mobile,
    req.body.address,
    req.body.birthday === "" ? null : req.body.birthday,
    req.body.nickname,
    avatarFilename,
    req.body.intro,
    mid,
    // req.params.sid
  ])

  console.log(result)

  if (result.affectedRows) output.success = true

  if (!req.file) {
    return res.json(output)
  }

  await sharp(req.file.path)
    .resize({
      fit: sharp.fit.contain,
      width: 200,
    })
    .toFile(__dirname + "/../public/uploads/avatar_" + req.file.filename)

  return res.json(output)
})

module.exports = router
