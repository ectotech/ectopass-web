import NavigationBar from "../../components/NavigationBar";
import styles from "./styles/Vault.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../utilities/firebaseConfig";

const Vault = () => {
	return (
		<div className={"screen"}>
			<NavigationBar />

			<div className={"contentContainer"}>
				<div className={"content"}>
					<h1>Vault</h1>

					<button
						onClick={() => {
							signOut(auth);
						}}
					>
						Sign out
					</button>
				</div>
			</div>
		</div>
	);
};

export default Vault;
