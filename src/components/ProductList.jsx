import Product from "../models/Product";
import { connectDB } from "../utils/database";

async function loadProducts() {
  connectDB()
  const products = await Product.find();
  return products
}

const ProductList = async () => {
  const products = await loadProducts()
  return (
    <div className="text-textcolor">
      {products.map((product) => (
        <div key={product._id}>
          <h3>
            {product.fabricante} {product.modelo}
          </h3>
          <p>{product.precio}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;