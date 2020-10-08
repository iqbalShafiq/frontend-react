import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RecoilRoot } from "recoil";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("userTokens")}`;
	return config;
});

ReactDOM.render(
	<StrictMode>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
