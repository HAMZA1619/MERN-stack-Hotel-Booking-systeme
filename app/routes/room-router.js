const route = require("express").Router();

const { roomController } = require("../controllers");
const { upload, isAuth, is } = require("../middlewares");

route.get("/disponible", roomController.disponible);
route.get("/", roomController.getAll);
route.get("/:id", roomController.get);
route.post(
  "/",
  upload.array("image"),
  [isAuth, is("admin", "owner")],
  roomController.create
);
route.patch("/:id", [isAuth, is("admin", "owner")], roomController.update);
route.delete("/:id", [isAuth, is("admin", "owner")], roomController.remove);

module.exports = route;
