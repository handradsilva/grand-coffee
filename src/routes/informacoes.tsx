import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CreditCard,
  Clock,
  MapPin,
  ThermometerSnowflake,
  Car,
  Cake,
  CalendarDays,
  AlertTriangle,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/informacoes")({
  head: () => ({
    meta: [
      { title: "Informações para Clientes — Grand Coffee Confeitaria" },
      { name: "description", content: "Tudo o que você precisa saber para fechar seu pedido na Grand Coffee: pagamento, retirada, conservação, transporte e agendamento." },
      { property: "og:title", content: "Informações para Clientes — Grand Coffee Confeitaria" },
      { property: "og:description", content: "Pagamento, retirada, conservação, transporte e agendamento." },
    ],
  }),
  component: InformacoesPage,
});

const sections = [
  {
    icon: CreditCard,
    title: "1. Pagamento e confirmação",
    content: `O seu pedido estará oficialmente confirmado após o envio do comprovante de pagamento do sinal de 50% ou valor integral.

Formas de pagamento: Pix, dinheiro (trazendo na loja), ou cartão / link de pagamento (com acréscimo da maquininha).`,
  },
  {
    icon: Clock,
    title: "2. Horário de retirada",
    content: `Segunda a sábado, 7:30h às 18:00h. No domingo a confeitaria não funciona.`,
  },
  {
    icon: MapPin,
    title: "3. Endereço",
    content: `Rua Frei Hermenegildo, bairro Aurora, nº 43. São Luís — MA.

Temos disponibilidade somente para retirada, não fazemos entrega. Bolos de 2 ou mais andares são montados no local do evento.`,
  },
  {
    icon: ThermometerSnowflake,
    title: "4. Conservação",
    content: `Nossos produtos são artesanais e não possuem conservantes. O ideal é manter na geladeira e retirar até 2 horas antes do consumo. Não recomendamos deixar mais de 8 horas sem refrigeração.`,
  },
  {
    icon: Car,
    title: "5. Transporte",
    content: `No carro, o bolo deve ser levado no chão do lado do passageiro. Nunca leve no banco, pois pode inclinar e danificar. Não recomendamos fazer a retirada de moto — somente carro, que é mais seguro.

Ao solicitar retirada via aplicativo (Uber, 99) que é solicitado pelo cliente, não nos responsabilizamos por eventuais imprevistos durante o trajeto.`,
  },
  {
    icon: Cake,
    title: "6. Sobre nossos bolos",
    content: `O modelo enviado pelo cliente serve como referência do resultado desejado. Não é possível reproduzir um bolo 100% idêntico à referência, mesmo que seja um bolo já feito por nós anteriormente. Cada bolo é único, e por se tratar de um trabalho manual, sempre haverá pequenas variações em detalhes.`,
  },
  {
    icon: CalendarDays,
    title: "7. Agendamento",
    content: `A encomenda pode ser feita com até 42 horas de antecedência e no máximo dois meses antes da data. Os orçamentos têm validade apenas para o mês que foi enviado, podendo haver alterações de valores de acordo com o mercado/inflação.`,
  },
  {
    icon: AlertTriangle,
    title: "‼️ Importante",
    content: `Nossos produtos não são indicados para alérgicos ou lactantes, pois podem conter glúten, lactose, ovos ou oleaginosas.`,
  },
];

function InformacoesPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-cream/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          <Info className="h-3.5 w-3.5" />
          Antes de pedir
        </span>
        <h1 className="mt-5 font-display text-4xl leading-[1.1] tracking-tight text-foreground text-balance md:text-5xl">
          Informações importantes para fechar o seu pedido
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Para garantir a sua vaga na agenda e que tudo saia perfeito, por favor, leia com atenção os pontos abaixo.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {sections.map((s) => (
          <div
            key={s.title}
            className="rounded-lg border border-border bg-card p-7 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                {s.title}
              </h2>
            </div>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {s.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          to="/cardapio"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-burgundy-deep hover:gap-3"
        >
          Ir para o cardápio <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
