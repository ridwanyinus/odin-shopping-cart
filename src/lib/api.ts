const BASE_URL = "https://dummyjson.com/products/category";
import type { Product } from "@/types/product";

async function fetchClothing(category: string): Promise<Product[]> {
	const url = `${BASE_URL}/${category}`;
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`API error: ${response.statusText}`);

		const data = await response.json();
		return data.products || [];
	} catch (error) {
		console.error(`Error fetching clothing for category ${category}:`, error);
		throw error;
	}
}

async function fetchClothingForCategories(
	categories: string[],
): Promise<Product[]> {
	try {
		const productsPromises = categories.map(fetchClothing);
		const products = await Promise.all(productsPromises);
		return products.flat();
	} catch (error) {
		console.error(
			`Error fetching clothing for categories ${categories}:`,
			error,
		);
		throw error;
	}
}

async function fetchClothingData(): Promise<Product[]> {
	const clothingCategories = ["mens-shirts", "tops", "womens-dresses"];
	return fetchClothingForCategories(clothingCategories);
}

export const api = {
	getProducts: () => {
		return fetchClothingData();
	},
};
