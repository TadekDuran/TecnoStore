"use client";
import { useState } from "react";
import {
  Input,
  Select,
  Option,
  Typography,
  Button,
  FormControl,
  IconButton,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { CirclePlus, Undo2 } from "lucide-react";

const CreateProduct = () => {
  const [categoria, setCategoria] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [modelo, setModelo] = useState("");
  const [precio, setPrecio] = useState("");
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCaracteristica, setNewCaracteristica] = useState({
    nombre: "",
    valor: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoria || !fabricante || !modelo || !precio) {
      alert("Todos los campos son obligatorios");
      return;
    }
    const productData = {
      categoria,
      fabricante,
      modelo,
      precio,
      caracteristicas,
    };
    console.log(JSON.stringify(productData));
    
    try {
      const response = await fetch(
        "http://localhost:3000/api/routes/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        },
      );

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      console.log("Producto creado:", data);

      setCategoria("");
      setFabricante("");
      setModelo("");
      setPrecio("");
      setCaracteristicas([]);
      setNewCaracteristica({ nombre: "", valor: "" });
      alert("Producto creado exitosamente");
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  const handleInputChange = (key, value) => {
    setNewCaracteristica({ ...newCaracteristica, [key]: value });
    if (error) setError("");
  };

  const addOrEditCaracteristica = () => {
    const { nombre, valor } = newCaracteristica;

    if (!nombre || !valor) {
      setError("Ambos campos son obligatorios.");
      return;
    }
    if (editingIndex !== null) {
      const updatedCaracteristicas = [...caracteristicas];
      updatedCaracteristicas[editingIndex] = newCaracteristica;
      setCaracteristicas(updatedCaracteristicas);
      setEditingIndex(null);
    } else {
      setCaracteristicas([...caracteristicas, newCaracteristica]);
    }
    setNewCaracteristica({ nombre: "", valor: "" });
    setIsModalOpen(false);
  };

  const editCaracteristica = (index) => {
    setNewCaracteristica(caracteristicas[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const removeCaracteristica = (index) => {
    setCaracteristicas(caracteristicas.filter((_, i) => i !== index));
  };

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

  return (
    <div>
      <Button component="a" href="/admin" startDecorator={<Undo2 />}>
        Regresar
      </Button>
      <form action="" className="flex flex-col items-center">
        <Typography level="h1">Crear Producto</Typography>

        <FormControl sx={{ display: "flex" }}>
          <Typography level="h4" sx={{ mb: 0.3 }}>
            Categoría
          </Typography>
          <Select
            placeholder="Selecciona una categoría"
            value={categoria}
            onChange={(e, newValue) => setCategoria(newValue)}
            sx={{ mb: 1.5 }}
          >
            {categorias.map((categoria) => (
              <Option key={categoria.tipo} value={categoria.tipo}>
                {categoria.tipo}
              </Option>
            ))}
          </Select>

          <Typography level="h4" sx={{ mb: 0.3 }}>
            Fabricante
          </Typography>
          <Select
            placeholder="Selecciona un fabricante"
            value={fabricante}
            onChange={(e, newValue) => setFabricante(newValue)}
            sx={{ mb: 1.5 }}
          >
            {fabricantes.map((fabricante) => (
              <Option key={fabricante.nombre} value={fabricante.nombre}>
                {fabricante.nombre}
              </Option>
            ))}
          </Select>

          <Typography level="h4" sx={{ mb: 0.3 }}>
            Modelo
          </Typography>
          <Input
            placeholder="Introduce el modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            sx={{ mb: 1.5 }}
          />

          <Typography level="h4" sx={{ mb: 0.3 }}>
            Precio (USD)
          </Typography>
          <Input
            type="number"
            placeholder="Introduce el precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            sx={{ mb: 1.5 }}
          />

          <div className="flex w-full flex-col gap-2">
            <Typography level="h4" sx={{ mb: 0.3 }}>
              Características
            </Typography>
            {caracteristicas.map((caracteristica, index) => (
              <div key={index} className="flex items-center gap-2">
                <Typography level="body1">{`${caracteristica.nombre}: ${caracteristica.valor}`}</Typography>
                <IconButton onClick={() => editCaracteristica(index)}>
                  Editar
                </IconButton>
                <IconButton onClick={() => removeCaracteristica(index)}>
                  Remover
                </IconButton>
              </div>
            ))}
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setError("");
              }}
              startDecorator={<CirclePlus />}
              color="neutral"
            >
              Añadir característica
            </Button>
          </div>
        </FormControl>

        <Button variant="plain" type="submit" onClick={handleSubmit}>
          Subir producto
        </Button>
      </form>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalDialog>
          <Typography level="h4">
            {editingIndex !== null ? "Editar" : "Añadir"} Característica
          </Typography>
          <Stack spacing={2}>
            <Input
              placeholder="Nombre de la característica"
              value={newCaracteristica.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
            />
            <Input
              placeholder="Valor"
              value={newCaracteristica.valor}
              onChange={(e) => handleInputChange("valor", e.target.value)}
            />
            {error && (
              <Typography level="body2" color="danger">
                {error}
              </Typography>
            )}
            <Button onClick={addOrEditCaracteristica}>
              {editingIndex !== null ? "Guardar cambios" : "Añadir"}
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default CreateProduct;
