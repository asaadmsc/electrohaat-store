import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Header() {
  const { cartProducts } = useContext(CartContext);

  return (
    <header className="bg-primary">
      <div className="center">
        <div className="py-5 flex justify-between">
          <Link href={"/"} className="text-white text-xl font-bold">
            ElectroHaat
          </Link>
          <nav className="flex gap-4 text-primary">
            <Link href={"/"} className="nav-link">
              Home
            </Link>
            <Link href={"/products"} className="nav-link">
              Products
            </Link>
            <Link href={"/categories"} className="nav-link">
              Categories
            </Link>
            <Link href={"/aboutus"} className="nav-link">
              About Us
            </Link>
            <Link href={"/cart"} className="nav-link">
              Cart ({cartProducts.length})
            </Link>
            <Link href={"/searchproducts"} className="nav-link ml-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
