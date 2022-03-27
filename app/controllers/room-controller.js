const { roomModel } = require("../models");

module.exports = {
  get,
  getAll,
  create,
  update,
  remove,
  disponible,
};

async function get(req, res) {
  try {
    const room = await roomModel.findById(req.params.id);
    res.send(room);
  } catch (error) {
    res.send(error);
  }
}

async function getAll(_, res) {
  try {
    const room = await roomModel.find().populate({path:"hotel" , select: 'name'});
    res.send(room);
  } catch (error) {
    res.send(error);
  }
}

async function create(req, res) {
  try {
    req.body.user = req.user.id;
    req.body.image = req.files.map((file) => {
      return file.filename;
    });
    const room = await roomModel.create(req.body);
    res.status(200).send(room);
  } catch (error) {
    console.log(error.message)
    res.send(error);
  }
}

async function update(req, res) {
  try {
    const room = await roomModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(room);
  } catch (error) {
    res.send(error);
  }
}

async function remove(req, res) {
  try {
    await roomModel.findByIdAndDelete(req.params.id);
    res.send("is deleted");
  } catch (error) {
    res.send(error);
  }
}

async function disponible(req, res) {
  try {
    const room = await roomModel.aggregate([
      {
        $lookup: {
          from: "reserves",
          localField: "_id",
          foreignField: "room",
          as: "reserve",
        },
      },
      {
        $match: {
          $or: [
            {
              "reserve.date_from": {
                $gt: req.body.date_from,
                $gt: req.body.date_to,
              },
            },
            {
              "reserve.date_to": { $lt: req.body.date_from },
            },
            {
              "reserve.room": {
                $exists: false,
              },
            },
          ],
        },
      },
    ]);
    res.send(room);
  } catch (error) {
    res.send(error);
  }
}
