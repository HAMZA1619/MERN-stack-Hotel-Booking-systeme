const mongoose = require("mongoose");

const reserveSchema = mongoose.Schema(
  {
    payment: {
      type: String,
      required: [true, "the payment field is required"],
      enum: ["Cash", "Checks", "Credit cards"],
      validate: {
        validator: (value) =>
          ["Cash", "Checks", "Credit cards"].includes(value),
        message: "Invalid payment type",
      },
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    date_from: Number,
    date_to: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("reserves", reserveSchema);
