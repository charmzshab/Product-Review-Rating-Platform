import { Request, Response } from "express";
import {
  addProductReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "../service/review";

export const addReview = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const review = await addProductReview(req.body, productId);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const reviews = await getProductReviews(productId);
  res.status(200).json(reviews);
};

export const deleteProductReview = async (req: Request, res: Response) => {
  try {
    const { reviewId, productId } = req.params;
    const response = await deleteReview(reviewId, productId);
    res.status(200).json({ message: "deleted", response });
  } catch (e: any) {
    res.status(500).json({ message: "Error getting product reviews: ", e });
  }
};

export const updateProductReview = async (req: Request, res: Response) => {
  try {
    const { productId, reviewId } = req.params;
    console.log(productId, reviewId);
    const response = await updateReview(reviewId, productId, req.body);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error updating product review: ", error });
  }
};
