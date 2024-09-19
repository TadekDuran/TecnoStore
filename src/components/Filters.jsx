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

const Filters = ({ products, fetchProducts, categoria }) => {
  const [queries, setQueries] = useState(`categoria=${categoria}`);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [almacenamiento, setAlmacenamiento] = useState("");

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
    },
    {
      id: 5,
      value: "2TB"
    }
  ];

  function changeQueries(newQueries) {
    const updateQueries = `${queries}&${newQueries}`;
    fetchProducts(updateQueries);
  }

  function deleteFilters() {
    setMinPrice("");
    setMaxPrice("");
    setFabricante("");
    setAlmacenamiento("");
    setQueries(`categoria=${categoria}`);
    changeQueries("");
  }

  return (
    <div className="sticky top-[7vh] flex h-[93vh] w-72 flex-col gap-4 bg-black p-2">
      <FormControl>
        <FormLabel>Marca</FormLabel>
        <Select
          size="sm"
          placeholder="Selecciona un fabricante"
          value={fabricante}
          onChange={(e, newValue) => setFabricante(newValue)}>
          {brands.map(({ value }) => (
            <Option
              key={value}
              value={value}
              onClick={() => {
                changeQueries(`fabricante=${value}`);
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
        <Select size="sm" placeholder="Selecciona un almacenamiento" value={almacenamiento}
          onChange={(e, newValue) => setAlmacenamiento(newValue)}>
          {storage.map(({ value }) => (
            <Option
              key={value}
              value={value}
              onClick={() => {
                changeQueries(`nombreCaracteristica=Almacenamiento&valorCaracteristica=${value}`);
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
