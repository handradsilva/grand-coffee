import brigadeiro from "@/assets/p-brigadeiro.jpg";
import macaron from "@/assets/p-macaron.jpg";
import boloChoc from "@/assets/p-bolo-choc.jpg";
import boloPote from "@/assets/p-bolo-pote.jpg";
import coxinha from "@/assets/p-coxinha.jpg";
import quiche from "@/assets/p-quiche.jpg";
import kitFesta from "@/assets/p-kit-festa.jpg";

export type Category = "doces" | "bolos" | "cupcakes" | "bem-casados" | "kits";

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
  { id: "cupcakes", label: "Cupcakes", blurb: "Sabores artesanais decorados" },
  { id: "bem-casados", label: "Bem-Casados", blurb: "O doce do casamento" },
  { id: "kits", label: "Kit Festas", blurb: "Combos para celebrar" },
];

export const products: Product[] = [
  { id: "brig-belga", name: "Brigadeiro Belga", category: "doces", price: 4.5, unit: "unidade", description: "Ganache de chocolate belga 70% finalizado com granulado artesanal.", image: brigadeiro, tags: ["mais vendido"], featured: true },
  { id: "macaron-cx6", name: "Macarons — Caixa com 6", category: "doces", price: 48, unit: "caixa", description: "Seleção francesa: pistache, framboesa, baunilha, café, chocolate e limão siciliano.", image: macaron, tags: ["sem glúten"], featured: true },
  { id: "bolo-choc", name: "Bolo Chocolate Intenso", category: "bolos", price: 165, unit: "1,5kg", description: "Massa úmida de cacau, ganache meio-amargo e framboesas frescas. Serve 12.", image: boloChoc, featured: true },
  { id: "bolo-pote-tira", name: "Bolo de Pote Tiramisu", category: "bolos", price: 18, unit: "300ml", description: "Camadas de bolo de café, creme mascarpone e cacau em pó.", image: boloPote },
  { id: "cupcake-vanilla", name: "Cupcake de Baunilha", category: "cupcakes", price: 8, unit: "unidade", description: "Massa fofa de baunilha com buttercream artesanal e confeitos.", image: boloPote },
  { id: "cupcake-choc", name: "Cupcake de Chocolate", category: "cupcakes", price: 9, unit: "unidade", description: "Massa de cacau com cobertura de ganache e raspas de chocolate.", image: boloChoc },
  { id: "bem-casado-trad", name: "Bem-Casado Tradicional", category: "bem-casados", price: 5, unit: "unidade", description: "Dois mini bolos de massa aerada com recheio de doce de leite. Embalagem individual.", image: macaron },
  { id: "bem-casado-premium", name: "Bem-Casado Premium", category: "bem-casados", price: 7.5, unit: "unidade", description: "Massa de nozes com recheio de brigadeiro branco e damasco. Acabamento em renda com fita de cetim.", image: brigadeiro },
  { id: "kit-100", name: "Kit Festa — 100 docinhos", category: "kits", price: 320, unit: "kit", description: "Seleção variada de brigadeiros gourmet. Combine 4 sabores.", image: kitFesta, featured: true },
  { id: "kit-mix", name: "Kit Mix Doce & Salgado", category: "kits", price: 480, unit: "kit", description: "60 docinhos + 60 mini salgados. Ideal para 25 pessoas.", image: kitFesta },
];

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
