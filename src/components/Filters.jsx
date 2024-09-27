"use client";
import React, { useState, useEffect } from "react";
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

const Filters = ({ fetchProducts, categoria }) => {
  const [filterList, setFilterList] = useState({
    searchTerm: "",
    price: { min: 0, max: "" },
    fabricante: "",
    almacenamiento: ""
  });
  const [queries, setQueries] = useState(`categoria=${categoria}`);

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

  useEffect(() => {
    let { fabricante, almacenamiento, searchTerm, price: { min: minPrice, max: maxPrice } } = filterList;

    let newQueries = `categoria=${categoria}`;
    if (fabricante) newQueries += `&fabricante=${fabricante}`;
    if (minPrice) newQueries += `&precioMin=${minPrice}`;
    if (maxPrice) newQueries += `&precioMax=${maxPrice}`;
    if (almacenamiento) newQueries += `&nombreCaracteristica=Almacenamiento&valorCaracteristica=${almacenamiento}`;
    if (searchTerm) newQueries += `&modelo=${searchTerm}`;

    if (newQueries !== queries) {
      setQueries(newQueries);
    }
  }, [filterList]);

  useEffect(() => {
    if (queries !== `categoria=${categoria}`) {
      fetchProducts(queries);
    }
  }, [queries]);


  function deleteFilters() {
    setFilterList({
      searchTerm: "",
      price: { min: 0, max: "" },
      fabricante: "",
      almacenamiento: ""
    })
    setQueries(`categoria=${categoria}`);
  }

  return (
    <div className="sticky top-[7vh] flex h-[93vh] w-72 flex-col gap-4 bg-black p-2">
      <FormControl>
        <FormLabel>Buscar Producto</FormLabel>
        <Input
          placeholder="Ingrese el modelo"
          value={filterList.searchTerm}
          onChange={(event) =>
            setFilterList((prevState) => ({
              ...prevState,
              searchTerm: event.target.value,
            }))
          }
          sx={{ backgroundColor: "#333", color: "#fff", marginBottom: "16px", width: "300px" }}
        />
        <FormLabel>Marca</FormLabel>
        <Select
          size="sm"
          placeholder="Selecciona un fabricante"
          value={filterList.fabricante}
          onChange={(e, newValue) =>
            setFilterList((prevState) => ({
              ...prevState,
              fabricante: newValue,
            }))
          }
        >
          {brands.map(({ value }) => (
            <Option key={value} value={value}>
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
            value={filterList.price.min}
            onChange={(event) =>
              setFilterList((prevState) => ({
                ...prevState,
                price: {
                  ...prevState.price,
                  min: Number(event.target.value),
                },
              }))
            }
          />
          <Input
            size="sm"
            placeholder="Máximo"
            type="number"
            value={filterList.price.max}
            onChange={(event) =>
              setFilterList((prevState) => ({
                ...prevState,
                price: {
                  ...prevState.price,
                  max: Number(event.target.value),
                },
              }))
            }
          />
          <IconButton
            disabled={filterList.price.max === "" && filterList.price.min === ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </IconButton>
        </Box>
      </FormControl>
      <FormControl>
        <FormLabel>Almacenamiento</FormLabel>
        <Select
          size="sm"
          placeholder="Selecciona un almacenamiento"
          value={filterList.almacenamiento}
          onChange={(e, newValue) =>
            setFilterList((prevState) => ({
              ...prevState,
              almacenamiento: newValue,
            }))
          }
        >
          {storage.map(({ value }) => (
            <Option key={value} value={value}>
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
