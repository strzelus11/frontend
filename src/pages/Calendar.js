import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import { zoomIn, slideIn } from "../utils/motion";
import { useAuth } from "../utils/AuthContext";
import AddModal from "../components/AddModal";
import ListModal from "../components/ListModal";
import LogInModal from "../components/LogInModal";

const names = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

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

const Calendar = () => {
	const auth = useAuth();

	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

	const [addModalOpen, setAddModalOpen] = useState(false);
	const [listModalOpen, setListModalOpen] = useState(false);

	const [day, setDay] = useState({});
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [reloadCounter, setReloadCounter] = useState(0);

	useEffect(() => {
		if (addModalOpen || listModalOpen) {
			document.body.classList.add("body-overflow-hidden");
		} else {
			document.body.classList.remove("body-overflow-hidden");
		}
	}, [addModalOpen, listModalOpen]);

	const handlePrevMonth = () => {
		setCurrentMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
		if (currentMonth === 0) {
			setCurrentYear((prevYear) => prevYear - 1);
		}
	};

	const handleNextMonth = () => {
		setCurrentMonth((prevMonth) => (prevMonth + 1) % 12);
		if (currentMonth === 11) {
			setCurrentYear((prevYear) => prevYear + 1);
		}
	};

	const generateDaysArray = (month, year) => {
		const days = [];

		const firstDay = new Date(year, month, 1).getDay(); // Get day of the week for the 1st day of the month
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		const startDayIndex = firstDay === 0 ? 6 : firstDay - 1; // Adjust start index to Monday-based

		for (let i = 0; i < startDayIndex; i++) {
			days.push({});
		}

		for (let i = 1; i <= daysInMonth; i++) {
			days.push({
				day: new Date(year, month, i).toLocaleDateString("en-US", {
					weekday: "long",
				}),
				date: i.toString(),
				month: month,
				year: year,
			});
		}

		let totalSlots;

		if (startDayIndex + daysInMonth > 35) {
			totalSlots = 42;
		} else {
			totalSlots = 35;
		}

		while (days.length < totalSlots) {
			days.push({});
		}

		return days;
	};

	const [allDays, setAllDays] = useState([]);

	useEffect(() => {
		const generatedDays = generateDaysArray(currentMonth, currentYear);
		setAllDays(generatedDays);
	}, [currentMonth, currentYear]);

	const handleReload = () => {
		setReloadCounter(reloadCounter + 1);
	};

	const handleClick = (day) => {
		if (day.day) {
			setListModalOpen(true);
			setDay(day);
		}
	};

	const handleAdd = (day, e) => {
		if (day.day) {
			e.stopPropagation();
			setAddModalOpen(true);
			setDay(day);
		}
	};

	const currentDate = new Date();

	return (
		<div className="">
			<motion.div
				variants={slideIn("top", "spring", 0.5, 2)}
				initial="hidden"
				whileInView="show"
				className="cursor-pointer absolute msm:top-[125px] sm:top-[135px] msm:left-[40px] sm:left-[120px] md:left-[220px] lg:left-[320px]"
				onClick={() => {
					handleReload();
					handlePrevMonth();
				}}
			>
				<KeyboardDoubleArrowLeftIcon />
			</motion.div>
			<div className="text-center font-bold mb-5">
				<motion.h1
					variants={slideIn("top", "spring", 0.5, 1)}
					initial="hidden"
					whileInView="show"
					className="text-gradient sm:text-[40px] text-[25px] inline-block"
				>
					{months[currentMonth]} {currentYear}
				</motion.h1>
			</div>
			<motion.div
				variants={slideIn("top", "spring", 0.5, 2)}
				initial="hidden"
				whileInView="show"
				className="cursor-pointer absolute msm:top-[125px] sm:top-[135px] msm:right-[40px] sm:right-[120px] md:right-[220px] lg:right-[320px]"
				onClick={() => {
					handleReload();
					handleNextMonth();
				}}
			>
				<KeyboardDoubleArrowRightIcon />
			</motion.div>

			<div className="flex flex-col">
				<div className="grid grid-cols-7 mb-5">
					{names.map((day, index) => (
						<motion.div
							variants={slideIn("up", "spring", 1.2, 1.5)}
							initial="hidden"
							whileInView="show"
							className="text-center"
							key={index}
						>
							<p className="sm:text-[16px] text-[8px] font-semibold">{day}</p>
						</motion.div>
					))}
				</div>
				<div className="grid grid-cols-7 gap-2">
					{allDays.map((day, index) => (
						<motion.div
							variants={zoomIn(index * 0.02, 0.5)}
							initial="hidden"
							whileInView="show"
							whileHover={{ scale: day.day ? 1.05 : 1, opacity: 1 }}
							whileTap={{ scale: day.day ? 0.9 : 1 }}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
							onClick={() => handleClick(day)}
							key={index}
							className={`w-full shadow-xl shadow-[#a540ff] ${
								day.day
									? "tiles rounded border-2 border-[#999]"
									: "bg-[#b995d890] rounded"
							}${
								day.day === "Saturday"
									? "border-2 sm:border-4 border-[#f68657]"
									: day.day === "Sunday"
									? "border-2 sm:border-4 border-[#f68657]"
									: ""
							}  msm:p-1 sm:p-2 md:p-3 lg:p-4 msm:h-[40px] sm:h-[70px] md:h-[80px] lg:h-[100px] hover:border-[#f68657] ${
								parseInt(day.date) === currentDate.getDate() &&
								day.month === currentDate.getMonth() &&
								day.year === currentDate.getFullYear()
									? "border-2 sm:border-4 border-green-600"
									: ""
							}`}
						>
							<div className="flex flex-row justify-between items-center">
								<p
									className={`msm:text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]${
										parseInt(day.date) === currentDate.getDate() &&
										day.month === currentDate.getMonth() &&
										day.year === currentDate.getFullYear()
											? "border-4 border-white rounded-full"
											: ""
									}`}
								>
									{day.day ? `${day.date}` : ""}
								</p>
								{day.day && hoveredIndex === index && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.5 }}
										className="cursor-pointer"
										onClick={(e) => handleAdd(day, e)}
									>
										<AddIcon color="success" />
									</motion.div>
								)}
							</div>
						</motion.div>
					))}
				</div>

				<AnimatePresence
					initial={false}
					mode="wait"
					onExitComplete={() => null}
				>
					{addModalOpen &&
						(auth.isAuthenticated ? (
							<AddModal
								day={day}
								year={currentYear}
								addModalOpen={addModalOpen}
								handleClose={() => {
									setAddModalOpen(false);
								}}
							/>
						) : (
							<LogInModal
								handleClose={() => {
									setAddModalOpen(false);
								}}
							/>
						))}
				</AnimatePresence>

				<AnimatePresence
					initial={false}
					mode="wait"
					onExitComplete={() => null}
				>
					{listModalOpen &&
                        (auth.isAuthenticated ? (
							<ListModal
								day={day}
								year={currentYear}
								listModalOpen={listModalOpen}
								handleClose={() => {
									setListModalOpen(false);
								}}
								handleOpen={() => {
									setAddModalOpen(true);
								}}
							/>
						) : (
							<LogInModal
								handleClose={() => {
									setListModalOpen(false);
								}}
							/>
						))}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Calendar;