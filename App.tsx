import React from 'react';
import { AppProviders, useAuth } from './context/AppProviders';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import UserView from './components/UserView';

const AppContent: React.FC = () => {
    const { user, isLoginView } = useAuth();

    if (user?.role === 'admin') {
        return <AdminDashboard />;
    }
    
    if (isLoginView) {
        return <LoginPage />;
    }

    return <UserView />;
};

const App: React.FC = () => {
    return (
        <AppProviders>
            <div className="font-sans bg-slate-50 text-slate-900">
                <AppContent />
            </div>
        </AppProviders>
    );
};

export default App;