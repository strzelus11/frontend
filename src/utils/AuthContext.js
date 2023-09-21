import React, { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Check if a token exists in local storage on component mount
		const token = localStorage.getItem("jwt");
		if (token) {
			const decodedToken = jwt_decode(token);

			// Check if the token is expired
			const currentTime = Date.now() / 1000; // in seconds
			if (decodedToken.exp > currentTime) {
				setUser(decodedToken);
			} else {
				// Token is expired, so remove it
				localStorage.removeItem("jwt");
				setUser(null);
			}
		}
	}, []);

	const login = (token) => {
		localStorage.setItem("jwt", token);
		setUser(jwt_decode(token));
	};

	const logout = () => {
		localStorage.removeItem("jwt");
		setUser(null);
	};

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};
