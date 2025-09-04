import { type FormEvent, useState } from "react";
import searchIcon from "@/assets/search.svg";
import styles from "./SearchForm.module.scss";

interface SearchFormProps {
	className?: string;
	variant: "desktop" | "mobile";
	onSubmit?: (searchTerm: string) => void;
}
const SearchForm = ({ className, variant, onSubmit }: SearchFormProps) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			onSubmit?.(searchTerm.trim());
		}
	};

	return (
		<search>
			<form
				onSubmit={handleSubmit}
				className={`${styles.searchForm} ${styles[`searchForm--${variant}`]} ${className || ""}`}
			>
				<label htmlFor={`search-${variant}`} className="sr-only">
					Search for products
				</label>
				<div className={styles.searchForm__inputGroup}>
					<input
						id={`search-${variant}`}
						type="search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search for products..."
						className={styles.searchForm__input}
						autoComplete="off"
					/>
					<button
						type="submit"
						aria-label="Submit search"
						className={styles.searchForm__submitButton}
					>
						<img src={searchIcon} alt="" width="20" height="20" />
					</button>
				</div>
			</form>
		</search>
	);
};

export default SearchForm;
