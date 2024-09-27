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

    const [productInfo, setProductInfo] = useState({
        categoria: "",
        fabricante: "",
        modelo: "",
        precio: "",
        caracteristicas: []
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (selectedProduct) {
            setProductInfo({
                categoria: selectedProduct.categoria,
                fabricante: selectedProduct.fabricante,
                modelo: selectedProduct.modelo,
                precio: selectedProduct.precio,
                caracteristicas: selectedProduct.caracteristicas
            }
            );
        }
    }, [selectedProduct]);

    const handleInputChange = (key, value, index) => {
        const updatedCaracteristicas = [...productInfo.caracteristicas];
        updatedCaracteristicas[index][key] = value;
        setProductInfo((prevState) => ({
            ...prevState,
            caracteristicas: updatedCaracteristicas,
        }));
        if (error) setError("");
    };

    const addCaracteristica = () => {
        setProductInfo((prevState) => ({
            ...prevState,
            caracteristicas: [...prevState.caracteristicas,
            { nombre: "", valor: "", isEditing: true },]
        }));
    };

    const saveCaracteristica = (index) => {
        const { nombre, valor } = productInfo.caracteristicas[index];
        if (!nombre || !valor) {
            alert("Ambos campos son obligatorios.");
            return;
        }
        const updatedCaracteristicas = [...productInfo.caracteristicas];
        updatedCaracteristicas[index].isEditing = false;
        setProductInfo((prevState) => ({
            ...prevState,
            caracteristicas: updatedCaracteristicas,
        }));
        setError("");
    };

    const editCaracteristica = (index) => {
        const updatedCaracteristicas = [...productInfo.caracteristicas];
        updatedCaracteristicas[index].isEditing = true;
        setProductInfo((prevState) => ({
            ...prevState,
            caracteristicas: updatedCaracteristicas,
        }));
    };

    const removeCaracteristica = (index) => {
        setProductInfo((prevState) => ({
            ...prevState,
            caracteristicas: [...prevState.caracteristicas.filter((_, i) => i !== index)],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productInfo.categoria || !productInfo.fabricante || !productInfo.modelo || !productInfo.precio) {
            alert("No pueden haber campos vacíos");
            return;
        }
        productInfo.caracteristicas.forEach(caracteristica => {
            delete caracteristica.isEditing;
        });
        try {
            const response = await fetch(
                `http://localhost:3000/api/routes/products/${selectedProduct?._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(productInfo),
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
                            value={productInfo.categoria}
                            onChange={(e, newValue) => setProductInfo((prevState) => ({
                                ...prevState,
                                categoria: newValue,
                            }))}
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
                            value={productInfo.fabricante}
                            onChange={(e, newValue) => setProductInfo((prevState) => ({
                                ...prevState,
                                fabricante: newValue,
                            }))}
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
                            value={productInfo.modelo}
                            onChange={(e) => setProductInfo((prevState) => ({
                                ...prevState,
                                modelo: e.target.value,
                            }))}
                            sx={{ mb: 1.5 }}
                        />

                        <Typography level="h4" sx={{ mb: 0.3 }}>
                            Precio (USD)
                        </Typography>
                        <Input
                            placeholder="Introduce el precio"
                            defaultValue={selectedProduct?.precio}
                            value={productInfo.precio}
                            onChange={(e) => setProductInfo((prevState) => ({
                                ...prevState,
                                precio: e.target.value,
                            }))}
                            sx={{ mb: 1.5 }}
                        />

                        <Typography level="h4" sx={{ mb: 0.3 }}>
                            Características
                        </Typography>
                        <div className="flex flex-col gap-2 w-full">
                            {productInfo.caracteristicas.map((caracteristica, index) => (
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