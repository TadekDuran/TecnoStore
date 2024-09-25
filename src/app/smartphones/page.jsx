"use client";
import React, { useState, useEffect } from "react";
import ProductsCards from "@/components/ProductsCards";
import Filters from "@/components/Filters";
import { getData } from "../api/routes/products/route";

const Smartphones = () => {
  const [products, setProducts] = useState([]);
  const categoria = "Smartphone"
  const fetchProducts = async (query) => {
    try {
      const data = await getData(query);
      setProducts(data);
    } catch (error) {
      console.error("Error in getProducts:", error);
    }
  };

  useEffect(() => {
    fetchProducts(`categoria=${categoria}`);
  }, []);

  return (
    <div className="flex min-h-[93vh]">
      <Filters products={products} fetchProducts={fetchProducts} categoria={categoria} />
      <ProductsCards products={products} />
    </div>
  );
};

export default Smartphones;
