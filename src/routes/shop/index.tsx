import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "@tanstack/react-router";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import ProductCard from "@/components/ProductCard/ProductCard";
import PageLoader from "@/components/ui/PageLoader/PageLoader";
import type { Product, ProductCardProps } from "@/types/product";
import { api } from "../../lib/api";
import styles from "./Shop.module.scss";

const Shop = () => {
	const { data, error, isLoading } = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: () => api.getProducts(),
		staleTime: 1000 * 60 * 10, // cache for 10 minutes
	});
	if (error) return <ErrorMessage message={error.message} />;
	if (isLoading) return <PageLoader />;

	const shuffledProducts = data?.sort(() => Math.random() - 0.5);

	const productCards: ProductCardProps[] =
		shuffledProducts?.map((p) => ({
			imgUrl: p.thumbnail || p.images[0],
			title: p.title,
			price: p.price,
			reviews: p.reviews.map((r) => r.rating),
			id: p.id.toString(),
			discountPercentage: p.discountPercentage,
		})) ?? [];

	return (
		<main className={`${styles.shop} container`}>
			<h1>New Arrivals</h1>
			<div className={styles.shop__grid}>
				<ul>
					{productCards.map((pc) => (
						<li key={pc.id}>
							<Link
								to="/shop/product/$id"
								params={{ id: pc.id }}
								aria-label={pc.title}
							>
								<ProductCard {...pc} />
							</Link>
						</li>
					))}
				</ul>
			</div>
			<Outlet />
		</main>
	);
};

export default Shop;
