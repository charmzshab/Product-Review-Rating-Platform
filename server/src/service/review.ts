import { Review } from "../model/review";
import { updateProductRating } from "./product";

export const addProductReview = async (
  payload: {
    name: string;
    description: string;
    category: string;
    price: number;
  },
  productId: string
) => {
  try {
    // find if productId exists
    const product = Review.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    console.log(productId);
    const review = new Review({ ...payload, productId });
    let savedReview = review.save();
    let rating = await updateProductRating(productId);
    return { savedReview, rating };
  } catch (error) {
    console.log(error);
  }
};

export const getProductReviews = async (productId: string) => {
  return await Review.find({ productId }).populate("productId");
};

export const updateReview = async (
  reviewId: string,
  productId: string,
  updates: Partial<{ rating: number; comment: string }>
) => {
  const updatedReview = await Review.findByIdAndUpdate(reviewId, updates, {
    new: true,
  }).exec();
  let averageRating;
  if (updatedReview) {
    averageRating = await updateProductRating(productId);
  }
  return { review: updatedReview, averageRating };
};

export const deleteReview = async (reviewId: string, productId: string) => {
  const deletedReview = await Review.findByIdAndDelete(reviewId).exec();
  let averageRating;
  if (deletedReview) {
    averageRating = await updateProductRating(productId);
  }
  return { review: deletedReview, averageRating };
};
