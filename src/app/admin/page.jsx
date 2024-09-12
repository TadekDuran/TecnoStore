"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button
} from "@mui/joy";
import { CirclePlus, Trash2, Pencil } from "lucide-react";
import { getData } from "../api/routes/products/route";
import DeleteModal from "@/components/DeleteModal";

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
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
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
                <Button onClick={() => openDeleteModal(product)}>
                  <Trash2 />
                </Button>
                <Button onClick={() => openEditModal(product)}>
                  <Pencil />
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
    </div>
  );
};

export default AdminPage;
