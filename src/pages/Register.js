import React, { useState } from "react";

import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";

const Register = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
    });
    
    const CSRF = document.cookie.slice(10);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/register/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": CSRF,
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				console.log("Registration successful");
				// Handle redirection or other actions after successful registration
			} else {
				const data = await response.json();
				console.error("Registration failed:", data);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="flex justify-center items-center h-[60vh]">
			<form
				className="flex flex-col justify-between items-center gap-5"
				onSubmit={handleRegister}
			>
				<motion.input
					className="rounded-xl p-2 w-[300px] border-none outline-[#f68657]"
					variants={fadeIn("up", "spring", 0.5, 1.5)}
					initial="hidden"
					whileInView="show"
					type="text"
					name="username"
					placeholder="Username"
					value={formData.username}
					onChange={handleInputChange}
				/>
				<motion.input
					className="rounded-xl p-2 w-[300px] border-none outline-[#f68657]"
					variants={fadeIn("up", "spring", 0.75, 1.5)}
					initial="hidden"
					whileInView="show"
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleInputChange}
				/>
				<motion.input
					className="rounded-xl p-2 w-[300px] border-none outline-[#f68657]"
					variants={fadeIn("up", "spring", 1, 1.5)}
					initial="hidden"
					whileInView="show"
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleInputChange}
				/>
				<motion.button
					variants={slideIn("up", "spring", 1.25, 2)}
					initial="hidden"
					whileInView="show"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="button w-[200px] border-none rounded-xl p-3"
				>
					Register
				</motion.button>
			</form>
		</div>
	);
};

export default Register;
