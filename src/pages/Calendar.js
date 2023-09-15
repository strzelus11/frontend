import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";

import { zoomIn, slideIn, fadeIn } from "../utils/motion";
import AddModal from "../components/AddModal";
import ListModal from "../components/ListModal";

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

const generateDaysArray = (month) => {
	const days = [];

	const monthIndex = months.findIndex((item) => item === month);

	let date = new Date(2023, monthIndex, 1);

	const firstDay = date.toLocaleDateString("en-US", { weekday: "long" });
	const firstDayIndex = names.findIndex((name) => name === firstDay);

	date.setDate(date.getDate() - firstDayIndex);
	let currentDate = new Date(date);

	for (let i = 0; i < 35; i++) {
		const newDate = new Date(currentDate);
		newDate.setDate(currentDate.getDate() + i);

		const dayObject = {
			day: newDate.toLocaleDateString("en-US", { weekday: "long" }),
			date: newDate.getDate().toString(),
			month: newDate.toLocaleDateString("en-US", { month: "long" }),
		};

		days.push(dayObject);
	}

	const daysBefore = firstDayIndex;

	const missingDaysBefore = Array(daysBefore).fill({});

	const daysInMonth = days.filter((day) => day.month === month);

	const totalSlots = 35;
	const daysAfter = totalSlots - daysInMonth.length - missingDaysBefore.length;

	const missingDaysAfter = Array(daysAfter).fill({});

	const allDays = [...missingDaysBefore, ...daysInMonth, ...missingDaysAfter];

	return allDays;
};

const Calendar = ({ month }) => {
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [listModalOpen, setListModalOpen] = useState(false);
	const [day, setDay] = useState({});
	const [hoveredIndex, setHoveredIndex] = useState(null);

	useEffect(() => {
		if (addModalOpen || listModalOpen) {
			document.body.classList.add("body-overflow-hidden");
		} else {
			document.body.classList.remove("body-overflow-hidden");
		}
	}, [addModalOpen, listModalOpen]);

	const allDays = generateDaysArray(month);

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

	return (
		<>
			<div className="text-center font-bold mb-5">
				<motion.h1
					variants={fadeIn("right", "spring", 0.5, 1)}
					initial="hidden"
					whileInView="show"
					className="text-[40px] text-[#f68657]"
				>
					{month}
				</motion.h1>
			</div>

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
							<p className="font-semibold">{day}</p>
						</motion.div>
					))}
				</div>
				<div className="grid grid-cols-7 gap-2">
					{allDays.map((day, index) => (
						<motion.div
							variants={zoomIn(index * 0.02, 0.5)}
							initial="hidden"
							whileInView="show"
							whileHover={{ scale: day.day ? 1.1 : 1, opacity: 1 }}
							whileTap={{ scale: day.day ? 0.9 : 1 }}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
							onClick={() => handleClick(day)}
							key={index}
							className={`p-4 w-full h-[100px]  ${
								day.day
									? "bg-gray-300 rounded border border-gray-500"
									: "bg-gray-100 rounded"
							}`}
						>
							<div className="flex flex-row justify-between items-center">
								{day.day ? `${day.date}` : ""}
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
					{addModalOpen && (
						<AddModal
							text="This is calendar"
							day={day}
							addModalOpen={addModalOpen}
							handleClose={() => {
								setAddModalOpen(false);
							}}
						/>
					)}
				</AnimatePresence>

				<AnimatePresence
					initial={false}
					mode="wait"
					onExitComplete={() => null}
				>
					{listModalOpen && (
						<ListModal
							text="This is calendar"
							day={day}
							listModalOpen={listModalOpen}
							handleClose={() => {
								setListModalOpen(false);
							}}
						/>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};

export default Calendar;
