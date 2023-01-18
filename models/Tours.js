const mongoose = require("mongoose");

// schema
const toursShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a packageName for this tours"],
      trim: true, // age ba picher space gula kete dey
      unique: [true, "Package name must be unique"],
      minLength: [3, "Package name must be at least 3 characters"],
      maxLength: [100, "Package name is to large"],
    },

    description: {
      type: String,
      required: [true, "Please provide a description for this tours"],
    },

    image: String,

    price: {
      type: Number,
      required: [true, "Please provide price for this tours"],
      min: [0, "Price can't be negative"],
    },

    visitor: {
      type: Number,
      required: true,
      min: [0, "Visitor can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Visitor must be an integer",
    },

    views: {
      type: Number,
      default: 0,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["book-now", "wish-list"],
        message: "Status value can't be {VALUE}, must be book-now/wish-list",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Model
const Tours = mongoose.model("Tours", toursShema);

module.exports = Tours;
