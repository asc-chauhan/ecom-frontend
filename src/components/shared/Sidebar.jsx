import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaArrowLeft } from 'react-icons/fa';
import { adminNavigation } from '../../utils';
import classNames from 'classnames';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
    const pathName = useLocation().pathname;
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex grow flex-col gap-y-6 overflow-y-auto bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 px-5 pb-4">
            {/* Logo */}
            <div className="flex h-16 items-center gap-x-3 pt-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2 bg-indigo-600 rounded-lg">
                    <FaTachometerAlt className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-slate-800 dark:text-white text-lg font-bold tracking-tight">
                    Admin
                </h1>
            </div>

            {/* Back to Store */}
            <div className="flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-800"
                >
                    <FaArrowLeft className="text-xs" />
                    Back to Store
                </Link>
                <ThemeToggle />
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-2">
                    <li>
                        <ul role="list" className="space-y-1">
                            {adminNavigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.href}
                                        className={classNames(
                                            pathName === item.href
                                                ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border-transparent",
                                            "group flex gap-x-3 rounded-xl p-3 text-sm font-medium leading-6 transition-all duration-150 border"
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                pathName === item.href
                                                    ? "text-indigo-600"
                                                    : "text-slate-400 group-hover:text-slate-600",
                                                "text-lg transition-colors"
                                            )}
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* User Info at Bottom */}
                    <li className="mt-auto pb-2">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                <span className="text-white text-sm font-bold">
                                    {user?.username?.charAt(0)?.toUpperCase() || 'A'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                                    {user?.username || 'Admin'}
                                </p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                                    Administrator
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
