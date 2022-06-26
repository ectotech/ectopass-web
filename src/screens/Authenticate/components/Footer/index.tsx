import styles from "./styles/Footer.module.css";
import EctoTechLogo from "../../../../assets/EctoTechLogo.svg";

const Footer = () => {
	return (
		<footer className={styles.container}>
			<a
				href="https://ectotech.com"
				target="_blank"
				style={{ marginBottom: 16 }}
			>
				<img
					src={EctoTechLogo}
					className={styles.logo}
				/>
			</a>

			<p className={styles.text}>{"© 2022 ectotech AB - All rights reserved - support@ectopass.com"}</p>
		</footer>
	);
};

export default Footer;
