import { useState, useEffect } from "react";
import styles from "../styles/Authenticate.module.css";
import Logo from "../../../assets/Logo.svg";
import { Link } from "react-router-dom";
import SignInMethods from "./SignInMethods";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import Footer from "./Footer";
import { CaretLeft } from "phosphor-react";
import AccountPill from "./AccountPill";
import { auth } from "../../../utilities/firebaseConfig";
import { fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { validateEmail } from "../../../utilities/validateEmail";

interface IProps {
	email: string;
	onEmailChange: (email: string) => void;
}

const SignUpForm = (props: IProps) => {
	const [password, setPassword] = useState<string>("");
	const [step, setStep] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		setError("");
		setPassword("");
	}, [step]);

	const goToSignUp = async () => {
		try {
			setLoading(true);
			if (validateEmail(props.email)) {
				const availableSignInMethods = await fetchSignInMethodsForEmail(auth, props.email);

				if (availableSignInMethods.length > 0) {
					setError("Account already exists. Sign in instead.");
				} else {
					setError("");
					setStep(2);
				}
			} else {
				setError("Email looks invalid.");
			}
		} catch {}

		setLoading(false);
	};

	const signUp = async () => {
		try {
			setLoading(true);

			await createUserWithEmailAndPassword(auth, props.email, password);

			setError("");
		} catch (reason) {
			if (String(reason).includes("auth/weak-password")) {
				setError("Password is too weak. Password require at least 6 characters.");
			}
		}

		setLoading(false);
	};

	const getStep1Card = () => {
		return (
			<div className={styles.card}>
				<Link
					to={`/`}
					style={{
						margin: 0,
						marginTop: 16
					}}
				>
					<img
						src={Logo}
						className={styles.logo}
						alt="ectopass"
					/>
				</Link>

				<h1
					className={styles.title}
					style={{ marginBottom: 70 }}
				>
					{"Create account"}
				</h1>

				<TextInput
					type={"email"}
					value={props.email}
					onChange={(event) => props.onEmailChange(event.target.value)}
					onKeyDown={(event) => {
						if (event.code === "Enter") {
							goToSignUp();
						}
					}}
					autoFocus={true}
					placeholder={"email address"}
				/>

				{error && (
					<p
						className={styles.errorText}
						style={{ marginTop: 16 }}
					>
						{error}
					</p>
				)}

				<Button
					type={"button"}
					onClick={goToSignUp}
					loading={loading}
					style={{
						marginTop: 16,
						marginBottom: 24
					}}
				>
					{"Continue"}
				</Button>

				<p className={styles.termsText}>
					{"By creating an account, you agree with our"}
					<br />
					<Link
						to="/terms-of-service"
						target="_blank"
					>
						<span className={styles.termsLinkText}>{"Terms of Service"}</span>
					</Link>
					{" and "}
					<Link
						to="/privacy-policy"
						target="_blank"
					>
						<span className={styles.termsLinkText}>{"Privacy Policy"}</span>
					</Link>
					.
				</p>

				<p
					className={styles.signInMethodText}
					style={{ marginTop: 32 }}
				>
					{"Sign up with"}
				</p>

				<SignInMethods />

				<Link
					className={styles.textButton}
					to={`/auth?m=sign-in`}
					style={{
						marginTop: 16
					}}
				>
					{"Already have an account?"}
				</Link>
			</div>
		);
	};

	const getStep2Card = () => {
		return (
			<div className={styles.card}>
				<Link
					to="/auth?m=sign-up"
					onClick={() => setStep(1)}
					style={{
						position: "absolute",
						left: 24,
						top: 42,
						color: "#333333"
					}}
				>
					<CaretLeft size={32} />
				</Link>

				<Link
					to={`/`}
					style={{
						margin: 0,
						marginTop: 16
					}}
				>
					<img
						src={Logo}
						className={styles.logo}
						alt="ectopass"
					/>
				</Link>

				<h1
					className={styles.title}
					style={{ marginBottom: 24 }}
				>
					{"Welcome!"}
				</h1>

				<AccountPill email={props.email} />

				<button
					type={"submit"}
					onClick={() => setStep(1)}
					className={styles.useAnotherAccountButton}
				>
					<p className={styles.useAnotherAccountText}>{"Use another account"}</p>
				</button>

				<TextInput
					value={password}
					type={"password"}
					onChange={(event) => setPassword(event.target.value)}
					onKeyDown={async (event) => {
						if (event.code === "Enter") {
							await signUp();
						}
					}}
					autoFocus={true}
					placeholder={"password"}
				/>

				{error && (
					<p
						className={styles.errorText}
						style={{ marginTop: 16 }}
					>
						{error}
					</p>
				)}

				<Button
					type={"submit"}
					onClick={signUp}
					loading={loading}
					style={{
						marginTop: 16,
						marginBottom: 24
					}}
				>
					{"Create account"}
				</Button>

				<Link
					className={styles.textButton}
					to={"/auth?m=reset-pass"}
				>
					{"Forgot your password?"}
				</Link>
			</div>
		);
	};

	if (step === 1) {
		return (
			<div className="screen">
				<div className={styles.container}>{getStep1Card()}</div>

				<Footer />
			</div>
		);
	} else {
		return (
			<div className="screen">
				<div className={styles.container}>{getStep2Card()}</div>

				<Footer />
			</div>
		);
	}
};

export default SignUpForm;
