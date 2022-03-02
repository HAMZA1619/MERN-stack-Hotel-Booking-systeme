const userController = require("./user-controller");
const authController = require("./auth-controller");
const hotelController = require("./hotel-controller");
const roomController = require("./room-controller");
const reserveController = require("./reserve-controller");

module.exports = {
  hotelController,
  authController,
  userController,
  reserveController,
  roomController,
};
