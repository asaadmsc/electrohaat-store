import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts, setCartProducts, addProduct, removeProduct } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts }) // Send ids to backend
        .then((res) => setProducts(res.data)); // Use response to setProducts state
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function addOne(id) {
    addProduct(id);
  }

  function minusOne(id) {
    removeProduct(id);
  }

  let total = 0;
  // Go through all ids in cartProducts, match them with products object and get the prices
  for (const productId of cartProducts) {
    const price =
      products.find((product) => product._id === productId)?.price || 0;
    total += price;
  }

  async function confirmOrder(e) {
    e.preventDefault(); // prevent refresh after submit
    await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      cartProducts,
    });

    // Reset everything and go to confirm page
    setName("");
    setEmail("");
    setCity("");
    setPostalCode("");
    setStreetAddress("");
    setCartProducts([]);
    router.push("/confirm");
  }

  return (
    <>
      <Header />
      <div className=" center mt-16 grid grid-cols-[1.3fr_0.7fr] gap-10">
        <div className="p-7 bg-white rounded-xl">
          <h2 className="mb-3 text-2xl font-medium">Cart</h2>
          {products?.length > 0 ? (
            <table className="w-full text-left">
              <thead className="uppercase text-primary text-xs font-bold">
                <tr>
                  <th>Product</th>
                  <th className="pl-5">Quantity</th>
                  <th className="text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-4">
                      <div className="w-24 h-24 p-2 flex items-center justify-center rounded-md shadow-md">
                        <img
                          src={product.images?.[0]}
                          alt="product img"
                          className="max-w-20 max-h-20"
                        />
                      </div>
                      {product.title}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => minusOne(product._id)}
                        className="mx-2 px-3 py-1 bg-gray-200 rounded-sm"
                      >
                        -
                      </button>
                      {cartProducts.filter((id) => id === product._id).length}
                      <button
                        type="button"
                        onClick={() => addOne(product._id)}
                        className="mx-2 px-3 py-1 bg-gray-200 rounded-sm"
                      >
                        +
                      </button>
                    </td>
                    <td className="text-right">
                      {cartProducts.filter((id) => id === product._id).length *
                        product.price}{" "}
                      BDT
                    </td>
                  </tr>
                ))}
                <tr className="h-16 border-t">
                  <td className="text-xl font-medium">Products</td>
                  <td></td>
                  <td className="text-right text-xl">{total} BDT</td>
                </tr>
                <tr className="h-16 border-t">
                  <td className="text-xl font-medium">Shipping</td>
                  <td></td>
                  <td className="text-right text-xl">150 BDT</td>
                </tr>
                <tr className="h-16 border-t">
                  <td className="text-xl font-semibold">Total</td>
                  <td></td>
                  <td className="text-right text-xl font-semibold">
                    {total + 150} BDT
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <h2>Your cart is empty</h2>
          )}
        </div>
        {products?.length > 0 && (
          <div className="p-7 bg-white rounded-xl">
            <h2 className="mb-3 text-xl font-medium">Order Information</h2>
            <form onSubmit={confirmOrder}>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
                className="w-full p-1 mb-1 border rounded-md box-border"
              />
              <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className="w-full p-1 mb-1 border rounded-md box-border"
              />
              <div className="flex gap-1">
                <input
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="City"
                  className="w-full p-1 mb-1 border rounded-md box-border"
                />
                <input
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  type="text"
                  placeholder="Postal Code"
                  className="w-full p-1 mb-1 border rounded-md box-border"
                />
              </div>
              <input
                name="streetAddress"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                type="text"
                placeholder="Street Address"
                className="w-full p-1 mb-1 border rounded-md box-border"
              />
              <button type="submit" className="btn btn-primary w-full mt-2">
                Confirm order
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
