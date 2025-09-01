import emptyStar from "@/assets/codicon--star-empty.svg";
import fullStar from "@/assets/codicon--star-full.svg";
import halfStar from "@/assets/codicon--star-half.svg";

export const calculateAverageRating = (reviews: number[]): number => {
	return reviews.length > 0
		? reviews.reduce((sum, r) => sum + r, 0) / reviews.length
		: 0;
};

export const calculateDiscountedPrice = (
	price: number,
	discountPercentage: number,
): number => {
	return price - (price * discountPercentage) / 100;
};

export const generateStarImagePaths = (avgRating: number): string[] => {
	const fullStars = Math.floor(avgRating);
	const hasHalfStar = avgRating % 1 >= 0.5;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return [
		...Array(fullStars).fill(fullStar),
		...(hasHalfStar ? [halfStar] : []),
		...Array(emptyStars).fill(emptyStar),
	];
};
