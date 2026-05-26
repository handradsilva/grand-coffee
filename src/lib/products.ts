import brigadeiro from "@/assets/p-brigadeiro.jpg";
import macaron from "@/assets/p-macaron.jpg";
import boloChoc from "@/assets/p-bolo-choc.jpg";
import boloPote from "@/assets/p-bolo-pote.jpg";
import coxinha from "@/assets/p-coxinha.jpg";
import quiche from "@/assets/p-quiche.jpg";
import kitFesta from "@/assets/p-kit-festa.jpg";

export type Category = "doces" | "bolos" | "cupcakes" | "bem-casados" | "kits" | "combo-casamento";

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
  { id: "doces", label: "Doces", blurb: "doces tradicionais e finos" },
  { id: "bolos", label: "Bolos", blurb: "Bolos decorados e naked cake" },
  { id: "cupcakes", label: "Cupcakes", blurb: "Cupcakes recheados" },
  { id: "bem-casados", label: "Bem-Casados", blurb: "Lembrancinha ideal para seu evento" },
  { id: "kits", label: "Kit Festas", blurb: "Combos para celebrar" },
  { id: "combo-casamento", label: "Combo Casamento", blurb: "Celebre Conosco" },
];

export const products: Product[] = [
  { id: "doces-tradicionais", name: "Doces Tradicionais", category: "doces", price: 150, unit: "cento (100 un.)", description: "", image: brigadeiro, tags: ["mais vendido"], featured: true },
  { id: "doces-finos", name: "Doces Finos", category: "doces", price: 140, unit: "cento (100 un.)", description: "", image: macaron, featured: true },
  { id: "bolo-choc", name: "Bolo Decorado", category: "bolos", price: 110, unit: "1kg", description: "Bolos decorados com cobertura em Chantilly", image: boloChoc, featured: true },
  { id: "bolo-pote-tira", name: "Naked Cake", category: "bolos", price: 95, unit: "1kg", description: "Bolo no acetato", image: boloPote },
  { id: "cupcake-vanilla", name: "Cupcake de Baunilha", category: "cupcakes", price: 8, unit: "unidade", description: "Massa fofa de baunilha com buttercream artesanal e confeitos.", image: boloPote },
  { id: "cupcake-choc", name: "Cupcake de Chocolate", category: "cupcakes", price: 9, unit: "unidade", description: "Massa de cacau com cobertura de ganache e raspas de chocolate.", image: boloChoc },
  { id: "bem-casado", name: "Bem-Casado", category: "bem-casados", price: 4, unit: "unidade", description: "BEM-VIVIDO, BEM-NASCIDO, BEM-COMEMORADO, BEM-BATIZADO", image: macaron },
  { id: "kit-100", name: "Kit Festa — 100 docinhos", category: "kits", price: 320, unit: "kit", description: "Seleção variada de brigadeiros gourmet. Combine 4 sabores.", image: kitFesta, featured: true },
  { id: "kit-mix", name: "Kit Mix Doce & Salgado", category: "kits", price: 480, unit: "kit", description: "60 docinhos + 60 mini salgados. Ideal para 25 pessoas.", image: kitFesta },
];

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
