import { useLocalStorage } from "@uidotdev/usehooks";

export interface CartItem {
	id: number;
	image: string;
	name: string;
	price: number;
	quantity: number;
	discountPercentage: number;
	discountedPrice: number;
}

export const useCart = () => {
	const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);

	const addToCart = (product: CartItem) => {
		setCart((prevCart) => {
			const existingProduct = cart.find((item) => item.id === product.id);

			if (existingProduct) {
				return prevCart.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity } : item,
				);
			}

			return [...prevCart, product];
		});
	};

	const removeFromCart = (id: number) => {
		setCart((prev) => prev.filter((item) => item.id !== id));
	};

	const updateQuantity = (productId: number, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}

		setCart((prevCart) =>
			prevCart.map((cart) =>
				cart.id === productId ? { ...cart, quantity } : cart,
			),
		);
	};

	const clearCart = () => {};

	const getDiscountTotal = () =>
		cart?.reduce((acc, curr) => acc + curr.discountedPrice * curr.quantity, 0);

	const getSubTotal = () =>
		cart?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

	const getDiscountAmount = () => getSubTotal() - getDiscountTotal();

	const getDiscountPercentage = () => {
		const overallDiscountPercentage = getDiscountAmount() / getSubTotal() * 100;
		return overallDiscountPercentage.toFixed(2);
	};

	return {
		cart,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		getDiscountPercentage,
		getSubTotal,
		getDiscountTotal,
		getDiscountAmount,
	};
};

export default useCart;
