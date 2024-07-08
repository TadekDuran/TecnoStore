'use client'
import React, { useEffect, useState } from "react";
import ProductCard, { getProductsByCategory } from "@/components/ProductCard";

async function getSmartphones() {
  return await getProductsByCategory('Smartphone');
}

const Smartphones = () => {
  const [smartphones, setSmartphones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSmartphones() {
      try {
        const data = await getSmartphones();
        if (Array.isArray(data)) {
          setSmartphones(data);
        } else {
          throw new Error('Data format is incorrect');
        }
        console.log(data); // Log the data to check its structure
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSmartphones();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (smartphones.length === 0) return <div>No se encontraron productos</div>;

  return (
    <div>
      {smartphones.map((smartphone) => (
        <ProductCard key={smartphone._id} smartphone={smartphone} />
      ))}
    </div>
  );
};

export default Smartphones;
