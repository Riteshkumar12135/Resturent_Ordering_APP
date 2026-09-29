"use client";

import { useCart } from "@/context/CartContext";
import { MenuItem } from "@/types";

export function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 overflow-hidden bg-zinc-100">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold backdrop-blur">{item.category}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <span className="whitespace-nowrap font-black">₹{item.price}</span>
        </div>
        <p className="mt-2 min-h-10 text-sm leading-5 text-zinc-500">{item.description}</p>
        <button onClick={() => addItem(item)} className="mt-5 w-full rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-700">Add to cart</button>
      </div>
    </article>
  );
}
