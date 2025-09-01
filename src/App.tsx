import { Link } from "@tanstack/react-router";
import styles from "./App.module.scss";
import calvinKlein from "./assets/calvin-klein.svg";
import gucci from "./assets/gucci.svg";
import prada from "./assets/prada.svg";
import versace from "./assets/versace.svg";
import zara from "./assets/zara.svg";

const partnersImgUrl = [versace, gucci, prada, zara, calvinKlein];
const stats = [
	{
		label: "200+",
		description: "International Brands",
	},
	{
		label: "2,000+",
		description: "High-Quality Products",
	},
	{
		label: "100%",
		description: "Authentic Products",
	},
];
// Todo: split code into components

const App = () => {
	return (
		<main className={`${styles.hero}`}>
			<div className={`container ${styles.hero__container}`}>
				<div className={styles.hero__content}>
					<h1 className={styles.hero__title}>
						FIND CLOTHES THAT MATCHES YOUR STYLE
					</h1>
					<span className={styles.hero__description}>
						Browse through our diverse range of meticulously crafted garments,
						designed to bring out your individuality and cater to your sense of
						style.
					</span>
					<Link
						to="/shop"
						className={`button--primary ${styles.hero__linkBtn}`}
					>
						Shop Now
					</Link>
					<div className={styles.hero__statsWrapper}>
						{stats.map((stat, idx) => (
							<div key={idx} className={styles.hero__stats}>
								<p>{stat.label}</p>
								<span>{stat.description}</span>
							</div>
						))}
					</div>
				</div>
				<div className={styles.hero__image}>
					<picture>
						<source
							srcSet="/images/trendy-fashion-couple-desktop.avif"
							media="(width >= 390px)"
						/>
						<source
							srcSet="/images/trendy-fashion-couple-mobile.avif"
							media="(width <= 389px)"
						/>
						{/*   <!-- Fallback for browsers that don't support AVIF --> */}
						<source
							srcSet="/images/trendy-fashion-couple-desktop.webp"
							media="(width >= 390px)"
							type="image/webp"
						/>
						<source
							srcSet="/images/trendy-fashion-couple-mobile.webp"
							media="(width <= 389px)"
							type="image/webp"
						/>
						<img
							src="/images/trendy-fashion-couple-mobile.avif"
							alt="trendy fashion couple"
						/>
					</picture>
				</div>
			</div>
			<div className={styles.hero__partnersWrapper}>
				<div className={styles.hero__partners}>
					{partnersImgUrl.map((img) => (
						<img key={img} src={img} alt="" />
					))}
				</div>
			</div>
		</main>
	);
};

export default App;
