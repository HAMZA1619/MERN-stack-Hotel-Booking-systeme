const { hotelModel } = require("../models");

module.exports = {
  get,
  getAll,
  create,
  update,
  remove,
  annonce,
  findByNameAndType,
};

async function get(req, res) {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    res.send(hotel);
  } catch (error) {
    res.send(error);
  }
}

async function getAll(_, res) {
  try {
    const hotel = await hotelModel.find();
    res.send(hotel);
  } catch (error) {
    res.send(error);
  }
}

async function create(req, res) {
  try {
    (req.body.user = req.user.id),
      (req.body.image = req.files.map((file) => {
        return file.filename;
      }));
    const hotel = await hotelModel.create(req.body);
    res.send(hotel);
  } catch (error) {
    res.send(error);
  }
}

async function update(req, res) {
  try {
    const hotel = await hotelModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(hotel);
  } catch (error) {
    res.send(error);
  }
}

async function remove(req, res) {
  try {
    await hotelModel.findByIdAndDelete(req.params.id);
    res.send("is deleted");
  } catch (error) {
    res.send(error);
  }
}

async function annonce(req, res) {
  // console.log("hello");
  try {
    const hotel = await hotelModel.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "_id",
          foreignField: "hotel",
          as: "room",
          let: { roomId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$hotel", "$$roomId"] } } },
            {
              $lookup: {
                from: "reserves",
                localField: "_id",
                foreignField: "room",
                as: "reserve",
                let: { reserveId: "$_id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$room", "$$reserveId"] } } },
                ],
              },
            },
            {
              $match: {
                "reserve.room": {
                  $exists: false,
                },
              },
            },
          ],
        },
      },
      {
        $match: {
          "room.hotel": {
            $exists: true,
          },
        },
      },
    ]);
    // const hotel = await hotelModel.find().populate({path:"rooms",  match: { available: true}, select: 'type price '})
    res.send(hotel);
  } catch (error) {
    res.send(error);
  }
}
async function findByNameAndType(req, res) {
  try {
    const hotel = await hotelModel.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "_id",
          foreignField: "hotel",
          as: "room",
          pipeline: [
            { $match: { $expr: { $eq: ["$type", req.body.type] } } },
            // { $project: { _id: 0 } },
          ],
        },
      },
      { $project: { _id: 0 } },
      {
        $match: {
          name: req.body.name,
          "room.type": { $exists: true },
        },
      },
    ]);
    // const hotel = await hotelModel.find({$text: { $search : req.body.name}}).populate({path:"rooms",  match: { type: req.body.type}})
    res.send(hotel);
  } catch (error) {
    res.send(error);
  }
}
