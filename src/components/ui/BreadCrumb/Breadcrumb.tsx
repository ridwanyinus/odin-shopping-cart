import { Link, useMatches } from "@tanstack/react-router";
import ArrowRight from "@/assets/arrow-right.svg";
import styles from "./Breadcrumb.module.scss";

const PRODUCT_PATH_PREFIX = "/shop/product/";
const SHOP_BREADCRUMB = { title: "Shop", path: "/shop" };

export default function BreadcrumbNav() {
	const matches = useMatches();
	const currentPathName = matches[matches.length - 1].pathname;

	const breadcrumbs = matches
		.filter((match) => match.context.getTitle)
		.map(({ pathname, context }) => {
			return {
				title: context.getBreadcrumb(),
				path: pathname,
			};
		});

	// Add Shop breadcrumb for product pages
	if (currentPathName.startsWith(PRODUCT_PATH_PREFIX)) {
		breadcrumbs.splice(1, 0, SHOP_BREADCRUMB);
	}

	return (
		<nav aria-label="Breadcrumb" className={`container ${styles.breadcrumb}`}>
			<div className={styles.breadcrumb__line} />
			<ol className={styles.breadcrumb__list}>
				{breadcrumbs.map((crumb, index) => {
					const isLastItem = index === breadcrumbs.length - 1;
					return (
						<li className={styles.breadcrumb__item} key={crumb.path}>
							<Link
								to={crumb.path}
								className={styles.breadcrumb__link}
								aria-current={isLastItem ? "page" : undefined}
							>
								{crumb.title}
							</Link>
							{!isLastItem && <img src={ArrowRight} alt="arrow right" />}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
