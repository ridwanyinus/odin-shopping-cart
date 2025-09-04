import { Link } from "@tanstack/react-router";
import styles from "./NotFound.module.scss";

const NotFound = () => {
	return (
		<section className={styles.errorPage}>
			<div className={styles.container}>
				<div className={styles.content}>
					<h2 className={styles.title}>
						<span className="sr-only">Error</span>404
					</h2>
					<p className={styles.heading}>Sorry, we couldn't find this page.</p>
					<p className={styles.description}>
						But don't worry, you can go back to where you came from or visit our
						homepage.
					</p>
					<div className={styles.buttonGroup}>
						<Link to="." className={styles.button}>
							Go Back
						</Link>
						<Link
							to="/"
							className={`${styles.button} ${styles.buttonSecondary}`}
						>
							Homepage
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
