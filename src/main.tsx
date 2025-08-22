import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	Outlet,
	RouterProvider,
	createRootRoute,
	createRoute,
	createRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import NotFound from "./components/ui/NotFound/NotFound.tsx";
import { api } from "./lib/api.ts";
import ProductDetails from "./routes/product-details/index.tsx";
import Shop from "./routes/shop/index.tsx";

import Header from "./components/Header/Header.tsx";

import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";

import "./styles/index.scss";
import reportWebVitals from "./reportWebVitals.ts";

import App from "./App.tsx";

const rootRoute = createRootRoute({
	component: () => {
		return (
			<div>
				<Header />
				<Outlet />
				<ReactQueryDevtools buttonPosition="top-right" />
				<TanStackRouterDevtools />
			</div>
		);
	},
	notFoundComponent: () => <NotFound />,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: App,
});

const shopRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/shop",
	context: () => ({
		getTitle: () => "Shop",
	}),
	component: Shop,
});



const productRoute = createRoute({
   getParentRoute: () => rootRoute,
   path: "/shop/product/$id",
   loader: async ({ params }) => {
      const product = await api.getProductById(Number.parseInt(params.id));
      return { product };
   },
   beforeLoad: async ({ params }) => {
      const product = await api.getProductById(Number.parseInt(params.id));
      return {
         getTitle: () => product.title,
      };
   },
   component: ProductDetails,
});

const routeTree = rootRoute.addChildren([indexRoute, shopRoute, productRoute]);

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
	routeTree,
	context: {
		...TanStackQueryProviderContext,
	},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
				<RouterProvider router={router} />
			</TanStackQueryProvider.Provider>
		</StrictMode>,
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
