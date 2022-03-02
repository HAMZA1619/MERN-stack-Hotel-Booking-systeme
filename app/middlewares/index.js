const cookieParser = require("./cookie-parser");
const isAuth = require("./isAuth");
const is = require("./is");
const upload = require("./uploadPhotos");
module.exports = {
  is,
  isAuth,
  cookieParser,
  upload,
};
