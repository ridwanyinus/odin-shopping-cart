import BreadCrumb from "@/components/BreadCumb/Breadcrumb";
import { useCart } from "@/hooks/useCart";
import { Link } from "@tanstack/react-router";
import arrowRight from "/arrow.svg";
import tag from "/tag.svg";
import trash from "/trash.svg";
import styles from "./Cart.module.scss";

const Cart = () => {
	const {
		updateQuantity,
		getDiscountPercentage,
		getSubTotal,
		getDiscountTotal,
		removeFromCart,
		getDiscountAmount,
		cart,
	} = useCart();

	const handleOnIncrease = (id: number, currentValue: number) =>
		updateQuantity(id, currentValue + 1);
	const handleOnDecrease = (id: number, currentValue: number) => {
		if (currentValue <= 0) return;
		updateQuantity(id, currentValue - 1);
	};

	const handleRemoveFromCart = (id: number) => removeFromCart(id);

	console.log(cart);

	if (cart?.length <= 0)
		return (
			<div className={`container ${styles.emptyCart}`}>
				<BreadCrumb />
				<h1>Your Cart is empty</h1>
				<p>
					Go to the <Link to="/shop">shop</Link> and add some items to your cart
				</p>
			</div>
		);

	return (
		<main className={`container ${styles.cart}`}>
			<BreadCrumb />

			<h1>Your Cart</h1>

			<div className={styles.cart__container}>
				<div className={styles.cart__item}>
					{cart?.map((item) => (
						<div key={item.id} className={styles.cart__itemCard}>
							<div className={styles.cart__itemImage}>
								<img src={item.image} alt={item.name} />
							</div>
							<div className={styles.cart__itemDetails}>
								<div className={styles.cart__header}>
									<h2>
										<Link to='/shop/product/$id' params={{ id: item.id.toString() }}>
											{item.name}
										</Link>
									</h2>
									<button
										type="button"
										onClick={() => handleRemoveFromCart(item.id)}
									>
										<img src={trash} alt="" />
									</button>
								</div>
								<div>
									<p>
										Size: <span>Large</span>
									</p>
									<p>
										Color: <span>White</span>
									</p>
								</div>
								<div className={styles.cart__footer}>
									<p className="price">${item.price}</p>
									<div className={`button--secondary ${styles.cart__counter}`}>
										<button
											type={"button"}
											className="plus"
											onClick={() => handleOnIncrease(item.id, item.quantity)}
										>
											+
										</button>
										<span>{item.quantity}</span>
										<button
											type={"button"}
											disabled={item.quantity <= 0}
											className="minus"
											onClick={() => handleOnDecrease(item.id, item.quantity)}
										>
											-
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className={styles.cart__checkout}>
					<h3>Order Summary</h3>

					<div className={styles.cart__row}>
						<p>Subtotal</p>
						<span>${getSubTotal().toFixed(2)}</span>
					</div>
					<div className={`${styles.cart__row} `}>
						<p>Discount (-{getDiscountPercentage()}%)</p>
						<span className={styles.discount}>
							-${getDiscountAmount().toFixed(2)}
						</span>
					</div>
					<div className={styles.cart__row}>
						<p>Delivery fee</p>
						<span>$10</span>
					</div>
					<div className={`${styles.cart__row} ${styles.total}`}>
						<p>Total</p>
						<span>${`${(Number(getDiscountTotal().toFixed(2)) + 10).toFixed(2)}`}</span>
					</div>

					<div className={`${styles.cart__row} ${styles.coupon}`}>
						<div className="button--secondary">
							<img src={tag} alt="" />{" "}
							<input type="text" placeholder="Add promo code" />
						</div>
						<button type="button" className="button--primary">
							Apply
						</button>
					</div>

					<button type="button" className="button--primary">
						Go to checkout <img src={arrowRight} alt="" />
					</button>
				</div>
			</div>
		</main>
	);
};

export default Cart;
