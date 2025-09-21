
import React from 'react';
import { HomeIcon, BookOpenIcon, LoginIcon, LogoutIcon, DashboardIcon, UserIcon } from './Icons';
import type { Student } from '../types';

type CurrentUser = {
  role: 'student' | 'admin' | 'guest';
  user?: Student | { id: string; email: string };
};

interface NavbarProps {
  currentUser: CurrentUser;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogout, onNavigate }) => {
  const NavLink = ({ href, icon, text }: { href: string; icon: JSX.Element; text: string }) => (
    <a 
      href={href} 
      onClick={(e) => {
        e.preventDefault();
        onNavigate(href);
      }}
      className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-indigo-50"
    >
      {icon}
      <span className="font-medium">{text}</span>
    </a>
  );
  
  const getStudentFirstName = () => {
    if (currentUser.role === 'student' && currentUser.user) {
      const student = currentUser.user as Student;
      return student.name.split(' ')[0];
    }
    return '';
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#home');
              }}
              className="flex items-center space-x-2"
            >
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A._P._J._Abdul_Kalam.jpg/440px-A._P._J._Abdul_Kalam.jpg" alt="Logo" className="h-10 w-10 rounded-full object-cover"/>
               <span className="font-bold text-lg text-gray-800 hidden sm:block">Dr. APJ Abdul Kalam EI</span>
            </a>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NavLink href="#home" icon={<HomeIcon className="h-5 w-5" />} text="Home" />
            <NavLink href="#courses" icon={<BookOpenIcon className="h-5 w-5" />} text="Courses" />
            
            {currentUser.role === 'guest' && (
              <NavLink href="#login" icon={<LoginIcon className="h-5 w-5" />} text="Login / Sign Up" />
            )}
            
            {currentUser.role === 'admin' && (
              <NavLink href="#admin" icon={<DashboardIcon className="h-5 w-5" />} text="Admin Panel" />
            )}
            
            {currentUser.role === 'student' && (
               <div className="flex items-center space-x-2 text-gray-700 font-medium px-3 py-2">
                  <UserIcon className="h-5 w-5 text-indigo-500" />
                  <span>Welcome, {getStudentFirstName()}</span>
                </div>
            )}

            {currentUser.role !== 'guest' && (
               <button onClick={onLogout} className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-red-50">
                  <LogoutIcon className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;