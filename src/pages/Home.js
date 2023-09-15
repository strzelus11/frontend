import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../utils/AuthContext";
import { fadeIn, slideIn } from "../utils/motion";

const Home = () => {

	const [alert, setAlert] = useState(true);

    const navigate = useNavigate();
    const auth = useAuth();

	useEffect(() => {
		if (alert) {
			const timeoutId = setTimeout(() => {
				setAlert(false);
			}, 2000);
			return () => clearTimeout(timeoutId);
		}
	}, [alert]);

	return (
		<div className="flex justify-center items-center">
			<motion.div
				variants={fadeIn("right", "spring", 0, 2)}
				whileHover={{ scale: 1.05 }}
				initial="hidden"
				whileInView="show"
				className="cta rounded-3xl text-center p-10 m-10 w-[700px] shadow-xl shadow-[#a540ff]"
			>
				<motion.h1
					variants={slideIn("right", "spring", 0.5, 2)}
					initial="hidden"
					whileInView="show"
					className="text-[40px] font-bold text-white"
				>
					Hello {auth.user ? auth.user.email : "guest"}, this is Keep Time
				</motion.h1>
				<div className="mt-10 flex flex-col gap-10 justify-center items-center">
					<motion.p
						variants={slideIn("down", "spring", 1, 2)}
						initial="hidden"
						whileInView="show"
						className="text-xl text-white"
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
						onClick={() => navigate("/register")}
					>
						Get Started
					</motion.button>
				</div>
			</motion.div>
		</div>
	);
};

export default Home;
