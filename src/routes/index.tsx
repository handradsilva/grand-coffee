import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, Star, StarHalf, Heart, Award, Leaf } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import depo1 from "@/assets/depoimento-1.jpg";
import depo2 from "@/assets/depoimento-2.jpg";
import depo3 from "@/assets/depoimento-3.jpg";

import heroImg from "@/assets/hero.jpg";
import doces from "@/assets/cat-doces.jpg";
import bolos from "@/assets/cat-bolos.jpg";
import cupcakes from "@/assets/cat-cupcakes.jpg";
import bemCasados from "@/assets/cat-bem-casados.jpg";
import kits from "@/assets/cat-kits.jpg";
import comboCasamento from "@/assets/cat-combo-casamento.jpg";
import { categories } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grand Coffee Confeitaria — Artesanal em São Luís" },
      { name: "description", content: "Bolos, brigadeiros gourmet, macarons e kits de festa feitos com técnica e ingredientes selecionados." },
    ],
  }),
  component: Home,
});

const catImg: Record<string, string> = { doces, bolos, cupcakes, "bem-casados": bemCasados, kits, "combo-casamento": comboCasamento };

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-cream/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              Confeitaria artesanal
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl lg:text-7xl">
              O sabor que <em className="text-primary not-italic font-medium italic">adoça</em> seus momentos.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Bolos, doces e kits de festa feitos à mão na Grand Coffee — com técnica, tempo e ingredientes selecionados.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/cardapio"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-burgundy-deep hover:gap-3"
              >
                Ver cardápio <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/informacoes"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary/5"
              >
                Informações para clientes
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Receitas autorais</div>
              <div className="flex items-center gap-2"><Leaf className="h-4 w-4 text-primary" /> Ingredientes selecionados</div>
              <div className="flex items-center gap-2"><Heart className="h-4 w-4 text-primary" /> Feito à mão</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-6 -top-6 h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-md shadow-2xl shadow-primary/15">
              <img
                src={heroImg}
                alt="Café, brigadeiros, macarons e bolo de chocolate da Grand Coffee"
                width={1600}
                height={1100}
                fetchPriority="high"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-md border border-border bg-background/95 p-5 shadow-xl backdrop-blur sm:block">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <div className="text-sm font-semibold">4,9 / 5</div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">+ 380 avaliações de clientes</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categorias" className="border-y border-border/60 bg-secondary/30 py-20 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Categorias</p>
              <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Para cada ocasião</h2>
            </div>
            <Link to="/cardapio" className="hidden text-sm font-semibold uppercase tracking-wider text-primary underline-offset-4 hover:underline md:inline-flex">
              Ver tudo →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 grid-cols-2">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/cardapio"
                className="group relative overflow-hidden rounded-md bg-card"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={catImg[c.id]} alt={c.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/85 via-burgundy-deep/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
                  <h3 className="font-display text-2xl">{c.label}</h3>
                  <p className="mt-1 text-xs opacity-90">{c.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-cream/80">Sobre a Grand Coffee</p>
            <h2 className="mt-3 font-display text-4xl text-balance md:text-5xl">Confeitaria feita com tempo, técnica e qualidade!</h2>
            <p className="mt-6 text-base leading-relaxed text-cream/85">
              Cada receita é nossa, cada ingrediente é escolhido — e cada pedido é único.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Stat n="+4" l="anos de cozinha" />
            <Stat n="+20" l="receitas autorais" />
            <Stat n="+5k" l="pedidos entregues" />
            <Stat n="4,9" l="estrelas em avaliações" />
          </div>
        </div>
      </section>

      {/* FEEDBACKS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Feedbacks</p>
            <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Quem prova, volta.</h2>
            <div className="mt-4 flex items-center justify-center gap-1 text-gold">
              {[...Array(4)].map((_, i) => <Star key={i} className="h-5 w-5 fill-gold" />)}
              <StarHalf className="h-5 w-5 fill-gold" />
              <span className="ml-2 text-sm font-semibold text-foreground">4,9 / 5</span>
            </div>
          </div>
          <FeedbacksCarousel />
        </div>
      </section>


      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-cream to-accent px-8 py-16 text-center md:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-4xl text-primary text-balance md:text-5xl">
            Faça do próximo momento algo doce.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">Encomende online em poucos cliques. Retirada na loja.</p>
          <a
            href="#categorias"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all hover:bg-burgundy-deep hover:gap-3"
          >
            Fazer pedido <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}

function FeedbacksCarousel() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const slides = [depo1, depo2, depo3, depo1, depo2, depo3];
  return (
    <div className="mx-auto mt-12 max-w-5xl">
      <Carousel
        opts={{ loop: true, align: "center" }}
        plugins={[autoplay.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {slides.map((src, i) => (
            <CarouselItem key={i} className="pl-4 basis-[78%] sm:basis-1/2 lg:basis-1/3">
              <div className="overflow-hidden rounded-md border border-border bg-card shadow-sm transition-transform">
                <img
                  src={src}
                  alt={`Feedback de cliente ${i + 1}`}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-md border border-cream/15 bg-burgundy-deep/40 p-6">
      <div className="font-display text-4xl font-semibold">{n}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-cream/70">{l}</div>
    </div>
  );
}
