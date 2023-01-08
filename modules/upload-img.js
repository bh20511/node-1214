const multer = require('multer');
const {v4:uuidv4} = require('uuid');

//副檔名
const extMap = {
    'image/jpeg':'.jpg',
    'image/png':'.png',
    'image/gif':'.gif'
}

//看上傳的檔案是不是要的
const fileFilter = (req, file, callback)=>{
    // !!轉為布林值 true是要的檔案 false是不要的
    callback(null, !!extMap[file.mimetype])
}

const storage = multer.diskStorage({
    //決定路徑
    destination:(req, file, cb)=>{
        cb(null, __dirname + '/../public/uploads')
    },
    //決定檔名
    filename:(req, file, cb)=>{
        //亂數+副檔名 = 新的檔案名稱
        cb(null, uuidv4() + extMap[file.mimetype])
    }
})
//匯出
module.exports = multer({storage, fileFilter});