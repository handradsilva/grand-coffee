import brigadeiro from "@/assets/p-brigadeiro.jpg";
import macaron from "@/assets/p-macaron.jpg";
import boloChoc from "@/assets/p-bolo-choc.jpg";
import boloPote from "@/assets/p-bolo-pote.jpg";
import coxinha from "@/assets/p-coxinha.jpg";
import quiche from "@/assets/p-quiche.jpg";
import kitFesta from "@/assets/p-kit-festa.jpg";

export type Category = "doces" | "bolos" | "salgados" | "kits";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  unit: string;
  description: string;
  image: string;
  tags?: string[];
  featured?: boolean;
}

export const categories: { id: Category; label: string; blurb: string }[] = [
  { id: "doces", label: "Doces", blurb: "Brigadeiros, macarons e mais" },
  { id: "bolos", label: "Bolos", blurb: "Inteiros, fatias e potes" },
  { id: "salgados", label: "Mini Salgados", blurb: "Para todo evento" },
  { id: "kits", label: "Kit Festas", blurb: "Combos para celebrar" },
];

export const products: Product[] = [
  { id: "brig-belga", name: "Brigadeiro Belga", category: "doces", price: 4.5, unit: "unidade", description: "Ganache de chocolate belga 70% finalizado com granulado artesanal.", image: brigadeiro, tags: ["mais vendido"], featured: true },
  { id: "macaron-cx6", name: "Macarons — Caixa com 6", category: "doces", price: 48, unit: "caixa", description: "Seleção francesa: pistache, framboesa, baunilha, café, chocolate e limão siciliano.", image: macaron, tags: ["sem glúten"], featured: true },
  { id: "bolo-choc", name: "Bolo Chocolate Intenso", category: "bolos", price: 165, unit: "1,5kg", description: "Massa úmida de cacau, ganache meio-amargo e framboesas frescas. Serve 12.", image: boloChoc, featured: true },
  { id: "bolo-pote-tira", name: "Bolo de Pote Tiramisu", category: "bolos", price: 18, unit: "300ml", description: "Camadas de bolo de café, creme mascarpone e cacau em pó.", image: boloPote },
  { id: "coxinha-mini", name: "Mini Coxinha Cremosa", category: "salgados", price: 3.2, unit: "unidade", description: "Recheio cremoso de frango com requeijão. Pedido mínimo 30 unidades.", image: coxinha },
  { id: "quiche-mini", name: "Mini Quiche Lorraine", category: "salgados", price: 5.5, unit: "unidade", description: "Massa amanteigada com bacon, alho-poró e gruyère.", image: quiche },
  { id: "kit-100", name: "Kit Festa — 100 docinhos", category: "kits", price: 320, unit: "kit", description: "Seleção variada de brigadeiros gourmet. Combine 4 sabores.", image: kitFesta, featured: true },
  { id: "kit-mix", name: "Kit Mix Doce & Salgado", category: "kits", price: 480, unit: "kit", description: "60 docinhos + 60 mini salgados. Ideal para 25 pessoas.", image: kitFesta },
];

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
