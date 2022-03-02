const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config");

const { userModel } = require("../models");

module.exports = {
  signup,
  signin,
  signout,
};

function signup(req, res, next) {
  const user = new userModel({
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save((err, user) => {
    if (err) return next({ message: err });
    res.json({ message: "User was registered successfully!", data: user });
  });
}

async function signin(req, res, next) {
  userModel.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (err) return next({ message: err });

    if (!user) return next({ status: 404, message: "User Not found." });

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid)
      return next({
        status: 401,
        message: "Invalid Password!",
      });

    const accessToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      config.JWT_SECRET
    );

    res.cookie("access", accessToken, {
      secure: config.NODE_ENV == "development" ? false : true,
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).send({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  });
}

async function signout(req, res, next) {
  const reqToken = req.cookies?.refresh;

  if (!reqToken)
    return next({ status: 403, message: "Refresh Token is required!" });

  try {
    res.clearCookie("access");
    res.status(200).send();
  } catch (err) {
    return next({ message: err });
  }
}

// async function refreshToken(req, res, next) {
//   console.log(req.cookies)
//   const reqToken = req.cookies?.refresh

//   if (!reqToken)
//     return next({status: 403, message: "Refresh Token is required!" })

//   try {
//     reqToken = jwt.verify(reqToken, app.authConfig.SECRET)
//     const dbToken = await refreshTokenModel.findById(reqToken.id)

//     if (!dbToken)
//       return next({status: 403, message: "Refresh token is not in database!" })

//     if (!dbToken.isValid) {
//       refreshTokenModel.findByIdAndRemove(dbToken._id, { useFindAndModify: false }).exec()

//       return next({
//         status: 403,
//         message: "Refresh token was expired. Please make a new signin request",
//       })
//     }

//     const accessToken = jwt.sign(
//       { id: dbToken.user._id },
//       app.authConfig.SECRET, {
//         expiresIn: app.authConfig.ACCESS_TOKEN_EXPIRATION,
//       }
//     )
//     res.cookie('access', accessToken, {
//       maxAge: app.authConfig.ACCESS_TOKEN_EXPIRATION * 1000,
//       secure: app.appConfig.NODE_ENV == 'development' ? false : true,
//       httpOnly: true,
//       sameSite: 'lax'
//     })

//     res.status(200).send()
//   } catch (err) {
//     return next({ message: err })
//   }
// }
