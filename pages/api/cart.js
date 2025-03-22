import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();

  // Use id to find product info and send it back
  const ids = req.body.ids;
  res.json(await Product.find({ _id: ids }));
}
