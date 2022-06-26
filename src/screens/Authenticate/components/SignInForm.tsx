import { useEffect, useState } from "react";
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
import { fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import { validateEmail } from "../../../utilities/validateEmail";

interface IProps {
	email: string;
	onEmailChange: (email: string) => void;
}

const SignInForm = (props: IProps) => {
	const [password, setPassword] = useState<string>("");
	const [step, setStep] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		setError("");
		setPassword("");
	}, [step]);

	const goToSignIn = async () => {
		try {
			setLoading(true);
			if (validateEmail(props.email)) {
				const availableSignInMethods = await fetchSignInMethodsForEmail(auth, props.email);

				if (availableSignInMethods.length === 0) {
					setError("No existing account. Create account instead.");
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

	const signIn = async () => {
		try {
			setLoading(true);

			await signInWithEmailAndPassword(auth, props.email, password);

			setError("");
		} catch (reason) {
			if (String(reason).includes("auth/wrong-password")) {
				setError("Wrong password.");
			} else if (String(reason).includes("auth/too-many-requests")) {
				setError(
					"Account have been temporarily disabled due to many failed sign in attempts. You can immediately restore it by resetting your password or you can try again later."
				);
			} else if (String(reason).includes("auth/internal-error")) {
				setError("Wrong password.");
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
					{"Sign in"}
				</h1>

				<TextInput
					value={props.email}
					type={"email"}
					onChange={(event) => props.onEmailChange(event.target.value)}
					onKeyDown={(event) => {
						if (event.code === "Enter") {
							goToSignIn();
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
					onClick={goToSignIn}
					loading={loading}
					style={{
						marginTop: 16,
						marginBottom: 24
					}}
				>
					{"Continue"}
				</Button>

				<Link
					className={styles.textButton}
					to={"/auth?m=reset-pass"}
					style={{
						marginBottom: 32
					}}
				>
					{"Forgot your password?"}
				</Link>

				<p className={styles.signInMethodText}>{"Sign in with"}</p>

				<SignInMethods />

				<Link
					className={styles.textButton}
					to={`/auth?m=sign-up`}
					style={{
						marginTop: 16
					}}
				>
					{"Create account instead"}
				</Link>
			</div>
		);
	};

	const getStep2Card = () => {
		return (
			<div className={styles.card}>
				<Link
					to="/auth?m=sign-in"
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
							await signIn();
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
					onClick={signIn}
					loading={loading}
					style={{
						marginTop: 16,
						marginBottom: 24
					}}
				>
					{"Sign in"}
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

export default SignInForm;
