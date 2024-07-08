import React, { Suspense } from "react";

async function getData(category) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/routes/products`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const ProductsCards = async ({ category }) => {
  const data = await getData();
  console.log(data);
  return (
    <div className="flex flex-wrap justify-center gap-3 p-4">
      {data.map((product) => (
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
