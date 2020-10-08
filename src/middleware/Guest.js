import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authenticated } from "../store";

function Guest({ children }) {
	const redirect = useHistory();
	const auth = useRecoilValue(authenticated);

	useEffect(() => {
		if (auth.check) {
			redirect.push("/");
		}
	}, [auth.check]);

	return children;
}

export default Guest;
