const userRouter = require('./user-router')
const authRouter = require('./auth-router')
const hotelRouter = require('./hotel-router')
const roomRouter = require('./room-router')
const reserveRouter = require('./reserve-router')
module.exports = {
  hotelRouter,
  authRouter,
  userRouter,
  reserveRouter,
  roomRouter
}