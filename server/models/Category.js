const mongoose = require("mongoose");

const { Schema } = mongoose;

//the schema was created but not used in front end at the moment
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
