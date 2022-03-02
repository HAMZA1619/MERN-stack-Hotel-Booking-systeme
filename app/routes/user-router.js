const route = require("express").Router();

const { userController } = require("../controllers");

// API
// route.post('/', userController.create)
route.get("/", userController.getAll);
route.get("/:id", userController.get);
route.patch("/:id", userController.update);
route.delete("/:id", userController.remove);

module.exports = route;
