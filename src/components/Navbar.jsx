'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const cartItems = useSelector(state => state.cart.items);

  return (
    <nav className="border-b p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">My Shop</Link>

      <div className="flex gap-6 items-center">
        <Link href="/products">Products</Link>
        <Link href="/cart">Cart ({cartItems.length})</Link>

        {session ? (
          <>
            {session.user.role === 'admin' && <Link href="/admin/products">Admin</Link>}
            <span>{session.user.name}</span>
            <Button variant="outline" onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}

        <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </Button>
      </div>
    </nav>
  );
}