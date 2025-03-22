import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    order_items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema); // If the model already exists, use it; otherwise, create a new model.
