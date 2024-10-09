const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  edition: {
    type: Number,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  hasEbook: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
