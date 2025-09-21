
import React, { useState } from 'react';
import { UserIcon, LockIcon, PhoneIcon, IdentificationIcon, BookOpenIcon } from '../components/Icons';
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
  
  // Student Login State
  const [studentMobile, setStudentMobile] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  
  // Student Sign Up State
  const [signUpName, setSignUpName] = useState('');
  const [signUpMobile, setSignUpMobile] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpProgramId, setSignUpProgramId] = useState(programs.length > 0 ? programs[0].id : 0);

  const [error, setError] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (adminEmail === 'admin@gmail.com' && adminPassword === 'admin@123') {
      onAdminLogin(true);
    } else {
      setError('Invalid admin credentials.');
      onAdminLogin(false);
    }
  };
  
  const handleStudentLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onStudentLogin(studentMobile, studentPassword);
    if (!success) {
      setError('Invalid mobile or password, or account is inactive.');
    }
  };
  
  const handleStudentSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (signUpMobile.length !== 10 || !/^\d+$/.test(signUpMobile)) {
        setError("Mobile number must be 10 digits.");
        return;
    }
    if (signUpPassword.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
     if (!signUpName.trim()) {
        setError("Please enter your full name.");
        return;
    }
    const success = onStudentSignUp(signUpName, signUpMobile, signUpPassword, signUpProgramId);
    if (!success) {
      setError('A student with this mobile number already exists.');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'student-login':
        return (
          <form onSubmit={handleStudentLoginSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Student Login</h2>
            <div>
              <label htmlFor="student-mobile" className="sr-only">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input id="student-mobile" name="mobile" type="tel" value={studentMobile} onChange={e => setStudentMobile(e.target.value)} required className="input-field pl-10" placeholder="10-digit Mobile Number" />
              </div>
            </div>
            <div>
              <label htmlFor="student-password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input id="student-password" name="password" type="password" value={studentPassword} onChange={e => setStudentPassword(e.target.value)} required className="input-field pl-10" placeholder="Password" />
              </div>
            </div>
            <button type="submit" className="w-full btn btn-indigo">Sign In</button>
          </form>
        );
      case 'student-signup':
        return (
          <form onSubmit={handleStudentSignUpSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Create Student Account</h2>
            <div>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><IdentificationIcon className="h-5 w-5 text-gray-400" /></div>
                 <input type="text" value={signUpName} onChange={e => setSignUpName(e.target.value)} required className="input-field pl-10" placeholder="Full Name"/>
              </div>
            </div>
            <div>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><PhoneIcon className="h-5 w-5 text-gray-400" /></div>
                 <input type="tel" value={signUpMobile} onChange={e => setSignUpMobile(e.target.value)} required className="input-field pl-10" placeholder="10-digit Mobile Number"/>
              </div>
            </div>
             <div>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><BookOpenIcon className="h-5 w-5 text-gray-400" /></div>
                 <select value={signUpProgramId} onChange={e => setSignUpProgramId(Number(e.target.value))} required className="input-field pl-10 appearance-none">
                    {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                 </select>
              </div>
            </div>
            <div>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><LockIcon className="h-5 w-5 text-gray-400" /></div>
                 <input type="password" value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} required className="input-field pl-10" placeholder="Password (min. 6 characters)"/>
              </div>
            </div>
            <button type="submit" className="w-full btn btn-indigo">Sign Up</button>
          </form>
        );
      case 'admin-login':
        return (
          <form onSubmit={handleAdminSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
            <div>
              <label htmlFor="admin-email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input id="admin-email" name="email" type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} autoComplete="email" required className="input-field pl-10" placeholder="Email address" />
              </div>
            </div>
            <div>
              <label htmlFor="admin-password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input id="admin-password" name="password" type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} autoComplete="current-password" required className="input-field pl-10" placeholder="Password" />
              </div>
            </div>
            <button type="submit" className="w-full btn btn-indigo">Sign In</button>
          </form>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="mb-6 border-b border-gray-200">
             <nav className="-mb-px flex space-x-4 justify-center" aria-label="Tabs">
                <button onClick={() => { setActiveTab('student-login'); setError(''); }} className={`tab-button ${activeTab === 'student-login' ? 'tab-active' : ''}`}>Student Login</button>
                <button onClick={() => { setActiveTab('student-signup'); setError(''); }} className={`tab-button ${activeTab === 'student-signup' ? 'tab-active' : ''}`}>Sign Up</button>
                <button onClick={() => { setActiveTab('admin-login'); setError(''); }} className={`tab-button ${activeTab === 'admin-login' ? 'tab-active' : ''}`}>Admin</button>
             </nav>
          </div>
          {error && <p className="mb-4 text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
          {renderTabContent()}
        </div>
      </div>
       <style>{`
          .input-field { @apply appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm; }
          .btn { @apply group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white; }
          .btn-indigo { @apply bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500; }
          .tab-button { @apply whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none; }
          .tab-active { @apply border-indigo-500 text-indigo-600; }
      `}</style>
    </div>
  );
};

export default LoginPage;
