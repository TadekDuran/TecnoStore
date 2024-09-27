"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProduct } from "@/app/api/routes/products/[id]/route";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Link from "next/link";
import { Typography, Sheet, Box, Radio, Table } from "@mui/joy";

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

  console.log(product);

  if (existProduct) {
    return (
      <div className="flex flex-col items-center justify-center sm:flex-row sm:items-start">
        <div className="w-1/2">
          <ImageGallery
            items={images}
            thumbnailPosition="left"
            showFullscreenButton={false}
            showPlayButton={false}
          />
        </div>
        <Sheet sx={{ display: "flex", flexDirection: "column", padding: 1, width: "50%" }}> 
          <Typography level="h1">
            {product.fabricante} {product.modelo}
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "end" }}>
            <Typography level="h2">${product.precio} USD</Typography>
            <Typography level="body-lg">(PRECIO EN PESOS)</Typography>
          </Box>
          <Link href={"/pagos"}>Conocé nuestros medios de pago</Link>
          <Table
            aria-label="product attributes"
            size="sm"
            sx={{}}
          >
            <tbody>
              {product.caracteristicas.map((caracteristica) => (
                <tr>
                  <td>{caracteristica.nombre}</td>
                  <td>{caracteristica.valor}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
