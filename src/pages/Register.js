import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState("")

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
                navigate("/login");
			} else {
                const errorData = await response.json();
                setRegisterError(
					errorData.error || "Registration failed. Please check your credentials."
				);
			}
		} catch (error) {
			console.error("Register error:", error);
			setRegisterError("An error occurred during register.");
		}
	};

	return (
		<div className="flex justify-center items-center">
			<div className="flex justify-center items-center h-[60vh] cta w-[500px] rounded-3xl m-10">
				<form
					className="flex flex-col justify-between items-center gap-10"
					onSubmit={handleRegister}
				>
					<div className="flex flex-col items-center relative">
						<motion.input
							className={`rounded-xl p-2 w-[300px] border-2 cta text-white
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
									className="text-rose-600 text-sm absolute top-[45px] left-1 whitespace-nowrap"
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
							className={`rounded-xl p-2 w-[300px] border-2 cta text-white ${
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
									className="text-rose-600 text-sm absolute top-[45px] left-1 whitespace-nowrap"
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
							className={`rounded-xl p-2 w-[300px] border-2 cta text-white
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
									className="text-rose-600 text-sm absolute top-[45px] left-1 whitespace-nowrap"
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
							className={`rounded-xl p-2 w-[300px] border-2 cta text-white
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
									className="text-rose-600 text-sm absolute top-[45px] left-1 whitespace-nowrap"
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
						className="button w-[200px] border-none rounded-xl p-3"
					>
						Register
					</motion.button>
					<AnimatePresence>
						{registerError && (
							<motion.p
								variants={slideIn("up", "spring", 0, 2)}
								initial="hidden"
								whileInView="show"
								className="absolute top-[630px] text-rose-600 text-sm"
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
