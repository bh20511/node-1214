//環境變數
require("dotenv").config();
//node.js微框架
const express = require("express");
//express的server
const app = express();

//讀寫檔案
const fs = require("fs").promises;
//類似fetch
const axios = require("axios");
//時間格式
const moment = require("moment-timezone");
//資料庫
const db = require(__dirname + "/modules/db_connect2.js");
const session = require("express-session");
const MysqlStore = require("express-mysql-session")(session);
const sessionStore = new MysqlStore({}, db);
const cors = require("cors");
const myParser = require("body-parser");

//line測試
const line = require("@line/bot-sdk");

//top-Level middleware
//跨網域 白名單
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // console.log({origin});
    callback(null, true);
  },
};
app.use(cors(corsOptions));

//測試socket.io
const server = require("http")
  .Server(app)
  .listen(3001, () => {
    console.log("open server!");
  });
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket連線到了");

  socket.on("Message", (message) => {
    console.log(message);

    socket.emit("Message", message);
  });
});

//這邊是處理 一開始的callback line--bot測試
const config = {
  channelAccessToken: process.env.channelAccessToken,
  channelSecret: process.env.channelSecret,
};
const client = new line.Client(config);

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

async function handleEvent(event) {
  if (event.message.text === "1") {
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "是1",
    });
  }
  if (event.message.text === "大安店") {
    return client.replyMessage(event.replyToken, {
      type: "location",
      title: "大安店地址",
      address: "大安區資展路305號",
      latitude: 25.03411859476791,
      longitude: 121.5434656486318,
    });
  }
  if (event.message.text === "八德店") {
    return client.replyMessage(event.replyToken, {
      type: "location",
      title: "八德店地址",
      address: "桃園市八德區女帝路",
      latitude: 24.962244,
      longitude: 121.29867,
    });
  }

 
  if (event.message.text === "測試1") {
    return client.replyMessage(event.replyToken, [
      {
        type: "sticker",
        packageId: "1",
        stickerId: "1",
      },
      {
        type: "image",
        originalContentUrl:
          "https://developers.line.biz/media/messaging-api/messages/image-full-04fbba55.png",
        previewImageUrl:
          "https://developers.line.biz/media/messaging-api/messages/image-167efb33.png",
      },
      {
        type: "video",
        originalContentUrl:
          "https://www.sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4",
        previewImageUrl:
          "https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg",
      },
      {
        type: "audio",
        originalContentUrl:
          "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
        duration: "27000",
      },
      {
        type: "location",
        title: "my location",
        address: "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
        latitude: 35.65910807942215,
        longitude: 139.70372892916203,
      },
    ]);
  }
 
  if (event.message.text === "店點介紹") {
    return client.replyMessage(event.replyToken, [
      {
        type: "template",
        altText: "this is a carousel template",
        template: {
          type: "carousel",
          columns: [
            {
              thumbnailImageUrl:
                process.env.ngrok + "/%E5%A4%A7%E5%AE%89%E5%BA%97.jpeg",
              imageBackgroundColor: "#FFFFFF",
              title: "大安店",
              text: "大安捷運站附近",
              defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "http://localhost:3000/store",
              },
              actions: [{ label: "店點地址", type: "message", text: "大安店" }],
            },
            {
              thumbnailImageUrl:
                process.env.ngrok + "/%E5%85%AB%E5%BE%B7%E5%BA%97.jpeg",
              imageBackgroundColor: "#000000",
              title: "八德店",
              text: "八德女帝家附近",
              defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "http://localhost:3000/store",
              },
              actions: [{ label: "店點地址", type: "message", text: "八德店" }],
            },
            {
              thumbnailImageUrl:
                process.env.ngrok + "/%E8%87%BA%E4%B8%AD%E5%BA%97.jpeg",
              imageBackgroundColor: "#000000",
              title: "臺中店",
              text: "臺中火車站旁",
              defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "http://localhost:3000/store",
              },
              actions: [{ label: "店點地址", type: "message", text: "臺中店" }],
            },
            {
              thumbnailImageUrl:
                process.env.ngrok + "/%E9%AB%98%E9%9B%84%E5%BA%97.jpeg",
              imageBackgroundColor: "#000000",
              title: "高雄店",
              text: "近高雄85大夏",
              defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "http://localhost:3000/store",
              },
              actions: [{ label: "店點地址", type: "message", text: "高雄店" }],
            },
            {
              thumbnailImageUrl:
                process.env.ngrok + "/%E8%8A%B1%E8%93%AE%E5%BA%97.jpeg",
              imageBackgroundColor: "#000000",
              title: "花蓮店",
              text: "花蓮東華大學旁邊",
              defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "http://localhost:3000/store",
              },
              actions: [{ label: "店點地址", type: "message", text: "花蓮店" }],
            },
          ],
          imageAspectRatio: "rectangle",
          imageSize: "cover",
        },
      },
    ]);
  }
  if (event.message.text === "導遊介紹" || event.message.text === "組員介紹") {
    return client.replyMessage(event.replyToken, [
      {
        type: "template",
        altText: "this is a carousel template",
        template: {
          type: "carousel",
          columns: [
            {
              thumbnailImageUrl: process.env.ngrok + "/A.jpg",
              imageBackgroundColor: "#FFFFFF",
              title: "大奶維維導遊",
              text: "微糖少冰",
              defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "http://localhost:3000/store",
              },
              actions: [

                {
                  label: "鎧維",
                  type: "message",
                  text: "本組努力又積極的領導者",
                },
              ],
            },
            {
              thumbnailImageUrl: process.env.ngrok + "/B.jpg",
              imageBackgroundColor: "#000000",
              title: "恩7導遊",
              text: "體重變仙女中",
              defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "http://localhost:3000/store",
              },
              actions: [
                {
                  label: "恩齊",
                  type: "message",
                  text: "人生慢慢起飛的好女孩",
                },
              ],
            },
            {
              thumbnailImageUrl: process.env.ngrok + "/F.jpg",
              imageBackgroundColor: "#000000",
              title: "趴趴導遊",
              text: "本組智商代表",
              defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "http://localhost:3000/store",
              },
              actions: [
                { label: "潛之", type: "message", text: "本組智商擔當" },
              ],
            },
            {
              thumbnailImageUrl: process.env.ngrok + "/D.jpg",
              imageBackgroundColor: "#000000",
              title: "程式瘋狗導遊",
              text: "半夜都在打code",
              defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "http://localhost:3000/store",
              },
              actions: [
                {
                  label: "錒鑐",
                  type: "message",
                  text: "認真投入code的辣個男人",
                },
              ],
            },
            {
              thumbnailImageUrl: process.env.ngrok + "/E.jpg",
              imageBackgroundColor: "#000000",
              title: "ZX導遊",
              text: "還在皮",
              defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "http://localhost:3000/store",
              },
              actions: [
                {
                  label: "力誠",
                  type: "message",
                  text: "皮卻對code有熱忱的boy",
                },
              ],
            },
            {
              thumbnailImageUrl: process.env.ngrok + "/C.jpg",
              imageBackgroundColor: "#000000",
              title: "女帝導遊",
              text: "不服來戰",
              defaultAction: {
                type: "uri",
                label: "View detail",
                uri: "https://www.cakeresume.com/bh20511",
              },
              actions: [
                { label: "柏宏", type: "message", text: "只有顏值的花瓶" },
              ],
            },
          ],
          imageAspectRatio: "rectangle",
          imageSize: "cover",
        },
      },
    ]);
  }
}

//top-Level middleware
//解析urlencoded,json放到req.body裡
app.use(myParser.json({ limit: "50mb" }));
app.use(myParser.urlencoded({ limit: "50mb", extended: true }));
//上傳圖片
const upload = require(__dirname + "/modules/upload-img");
//根目錄
app.get("/", (req, res) => {
  res.send("歡迎來到express");
});

app.use("/member", require(__dirname + "/routes/member"));
app.use("/product", require(__dirname + "/routes/product"));
app.use("/camp", require(__dirname + "/routes/camp"));
app.use("/rental", require(__dirname + "/routes/rental"));
app.use("/room", require(__dirname + "/routes/room"));
app.use("/order", require(__dirname + "/routes/order"));

//設定靜態資料夾
app.use(express.static("public"));
//設定找不到頁面時顯示的畫面
app.use((req, res) => {
  res.status(404).send("<h1>404-找不到你要的網頁</h1>");
});

