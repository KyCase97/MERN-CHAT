import asyncHandler from "../middlewares/asyncHandler.js";

export const CreateProduct = asyncHandler(async (req, res) => {
  res.send("Create Product");
});

export const AllProduct = asyncHandler(async (req, res) => {
  res.send("All Product");
});

export const detailProduct = asyncHandler(async (req, res) => {
  res.send("Detail Product");
});

export const updateProduct = asyncHandler(async (req, res) => {
  res.send("Update Product");
});

export const deleteProduct = asyncHandler(async (req, res) => {
  res.send("Delete Product");
});

export const FileUpload = asyncHandler(async (req, res) => {
  res.send("File Upload");
});
