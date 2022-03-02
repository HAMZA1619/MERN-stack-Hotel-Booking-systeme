const { reserveModel } = require("../models");

module.exports = {
  get,
  getAll,
  create,
  update,
  remove,
};

async function get(req, res) {
  try {
    const reserve = await reserveModel.findById(req.params.id);
    res.send(reserve);
  } catch (error) {
    res.send(error);
  }
}

async function getAll(_, res) {
  try {
    const reserve = await reserveModel.find();
    res.send(reserve);
  } catch (error) {
    res.send(error);
  }
}

async function create(req, res) {
  try {
    const reserve = await reserveModel.create(req.body);
    res.send(reserve);
  } catch (error) {
    res.send(error);
  }
}

async function update(req, res) {
  try {
    const reserve = await reserveModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(reserve);
  } catch (error) {
    res.send(error);
  }
}

async function remove(req, res) {
  try {
    await reserveModel.findByIdAndDelete(req.params.id);
    res.send("is deleted");
  } catch (error) {
    res.send(error);
  }
}
