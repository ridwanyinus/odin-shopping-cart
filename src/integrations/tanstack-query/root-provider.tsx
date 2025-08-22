import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function getContext(): {
	queryClient: QueryClient;
	getTitle: () => string;
} {
	const queryClient = new QueryClient();

	return {
		queryClient,
		getTitle: () => "Home",
	};
}

export function Provider({
	children,
	queryClient,
}: {
	children: React.ReactNode;
	queryClient: QueryClient;
}) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
