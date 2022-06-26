import styles from "./styles/SignInMethods.module.css";
import GoogleIcon from "../../../../assets/companies/google/GoogleIcon.svg";
import AppleIcon from "../../../../assets/companies/apple/AppleIcon.svg";
import GithubIcon from "../../../../assets/companies/github/GithubIcon.svg";
import MicrosoftIcon from "../../../../assets/companies/microsoft/MicrosoftIcon.svg";
import Button from "../../../../components/Button";

const SignInMethods = () => {
	return (
		<div className={styles.container}>
			<Button
				type={"button"}
				onClick={() => {}}
				outlined={true}
				style={{
					minWidth: "40%"
				}}
			>
				<img src={GoogleIcon} />

				<p style={{ marginLeft: 8 }}>{"Google"}</p>
			</Button>

			<Button
				type={"button"}
				onClick={() => {}}
				outlined={true}
				style={{
					minWidth: "40%"
				}}
			>
				<img src={AppleIcon} />

				<p style={{ marginLeft: 8 }}>{"Apple"}</p>
			</Button>

			<Button
				type={"button"}
				onClick={() => {}}
				outlined={true}
				style={{
					minWidth: "40%"
				}}
			>
				<img src={GithubIcon} />

				<p style={{ marginLeft: 8 }}>{"Github"}</p>
			</Button>

			<Button
				type={"button"}
				onClick={() => {}}
				outlined={true}
				style={{
					minWidth: "40%"
				}}
			>
				<img src={MicrosoftIcon} />

				<p style={{ marginLeft: 8 }}>{"Microsoft"}</p>
			</Button>
		</div>
	);
};

export default SignInMethods;
