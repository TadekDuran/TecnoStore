"use client";
import React, { useState, useEffect } from "react";
import ProductsCards from "@/components/ProductsCards";
import Filters from "@/components/Filters";
import { getData } from "../api/routes/products/route";

const Consolas = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (category) => {
    try {
      const data = await getData(category);
      setProducts(data);
    } catch (error) {
      console.error("Error in getProducts:", error);
    }
  };

  useEffect(() => {
    fetchProducts("categoria=Consola");
  }, []);

  return (
    <div className="flex min-h-[93vh]">
      <Filters products={products} fetchProducts={fetchProducts} />
      <ProductsCards products={products} />
    </div>
  );
};

export default Consolas;
