import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { dropIn, makeAlert } from "../utils/motion";
import Backdrop from "./Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

const ListModal = ({ handleClose, day }) => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	const [alert, setAlert] = useState(false);

	useEffect(() => {
		if (alert) {
			const timeoutId = setTimeout(() => {
				setAlert(false);
			}, 2000);
			return () => clearTimeout(timeoutId);
		}
	}, [alert]);

    
	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="modal bg-[#e0e3e6]"
				variants={dropIn}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<CloseIcon className="absolute top-8 left-8 cursor-pointer" onClick={handleClose} />

				<p className="text-[30px] text-[#f68657] mb-8">
					{day.day}, {day.month} {day.date}
				</p>
				<div className="flex flex-col justify-between items-center h-full">
					<div className="flex flex-col items-center">
						<label htmlFor="task" className="text-[20px] mb-10">
							All tasks
						</label>
						<ul>
							{tasks.map((task, index) => (
								<li key={index}>{task}</li>
							))}
						</ul>
					</div>
					<AnimatePresence>
						{alert && (
							<motion.div
								initial={{
									y: "100%",
									opacity: 0,
								}}
								animate={{
									y: 0,
									opacity: 1,
									transition: {
										type: "spring",
										delay: 0.5,
										duration: 1,
										ease: "easeOut",
									},
								}}
								exit={{
									y: "100%",
									opacity: 0,
									transition: {
										duration: 0.5,
									},
								}}
								className="rounded-full border-2 border-green-500 bg-white text-green-700 p-2 w-200px"
							>
								<div className="mx-2">
									<span className="mr-2">
										<BookmarkAddedIcon />
									</span>
									Task added successfully!
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		</Backdrop>
	);
};

export default ListModal;
