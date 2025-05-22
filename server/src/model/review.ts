import { model, Schema } from "mongoose";
export type IReview = {
  productId: Schema.Types.ObjectId;
  author: string;
  rating: number;
  comment: string;
  date: Date;
};

const reviewSchema: Schema = new Schema<IReview>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const Review = model<IReview>("Review", reviewSchema);
