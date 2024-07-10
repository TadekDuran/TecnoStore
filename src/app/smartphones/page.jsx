import React from "react";
import ProductsCards from "@/components/ProductsCards";
import Filters from "@/components/Filters";

const Smartphones = () => {
  return (
    <div className="flex min-h-[93vh]">
      <Filters />
      <ProductsCards category={"Smartphones"} />
    </div>
  );
};

export default Smartphones;
