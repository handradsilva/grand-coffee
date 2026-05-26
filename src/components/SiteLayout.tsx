import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Instagram, MapPin, Phone, Clock } from "lucide-react";
import { type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { formatBRL } from "@/lib/products";
import { BrandMark } from "./Brand";

function FloatingCartCTA() {
  const { count, subtotal } = useCart();
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (count === 0 || path === "/sacola") return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 pointer-events-none">
      <Link
        to="/sacola"
        className="pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-3 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:bg-burgundy-deep active:scale-[0.98]"
      >
        <span className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" />
          Ir para a sacola
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cream px-1.5 text-xs font-bold text-primary">{count}</span>
        </span>
        <span className="font-display">{formatBRL(subtotal)}</span>
      </Link>
    </div>
  );
}

function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="transition-opacity hover:opacity-80">
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-9 text-sm font-medium md:flex">
          <Link to="/" className="text-foreground/80 transition-colors hover:text-primary [&.active]:text-primary">Início</Link>
          <Link to="/cardapio" className="text-foreground/80 transition-colors hover:text-primary [&.active]:text-primary">Cardápio</Link>
          <Link to="/informacoes" className="text-foreground/80 transition-colors hover:text-primary [&.active]:text-primary">Informações</Link>
          <Link to="/sobre" className="text-foreground/80 transition-colors hover:text-primary [&.active]:text-primary">Sobre</Link>
          <Link to="/contato" className="text-foreground/80 transition-colors hover:text-primary [&.active]:text-primary">Contato</Link>
        </nav>
        <Link
          to="/sacola"
          className="relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-burgundy-deep"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Sacola</span>
          {count > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cream px-1.5 text-xs font-semibold text-primary">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2 max-w-sm">
            <BrandMark />
          </div>
          <div>
            <h4 className="font-display text-base font-semibold text-primary">Contato</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" />(98) 98714-9819</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />Rua Frei Hermenegildo, n°43, Bairro Aurora — São Luís — MA</li>
              <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0" />Seg — Sáb · 7h30 às 18h</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base font-semibold text-primary">Nos siga</h4>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/grandcoffee_slz/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-border p-2.5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Grand Coffee Confeitaria. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingCartCTA />
    </div>
  );
}
