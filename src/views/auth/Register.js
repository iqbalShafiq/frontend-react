import React, { useState } from "react";
import axios from "axios";
import toast from "toasted-notes";
import "toasted-notes/src/styles.css";
import { useHistory } from "react-router-dom";

function Register() {
	const redirect = useHistory();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password_confirmation, setPasswordConfirmation] = useState("");
	const [errors, setErrors] = useState([]);

	const record = { name, email, password, password_confirmation };

	const store = async (e) => {
		try {
			e.preventDefault();
			let response = await axios.post("/register", record);

			toast.notify(response.data.message, {
				position: "bottom-right",
			});

			setName("");
			setEmail("");
			setPassword("");
			setPasswordConfirmation("");
			setErrors([]);

			redirect.push("login");
		} catch (e) {
			setErrors(e.response.data.errors);
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-5">
					<div className="card">
						<div className="card-header bg-dark text-light">Register</div>
						<div className="card-body">
							<form onSubmit={store}>
								<div className="mb-4">
									<label htmlFor="name" className="form-label">
										Name
									</label>
									<input
										value={name}
										onChange={(e) => setName(e.target.value)}
										type="text"
										name="name"
										id="name"
										className={`form-control ${errors.name ? "is-invalid" : ""}`}
									/>
									{errors.name ? <div className="invalid-feedback">{errors.name[0]}</div> : ""}
								</div>

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

								<div className="mb-4">
									<label htmlFor="password_confirmation" className="form-label">
										Confirm Password
									</label>
									<input
										value={password_confirmation}
										onChange={(e) => setPasswordConfirmation(e.target.value)}
										type="password"
										name="password_confirmation"
										id="password_confirmation"
										className="form-control"
									/>
								</div>

								<button type="submit" className="btn btn-dark">
									Register
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
