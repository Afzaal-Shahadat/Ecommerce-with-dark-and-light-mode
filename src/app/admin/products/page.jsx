import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ProductForm from '@/components/ProductForm';

export default async function AdminProducts() {
  const session = await auth();
  if (!session || session.user.role !== 'admin') redirect('/');

  await connectDB();
  const products = await Product.find().lean();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Admin – Products</h1>
        <ProductForm mode="create" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(p => (
            <TableRow key={p._id}>
              <TableCell>{p.title}</TableCell>
              <TableCell>${p.price}</TableCell>
              <TableCell className="flex gap-2">
                <ProductForm mode="edit" product={p} />
                <form action={async () => {
                  'use server';
                  await connectDB();
                  await Product.findByIdAndDelete(p._id);
                  // revalidatePath('/admin/products'); // optional
                }}>
                  <Button variant="destructive" size="sm" type="submit">Delete</Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}