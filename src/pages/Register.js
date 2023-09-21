import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const navigate = useNavigate();
	const [registerError, setRegisterError] = useState("");

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		password2: "",
		errorMessage: {
			username: "",
			email: "",
			password: "",
			password2: "",
		},
	});

	const [validated, setValidated] = useState({
		username: false,
		email: false,
		password: false,
		password2: false,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		let updatedErrorMessage = { ...formData.errorMessage };
		let validatedNames = { ...validated };

		if (name === "username") {
			if (value.length < 3) {
				updatedErrorMessage.username =
					"Username should be at least 3 characters long.";
			} else {
				updatedErrorMessage.username = "";
				validatedNames.username = true;
			}
		} else if (name === "email") {
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
		} else if (name === "password2") {
			if (value !== formData.password) {
				updatedErrorMessage.password2 = "Passwords do not match.";
			} else {
				updatedErrorMessage.password2 = "";
				validatedNames.password2 = true;
			}
		}

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
			errorMessage: updatedErrorMessage,
		}));

		setValidated(validatedNames);
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		setRegisterError("");

		try {
			const response = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: formData.username,
					email: formData.email,
					password: formData.password,
					password2: formData.password2,
				}),
			});

			if (response.ok) {
				console.log("Registration successful");
				navigate("/login", {
					state: { alertMessage: "Registration successful!" },
				});
			} else {
				const errorData = await response.json();
				console.log(errorData);
				if (errorData.error === "Username already exists") {
					setRegisterError("Error: This username is already in use.");
				}
				if (errorData.errors) {
					if (errorData.errors.email) {
						setRegisterError("User with this email already exists.");
					} else if (errorData.errors.username) {
						setRegisterError("Error: Username already exists");
					} else if (errorData.errors.password) {
						setRegisterError("Passwords do not match");
					} else if (errorData.errors.non_field_errors) {
						setRegisterError(errorData.errors.non_field_errors.join(", "));
					}
				}
			}
		} catch (error) {
			console.error("Register error:", error);
		}
	};

	return (
		<div className="flex justify-center items-center">
			<div className="flex justify-center items-center h-[60vh] cta w-[400px] rounded-3xl m-5 sm:m-10 shadow-xl shadow-[#a540ff] px">
				<form
					className="flex flex-col justify-between items-center gap-6 sm:gap-8"
					onSubmit={handleRegister}
				>
					<div className="flex flex-col items-center relative">
						<motion.input
							className={`rounded-xl p-2 w-[230px] sm:w-[300px] border-2 cta text-white
                                ${
																	formData.errorMessage &&
																	formData.errorMessage.username
																		? "border-rose-600"
																		: validated.username === true
																		? "border-green-600"
																		: "border-white"
																} outline-none`}
							variants={fadeIn("up", "spring", 0.5, 1.5)}
							initial="hidden"
							whileInView="show"
							type="text"
							name="username"
							placeholder="Username"
							value={formData.username}
							onChange={handleInputChange}
						/>
						<AnimatePresence>
							{formData.errorMessage.username !== "" && (
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
									{formData.errorMessage.username}
								</motion.span>
							)}
						</AnimatePresence>
					</div>
					<div className="flex flex-col items-center gap-2 relative">
						<motion.input
							className={`rounded-xl p-2 w-[230px] sm:w-[300px] border-2 cta text-white ${
								formData.errorMessage && formData.errorMessage.email
									? "border-rose-600"
									: validated.email === true
									? "border-green-600"
									: "border-white"
							} outline-none`}
							variants={fadeIn("up", "spring", 0.75, 1.5)}
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
							className={`rounded-xl p-2 w-[230px] sm:w-[300px] border-2 cta text-white
                                ${
																	formData.errorMessage &&
																	formData.errorMessage.password
																		? "border-rose-600"
																		: validated.password === true
																		? "border-green-600"
																		: "border-white"
																} outline-none`}
							variants={fadeIn("up", "spring", 1, 1.5)}
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
					<div className="flex flex-col items-center gap-2 relative">
						<motion.input
							className={`rounded-xl p-2 w-[230px] sm:w-[300px] border-2 cta text-white
                                ${
																	formData.errorMessage &&
																	formData.errorMessage.password2
																		? "border-rose-600"
																		: validated.password2 === true
																		? "border-green-600"
																		: "border-white"
																} outline-none`}
							variants={fadeIn("up", "spring", 1.25, 1.5)}
							initial="hidden"
							whileInView="show"
							type="password"
							name="password2"
							placeholder="Repeat password"
							value={formData.password2}
							onChange={handleInputChange}
						/>
						<AnimatePresence>
							{formData.errorMessage.password2 !== "" && (
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
									{formData.errorMessage.password2}
								</motion.span>
							)}
						</AnimatePresence>
					</div>
					<motion.button
						variants={slideIn("up", "spring", 1.5, 2)}
						initial="hidden"
						whileInView="show"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="button w-[120px] sm:w-[200px] border-none rounded-xl sm:mt-0 mt-5 p-3"
					>
						Register
					</motion.button>
					<AnimatePresence>
						{registerError && (
							<motion.p
								variants={slideIn("up", "spring", 0, 2)}
								initial="hidden"
								whileInView="show"
								className="absolute top-[650px] text-rose-600 text-sm"
							>
								{registerError}
							</motion.p>
						)}
					</AnimatePresence>
				</form>
			</div>
		</div>
	);
};

export default Register;
