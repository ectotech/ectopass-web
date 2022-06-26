import { ReactNode } from "react";
import styles from "./styles/Button.module.css";

interface IProps
	extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	outlined?: boolean;
	textButton?: boolean;
	loading?: boolean;
	children?: ReactNode | string;
}

const Button = (props: IProps) => {
	const getContent = () => {
		if (props.loading) {
			return <div className={styles.spinner}></div>;
		} else {
			if (typeof props.children === "string") {
				return (
					<p className={props.outlined ? styles.outlinedButtonText : styles.buttonText}>
						{props.children}
					</p>
				);
			} else {
				return props.children;
			}
		}
	};

	if (props.outlined) {
		return (
			<button
				{...props}
				className={props.disabled ? styles.outlinedButtonDisabled : styles.outlinedButton}
				disabled={props.disabled || props.loading}
			>
				{getContent()}
			</button>
		);
	} else {
		return (
			<button
				{...props}
				className={props.disabled ? styles.buttonDisabled : styles.button}
				disabled={props.disabled || props.loading}
			>
				{getContent()}
			</button>
		);
	}
};

export default Button;
