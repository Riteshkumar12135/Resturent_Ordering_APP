"use client";

import { useMemo, useState } from "react";
import { orders as initialOrders } from "@/data/orders";
import { Order, OrderStatus } from "@/types";

const statuses: Array<"All" | OrderStatus> = ["All", "Pending", "Accepted", "Preparing", "Completed"];

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<"All" | OrderStatus>("All");
  const visible = useMemo(() => filter === "All" ? orders : orders.filter(o => o.status === filter), [orders, filter]);
  const updateStatus = (id: string, status: OrderStatus) => setOrders(current => current.map(o => o.id === id ? { ...o, status } : o));

  return <main className="mx-auto max-w-7xl px-5 py-12"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-widest text-orange-600">Admin</p><h1 className="mt-2 text-4xl font-black">Order management</h1><p className="mt-2 text-zinc-500">Review sample orders and update their status.</p></div><div className="flex gap-2 overflow-x-auto pb-1">{statuses.map(status => <button key={status} onClick={() => setFilter(status)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${filter === status ? "bg-zinc-950 text-white" : "bg-white"}`}>{status}</button>)}</div></div>
    <div className="mt-8 space-y-4">{visible.map(order => <article key={order.id} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:p-6"><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div><div className="flex flex-wrap items-center gap-3"><h2 className="font-black">{order.id}</h2><StatusBadge status={order.status} /></div><p className="mt-2 font-semibold">{order.customerName}</p><p className="text-sm text-zinc-500">{order.mobile} • {order.email}</p><p className="mt-1 text-sm text-zinc-500">{order.address}</p></div><div className="text-left lg:text-right"><p className="text-sm text-zinc-500">Total</p><p className="text-2xl font-black">₹{order.total.toFixed(2)}</p><p className="mt-1 text-xs text-zinc-400">{new Date(order.createdAt).toLocaleString()}</p></div></div><div className="mt-5 flex flex-col gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:items-center sm:justify-between"><div className="text-sm"><span className="font-bold">Order details:</span> {order.items.length ? order.items.map(i => `${i.name} × ${i.quantity}`).join(", ") : "Sample order items"}</div><select value={order.status} onChange={e => updateStatus(order.id, e.target.value as OrderStatus)} className="rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-bold outline-none focus:border-orange-500">{statuses.slice(1).map(s => <option key={s}>{s}</option>)}</select></div></article>)}{visible.length === 0 && <div className="rounded-3xl bg-white p-10 text-center text-zinc-500">No orders match this status.</div>}</div>
  </main>;
}

function StatusBadge({ status }: { status: OrderStatus }) { return <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">{status}</span>; }
