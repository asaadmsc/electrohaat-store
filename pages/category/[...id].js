import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";

export default function CategoryPage({ category, allProducts }) {
  return (
    <>
      <Header />
      <div className="center mt-12">
        <div className="mb-3 flex justify-between gap-6">
          <h2 className="text-2xl font-medium text-gray-700 underline">
            {category.name}
          </h2>
          <Link
            href={"/categories/"}
            className="flex gap-1 items-center hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="-0.75 -0.75 16 16"
              stroke="#000000"
              aria-hidden="true"
              id="Arrow-Left--Streamline-Heroicons-Outline"
              height={16}
              width={16}
            >
              <desc>
                {"Arrow Left Streamline Icon: https://streamlinehq.com"}
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.34375 11.78125 1.8125 7.25m0 0 4.53125 -4.53125M1.8125 7.25h10.875"
                strokeWidth={1.5}
              />
            </svg>
            <p>Go back</p>
          </Link>
        </div>
        <div className="product-grid">
          {allProducts.map((product, index) => {
            if (product.selectedCategory === category._id) {
              return <ProductBox key={index} {...product} />;
            }
          })}
        </div>
      </div>
    </>
  );
}

// Grab products from DB
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query; // Take id from url
  const category = await Category.findById(id);
  const allProducts = await Product.find();

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}
