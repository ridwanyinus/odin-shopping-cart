import { formatCurrency } from "@/utils";
import styles from "./ProductPricing.module.scss";

interface ProductPricingProps {
	currentPrice: number;
	originalPrice: number;
	discountPercentage: number;
	hasDiscount: boolean;
	className?: string;
	currency?: string;
}

const ProductPricing = ({
	currentPrice,
	originalPrice,
	discountPercentage,
	hasDiscount,
	className,
	currency = "USD",
}: ProductPricingProps) => {
	const formattedCurrentPrice = formatCurrency(currentPrice, currency);
	const formattedOriginalPrice = formatCurrency(originalPrice, currency);
	const roundedDiscountPercentage = Math.round(discountPercentage);

	return (
		<div className={`${styles.productPricing} ${className || ""}`}>
			<div className={styles.productPricing__prices}>
				<span
					className={styles.productPricing__currentPrice}
					aria-label={`Current price: ${formattedCurrentPrice}`}
				>
					{formattedCurrentPrice}
				</span>

				{hasDiscount && (
					<>
						<span
							className={styles.productPricing__originalPrice}
							aria-label={`Original price: ${formattedOriginalPrice}`}
						>
							<s>{formattedOriginalPrice}</s>
						</span>

						<span
							className={styles.productPricing__discount}
							aria-label={`${roundedDiscountPercentage}% discount`}
						>
							-{roundedDiscountPercentage}%
						</span>
					</>
				)}
			</div>

			{hasDiscount && (
				<div className={styles.productPricing__savings}>
					<span className="sr-only">
						You save {formatCurrency(originalPrice - currentPrice, currency)}
					</span>
				</div>
			)}
		</div>
	);
};

export default ProductPricing;
