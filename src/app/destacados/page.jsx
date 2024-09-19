"use client";
import React, { useState, useEffect } from "react";
import ProductsCards from "@/components/ProductsCards";
import Filters from "@/components/Filters";
import { getHighlights } from "../api/routes/products/route";

const Destacados = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const data = await getHighlights();
      setProducts(data);
    } catch (error) {
      console.error("Error in getHightlights:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-[93vh]">
      <Filters products={products} fetchProducts={fetchProducts}/>
      <ProductsCards products={products} />
    </div>
  );
};

export default Destacados;
