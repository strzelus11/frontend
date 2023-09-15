import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../utils/motion";

const links = [
	{ name: "Home", href: "" },
	{ name: "Calendar", href: "calendar" },
	{ name: "About", href: "about" },
	{ name: "Contact", href: "contact" },
];

export default function Header() {
	const location = useLocation();

	const [menu, setMenu] = useState(false);

	return (
		<AnimatePresence>
			<motion.div
				variants={fadeIn("down", "spring", 0.5, 1)}
				initial="hidden"
				whileInView="show"
				className="flex justify-between items-center pb-[20px] px-6"
			>
				<div className="w-20 h-20">
					<motion.img
						src={process.env.PUBLIC_URL + "/logo.png"}
						alt=""
						className="w-full h-full"
					/>
				</div>
				<div className="flex justify-between gap-[100px] xl:gap-[200px] mr-[100px] lg:mr-[200px]">
					<div className="hidden md:flex justify-center flex-1 gap-[50px]">
						{links.map((link, index) => (
							<NavLink to={`/${link.href}`}>
								<motion.p
									whileHover={{ scale: 1.1, color: "#f68657" }}
									whileTap={{ scale: 0.9 }}
									key={index}
									className={`${
										location.pathname === `/${link.href}`
											? "text-[#f68657]"
											: ""
									}`}
								>
									{link.name}
								</motion.p>
							</NavLink>
						))}
					</div>
					<div className="hidden md:flex justify-center flex-1 gap-[50px]">
						<NavLink to="/login">
							<motion.p
								whileHover={{ scale: 1.1, color: "#f68657" }}
								whileTap={{ scale: 0.9 }}
								className={`${
									location.pathname === "/login" && "text-[#f68657]"
								}`}
							>
								Log In
							</motion.p>
						</NavLink>
						<NavLink to="/register">
							<motion.p
								whileHover={{ scale: 1.1, color: "#f68657" }}
								whileTap={{ scale: 0.9 }}
								className={`${
									location.pathname === "/register" && "text-[#f68657]"
								}`}
							>
								Register
							</motion.p>
						</NavLink>
					</div>
				</div>
				<div
					className="flex md:hidden cursor-pointer"
					onClick={() => setMenu(true)}
				>
					<MenuIcon fontSize="large" />
				</div>
				<div
					className={`fixed md:hidden top-0 right-0 h-full bg-white w-60 z-5 transform transition-transform ${
						menu ? "translate-x-0" : "translate-x-full"
					}`}
				>
					<div className="absolute top-5 left-5" onClick={()=> setMenu(false)}>
						<CloseIcon />
					</div>
					<ul className="p-4 mt-[100px]">
						<li className="mb-2">Item 1</li>
						<li className="mb-2">Item 2</li>
						<li className="mb-2">Item 3</li>
					</ul>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
