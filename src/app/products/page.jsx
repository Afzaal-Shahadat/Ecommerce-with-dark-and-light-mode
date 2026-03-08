import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find().lean();

  return (
    <div>
      <h1 className="text-3xl mb-6">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}