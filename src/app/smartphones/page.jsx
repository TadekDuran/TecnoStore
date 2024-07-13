"use client";
import React, { useState, useEffect } from "react";
import ProductsCards from "@/components/ProductsCards";
import Filters from "@/components/Filters";
import { getData } from "../api/routes/products/route";

const Smartphones = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getData('Smartphone');
        setProducts(data);
      } catch (error) {
        console.error("Error in getProducts:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-[93vh]">
      <Filters />
      <ProductsCards products={products} />
    </div>
  );
};

export default Smartphones;
