import NavigationBar from "../../components/NavigationBar";
import styles from "./styles/Downloads.module.css";

const Downloads = () => {
	return (
		<div className={"screen"}>
			<NavigationBar />

			<div className={"contentContainer"}>
				<div className={"content"}>
					<h1>Downloads</h1>
				</div>
			</div>
		</div>
	);
};

export default Downloads;
