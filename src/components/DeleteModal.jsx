import React from "react";
import { Modal, ModalDialog, Typography, Button } from "@mui/joy";

const DeleteModal = ({ isDeleteModalOpen, handleCloseModals, selectedProduct, setProducts }) => {

    const deleteProduct = async () => {
        if (!selectedProduct) return;
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/routes/products/${selectedProduct._id}`,
            {
              method: "DELETE",
            },
          );
    
          if (res.ok) {
            setProducts((prevProducts) =>
              prevProducts.filter((product) => product._id !== selectedProduct._id),
            );
            alert("Producto eliminado correctamente.");
            handleCloseModals();
          } else {
            console.error("Error al eliminar el producto");
          }
        } catch (error) {
          console.error("Error en la petición DELETE:", error);
        }
      };

  return (
    <Modal open={isDeleteModalOpen} onClose={handleCloseModals}>
      <ModalDialog>
        <Typography level="h6">
          ¿Estás seguro de que deseas eliminar este producto?
        </Typography>
        <Typography>Modelo: {selectedProduct?.modelo}</Typography>
        <div>
          <Button onClick={deleteProduct} color="danger">
            Eliminar
          </Button>
          <Button onClick={handleCloseModals} color="neutral">
            Cancelar
          </Button>
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default DeleteModal;
