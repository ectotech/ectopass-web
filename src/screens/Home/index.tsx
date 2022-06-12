import NavigationBar from "../../components/NavigationBar";
import styles from "./styles/Home.module.css";

const Home = () => {
	return (
		<div className={"screen"}>
			<NavigationBar />

			<div className={"contentContainer"}>
				<div className={"content"}>
					<h1>Home</h1>
				</div>
			</div>
		</div>
	);
};

export default Home;
