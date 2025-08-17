import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import HamburgerIcon from "../Hamburger/Hambuger";
// Todo: add accesibility styles (focus, active etc..) to all focusable elements
import styles from "./Header.module.scss";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleTogglemenu = () => setIsMenuOpen((prev) => !prev);

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
				<Link to="/demo/tanstack-query">Shop</Link>
				<Link to=".">Categories</Link>
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
						<Link to="/demo/tanstack-query">Shop</Link>
						<Link to=".">Categories</Link>
					</nav>
				</div>
			)}

			<div className={styles.header__actions}>
				<div className={styles.header__searchGroup}>
					<button type="submit" aria-label="search">
						<img src="/search.svg" alt="Search" role="presentation" />
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
						<img src="/search-mobile.svg" alt="Search" role="presentation" />
					</button>
					<button type="button" aria-label="View cart">
						<img src="/cart.svg" alt="Cart" role="presentation" />
					</button>
					<button type="button" aria-label="View profile">
						<img src="/profile.svg" alt="Profile" role="presentation" />
					</button>
				</div>
			</div>
		</header>
	);
}
