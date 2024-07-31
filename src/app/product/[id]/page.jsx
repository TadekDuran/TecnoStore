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
      const fetchProduct = async () => {
        const data = await getProduct(id);
        if (!data) {
          setExistProduct(false);
          return;
        }
        setExistProduct(true);
        setProduct(data);
      };
      fetchProduct();
    }
  }, [id]);

  if (existProduct) {
    return (
      <div className="flex flex-col items-center sm:items-start justify-center sm:flex-row">
        <img
          src="https://armoto.vtexassets.com/arquivos/ids/165375-800-auto?v=638412646944530000&width=800&height=auto&aspect=true"
          alt="Product Image"
          className="h-[480px] w-[480px]"
        />
        <div className="flex flex-col">
          <h1>{product.modelo}</h1>
          <p>Precio: ${product.precio} USD</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <p>Buscando producto...</p>
    </div>
  );
};

export default ProductPage;
