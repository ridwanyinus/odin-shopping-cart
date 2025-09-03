const BASE_URL = "https://dummyjson.com/products";

import type { Product } from "@/types/product";

// Fetch products by category
async function fetchByCategory(category: string): Promise<Product[]> {
	const url = `${BASE_URL}/category/${category}`;
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`API error: ${response.statusText}`);

		const data = await response.json();
		return data.products || [];
	} catch (error) {
		console.error(`Error fetching category ${category}:`, error);
		throw error;
	}
}

// Fetch multiple categories
async function fetchMultipleCategories(
	categories: string[],
): Promise<Product[]> {
	try {
		const promises = categories.map(fetchByCategory);
		const results = await Promise.all(promises);
		return results.flat();
	} catch (error) {
		console.error(`Error fetching categories ${categories}:`, error);
		throw error;
	}
}

// Fetch a single product by ID
async function fetchById(id: number): Promise<Product> {
	const url = `${BASE_URL}/${id}`;
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`API error: ${response.statusText}`);
		return response.json();
	} catch (error) {
		console.error(`Error fetching product id ${id}:`, error);
		throw error;
	}
}

export const api = {
	getProducts: () =>
		fetchMultipleCategories(["mens-shirts", "tops", "womens-dresses"]),
	getProductsByCategory: fetchByCategory,
	getProductById: fetchById,
};
