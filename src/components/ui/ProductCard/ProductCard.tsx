import type { ProductCardProps } from "@/types/product";
import {
	calculateAverageRating,
	calculateDiscountedPrice,
	generateStarImagePaths,
} from "@/utils";
import styles from "./Product.module.scss";

const ProductCard = ({
	imgUrl,
	title,
	reviews,
	price,
	discountPercentage,
}: ProductCardProps) => {
	const avgRating = calculateAverageRating(reviews);
	const discountedPrice = calculateDiscountedPrice(price, discountPercentage);
	const stars = generateStarImagePaths(avgRating);

	return (
		<div className={styles.productCard}>
			<div className={styles.productCard__imageWrapper}>
				<img src={imgUrl} alt={`${title} product`} />
			</div>
			<div className={styles.productCard__content}>
				<h3 className={styles.productCard__title}>
					{title}
					<span className="sr-only"> - Product details</span>
				</h3>
				<div
					className={styles.productCard__rating}
					role="img"
					aria-label={`Rated ${avgRating.toFixed(1)} out of 5 stars`}
				>
					<div className={styles.productCard__stars} aria-hidden="true">
						{stars.map((star, idx) => (
							<img key={idx} src={star} alt="star" />
						))}
					</div>
					<span className={styles.productCard__ratingText}>
						{avgRating.toFixed(1)}/5
					</span>
				</div>
				<div className={styles.productCard__prices}>
					<span
						className={styles.productCard__currentPrice}
						aria-label={`Current price $${discountedPrice.toFixed(1)}`}
					>
						${discountedPrice.toFixed(1)}
					</span>
					{discountedPrice < price && (
						<span
							className={styles.productCard__originalPrice}
							aria-label={`Original price $${price}`}
						>
							<s>${price}</s>
						</span>
					)}
					{discountedPrice < price && (
						<small
							className={styles.productCard__discount}
							aria-label={`${discountPercentage.toFixed()}% discount`}
						>
							-{discountPercentage.toFixed()}%
						</small>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
