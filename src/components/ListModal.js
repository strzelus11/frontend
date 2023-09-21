import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { dropIn, slideIn, fadeIn } from "../utils/motion";
import Backdrop from "./Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

const TaskEdit = ({ taskToEdit, handleClose }) => {
	const [title, setTitle] = useState(taskToEdit.title);
	const [content, setContent] = useState(taskToEdit.content);

	const handleSaveTask = async () => {
		try {
			const response = await fetch(
				`/api/task/update/${taskToEdit.date}/${taskToEdit.id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: title,
						content: content,
						status: taskToEdit.status,
					}),
				}
			);

			if (response.ok) {
				console.log("Task edited successfully");
				handleClose();
			} else {
				console.error("Failed to edit task");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="absolute top-0 left-0 h-[100%] rounded-xl w-[100%] bg-[#0000003f] flex items-center justify-center">
			<motion.div
				onClick={(e) => e.stopPropagation()}
				variants={dropIn}
				initial="hidden"
				animate="visible"
				exit="exit"
				className="cta rounded-3xl flex justify-center p-10 w-[300px] sm:w-[600px] sm:h-[400px] sm:shadow-xl shadow-[#a540ff]"
			>
				<CloseIcon
					className="absolute top-5 left-5 sm:top-8 sm:left-8 cursor-pointer"
					onClick={handleClose}
				/>
				<div className="flex flex-col items-center gap-5">
					<h1 className="sm:text-[30px] text-[18px] text-white text-center font-semibold mb-2 sm:mb-5">
						Edit view
					</h1>
					<div className="flex flex-col gap-1">
						<motion.label
							variants={slideIn("left", "spring", 0, 1.5)}
							initial="hidden"
							whileInView="show"
							htmlFor="title"
						>
							Title:
						</motion.label>
						<motion.input
							variants={fadeIn("up", "spring", 0, 1.5)}
							initial="hidden"
							whileInView="show"
							type="text"
							name="title"
							className="rounded-xl p-2 w-[220px] sm:w-[300px] border-2 outline-none border-white text-white header"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<motion.label
							variants={slideIn("left", "spring", 0, 1.5)}
							initial="hidden"
							whileInView="show"
							htmlFor="content"
						>
							Content:
						</motion.label>
						<motion.input
							variants={fadeIn("up", "spring", 0.5, 1.5)}
							initial="hidden"
							whileInView="show"
							type="text"
							name="content"
							className="rounded-xl p-2 w-[220px] sm:w-[300px] border-2 outline-none border-white text-white header"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
					<motion.button
						onClick={handleSaveTask}
						variants={slideIn("up", "spring", 1, 2)}
						initial="hidden"
						whileInView="show"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="mt-3 rounded-xl bg-inherit border-2 border-white py-2 px-7"
					>
						Save
					</motion.button>
				</div>
			</motion.div>
		</div>
	);
};

const ListModal = ({ handleClose, day, year, handleOpen }) => {
	const [tasks, setTasks] = useState([]);
	const [taskStatus, setTaskStatus] = useState([]);
	const [edited, setEdited] = useState(false);
	const [taskToEdit, setTaskToEdit] = useState({});

	const handleToggleTask = async (index) => {
		const updatedStatus = [...taskStatus];
		updatedStatus[index] = !updatedStatus[index];
		setTaskStatus(updatedStatus);

		try {
			const taskToUpdate = tasks[index];
			const response = await fetch(
				`/api/task/update/${taskToUpdate.date}/${taskToUpdate.id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: taskToUpdate.title,
						content: taskToUpdate.content,
						status: updatedStatus[index],
					}),
				}
			);

			if (response.ok) {
				console.log("Task status updated successfully");
			} else {
				console.error("Failed to update task status");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleEditTask = async (taskToEdit) => {
		setTaskToEdit(taskToEdit);
		setEdited(true);
	};

	const handleDeleteTask = async (index, taskToDelete) => {
		try {
			const updatedTasks = [...tasks];
			updatedTasks[index] = { ...taskToDelete, fadeOut: true };
			setTasks(updatedTasks);
			const response = await fetch(
				`/api/task/delete/${taskToDelete.date}/${taskToDelete.id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				console.log("Task deleted successfully");
			} else {
				console.error("Failed to delete task");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const formattedDate = `${year}-${String(day.month + 1).padStart(
					2,
					"0"
				)}-${String(day.date).padStart(2, "0")}`;
				const response = await fetch(`api/tasks/${formattedDate}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (response.ok) {
					const data = await response.json();
					const defaultTaskStatus = data.map((task) => task.status || false);
					setTasks(data);
					setTaskStatus(defaultTaskStatus);
				} else {
					console.error("Failed to fetch tasks");
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchTasks();
	}, [tasks]);

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
				<div className="mt-5 my-[50px]">
					<p className="sm:text-[30px] text-[18px] text-center font-semibold mb-8">
						{day.day}, {months[day.month]} {day.date}
					</p>
					<div className="flex flex-col justify-between items-center h-full">
						<div className="flex flex-col items-center">
							<label htmlFor="task" className="sm:text-[20px] mb-5 sm:mb-10">
								All tasks
							</label>
							<div className="cta rounded-3xl flex justify-center p-10 w-[250px] h-[200px] sm:w-[500px] sm:h-[400px] shadow-xl shadow-[#a540ff] overflow-y-auto">
								{tasks == "" && (
									<div className="flex flex-col justify-center items-center">
										<p className="sm:text-[30px] text-[20px] text-center font-semibold mb-8">
											No tasks for this day
										</p>
										<motion.button
											onClick={() => {
												handleOpen();
												handleClose();
											}}
											variants={slideIn("up", "spring", 0, 2)}
											initial="hidden"
											whileInView="show"
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
											className="w-[180px] sm:w-[200px] mt-3 rounded-xl bg-inherit border-2 border-white py-2 px-7"
										>
											Add new task
										</motion.button>
									</div>
								)}
								<ul className="flex flex-col items-end gap-3 sm:gap-5">
									{tasks.map((task, index) => (
										<>
											<li
												key={index}
												className={task.fadeOut ? "fade-out" : ""}
											>
												<div className="flex items-center justify-center gap-2 sm:gap-4">
													<motion.div
														whileHover={{ scale: 1.1 }}
														className="rounded-xl p-1 sm:p-2 w-24 sm:w-32 border-2 header text-white outline-none text-center truncate"
													>
														{task.title}
													</motion.div>
													<div className="border-2 rounded-xl py-1 px-2 sm:py-2 sm:px-4 flex justify-center gap-2 sm:gap-3 items-center">
														<span className="hover:text-blue-400">
															<motion.button
																whileHover={{ scale: 1.2 }}
																whileTap={{ scale: 0.9 }}
																onClick={() => handleEditTask(task)}
															>
																<EditIcon />
															</motion.button>
														</span>
														<span className="hover:text-green-500">
															<motion.button
																whileHover={{ scale: 1.2 }}
																whileTap={{ scale: 0.9 }}
																onClick={() => handleToggleTask(index)}
															>
																{taskStatus[index] ? (
																	<CheckBoxIcon />
																) : (
																	<CheckBoxOutlineBlankIcon />
																)}
															</motion.button>
														</span>
														<span className="hover:text-rose-500">
															<motion.button
																whileHover={{ scale: 1.2 }}
																whileTap={{ scale: 0.9 }}
																onClick={() => handleDeleteTask(index, task)}
															>
																<DeleteIcon />
															</motion.button>
														</span>
													</div>
												</div>
											</li>
											<AnimatePresence
												initial={false}
												mode="wait"
												onExitComplete={() => null}
											>
												{edited && (
													<TaskEdit
														taskToEdit={taskToEdit}
														handleClose={() => {
															setEdited(false);
														}}
													/>
												)}
											</AnimatePresence>
										</>
									))}
								</ul>
							</div>
							{tasks != "" && (<motion.button
								onClick={() => {
									handleOpen();
									handleClose();
								}}
								variants={slideIn("up", "spring", 0, 2)}
								initial="hidden"
								whileInView="show"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								className="sm:hidden block w-[200px] mt-8 sm:mt-3 rounded-xl bg-inherit border-2 border-white py-2 px-7"
							>
								Add another one
							</motion.button>)}
						</div>
					</div>
				</div>
			</motion.div>
		</Backdrop>
	);
};

export default ListModal;
