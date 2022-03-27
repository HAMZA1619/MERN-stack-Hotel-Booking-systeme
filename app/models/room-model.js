const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    number: {
      type: Number,
      required: [true, "the price field is required"],
      maxlength: [100, "number must be less than 100 charachter"],
    },
    type: {
      type: String,
      required: [true, "the type field is required"],
      enum: ["Single", "Double", "Triple", "Suite"],
      validate: {
        validator: (value) =>
          ["Single", "Double", "Triple", "Suite"].includes(value),
        message: "Invalid room type",
      },
    },
    price: {
      type: Number,
      required: [true, "the price field is required"],
      maxlength: [100, "price must be less than 100 charachter"],
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rooms", roomSchema);
