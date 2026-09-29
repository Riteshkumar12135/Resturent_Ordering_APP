"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem, MenuItem } from "@/types";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("urban-crust-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      localStorage.removeItem("urban-crust-cart");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("urban-crust-cart", JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (item: MenuItem) => setItems(current => {
    const existing = current.find(i => i.id === item.id);
    if (existing) return current.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
    return [...current, { ...item, quantity: 1 }];
  });
  const increase = (id: number) => setItems(current => current.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  const decrease = (id: number) => setItems(current => current.flatMap(i => i.id !== id ? [i] : i.quantity > 1 ? [{ ...i, quantity: i.quantity - 1 }] : []));
  const remove = (id: number) => setItems(current => current.filter(i => i.id !== id));
  const clear = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return <CartContext.Provider value={{ items, addItem, increase, decrease, remove, clear, subtotal, tax, total, itemCount }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
