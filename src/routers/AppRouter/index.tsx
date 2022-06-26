import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import styles from "./styles/AppRouter.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utilities/firebaseConfig";
import Home from "../../screens/Home";
import Features from "../../screens/Features";
import Pricing from "../../screens/Pricing";
import Support from "../../screens/Support";
import Downloads from "../../screens/Downloads";
import Authenticate from "../../screens/Authenticate";
import TermsOfService from "../../screens/TermsOfService";
import PrivacyPolicy from "../../screens/PrivacyPolicy";
import Vault from "../../screens/Vault";
import Profile from "../../screens/Profile";

const ScreenRoutes = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const removeListener = onAuthStateChanged(auth, (user) => {
			if (user?.email) {
				navigate("/vault");
			} else {
				navigate("/");
			}
		});

		return () => {
			removeListener();
		};
	}, []);

	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/features"
				element={<Features />}
			/>
			<Route
				path="/pricing"
				element={<Pricing />}
			/>
			<Route
				path="/support"
				element={<Support />}
			/>
			<Route
				path="/downloads"
				element={<Downloads />}
			/>
			<Route
				path="/auth"
				element={<Authenticate />}
			/>
			<Route
				path="/terms-of-service"
				element={<TermsOfService />}
			/>
			<Route
				path="/privacy-policy"
				element={<PrivacyPolicy />}
			/>
			<Route
				path="/vault"
				element={<Vault />}
			/>
			<Route
				path="/profile"
				element={<Profile />}
			/>
		</Routes>
	);
};

const AppRouter = () => {
	return (
		<div className={styles.container}>
			<BrowserRouter>
				<ScreenRoutes />
			</BrowserRouter>
		</div>
	);
};

export default AppRouter;
