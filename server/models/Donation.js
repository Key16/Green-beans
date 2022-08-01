const mongoose = require("mongoose");

const { Schema } = mongoose;

const donationSchema = new Schema({
  donatedAmount: {
    type: Number,
    required: true,
  },
  donaterName: {
    type: String,
    required: true,
  },
  donaterId: {
    type: String,
    required: true,
  },
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
