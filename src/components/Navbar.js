import axios from "axios";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authenticated } from "../store";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";

function Navbar() {
	const [auth, setAuth] = useRecoilState(authenticated);

	const logout = async () => {
		try {
			let response = await axios.post("logout");
			setAuth({ check: false });
			localStorage.removeItem("userTokens");
			toast.notify(response.data.message, {
				position: "bottom-right",
			});
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark align-items-center bg-dark mb-4">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
					My React
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<NavLink exact className="nav-link" aria-current="page" to="/">
								Home
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink className="nav-link" to="/about">
								About
							</NavLink>
						</li>

						{auth.check ? (
							<li className="nav-item">
								<NavLink className="nav-link" to="/Dashboard">
									Dashboard
								</NavLink>
							</li>
						) : (
							""
						)}
					</ul>

					{auth.check ? (
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to="/">
									{auth.user.name}
								</NavLink>
							</li>
							<li className="nav-item">
								<button className="nav-link btn" onClick={logout}>
									Logout
								</button>
							</li>
						</ul>
					) : (
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to="/register">
									Register
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/login">
									Login
								</NavLink>
							</li>
						</ul>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
