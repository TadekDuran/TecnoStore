"use client";
import React, { useState, useEffect } from "react";
import ProductsCards from "@/components/ProductsCards";
import Filters from "@/components/Filters";
import { getData } from "../api/routes/products/route";
import { useSearchParams } from 'next/navigation'

const Catalog = ({ params }) => {
  const amountProducts = 10;
  const [data, setData] = useState({ totalPages: null, currentPage: 1, products: [] });
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState({
    category: params.category,
    currentPage: searchParams.get("currentPage")
  });

  console.log(queryParams);
  
  const fetchProducts = async (query) => {
    try {
      const res = await getData(query);
      setData({
        totalPages: res.totalPages,
        currentPage: res.currentPage,
        products: res.products
      });

    } catch (error) {
      console.error("Error in getProducts:", error);
    }
  };

  useEffect(() => {
    fetchProducts(`category=${queryParams.category}&currentPage=${data.currentPage}&amountProducts=${amountProducts}`);
  }, []);

  return (
    <div className="flex min-h-[93vh]">
      {/* <Filters fetchProducts={fetchProducts} queryParams={queryParams} /> */}
      <ProductsCards products={data.products} />
      <div className="flex flex-col gap-1">
        <button className="px-1 py-2 bg-orange-600" onClick={() => {
          data.currentPage > 1 &&
            fetchProducts(`category=${queryParams.category}&currentPage=${data.currentPage - 1}&amountProducts=${amountProducts}`);
        }}>{data.currentPage - 1}</button>
        <button className="px-1 py-2 bg-orange-600">{data.currentPage}</button>
        <button className="px-1 py-2 bg-orange-600" onClick={() => {
          data.currentPage < data.totalPages &&
            fetchProducts(`category=${category}&currentPage=${data.currentPage + 1}&amountProducts=${amountProducts}`);
        }}>{data.currentPage + 1}</button>
      </div>
    </div>
  );
};

export default Catalog;