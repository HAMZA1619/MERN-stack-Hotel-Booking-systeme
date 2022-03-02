const route = require("express").Router();

const { authController } = require("../controllers");

// API
route.post("/signin", authController.signin);
route.post("/signup", authController.signup);
route.post("/signout", authController.signout);

module.exports = route;
