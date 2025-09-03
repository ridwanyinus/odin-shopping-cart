import type { ProductCardProps } from "@/types/product";
import {
	calculateAverageRating,
	calculateDiscountedPrice,
	generateStarImagePaths,
} from "@/utils";
import styles from "./ProductCard.module.scss";
import ProductImage from "./ProductImage/ProductImage";
import ProductPricing from "./ProductPricing/ProductPricing";
import ProductRating from "./ProductRating/ProductRating";

const ProductCard = ({
	imgUrl,
	title,
	reviews,
	price,
	discountPercentage,
}: ProductCardProps) => {
	const averageRating = calculateAverageRating(reviews);
	const discountedPrice = calculateDiscountedPrice(price, discountPercentage);
	const starImagePaths = generateStarImagePaths(averageRating);
	const reviewCount = reviews?.length || 0;
	const hasDiscount = discountedPrice < price;

	return (
		<article
			className={styles.productCard}
			aria-label={`View details for ${title}`}
		>
			<ProductImage
				src={imgUrl}
				alt={title}
				className={styles.productCard__image}
			/>

			<div className={styles.productCard__content}>
				<header>
					<h3 className={styles.productCard__title}>
						{title}
						<span className="sr-only"> - Product details</span>
					</h3>
				</header>

				<ProductRating
					rating={averageRating}
					reviewCount={reviewCount}
					starPaths={starImagePaths}
				/>

				<ProductPricing
					currentPrice={discountedPrice}
					originalPrice={price}
					discountPercentage={discountPercentage}
					hasDiscount={hasDiscount}
					className={styles.productCard__pricing}
				/>
			</div>
		</article>
	);
};

export default ProductCard;
