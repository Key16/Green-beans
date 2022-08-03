const mongoose = require("mongoose");

const { Schema } = mongoose;

//donation schema not used at the moment but is set up to allowed donations from stripe in future dev
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
