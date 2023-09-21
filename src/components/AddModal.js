import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { dropIn, slideIn } from "../utils/motion";
import Backdrop from "./Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const AddModal = ({ handleClose, day, year }) => {
	const [task, setTask] = useState({
		title: "",
		content: "",
	});

	const [alert, setAlert] = useState(false);

	const addTask = async (newTask) => {
		if (task.title.trim() !== "" && task.content.trim() !== "") {
			try {
				const formattedDate = `${year}-${String(day.month + 1).padStart(
					2,
					"0"
				)}-${String(day.date).padStart(2, "0")}`;
				const response = await fetch(`api/task/create/${formattedDate}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newTask),
				});

				if (response.ok) {
					setTask({ title: "", content: "" }); // Clear input fields
					setAlert(true);
				} else {
					console.error("Failed to add task");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		}
	};

	useEffect(() => {
		if (alert) {
			const timeoutId = setTimeout(() => {
				setAlert(false);
			}, 2000);
			return () => clearTimeout(timeoutId);
		}
	}, [alert]);

	const handleAddTask = (e) => {
		if (e.key === "Enter") {
			addTask(task);
		}
	};

	function isPast(dateToCheck) {
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - 1);

		const checkedDate = new Date(
			dateToCheck.year,
			dateToCheck.month,
			dateToCheck.date
		);
		return checkedDate < currentDate;
	}

	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="fixed border-none rounded-xl p-10 w-[300px] h-[450px] sm:w-[700px] sm:h-[550px] header text-white"
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
					<p className="sm:text-[30px] text-[18px] font-semibold mb-8">
						{day.day}, {months[day.month]} {day.date}
					</p>
					{isPast(day) ? (
						<div className="flex flex-col justify-between items-center h-full mt-[100px]">
							<div className="flex flex-col items-center gap-5">
								<div className="cta rounded-3xl flex items-center p-5 w-[250px] h-[200px] sm:w-[400px] sm:h-[200px] shadow-xl shadow-[#a540ff]">
									<p className="sm:text-[25px] text-[18px] font-semibold mb-8">
										Are you sure you want to add a task to the past?
									</p>
								</div>
							</div>
						</div>
					) : (
						<div className="flex flex-col justify-between items-center h-full">
							<div className="flex flex-col items-center gap-5">
								<label htmlFor="task" className="sm:text-[20px] mb-5 sm:mb-10">
									Add a new task
								</label>
								<div className="cta rounded-3xl flex flex-col justify-center items-center gap-4 sm:gap-7 p-10 w-[250px] h-[200px] sm:w-[400px] sm:h-[200px] shadow-xl shadow-[#a540ff]">
									<input
										type="text"
										name="title"
										placeholder="Type title"
										autoFocus
										value={task.title}
										onChange={(e) =>
											setTask({ ...task, title: e.target.value })
										}
										onKeyDown={handleAddTask}
										className="text-[12px] sm:text-[16px] rounded-xl p-2 w-[210px] sm:w-[300px] border-2 outline-none border-white text-white header"
									/>
									<input
										type="text"
										name="content"
										placeholder="Type content and press Enter"
										value={task.content}
										onChange={(e) =>
											setTask({ ...task, content: e.target.value })
										}
										onKeyDown={handleAddTask}
										className="text-[12px] sm:text-[16px] rounded-xl p-2 w-[210px] sm:w-[300px] border-2 outline-none border-white text-white header"
									/>
									<motion.button
										onClick={() => addTask(task)}
										variants={slideIn("up", "spring", 0, 2)}
										initial="hidden"
										whileInView="show"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										className="sm:hidden block text-[14px] w-[100px] mt-2 sm:mt-3 rounded-xl bg-inherit border-2 border-white py-2 px-7"
									>
										Add
									</motion.button>
								</div>
							</div>
						</div>
					)}
					<AnimatePresence>
						{alert && (
							<div className="flex justify-center items-center ">
								<motion.div
									initial={{
										y: "200%",
										opacity: 0,
									}}
									animate={{
										y: 50,
										opacity: 1,
										transition: {
											type: "spring",
											delay: 0.2,
											duration: 1,
											ease: "easeOut",
										},
									}}
									exit={{
										y: "200%",
										opacity: 0,
										transition: {
											duration: 0.5,
										},
									}}
									className="flex justify-center items-center rounded-full border-2 border-[#ae50ff] sm:text-[16px] text-[12px] tiles text-green-700 p-3 w-[300px]"
								>
										<span className="mr-2">
											<BookmarkAddedIcon />
										</span>
										<span className="text-white">Task added successfully!</span>
								</motion.div>
							</div>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		</Backdrop>
	);
};

export default AddModal;
