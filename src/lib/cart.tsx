import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "./products";

export interface CartCustomization {
  notes: string;
  unitPrice: number;
  // Doces
  flavors?: string[];
  color?: string;
  colors?: string[];
  format?: string;
  // Bolo / Bem-Casado / Cupcake / Kit
  kind?: "doces" | "bolo" | "bem-casado" | "cupcake" | "kit";
  weightKg?: number;
  recheios?: string[];
  adicionais?: string[];
  cobertura?: string;
  fitaColor?: string;
  fitaColors?: string[];
  embalagem?: boolean;
  tag?: "com" | "sem";
  topper?: string;
  topperPrice?: number;
  toppers?: string[];
  toppersPrice?: number;
  extras?: string[];
  extrasPrice?: number;
  modelImage?: string; // data URL
  modelImageName?: string;
  // Kit Festa / Combo
  kitOptionLabel?: string;
  kitItems?: string[];
  finosRecheios?: string[];
  finosFormatos?: string[];
  cupcakeRecheios?: string[];
  docesTipo?: "finos" | "tradicionais";
  tradicionaisRecheios?: string[];
  bemCasadoRecheio?: string;
  comboColors?: string[];
  comboLocal?: string;
  comboCerimonialista?: string;
  coupleNames?: string;
}

export interface CartItem {
  lineId: string;
  product: Product;
  qty: number;
  customization?: CartCustomization;
}

interface CartCtx {
  items: CartItem[];
  add: (p: Product, qty?: number, customization?: CartCustomization) => void;
  remove: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "grandcoffee.cart.v3";

const unitPriceOf = (i: CartItem) => i.customization?.unitPrice ?? i.product.price;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add = (p: Product, qty = 1, customization?: CartCustomization) =>
    setItems((prev) => {
      if (customization) {
        return [...prev, { lineId: `${p.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, product: p, qty, customization }];
      }
      const i = prev.findIndex((x) => x.product.id === p.id && !x.customization);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { lineId: p.id, product: p, qty }];
    });

  const remove = (lineId: string) => setItems((p) => p.filter((x) => x.lineId !== lineId));
  const setQty = (lineId: string, qty: number) =>
    setItems((p) => p.map((x) => (x.lineId === lineId ? { ...x, qty: Math.max(1, qty) } : x)));
  const clear = () => setItems([]);

  const count = items.length;
  const subtotal = items.reduce((a, x) => a + x.qty * unitPriceOf(x), 0);

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}

export const cartUnitPrice = unitPriceOf;
