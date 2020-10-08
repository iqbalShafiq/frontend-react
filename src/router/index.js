import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import About from "../views/About";
import Home from "../views/Home";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Guest from "../middleware/Guest";
import Authenticated from "../middleware/Authenticated";
import Dashboard from "../views/Dashboard";

function Router() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>

				<Route path="/about">
					<About />
				</Route>

				<Authenticated path="/dashboard">
					<Dashboard />
				</Authenticated>

				<Guest path="/register">
					<Register />
				</Guest>

				<Guest path="/login">
					<Login />
				</Guest>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
