import { useState } from "react";
import { Plus, Minus, X, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatBRL, type Product } from "@/lib/products";
import { toast } from "sonner";

const FLAVORS_TRADICIONAIS = ["Brigadeiro", "Ninho", "Beijinho", "Coco queimado", "Casadinho", "Churros"];
const FLAVORS_FINOS = ["Brigadeiro", "Ninho", "Beijinho", "Doce de leite", "Capuccino", "Maracujá"];
const FORMATS_FINOS = ["Flor", "Quadrado", "Trufa", "Diamante", "Coração"];
const COLORS: { id: string; label: string; hex: string }[] = [
  { id: "rosa", label: "Rosa", hex: "#f4a8c0" },
  { id: "azul", label: "Azul", hex: "#7bb3e8" },
  { id: "verde", label: "Verde", hex: "#8cc28c" },
  { id: "vermelho", label: "Vermelho", hex: "#d8504a" },
  { id: "laranja", label: "Laranja", hex: "#f0a05a" },
  { id: "marrom", label: "Marrom", hex: "#8b5a3c" },
  { id: "amarelo", label: "Amarelo", hex: "#f4d35e" },
  { id: "lilas", label: "Lilás", hex: "#b89cd9" },
];
const MIN_QTY = 50;

function isCustomizable(p: Product) {
  return p.category === "doces";
}

function isFinos(p: Product) {
  return p.id === "doces-finos";
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [open, setOpen] = useState(false);

  const customizable = isCustomizable(product);

  function handleClick() {
    if (customizable) {
      setOpen((v) => !v);
    } else {
      add(product);
      toast.success(`${product.name} adicionado à sacola.`);
    }
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.tags && product.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <span key={t} className="rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg leading-tight text-foreground">{product.name}</h3>
          {product.description && (
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">{product.description}</p>
          )}
        </div>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <div className="font-display text-xl font-semibold text-primary">{formatBRL(product.price)}</div>
            <div className="text-xs text-muted-foreground">por {product.unit}</div>
          </div>
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-burgundy-deep active:scale-95"
          >
            {open ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {open ? "Fechar" : "Fazer Encomenda"}
          </button>
        </div>

        {customizable && open && (
          <CustomizationPanel
            product={product}
            onClose={() => setOpen(false)}
            onAdded={() => setOpen(false)}
          />
        )}
      </div>
    </article>
  );
}

function CustomizationPanel({
  product,
  onClose,
  onAdded,
}: {
  product: Product;
  onClose: () => void;
  onAdded: () => void;
}) {
  const { add } = useCart();
  const finos = isFinos(product);
  const FLAVORS = finos ? FLAVORS_FINOS : FLAVORS_TRADICIONAIS;
  const unitPrice = product.price / 100; // price is per cento (100 un.)
  const [flavors, setFlavors] = useState<string[]>([]);
  const [formats, setFormats] = useState<string[]>([]);
  const [qty, setQty] = useState(MIN_QTY);
  const [color, setColor] = useState<string>("");
  const [notes, setNotes] = useState("");

  const total = qty * unitPrice;

  function toggleFlavor(f: string) {
    setFlavors((prev) => {
      if (prev.includes(f)) return prev.filter((x) => x !== f);
      if (prev.length >= 4) {
        toast.error("Máximo de 4 sabores.");
        return prev;
      }
      return [...prev, f];
    });
  }

  function toggleFormat(f: string) {
    setFormats((prev) => {
      if (prev.includes(f)) return prev.filter((x) => x !== f);
      if (prev.length >= 4) {
        toast.error("Máximo de 4 formatos.");
        return prev;
      }
      return [...prev, f];
    });
  }

  function handleQty(delta: number) {
    setQty((q) => Math.max(MIN_QTY, q + delta));
  }

  function handleAdd() {
    if (flavors.length === 0) return toast.error("Escolha pelo menos 1 sabor.");
    if (finos && formats.length === 0) return toast.error("Escolha pelo menos 1 formato.");
    if (!color) return toast.error("Escolha a cor das forminhas.");
    if (qty < MIN_QTY) return toast.error(`Pedido mínimo de ${MIN_QTY} unidades.`);
    add(product, qty, { flavors, color, notes, unitPrice, ...(finos ? { format: formats.join(", ") } : {}) });
    toast.success(`${qty} ${product.name} adicionados à sacola.`);
    onAdded();
  }

  return (
    <div className="mt-4 -mx-1 rounded-lg border border-border bg-secondary/30 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Personalize seu pedido</p>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Fechar">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Flavors */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Sabores</h4>
          <span className="text-[11px] text-muted-foreground">Escolha até 4 · {flavors.length}/4</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {FLAVORS.map((f) => {
            const active = flavors.includes(f);
            return (
              <button
                key={f}
                onClick={() => toggleFlavor(f)}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background hover:border-primary/40"
                }`}
              >
                {active && <Check className="h-3 w-3" />}
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Formats (Doces Finos only) */}
      {finos && (
        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <h4 className="text-sm font-semibold">Formatos</h4>
            <span className="text-[11px] text-muted-foreground">Escolha até 4 · {formats.length}/4</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FORMATS_FINOS.map((f) => {
              const active = formats.includes(f);
              return (
                <button
                  key={f}
                  onClick={() => toggleFormat(f)}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  {active && <Check className="h-3 w-3" />}
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      )}


      {/* Quantity */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Quantidade</h4>
          <span className="text-[11px] text-muted-foreground">Mín. {MIN_QTY} un. · {formatBRL(unitPrice)} cada</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-border bg-background">
            <button
              onClick={() => handleQty(-10)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary disabled:opacity-40"
              disabled={qty <= MIN_QTY}
              aria-label="Diminuir 10"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <input
              type="number"
              value={qty}
              min={MIN_QTY}
              step={10}
              onChange={(e) => {
                const v = parseInt(e.target.value || "0", 10);
                setQty(Number.isNaN(v) ? MIN_QTY : Math.max(MIN_QTY, v));
              }}
              className="w-16 bg-transparent text-center text-sm font-semibold outline-none"
            />
            <button
              onClick={() => handleQty(10)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
              aria-label="Aumentar 10"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="ml-auto text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div>
            <div className="font-display text-lg font-semibold text-primary">{formatBRL(total)}</div>
          </div>
        </div>
      </div>

      {/* Color */}
      <div className="mt-5">
        <h4 className="text-sm font-semibold">Cor das forminhas</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {COLORS.map((c) => {
            const active = color === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setColor(c.id)}
                title={c.label}
                aria-label={c.label}
                className={`relative h-8 w-8 rounded-full border-2 transition-all ${
                  active ? "border-primary scale-110" : "border-border hover:border-primary/40"
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {active && (
                  <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />
                )}
              </button>
            );
          })}
        </div>
        {color && (
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            Selecionada: <span className="font-medium capitalize">{color}</span>
          </p>
        )}
      </div>

      {/* Notes */}
      <div className="mt-5">
        <h4 className="text-sm font-semibold">Observação</h4>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value.slice(0, 280))}
          rows={2}
          className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <button
        onClick={handleAdd}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-burgundy-deep active:scale-[0.99]"
      >
        Adicionar à sacola · {formatBRL(total)}
      </button>
    </div>
  );
}
