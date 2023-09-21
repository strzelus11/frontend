import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { fadeIn, slideIn } from "../utils/motion";
import Pie from "../components/Pie";
import Scatter from "../components/Scatter";
import LogInModal from "../components/LogInModal";
import { useAuth } from "../utils/AuthContext";

const Stats = () => {
	const [selectedDate, setSelectedDate] = useState("");
	const [tasks, setTasks] = useState(null);
	const [month, setMonth] = useState(null);
	const [year, setYear] = useState(null);
	const [isValidDate, setIsValidDate] = useState(null);
    const [isFutureDate, setIsFutureDate] = useState(null);
    const [login, setLogin] = useState(false);

	const auth = useAuth();

	// Fetch statistics based on the selected date
	useEffect(() => {
		if (selectedDate && isValidDate && !isFutureDate) {
			if (auth.user) {
				async function fetchStats() {
					try {
						const response = await fetch(`/api/tasks/${selectedDate}`, {
							method: "GET",
							credentials: "include",
						});

						if (response.ok) {
							const data = await response.json();
							setTasks(data);
						} else {
							console.error("Failed to fetch stats data");
						}
					} catch (error) {
						console.error("Error fetching stats:", error);
					}
				}
				fetchStats();
            } else {
                setLogin(true);
            }
		}
	}, [selectedDate, isValidDate, isFutureDate]);

	const handleDateChange = (e) => {
		const inputDate = e.target.value;
		setSelectedDate(inputDate);

		const parsedDate = new Date(inputDate);
		setMonth(parsedDate.getMonth() + 1);
		setYear(parsedDate.getFullYear());
		const today = new Date();
		const isValid = !isNaN(parsedDate) && parsedDate.getFullYear() >= 2000;

		setIsValidDate(isValid);
		setIsFutureDate(parsedDate > today);
	};

	return (
		<div className="text-center">
			<div className="flex flex-col justify-between items-center gap-10">
				<div className="flex flex-col items-center gap-2 relative">
					<motion.input
						variants={slideIn("down", "spring", 0, 2)}
						initial="hidden"
						whileInView="show"
						className={`cta gradient-border mt-5 ${
							isValidDate === null && isFutureDate === null && "neutral"
						} ${isValidDate && !isFutureDate ? "valid-date" : "invalid-date"}`}
						type="date"
						name="date"
						value={selectedDate}
						onChange={handleDateChange}
					/>
					<AnimatePresence>
						<motion.span
							className="text-rose-600 text-sm absolute top-[80px] left-1 whitespace-nowrap"
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
							{!isValidDate && <p>Invalid date format.</p>}
							{isFutureDate && <p>No statistics available for future dates.</p>}
						</motion.span>
					</AnimatePresence>
				</div>
			</div>
			<div className="flex justify-center items-center">
				<motion.div
					variants={fadeIn("right", "spring", 0, 2)}
					initial="hidden"
					whileInView="show"
					className="cta rounded-3xl text-center p-10 m-10 w-[900px] h-[1100px] shadow-xl shadow-[#a540ff]"
				>
					<AnimatePresence>
						<motion.h1
							variants={slideIn("right", "spring", 0.5, 2)}
							initial="hidden"
							whileInView="show"
							className="sm:text-[30px] font-semi-bold text-white"
						>
							{isValidDate && !isFutureDate && tasks?.length > 0 && (
								<p>Statistics for the day:</p>
							)}
							{!isValidDate && !isFutureDate && <p>Please choose your date:</p>}
							{tasks?.length === 0 &&
								selectedDate &&
								isValidDate &&
								!isFutureDate && <p>No statistics for the day.</p>}
						</motion.h1>
					</AnimatePresence>
					<div className="mt-10 flex flex-col gap-10 justify-center items-center">
						<AnimatePresence>
							<motion.div
								variants={fadeIn("down", "spring", 0.5, 1)}
								initial="hidden"
								whileInView="show"
							>
								{tasks?.length > 0 && (
									<div className="flex">
										<Pie tasks={tasks} />
									</div>
								)}
							</motion.div>
						</AnimatePresence>
					</div>
					<AnimatePresence>
						<motion.h1
							variants={slideIn("right", "spring", 0.5, 2)}
							initial="hidden"
							whileInView="show"
							className="mt-10 sm:text-[30px] font-semi-bold text-white"
						>
							{isValidDate && !isFutureDate && tasks && (
								<p>Statistics for the month:</p>
							)}
						</motion.h1>
					</AnimatePresence>
					<div className="mt-10 flex flex-col gap-10 justify-center items-center">
						<AnimatePresence>
							<motion.div
								variants={fadeIn("down", "spring", 0, 1)}
								initial="hidden"
								whileInView="show"
							>
								{isValidDate && !isFutureDate && tasks && (
									<div className="flex">
										<Scatter tasks={tasks} month={month} year={year} />
									</div>
								)}
							</motion.div>
						</AnimatePresence>
					</div>
				</motion.div>
			</div>
			<div>{login && (<LogInModal handleClose={() => setLogin(false)} />)}</div>
		</div>
	);
};

export default Stats;
