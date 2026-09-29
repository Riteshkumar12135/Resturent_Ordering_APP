"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { itemCount } = useCart();
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-black tracking-tight">Urban Crust<span className="text-orange-600">.</span></Link>
        <nav className="flex items-center gap-2 text-sm font-semibold">
          <Link href="/" className="rounded-full px-4 py-2 hover:bg-zinc-100">Menu</Link>
          <Link href="/admin" className="rounded-full px-4 py-2 hover:bg-zinc-100">Admin</Link>
          <Link href="/checkout" className="relative rounded-full bg-zinc-950 px-4 py-2 text-white hover:bg-zinc-800">
            Cart{itemCount > 0 && <span className="ml-2 rounded-full bg-orange-500 px-2 py-0.5 text-xs">{itemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
