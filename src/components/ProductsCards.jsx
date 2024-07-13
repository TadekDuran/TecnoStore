import React from "react";

const ProductsCards = ({products}) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 rounded-tl-lg bg-[#080404] p-4 text-[#080404]">
      {products.map((product) => (
        <div
          key={product._id}
          className="flex h-80 w-64 flex-col items-center justify-center rounded-lg bg-white p-2 font-bold"
        >
          <img
            className="h-4/5 object-contain"
            src="https://armoto.vtexassets.com/arquivos/ids/165375-800-auto?v=638412646944530000&width=800&height=auto&aspect=true"
            alt="Test"
          />
          <div className="h-1/5 text-center">
            <p>{product.modelo}</p>
            <p>${product.precio} USD</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsCards;
