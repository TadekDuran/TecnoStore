import React from 'react';

const ProductCard = ({ smartphone }) => {
  console.log(smartphone);
  return (
    <div className='text-white'>{smartphone.modelo}</div>
  );
};

export async function getProductsByCategory(categoria) {
  try {
    const res = await fetch(`http://localhost:3000/api/routes/products`);
    if (!res.ok) {
      throw new Error('Error al obtener la data');
    }
    const data = await res.json();
    const filteredData = data.filter(product => product.categoria === categoria);
    return filteredData;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error al obtener y filtrar los productos');
  }
}

export default ProductCard;
