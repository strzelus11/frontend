import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { dropIn } from "../utils/motion";
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
        content: ""
    });

	const [alert, setAlert] = useState(false);

	const addTask = async (newTask) => {
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
		if (
			e.key === "Enter" &&
			task.title.trim() !== "" &&
			task.content.trim() !== ""
		) {
            addTask(task);
		}
	};

	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="modal header text-white"
				variants={dropIn}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<CloseIcon
					className="absolute top-8 left-8 cursor-pointer"
					onClick={handleClose}
				/>

				<div className="sm:mt-0 my-[50px] text-center">
					<p className="sm:text-[30px] text-[20px] font-semibold mb-8">
						{day.day}, {months[day.month]} {day.date}
					</p>
					<div className="flex flex-col justify-between items-center h-full">
						<div className="flex flex-col items-center gap-5">
							<label htmlFor="task" className="text-[20px]">
								Add a new task
							</label>
							<div className="cta rounded-3xl flex  flex-col justify-center items-center gap-7 p-10 w-[400px] h-[200px] shadow-xl shadow-[#a540ff]">
								<input
									type="text"
									name="title"
                                    placeholder="Type title"
                                    autoFocus
									value={task.title}
									onChange={(e) => setTask({ ...task, title: e.target.value })}
									onKeyDown={handleAddTask}
									className="rounded-xl p-2 w-[300px] border-2 outline-none border-white text-white header"
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
									className="rounded-xl p-2 w-[300px] border-2 outline-none border-white text-white header"
								/>
							</div>
						</div>
					</div>
					<AnimatePresence>
						{alert && (
							<motion.div
								initial={{
									y: "100%",
									opacity: 0,
								}}
								animate={{
									y: -50,
									opacity: 1,
									transition: {
										type: "spring",
										delay: 0.2,
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

export default AddModal;
