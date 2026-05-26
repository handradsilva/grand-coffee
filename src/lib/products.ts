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
  { id: "bolo-vintage-floral", name: "Vintage e Floral", category: "bolos", price: 115, unit: "1kg", description: "Modelos vintage ou floral com acabamento manual em Chantilly", image: boloChoc },
  { id: "cupcake", name: "Cupcake", category: "cupcakes", price: 6, unit: "unidade", description: "", image: boloPote },
  { id: "bem-casado", name: "Bem-Casado", category: "bem-casados", price: 4, unit: "unidade", description: "BEM-VIVIDO, BEM-NASCIDO, BEM-COMEMORADO, BEM-BATIZADO", image: macaron },
  { id: "kit-festa-1", name: "Kit Festa 1", category: "kits", price: 200, unit: "a partir de 10 pessoas", description: "", image: kitFesta, featured: true },
  { id: "kit-festa-2", name: "Kit Festa 2", category: "kits", price: 160, unit: "a partir de 10 pessoas", description: "", image: kitFesta },
  { id: "kit-festa-3", name: "Kit Festa 3", category: "kits", price: 170, unit: "a partir de 10 pessoas", description: "", image: kitFesta },
];

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
