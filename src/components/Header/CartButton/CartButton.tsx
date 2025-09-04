import { Link } from "@tanstack/react-router";
import cartIcon from "@/assets/cart.svg";
import styles from "./CartButton.module.scss";

interface CartButtonProps {
	itemCount: number;
	isAnimating: boolean;
	className?: string;
}

export default function CartButton({
	itemCount,
	isAnimating,
	className,
}: CartButtonProps) {
	const hasItems = itemCount > 0;
	const ariaLabel = hasItems
		? `View cart (${itemCount} ${itemCount === 1 ? "item" : "items"})`
		: "View cart (empty)";

	return (
		<Link
			to="/cart"
			aria-label={ariaLabel}
			className={`${styles.cartButton} ${className || ""}`}
		>
			<img src={cartIcon} alt="" width="24" height="24" />
			{hasItems && (
				<span
					className={`${styles.cartButton__badge} ${
						isAnimating ? styles["cartButton__badge--animating"] : ""
					}`}
					aria-hidden="true"
				>
					{itemCount}
				</span>
			)}
		</Link>
	);
}
