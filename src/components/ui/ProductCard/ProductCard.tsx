import type { ProductCardProps } from "@/types/product";
import emptyStar from "/codicon--star-empty.svg";
import fullStar from "/codicon--star-full.svg";
import halfStar from "/codicon--star-half.svg";
import styles from "./Product.module.scss";

const ProductCard = ({
	imgUrl,
	title,
	reviews,
	price,
	discountPercentage,
}: ProductCardProps) => {
	const avgRating =
		reviews.length > 0
			? reviews.reduce((sum, r) => sum + r, 0) / reviews.length
			: 0;

	const discountedPrice = price - (price * discountPercentage) / 100;

	const calcStars = () => {
		const fullStars = Math.floor(avgRating);
		const hasHalfStar = avgRating % 1 >= 0.5;
		const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
		const stars = [
			...Array(fullStars).fill(fullStar),
			...(hasHalfStar ? [halfStar] : []),
			...Array(emptyStars).fill(emptyStar),
		];
		return stars.map((star, i) => <img key={i} src={star} alt="star" />);
	};

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
            {calcStars()}
         </div>
         <span className={styles.productCard__ratingText}>
            {avgRating.toFixed(1)}/5
         </span>
      </div>
      <div className={styles.productCard__prices}>
         {discountedPrice < price && (
            <span
               className={styles.productCard__originalPrice}
               aria-label={`Original price $${price}`}
            >
               <s>${price}</s>
            </span>
         )}
         <span
            className={styles.productCard__currentPrice}
            aria-label={`Current price $${discountedPrice.toFixed(1)}`}
         >
            ${discountedPrice.toFixed(1)}
         </span>
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
