import { Link } from "react-router-dom";
import styles from "./styles/NavigationBar.module.css";
import Logo from "../../assets/Logo.svg";
import { useAuthState } from "../../hooks/useAuthState";

const NavigationBar = () => {
	const { user } = useAuthState();

	return (
		<div className={styles.container}>
			<div className={styles.contentContainer}>
				<div className={styles.leftContainer}>
					<Link
						className={styles.logoButton}
						to={"/"}
					>
						<img
							className={styles.logo}
							src={Logo}
							alt="ectopass"
						/>
					</Link>
				</div>

				<Link
					className={styles.navigationButton}
					to={"/features"}
				>
					Features
				</Link>

				<Link
					className={styles.navigationButton}
					to={"/pricing"}
				>
					Pricing
				</Link>

				<Link
					className={styles.navigationButton}
					to={"/support"}
				>
					Support
				</Link>

				<Link
					className={styles.navigationButton}
					to={"/downloads"}
				>
					Downloads
				</Link>

				<a
					className={styles.navigationButton}
					href={"https://github.com/ectotech"}
					target={"_blank"}
				>
					Open Source
				</a>

				{user?.email ? (
					<div className={styles.rightContainer}>
						<Link
							className={styles.navigationButton}
							to={"/vault"}
						>
							Open passwords
						</Link>
					</div>
				) : (
					<div className={styles.rightContainer}>
						<Link
							className={styles.navigationButton}
							to={"/auth?m=sign-up"}
						>
							<span className={styles.signUpText}>Get Started</span>
						</Link>

						<Link
							className={styles.navigationButton}
							to={"/auth?m=sign-in"}
						>
							<span className={styles.signInText}>Login</span>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default NavigationBar;
