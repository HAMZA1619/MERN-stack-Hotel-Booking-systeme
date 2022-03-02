const route = require("express").Router();

const { hotelController } = require("../controllers");

const { upload, isAuth, is } = require("../middlewares");

route.get("/find", hotelController.findByNameAndType);
route.get("/annonce", hotelController.annonce);

route.get("/", hotelController.getAll);
route.get("/:id", hotelController.get);

route.post(
  "/",
  [isAuth, is("admin", "owner")],
  upload.array("image"),
  hotelController.create
);

route.patch("/:id", [isAuth, is("admin", "owner")], hotelController.update);

route.delete("/:id", [isAuth, is("admin", "owner")], hotelController.remove);

module.exports = route;
