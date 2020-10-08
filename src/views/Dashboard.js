import React from "react";
import { useRecoilValue } from "recoil";
import { authenticated } from "../store";

function Dashboard() {
	const auth = useRecoilValue(authenticated);

	return <div className="container">Welcome Home, {auth.user.name}</div>;
}

export default Dashboard;
