import Breadcrumb from "@/components/BreadCumb/Breadcrumb";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import PageLoader from "@/components/ui/PageLoader/PageLoader";
import { api } from "@/lib/api";
import type { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
import styles from "./ProductDetails.module.scss";

const ProductDetails = () => {
	const [mainImage, setMainImage] = useState("");
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

	const handleChangeMainImage = (imgSrc: string) => {
		setMainImage(imgSrc);
	};

	return (
		<div className="container">
			<Breadcrumb />

			<section className={styles.productDetails}>
				<div className={styles.galleryGrid}>
					<div className={styles.thumbnails__container}>
						{data?.images.map((image, index) => (
							<button
								type="button"
								key={index}
								className={`${styles.thumbnail} ${styles[`thumbnail${index + 1}`]}`}
								onClick={() => handleChangeMainImage(image)}
								onKeyUp={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										handleChangeMainImage(image);
									}
								}}
							>
								<img src={image} alt="" />
							</button>
						))}
					</div>
					<div className={`${styles.mainImage__container}`}>
						<img
							className={styles.mainImage}
							src={mainImage || data?.images[0]}
							alt=""
						/>
					</div>
				</div>

				<div>
					<h2>One Life Graphic T-shirt</h2>
				</div>
			</section>
		</div>
	);
};

export default ProductDetails;
