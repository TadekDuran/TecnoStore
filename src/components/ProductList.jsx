import Product from "@/app/api/models/Product";
import { connectDB } from "@/app/api/utils/database";
import ProductCard from "./ProductCard";

async function loadProducts() {
  await connectDB();
  const products = await Product.find();
  return products;
}

const ProductList = async () => {
  const products = await loadProducts();
  return (
    <div className="text-textcolor">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
