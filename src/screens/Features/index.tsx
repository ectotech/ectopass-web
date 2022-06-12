import NavigationBar from "../../components/NavigationBar";
import styles from "./styles/Features.module.css";

const Features = () => {
	return (
		<div className={"screen"}>
			<NavigationBar />

			<div className={"contentContainer"}>
				<div className={"content"}>
					<h1>Features</h1>
				</div>
			</div>
		</div>
	);
};

export default Features;
