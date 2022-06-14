import NavigationBar from "../../components/NavigationBar";
import styles from "./styles/TermsOfService.module.css";

const TermsOfService = () => {
	return (
		<div className={"screen"}>
			<NavigationBar />

			<div className={"contentContainer"}>
				<div className={"content"}>
					<h1>Terms of Service</h1>
				</div>
			</div>
		</div>
	);
};

export default TermsOfService;
