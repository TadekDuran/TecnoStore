"use client";
import React, { useState } from "react";
import {
  Select,
  Option,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  IconButton,
} from "@mui/joy";

const Filters = ({ products, fetchProducts }) => {
  const [queries, setQueries] = useState("categoria=Smartphone");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const brands = [
    {
      id: 1,
      value: "Samsung",
    },
    {
      id: 2,
      value: "Motorola",
    },
    {
      id: 3,
      value: "Xiaomi",
    },
  ];

  const storage = [
    {
      id: 1,
      value: "128GB",
    },
    {
      id: 2,
      value: "256GB",
    },
    {
      id: 3,
      value: "512GB",
    },
    {
      id: 4,
      value: "1TB"
    }
  ];

  function changeQueries(newQueries) {
    const updateQueries = `${queries}&${newQueries}`;
    fetchProducts(updateQueries);
  }

  function deleteFilters() {
    setMinPrice("");
    setMaxPrice("");
    setQueries("categoria=Smartphone");
  }

  return (
    <div className="sticky top-[7vh] flex h-[93vh] w-72 flex-col gap-4 bg-black p-2">
      <FormControl>
        <FormLabel>Marca</FormLabel>
        <Select size="sm" placeholder="Selecciona una marca">
          {brands.map(({ value }) => (
            <Option
              key={value}
              value={value}
              onClick={() => {
                changeQueries(`marca=${value}`);
              }}
            >
              {value}
            </Option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Precio</FormLabel>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Input
            size="sm"
            placeholder="Mínimo"
            type="number"
            value={minPrice}
            onChange={(event) => setMinPrice(Number(event.target.value))}
          />
          <Input
            size="sm"
            placeholder="Máximo"
            type="number"
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
          />
          <IconButton
            disabled={maxPrice === "" && minPrice === ""}
            onClick={() =>
              changeQueries(`precioMin=${minPrice}&precioMax=${maxPrice}`)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </IconButton>
        </Box>
      </FormControl>
      <FormControl>
        <FormLabel>Almacenamiento</FormLabel>
        <Select size="sm" placeholder="Selecciona un almacenamiento">
          {storage.map(({ value }) => (
            <Option
              key={value}
              value={value}
              onClick={() => {
                changeQueries(`almacenamiento=${value}`);
              }}
            >
              {value}
            </Option>
          ))}
        </Select>
      </FormControl>
      <Button size="sm" color="danger" variant="plain" onClick={deleteFilters}>
        Borrar filtros
      </Button>
    </div>
  );
};

export default Filters;
