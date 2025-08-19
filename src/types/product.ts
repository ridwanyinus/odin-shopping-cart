export interface Review {
	rating: number;
}

export interface Product {
	id: number;
	title: string;
	price: number;
	discountPercentage: number;
	description: string;
	category: string;
	reviews: Review[];
	thumbnail: string;
}

export interface ProductCardProps {
	imgUrl: string;
	title: string;
	reviews: number[];
	price: number;
}
