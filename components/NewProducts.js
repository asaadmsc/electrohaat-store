import ProductBox from "./ProductBox";

export default function NewProducts({ newProducts }) {
  return (
    <div className="center my-8">
      <h2 className="text-2xl font-semibold">New Arrivals</h2>
      <div className="product-grid mt-2">
        {newProducts.map((product, index) => (
          <ProductBox key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
