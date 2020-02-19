const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log('req file ', file);
    cb(null, '../uploads'); // 파일이 저장되는 경로입니다.
  },
  filename(req, file, cb) {
    cb(null, `${moment().format('YYYYMMDDHHmmss')}_${file.originalname}`); // 저장되는 파일명
  },
});
module.exports = multer({ storage });
