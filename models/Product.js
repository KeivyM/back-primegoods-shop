import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  images: {
    type: Array,
    required: true,
  },

  category: {
    type: String,
    required: true,
    enum: ["tech", "home"], //agregar mas categorias
  },

  color: {
    type: String,
    required: false,
    default: null,
  },

  createdAt: {
    type: Number,
    default: new Date(),
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
