import React from 'react';
import { BookOpenIcon, LoginIcon } from '../components/Icons';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80" 
          alt="Students learning" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Dr. APJ Abdul Kalam Educational Institute
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Empowering the next generation with quality education and practical skills.
            </p>
          </div>
        </div>
      </div>
      <div className="p-8 sm:p-12">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Welcome to Our Learning Platform</h2>
            <p className="mt-2 text-gray-500">Choose your path to get started.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <a 
            href="#courses" 
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#courses');
            }}
            className="group block p-8 bg-gray-50 rounded-xl hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex items-center justify-center h-16 w-16 bg-indigo-100 rounded-full mb-6 group-hover:bg-indigo-500 transition-colors duration-300">
                <BookOpenIcon className="h-8 w-8 text-indigo-500 group-hover:text-white transition-colors duration-300"/>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">Student Portal</h3>
            <p className="mt-2 text-gray-500">
              Access your courses, watch video lectures, and continue your learning journey.
            </p>
             <span className="mt-6 inline-block font-semibold text-indigo-600 group-hover:text-indigo-700">
              Go to Courses &rarr;
            </span>
          </a>
          <a 
            href="#login" 
            onClick={(e) => {
              e.preventDefault();
              onNavigate('#login');
            }}
            className="group block p-8 bg-gray-50 rounded-xl hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex items-center justify-center h-16 w-16 bg-teal-100 rounded-full mb-6 group-hover:bg-teal-500 transition-colors duration-300">
                <LoginIcon className="h-8 w-8 text-teal-500 group-hover:text-white transition-colors duration-300"/>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">Admin Login</h3>
            <p className="mt-2 text-gray-500">
              Manage courses, subjects, and other administrative tasks for the institute.
            </p>
             <span className="mt-6 inline-block font-semibold text-teal-600 group-hover:text-teal-700">
              Login as Admin &rarr;
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;