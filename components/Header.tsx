
import React from 'react';
import { ChevronDownIcon } from './Icons';
import type { Course } from '../types';

interface HeaderProps {
    courses: Course[];
    selectedCourseIndex: number;
    onCourseChange: (index: number) => void;
}

const Header: React.FC<HeaderProps> = ({ courses, selectedCourseIndex, onCourseChange }) => {
  return (
    <header className="p-4 sm:p-6 border-b border-slate-200">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
        Diploma in homeopathic pharmacy
      </h1>
      <div className="mt-4">
        <label htmlFor="course-select" className="block text-sm font-medium text-slate-700 mb-1">
          Select Subject
        </label>
        <div className="relative">
          <select
            id="course-select"
            value={selectedCourseIndex}
            onChange={(e) => onCourseChange(parseInt(e.target.value, 10))}
            className="w-full appearance-none bg-white border border-slate-300 rounded-md py-2 pl-3 pr-10 text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            {courses.map((course, index) => (
              <option key={course.id} value={index}>
                {course.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
