# Cake House (Monorepo)

This workspace contains a Next.js frontend for `Cake House` (a demo bakery / cake shop). The frontend lives in the `client/` folder and is a modern, responsive storefront built with Next.js, Tailwind CSS, and Framer Motion.

This README gives a quick overview of the project and how to run the frontend locally.

## Project layout

- client/ — the Next.js frontend (primary app for this repository)
  - src/app — the application with app routes and components
  - src/app/components — UI components (Header, Hero, BestSellers, Cart, Footer, etc.)
  - src/app/context — Cart + Toast context providers

## Quick start (frontend)

1. Install dependencies and start the dev server (from repo root):

```powershell
cd client
npm install
npm run dev
```

2. Open http://localhost:3000

## Key features (frontend)

- Responsive product listing and single product pages
- Global cart with grouped items and quantity support
- UI polish: hero animation, product card controls, toast notifications
- Custom-order promo and dedicated /custom-order page (demo form saved to localStorage)
- Header & footer redesigned for a bakery brand

## Local data / persistence

- Cart is stored in localStorage (key: `cart`) and persists between reloads.
- Custom orders are saved locally for demo purposes at `sd_custom_orders`.

## Next recommended tasks

- Add server-side handling for orders and newsletter subscription
- Add file/image upload for custom order references
- Add unit tests (CartContext) to lock-in cart behaviour

---

If you'd like, I can now:
- run the dev server and validate runtime issues,
- add uploads to the custom-order flow,
- or add tests for critical contexts (Cart/Toast).

Pick the next step you'd like me to take and I'll continue. 
