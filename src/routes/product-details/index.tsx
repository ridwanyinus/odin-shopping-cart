import Breadcrumb from "@/components/BreadCumb/Breadcrumb";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import PageLoader from "@/components/ui/PageLoader/PageLoader";
import { api } from "@/lib/api";
import type { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

const ProductDetails = () => {
	const { id: productId } = useParams({ strict: false });

	const parsedId = productId ? Number.parseInt(productId) : undefined;

	const { data, error, isLoading } = useQuery<Product>({
		queryKey: ["product", parsedId],
		queryFn: () => api.getProductById(parsedId as number),
		staleTime: 1000 * 60 * 10, // cache for 10 minutes
		enabled: Boolean(productId),
	});

	if (data) console.log(data);

	if (error) return <ErrorMessage message={error.message} />;
	if (isLoading) return <PageLoader />;

	return (
		<div>
			<Breadcrumb />
		</div>
	);
};

export default ProductDetails;
