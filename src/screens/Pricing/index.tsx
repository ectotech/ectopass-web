import NavigationBar from "../../components/NavigationBar";
import styles from "./styles/Pricing.module.css";

const Pricing = () => {
	return (
		<div className={"screen"}>
			<NavigationBar />

			<div className={"contentContainer"}>
				<div className={"content"}>
					<h1>Pricing</h1>
				</div>
			</div>
		</div>
	);
};

export default Pricing;
