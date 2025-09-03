import styles from "./ProductRating.module.scss";

interface ProductRatingProps {
	rating: number;
	reviewCount: number;
	starPaths: string[];
	className?: string;
}

const ProductRating = ({
	rating,
	reviewCount,
	starPaths,
	className
}: ProductRatingProps) => {
	const formattedRating = rating.toFixed(1);
	const ratingText = reviewCount > 0
		? `${formattedRating} out of 5 stars based on ${reviewCount} reviews`
		: `${formattedRating} out of 5 stars`;

	return (
		<div className={`${styles.productRating} ${className || ""}`}>
			<div
				className={styles.productRating__stars}
				role="img"
				aria-label={ratingText}
			>
				{starPaths.map((starPath, index) => (
					<img
						key={`star-${index}`}
						src={starPath}
						alt=""
						role="presentation"
						className={styles.productRating__star}
						width="16"
						height="16"
					/>
				))}
			</div>

			<div className={styles.productRating__info}>
				<span
					className={styles.productRating__score}
					aria-label={`Rating: ${formattedRating} out of 5`}
				>
					{formattedRating}/5
				</span>
			</div>
		</div>
	);
};

export default ProductRating;