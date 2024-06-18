import express from "express";
import {
  adminMiddleware,
  protectedMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  CreateProduct,
  deleteProduct,
  detailProduct,
  FileUpload,
  AllProduct,
  updateProduct,
} from "../controller/ProductController.js";
import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

//CRUD Product

//Create Data Product
//post /api/v1/product
//middleware owner
router.post("/", protectedMiddleware, adminMiddleware, CreateProduct);

//Read Data Product
//GET /api/v1/product
router.get("/", AllProduct);

//Detail Data Product
//GET /api/v1/product/:id
router.get("/:id", detailProduct);

//Detail Data Product
//PUT /api/v1/product/:id
//middleware owner
router.put("/:id", protectedMiddleware, adminMiddleware, updateProduct);

//DELETE Data Product
//DEL /api/v1/product/:id
//middleware owner
router.delete("/:id", protectedMiddleware, adminMiddleware, deleteProduct);

//FIle Upload Product
//POST /api/v1/product/file-upload
//middleware owner
router.post(
  "/file-upload",
  protectedMiddleware,
  adminMiddleware,
  upload.single("image"),
  FileUpload
);

export default router;
