import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { fadeIn, slideIn } from "../utils/motion";

const Stats = () => {
	const [selectedDate, setSelectedDate] = useState("");
	const [stats, setStats] = useState(null);
	const [isValidDate, setIsValidDate] = useState(null);
	const [isFutureDate, setIsFutureDate] = useState(null);

	// Fetch statistics based on the selected date
	useEffect(() => {
		if (selectedDate && isValidDate && !isFutureDate) {
			// Fetch statistics logic here
			const simulatedData = {
				date: selectedDate,
				value: Math.floor(Math.random() * 100),
			};
			setStats(simulatedData);
		}
	}, [selectedDate, isValidDate, isFutureDate]);

	const handleDateChange = (e) => {
		const inputDate = e.target.value;
		setSelectedDate(inputDate);

		const parsedDate = new Date(inputDate);
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
					className="cta rounded-3xl text-center p-10 m-10 w-[900px] h-[400px] shadow-xl shadow-[#a540ff]"
				>
					<AnimatePresence>
						<motion.h1
							variants={slideIn("right", "spring", 0.5, 2)}
							initial="hidden"
							whileInView="show"
							className="text-[40px] font-semi-bold text-white"
						>
							{isValidDate && !isFutureDate && stats && (
								<p>Statistics for {selectedDate}</p>
							)}
							{!isValidDate && !isFutureDate && <p>Please choose your date</p>}
							{!stats && selectedDate && isValidDate && !isFutureDate && (
								<p>No statistics for {selectedDate}</p>
							)}
						</motion.h1>
					</AnimatePresence>
					<div className="mt-10 flex flex-col gap-10 justify-center items-center">
						<AnimatePresence>
							<motion.p
								variants={slideIn("down", "spring", 1, 2)}
								initial="hidden"
								whileInView="show"
								className="text-xl text-white"
							>
								{stats && <p>{stats.value}</p>}
							</motion.p>
						</AnimatePresence>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Stats;
