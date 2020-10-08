import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authenticated } from "../store";

function Authenticated({ children }) {
	const redirect = useHistory();
	const auth = useRecoilValue(authenticated);

	useEffect(() => {
		if (!auth.check) {
			redirect.push("/login");
		}
	}, [auth.check]);

	return children;
}

export default Authenticated;
