import { useQuery } from "@tanstack/react-query";
import { createRoute } from "@tanstack/react-router";

import type { RootRoute } from "@tanstack/react-router";

function TanStackQueryDemo() {
	const { data } = useQuery({
		queryKey: ["todos"],
		queryFn: () =>
			Promise.resolve([
				{ id: 1, name: "Alice" },
				{ id: 2, name: "Bob" },
				{ id: 3, name: "Charlie" },
			]),
		initialData: [],
	});

	return (
		<>
			<div>app</div>
		</>
	);
}

export default (parentRoute: RootRoute) =>
	createRoute({
		path: "/demo/tanstack-query",
		component: TanStackQueryDemo,
		getParentRoute: () => parentRoute,
	});
