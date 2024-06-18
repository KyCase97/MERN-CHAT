// productController.js
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../model/productModel.js";
import mongoose from "mongoose";

export const CreateProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({
    message: "Berhasil Tambah Product",
    data: newProduct,
  });
});

export const AllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({
    message: "All Datas Products",
    Products: products,
  });
});

export const detailProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(paramsId)) {
    return res
      .status(404)
      .json({ message: "Id tidak valid / Gunakan Id yang Valid" });
  }
  const productDetail = await Product.findById(paramsId);

  return res.status(200).json({
    message: "Detail Product berhasil di tampilkan",
    detail: productDetail,
  });
});
export const updateProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(paramsId)) {
    return res
      .status(404)
      .json({ message: "Id tidak valid / Gunakan Id yang Valid" });
  }
  const updateProduct = await Product.findByIdAndUpdate(paramsId, req.body, {
    runValidators: false,
    new: true,
  });
  return res.status(201).json({
    message: "Update Produk Berhasil!",
    data: updateProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  res.send("Delete Product");
});

export const FileUpload = asyncHandler(async (req, res) => {
  res.send("File Upload");
});
