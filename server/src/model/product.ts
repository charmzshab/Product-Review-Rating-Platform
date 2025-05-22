import mongoose, { Schema } from "mongoose";

type IProduct = {
  name: string; 
    description: string;
    category: string;
    price: number
    dateAdded: Date;
    averageRating: number;
    reviews: mongoose.Schema.Types.ObjectId[];
}

const productSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

export const Product = mongoose.model<IProduct>("Product", productSchema);