import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  // Ensure ONLY post requests are handled
  if (req.method !== "POST") {
    res.json("Should be a POST request");
    return;
  }

  await mongooseConnect();
  const { name, email, city, postalCode, streetAddress, cartProducts } =
    req.body;
  const productIds = cartProducts; // Ids were joined into a string before submitting, change back into array of strings
  const uniqueIds = [...new Set(productIds)]; // Seperate unique ids into an array
  const productInfos = await Product.find({ _id: uniqueIds });

  let order_items = []; // Use this to store final checkout data
  for (const productId of uniqueIds) {
    const productInfo = productInfos.find(
      (product) => product._id.toString() === productId
    );
    const quantity = productIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      order_items.push({
        quantity,
        price_data: {
          currency: "BDT",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    order_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
  });

  res.json("Order confirmed");
}
