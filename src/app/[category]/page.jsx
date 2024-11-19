"use client";
import React, { useState, useEffect } from "react";
import ProductsCards from "@/components/ProductsCards";
import Filters from "@/components/Filters";
import { getData } from "../api/routes/products/route";
import { useSearchParams, useRouter } from "next/navigation";

const Catalog = ({ params }) => {
  const [data, setData] = useState({
    totalPages: null,
    currentPage: 1,
    products: [],
  });
  const categoriaParam = params.category;

  console.log(categoriaParam);

  const fetchProducts = async (query) => {
    try {
      const res = await getData(query);
      setData({
        totalPages: res.totalPages,
        currentPage: res.currentPage,
        products: res.products,
      });
      console.log(res)
    } catch (error) {
      console.error("Error in getProducts:", error);
    }
  };

  useEffect(() => {
    fetchProducts(
      `categoria=${categoriaParam}&currentPage=1}`,
    );
  }, []);

  return (
    <div className="flex min-h-[93vh]">
      <p>{categoriaParam}</p>
      {/* <Filters fetchProducts={fetchProducts} queryParams={queryParams} /> */}
      <ProductsCards products={data.products} />
      <div className="flex flex-col gap-1">
        <button
          className="bg-orange-600 px-1 py-2"
          onClick={() => {
            data.currentPage > 1 &&
              fetchProducts(
                `categoria=${categoriaParam}&currentPage=${data.currentPage - 1}`,
              );
          }}
        >
          {data.currentPage - 1}
        </button>
        <button className="bg-orange-600 px-1 py-2">{data.currentPage}</button>
        <button
          className="bg-orange-600 px-1 py-2"
          onClick={() => {
            data.currentPage < data.totalPages &&
              fetchProducts(
                `categoria=${categoriaParam}&currentPage=${data.currentPage + 1}`,
              );
          }}
        >
          {data.currentPage + 1}
        </button>
      </div>
    </div>
  );
};

export default Catalog;
