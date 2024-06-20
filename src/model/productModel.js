import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nama product wajib Diisi"],
    unique: [true, "Nama Product Sudah digunakan silahkan buat yang lain!"],
  },
  price: {
    type: Number,
    required: [true, "Harga Product Harus diisi"],
  },
  description: {
    type: String,
    required: [true, "Deskripsi Wajib diisi"],
  },
  image: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    required: [true, "Category product wajib Diisi"],
    enum: ["Fashion", "Decoration", "Sport"],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
