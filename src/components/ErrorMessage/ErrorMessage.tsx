import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useId } from "react";
import { ErroIcon, InfoIcon, OfflineIcon, WarningIcon } from "../shared/icons";
import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
	type?: "error" | "warning" | "info" | "offline";
	icon?: ReactNode;
	message?: string;
	description?: string;
	primaryAction?: ReactNode;
	secondaryAction?: ReactNode;
	showBackButton?: boolean;
	showHomeButton?: boolean;
	headingLevel?: "h1" | "h2" | "h3";
}

const defaultIcons = {
	offline: <OfflineIcon className={styles.icon} />,
	error: <ErroIcon className={`${styles.icon} ${styles.error}`} />,
	info: <InfoIcon className={`${styles.icon} ${styles.info}`} />,
	warning: <WarningIcon className={`${styles.icon} ${styles.warning}`} />,
};

const ErrorMessage = ({
	type = "error",
	icon,
	message,
	description,
	primaryAction,
	secondaryAction,
	showBackButton = true,
	showHomeButton = true,
	headingLevel = "h2",
}: ErrorMessageProps) => {
	const displayIcon = icon || defaultIcons[type] || defaultIcons.error;

	// Determine appropriate ARIA attributes based on error type
	const getAriaAttributes = () => {
		if (type === "error") {
			return { role: "alert", "aria-live": "assertive" as const };
		}
		return { role: "status", "aria-live": "polite" as const };
	};
	const HeadingComponent = headingLevel;
	const errorMessageId = useId();

	return (
		<section className={styles.errorMessage} {...getAriaAttributes()}>
			<div className={styles.container}>
				{displayIcon}

				{message && (
					<HeadingComponent className={styles.message} id={errorMessageId}>
						{message}
					</HeadingComponent>
				)}

				{description && (
					<p
						className={styles.description}
						aria-describedby={message ? errorMessageId : undefined}
					>
						{description}
					</p>
				)}

				<div className={styles.buttonGroup}>
					{primaryAction ||
						(showBackButton && (
							<Link to="." className={styles.button}>
								Go Back
							</Link>
						))}

					{secondaryAction ||
						(showHomeButton && (
							<Link to="/" className={`${styles.button} ${styles.secondary}`}>
								Homepage
							</Link>
						))}
				</div>
			</div>
		</section>
	);
};

export default ErrorMessage;
