export interface Review {
	rating: number;
	comment: string;
	date: Date;
	reviewerName: string;
	reviewerEmail: string;
}

export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	reviews: Review[];
	images: string[];
	thumbnail?: string;
	onClick?: (productId: string) => void;
	className?: string;
	currency?: string;
}

export interface ProductCardProps {
	id: string;
	imgUrl: string;
	title: string;
	reviews: number[];
	price: number;
	discountPercentage: number;
}
