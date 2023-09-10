const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  madeIn: {
    type: String,
  },
  price: {
    type: Number,
  },

  expireAt: {
    type: Date,
  },

  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
  {
  timestamps: true,
}
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
