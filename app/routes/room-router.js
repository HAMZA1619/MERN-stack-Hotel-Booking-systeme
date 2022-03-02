const route = require("express").Router();

const { roomController } = require("../controllers");
const { upload, allowed, authenticated } = require("../middlewares");

route.get("/disponible", roomController.disponible);
route.get("/", roomController.getAll);
route.get("/:id", roomController.get);
route.post("/", upload.array("image"), roomController.create);
route.patch("/:id", roomController.update);
route.delete("/:id", roomController.remove);

module.exports = route;
