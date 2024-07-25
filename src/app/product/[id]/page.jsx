"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [existProduct, setExistProduct] = useState(false);

  useEffect(() => {
    if (id) {
      /* buena implementacion de condicional para que realize el fetch solo si el id existe,implementar esta logica en el componente visual tambien */
      /* importar la funcion del route de [id] de la API */
      const fetchProduct = async () => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/routes/products/${id}`;
        console.log(url);
        const res = await fetch(url);
        console.log(res);
        const data = await res.json();
        console.log(data);
        setProduct(data);
      };
      fetchProduct();
    }
  }, [id]);

  return (
    <div>
      {/* <h1>{product.modelo}</h1>
      <p>Precio: ${product.precio} USD</p>
      <img
        src="https://armoto.vtexassets.com/arquivos/ids/165375-800-auto?v=638412646944530000&width=800&height=auto&aspect=true"
        alt="Product Image"
      /> */}
    </div>
  );
};

export default ProductPage;
