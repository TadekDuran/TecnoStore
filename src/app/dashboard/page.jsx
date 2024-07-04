import { connectDB } from "@/app/api/utils/database";
import ProductCard from "@/components/ProductCard";
import Product from "../api/models/Product";
import Header from "@/components/Header";
import Button from "@mui/joy/Button";
import Add from '@mui/icons-material/Add';

async function loadProducts() {
  await connectDB();
  const products = await Product.find();
  return products;
}
const Dashboard = async () => {
  const products = await loadProducts();
  return (
    <div>
      <Header />
      <h1 className="text-2xl font-bold">Panel de administrador</h1>
      <Button component="a" href="#as-link" startDecorator={<Add />}>
        NUEVO PRODUCTO
      </Button>
      <div className="text-textcolor flex gap-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
