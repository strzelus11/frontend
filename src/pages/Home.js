import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { useAuth } from "../utils/AuthContext";
import { fadeIn, slideIn } from "../utils/motion";

const Home = () => {
	const [alert, setAlert] = useState(true);

	const navigate = useNavigate();
	const auth = useAuth();
	const location = useLocation();
	const [alertMessage, setAlertMessage] = useState(true);
	const message = location.state?.alertMessage || "";

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
					<div className="absolute top-[500px] sm:top-[600px]">
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
			<motion.div
				variants={fadeIn("right", "spring", 0, 2)}
				whileHover={{ scale: 1.05 }}
				initial="hidden"
				whileInView="show"
				className="cta rounded-3xl text-center m-5 p-5 sm:p-10 sm:m-10 w-[700px] shadow-xl shadow-[#a540ff]"
			>
				<motion.h1
					variants={slideIn("right", "spring", 0.5, 2)}
					initial="hidden"
					whileInView="show"
					className="text-[25px] sm:text-[40px] font-bold text-white"
				>
					Hello{"  "}
					{auth.user ? (
						<span> {auth.user.username}, </span>
					) : (
						<span>guest, </span>
					)}
					this is Keep Time
				</motion.h1>
				<div className="mt-10 flex flex-col gap-10 justify-center items-center">
					<motion.p
						variants={slideIn("down", "spring", 1, 2)}
						initial="hidden"
						whileInView="show"
						className="sm:text-xl text-white"
					>
						Our app will help you deal with your everyday tasks, because planned
						life is easier life!
					</motion.p>
					<motion.button
						variants={slideIn("up", "spring", 0.5, 1.5)}
						initial="hidden"
						whileInView="show"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="button w-[200px] border-none rounded-xl p-3"
						onClick={() => navigate(auth.user ? "/calendar" : "/register")}
					>
						Get Started
					</motion.button>
				</div>
			</motion.div>
		</div>
	);
};

export default Home;
