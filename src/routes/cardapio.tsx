import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { categories, products, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Grand Coffee Confeitaria" },
      { name: "description", content: "Conheça nossos bolos, brigadeiros, macarons, cupcakes, bem-casados, kits e combos de casamento. Encomende online." },
      { property: "og:title", content: "Cardápio — Grand Coffee" },
      { property: "og:description", content: "Bolos, doces, cupcakes, bem-casados, kits e combos de casamento." },
    ],
  }),
  component: Menu,
});

function Menu() {
  const [cat, setCat] = useState<Category>(categories[0].id);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (p.category !== cat) return false;
      if (q && !`${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [cat, q]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Cardápio</p>
        <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">Nosso menu artesanal</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Receitas autorais, ingredientes selecionados e o capricho de quem ama o que faz.
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-5 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          
          {categories.map((c) => (
            <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>{c.label}</Chip>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar..."
            className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {cat === "mini-decor" && (
        <div className="mt-10 rounded-lg border border-primary/30 bg-cream/60 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Antes de reservar — leia com atenção</p>
          <h2 className="mt-2 font-display text-2xl text-foreground">Informações</h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground">
            Nosso acervo de boleiras, jarros e doceiras conta com 20 cores disponíveis. As fotos a seguir são apenas exemplos. Iremos montar a sua mesa de acordo com a sua paleta de cores ou tema. Enviamos foto para aprovação.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2"><span className="text-primary">•</span><span>A reserva será feita após o pagamento de 50% do valor e o restante a ser pago no dia da entrega.</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span>Todos os itens devem ser devolvidos, não são para venda, apenas aluguel.</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span>A montagem é feita no local do evento e logo após a festa, é feito a retirada.</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span>As nossas mesas não podem ser expostas a água, umidade, tintas e nem a objetos cortantes.</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span>Fazemos entrega somente na cidade de São Luís, de segunda a domingo, 7:00h às 18:00h.</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span>Nos informe o dia, horário e local da sua festa para que possamos ver direitinho a disponibilidade.</span></li>
            <li className="flex gap-2"><span className="text-primary">•</span><span>Pedimos que faça a sua reserva com no mínimo 2 dias de antecedência para que possamos organizar e deixar tudo lindo para a sua festa.</span></li>
          </ul>
        </div>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-md border border-dashed border-border p-16 text-center">
          <p className="font-display text-2xl text-foreground">Nada encontrado</p>
          <p className="mt-2 text-sm text-muted-foreground">Tente outro termo ou categoria.</p>
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}
