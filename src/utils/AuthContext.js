import React, { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = (token) => {
		localStorage.setItem("jwt", token);
		setUser(jwt_decode(token)); // Decode JWT token to get user data
	};

	const logout = () => {
		localStorage.removeItem("jwt");
		setUser(null);
	};

	const isAuthenticated = localStorage.getItem("jwt") === null ? false : true;

	return (
		<AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};
