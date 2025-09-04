import verified from "@/assets/verified.svg";
import { generateStarImagePaths } from "@/utils";
import styles from "./ReviewCard.module.scss";

interface ReviewProps {
	rating: number;
	comment: string;
	reviewerName: string;
	date: Date;
	onOptionsClick?: () => void;
}

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "long",
	day: "numeric",
} as const;

const Review = ({
	rating,
	comment,
	reviewerName,
	date,
	onOptionsClick,
}: ReviewProps) => {
	const stars = generateStarImagePaths(rating);
	const datePosted = new Date(date);
	const formattedDate = datePosted.toLocaleDateString(
		"en-US",
		DATE_FORMAT_OPTIONS,
	);

	const handleOptionsClick = () => {
		if (onOptionsClick) {
			onOptionsClick();
		}
	};

	return (
		<article className={styles.review}>
			<div className={styles.review__header}>
				<span
					className={styles.review__stars}
					role="img"
					aria-label={`${rating} out of 5 stars`}
				>
					{stars.map((star, i) => (
						<img key={i} src={star} alt="" />
					))}
				</span>

				{/* {onOptionsClick && (

            )} */}
				<button
					type="button"
					className={styles.review__ellipsis}
					aria-label="Review options"
					onClick={handleOptionsClick}
				>
					⋯
				</button>
			</div>

			<p className={styles.review__name}>
				{reviewerName}
				<span>
					<img src={verified} alt="Verified reviewer" />
				</span>
			</p>

			<p className={styles.review__comment}>{comment}</p>

			<time className={styles.review__date} dateTime={datePosted.toISOString()}>
				Posted on {formattedDate}
			</time>
		</article>
	);
};

export default Review;
