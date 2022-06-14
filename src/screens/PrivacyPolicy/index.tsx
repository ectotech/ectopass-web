import NavigationBar from "../../components/NavigationBar";
import styles from "./styles/PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
	return (
		<div className={"screen"}>
			<NavigationBar />

			<div className={"contentContainer"}>
				<div className={"content"}>
					<h1>Privacy Policy</h1>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicy;