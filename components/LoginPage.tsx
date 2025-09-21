import React, { useState } from 'react';
import { useAuth } from '../context/AppProviders';
import { BookOpenIcon } from './Icons';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, showLoginView } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = login(email, password);
        if (!success) {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <BookOpenIcon className="w-16 h-16 mx-auto text-sky-600" />
                    <h1 className="mt-4 text-3xl font-bold text-slate-800">
                        Admin Login
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                       Learning Management System
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-slate-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 placeholder-slate-400 border rounded-md shadow-sm appearance-none border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-slate-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 placeholder-slate-400 border rounded-md shadow-sm appearance-none border-slate-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-sky-600 border border-transparent rounded-md group hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); showLoginView(false); }} className="text-sm font-medium text-sky-600 hover:text-sky-800">
                        &larr; Back to Course
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;