import React from 'react';
import { useAuth } from '../context/AppProviders';

interface HeaderProps {
    courseName?: string;
    courseDescription?: string;
}

const Header: React.FC<HeaderProps> = ({ courseName, courseDescription }) => {
    const { user, logout, showLoginView } = useAuth();

    return (
        <header className="p-4 sm:p-6 border-b border-slate-200 bg-white">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                        {courseName || "Learning Management System"}
                    </h1>
                    {courseDescription && (
                         <p className="text-sm text-slate-500 mt-1">
                            {courseDescription}
                        </p>
                    )}
                </div>
                {user ? (
                    <button
                        onClick={logout}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                ) : (
                     <a href="#" onClick={(e) => { e.preventDefault(); showLoginView(true); }} className="text-sm font-medium text-sky-600 hover:text-sky-800">
                        Admin Login
                    </a>
                )}
            </div>
        </header>
    );
};

export default Header;