import { Product } from "../model/product";
import { Review } from "../model/review";
import { calculateAverageRating } from "../utils/ratings";

export const getProducts = async () => {
  return await Product.find();
};

export const addProduct = async (payload: {
  name: string;
  description: string;
  category: string;
  price: number;
}) => {
  const product = new Product(payload);
  return await product.save();
};

export const updateProductRating = async (productId: string) => {
  const reviews = await Review.find({ productId });
  const averageRating = calculateAverageRating(reviews);
  await Product.findByIdAndUpdate(
    productId,
    { averageRating },
    { new: true }
  ).exec();

  return averageRating;
};

export const searchProducts = async (query: string) => {
  if (!query) {
    return await Product.find().exec();
  }
  return await Product.find({
    $or: [{ name: { $regex: query, $options: "i" } }],
  }).exec();
};
