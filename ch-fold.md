src/
 ├─ assets/                # Static assets (images, icons, fonts…)
 │   └─ logo.svg
 │
 ├─ components/            # Reusable UI building blocks
 │   ├─ Header/
 │   │   ├─ Header.tsx
 │   │   └─ Header.module.scss
 │   ├─ ProductCard/
 │   │   ├─ ProductCard.tsx
 │   │   └─ ProductCard.module.scss
 │   └─ CartItem/
 │       ├─ CartItem.tsx
 │       └─ CartItem.module.scss
 │
 ├─ context/               # App-level state management
 │   └─ CartContext.tsx
 │
 ├─ hooks/                 # Custom React hooks
 │   └─ useCart.ts
 │
 ├─ lib/                   # Utilities, API clients
 │   ├─ api.ts             # Fetch functions (e.g. getProducts)
 │   └─ helpers.ts         # Pure utility functions
 │
 ├─ routes/                # Page-level routes
 │   ├─ __root.tsx         # Root route (layout with <Header/> + <Outlet/>)
 │   ├─ home.tsx           # Home page
 │   ├─ shop.tsx           # Shop page (list products, add to cart)
 │   └─ cart.tsx           # Cart page
 │
 ├─ styles/                # Global styles, variables, mixins
 │   ├─ _variables.scss
 │   ├─ _mixins.scss
 │   └─ global.scss
 │
 ├─ tests/                 # Unit/integration tests
 │   ├─ components/
 │   │   └─ ProductCard.test.tsx
 │   ├─ routes/
 │   │   └─ shop.test.tsx
 │   └─ setup.ts           # Vitest + RTL setup (custom render, providers)
 │
 ├─ main.tsx               # App entry point (createRouter, RouterProvider)
 └─ vite-env.d.ts
