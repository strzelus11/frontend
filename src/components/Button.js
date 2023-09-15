import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion.js";

const Button = ({ text, direction, delay, handleClick }) => {
	return (
		<motion.button
			variants={fadeIn(direction, "spring", delay, 1.5)}
			initial="hidden"
			whileInView="show"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			className="button border-none rounded p-3"
			handleClick={handleClick}
		>
			{text}
		</motion.button>
	);
};

export default Button;
