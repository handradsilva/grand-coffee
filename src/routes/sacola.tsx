import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart, cartUnitPrice, type CartItem } from "@/lib/cart";
import { formatBRL } from "@/lib/products";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const res = await fetch(dataUrl);
  return await res.blob();
}

async function uploadModelImage(item: CartItem): Promise<string | null> {
  const c = item.customization;
  if (!c?.modelImage) return null;
  try {
    const blob = await dataUrlToBlob(c.modelImage);
    const ext = (c.modelImageName?.split(".").pop() || "jpg").toLowerCase();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("bolo-modelos").upload(path, blob, {
      contentType: blob.type || "image/jpeg",
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from("bolo-modelos").getPublicUrl(path);
    return data.publicUrl;
  } catch (e) {
    console.error("upload modelo falhou", e);
    return null;
  }
}

export const Route = createFileRoute("/sacola")({
  head: () => ({
    meta: [
      { title: "Sua sacola — Grand Coffee" },
      { name: "description", content: "Revise seu pedido e finalize com retirada ou entrega." },
    ],
  }),
  component: Cart,
});

const WHATSAPP = "5598987149819";

function Cart() {
  const { items, setQty, remove, subtotal, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    mode: "retirada" as "retirada",
    address: "",
    date: "",
    time: "",
    notes: "",
    payment: "pix" as "pix" | "cartao" | "dinheiro",
  });

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const maxDate = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const empty = items.length === 0;

  

  const [submitting, setSubmitting] = useState(false);

  function buildMessage(photoUrls: Record<string, string>) {
    const lines = [
      "*Novo Pedido — Grand Coffee*",
      "",
      "*Itens:*",
      ...items.flatMap((i) => {
        const unit = cartUnitPrice(i);
        const c = i.customization;
        if (!c) return [`• ${i.qty}× ${i.product.name} — ${formatBRL(i.qty * unit)}`];
        if (c.kind === "bolo") {
          const photoUrl = photoUrls[i.lineId];
          const isDecorado = i.product.id === "bolo-choc";
          return [
            `• ${i.product.name} (${(c.weightKg ?? 1).toFixed(1)} kg) — ${formatBRL(i.qty * unit)}`,
            isDecorado ? "   - Massa: Amanteigada com Margarina · Cobertura: Chantilly" : "",
            `   - Recheios: ${(c.recheios ?? []).join(", ")}`,
            c.cobertura ? `   - Cobertura: ${c.cobertura}` : "",
            c.fitaColor ? `   - Cor da fita: ${c.fitaColor.replace(/-/g, " ")}` : "",
            c.embalagem ? `   - Embalagem: sim (+R$ 3,00)` : "",
            c.adicionais && c.adicionais.length ? `   - Adicionais: ${c.adicionais.join(", ")} (+${formatBRL(c.adicionais.length * 20)})` : "",
            c.topper ? `   - Topper: ${c.topper}${c.topperPrice ? ` (+${formatBRL(c.topperPrice)})` : ""}` : "",
            photoUrl ? `   - 📸 Foto modelo: ${photoUrl}` : "",
            c.notes ? `   - Obs.: ${c.notes}` : "",
          ].filter(Boolean);
        }
        if (c.kind === "bem-casado") {
          return [
            `• ${i.qty}× ${i.product.name} — ${formatBRL(i.qty * unit)}`,
            `   - Medida: 5cm / quadrado`,
            `   - Tag: ${c.tag === "com" ? "Com tag (R$ 4,30/un.)" : "Sem tag (R$ 4,00/un.)"}`,
            c.recheios && c.recheios.length ? `   - Recheios: ${c.recheios.join(", ")}` : "",
            c.fitaColors && c.fitaColors.length ? `   - Cor(es) da fita: ${c.fitaColors.map((s) => s.replace(/-/g, " ")).join(", ")}` : "",
            c.notes ? `   - Obs.: ${c.notes}` : "",
          ].filter(Boolean);
        }
        if (c.kind === "cupcake") {
          return [
            `• ${i.qty}× ${i.product.name} — ${formatBRL(i.qty * unit)}`,
            `   - Massa amanteigada com margarina / Cobertura em chantilly`,
            c.recheios && c.recheios.length ? `   - Recheios: ${c.recheios.join(", ")}` : "",
            c.fitaColors && c.fitaColors.length ? `   - Cor(es): ${c.fitaColors.map((s) => s.replace(/-/g, " ")).join(", ")}` : "",
            c.notes ? `   - Obs.: ${c.notes}` : "",
          ].filter(Boolean);
        }
        if (c.kind === "kit") {
          const photoUrl = photoUrls[i.lineId];
          return [
            `• ${i.product.name} — ${c.kitOptionLabel ?? ""} — ${formatBRL(i.qty * unit)}`,
            c.kitItems && c.kitItems.length ? `   - Itens: ${c.kitItems.join(", ")}` : "",
            c.recheios && c.recheios.length ? `   - ${c.cobertura ? "Recheios do Naked" : "Recheios do bolo"}: ${c.recheios.join(", ")}` : "",
            c.cobertura ? `   - Cobertura do Naked: ${c.cobertura}` : "",
            c.docesTipo ? `   - Tipo dos doces: ${c.docesTipo === "finos" ? "Doces finos" : "Doces tradicionais"}` : "",
            c.finosFormatos && c.finosFormatos.length ? `   - Formatos doces finos: ${c.finosFormatos.join(", ")}` : "",
            c.finosRecheios && c.finosRecheios.length ? `   - Recheios doces finos: ${c.finosRecheios.join(", ")}` : "",
            c.tradicionaisRecheios && c.tradicionaisRecheios.length ? `   - Sabores doces tradicionais: ${c.tradicionaisRecheios.join(", ")}` : "",
            c.bemCasadoRecheio ? `   - Recheio do bem-casado: ${c.bemCasadoRecheio}` : "",
            c.adicionais && c.adicionais.length ? `   - Adicionais do bolo: ${c.adicionais.join(", ")}` : "",
            c.colors && c.colors.length ? `   - Cor(es) das forminhas: ${c.colors.map((s) => s.replace(/-/g, " ")).join(", ")}` : "",
            c.fitaColor ? `   - Cor (forminhas + fita do naked): ${c.fitaColor.replace(/-/g, " ")}` : "",
            c.comboColors && c.comboColors.length ? `   - Palhetas de cores do Combo: ${c.comboColors.map((s) => s.replace(/-/g, " ")).join(", ")}` : "",
            c.cupcakeRecheios && c.cupcakeRecheios.length ? `   - Recheio cupcake: ${c.cupcakeRecheios.join(", ")}` : "",
            photoUrl ? `   - 📸 Foto modelo: ${photoUrl}` : "",
            c.notes ? `   - Obs.: ${c.notes}` : "",
          ].filter(Boolean);
        }
        return [
          `• ${i.qty}× ${i.product.name} — ${formatBRL(i.qty * unit)}`,
          c.flavors && c.flavors.length ? `   - Sabores: ${c.flavors.join(", ")}` : "",
          c.format ? `   - Formato: ${c.format}` : "",
          c.colors && c.colors.length ? `   - Cor(es) das forminhas: ${c.colors.map((s) => s.replace(/-/g, " ")).join(", ")}` : "",
          c.notes ? `   - Obs.: ${c.notes}` : "",
        ].filter(Boolean);
      }),
      "",
      `*Subtotal:* ${formatBRL(subtotal)}`,
      "",
      `*Cliente:* ${form.name}`,
      `*Telefone:* ${form.phone}`,
      `*Modalidade:* Retirar na loja (não fazemos entrega)`,
      `*Data/Hora de retirada:* ${form.date.split("-").reverse().join("/")} às ${form.time}`,
      `*Pagamento:* ${form.payment === "pix" ? "PIX" : form.payment === "cartao" ? "Cartão (com acréscimo da maquininha)" : "Dinheiro (na loja)"}`,
      form.notes ? `*Observações:* ${form.notes}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  }

  async function checkout(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }
    // Bloqueia domingo
    const [yy, mm, dd] = form.date.split("-").map(Number);
    const selected = new Date(yy, (mm ?? 1) - 1, dd ?? 1);
    if (selected.getDay() === 0) {
      toast.error("Não fazemos pedidos para retirada aos domingos. Escolha outro dia.");
      return;
    }
    // Limite 60 dias
    const limit = new Date();
    limit.setHours(0, 0, 0, 0);
    limit.setDate(limit.getDate() + 60);
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    if (selected < start || selected > limit) {
      toast.error("Só é possível reservar para os próximos 60 dias.");
      return;
    }
    // Horário 07:30 - 18:00
    const [hh, mi] = form.time.split(":").map(Number);
    const mins = (hh ?? 0) * 60 + (mi ?? 0);
    if (mins < 7 * 60 + 30 || mins > 18 * 60) {
      toast.error("Selecione um horário de retirada entre 07h30 e 18h.");
      return;
    }
    setSubmitting(true);
    const photoUrls: Record<string, string> = {};
    const itemsWithPhoto = items.filter((i) => i.customization?.modelImage);
    if (itemsWithPhoto.length > 0) {
      toast.info("Enviando foto(s) do bolo...");
      for (const i of itemsWithPhoto) {
        const url = await uploadModelImage(i);
        if (url) photoUrls[i.lineId] = url;
      }
      if (Object.keys(photoUrls).length < itemsWithPhoto.length) {
        toast.error("Falha ao enviar alguma foto. Tente novamente.");
        setSubmitting(false);
        return;
      }
    }
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage(photoUrls))}`;
    window.open(url, "_blank");
    toast.success("Pedido enviado! Confirmaremos pelo WhatsApp.");
    clear();
    setSubmitting(false);
  }


  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Sacola</p>
        <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">Seu pedido</h1>
      </header>

      {empty ? (
        <div className="mt-16 rounded-lg border border-dashed border-border p-20 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-6 font-display text-2xl">Sua sacola está vazia</p>
          <p className="mt-2 text-sm text-muted-foreground">Que tal escolher algo delicioso?</p>
          <Link to="/cardapio" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-burgundy-deep">
            Ver cardápio
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div className="space-y-8">
            <section className="rounded-lg border border-border bg-card">
              <h2 className="border-b border-border px-6 py-4 font-display text-xl">Itens</h2>
              <ul className="divide-y divide-border">
                {items.map((i) => {
                  const unit = cartUnitPrice(i);
                  const c = i.customization;
                  const isBolo = c?.kind === "bolo";
                  const isBemCasado = c?.kind === "bem-casado";
                  const isDoces = c?.kind === "doces";
                  const isCupcake = c?.kind === "cupcake";
                  const isKit = c?.kind === "kit";
                  const isCustom = !!c;
                  const step = isDoces ? 10 : 1;
                  const minQty = isBemCasado ? 30 : isDoces ? 50 : isCupcake ? 6 : 1;
                  return (
                    <li key={i.lineId} className="flex gap-4 p-5">
                      <img src={c?.modelImage || i.product.image} alt={i.product.name} className="h-24 w-24 rounded-md object-cover" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display text-lg">{i.product.name}{isKit && c?.kitOptionLabel ? ` · ${c.kitOptionLabel}` : ""}</h3>
                            <p className="text-xs text-muted-foreground">
                              {isBolo
                                ? `${(c!.weightKg ?? 1).toFixed(1)} kg · ${formatBRL(unit)}`
                                : `${formatBRL(unit)} ${isCustom ? (isKit ? "/ kit" : "/ unidade") : `/ ${i.product.unit}`}`}
                            </p>
                            {c && isBolo && (
                              <div className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                                {i.product.id === "bolo-choc" && (
                                  <p><span className="font-medium text-foreground">Massa:</span> Amanteigada · Chantilly</p>
                                )}
                                <p><span className="font-medium text-foreground">Recheios:</span> {(c.recheios ?? []).join(", ")}</p>
                                {c.cobertura && (
                                  <p><span className="font-medium text-foreground">Cobertura:</span> {c.cobertura}</p>
                                )}
                                {c.fitaColor && (
                                  <p><span className="font-medium text-foreground">Fita:</span> <span className="capitalize">{c.fitaColor.replace(/-/g, " ")}</span></p>
                                )}
                                {c.embalagem && (
                                  <p><span className="font-medium text-foreground">Embalagem:</span> sim</p>
                                )}
                                {c.adicionais && c.adicionais.length > 0 && (
                                  <p><span className="font-medium text-foreground">Adicionais:</span> {c.adicionais.join(", ")}</p>
                                )}
                                {c.topper && (
                                  <p><span className="font-medium text-foreground">Topper:</span> {c.topper}</p>
                                )}
                                {c.modelImage && (
                                  <p className="text-primary">📸 Foto modelo anexada</p>
                                )}
                                {c.notes && (
                                  <p><span className="font-medium text-foreground">Obs.:</span> {c.notes}</p>
                                )}
                              </div>
                            )}
                            {c && isKit && (
                              <div className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                                {c.kitItems && c.kitItems.length > 0 && (
                                  <p><span className="font-medium text-foreground">Itens:</span> {c.kitItems.join(", ")}</p>
                                )}
                                {c.recheios && c.recheios.length > 0 && (
                                  <p><span className="font-medium text-foreground">{c.cobertura ? "Recheios do Naked" : "Recheios do bolo"}:</span> {c.recheios.join(", ")}</p>
                                )}
                                {c.cobertura && (
                                  <p><span className="font-medium text-foreground">Cobertura do Naked:</span> {c.cobertura}</p>
                                )}
                                {c.finosFormatos && c.finosFormatos.length > 0 && (
                                  <p><span className="font-medium text-foreground">Formatos doces finos:</span> {c.finosFormatos.join(", ")}</p>
                                )}
                                {c.finosRecheios && c.finosRecheios.length > 0 && (
                                  <p><span className="font-medium text-foreground">Recheios doces finos:</span> {c.finosRecheios.join(", ")}</p>
                                )}
                                {c.tradicionaisRecheios && c.tradicionaisRecheios.length > 0 && (
                                  <p><span className="font-medium text-foreground">Sabores doces tradicionais:</span> {c.tradicionaisRecheios.join(", ")}</p>
                                )}
                                {c.docesTipo && (
                                  <p><span className="font-medium text-foreground">Tipo dos doces:</span> {c.docesTipo === "finos" ? "Doces finos" : "Doces tradicionais"}</p>
                                )}
                                {c.bemCasadoRecheio && (
                                  <p><span className="font-medium text-foreground">Recheio do bem-casado:</span> {c.bemCasadoRecheio}</p>
                                )}
                                {c.adicionais && c.adicionais.length > 0 && (
                                  <p><span className="font-medium text-foreground">Adicionais do bolo:</span> {c.adicionais.join(", ")}</p>
                                )}
                                {c.cupcakeRecheios && c.cupcakeRecheios.length > 0 && (
                                  <p><span className="font-medium text-foreground">Recheio cupcake:</span> {c.cupcakeRecheios.join(", ")}</p>
                                )}
                                {c.colors && c.colors.length > 0 && (
                                  <p><span className="font-medium text-foreground">Cor(es) das forminhas:</span> <span className="capitalize">{c.colors.map((s) => s.replace(/-/g, " ")).join(", ")}</span></p>
                                )}
                                {c.fitaColor && (
                                  <p><span className="font-medium text-foreground">Cor (forminhas + fita):</span> <span className="capitalize">{c.fitaColor.replace(/-/g, " ")}</span></p>
                                )}
                                {c.comboColors && c.comboColors.length > 0 && (
                                  <p><span className="font-medium text-foreground">Palhetas de cores do Combo:</span> <span className="capitalize">{c.comboColors.map((s) => s.replace(/-/g, " ")).join(", ")}</span></p>
                                )}
                                {c.modelImage && (
                                  <p className="text-primary">📸 Foto modelo anexada</p>
                                )}
                                {c.notes && (
                                  <p><span className="font-medium text-foreground">Obs.:</span> {c.notes}</p>
                                )}
                              </div>
                            )}
                            {c && isBemCasado && (
                              <div className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                                <p><span className="font-medium text-foreground">Medida:</span> 5cm / quadrado</p>
                                <p><span className="font-medium text-foreground">Tag:</span> {c.tag === "com" ? "Com tag" : "Sem tag"}</p>
                                {c.recheios && c.recheios.length > 0 && (
                                  <p><span className="font-medium text-foreground">Recheios:</span> {c.recheios.join(", ")}</p>
                                )}
                                {c.fitaColors && c.fitaColors.length > 0 && (
                                  <p><span className="font-medium text-foreground">Fita:</span> <span className="capitalize">{c.fitaColors.map((s) => s.replace(/-/g, " ")).join(", ")}</span></p>
                                )}
                                {c.notes && (
                                  <p><span className="font-medium text-foreground">Obs.:</span> {c.notes}</p>
                                )}
                              </div>
                            )}
                            {c && isCupcake && (
                              <div className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                                <p>Massa amanteigada · Chantilly</p>
                                {c.recheios && c.recheios.length > 0 && (
                                  <p><span className="font-medium text-foreground">Recheios:</span> {c.recheios.join(", ")}</p>
                                )}
                                {c.fitaColors && c.fitaColors.length > 0 && (
                                  <p><span className="font-medium text-foreground">Cor:</span> <span className="capitalize">{c.fitaColors.map((s) => s.replace(/-/g, " ")).join(", ")}</span></p>
                                )}
                                {c.notes && (
                                  <p><span className="font-medium text-foreground">Obs.:</span> {c.notes}</p>
                                )}
                              </div>
                            )}
                            {c && isDoces && (
                              <div className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                                {c.flavors && c.flavors.length > 0 && (
                                  <p><span className="font-medium text-foreground">Sabores:</span> {c.flavors.join(", ")}</p>
                                )}
                                {c.format && (
                                  <p><span className="font-medium text-foreground">Formato:</span> {c.format}</p>
                                )}
                                {c.colors && c.colors.length > 0 && (
                                  <p><span className="font-medium text-foreground">Cor(es):</span> <span className="capitalize">{c.colors.map((s) => s.replace(/-/g, " ")).join(", ")}</span></p>
                                )}
                                {c.notes && (
                                  <p><span className="font-medium text-foreground">Obs.:</span> {c.notes}</p>
                                )}
                              </div>
                            )}
                          </div>
                          <button onClick={() => remove(i.lineId)} aria-label="Remover" className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          {isBolo || isKit ? <div /> : (
                            <div className="flex items-center gap-1 rounded-full border border-border">
                              <button onClick={() => setQty(i.lineId, Math.max(minQty, i.qty - step))} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"><Minus className="h-3.5 w-3.5" /></button>
                              <span className="w-10 text-center text-sm font-semibold">{i.qty}</span>
                              <button onClick={() => setQty(i.lineId, i.qty + step)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"><Plus className="h-3.5 w-3.5" /></button>
                            </div>
                          )}
                          <div className="font-display text-lg font-semibold text-primary">{formatBRL(i.qty * unit)}</div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            <form onSubmit={checkout} className="rounded-lg border border-border bg-card">
              <h2 className="border-b border-border px-6 py-4 font-display text-xl">Dados do pedido</h2>
              <div className="grid gap-5 p-6 md:grid-cols-2">
                <Field label="Nome e Sobrenome *">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Telefone (WhatsApp) *">
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(98) 99999-9999" className={inputCls} />
                </Field>

                <Field label="Modalidade *">
                  <div className="flex flex-col gap-1.5">
                    <div className="inline-flex items-center justify-center rounded-full border border-primary bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
                      Retirar na loja
                    </div>
                    <span className="text-[11px] text-muted-foreground">Não fazemos entrega — somente retirada na loja.</span>
                  </div>
                </Field>
                <Field label="Pagamento *">
                  <select value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value as any })} className={inputCls}>
                    <option value="pix">PIX</option>
                    <option value="cartao">Cartão (com acréscimo da maquininha)</option>
                    <option value="dinheiro">Dinheiro (levando na loja)</option>
                  </select>
                </Field>

                <Field label="Data de retirada *">
                  <input
                    required
                    type="date"
                    min={todayStr}
                    max={maxDate}
                    value={form.date}
                    onInvalid={(e) => {
                      const el = e.currentTarget;
                      const [y, m, d] = todayStr.split("-");
                      el.setCustomValidity(`A data do pedido deve ser igual ou maior à ${d}/${m}/${y}`);
                    }}
                    onChange={(e) => {
                      e.currentTarget.setCustomValidity("");
                      const v = e.target.value;
                      if (v) {
                        const [yy, mm, dd] = v.split("-").map(Number);
                        const d = new Date(yy, (mm ?? 1) - 1, dd ?? 1);
                        if (d.getDay() === 0) {
                          toast.error("Aos domingos não há retirada. Escolha outro dia.");
                          return;
                        }
                        const limit = new Date();
                        limit.setHours(0, 0, 0, 0);
                        limit.setDate(limit.getDate() + 60);
                        if (d > limit) {
                          toast.error("Só é possível reservar para os próximos 60 dias.");
                          return;
                        }
                      }
                      setForm({ ...form, date: v });
                    }}
                    className={inputCls}
                  />

                  <span className="mt-1 block text-[11px] text-muted-foreground">Reservas até 60 dias. <span className="text-destructive font-medium">Domingos indisponíveis.</span></span>
                </Field>
                <Field label="Horário de RETIRADA *">
                  <select
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className={inputCls}
                  >
                    <option value="">Selecione um horário</option>
                    {Array.from({ length: 22 }, (_, i) => {
                      const totalMin = 7 * 60 + 30 + i * 30;
                      const hh = String(Math.floor(totalMin / 60)).padStart(2, "0");
                      const mm = String(totalMin % 60).padStart(2, "0");
                      const v = `${hh}:${mm}`;
                      return <option key={v} value={v}>{`${hh}h${mm}`}</option>;
                    })}
                  </select>
                  <span className="mt-1 block text-[11px] text-muted-foreground">Funcionamento: 07h30 às 18h (Seg–Sáb). Este é o horário da <strong>RETIRADA</strong>.</span>
                </Field>

                <Field label="Observações" className="md:col-span-2">
                  <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${inputCls} h-auto resize-none py-3`} />
                </Field>
              </div>
              <div className="border-t border-border bg-secondary/40 px-6 py-5">
                <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-burgundy-deep disabled:opacity-60">
                  <MessageCircle className="h-4 w-4" /> {submitting ? "Enviando..." : "Enviar pedido pelo WhatsApp"}
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">Confirmamos disponibilidade e pagamento pelo WhatsApp em até 30 min.</p>
              </div>
            </form>
          </div>

          <aside>
            <div className="sticky top-24 rounded-lg border border-border bg-card">
              <h2 className="border-b border-border px-6 py-4 font-display text-xl">Resumo</h2>
              <dl className="space-y-3 px-6 py-5 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatBRL(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Retirada</dt><dd className="text-muted-foreground">na loja</dd></div>
              </dl>
              <div className="flex items-baseline justify-between border-t border-border px-6 py-5">
                <span className="text-sm font-medium uppercase tracking-wider">Total</span>
                <span className="font-display text-3xl font-semibold text-primary">{formatBRL(subtotal)}</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

const inputCls = "h-11 w-full rounded-md border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
