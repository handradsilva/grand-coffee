import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Clock, MessageCircle, Instagram } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Grand Coffee Confeitaria" },
      { name: "description", content: "Fale com a Grand Coffee. Encomendas, dúvidas e orçamentos." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Contato</p>
      <h1 className="mt-3 font-display text-5xl text-balance md:text-6xl">Vamos conversar.</h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground">Encomendas, orçamentos personalizados ou só pra trocar uma ideia sobre doce — estamos por aqui.</p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <Card icon={<Phone className="h-5 w-5" />} title="Telefone" lines={["(98) 98236-2983"]} />
        <Card icon={<MapPin className="h-5 w-5" />} title="Endereço" lines={["São Luís — MA", "Atendimento por agendamento"]} />
        <Card icon={<Clock className="h-5 w-5" />} title="Horário" lines={["Terça a Domingo", "9h às 19h"]} />
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <a href="https://wa.me/5598982362983" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground hover:bg-burgundy-deep">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <a href="#" className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary hover:bg-primary/5">
          <Instagram className="h-4 w-4" /> @grandcoffee
        </a>
      </div>
    </div>
  );
}

function Card({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-7">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <h3 className="mt-5 font-display text-xl text-primary">{title}</h3>
      <div className="mt-2 space-y-1 text-sm text-muted-foreground">{lines.map((l) => <p key={l}>{l}</p>)}</div>
    </div>
  );
}
