import React from "react";
import Link from "next/link";

const ProductsCards = ({ products }) => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-6 rounded-tl-lg bg-[#080404] p-4 text-[#080404]">
      {products.map((product) => (
        <div className="flex h-72 w-64 flex-col items-center justify-center rounded-lg bg-white p-2 font-bold cursor-pointer transform transition duration-300 hover:scale-110">
          <Link key={product._id} href={`/product/${product._id}`}>
            <img
              className="h-4/5 object-contain"
              src={product.imagen[0]}
              alt="Test"
            />
            <div className="h-1/5 text-center">
              {product.fabricante == "Apple" ? <p>{product.modelo}</p> : <p>{product.fabricante} {product.modelo}</p>}
              <p>${product.precio} USD</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsCards;
