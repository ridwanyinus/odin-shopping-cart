import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, useMatches } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import Header from "@/components/Header/Header";

function RootLayout() {
	const matches = useMatches();

	useEffect(() => {
		const currentMatch = matches[matches.length - 1];
		const getTitle = currentMatch?.context?.getTitle;
		if (getTitle) {
			document.title = getTitle();
		} else {
			document.title = "Shop.co";
		}
	}, [matches]);

	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<ReactQueryDevtools buttonPosition="top-right" />
			<TanStackRouterDevtools />
		</>
	);
}

export default RootLayout;
