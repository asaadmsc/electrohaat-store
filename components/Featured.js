import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <div className="py-8 bg-primary text-white">
      <div className="center featured flex items-center">
        <div>
          <h1 className="text-5xl">{product.title}</h1>
          <p className="text-primary my-4">{product.description}</p>
          <div className="flex gap-3">
            <Link href={"/product/" + product._id} className="btn btn-trans">
              Read more
            </Link>
            <button onClick={addFeaturedToCart} className="btn btn-primary">
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
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/dgitxuwpx/image/upload/e_background_removal/e_dropshadow:azimuth_220;elevation_60;spread_20/c_crop,ar_1:1,f_png/v1739955505/jdevb4on4jgzx6pdfxgp.jpg"
            alt="Featured pic"
          />
        </div>
      </div>
    </div>
  );
}
