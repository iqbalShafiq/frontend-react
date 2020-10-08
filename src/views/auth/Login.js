import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { authenticated } from "../../store";
import { useRecoilState } from "recoil";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";

function Login() {
	const redirect = useHistory();
	const [auth, setAuth] = useRecoilState(authenticated);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const credentials = { email, password };

	const store = async (e) => {
		try {
			e.preventDefault();

			let response = await axios.post("/login", credentials);
			localStorage.setItem("userTokens", response.data.token);
			redirect.push("/");

			toast.notify("You're loged in", {
				position: "bottom-right",
			});

			setAuth({
				check: true,
				user: response.data.data,
			});

			setEmail("");
			setPassword("");
			setErrors([]);
		} catch (e) {
			setErrors(e.response.data.errors);
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-5">
					<div className="card">
						<div className="card-header bg-dark text-light">Login</div>
						<div className="card-body">
							<form onSubmit={store}>
								<div className="mb-4">
									<label htmlFor="email" className="form-label">
										Email
									</label>
									<input
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										type="email"
										name="email"
										id="email"
										className={`form-control ${errors.email ? "is-invalid" : ""}`}
									/>
									{errors.email ? <div className="invalid-feedback">{errors.email[0]}</div> : ""}
								</div>

								<div className="mb-4">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<input
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										type="password"
										name="password"
										id="password"
										className={`form-control ${errors.password ? "is-invalid" : ""}`}
									/>
									{errors.password ? <div className="invalid-feedback">{errors.password[0]}</div> : ""}
								</div>

								<button type="submit" className="btn btn-dark">
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
