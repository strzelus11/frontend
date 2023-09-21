import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";
import { useAuth } from "../utils/AuthContext";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		errorMessage: {
			email: "",
			password: "",
		},
	});

	const [validated, setValidated] = useState({
		email: false,
		password: false,
	});

	const [loading, setLoading] = useState(false);
	const [loginError, setLoginError] = useState("");
	const navigate = useNavigate();
	const auth = useAuth();
	const location = useLocation();
	const [alertMessage, setAlertMessage] = useState(true);
	const message = location.state?.alertMessage || "";

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		let updatedErrorMessage = { ...formData.errorMessage };
		let validatedNames = { ...validated };

		if (name === "email") {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value)) {
				updatedErrorMessage.email = "Invalid email format.";
			} else {
				updatedErrorMessage.email = "";
				validatedNames.email = true;
			}
		} else if (name === "password") {
			if (value.length < 8) {
				updatedErrorMessage.password =
					"Password should have at least 8 characters.";
			} else {
				updatedErrorMessage.password = "";
				validatedNames.password = true;
			}
		}

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
			errorMessage: updatedErrorMessage,
		}));

		setValidated(validatedNames);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setLoginError("");

		try {
			const response = await fetch("api/login", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const data = await response.json();
				auth.login(data.token);
				console.log("Login successful");
				navigate("/", {
					state: { alertMessage: "Login successful!" },
				});
			} else if (response.status === 400) {
				const errorData = await response.json();
				setLoginError(
					errorData.error || "Login failed. Please check your credentials."
				);
			} else {
				const errorData = await response.json();
				setLoginError(
					errorData.message || "Login failed. Please check your credentials."
				);
			}
		} catch (error) {
			console.error("Login error:", error);
			setLoginError("An error occurred during login.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (alertMessage) {
			const timeoutId = setTimeout(() => {
				setAlertMessage(false);
			}, 3000);
			return () => clearTimeout(timeoutId);
		}
	}, [alertMessage]);

	return (
		<div className="flex justify-center items-center">
			<AnimatePresence>
				{alertMessage && message && (
					<div className="absolute z-[0] top-[460px]">
						<motion.div
							initial={{
								y: "400%",
								opacity: 0,
							}}
							animate={{
								y: 40,
								opacity: 1,
								transition: {
									type: "spring",
									delay: 1,
									duration: 1.5,
									ease: "easeOut",
								},
							}}
							exit={{
								y: "400%",
								opacity: 0,
								transition: {
									duration: 0.5,
								},
							}}
							className="flex justify-center items-center rounded-full border-2 border-[#ae50ff] tiles text-green-700 p-3 w-[300px]"
						>
							<span className="text-white">{message}</span>
							<span className="ml-3">
								<CheckBoxIcon />
							</span>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
			<div className="flex justify-center items-center h-[40vh] sm:h-[40vh] cta w-[400px] rounded-3xl m-5 sm:m-10 shadow-xl shadow-[#a540ff]">
				<form
					className="flex flex-col justify-between items-center gap-6 sm:gap-10"
					onSubmit={handleLogin}
				>
					<div className="flex flex-col items-center gap-2 relative">
						<motion.input
							className={`rounded-xl p-2 w-[230px] sm:w-[300px] border-2 cta text-white ${
								formData.errorMessage && formData.errorMessage.email
									? "border-rose-600"
									: validated.email === true
									? "border-green-600"
									: "border-white"
							} outline-none`}
							variants={fadeIn("up", "spring", 0, 1.5)}
							initial="hidden"
							whileInView="show"
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleInputChange}
						/>
						<AnimatePresence>
							{formData.errorMessage.email !== "" && (
								<motion.span
									className="text-rose-600 text-[10px] sm:text-sm absolute top-[45px] left-1 whitespace-nowrap"
									initial={{
										y: "100%",
										opacity: 0,
									}}
									animate={{
										y: 0,
										opacity: 1,
										transition: {
											type: "spring",
											duration: 1,
											ease: "easeOut",
										},
									}}
									exit={{
										y: "100%",
										opacity: 0,
										transition: {
											duration: 0.2,
										},
									}}
								>
									{formData.errorMessage.email}
								</motion.span>
							)}
						</AnimatePresence>
					</div>
					<div className="flex flex-col items-center gap-2 relative">
						<motion.input
							className={`rounded-xl p-2 w-[230px] sm:w-[300px] border-2 cta text-white ${
								formData.errorMessage && formData.errorMessage.password
									? "border-rose-600"
									: validated.password === true
									? "border-green-600"
									: "border-white"
							} outline-none`}
							variants={fadeIn("up", "spring", 0.5, 1.5)}
							initial="hidden"
							whileInView="show"
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleInputChange}
						/>
						<AnimatePresence>
							{formData.errorMessage.password !== "" && (
								<motion.span
									className="text-rose-600 text-[10px] sm:text-sm absolute top-[45px] left-1 whitespace-nowrap"
									initial={{
										y: "100%",
										opacity: 0,
									}}
									animate={{
										y: 0,
										opacity: 1,
										transition: {
											type: "spring",
											duration: 1,
											ease: "easeOut",
										},
									}}
									exit={{
										y: "100%",
										opacity: 0,
										transition: {
											duration: 0.2,
										},
									}}
								>
									{formData.errorMessage.password}
								</motion.span>
							)}
						</AnimatePresence>
					</div>
					<motion.button
						variants={slideIn("up", "spring", 1, 2)}
						initial="hidden"
						whileInView="show"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="button w-[200px] border-none rounded-xl p-3"
						disabled={loading}
					>
						{loading ? "Logging In..." : "Log In"}
					</motion.button>
					<AnimatePresence>
						{loginError && (
							<motion.p
								variants={slideIn("up", "spring", 0, 2)}
								initial="hidden"
								whileInView="show"
								className="absolute top-[500px] text-rose-600 text-sm"
							>
								{loginError}
							</motion.p>
						)}
					</AnimatePresence>
				</form>
			</div>
		</div>
	);
};

export default Login;
