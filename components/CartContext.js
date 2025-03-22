const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // If code runs on server, return null
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  // When page loads, go into local storage, get card data, change it to an object and set cart state
  useEffect(() => {
    if (localStorage && localStorage.getItem("cart")) {
      setCartProducts(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  // When cart state changes (adding product), update local storage data
  useEffect(() => {
    localStorage?.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId); // Find index of item in the previous array
      if (pos !== -1) return prev.filter((value, index) => index !== pos); // If found, return everything except that index
      return prev; // If not found, return previous array
    });
  }

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}
