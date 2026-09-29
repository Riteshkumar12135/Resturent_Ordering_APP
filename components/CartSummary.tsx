"use client";

import { useCart } from "@/context/CartContext";

export function CartSummary({ compact = false }: { compact?: boolean }) {
  const { items, increase, decrease, remove, subtotal, tax, total } = useCart();
  if (!items.length) return <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-center text-zinc-500">Your cart is empty.</div>;
  return <div className="space-y-4">
    {items.map(item => <div key={item.id} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4">
      <img src={item.image} alt="" className="h-20 w-20 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-3"><p className="font-bold">{item.name}</p><p className="font-bold">₹{item.price * item.quantity}</p></div>
        {!compact && <p className="mt-1 text-sm text-zinc-500">₹{item.price} each</p>}
        <div className="mt-3 flex items-center gap-2">
          <button onClick={() => decrease(item.id)} className="h-8 w-8 rounded-lg border">−</button><span className="w-6 text-center text-sm font-bold">{item.quantity}</span><button onClick={() => increase(item.id)} className="h-8 w-8 rounded-lg border">+</button>
          <button onClick={() => remove(item.id)} className="ml-2 text-xs font-semibold text-red-600">Remove</button>
        </div>
      </div>
    </div>)}
    <div className="rounded-2xl bg-zinc-950 p-5 text-white">
      <div className="flex justify-between text-sm text-zinc-300"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
      <div className="mt-2 flex justify-between text-sm text-zinc-300"><span>Tax (5%)</span><span>₹{tax.toFixed(2)}</span></div>
      <div className="mt-4 flex justify-between border-t border-white/15 pt-4 text-lg font-black"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
    </div>
  </div>;
}
