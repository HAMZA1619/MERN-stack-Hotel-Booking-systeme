const express = require("express");
const { cookieParser } = require("./app/middlewares");

const {
  reserveRouter,
  userRouter,
  hotelRouter,
  roomRouter,
  authRouter,
} = require("./app/routes");

const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// mongodb connection
require("./app/database")();

app.use(express.json());

app.use(cookieParser);

// routers
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/reserves", reserveRouter);

app.listen(4000, () =>
  console.log("Server is running on http://localhost:4000")
);
