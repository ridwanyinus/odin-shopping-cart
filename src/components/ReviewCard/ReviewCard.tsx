import verified from "@/assets/verified.svg";
import { generateStarImagePaths } from "@/utils";
import styles from "./ReviewCard.module.scss";

interface ReveiewProps {
	rating: number;
	comment: string;
	reviewerName: string;
	date: string;
}

const Review = ({ rating, comment, reviewerName, date }: ReveiewProps) => {
	const stars = generateStarImagePaths(rating);
	const datePosted = new Date(date);
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	} as const;

	const formattedDate = datePosted.toLocaleDateString("en-US", options);

	return (
		<div className={styles.review}>
			<div className={styles.review__header}>
				<span className={styles.review__stars}>
					{stars.map((star, i) => (
						<img key={i} src={star} alt="stars" />
					))}
				</span>
				<button type="button" className={styles.review__ellipsis}>
					...
				</button>
			</div>
			<p className={styles.review__name}>
				{reviewerName}{" "}
				<span>
					<img src={verified} alt="" />
				</span>
			</p>
			<p className={styles.review__comment}>{comment}</p>
			<span className={styles.review__date}> posted on {formattedDate}</span>
		</div>
	);
};

export default Review;
