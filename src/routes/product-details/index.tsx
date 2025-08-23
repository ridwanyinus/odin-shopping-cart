import Breadcrumb from "@/components/BreadCumb/Breadcrumb";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import PageLoader from "@/components/ui/PageLoader/PageLoader";
import { api } from "@/lib/api";
import type { Product } from "@/types/product";
import {
	calculateAverageRating,
	calculateDiscountedPrice,
	generateStarImagePaths,
} from "@/utils";
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

	const {
		price = 0,
		discountPercentage = 0,
		reviews: rating,
		title,
		description,
	} = data ?? {};

	const reviews = rating?.map((r) => r.rating) ?? [];

	const avgRating = calculateAverageRating(reviews);
	const discountedPrice = calculateDiscountedPrice(
		price ?? 0,
		discountPercentage ?? 0,
	);
	const stars = generateStarImagePaths(avgRating);

	return (
		<div className="container">
			<Breadcrumb />

			<main className={styles.productDetails}>
				<section className={styles.galleryGrid}>
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
				</section>

				<section className={styles.productDetails__info}>
					<div className={styles.productDetails__content}>
						<h2 className={styles.productDetails__title}>
							{title}
							<span className="sr-only">{title} - Product details</span>
						</h2>
						<div
							className={styles.productDetails__rating}
							role="img"
							aria-label={`Rated ${avgRating.toFixed(1)} out of 5 stars`}
						>
							<div className={styles.productDetails__stars} aria-hidden="true">
								{stars.map((star, idx) => (
									<img key={idx} src={star} alt="star" />
								))}
							</div>
							<span className={styles.productDetails__ratingText}>
								{avgRating.toFixed(1)}/5
							</span>
						</div>
						<div className={styles.productDetails__prices}>
							<span
								className={styles.productDetails__currentPrice}
								aria-label={`Current price $${discountedPrice.toFixed(1)}`}
							>
								${discountedPrice.toFixed(1)}
							</span>
							{discountedPrice < price && (
								<span
									className={styles.productDetails__originalPrice}
									aria-label={`Original price $${price}`}
								>
									<s>${price}</s>
								</span>
							)}
							{discountedPrice < price && (
								<small
									className={styles.productDetails__discount}
									aria-label={`${discountPercentage.toFixed()}% discount`}
								>
									-{discountPercentage.toFixed()}%
								</small>
							)}
						</div>
						<p className={styles.productDetails__description}>{description}</p>
					</div>

					<div className={styles.productDetails__actions}>
						<div
							className={`button--secondary ${styles.productDetails__counter}`}
						>
							<button type={"button"} className="plus">
								+
							</button>
							<span>1</span>
							<button type={"button"} className="minus">
								-
							</button>
						</div>

						<div className={styles.productDetails__addToCart}>
							<button type="button" className="button--primary">
								Add to Cart
							</button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default ProductDetails;
