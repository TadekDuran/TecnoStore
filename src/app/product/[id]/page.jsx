"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProduct } from "@/app/api/routes/products/[id]/route";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Link from "next/link";
import { Typography, Sheet, Box, Radio } from "@mui/joy";

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
  const caracteristicas = [
    {
      caracteristica: "Almacenamiento",
      valor: ["512GB", "1TB"],
    },{
      caracteristica: "RAM",
      valor: ["8GB"],
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

  console.log(product);

  if (existProduct) {
    return (
      <div className="flex flex-col items-center justify-center sm:flex-row sm:items-start">
        <div className="">
          <ImageGallery
            items={images}
            thumbnailPosition="left"
            showFullscreenButton={false}
            showPlayButton={false}
          />
        </div>
        <Sheet sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
          <Typography level="h1">
            {product.marca} {product.modelo}
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "end" }}>
            <Typography level="h2">${product.precio} USD</Typography>
            <Typography level="body-lg">(PRECIO EN PESOS)</Typography>
          </Box>
          <Link href={"/pagos"}>Conocé nuestros medios de pago</Link>
          {caracteristicas.map((caracteristica) => (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography>{caracteristica.caracteristica}</Typography>
              {caracteristica.valor.map((valor, index) => (
                <Radio key={index} label={valor}>
                  {valor}
                </Radio>
              ))}
            </Box>
          ))}
        </Sheet>
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
