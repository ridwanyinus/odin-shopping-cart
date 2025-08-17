import Versace from "/versace.svg";
import styles from "./App.module.scss";
import Button from "./components/Button/LinkButton";

const partnersImgUrl = [
	"/versace.svg",
	"/zara.svg",
	"/gucci.svg",
	"/prada.svg",
	"calvin-klein.svg",
];

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
					<Button text={"Shop Now"} />
					<div className={styles.hero__statsWrapper}>
						<div className={styles.hero__stats}>
							<p>200+</p>
							<span>International Brands</span>
						</div>
						<div className={styles.hero__stats}>
							<p>2,000+</p>
							<span>High-Quality Products</span>
						</div>
						<div className={styles.hero__stats}>
							<p>30,000+</p>
							<span>Happy Customers</span>
						</div>
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
					{partnersImgUrl.map((img, idx) => (
						<img key={idx} src={img} alt="" />
					))}
				</div>
			</div>
		</main>
	);
};

export default App;
