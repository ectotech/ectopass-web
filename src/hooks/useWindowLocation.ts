import { useState, useEffect } from "react";
import { Dictionary } from "../types/Dictionary";
import { useLocation } from "react-router-dom";

interface IWindowLocation {
	pathName: string;
	queryParams: Dictionary<string>;
}

export const useWindowLocation = (): IWindowLocation => {
	const [pathName, setPathName] = useState<string>("");
	const [queryParams, setQueryParams] = useState<Dictionary<string>>({});

	const location = useLocation();

	const updateWindowLocation = (pathName: string, search: string) => {
		setPathName(pathName);

		const params = Array.from(new URLSearchParams(search).entries());
		const queryParams: Dictionary<string> = {};
		for (const param of params) {
			queryParams[param[0]] = param[1];
		}
		setQueryParams(queryParams);
	};

	useEffect(() => {
		updateWindowLocation(window.location.pathname, window.location.search);
	}, [location]);

	return {
		pathName,
		queryParams
	};
};
