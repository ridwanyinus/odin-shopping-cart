# Shop.co - E-commerce Shopping Cart

A modern e-commerce shopping cart application built with React 19 and TypeScript, featuring a clean design and intuitive shopping experience.

## Features

- 🛍️ Browse products from multiple categories (men's shirts, tops, women's dresses)
- 📱 Responsive design optimized for all devices
- 🛒 Shopping cart functionality
- 🔍 Product details
- ⚡ Fast performance with Vite build system
- 🧪 Comprehensive testing with Vitest

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: TanStack Router 
- **State Management**: TanStack Query for server state
- **Styling**: SCSS modules
- **Build Tool**: Vite
- **Testing**: Vitest with Testing Library
- **Linting**: Biome
- **API**: [DummyJSON](https://dummyjson.com/docs/products) for product data

## Quick Start

### Prerequisites

- Node.js (version 18+)
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ridwanyinus/odin-shopping-cart.git
cd odin-shopping-cart

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production
- `pnpm serve` - Preview production build
- `pnpm test` - Run test suite
- `pnpm lint` - Lint code with Biome
- `pnpm format` - Format code with Biome
- `pnpm check` - Run linting and formatting checks

## Project Structure

```
src/
├── components/     # Reusable UI components
├── routes/         # Page components
│   ├── cart/       # Shopping cart page
│   ├── shop/       # Product listing page
│   └── product-details/ # Individual product page
├── hooks/          # Custom React hooks
├── lib/            # API utilities
├── types/          # TypeScript type definitions
├── utils/          # Helper functions
└── styles/         # Global styles
```

## License

This project is part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart) curriculum.
