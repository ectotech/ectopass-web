import NavigationBar from "../../components/NavigationBar";
import styles from "./styles/Profile.module.css";

const Profile = () => {
	return (
		<div className={"screen"}>
			<NavigationBar />

			<div className={"contentContainer"}>
				<div className={"content"}>
					<h1>Profile</h1>
				</div>
			</div>
		</div>
	);
};

export default Profile;
