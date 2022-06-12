import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./styles/AppRouter.module.css";
import Home from "../../screens/Home";
import Authenticate from "../../screens/Authenticate";
import Features from "../../screens/Features";
import Pricing from "../../screens/Pricing";
import Support from "../../screens/Support";
import Downloads from "../../screens/Downloads";

const AppRouter = () => {
	return (
		<div className={styles.container}>
			<BrowserRouter>
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
						path="auth"
						element={<Authenticate />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default AppRouter;
