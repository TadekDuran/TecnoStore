"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProduct } from "@/app/api/routes/products/[id]/route";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [existProduct, setExistProduct] = useState(false);
  const images = [
    {
      original: "https://picsum.photos/id/847/400/500",
      thumbnail: "https://picsum.photos/id/847/100/100",
    },
    {
      original: "https://picsum.photos/id/847/400/500",
      thumbnail: "https://picsum.photos/id/847/100/100",
    },
    {
      original: "https://picsum.photos/id/847/400/500",
      thumbnail: "https://picsum.photos/id/847/100/100",
    },
    {
      original: "https://picsum.photos/id/847/400/500",
      thumbnail: "https://picsum.photos/id/847/100/100",
    },
    {
      original: "https://picsum.photos/id/847/400/500",
      thumbnail: "https://picsum.photos/id/847/100/100",
    },
  ];
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
      <div className="flex flex-col sm:flex-row sm:items-start">
        <div className="">
          <ImageGallery
            items={images}
            thumbnailPosition="left"
            showFullscreenButton={false}
            showPlayButton={false}
          />
        </div>
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
