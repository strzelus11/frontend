import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

import { slideIn, dropIn } from "../utils/motion";
import Backdrop from "./Backdrop";

const LogInModal = ({ handleClose }) => {

    const navigate = useNavigate();

	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="fixed border-none rounded-xl p-10 w-[300px] h-[500px] sm:w-[700px] sm:h-[650px] header text-white"
				variants={dropIn}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<CloseIcon
					className="absolute top-5 left-5 sm:top-8 sm:left-8 cursor-pointer"
					onClick={handleClose}
				/>
				<div className="mt-5 my-[50px] text-center">
					<p className="sm:text-[40px] text-[28px] text-center font-semibold mb-8">
						User not authenticated
					</p>
					<div className="flex flex-col justify-between items-center h-full">
						<div className="flex flex-col items-center gap-5">
							<div className="sm:mt-10 cta rounded-3xl flex  flex-col justify-center items-center gap-7 p-10 w-[220px] sm:w-[600px] sm:h-[300px] shadow-xl shadow-[#a540ff]">
								<p className="sm:text-[30px] text-[18px] font-semibold sm:mb-8">
									Please Log In or Register
								</p>
								<div className="flex flex-col sm:flex-row justify-between items-center sm:gap-[80px]">
									<motion.button
										onClick={() => navigate("/login")}
										variants={slideIn("up", "spring", 0, 2)}
										initial="hidden"
										whileInView="show"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className="w-[150px] mt-3 rounded-xl bg-inherit border-2 border-white py-2 px-7"
									>
										Log In
									</motion.button>
									<motion.button
										onClick={() => navigate("/register")}
										variants={slideIn("up", "spring", 0, 2)}
										initial="hidden"
										whileInView="show"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className="w-[150px] mt-3 rounded-xl bg-inherit border-2 border-white py-2 px-7"
									>
										Register
									</motion.button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</Backdrop>
	);
};

export default LogInModal;
