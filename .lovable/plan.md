## Objetivo

Substituir as imagens dos 5 produtos da categoria **Mini Decor** pelas fotos anexadas, usando o mesmo padrão de carrossel já existente (touch/swipe + auto-avanço de 4 em 4 segundos) quando houver mais de uma foto.

## Mapeamento imagem → produto

| Produto | Imagens |
|---|---|
| Decoração Rústica | `decoracao_rustica.jpeg` (1) |
| Festa no Carrinho | `festa_no_carrinho.jpeg`, `festa_no_carrinho_1.jpeg`, `festa_no_carrrrinho.jpeg` (3) |
| Mesa Ripada | `mesa_ripada.jpeg` (1) |
| Carrinho ou Mesa | `carrinho_ou_mesa.jpeg`, `carrinho_ou_mesa_2.jpeg`, `carrinho_ou_mesa_3.jpeg` (3) |
| Mesa Minimalista | `mesa_minimalista.jpeg` (1) |

## Passos

1. Copiar as 9 fotos de `user-uploads://` para `src/assets/` (nomes normalizados, ex: `p-mini-decor-rustica.jpeg`, `p-mini-decor-festa-carrinho-1.jpeg`, etc.).
2. Em `src/lib/products.ts`: importar as novas imagens e trocar o campo `image` (placeholder `kitFesta`) dos 5 produtos Mini Decor pela 1ª imagem de cada um.
3. Em `src/components/ProductCard.tsx`:
   - Adicionar 2 arrays de imagens: `FESTA_CARRINHO_IMAGES` e `CARRINHO_OU_MESA_IMAGES` (cada um com 3 fotos).
   - No `renderImage`/switch que escolhe `ImageCarousel`, adicionar 2 casos para esses produtos usando o componente `ImageCarousel` já existente (auto-avanço 4s + swipe já implementados).
   - Os 3 produtos com uma única foto usam o `image` padrão do produto, sem carrossel.

Não há mudanças em lógica de negócio — só ativos e renderização.
