"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/routes/products/${id}`
        console.log(url);
        const data = await fetch(
          url,
        );
        console.log(data[0]);
        setProduct(data[0]);
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