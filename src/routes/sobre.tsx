import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Grand Coffee Confeitaria" },
      { name: "description", content: "Conheça a história, os valores e a paixão da Grand Coffee Confeitaria." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Nossa história</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl text-balance md:text-6xl">
        Uma confeitaria nascida do <em className="font-medium italic text-primary">amor</em> pelo detalhe.
      </h1>

      <div className="mt-12 overflow-hidden rounded-lg">
        <img src={heroImg} alt="Mesa com café e doces da Grand Coffee" className="aspect-[21/9] w-full object-cover" />
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2 space-y-5 text-base leading-relaxed text-foreground/85">
          <p>A Grand Coffee começou numa cozinha pequena, com receitas de família e a ambição teimosa de chegar ao ponto perfeito. Massa fofa, ganache brilhante, café fresco no balcão — cada detalhe importava.</p>
          <p>Hoje, atendemos centenas de festas, encontros e momentos cotidianos que pedem algo doce. Continuamos artesanais: receitas autorais, ingredientes selecionados, e o capricho que só quem ama o que faz coloca em cada pedido.</p>
          <p>Mais do que doces, entregamos memória afetiva. E é por isso que tantos clientes voltam — não pela conveniência, mas pela emoção do primeiro pedaço.</p>
        </div>
        <aside className="space-y-4 rounded-lg border border-border bg-secondary/40 p-7">
          <h3 className="font-display text-xl text-primary">Nossos valores</h3>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li>• Artesanal e autoral</li>
            <li>• Ingredientes selecionados</li>
            <li>• Atendimento próximo</li>
            <li>• Compromisso com prazos</li>
            <li>• Apresentação impecável</li>
          </ul>
          <Link to="/cardapio" className="mt-4 inline-flex w-full justify-center rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-burgundy-deep">
            Ver cardápio
          </Link>
        </aside>
      </div>
    </div>
  );
}
