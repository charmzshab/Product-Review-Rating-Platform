import express from "express";
import {
  addReview,
  deleteProductReview,
  getReviews,
  updateProductReview,
} from "../controller/review";

const router = express.Router();

router.post("/:productId/reviews", addReview);
router.get("/:productId/reviews", getReviews);
router.delete("/:productId/reviews/:reviewId", deleteProductReview);
router.put("/:productId/reviews/:reviewId", updateProductReview);

export default router;
