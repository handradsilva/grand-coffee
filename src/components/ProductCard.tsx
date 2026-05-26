import { useState, useRef } from "react";
import { Plus, Minus, X, Check, Upload, Image as ImageIcon } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatBRL, type Product } from "@/lib/products";
import { toast } from "sonner";

const FLAVORS_TRADICIONAIS = ["Brigadeiro", "Ninho", "Beijinho", "Coco queimado", "Casadinho", "Churros"];
const FLAVORS_FINOS = ["Brigadeiro", "Ninho", "Beijinho", "Doce de leite", "Capuccino", "Maracujá"];
const FORMATS_FINOS = ["Flor", "Quadrado", "Trufa", "Diamante", "Coração"];
const COLORS: { id: string; label: string; hex: string }[] = [
  { id: "azul-marinho", label: "Azul marinho", hex: "#1a237e" },
  { id: "azul-claro", label: "Azul claro", hex: "#7bb3e8" },
  { id: "rosa-pink", label: "Rosa pink", hex: "#e91e63" },
  { id: "rosa-claro", label: "Rosa claro", hex: "#f4a8c0" },
  { id: "amarelo", label: "Amarelo", hex: "#f4d35e" },
  { id: "verde-bandeira", label: "Verde bandeira", hex: "#2e7d32" },
  { id: "verde-agua", label: "Verde água", hex: "#8ed1c4" },
  { id: "lilas", label: "Lilás", hex: "#b89cd9" },
  { id: "laranja", label: "Laranja", hex: "#f0a05a" },
  { id: "vermelho", label: "Vermelho", hex: "#d8504a" },
  { id: "marrom", label: "Marrom", hex: "#8b5a3c" },
  { id: "branco", label: "Branco", hex: "#f8f8f8" },
  { id: "preto", label: "Preto", hex: "#1a1a1a" },
];
const MIN_QTY = 50;

// Bolo
const BOLO_ADICIONAIS = ["Morango", "Castanha", "Ameixa", "Nutella", "Geleia de morango"];
const BOLO_ADICIONAL_PRICE = 20;
const NAKED_EMBALAGEM_PRICE = 3;

const BOLO_TOPPERS: { id: string; label: string; price: number }[] = [
  { id: "sem", label: "Sem topper", price: 0 },
  { id: "tematico", label: "Topper Temático", price: 20 },
  { id: "simples", label: "Topper Simples (Nome + Idade ou Happy Birthday)", price: 15 },
  { id: "flores", label: "Topper (Nome + Idade + Flores de papel)", price: 25 },
];

const FITA_COLORS: { id: string; label: string; hex: string }[] = [
  { id: "rosa-pink", label: "Rosa pink", hex: "#e91e63" },
  { id: "rosa-claro", label: "Rosa claro", hex: "#f4a8c0" },
  { id: "amarelo", label: "Amarelo", hex: "#f4d35e" },
  { id: "verde-bandeira", label: "Verde bandeira", hex: "#2e7d32" },
  { id: "verde-agua", label: "Verde água", hex: "#8ed1c4" },
  { id: "azul-marinho", label: "Azul marinho", hex: "#1a237e" },
  { id: "azul-claro", label: "Azul claro", hex: "#7bb3e8" },
  { id: "laranja", label: "Laranja", hex: "#f0a05a" },
  { id: "marrom", label: "Marrom", hex: "#8b5a3c" },
  { id: "vermelho", label: "Vermelho", hex: "#d8504a" },
  { id: "lilas", label: "Lilás", hex: "#b89cd9" },
];

interface BoloConfig {
  basePrice: number;
  stepKg: number;
  stepPrice: number;
  recheios: string[];
  maxRecheios: number;
  coberturas?: string[];
  showFita?: boolean;
  showAdicionais?: boolean;
  showModelImage?: boolean;
  showEmbalagem?: boolean;
  massaHeader?: string;
}

const BOLO_CONFIGS: Record<string, BoloConfig> = {
  "bolo-choc": {
    basePrice: 110,
    stepKg: 0.5,
    stepPrice: 55,
    recheios: ["Brigadeiro", "Ninho", "Beijinho", "Doce de leite", "Abacaxi", "Capuccino", "Maracujá", "Palha italiana", "Oreo"],
    maxRecheios: 2,
    showAdicionais: true,
    showModelImage: true,
    massaHeader: "Massa Amanteigada com Margarina e Cobertura em Chantilly",
  },
  "bolo-pote-tira": {
    basePrice: 95,
    stepKg: 0.5,
    stepPrice: 47.5,
    recheios: ["Brigadeiro", "Ninho", "Beijinho", "Doce de leite", "Abacaxi", "Maracujá"],
    maxRecheios: 2,
    coberturas: ["Brigadeiro", "Ninho", "Doce de leite"],
    showFita: true,
    showEmbalagem: true,
  },
};

// Bem-Casado
const BEM_CASADO_RECHEIOS = ["Brigadeiro", "Ninho", "Beijinho", "Doce de leite"];
const BEM_CASADO_FITAS: { id: string; label: string; hex: string }[] = [
  { id: "rosa-claro", label: "Rosa claro", hex: "#f4a8c0" },
  { id: "rosa-pink", label: "Rosa pink", hex: "#e91e63" },
  { id: "rose", label: "Rosé", hex: "#d4a5a5" },
  { id: "azul-claro", label: "Azul claro", hex: "#7bb3e8" },
  { id: "azul-bebe", label: "Azul bebê", hex: "#bcd9ef" },
  { id: "azul-marinho", label: "Azul marinho", hex: "#1a237e" },
  { id: "verde-bandeira", label: "Verde bandeira", hex: "#2e7d32" },
  { id: "verde-oliva", label: "Verde oliva", hex: "#708238" },
  { id: "verde-agua", label: "Verde água", hex: "#8ed1c4" },
  { id: "amarelo", label: "Amarelo", hex: "#f4d35e" },
  { id: "dourado", label: "Dourado", hex: "#c9a84c" },
  { id: "branco", label: "Branco", hex: "#f8f8f8" },
  { id: "laranja", label: "Laranja", hex: "#f0a05a" },
  { id: "vermelho", label: "Vermelho", hex: "#d8504a" },
  { id: "marsala", label: "Marsala", hex: "#8a3a3a" },
  { id: "lilas", label: "Lilás", hex: "#b89cd9" },
  { id: "roxo", label: "Roxo", hex: "#6a3d9a" },
  { id: "marrom", label: "Marrom", hex: "#8b5a3c" },
  { id: "bege", label: "Bege", hex: "#d8c4a0" },
  { id: "preto", label: "Preto", hex: "#1a1a1a" },
];
const BEM_CASADO_MIN = 30;

// Cupcake
const CUPCAKE_RECHEIOS = ["Brigadeiro", "Ninho", "Beijinho", "Doce de leite"];
const CUPCAKE_COLORS: { id: string; label: string; hex: string }[] = [
  { id: "branco", label: "Branco", hex: "#f8f8f8" },
  { id: "rosa-claro", label: "Rosa claro", hex: "#f4a8c0" },
  { id: "rosa-pink", label: "Rosa pink", hex: "#e91e63" },
  { id: "azul-claro", label: "Azul claro", hex: "#7bb3e8" },
  { id: "azul-marinho", label: "Azul marinho", hex: "#1a237e" },
  { id: "preto", label: "Preto", hex: "#1a1a1a" },
  { id: "verde-agua", label: "Verde água", hex: "#8ed1c4" },
  { id: "verde-bandeira", label: "Verde bandeira", hex: "#2e7d32" },
  { id: "amarelo", label: "Amarelo", hex: "#f4d35e" },
  { id: "laranja", label: "Laranja", hex: "#f0a05a" },
  { id: "vermelho", label: "Vermelho", hex: "#d8504a" },
  { id: "marrom", label: "Marrom", hex: "#8b5a3c" },
  { id: "lilas", label: "Lilás", hex: "#b89cd9" },
  { id: "roxo", label: "Roxo", hex: "#6a3d9a" },
];
const CUPCAKE_MIN = 6;

// Kit Festa
interface KitOption { id: string; label: string; price: number; items: string[] }
interface KitConfig {
  title: string;
  options: KitOption[];
  note: string;
  boloRecheios: string[];
  maxBoloRecheios: number;
  coberturas?: string[];
  finos: boolean;
  cupcake: boolean;
}
const KIT_CONFIGS: Record<string, KitConfig> = {
  "kit-festa-1": {
    title: "Kit Festa 1",
    options: [
      { id: "10p", label: "10 pessoas", price: 200, items: ["Bolo 1kg", "Topo Impresso", "30 doces", "50 salgados"] },
      { id: "15p", label: "15 pessoas", price: 260, items: ["Bolo 1,5kg", "Topo Impresso", "40 doces", "50 salgados"] },
      { id: "20p", label: "20 pessoas", price: 360, items: ["Bolo 2kg", "Topo Impresso", "50 doces", "100 salgados"] },
      { id: "30p", label: "30 pessoas", price: 520, items: ["Bolo 3kg", "Topo Impresso", "100 doces", "100 salgados"] },
    ],
    note: "Acompanha bolo decorado em chantininho e topo impresso. Não incluso: bolo de 2 andares, vintage e floral cake, cores prata e dourado para bolo e forminhas.",
    boloRecheios: BOLO_CONFIGS["bolo-choc"].recheios,
    maxBoloRecheios: 2,
    finos: true,
    cupcake: false,
  },
  "kit-festa-2": {
    title: "Kit Festa 2",
    options: [
      { id: "10p", label: "10 pessoas", price: 160, items: ["Naked 1kg", "20 doces", "50 salgados"] },
      { id: "15p", label: "15 pessoas", price: 205, items: ["Naked 1,5kg", "25 doces", "50 salgados"] },
      { id: "20p", label: "20 pessoas", price: 255, items: ["Naked 2kg", "30 doces", "50 salgados"] },
      { id: "30p", label: "30 pessoas", price: 410, items: ["Naked 3kg", "50 doces", "100 salgados"] },
    ],
    note: "Acompanha Naked Cake no acetato. Modelo padrão. Não incluso topo personalizado.",
    boloRecheios: BOLO_CONFIGS["bolo-pote-tira"].recheios,
    maxBoloRecheios: 2,
    coberturas: BOLO_CONFIGS["bolo-pote-tira"].coberturas,
    finos: true,
    cupcake: false,
  },
  "kit-festa-3": {
    title: "Kit Festa 3",
    options: [
      { id: "10p", label: "10 pessoas", price: 170, items: ["Bolo 1kg", "Topo Impresso", "20 doces", "5 cupcakes com tag"] },
      { id: "20p", label: "20 pessoas", price: 320, items: ["Bolo 2kg", "Topo Impresso", "50 doces", "10 cupcakes com tag"] },
      { id: "30p", label: "30 pessoas", price: 520, items: ["Bolo 3kg", "Topo Impresso", "100 doces", "15 cupcakes com tag"] },
    ],
    note: "Acompanha bolo decorado em chantininho e topper impresso. Não incluso: bolo de 2 andares, vintage e floral cake, cor prata e dourado para bolo e forminhas.",
    boloRecheios: BOLO_CONFIGS["bolo-choc"].recheios,
    maxBoloRecheios: 2,
    finos: true,
    cupcake: true,
  },
};

function isDoces(p: Product) {
  return p.category === "doces";
}
function isBolo(p: Product) {
  return p.id in BOLO_CONFIGS;
}
function isBemCasado(p: Product) {
  return p.id === "bem-casado";
}
function isCupcake(p: Product) {
  return p.category === "cupcakes";
}
function isKit(p: Product) {
  return p.id in KIT_CONFIGS;
}
function isCustomizable(p: Product) {
  return isDoces(p) || isBolo(p) || isBemCasado(p) || isCupcake(p) || isKit(p);
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
          isBolo(product) ? (
            <BoloCustomizationPanel product={product} onClose={() => setOpen(false)} onAdded={() => setOpen(false)} />
          ) : isBemCasado(product) ? (
            <BemCasadoCustomizationPanel product={product} onClose={() => setOpen(false)} onAdded={() => setOpen(false)} />
          ) : isCupcake(product) ? (
            <CupcakeCustomizationPanel product={product} onClose={() => setOpen(false)} onAdded={() => setOpen(false)} />
          ) : (
            <CustomizationPanel product={product} onClose={() => setOpen(false)} onAdded={() => setOpen(false)} />
          )
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
  const unitPrice = product.price / 100;
  const [flavors, setFlavors] = useState<string[]>([]);
  const [formats, setFormats] = useState<string[]>([]);
  const [qty, setQty] = useState(MIN_QTY);
  const [colors, setColors] = useState<string[]>([]);
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

  function toggleColor(id: string) {
    setColors((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) {
        toast.error("Máximo de 2 cores.");
        return prev;
      }
      return [...prev, id];
    });
  }

  function handleAdd() {
    if (flavors.length === 0) return toast.error("Escolha pelo menos 1 sabor.");
    if (finos && formats.length === 0) return toast.error("Escolha pelo menos 1 formato.");
    if (colors.length === 0) return toast.error("Escolha pelo menos 1 cor das forminhas.");
    if (qty < MIN_QTY) return toast.error(`Pedido mínimo de ${MIN_QTY} unidades.`);
    add(product, qty, { kind: "doces", flavors, colors, notes, unitPrice, ...(finos ? { format: formats.join(", ") } : {}) });
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

      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Sabores</h4>
          <span className="text-[11px] text-muted-foreground">Escolha até 4 · {flavors.length}/4</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {FLAVORS.map((f) => {
            const active = flavors.includes(f);
            return (
              <button key={f} onClick={() => toggleFlavor(f)} className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"}`}>
                {active && <Check className="h-3 w-3" />}
                {f}
              </button>
            );
          })}
        </div>
      </div>

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
                <button key={f} onClick={() => toggleFormat(f)} className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"}`}>
                  {active && <Check className="h-3 w-3" />}
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Quantidade</h4>
          <span className="text-[11px] text-muted-foreground">Mín. {MIN_QTY} un. · {formatBRL(unitPrice)} cada</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-border bg-background">
            <button onClick={() => handleQty(-10)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary disabled:opacity-40" disabled={qty <= MIN_QTY} aria-label="Diminuir 10">
              <Minus className="h-3.5 w-3.5" />
            </button>
            <input type="number" value={qty} min={MIN_QTY} step={10} onChange={(e) => {
              const v = parseInt(e.target.value || "0", 10);
              setQty(Number.isNaN(v) ? MIN_QTY : Math.max(MIN_QTY, v));
            }} className="w-16 bg-transparent text-center text-sm font-semibold outline-none" />
            <button onClick={() => handleQty(10)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary" aria-label="Aumentar 10">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="ml-auto text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div>
            <div className="font-display text-lg font-semibold text-primary">{formatBRL(total)}</div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Cor das forminhas</h4>
          <span className="text-[11px] text-muted-foreground">Escolha até 2 · {colors.length}/2</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {COLORS.map((c) => {
            const active = colors.includes(c.id);
            return (
              <button key={c.id} onClick={() => toggleColor(c.id)} title={c.label} aria-label={c.label} className={`relative h-8 w-8 rounded-full border-2 transition-all ${active ? "border-primary scale-110" : "border-border hover:border-primary/40"}`} style={{ backgroundColor: c.hex }}>
                {active && <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />}
              </button>
            );
          })}
        </div>
        {colors.length > 0 && (
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            Selecionadas: <span className="font-medium">{colors.map((id) => COLORS.find((c) => c.id === id)?.label).join(", ")}</span>
          </p>
        )}
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-semibold">Observação</h4>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value.slice(0, 280))} rows={2} className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>

      <button onClick={handleAdd} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-burgundy-deep active:scale-[0.99]">
        Adicionar à sacola · {formatBRL(total)}
      </button>
    </div>
  );
}

function BoloCustomizationPanel({
  product,
  onClose,
  onAdded,
}: {
  product: Product;
  onClose: () => void;
  onAdded: () => void;
}) {
  const { add } = useCart();
  const cfg = BOLO_CONFIGS[product.id];
  const [weightKg, setWeightKg] = useState(1);
  const [recheios, setRecheios] = useState<string[]>([]);
  const [adicionais, setAdicionais] = useState<string[]>([]);
  const [cobertura, setCobertura] = useState<string>("");
  const [fitaColor, setFitaColor] = useState<string>("");
  const [embalagem, setEmbalagem] = useState(false);
  const [notes, setNotes] = useState("");
  const [modelImage, setModelImage] = useState<string>("");
  const [modelImageName, setModelImageName] = useState<string>("");
  const [topper, setTopper] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const weightPrice = cfg.basePrice + ((weightKg - 1) / cfg.stepKg) * cfg.stepPrice;
  const adicionaisPrice = adicionais.length * BOLO_ADICIONAL_PRICE;
  const embalagemPrice = embalagem ? NAKED_EMBALAGEM_PRICE : 0;
  const topperObj = BOLO_TOPPERS.find((t) => t.id === topper);
  const topperPrice = topperObj?.price ?? 0;
  const total = weightPrice + adicionaisPrice + embalagemPrice + topperPrice;

  function toggleRecheio(f: string) {
    setRecheios((prev) => {
      if (prev.includes(f)) return prev.filter((x) => x !== f);
      if (prev.length >= cfg.maxRecheios) {
        toast.error(`Máximo de ${cfg.maxRecheios} recheios.`);
        return prev;
      }
      return [...prev, f];
    });
  }

  function toggleAdicional(f: string) {
    setAdicionais((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  }

  function handleWeight(delta: number) {
    setWeightKg((w) => Math.max(1, +(w + delta).toFixed(2)));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Imagem muito grande. Máx. 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setModelImage(reader.result as string);
      setModelImageName(file.name);
    };
    reader.readAsDataURL(file);
  }

  function handleAdd() {
    if (recheios.length === 0) return toast.error("Escolha pelo menos 1 recheio.");
    if (cfg.coberturas && !cobertura) return toast.error("Escolha 1 cobertura.");
    if (cfg.showFita && !fitaColor) return toast.error("Escolha a cor da fita.");
    if (cfg.showModelImage && !modelImage) return toast.error("Envie a foto modelo do bolo.");
    if (cfg.showModelImage && !topper) return toast.error("Escolha uma opção de topper.");
    add(product, 1, {
      kind: "bolo",
      notes,
      unitPrice: total,
      weightKg,
      recheios,
      adicionais: cfg.showAdicionais ? adicionais : undefined,
      cobertura: cobertura || undefined,
      fitaColor: fitaColor || undefined,
      embalagem: cfg.showEmbalagem ? embalagem : undefined,
      topper: cfg.showModelImage && topperObj ? topperObj.label : undefined,
      topperPrice: cfg.showModelImage && topperObj ? topperObj.price : undefined,
      modelImage: cfg.showModelImage && modelImage ? modelImage : undefined,
      modelImageName: cfg.showModelImage && modelImageName ? modelImageName : undefined,
    });
    toast.success(`${product.name} adicionado à sacola.`);
    onAdded();
  }

  return (
    <div className="mt-4 -mx-1 rounded-lg border border-border bg-secondary/30 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{product.id === "bolo-pote-tira" ? "Personalize seu naked" : "Personalize seu bolo"}</p>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Fechar">
          <X className="h-4 w-4" />
        </button>
      </div>

      {cfg.massaHeader && (
        <div className="mt-3 rounded-md border border-primary/30 bg-primary/5 px-3 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Especificações da massa</p>
          <p className="mt-1 text-sm font-medium text-foreground">{cfg.massaHeader}</p>
          <p className="mt-2 border-t border-primary/20 pt-2 text-sm font-medium text-foreground">Bolos de 2 ou mais andares, orçamento no whatsapp!</p>
        </div>
      )}

      {/* Weight */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Peso do bolo</h4>
          <span className="text-[11px] text-muted-foreground">A partir de 1kg · +{formatBRL(cfg.stepPrice)} a cada 500g</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-border bg-background">
            <button onClick={() => handleWeight(-cfg.stepKg)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary disabled:opacity-40" disabled={weightKg <= 1} aria-label="Diminuir 500g">
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-20 text-center text-sm font-semibold">{weightKg.toFixed(1)} kg</span>
            <button onClick={() => handleWeight(cfg.stepKg)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary" aria-label="Aumentar 500g">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="ml-auto text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Peso</div>
            <div className="font-display text-lg font-semibold text-primary">{formatBRL(weightPrice)}</div>
          </div>
        </div>
      </div>

      {/* Recheios */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Recheios</h4>
          <span className="text-[11px] text-muted-foreground">Escolha até {cfg.maxRecheios} · {recheios.length}/{cfg.maxRecheios}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {cfg.recheios.map((f) => {
            const active = recheios.includes(f);
            return (
              <button key={f} onClick={() => toggleRecheio(f)} className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"}`}>
                {active && <Check className="h-3 w-3" />}
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cobertura (Naked Cake) */}
      {cfg.coberturas && (
        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <h4 className="text-sm font-semibold">Cobertura</h4>
            <span className="text-[11px] text-muted-foreground">Escolha 1</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {cfg.coberturas.map((f) => {
              const active = cobertura === f;
              return (
                <button key={f} onClick={() => setCobertura(active ? "" : f)} className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"}`}>
                  {active && <Check className="h-3 w-3" />}
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Cor da fita (Naked Cake) */}
      {cfg.showFita && (
        <div className="mt-5">
          <h4 className="text-sm font-semibold">Cor da fita</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {FITA_COLORS.map((c) => {
              const active = fitaColor === c.id;
              return (
                <button key={c.id} onClick={() => setFitaColor(c.id)} title={c.label} aria-label={c.label} className={`relative h-8 w-8 rounded-full border-2 transition-all ${active ? "border-primary scale-110" : "border-border hover:border-primary/40"}`} style={{ backgroundColor: c.hex }}>
                  {active && <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />}
                </button>
              );
            })}
          </div>
          {fitaColor && (
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Selecionada: <span className="font-medium">{FITA_COLORS.find((c) => c.id === fitaColor)?.label}</span>
            </p>
          )}
        </div>
      )}

      {/* Embalagem (Naked Cake) */}
      {cfg.showEmbalagem && (
        <div className="mt-5">
          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2.5">
            <div>
              <p className="text-sm font-semibold">Adicionar embalagem</p>
              <p className="text-[11px] text-muted-foreground">Opcional · +{formatBRL(NAKED_EMBALAGEM_PRICE)}</p>
            </div>
            <input type="checkbox" checked={embalagem} onChange={(e) => setEmbalagem(e.target.checked)} className="h-5 w-5 accent-primary" />
          </label>
        </div>
      )}

      {/* Adicionais (Bolo Decorado) */}
      {cfg.showAdicionais && (
        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <h4 className="text-sm font-semibold">Adicionais <span className="font-normal text-muted-foreground">(opcional)</span></h4>
            <span className="text-[11px] text-muted-foreground">+{formatBRL(BOLO_ADICIONAL_PRICE)} por item</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Cada adicional escolhido soma {formatBRL(BOLO_ADICIONAL_PRICE)} ao valor final.</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {BOLO_ADICIONAIS.map((f) => {
              const active = adicionais.includes(f);
              return (
                <button key={f} onClick={() => toggleAdicional(f)} className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"}`}>
                  {active && <Check className="h-3 w-3" />}
                  {f} <span className="ml-0.5 text-[10px] opacity-80">+{formatBRL(BOLO_ADICIONAL_PRICE)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Modelo do bolo (Bolo Decorado) */}
      {cfg.showModelImage && (
        <div className="mt-5">
          <h4 className="text-sm font-semibold">Modelo do bolo <span className="font-normal text-primary">(obrigatório)</span></h4>
          <p className="mt-1 text-[11px] text-muted-foreground">Envie uma foto de referência da sua galeria para usarmos como base.</p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          {modelImage ? (
            <div className="mt-2 flex items-center gap-3 rounded-md border border-border bg-background p-2">
              <img src={modelImage} alt="Modelo" className="h-16 w-16 rounded object-cover" />
              <div className="flex-1 truncate text-xs">
                <p className="truncate font-medium">{modelImageName}</p>
                <button type="button" onClick={() => fileRef.current?.click()} className="mt-1 text-primary hover:underline">Trocar foto</button>
              </div>
              <button type="button" onClick={() => { setModelImage(""); setModelImageName(""); }} className="text-muted-foreground hover:text-destructive" aria-label="Remover">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border bg-background px-4 py-3 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-secondary">
              <Upload className="h-4 w-4" />
              Enviar foto da galeria
              <ImageIcon className="h-4 w-4 opacity-60" />
            </button>
          )}
        </div>
      )}

      {/* Toppers (Bolo Decorado) */}
      {cfg.showModelImage && (
        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <h4 className="text-sm font-semibold">Toppers</h4>
            <span className="text-[11px] text-muted-foreground">Escolha 1</span>
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {BOLO_TOPPERS.map((t) => {
              const active = topper === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTopper(t.id)}
                  className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-xs font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"}`}
                >
                  <span className="flex items-center gap-1.5">
                    {active && <Check className="h-3 w-3" />}
                    {t.label}
                  </span>
                  <span className={`text-[11px] ${active ? "opacity-90" : "text-muted-foreground"}`}>
                    {t.price === 0 ? "Sem custo" : `+${formatBRL(t.price)}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="mt-5">
        <h4 className="text-sm font-semibold">Observação</h4>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value.slice(0, 280))} rows={2} className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>

      {/* Total summary */}
      <div className="mt-5 rounded-md border border-border bg-background px-4 py-3 text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>{weightKg.toFixed(1)} kg</span>
          <span>{formatBRL(weightPrice)}</span>
        </div>
        {adicionais.length > 0 && (
          <div className="mt-1 flex justify-between text-muted-foreground">
            <span>{adicionais.length} adicional(is)</span>
            <span>+{formatBRL(adicionaisPrice)}</span>
          </div>
        )}
        {embalagem && (
          <div className="mt-1 flex justify-between text-muted-foreground">
            <span>Embalagem</span>
            <span>+{formatBRL(NAKED_EMBALAGEM_PRICE)}</span>
          </div>
        )}
        {topperObj && topperObj.price > 0 && (
          <div className="mt-1 flex justify-between text-muted-foreground">
            <span>Topper</span>
            <span>+{formatBRL(topperObj.price)}</span>
          </div>
        )}
        <div className="mt-2 flex items-baseline justify-between border-t border-border pt-2">
          <span className="font-semibold uppercase tracking-wider">Total</span>
          <span className="font-display text-lg font-semibold text-primary">{formatBRL(total)}</span>
        </div>
      </div>

      <button onClick={handleAdd} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-burgundy-deep active:scale-[0.99]">
        Adicionar à sacola · {formatBRL(total)}
      </button>
    </div>
  );
}

function BemCasadoCustomizationPanel({
  product,
  onClose,
  onAdded,
}: {
  product: Product;
  onClose: () => void;
  onAdded: () => void;
}) {
  const { add } = useCart();
  const [tag, setTag] = useState<"com" | "sem" | "">("");
  const [qty, setQty] = useState(BEM_CASADO_MIN);
  const [recheios, setRecheios] = useState<string[]>([]);
  const [fitaColors, setFitaColors] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const unitPrice = tag === "com" ? 4.3 : tag === "sem" ? 4 : product.price;
  const total = qty * unitPrice;

  function toggleRecheio(f: string) {
    setRecheios((prev) => {
      if (prev.includes(f)) return prev.filter((x) => x !== f);
      if (prev.length >= 2) {
        toast.error("Máximo de 2 recheios.");
        return prev;
      }
      return [...prev, f];
    });
  }

  function toggleFita(id: string) {
    setFitaColors((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) {
        toast.error("Máximo de 2 cores de fita.");
        return prev;
      }
      return [...prev, id];
    });
  }

  function handleQty(delta: number) {
    setQty((q) => Math.max(BEM_CASADO_MIN, q + delta));
  }

  function handleAdd() {
    if (!tag) return toast.error("Escolha com ou sem tag.");
    if (recheios.length === 0) return toast.error("Escolha pelo menos 1 recheio.");
    if (fitaColors.length === 0) return toast.error("Escolha pelo menos 1 cor de fita.");
    if (qty < BEM_CASADO_MIN) return toast.error(`Pedido mínimo de ${BEM_CASADO_MIN} unidades.`);
    add(product, qty, {
      kind: "bem-casado",
      notes,
      unitPrice,
      recheios,
      fitaColors,
      tag: tag as "com" | "sem",
    });
    toast.success(`${qty} ${product.name} adicionados à sacola.`);
    onAdded();
  }

  return (
    <div className="mt-4 -mx-1 rounded-lg border border-border bg-secondary/30 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Personalize seu Bem-Casado</p>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Fechar">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 rounded-md border border-primary/30 bg-primary/5 px-3 py-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Especificações</p>
        <p className="mt-1 text-sm font-medium text-foreground">Medida: 5cm / quadrado</p>
      </div>

      {/* Tag */}
      <div className="mt-5">
        <h4 className="text-sm font-semibold">Tag</h4>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {([
            { id: "com", label: "Com tag", price: 4.3 },
            { id: "sem", label: "Sem tag", price: 4 },
          ] as const).map((opt) => {
            const active = tag === opt.id;
            return (
              <button key={opt.id} onClick={() => setTag(opt.id)} className={`rounded-md border px-3 py-2.5 text-left transition-all ${active ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/40"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{opt.label}</span>
                  {active && <Check className="h-4 w-4 text-primary" />}
                </div>
                <div className="text-[11px] text-muted-foreground">{formatBRL(opt.price)} / unidade</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantidade */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Quantidade</h4>
          <span className="text-[11px] text-muted-foreground">Mín. {BEM_CASADO_MIN} un.{tag && ` · ${formatBRL(unitPrice)} cada`}</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-border bg-background">
            <button onClick={() => handleQty(-10)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary disabled:opacity-40" disabled={qty <= BEM_CASADO_MIN} aria-label="Diminuir 10">
              <Minus className="h-3.5 w-3.5" />
            </button>
            <input type="number" value={qty} min={BEM_CASADO_MIN} step={10} onChange={(e) => {
              const v = parseInt(e.target.value || "0", 10);
              setQty(Number.isNaN(v) ? BEM_CASADO_MIN : Math.max(BEM_CASADO_MIN, v));
            }} className="w-16 bg-transparent text-center text-sm font-semibold outline-none" />
            <button onClick={() => handleQty(10)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary" aria-label="Aumentar 10">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="ml-auto text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div>
            <div className="font-display text-lg font-semibold text-primary">{formatBRL(total)}</div>
          </div>
        </div>
      </div>

      {/* Recheios */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Recheios</h4>
          <span className="text-[11px] text-muted-foreground">Escolha até 2 · {recheios.length}/2</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {BEM_CASADO_RECHEIOS.map((f) => {
            const active = recheios.includes(f);
            return (
              <button key={f} onClick={() => toggleRecheio(f)} className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"}`}>
                {active && <Check className="h-3 w-3" />}
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cor da fita */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Cor da fita</h4>
          <span className="text-[11px] text-muted-foreground">Escolha até 2 · {fitaColors.length}/2</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {BEM_CASADO_FITAS.map((c) => {
            const active = fitaColors.includes(c.id);
            return (
              <button key={c.id} onClick={() => toggleFita(c.id)} title={c.label} aria-label={c.label} className={`relative h-8 w-8 rounded-full border-2 transition-all ${active ? "border-primary scale-110" : "border-border hover:border-primary/40"}`} style={{ backgroundColor: c.hex }}>
                {active && <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />}
              </button>
            );
          })}
        </div>
        {fitaColors.length > 0 && (
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            Selecionadas: <span className="font-medium">{fitaColors.map((id) => BEM_CASADO_FITAS.find((c) => c.id === id)?.label).join(", ")}</span>
          </p>
        )}
      </div>

      {/* Notes */}
      <div className="mt-5">
        <h4 className="text-sm font-semibold">Observação</h4>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value.slice(0, 280))} rows={2} className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>

      <button onClick={handleAdd} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-burgundy-deep active:scale-[0.99]">
        Adicionar à sacola · {formatBRL(total)}
      </button>
    </div>
  );
}

function CupcakeCustomizationPanel({
  product,
  onClose,
  onAdded,
}: {
  product: Product;
  onClose: () => void;
  onAdded: () => void;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(CUPCAKE_MIN);
  const [recheios, setRecheios] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const unitPrice = product.price;
  const total = qty * unitPrice;

  function toggleRecheio(f: string) {
    setRecheios((prev) => {
      if (prev.includes(f)) return prev.filter((x) => x !== f);
      if (prev.length >= 2) {
        toast.error("Máximo de 2 recheios.");
        return prev;
      }
      return [...prev, f];
    });
  }

  function toggleColor(id: string) {
    setColors((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) {
        toast.error("Máximo de 2 cores.");
        return prev;
      }
      return [...prev, id];
    });
  }

  function handleQty(delta: number) {
    setQty((q) => Math.max(CUPCAKE_MIN, q + delta));
  }

  function handleAdd() {
    if (recheios.length === 0) return toast.error("Escolha pelo menos 1 recheio.");
    if (colors.length === 0) return toast.error("Escolha pelo menos 1 cor.");
    if (qty < CUPCAKE_MIN) return toast.error(`Pedido mínimo de ${CUPCAKE_MIN} unidades.`);
    add(product, qty, {
      kind: "cupcake",
      notes,
      unitPrice,
      recheios,
      fitaColors: colors,
    });
    toast.success(`${qty} ${product.name} adicionados à sacola.`);
    onAdded();
  }

  return (
    <div className="mt-4 -mx-1 rounded-lg border border-border bg-secondary/30 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Personalize seu Cupcake</p>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Fechar">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 rounded-md border border-primary/30 bg-primary/5 px-3 py-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">Especificações</p>
        <p className="mt-1 text-sm font-medium text-foreground">Massa amanteigada com margarina / Cobertura em chantilly</p>
      </div>

      {/* Quantidade */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Quantidade</h4>
          <span className="text-[11px] text-muted-foreground">Mín. {CUPCAKE_MIN} un. · {formatBRL(unitPrice)} cada</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-border bg-background">
            <button onClick={() => handleQty(-1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary disabled:opacity-40" disabled={qty <= CUPCAKE_MIN} aria-label="Diminuir 1">
              <Minus className="h-3.5 w-3.5" />
            </button>
            <input type="number" value={qty} min={CUPCAKE_MIN} step={1} onChange={(e) => {
              const v = parseInt(e.target.value || "0", 10);
              setQty(Number.isNaN(v) ? CUPCAKE_MIN : Math.max(CUPCAKE_MIN, v));
            }} className="w-16 bg-transparent text-center text-sm font-semibold outline-none" />
            <button onClick={() => handleQty(1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary" aria-label="Aumentar 1">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="ml-auto text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div>
            <div className="font-display text-lg font-semibold text-primary">{formatBRL(total)}</div>
          </div>
        </div>
      </div>

      {/* Recheios */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Recheios</h4>
          <span className="text-[11px] text-muted-foreground">Escolha até 2 · {recheios.length}/2</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {CUPCAKE_RECHEIOS.map((f) => {
            const active = recheios.includes(f);
            return (
              <button key={f} onClick={() => toggleRecheio(f)} className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/40"}`}>
                {active && <Check className="h-3 w-3" />}
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cores forminhas e chantilly */}
      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm font-semibold">Cor das forminhas e chantilly</h4>
          <span className="text-[11px] text-muted-foreground">Escolha até 2 · {colors.length}/2</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {CUPCAKE_COLORS.map((c) => {
            const active = colors.includes(c.id);
            return (
              <button key={c.id} onClick={() => toggleColor(c.id)} title={c.label} aria-label={c.label} className={`relative h-8 w-8 rounded-full border-2 transition-all ${active ? "border-primary scale-110" : "border-border hover:border-primary/40"}`} style={{ backgroundColor: c.hex }}>
                {active && <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow" />}
              </button>
            );
          })}
        </div>
        {colors.length > 0 && (
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            Selecionadas: <span className="font-medium">{colors.map((id) => CUPCAKE_COLORS.find((c) => c.id === id)?.label).join(", ")}</span>
          </p>
        )}
      </div>

      {/* Notes */}
      <div className="mt-5">
        <h4 className="text-sm font-semibold">Observação</h4>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value.slice(0, 280))} rows={2} className="mt-2 w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20" />
      </div>

      <button onClick={handleAdd} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-burgundy-deep active:scale-[0.99]">
        Adicionar à sacola · {formatBRL(total)}
      </button>
    </div>
  );
}
