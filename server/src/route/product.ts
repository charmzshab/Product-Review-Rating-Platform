import express from "express";
import { createProduct, getAllProducts, search } from "../controller/product";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/search", search);

export default router;
