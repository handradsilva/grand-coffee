import docesTradicionais from "@/assets/doces-tradicionais-1.jpeg";
import docesFinos from "@/assets/doces-finos-1.jpeg";
import boloDecorado from "@/assets/bolo-decorado-1.jpeg";
import nakedCake from "@/assets/naked-cake-1.jpeg";
import vintageFloral from "@/assets/vintage-floral-00.jpeg";
import cupcakeImg from "@/assets/cupcake-1.jpeg";
import bemCasadoImg from "@/assets/bem-casado-1.jpeg";
import kitFesta1 from "@/assets/kit-festa-1-0.jpeg";
import kitFesta2 from "@/assets/kit-festa-2-1.jpeg";
import kitFesta3 from "@/assets/kit-festa-3-1.jpeg";
import comboCasamento from "@/assets/combo-casamento-1.jpeg";
import caixaDegustacao from "@/assets/p-caixa-degustacao.jpeg";
import mdRustica from "@/assets/p-mini-decor-rustica.jpeg";
import mdFestaCarrinho from "@/assets/p-mini-decor-festa-carrinho-1.jpeg";
import mdMesaRipada from "@/assets/p-mini-decor-mesa-ripada.jpeg";
import mdCarrinhoMesa from "@/assets/p-mini-decor-carrinho-mesa-2.jpeg";
import mdMinimalista from "@/assets/p-mini-decor-mesa-minimalista.jpeg";

export type Category = "doces" | "bolos" | "cupcakes" | "bem-casados" | "kits" | "combo-casamento" | "caixa-degustacao" | "mini-decor";

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
  { id: "caixa-degustacao", label: "Caixa Degustação", blurb: "Experimente nossos sabores" },
  { id: "mini-decor", label: "Mini Decor", blurb: "Decoração para sua festa" },
];

export const products: Product[] = [
  { id: "doces-tradicionais", name: "Doces Tradicionais", category: "doces", price: 150, unit: "cento (100 un.)", description: "15 gramas por unidade", image: brigadeiro, tags: ["mais vendido"], featured: true },
  { id: "doces-finos", name: "Doces Finos", category: "doces", price: 140, unit: "cento (100 un.)", description: "", image: macaron, featured: true },
  { id: "bolo-choc", name: "Bolo Decorado", category: "bolos", price: 110, unit: "1kg", description: "Bolos decorados com cobertura em Chantilly", image: boloChoc, featured: true },
  { id: "bolo-pote-tira", name: "Naked Cake", category: "bolos", price: 95, unit: "1kg", description: "Bolo no acetato", image: boloPote },
  { id: "bolo-vintage-floral", name: "Vintage e Floral", category: "bolos", price: 120, unit: "1kg", description: "Modelos vintage ou floral com acabamento manual em Chantilly", image: boloChoc },
  { id: "cupcake", name: "Cupcake", category: "cupcakes", price: 6, unit: "unidade", description: "", image: boloPote },
  { id: "bem-casado", name: "Bem-Casado", category: "bem-casados", price: 4, unit: "unidade", description: "BEM-VIVIDO, BEM-NASCIDO, BEM-COMEMORADO, BEM-BATIZADO", image: macaron },
  { id: "kit-festa-1", name: "Kit Festa 1", category: "kits", price: 200, unit: "a partir de 10 pessoas", description: "Bolo decorado, Doces e Salgados", image: kitFesta, featured: true },
  { id: "kit-festa-2", name: "Kit Festa 2", category: "kits", price: 160, unit: "a partir de 10 pessoas", description: "Naked Cake, Doces e Salgados", image: kitFesta },
  { id: "kit-festa-3", name: "Kit Festa 3", category: "kits", price: 170, unit: "a partir de 10 pessoas", description: "Bolo decorado, Doces e Cupcakes", image: kitFesta },
  { id: "combo-casamento", name: "Combo Casamento", category: "combo-casamento", price: 700, unit: "a partir de 30 convidados", description: "Bolo 2 andares + flores, bem-casados com tag , doces finos ou tradicionais. (Não incluso decoração)", image: kitFesta, featured: true },
  { id: "caixa-degustacao", name: "Caixa Degustação", category: "caixa-degustacao", price: 60, unit: "unidade", description: "", image: caixaDegustacao },
  { id: "mini-decor-rustica", name: "Decoração Rústica", category: "mini-decor", price: 400, unit: "evento", description: "", image: mdRustica },
  { id: "mini-decor-festa-carrinho", name: "Festa no Carrinho", category: "mini-decor", price: 210, unit: "evento", description: "", image: mdFestaCarrinho },
  { id: "mini-decor-mesa-ripada", name: "Mesa Ripada", category: "mini-decor", price: 230, unit: "evento", description: "", image: mdMesaRipada },
  { id: "mini-decor-carrinho-mesa", name: "Carrinho ou Mesa", category: "mini-decor", price: 245, unit: "evento", description: "", image: mdCarrinhoMesa },
  { id: "mini-decor-minimalista", name: "Mesa Minimalista", category: "mini-decor", price: 235, unit: "evento", description: "", image: mdMinimalista },
];

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
