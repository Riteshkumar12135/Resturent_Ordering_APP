"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CartSummary } from "@/components/CartSummary";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal, tax, total, clear } = useCart();
  const [submitted, setSubmitted] = useState("");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setPlacing(true);
    const form = new FormData(event.currentTarget);
    const payload = {
      customerName: String(form.get("customerName")), mobile: String(form.get("mobile")), email: String(form.get("email")), address: String(form.get("address")),
      items, subtotal, tax, total
    };
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Order could not be placed");
      clear(); setSubmitted(data.order.id);
    } catch (e) { setError(e instanceof Error ? e.message : "Something went wrong. Please try again."); }
    finally { setPlacing(false); }
  }

  if (submitted) return <main className="mx-auto flex min-h-[75vh] max-w-3xl items-center px-5 py-16"><div className="w-full rounded-3xl bg-white p-8 text-center shadow-sm md:p-12"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">✓</div><p className="mt-5 text-sm font-bold uppercase tracking-widest text-green-600">Order confirmed</p><h1 className="mt-2 text-4xl font-black">Thank you for your order!</h1><p className="mx-auto mt-4 max-w-lg text-zinc-500">Your order <strong>{submitted}</strong> has been received successfully. We’ll start preparing it shortly.</p><Link href="/" className="mt-8 inline-block rounded-xl bg-zinc-950 px-5 py-3 font-bold text-white">Back to menu</Link></div></main>;

  return <main className="mx-auto max-w-7xl px-5 py-12"><div className="mb-10"><p className="text-sm font-bold uppercase tracking-widest text-orange-600">Checkout</p><h1 className="mt-2 text-4xl font-black">Complete your order</h1></div>
    {items.length === 0 ? <div className="rounded-3xl bg-white p-10 text-center"><h2 className="text-2xl font-black">Your cart is empty</h2><p className="mt-2 text-zinc-500">Add something delicious before checking out.</p><Link href="/" className="mt-6 inline-block rounded-xl bg-orange-600 px-5 py-3 font-bold text-white">Browse menu</Link></div> :
      <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-black">Customer details</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="text-sm font-bold">Full name<input required name="customerName" minLength={2} className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-orange-500" placeholder="Your name" /></label>
            <label className="text-sm font-bold">Mobile number<input required name="mobile" pattern="[0-9]{10}" title="Enter a 10-digit mobile number" className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-orange-500" placeholder="10-digit number" /></label>
            <label className="text-sm font-bold md:col-span-2">Email<input required type="email" name="email" className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-orange-500" placeholder="you@example.com" /></label>
            <label className="text-sm font-bold md:col-span-2">Delivery address<textarea required name="address" minLength={10} rows={4} className="mt-2 w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-orange-500" placeholder="House, street, area, city" /></label>
          </div>
          {error && <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
          <button disabled={placing} className="mt-7 w-full rounded-xl bg-orange-600 px-5 py-3.5 font-bold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60">{placing ? "Placing order..." : `Place order • ₹${total.toFixed(2)}`}</button>
        </form>
        <aside><h2 className="mb-4 text-xl font-black">Your order</h2><CartSummary compact /></aside>
      </div>}
  </main>;
}
