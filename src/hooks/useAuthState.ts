import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../utilities/firebaseConfig";

interface IUseAuthState {
	user: User | null;
}

export const useAuthState = (): IUseAuthState => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const remove = onAuthStateChanged(auth, async (user) => {
			setUser(user);
		});

		return () => {
			remove();
		};
	}, []);

	return {
		user
	};
};
