"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Select,
  Option,
  Typography,
  Button,
  FormControl,
  IconButton,
  Stack,
} from "@mui/joy";
import { CirclePlus, Trash2, Pencil, Undo2 } from "lucide-react";

const CreateProduct = () => {
  const [categoria, setCategoria] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [modelo, setModelo] = useState("");
  const [precio, setPrecio] = useState("");
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoria || !fabricante || !modelo || !precio) {
      alert("Todos los campos son obligatorios");
      return;
    }

    caracteristicas.forEach(caracteristica => {
      delete caracteristica.isEditing;
    });
    
    const productData = {
      categoria,
      fabricante,
      modelo,
      precio,
      caracteristicas
    };

    try {
      const response = await fetch("http://localhost:3000/api/routes/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      alert("Producto creado exitosamente");
      router.push("/admin");
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  const handleInputChange = (key, value, index) => {
    const updatedCaracteristicas = [...caracteristicas];
    updatedCaracteristicas[index][key] = value;
    setCaracteristicas(updatedCaracteristicas);
    if (error) setError("");
  };

  const addCaracteristica = () => {
    setCaracteristicas([
      ...caracteristicas,
      { nombre: "", valor: "", isEditing: true },
    ]);
  };

  const saveCaracteristica = (index) => {
    const { nombre, valor } = caracteristicas[index];
    if (!nombre || !valor) {
      alert("Ambos campos son obligatorios.");
      return;
    }
    const updatedCaracteristicas = [...caracteristicas];
    updatedCaracteristicas[index].isEditing = false;
    setCaracteristicas(updatedCaracteristicas);
    setError("");
  };

  const editCaracteristica = (index) => {
    const updatedCaracteristicas = [...caracteristicas];
    updatedCaracteristicas[index].isEditing = true;
    setCaracteristicas(updatedCaracteristicas);
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
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
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

          <Typography level="h4" sx={{ mb: 0.3 }}>
            Características
          </Typography>
          <div className="flex flex-col gap-2 w-full">
            {caracteristicas.map((caracteristica, index) => (
              <Stack key={index} direction="row" alignItems="center" spacing={2}>
                {caracteristica.isEditing ? (
                  <>
                    <Input
                      placeholder="Nombre"
                      value={caracteristica.nombre}
                      onChange={(e) =>
                        handleInputChange("nombre", e.target.value, index)
                      }
                    />
                    <Input
                      placeholder="Valor"
                      value={caracteristica.valor}
                      onChange={(e) =>
                        handleInputChange("valor", e.target.value, index)
                      }
                    />
                    <Button onClick={() => saveCaracteristica(index)}>
                      Guardar
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography>{`${caracteristica.nombre}: ${caracteristica.valor}`}</Typography>
                    <IconButton onClick={() => editCaracteristica(index)}>
                      <Pencil />
                    </IconButton>
                  </>
                )}
                <IconButton onClick={() => removeCaracteristica(index)}>
                  <Trash2 />
                </IconButton>
              </Stack>
            ))}
            {error && (
              <Typography level="body2" color="danger">
                {error}
              </Typography>
            )}
            <Button startDecorator={<CirclePlus />} onClick={addCaracteristica}>
              Añadir característica
            </Button>
          </div>
        </FormControl>

        <Button type="submit" variant="plain">
          Subir producto
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
