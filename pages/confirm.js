import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

export default function ConfirmPage() {
  return (
    <>
      <Header />
      <div className="center">
        <h2 className="mt-10 text-lg">Your order has been confirmed.</h2>
        <h2 className="text-lg mb-3">Please wait to receive products.</h2>
        <Link
          href={"/products"}
          className="btn-primary px-3 py-2 rounded-md text-lg shadow-lg"
        >
          Check out more items
        </Link>
      </div>
    </>
  );
}
