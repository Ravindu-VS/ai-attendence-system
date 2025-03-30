import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { StudentsPage } from './pages/StudentsPage';
import { AttendancePage } from './pages/AttendancePage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { Sidebar } from './components/Sidebar';
import './styles/theme.css';
import './styles/animations.css';
import './styles/buttons.css';
import './styles/layout.css';
import './styles/components.css';

// Example users for demo
const DEMO_USERS = [
  { email: 'admin@example.com', password: 'admin123', name: 'Admin User' },
  { email: 'teacher@example.com', password: 'teacher123', name: 'Teacher Demo' }
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authError, setAuthError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    faceData: [] as string[]
  });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'login') {
      const user = DEMO_USERS.find(u => 
        u.email === formData.email && u.password === formData.password
      );
      
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setAuthError('Invalid credentials');
      }
    } else {
      try {
        // In a real application, you would send the face data to the server here
        // for processing and storage
        console.log('Face data frames captured:', formData.faceData.length);
        
        setIsAuthenticated(true);
        const newUser = {
          email: formData.email,
          name: formData.name,
          password: formData.password,
          // Store a reference or hash of the face data
          hasFaceData: true
        };
        localStorage.setItem('user', JSON.stringify(newUser));
      } catch (error) {
        setAuthError('Error during registration. Please try again.');
        console.error('Registration error:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFaceDataCapture = (faceDataFrames: string[]) => {
    setFormData(prev => ({
      ...prev,
      faceData: faceDataFrames
    }));
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    setCurrentPage('dashboard');
    setFormData({
      email: '',
      password: '',
      name: '',
      faceData: []
    });
  };

  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <LoginPage
        onSubmit={handleAuth}
        formData={formData}
        onInputChange={handleInputChange}
        error={authError}
        onToggleMode={setAuthMode}
      />
    ) : (
      <SignupPage
        onSubmit={handleAuth}
        formData={formData}
        onInputChange={handleInputChange}
        error={authError}
        onToggleMode={setAuthMode}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            isDarkMode={isDarkMode}
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            onSignOut={handleSignOut}
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            currentTime={currentTime}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        );
      case 'students':
        return <StudentsPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;