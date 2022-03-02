const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/public/images/");
  },
  filename: function (req, file, cb) {
    const extention = file.originalname.split(".");
    cb(
      null,
      new Date().getTime() +
        "" +
        Math.floor(Math.random() * 100) +
        "." +
        extention[1]
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
