import { useState } from "react";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <div className="h-[311px] w-full flex items-center justify-center">
        <img
          src={activeImage}
          alt="Product image"
          className="max-w-full max-h-full shadow-md"
        />
      </div>
      <div className="mt-3 flex gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setActiveImage(image)}
            className={`w-20 h-20 p-1 flex items-center justify-center border rounded-md cursor-pointer ${
              image === activeImage
                ? "border-[#5341f8]"
                : "border-gray-300 opacity-50"
            }`}
          >
            <img
              src={image}
              alt="product image"
              className="max-w-full max-h-full"
            />
          </div>
        ))}
      </div>
    </>
  );
}
