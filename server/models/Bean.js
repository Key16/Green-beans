const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const { Schema } = mongoose;

const beanSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  beanAuthor: {
    type: String,
    // required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  donation: {
    type: Number,
    min: 0.01,
  },
  donaters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    // required: true,
  },
});

const Bean = mongoose.model("Bean", beanSchema);

module.exports = Bean;
