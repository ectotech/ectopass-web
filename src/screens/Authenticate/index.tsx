import { useState, useEffect } from "react";
import styles from "./styles/Authenticate.module.css";
import { useWindowLocation } from "../../hooks/useWindowLocation";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import ResetPasswordForm from "./components/ResetPasswordForm";

type Mode = "signIn" | "signUp" | "resetPassword";

const Authenticate = () => {
	const [mode, setMode] = useState<Mode>("signIn");
	const [email, setEmail] = useState<string>("");
	const { queryParams } = useWindowLocation();

	useEffect(() => {
		const m = queryParams["m"];
		if (m === "sign-in") {
			setMode("signIn");
		} else if (m === "reset-pass") {
			setMode("resetPassword");
		} else {
			setMode("signUp");
		}
	}, [queryParams]);

	if (mode === "signIn") {
		return (
			<SignInForm
				email={email}
				onEmailChange={setEmail}
			/>
		);
	} else if (mode === "resetPassword") {
		return (
			<ResetPasswordForm
				email={email}
				onEmailChange={setEmail}
			/>
		);
	} else {
		return (
			<SignUpForm
				email={email}
				onEmailChange={setEmail}
			/>
		);
	}
};

export default Authenticate;
