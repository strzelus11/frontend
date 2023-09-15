import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="p-3 mx-3">
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/calendar" element={<Calendar month="September" />} />
					<Route exact path="/about" element={<Calendar month="September" />} />
					<Route exact path="/contact" element={<Calendar month="September" />} />
					<Route exact path="/register" element={<Register />} />
					<Route exact path="/login" element={<Login />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
