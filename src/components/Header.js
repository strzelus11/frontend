import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";
import { useAuth } from "../utils/AuthContext";

const links = [
	{ name: "Home", href: "" },
	{ name: "Calendar", href: "calendar" },
	{ name: "Stats", href: "stats" },
];

export default function Header() {
	const location = useLocation();
	const navigate = useNavigate();
	const auth = useAuth();

	const [menu, setMenu] = useState(false);

	const handleLogout = async () => {
		try {
			await fetch("api/logout", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});

			auth.logout();
			navigate("/login", {
				state: { alertMessage: "Logout successful!" },
			});
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				// variants={fadeIn("down", "spring", 0.5, 1)}
				// initial="hidden"
				// whileInView="show"
				className="header flex justify-between items-center py-[10px] px-6 rounded-b-xl shadow-xl shadow-[#ca8ffe]"
			>
				<div className="w-[50px] h-[50px] md:w-20 md:h-20">
					<motion.img
						src={process.env.PUBLIC_URL + "/logo.png"}
						alt=""
						className="w-full h-full"
					/>
				</div>
				<div className="flex justify-between gap-[100px] xl:gap-[200px] mr-[100px] lg:mr-[200px]">
					<div className="hidden md:flex justify-center flex-1 gap-[50px]">
						{links.map((link, index) => (
							<NavLink
								to={`/${link.href}`}
								className={`text-[16px] md:text-[20px] hover:scale-110 transition-transform duration-300 hover:text-[#fff] ${
									location.pathname === `/${link.href}` ? "text-[#fff]" : ""
								}`}
								key={index}
							>
								{link.name}
							</NavLink>
						))}
					</div>

					{!auth.user ? (
						<div className="hidden md:flex justify-center flex-1 gap-[50px]">
							<NavLink
								to="/login"
								className={`text-[16px] md:text-[20px] hover:scale-110 transition-transform duration-300 hover:text-[#fff] ${
									location.pathname === "/login" ? "text-[#fff]" : ""
								}`}
							>
								Log In
							</NavLink>
							<NavLink
								to="/register"
								className={`text-[16px] md:text-[20px] hover:scale-110 transition-transform duration-300 hover:text-[#fff] ${
									location.pathname === "/register" ? "text-[#fff]" : ""
								}`}
							>
								Register
							</NavLink>
						</div>
					) : (
						<div className="hidden md:flex justify-center flex-1 gap-[50px]">
							<motion.p
								whileHover={{ scale: 1.1, color: "#fff" }}
								whileTap={{ scale: 0.9 }}
								className={`text-[16px] md:text-[20px] cursor-pointer ${
									location.pathname === "/logout" && "text-[#fff]"
								}`}
								onClick={handleLogout}
							>
								Log Out
							</motion.p>
						</div>
					)}
				</div>
				<div
					className="flex md:hidden cursor-pointer mr-10"
					onClick={() => setMenu(true)}
				>
					<MenuIcon />
				</div>
				<motion.div
					className="fixed md:hidden top-0 right-0 h-full header w-60 z-5 rounded-l-xl"
					variants={slideIn("right", "spring", 0, 1)}
					initial={menu ? "" : "hidden"}
					whileInView={menu ? "show" : ""}
				>
					<div
						className="absolute top-5 left-5 cursor-pointer"
						onClick={() => setMenu(false)}
					>
						<CloseIcon />
					</div>
					<div className="flex flex-col ml-7 mt-[100px] justify-center flex-1 gap-[50px] text-white">
						{links.map((link, index) => (
							<NavLink to={`/${link.href}`}>
								<motion.p
									variants={slideIn("right", "spring", 0.05 * index, 1)}
									initial="hidden"
									whileInView="show"
									whileTap={{ scale: 0.9 }}
									onClick={() => setMenu(false)}
									key={index}
								>
									{link.name}
								</motion.p>
							</NavLink>
						))}
						{!auth.user ? (
							<div className="mt-[50px] flex flex-col justify-between gap-10 text-white">
								<motion.p
									variants={slideIn("right", "spring", 0.4, 1)}
									initial="hidden"
									whileInView="show"
									whileTap={{ scale: 0.9 }}
									onClick={() => setMenu(false)}
								>
									<NavLink
										to="/login"
										className={`text-[16px] md:text-[20px] hover:scale-110 transition-transform duration-300 hover:text-[#fff] ${
											location.pathname === "/login" ? "text-[#fff]" : ""
										}`}
									>
										Log In
									</NavLink>
								</motion.p>
								<motion.p
									variants={slideIn("right", "spring", 0.45, 1)}
									initial="hidden"
									whileInView="show"
									whileTap={{ scale: 0.9 }}
									onClick={() => setMenu(false)}
								>
									<NavLink
										to="/register"
										className={`text-[16px] md:text-[20px] hover:scale-110 transition-transform duration-300 hover:text-[#fff] ${
											location.pathname === "/register" ? "text-[#fff]" : ""
										}`}
									>
										Register
									</NavLink>
								</motion.p>
							</div>
						) : (
							<div className="mt-[50px]">
								<motion.p
									variants={slideIn("right", "spring", 0.5, 1)}
									initial="hidden"
									whileInView="show"
									whileTap={{ scale: 0.9 }}
									className={`text-[16px] md:text-[20px] cursor-pointer text-white ${
										location.pathname === "/logout" && "text-[#fff]"
									}`}
									onClick={() => {
										setMenu(false);
										handleLogout();
									}}
								>
									Log Out
								</motion.p>
							</div>
						)}
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
