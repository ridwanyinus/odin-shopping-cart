import styles from "./Hambuger.module.scss";

interface HamburgerIconProps {
	isOpen: boolean;
}

export default function HamburgerIcon({ isOpen }: HamburgerIconProps) {
	const getLineClasses = (position: "top" | "middle" | "bottom") => {
		const baseClass = styles.hamburger__line;

		if (!isOpen) return baseClass;

		switch (position) {
			case "top":
				return `${baseClass} ${styles["hamburger__line--top-open"]}`;
			case "middle":
				return `${baseClass} ${styles["hamburger__line--middle-open"]}`;
			case "bottom":
				return `${baseClass} ${styles["hamburger__line--bottom-open"]}`;
			default:
				return baseClass;
		}
	};

	return (
		<div
			className={styles.hamburger}
			role="img"
			aria-label={isOpen ? "Close menu" : "Open menu"}
			aria-hidden="false"
		>
			<div className={getLineClasses("top")} aria-hidden="true" />
			<div className={getLineClasses("middle")} aria-hidden="true" />
			<div className={getLineClasses("bottom")} aria-hidden="true" />
			<span className="sr-only">
				{isOpen ? "Menu is open" : "Menu is closed"}
			</span>
		</div>
	);
}
