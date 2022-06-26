import { useRef, useEffect } from "react";
import styles from "./styles/TextInput.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	disabled?: boolean;
}

const TextInput = (props: IProps) => {
	const textInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (props.disabled) {
			textInputRef.current?.blur();
		}
	}, [props.disabled, textInputRef.current]);

	return (
		<input
			ref={textInputRef}
			{...props}
			className={props.disabled ? styles.textInputDisabled : styles.textInput}
			disabled={props.disabled}
		/>
	);
};

export default TextInput;
