import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux'; // client part
import { addToCart } from '@/lib/store';

export default async function ProductDetail({ params }) {
  await connectDB();
  let product;
  try {
    product = await Product.findById(params.id).lean();
  } catch (e) {}
  if (!product) notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold">{product.title}</h1>
      <p className="text-3xl my-4">${product.price}</p>
      <p className="text-lg">{product.description}</p>

      {/* Client part for add to cart */}
      <ClientAdd product={product} />
    </div>
  );
}

function ClientAdd({ product }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const handleAdd = () => {
    if (!session) return alert('Login required');
    dispatch(addToCart(product));
  };

  return <Button onClick={handleAdd} className="mt-6">Add to Cart</Button>;
}