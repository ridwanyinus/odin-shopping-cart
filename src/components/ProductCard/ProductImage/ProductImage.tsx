import { useState } from "react";
import styles from "./ProductImage.module.scss";

interface ProductImageProps {
	src: string;
	alt: string;
	className?: string;
}

const ProductImage = ({ src, alt, className }: ProductImageProps) => {
	const [hasImageError, setHasImageError] = useState(false);
	const [isImageLoading, setIsImageLoading] = useState(true);

	const handleImageLoad = () => {
		setIsImageLoading(false);
	};

	const handleImageError = () => {
		setHasImageError(true);
		setIsImageLoading(false);
	};

	// Todo: work on the fallback image and skeleton
	return (
		<div className={`${styles.productImage} ${className || ""}`}>
			{isImageLoading && (
				<div
					className={styles.productImage__skeleton}
					aria-label="Loading product image"
				/>
			)}

			{hasImageError ? (
				<div
					className={styles.productImage__fallback}
					role="img"
					aria-label={`${alt} - Image unavailable`}
				>
					<span className={styles.productImage__fallbackText}>
						Image not available
					</span>
				</div>
			) : (
				<img
					src={src}
					alt={alt}
					className={styles.productImage__img}
					onLoad={handleImageLoad}
					onError={handleImageError}
					loading="lazy"
					decoding="async"
				/>
			)}
		</div>
	);
};

export default ProductImage;
