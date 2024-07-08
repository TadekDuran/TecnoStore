import React from "react";
import ProductsCards from "@/components/ProductsCards";

const Smartphones = () => {
  return (
    <div className="flex">
      <div className="text-white">Filtros</div>
      <ProductsCards category={"Smartphones"} />
    </div>
  );
};

export default Smartphones;
