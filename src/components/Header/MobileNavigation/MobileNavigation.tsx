import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import styles from "./MobileNavigation.module.scss";

interface MobileNavigationProps {
	isOpen: boolean;
	navId: string;
	onClose: () => void;
}

export default function MobileNavigation({
	isOpen,
	navId,
	onClose,
}: MobileNavigationProps) {
	const firstLinkRef = useRef<HTMLAnchorElement>(null);

	// Focus management for accessibility
	useEffect(() => {
		if (isOpen && firstLinkRef.current) {
			firstLinkRef.current.focus();
		}
	}, [isOpen]);

	// Handle escape key to close menu
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && isOpen) {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.mobileNav__overlay}>
			<nav
				id={navId}
				className={styles.mobileNav}
				aria-label="Mobile navigation"
			>
				<ul className={styles.mobileNav__list}>
					<li className={styles.mobileNav__item}>
						<Link
							ref={firstLinkRef}
							to="/shop"
							className={styles.mobileNav__link}
							onClick={onClose}
						>
							Shop
						</Link>
					</li>
					<li className={styles.mobileNav__item}>
						<Link to="." className={styles.mobileNav__link} onClick={onClose}>
							Categories
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
