import { useState } from "react";
import styles from "../styles/Authenticate.module.css";
import Logo from "../../../assets/Logo.svg";
import { Link } from "react-router-dom";
import SignInMethods from "./SignInMethods";
import Footer from "./Footer";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { CaretLeft } from "phosphor-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../utilities/firebaseConfig";
import { validateEmail } from "../../../utilities/validateEmail";

interface IProps {
	email: string;
	onEmailChange: (email: string) => void;
}

const ResetPasswordForm = (props: IProps) => {
	const [step, setStep] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const resetPassword = async () => {
		try {
			setLoading(true);

			if (validateEmail(props.email)) {
				await sendPasswordResetEmail(auth, props.email);
				setError("");
				setStep(2);
			} else {
				setError("Email looks invalid.");
			}
		} catch (reason) {
			console.log("reason:", reason);
			if (String(reason).includes("auth/user-not-found")) {
				setError("Account does not exist.");
			}
		}

		setLoading(false);
	};

	const getStep1Card = () => {
		return (
			<div className={styles.card}>
				<Link
					to="/auth?m=sign-in"
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
					style={{ marginBottom: 70 }}
				>
					{"Reset password"}
				</h1>

				<TextInput
					value={props.email}
					type={"email"}
					onChange={(event) => props.onEmailChange(event.target.value)}
					onKeyDown={async (event) => {
						if (event.code === "Enter") {
							await resetPassword();
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
					type={"submit"}
					onClick={resetPassword}
					loading={loading}
					style={{
						marginTop: 16,
						marginBottom: 24
					}}
				>
					{"Reset password"}
				</Button>

				<p className={styles.signInMethodText}>{"Sign in with"}</p>

				<SignInMethods />

				<Link
					className={styles.textButton}
					to={`/auth?m=sign-in`}
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
					style={{ marginBottom: 70 }}
				>
					{"Reset password"}
				</h1>

				<TextInput
					value={props.email}
					type={"email"}
					onChange={(event) => props.onEmailChange(event.target.value)}
					onKeyDown={async (event) => {
						if (event.code === "Enter") {
							await resetPassword();
						}
					}}
					placeholder={"email address"}
					disabled={true}
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
					onClick={resetPassword}
					disabled={true}
					style={{
						marginTop: 16,
						marginBottom: 24
					}}
				>
					{"Reset password"}
				</Button>

				<p
					className={styles.infoText}
					style={{
						marginBottom: 16
					}}
				>
					{"A link to reset your password has been sent to "}
					<span style={{ fontWeight: 500 }}>{props.email}</span>
					{". Follow the instructions in the email."}
				</p>

				<Link
					className={styles.textButton}
					to={"/auth?m=sign-in"}
				>
					{"Go to sign in"}
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

export default ResetPasswordForm;
