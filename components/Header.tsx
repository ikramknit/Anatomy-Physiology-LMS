import React from 'react';
import { ChevronDownIcon } from './Icons';
import type { Program } from '../types';

interface HeaderProps {
  programs: Program[];
  selectedProgramIndex: number;
  selectedYearIndex: number;
  selectedSubjectIndex: number;
  onProgramChange: (index: number) => void;
  onYearChange: (index: number) => void;
  onSubjectChange: (index: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  programs,
  selectedProgramIndex,
  selectedYearIndex,
  selectedSubjectIndex,
  onProgramChange,
  onYearChange,
  onSubjectChange,
}) => {
  const selectedProgram = programs[selectedProgramIndex];
  const years = selectedProgram?.years || [];
  const selectedYear = years[selectedYearIndex];
  const subjects = selectedYear?.subjects || [];

  const Dropdown = ({ label, value, onChange, disabled, children, id }: { label: string, value: number, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, disabled: boolean, children: React.ReactNode, id: string }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2.5 pl-3 pr-10 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A._P._J._Abdul_Kalam.jpg/440px-A._P._J._Abdul_Kalam.jpg" 
              alt="Dr. APJ Abdul Kalam" 
              className="h-16 w-16 rounded-full object-cover shadow-md"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dr. APJ Abdul Kalam</h1>
              <p className="text-sm text-gray-500">Educational Institute</p>
            </div>
          </div>
        </div>
        <div className="py-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dropdown
              id="program-select"
              label="Select Course"
              value={selectedProgramIndex}
              onChange={(e) => onProgramChange(parseInt(e.target.value, 10))}
              disabled={programs.length === 0}
            >
              {programs.map((program, index) => (
                <option key={program.id} value={index}>
                  {program.name}
                </option>
              ))}
            </Dropdown>

            <Dropdown
              id="year-select"
              label="Select Year"
              value={selectedYearIndex}
              onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
              disabled={years.length === 0}
            >
              {years.length > 0 ? (
                years.map((year, index) => (
                  <option key={year.id} value={index}>
                    Year {year.year}
                  </option>
                ))
              ) : (
                <option>No years available</option>
              )}
            </Dropdown>

            <Dropdown
              id="subject-select"
              label="Select Subject"
              value={selectedSubjectIndex}
              onChange={(e) => onSubjectChange(parseInt(e.target.value, 10))}
              disabled={subjects.length === 0}
            >
              {subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <option key={subject.id} value={index}>
                    {subject.name}
                  </option>
                ))
              ) : (
                <option>No subjects available</option>
              )}
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
