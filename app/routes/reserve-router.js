const route = require("express").Router();

const { reserveController } = require("../controllers");
const { isAuth, is } = require("../middlewares");

route.get("/", reserveController.getAll);
route.get("/:id", reserveController.get);
route.post("/",  isAuth, reserveController.create);
route.patch("/:id", reserveController.update);
route.delete("/:id", reserveController.remove);

module.exports = route;
