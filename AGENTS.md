<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Frontend-only storefront: all products/categories are mock data in `src/data/`; cart & wishlist live in `src/store/shop-context.tsx` (React context + localStorage). Why: spec forbids backend/APIs.
- Pure shop rules (filtering, sorting, cart totals, BDT formatting) live in `src/lib/shop.ts` with tests in `src/test/shop.test.ts`. Why: keeps business rules testable outside UI.
