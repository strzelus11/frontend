import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="z-10 fixed top-0 w-full">
				<Header />
			</div>
			<div className="mt-[100px] p-5">
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/calendar" element={<Calendar />} />
					<Route path="/stats" element={<Stats />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
