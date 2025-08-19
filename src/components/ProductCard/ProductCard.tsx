import type { ProductCardProps } from "@/types/product";
import emptyStar from "/codicon--star-empty.svg";
import fullStar from "/codicon--star-full.svg";
import halfStar from "/codicon--star-half.svg";
import styles from "./Product.module.scss";

const ProductCard = ({ imgUrl, title, reviews, price }: ProductCardProps) => {
	const avgRating =
		reviews.length > 0
			? reviews.reduce((sum, r) => sum + r, 0) / reviews.length
			: 0;

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
				<img src={imgUrl} alt="product" />
			</div>

			<div className={styles.productCard__content}>
				<p className={styles.productCard__title}>{title}</p>
				<div className={styles.productCard__rating}>
					<div className={styles.productCard__stars}>{calcStars()}</div>
					<p>
						{avgRating.toFixed(1)}/<span>5</span>
					</p>
				</div>
				<p className={styles.productCard__price}>${price}</p>
			</div>
		</div>
	);
};

export default ProductCard;
