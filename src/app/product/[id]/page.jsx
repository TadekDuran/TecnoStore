"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProduct } from "@/app/api/routes/products/[id]/route";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [existProduct, setExistProduct] = useState(false);

  useEffect(() => {
    if (id) {
      /* buena implementacion de condicional para que realize el fetch solo si el id existe,implementar esta logica en el componente visual tambien */
      /* importar la funcion del route de [id] de la API */
      const fetchProduct = async () => {
        const data = await getProduct(id);
        if(!data) {
          setExistProduct(false)
          return;
        }
        setExistProduct(true);
        setProduct(data);
      };
      fetchProduct();
    }
  }, [id]);

  if(existProduct)  {
    return (
      <div>
        <h1>{product.modelo}</h1>
        <p>Precio: ${product.precio} USD</p>
        <img
          src="https://armoto.vtexassets.com/arquivos/ids/165375-800-auto?v=638412646944530000&width=800&height=auto&aspect=true"
          alt="Product Image"
        />
      </div>
    );
  }
  return (
    <div>
      <p>Producto no encontrado.</p>
    </div>
  );
};

export default ProductPage;
