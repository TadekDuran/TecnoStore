import { React, useState, useEffect } from "react";
import { Modal, ModalDialog, FormControl, Select, Option, Input, IconButton, Typography, Button, Stack } from "@mui/joy";
import { CirclePlus, Trash2, Pencil } from "lucide-react";

const EditModal = ({ isEditModalOpen, handleCloseModals, selectedProduct, setProducts }) => {
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

    const [categoria, setCategoria] = useState("");
    const [fabricante, setFabricante] = useState("");
    const [modelo, setModelo] = useState("");
    const [precio, setPrecio] = useState("");
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (selectedProduct) {
            setCategoria(selectedProduct.categoria || "");
            setFabricante(selectedProduct.fabricante || "");
            setModelo(selectedProduct.modelo || "");
            setPrecio(selectedProduct.precio || "");
            setCaracteristicas(selectedProduct.caracteristicas || []);
        }
    }, [selectedProduct]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoria || !fabricante || !modelo || !precio) {
            alert("No pueden haber campos vacíos");
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
            caracteristicas,
        };
        try {
            const response = await fetch(
                `http://localhost:3000/api/routes/products/${selectedProduct?._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(productData),
                },
            );

            if (!response.ok) {
                throw new Error("Error en la petición");
            }

            const updatedProduct = await response.json();
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === selectedProduct._id ? updatedProduct : product
                )
            );
            alert("Producto Editado Correctamente");
            handleCloseModals();
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };

    return (
        <Modal open={isEditModalOpen} onClose={handleCloseModals}>
            <ModalDialog sx={{
                backgroundColor: "#1a1a1a", // Fondo oscuro para el modal
                color: "#fff", // Texto blanco
                borderRadius: "8px", // Ajustar bordes para darle un aspecto suave
            }}>
                <form action="" className="flex flex-col items-center">
                    <Typography level="h6">
                        Editar producto: {selectedProduct?.modelo}
                    </Typography>

                    <FormControl sx={{ display: "flex" }}>
                        <Typography level="h4" sx={{ mb: 0.3 }}>
                            Categoría
                        </Typography>
                        <Select
                            placeholder="Selecciona una categoría"
                            defaultValue={selectedProduct?.categoria}
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
                            defaultValue={selectedProduct?.fabricante}
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
                            defaultValue={selectedProduct?.modelo}
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            sx={{ mb: 1.5 }}
                        />

                        <Typography level="h4" sx={{ mb: 0.3 }}>
                            Precio (USD)
                        </Typography>
                        <Input
                            placeholder="Introduce el precio"
                            defaultValue={selectedProduct?.precio}
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
                                            <Typography textColor={"common.white"}>{`${caracteristica.nombre}: ${caracteristica.valor}`}</Typography>
                                            <IconButton onClick={() => editCaracteristica(index)}>
                                                <Pencil color="#fff" />
                                            </IconButton>
                                        </>
                                    )}
                                    <IconButton onClick={() => removeCaracteristica(index)}>
                                        <Trash2 color="#fff" />
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

                    <Button onClick={handleSubmit} color="neutral">
                        Guardar
                    </Button>
                    <Button onClick={handleCloseModals} color="neutral">
                        Cancelar
                    </Button>
                </form>
            </ModalDialog>
        </Modal>


    );
};

export default EditModal;