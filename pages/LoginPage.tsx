
import React, { useState } from 'react';
import { UserIcon, LockIcon, LoginIcon } from '../components/Icons';
import type { Program } from '../types';

interface LoginPageProps {
  programs: Program[];
  onAdminLogin: (success: boolean) => void;
  onStudentLogin: (mobile: string, password: string) => boolean;
  onStudentSignUp: (name: string, mobile: string, password: string, programId: number) => boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ programs, onAdminLogin, onStudentLogin, onStudentSignUp }) => {
  const [activeTab, setActiveTab] = useState<'student-login' | 'student-signup' | 'admin-login'>('student-login');

  // Admin State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Student Login State
  const [studentMobile, setStudentMobile] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentLoginError, setStudentLoginError] = useState('');

  // Student Sign Up State
  const [signUpName, setSignUpName] = useState('');
  const [signUpMobile, setSignUpMobile] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpProgramId, setSignUpProgramId] = useState<number>(programs[0]?.id || 0);
  const [signUpError, setSignUpError] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    if (adminEmail === 'admin@gmail.com' && adminPassword === 'admin@123') {
      onAdminLogin(true);
    } else {
      setAdminError('Invalid email or password.');
      onAdminLogin(false);
    }
  };

  const handleStudentLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentLoginError('');
    const success = onStudentLogin(studentMobile, studentPassword);
    if (!success) {
      setStudentLoginError('Invalid mobile number or password, or account is inactive.');
    }
  };

  const handleStudentSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');
    if (!signUpName.trim()) {
        setSignUpError('Please enter your full name.');
        return;
    }
    if (signUpMobile.length !== 10 || !/^\d+$/.test(signUpMobile)) {
        setSignUpError('Mobile number must be exactly 10 digits.');
        return;
    }
    if (signUpPassword.length < 6) {
        setSignUpError('Password must be at least 6 characters long.');
        return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
        setSignUpError('Passwords do not match.');
        return;
    }
     if (signUpProgramId === 0) {
        setSignUpError('Please select a course.');
        return;
    }
    const success = onStudentSignUp(signUpName, signUpMobile, signUpPassword, signUpProgramId);
    if (!success) {
        setSignUpError('A user with this mobile number already exists.');
    }
  };

  const TabButton: React.FC<{ tabName: typeof activeTab; label: string }> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`w-full py-2.5 text-sm font-medium leading-5 rounded-lg
        ${activeTab === tabName
          ? 'bg-white shadow text-indigo-700'
          : 'text-gray-500 hover:bg-white/[0.5] hover:text-gray-800'
        }
        focus:outline-none focus:ring-2 ring-offset-2 ring-offset-indigo-400 ring-white ring-opacity-60 transition`}
    >
      {label}
    </button>
  );
  
  const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input {...props} className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
  );
  
  const FormSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
     <select {...props} className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        {props.children}
     </select>
  );

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="w-full max-w-md">
          <div className="flex space-x-1 rounded-xl bg-indigo-100 p-1 mb-6">
            <TabButton tabName="student-login" label="Student Login" />
            <TabButton tabName="student-signup" label="Student Sign Up" />
            <TabButton tabName="admin-login" label="Admin Login" />
          </div>
          
          {activeTab === 'student-login' && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Student Login</h2>
                <p className="mt-2 text-gray-500">Access your courses.</p>
              </div>
              <form className="space-y-6" onSubmit={handleStudentLoginSubmit}>
                <FormInput type="tel" value={studentMobile} onChange={e => setStudentMobile(e.target.value)} required placeholder="10-digit Mobile Number" />
                <FormInput type="password" value={studentPassword} onChange={e => setStudentPassword(e.target.value)} required placeholder="Password" />
                {studentLoginError && <p className="text-sm text-red-600 text-center">{studentLoginError}</p>}
                <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Sign in</button>
              </form>
            </div>
          )}

          {activeTab === 'student-signup' && (
             <div>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Create Student Account</h2>
                 <p className="mt-2 text-gray-500">Join our learning community.</p>
              </div>
              <form className="space-y-4" onSubmit={handleStudentSignUpSubmit}>
                <FormInput type="text" value={signUpName} onChange={e => setSignUpName(e.target.value)} required placeholder="Full Name" />
                <FormInput type="tel" value={signUpMobile} onChange={e => setSignUpMobile(e.target.value)} required placeholder="10-digit Mobile Number" />
                <FormSelect value={signUpProgramId} onChange={e => setSignUpProgramId(Number(e.target.value))} required>
                    <option value={0} disabled>Select a Course</option>
                    {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </FormSelect>
                <FormInput type="password" value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} required placeholder="Password (min. 6 characters)" />
                <FormInput type="password" value={signUpConfirmPassword} onChange={e => setSignUpConfirmPassword(e.target.value)} required placeholder="Confirm Password" />
                {signUpError && <p className="text-sm text-red-600 text-center">{signUpError}</p>}
                <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors !mt-6">Sign Up</button>
              </form>
            </div>
          )}
          
          {activeTab === 'admin-login' && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Administrator Login</h2>
                <p className="mt-2 text-gray-500">Access the admin panel.</p>
              </div>
              <form className="space-y-6" onSubmit={handleAdminSubmit}>
                <FormInput type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} required placeholder="Email (admin@gmail.com)" />
                <FormInput type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required placeholder="Password (admin@123)" />
                {adminError && <p className="text-sm text-red-600 text-center">{adminError}</p>}
                <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Sign in</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;