var { userModel } = require("../models");

module.exports = {
  create,
  remove,
  update,
  get,
  getAll,
};

async function create(req, res) {
  if (
    req.body &&
    Object.getPrototypeOf(req.body) &&
    Object.keys(req.body).length === 0
  )
    return res
      .status(422)
      .send({ message: "request body is malformed or empty" });

  const { password, confirmedPassword } = req.body;
  if (password != confirmedPassword)
    return res
      .status(422)
      .send({ message: "the password does not match the confirmed password" });

  const client = await userModel.create(req.body).catch((err) => {
    // return res.status(500).send({
    //   message:
    //     err.message ||
    //     "Some error occurred while creating a create operation",
    // })
    return console.log(err);
  });
  res.status(200).send(client);
}

async function getAll(req, res) {
  const clients = await userModel
    .find()
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error Occurred while retriving user information",
      });
    });
}

async function get(req, res) {
  const { id } = req.params;

  userModel
    .findById(id)
    .then((client) => {
      if (!client)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.json(client);
    })
    .catch((err) =>
      res.status(500).send({ message: "Erro retrieving user with id " + id })
    );
}

async function update(req, res) {
  if (
    req.body &&
    Object.getPrototypeOf(req.body) &&
    Object.keys(req.body).length === 0
  )
    return res
      .status(422)
      .send({ message: "request body is malformed or empty" });

  const { id } = req.params;

  userModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then((client) => {
      if (!client)
        return res
          .status(422)
          .send({ message: "Could not find client with id: " + id });
      res.send(client);
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Could not update client with this id: " + id })
    );
}

async function remove(req, res) {
  const { id } = req.params;

  userModel
    .findByIdAndDelete(id)
    .then((client) => {
      if (!client)
        return res
          .status(500)
          .send({ message: "Could not find client with id:" + id });

      res.status(200).send(client);
    })
    .catch((err) =>
      res.status(500).send({ message: "Could not delete client with id:" + id })
    );
}
