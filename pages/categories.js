import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";

export default function CategoriesPage({ categories, allProducts }) {
  return (
    <>
      <Header />
      <div className="center pt-4">
        {categories.map((category, index) => {
          const limitedProducts = [];
          allProducts.map((product) => {
            if (product.selectedCategory === category._id)
              limitedProducts.push(product);
          });
          return (
            <div key={index} className="my-10 pb-10 border-b border-gray-400">
              <div className="mb-3 flex justify-between gap-6">
                <h2 className="text-2xl font-medium text-gray-700 underline">
                  {category.name}
                </h2>
                <Link
                  href={"/category/" + category._id}
                  className="flex gap-1 items-center hover:underline"
                >
                  <p>Show more</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="-0.75 -0.75 16 16"
                    stroke="#000000"
                    aria-hidden="true"
                    id="Arrow-Right--Streamline-Heroicons-Outline"
                    height={16}
                    width={16}
                  >
                    <desc>
                      {"Arrow Right Streamline Icon: https://streamlinehq.com"}
                    </desc>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.15625 2.71875 12.6875 7.25m0 0 -4.53125 4.53125M12.6875 7.25H1.8125"
                      strokeWidth={1.5}
                    />
                  </svg>
                </Link>
              </div>
              <div className="product-grid">
                {limitedProducts.slice(-4).map((product, index) => {
                  if (product.selectedCategory === category._id) {
                    return <ProductBox key={index} {...product} />;
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const categories = await Category.find();
  const allProducts = await Product.find();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    },
  };
}
