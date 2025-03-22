import mongoose, { model, models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    images: [String],
    selectedCategory: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    properties: { type: Object },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema); // If the model already exists, use it; otherwise, create a new model.
