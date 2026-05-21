import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { categories, products, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Grand Coffee Confeitaria" },
      { name: "description", content: "Conheça nossos bolos, brigadeiros, macarons, mini salgados e kits de festa. Encomende online." },
      { property: "og:title", content: "Cardápio — Grand Coffee" },
      { property: "og:description", content: "Bolos, doces finos, salgados e kits para festa." },
    ],
  }),
  component: Menu,
});

function Menu() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
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
          <Chip active={cat === "all"} onClick={() => setCat("all")}>Tudo</Chip>
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
