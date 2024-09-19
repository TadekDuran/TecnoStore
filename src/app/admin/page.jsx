"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button
} from "@mui/joy";
import { CirclePlus, Trash2, Pencil, Star, StarOff } from "lucide-react";
import { getData } from "../api/routes/products/route";
import DeleteModal from "@/components/DeleteModal";
import EditModal from "@/components/EditModal";

const AdminPage = () => {
  const fabricantes = [
    { nombre: "Xiaomi" },
    { nombre: "Samsung" },
    { nombre: "Motorola" },
    { nombre: "iPhone" },
  ];

  const categorias = [
    { tipo: "Smartphone" },
    { tipo: "Tablet" },
    { tipo: "Notebook" },
    { tipo: "Consola" },
  ];

  const columns = [
    { name: "Modelo" },
    { name: "Categoría" },
    { name: "Precio" },
    { name: "Fabricante" },
    { name: "Acciones" },
  ];

  const [products, setProducts] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleHighlight = async (product) => {
    const updatedProduct = { ...product, destacado: !product.destacado };

    try {
      const response = await fetch(
        `http://localhost:3000/api/routes/products/${product?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        },
      );

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === product._id ? updatedProduct : p
        )
      );

      alert(
        `Producto ${updatedProduct.destacado ? "destacado" : "no destacado"
        } correctamente`
      );
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const fetchProducts = async () => {
    try {
      const data = await getData();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Button
        component="a"
        href="/admin/create"
        startDecorator={<CirclePlus />}
      >
        Nuevo Producto
      </Button>
      <Table aria-label="basic table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.name}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.modelo}</td>
              <td>{product.categoria}</td>
              <td>{product.precio}</td>
              <td>{product.fabricante}</td>
              <td>
                <Button onClick={() => handleHighlight(product)}>
                  {product.destacado ? <StarOff /> : <Star />}
                </Button>
                <Button onClick={() => openEditModal(product)}>
                  <Pencil />
                </Button>
                <Button onClick={() => openDeleteModal(product)}>
                  <Trash2 />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        handleCloseModals={handleCloseModals}
        selectedProduct={selectedProduct}
        setProducts={setProducts}
      />
      <EditModal
        isEditModalOpen={isEditModalOpen}
        handleCloseModals={handleCloseModals}
        selectedProduct={selectedProduct}
        setProducts={setProducts}
      />
    </div>
  );
};

export default AdminPage;
