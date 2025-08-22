import { Link, useMatches } from "@tanstack/react-router";
import ArrowRight from "/arrow-right.svg";
import styles from "./Breadcrumb.module.scss";

export default function BreadcrumbNav() {
	const matches = useMatches();
	const location = matches[matches.length - 1].pathname;

	const breadcrumbs = matches
		.filter((match) => match.context.getTitle)
		.map(({ pathname, context }) => {
			return {
				title: context.getTitle(),
				path: pathname,
			};
		});

	if (location.startsWith("/shop/product/")) {
		breadcrumbs.splice(1, 0, { title: "Shop", path: "/shop" });
	}

	return (
		<nav aria-label="Breadcrumb" className={`container ${styles.breadcrumb}`}>
			<div className={styles.breadcrumb__line} />
			<ol className={styles.breadcrumb__list}>
				{breadcrumbs.map((crumb, index) => (
					<li className={styles.breadcrumb__item} key={crumb.path}>
						<Link to={crumb.path} className={styles.breadcrumb__link}>
							{crumb.title}
						</Link>
						{index < breadcrumbs.length - 1 && <img src={ArrowRight} alt="" />}
					</li>
				))}
			</ol>
		</nav>
	);
}
