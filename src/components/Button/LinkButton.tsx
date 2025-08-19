import { Link } from "@tanstack/react-router";
import styles from "./LinkButton.module.scss";

interface LinkButtonProps {
	text: string;
	url: string | "/";
}

const Button = ({ text, url }: LinkButtonProps) => {
	return (
		<Link to={url} className={styles.button}>
			{text}
		</Link>
	);
};

export default Button;
