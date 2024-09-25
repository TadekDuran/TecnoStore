"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input
} from "@mui/joy";
import { CirclePlus, Trash2, Pencil, Star, StarOff, Check, X, ArrowDownAZ, ArrowDownZA, ArrowDown01, ArrowDown10 } from "lucide-react";
import { getData } from "../api/routes/products/route";
import DeleteModal from "@/components/DeleteModal";
import EditModal from "@/components/EditModal";

const AdminPage = () => {
  const columns = [
    { name: "Modelo", sortKey: "modelo" },
    { name: "Categoría", sortKey: "categoria" },
    { name: "Precio (USD)", sortKey: "precio" },
    { name: "Fabricante", sortKey: "fabricante" },
    { name: "Acciones" },
  ];
  const extraColumns = [
    {
      name: "Modificar stock"
    },
    {
      name: "Modificar destacado"
    },
    {
      name: "Editar producto"
    },
    {
      name: "Eliminar producto"
    },
  ]

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: 'modelo',
    direction: 'asc',
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(product =>
    product.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortConfig.key === "precio") {
      const aPrecio = a[sortConfig.key] || 0;
      const bPrecio = b[sortConfig.key] || 0;
      return sortConfig.direction === 'asc' ? aPrecio - bPrecio : bPrecio - aPrecio;
    } else {
      const aValue = a[sortConfig.key] ? String(a[sortConfig.key]) : "";
      const bValue = b[sortConfig.key] ? String(b[sortConfig.key]) : "";
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
  });

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column.sortKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column.sortKey, direction });
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (column.sortKey === "precio") {
        return direction === 'asc' ? a[column.sortKey] - b[column.sortKey] : b[column.sortKey] - a[column.sortKey];
      } else {
        return direction === 'asc'
          ? a[column.sortKey].localeCompare(b[column.sortKey])
          : b[column.sortKey].localeCompare(a[column.sortKey]);
      }
    });
    setProducts(sortedProducts);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  const handleStock = async (product) => {
    const updatedProduct = { ...product, stock: !product.stock };

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
        `Stock del producto ${updatedProduct.modelo} actualizado correctamente`
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
        color="neutral"
        component="a"
        href="/admin/create"
        startDecorator={<CirclePlus />}
      >
        Nuevo Producto
      </Button>
      <Input
        placeholder="Buscar productos"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ backgroundColor: "#333", color: "#fff", marginBottom: '16px', width: '300px' }}
      />
      <Table
        aria-label="basic table"
        size="sm"
        stickyHeader
        borderAxis="both"
        sx={{
          backgroundColor: "#1a1a1a",
          color: "#fff",
          '& thead th': {
            textAlign: 'center',
            verticalAlign: 'middle',
            backgroundColor: "#444",
            color: "#0A0A0A",
            fontWeight: '800',
            textTransform: 'uppercase'
          },
          '& tbody td': {
            textAlign: 'center',
            verticalAlign: 'middle',
            backgroundColor: "#333",
            color: "#fff",
          }
        }}>
        <thead>
          <tr>
          {columns.map((column) => (
          <th key={column.name} {...(column.name === "Acciones"
            ? { colSpan: 4 }
            : { rowSpan: 4 })}>
            <span onClick={() => handleSort(column)} style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor:"pointer" }}>
              {column.name}
              {sortConfig.key === column.sortKey ? (
                sortConfig.direction === 'asc'
                  ? (column.name === "Precio (USD)" ? <ArrowDown01 /> : <ArrowDownAZ />)
                  : (column.name === "Precio (USD)" ? <ArrowDown10 /> : <ArrowDownZA />)
              ) : null}
            </span>
          </th>
        ))}
          </tr>
          <tr>
            {extraColumns.map((column) => (
              <th key={column.name}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr scope="row" key={product._id}>
              <td>{product.modelo}</td>
              <td>{product.categoria}</td>
              <td>{product.precio}</td>
              <td>{product.fabricante}</td>
              <td>
                <Button
                  onClick={() => handleStock(product)}
                  color={product.stock ? "danger" : "success"} >
                  {product.stock ? <X /> : <Check />}
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => handleHighlight(product)}
                  sx={{
                    backgroundColor: "#FFD700",
                    '&:hover': {
                      backgroundColor: "#FFC107",
                    },
                  }}>
                  {product.destacado ? <StarOff /> : <Star />}
                </Button>
              </td>
              <td>
                <Button onClick={() => openEditModal(product)} color="neutral">
                  <Pencil />
                </Button>
              </td>
              <td>
                <Button onClick={() => openDeleteModal(product)} color="danger">
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