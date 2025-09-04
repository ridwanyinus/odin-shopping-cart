import { Link } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";
import profileIcon from "@/assets/profile.svg";
import searchMobileIcon from "@/assets/search-mobile.svg";
import { useCart } from "@/hooks/useCart";
import HamburgerIcon from "../ui/Hamburger/Hambuger";
import CartButton from "./CartButton/CartButton";
import styles from "./Header.module.scss";
import MobileNavigation from "./MobileNavigation/MobileNavigation";
import SearchForm from "./SearchForm/SearchForm";

const CART_ANIMATION_DURATION = 200;

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isCartAnimating, setIsCartAnimating] = useState(false);

	const { cart } = useCart();

	const cartItemsCount = cart.length;

	const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

	const mobileNavId = useId();

	useEffect(() => {
		if (cartItemsCount > 0) {
			setIsCartAnimating(true);
			const timer = setTimeout(
				() => setIsCartAnimating(false),
				CART_ANIMATION_DURATION,
			);
			return () => clearTimeout(timer);
		}
	}, [cartItemsCount]);

	// Prevents body scroll when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	return (
		<header className={`${styles.header} container`}>
			{/* Mobile Menu Toggle */}
			<button
				type="button"
				onClick={toggleMobileMenu}
				aria-expanded={isMobileMenuOpen}
				aria-controls={mobileNavId}
				className={styles.header__mobileMenuToggle}
			>
				<HamburgerIcon isOpen={isMobileMenuOpen} />
			</button>

			{/* Logo */}
			<div className={styles.header__logoContainer}>
				<Link
					to="/"
					className={styles.header__logo}
					aria-label="SHOP.CO - Go to homepage"
				>
					SHOP.CO
				</Link>
			</div>

			{/* Desktop Navigation */}
			<nav
				className={styles.header__desktopNav}
				aria-label="Desktop navigation"
			>
				<ul>
					<li>
						<Link to="/shop">Shop</Link>
						<Link to=".">Categories</Link>
					</li>
				</ul>
			</nav>

			{/* Mobile Navigation */}
			<MobileNavigation
				isOpen={isMobileMenuOpen}
				navId={mobileNavId}
				onClose={() => setIsMobileMenuOpen(false)}
			/>

			<div className={styles.header__actionsContainer}>
				<div className={styles.header__searchDesktop}>
					<SearchForm variant="desktop" />
				</div>

				<div className={styles.header__buttonsGroup}>
					{/* Mobile Search Button */}
					<button
						type="button"
						className={styles.header__searchButtonMobile}
						aria-label="Open search"
					>
						<img src={searchMobileIcon} alt="Search" role="presentation" />
					</button>

					{/* Cart Button */}
					<CartButton
						itemCount={cartItemsCount}
						isAnimating={isCartAnimating}
						className={styles.header__cartButton}
					/>

					{/* Profile Button */}
					<button type="button" aria-label="View profile">
						<img src={profileIcon} alt="Profile" role="presentation" />
					</button>
				</div>
			</div>
		</header>
	);
}
