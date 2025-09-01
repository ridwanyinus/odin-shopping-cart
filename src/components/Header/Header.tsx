import { useCart } from "@/hooks/useCart";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import HamburgerIcon from "../ui/Hamburger/Hambuger";
// Todo: add accesibility styles (focus, active etc..) to all focusable elements
import styles from "./Header.module.scss";
import cartIcon from "@/assets/cart.svg"
import profileIcon from "@/assets/profile.svg";
import searchMobileIcon from "@/assets/search-mobile.svg";
import searchIcon from "@/assets/search.svg";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [animate, setAnimate] = useState(false);

	const { cart } = useCart();

	const cartCount = cart.length;

	const handleTogglemenu = () => setIsMenuOpen((prev) => !prev);

	useEffect(() => {
		if (cartCount > 0) {
			setAnimate(true);
			const timer = setTimeout(() => setAnimate(false), 200);
			return () => clearTimeout(timer);
		}
	}, [cartCount]);

	useEffect(() => {
		if (isMenuOpen) document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMenuOpen]);

	return (
		<header className={`${styles.header} container`}>
			<button
				type="button"
				onClick={handleTogglemenu}
				aria-expanded={isMenuOpen}
				aria-controls="mobile-nav"
				className={styles.header__menuButton}
			>
				<HamburgerIcon isOpen={isMenuOpen} />
			</button>
			<div className={styles.header__logoWrapper}>
				<Link to="/" className={styles.header__logo}>
					SHOP.CO
				</Link>
			</div>

			{/* Laptop Nav */}
			<nav className={styles.header__nav} aria-label="Desktop navigation">
				<ul>
					<li>
						<Link to="/shop">Shop</Link>
						<Link to=".">Categories</Link>
					</li>
				</ul>
			</nav>

			{/* Mobile Nav */}
			{isMenuOpen && (
				<div className={styles.header__navMobileWrapper}>
					<nav
						id="mobile-nav"
						className={styles.header__navMobile}
						aria-label="Mobile navigation"
						aria-hidden={!isMenuOpen}
					>
						<ul>
							<li>
								<Link to="/shop">Shop</Link>
								<Link to=".">Categories</Link>
							</li>
						</ul>
					</nav>
				</div>
			)}

			<div className={styles.header__actions}>
				<div className={styles.header__searchGroup}>
					<button type="submit" aria-label="search">
						<img src={searchIcon} alt="Search" role="presentation" />
					</button>
					<input
						type="text"
						placeholder="Search for products..."
						aria-label="Search for products"
					/>
				</div>

				<div className={styles.header__actionsGroup}>
					<button
						type="button"
						className={styles.header__searchButtonMobile}
						aria-label="Open search"
					>
						<img src={searchMobileIcon} alt="Search" role="presentation" />
					</button>
					<Link
						to="/cart"
						aria-label="View cart"
						className={styles.header__cartButton}
					>
						<img src={cartIcon} alt="Cart" role="presentation" />
						{cart.length > 0 && (
							<span
								className={`${styles.header__cartCount} ${animate && styles.update}`}
							>
								{cart.length}
							</span>
						)}
					</Link>
					<button type="button" aria-label="View profile">
						<img src={profileIcon} alt="Profile" role="presentation" />
					</button>
				</div>
			</div>
		</header>
	);
}
