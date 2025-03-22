import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useEffect, useState } from "react";

export default function ProductsPage({ products }) {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, products]);

  return (
    <>
      <Header />
      <div className="center">
        <div className="w-full flex justify-center">
          <input
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-3/5 px-5 py-2 mt-10 mb-8 border rounded-md box-border shadow-lg"
          />
        </div>
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <ProductBox key={index} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}

// Grab products from DB
export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
