import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { useEffect, useState } from "react";

export default function ProductsPage({ products, categories }) {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    if (sort == "newest") {
      setSortedProducts([...products]);
    } else if (sort == "highLow") {
      setSortedProducts([...products].sort((a, b) => b.price - a.price));
    } else if (sort == "lowHigh") {
      setSortedProducts([...products].sort((a, b) => a.price - b.price));
    }
  }, [sort, products]);

  return (
    <>
      <Header />
      <div className="h-screen grid grid-cols-[0.3fr_1.7fr]">
        <div className="bg-primary px-5 py-16 text-white">
          <h1 className="mb-3 font-semibold">Filter by Category</h1>
          <p
            onClick={() => setCategory("")}
            className="hover:underline cursor-pointer"
          >
            All Products
          </p>
          <ul>
            {categories &&
              categories.map((cat, index) => (
                <li
                  key={index}
                  onClick={() => setCategory(cat._id)}
                  className={`my-2 hover:underline cursor-pointer ${
                    cat._id === category && "font-bold text-[#5341f8]"
                  }`}
                >
                  {cat.name}
                </li>
              ))}
          </ul>
          <h1 className="mt-10 mb-3 font-semibold">Sort By</h1>
          <ul>
            <li
              onClick={() => setSort("highLow")}
              className={`my-2 hover:underline cursor-pointer ${
                sort == "highLow" && "font-bold text-[#5341f8]"
              }`}
            >
              Price: High-Low
            </li>
            <li
              onClick={() => setSort("lowHigh")}
              className={`my-2 hover:underline cursor-pointer ${
                sort == "lowHigh" && "font-bold text-[#5341f8]"
              }`}
            >
              Price: Low-High
            </li>
            <li
              onClick={() => setSort("newest")}
              className="my-2 hover:underline cursor-pointer"
            >
              None
            </li>
          </ul>
        </div>
        <div className="max-w-4xl ml-16 px-20">
          <h1 className="mt-8 mb-3 text-2xl font-semibold">Products</h1>
          <div className="product-grid">
            {sortedProducts.map((product, index) => {
              if (product.selectedCategory == category || category == "") {
                return <ProductBox key={index} {...product} />;
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// Grab products from DB
export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const categories = await Category.find();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
