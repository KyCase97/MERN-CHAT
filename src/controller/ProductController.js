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
  //Req Query
  const queryObj = { ...req.query };

  //fungsi untuk mengabaikan jika ada req page dan limit
  const excludeField = ["page", "limit"];
  excludeField.forEach((element) => delete queryObj[element]);
  let query = Product.find(queryObj);

  //Pagination
  const page = req.query.page * 1 || 1;
  const limitData = req.query.limit * 1 || 30;
  const skipData = (page - 1) * limitData;

  query = query.skip(skipData).limit(limitData);

  if (req.query.page) {
    const numProduct = await Product.countDocuments();
    if ((skipData) => numProduct) {
      res.status(404);
      throw new Error("These page doesnt exist");
    }
  }

  const data = await query;

  return res.status(200).json({
    message: "All Datas Products",
    data,
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

  if (!productDetail) {
    res.status(404);
    throw new Error("id Tidak ditemukan");
  }

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
  const paramsId = req.params.id;
  await Product.findByIdAndDelete(paramsId);
  res.status(200).json({
    message: "Product Behasil Didelete!",
  });
});

export const FileUpload = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400).json;
    throw new Error("Tidak ada file yang diinput");
  }

  const imageFileName = file.filename;
  const pathImageFile = `/uploads/${imageFileName}`;
  res.status(200).json({
    message: "Image Berhasil diuploads",
    image: pathImageFile,
  });
});
