import { Link } from "@tanstack/react-router";
import styles from "./LinkButton.module.scss";

interface LinkButtonProps {
	text: string;
}

const Button = ({ text }: LinkButtonProps) => {
	return (
		<Link to="/" className={styles.button}>
			{text}
		</Link>
	);
};

export default Button;
