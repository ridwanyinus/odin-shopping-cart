import { Link, useMatches, useRouterState } from "@tanstack/react-router";
import ArrowRight from "/arrow-right.svg";
import styles from "./Breadcrumb.module.scss";

export default function BreadcrumbNav() {
	const matches = useMatches();
	const location = useRouterState({ select: (s) => s.location });

	const breadcrumbs = matches
		.filter((match) => match.context.getTitle)
		.map((match) => ({
			title: match.context.getTitle(),
			path: match.pathname,
		}));

	if (location.pathname.startsWith("/shop/product/")) {
		breadcrumbs.splice(1, 0, { title: "Shop", path: "/shop" });
	}

	console.log(breadcrumbs);

	return (
		<nav aria-label="Breadcrumb" className={`container ${styles.breadcrumb}`}>
			<div className={styles.breadcrumb__line} />
			<ol className={styles.breadcrumb__list}>
				{breadcrumbs.map((crumb, index) => (
					<li className={styles.breadcrumb__item} key={index}>
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
