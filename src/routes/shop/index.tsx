import ProductCard from "@/components/ProductCard/ProductCard";
import type { Product, ProductCardProps } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { createRoute } from "@tanstack/react-router";
import type { RootRoute } from "@tanstack/react-router";
import { api } from "../../lib/api";
import styles from "./Shop.module.scss";
function Shop() {
	const { data, error, isLoading } = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: () => api.getProducts(),
	});
	if (isLoading) return <div>Loading...</div>;
	// TODO: create loading page
	if (error) return <div>Error: {error.message}</div>;

	const productCards: ProductCardProps[] =
		data?.map((p) => ({
			imgUrl: p.thumbnail,
			title: p.title,
			price: p.price,
			reviews: p.reviews.map((r) => r.rating),
		})) ?? [];

	return (
		<main className={`${styles.shop} container`}>
			{productCards.map((pc) => (
				<ul key={pc.title}>
					<li>
						<ProductCard {...pc} />
					</li>
				</ul>
			))}
		</main>
	);
}

export default (parentRoute: RootRoute) =>
	createRoute({
		path: "/shop",
		component: Shop,
		getParentRoute: () => parentRoute,
	});
