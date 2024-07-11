import React from "react";
import ProductsCards from "@/components/ProductsCards";
import Filters from "@/components/Filters";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/routes/products`,
  );
  return res.json();
}

const Smartphones = async () => {
  const products = await getProducts();

  return (
    <div className="flex min-h-[93vh]">
      <Filters />
      <ProductsCards products={products} />
    </div>
  );
};

export default Smartphones;
