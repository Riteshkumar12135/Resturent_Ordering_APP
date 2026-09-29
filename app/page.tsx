"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MenuCard } from "@/components/MenuCard";
import { useCart } from "@/context/CartContext";
import { Category, MenuItem } from "@/types";

const categories: Array<"All" | Category> = ["All", "Pizza", "Burgers", "Beverages", "Desserts"];

export default function HomePage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | Category>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { itemCount } = useCart();

  useEffect(() => {
    fetch("/api/menu")
      .then(r => { if (!r.ok) throw new Error("Could not load menu"); return r.json(); })
      .then(data => setMenu(data.items))
      .catch(() => setError("We couldn't load the menu. Please refresh and try again."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => menu.filter(item =>
    (category === "All" || item.category === category) &&
    item.name.toLowerCase().includes(query.toLowerCase())
  ), [menu, category, query]);

  return <main>
    <section className="bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_.8fr] md:items-center md:py-24">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-orange-400">Fresh • Fast • Local</p>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">Good food,<br /><span className="text-orange-500">no waiting.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-300">Order handcrafted pizzas, burgers, drinks and desserts from Urban Crust Kitchen. Built for a quick, simple online ordering experience.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="rounded-xl bg-orange-600 px-5 py-3 font-bold hover:bg-orange-700">Explore menu</a>
            <Link href="/checkout" className="rounded-xl border border-white/20 px-5 py-3 font-bold hover:bg-white/10">View cart {itemCount > 0 ? `(${itemCount})` : ""}</Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85" alt="Fresh pizza" className="h-80 w-full rounded-[1.5rem] object-cover md:h-[430px]" />
        </div>
      </div>
    </section>

    <section id="menu" className="mx-auto max-w-7xl px-5 py-14">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><p className="text-sm font-bold uppercase tracking-widest text-orange-600">Our menu</p><h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Pick your favourites</h2></div>
        <div className="relative w-full md:max-w-sm"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search dishes..." className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" /></div>
      </div>
      <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
        {categories.map(item => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${category === item ? "bg-zinc-950 text-white" : "bg-white text-zinc-600 hover:bg-zinc-100"}`}>{item}</button>)}
      </div>
      {loading && <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3"><div className="h-96 animate-pulse rounded-3xl bg-zinc-200" /><div className="h-96 animate-pulse rounded-3xl bg-zinc-200" /><div className="h-96 animate-pulse rounded-3xl bg-zinc-200" /></div>}
      {error && <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">{error}</div>}
      {!loading && !error && filtered.length === 0 && <div className="mt-8 rounded-2xl bg-white p-10 text-center text-zinc-500">No dishes match your search.</div>}
      {!loading && !error && filtered.length > 0 && <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(item => <MenuCard key={item.id} item={item} />)}</div>}
    </section>
  </main>;
}
