import styles from "./styles/AccountPill.module.css";

interface IProps {
	email: string;
}

const AccountPill = (props: IProps) => {
	const getIconText = () => {
		if (props.email) {
			return props.email[0].toUpperCase();
		} else {
			return "";
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.iconContainer}>
				<p className={styles.iconText}>{getIconText()}</p>
			</div>

			<p className={styles.emailText}>{props.email}</p>
		</div>
	);
};

export default AccountPill;
