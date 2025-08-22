import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface MyRouterContext {
  queryClient: QueryClient
  getTitle: () => string
}

export function getContext(): MyRouterContext {
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
