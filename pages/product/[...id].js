import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <Header />
      <div className="center mt-16">
        <div className="grid gap-10 grid-cols-[0.9fr_1.1fr]">
          <div className="bg-white rounded-lg p-7">
            <ProductImages images={product.images} />
          </div>
          <div className="h-[311px] flex flex-col justify-between">
            <div>
              <h1 className="mt-10 text-2xl font-semibold">{product.title}</h1>
              <p className="mt-6 mb-4 font-medium">{product.description}</p>
            </div>
            <div className="flex items-center gap-10">
              <p className="text-xl font-medium">{product.price} BDT</p>
              <button
                onClick={() => addProduct(product._id)}
                className="btn btn-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Grab products from DB
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query; // Take id from url
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
