'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function ProductForm({ mode = 'create', product = {} }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: product.title || '',
    price: product.price || '',
    description: product.description || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { ...form, price: Number(form.price) };

    let res;
    if (mode === 'create') {
      res = await fetch('/api/products', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
    } else {
      res = await fetch(`/api/products/${product._id}`, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
    }

    if (res.ok) {
      setOpen(false);
      router.refresh(); // or revalidatePath
    } else {
      alert('Error');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{mode === 'create' ? 'Add Product' : 'Edit'}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Add New Product' : 'Edit Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          </div>
          <div>
            <Label>Price</Label>
            <Input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}