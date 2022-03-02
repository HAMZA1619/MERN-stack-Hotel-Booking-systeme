const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "the name field is required"],
      minlength: [3, "name must be greater than 3 charachter"],
      maxlength: [24, "name must be less than 24 charachter"],
    },
    city: {
      type: String,
      required: [true, "the city field is required"],
      minlength: [3, "city must be greater than 3 charachter"],
      maxlength: [24, "city must be less than 24 charachter"],
    },
    adresse: {
      type: String,
      required: [true, "the address field is required"],
      maxlength: [100, "address must be less than 100 charachter"],
    },
    // phone: {
    //   type: String,
    //   required: [true, "the phone field is required"],
    //   minlength: [8, "phone must be greater than 8charachter"],
    //   maxlength: [24, "phone must be less than 24 charachter"],
    // },
    // stars: {
    //   type: Number,
    //   required: [true, "the stars field is required"],
    //   maxlength: [100, "stars must be less than 100 charachter"],
    // },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

// hotelSchema.virtual('rooms', {
//   ref: 'rooms',
//   localField: '_id',
//   foreignField: 'hotel',
// });

// hotelSchema.set('toObject', { virtuals: true });
// hotelSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("hotels", hotelSchema);
