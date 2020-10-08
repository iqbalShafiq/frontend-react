import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Router from "./router";
import { authenticated } from "./store";
import axios from "axios";

function App() {
	const [auth, setAuth] = useRecoilState(authenticated);
	const [mounted, setMounted] = useState(false);

	const getUser = async () => {
		try {
			let response = await axios.get("me");

			setAuth({
				check: true,
				user: response.data.data,
			});
		} catch (e) {
			console.log(e);
		}

		setMounted(true);
	};

	useEffect(() => {
		getUser();
	}, [auth.check, mounted]);

	if (!mounted) {
		return (
			<div className="row justify-content-center align-items-center vh-100">
				<div className="h-full text-center">
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="42" height="42" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
						<circle cx={50} cy={50} fill="none" stroke="#e15b64" strokeWidth={10} r={35} strokeDasharray="164.93361431346415 56.97787143782138">
							<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
						</circle>
					</svg>
				</div>
			</div>
		);
	}

	return <Router />;
}

export default App;
