import { Badge } from "@mui/material";
import { useState } from "react";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import UserMenu from "../UserMenu";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const { cart } = useSelector((state) => state.carts);
    const { user } = useSelector((state) => state.auth);

    // Hide navbar on admin pages
    if (path.startsWith('/admin')) return null;

    return (
        <div className="h-[70px] bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 z-50 flex items-center sticky top-0 shadow-sm border-b border-slate-100 dark:border-slate-800 backdrop-blur-md bg-white/95 dark:bg-slate-900/95">
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">
                <Link to="/" className="flex items-center text-2xl font-bold gap-2 hover:opacity-80 transition">
                    <div className="p-2 bg-indigo-600 rounded-lg">
                        <FaStore className="text-white text-lg" />
                    </div>
                    <span className="font-[Inter] tracking-tight text-slate-800 dark:text-white">E-Shop</span>
                </Link>

                <ul className={`flex sm:gap-6 gap-4 sm:items-center sm:static absolute left-0 top-[70px] sm:shadow-none shadow-lg ${
                        navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
                    } transition-all duration-200 sm:h-fit bg-white dark:bg-slate-900 sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0 sm:border-none border-b border-slate-100 dark:border-slate-800`}>
                    {[
                        { name: "Home", to: "/" },
                        { name: "Products", to: "/products" },
                        { name: "About", to: "/about" },
                        { name: "Contact", to: "/contact" },
                    ].map((item) => (
                        <li key={item.name} className="font-medium transition-all duration-150">
                            <Link
                                className={`relative py-1 text-sm ${
                                    path === item.to
                                        ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                        : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                                } transition-colors`}
                                to={item.to}
                            >
                                {item.name}
                                {path === item.to && (
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                                )}
                            </Link>
                        </li>
                    ))}
                    <li className="font-medium transition-all duration-150">
                        <Link
                            className={`${path === "/cart" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"} transition-colors`}
                            to="/cart"
                        >
                            <Badge
                                showZero
                                badgeContent={cart?.length || 0}
                                color="primary"
                                overlap="circular"
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                sx={{ '& .MuiBadge-badge': { backgroundColor: '#4f46e5' } }}
                            >
                                <FaShoppingCart size={20} />
                            </Badge>
                        </Link>
                    </li>
                    <li>
                        <ThemeToggle />
                    </li>
                    {user && user.id ? (
                        <li className="font-medium transition-all duration-150">
                            <UserMenu />
                        </li>
                    ) : (
                        <li className="font-medium transition-all duration-150">
                            <Link
                                className="flex items-center space-x-2 px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200 text-sm"
                                to="/login"
                            >
                                <FaSignInAlt className="text-sm" />
                                <span>Login</span>
                            </Link>
                        </li>
                    )}
                </ul>
                <button
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    className="sm:hidden flex items-center"
                >
                    {navbarOpen ? (
                        <RxCross2 className="text-slate-800 dark:text-white text-3xl" />
                    ) : (
                        <IoIosMenu className="text-slate-800 dark:text-white text-3xl" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
