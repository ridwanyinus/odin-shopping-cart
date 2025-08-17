import { createRoute } from "@tanstack/react-router";

import type { RootRoute } from "@tanstack/react-router";

function TanStackQueryDemo() {
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
