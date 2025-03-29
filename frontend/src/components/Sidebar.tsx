import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity,
  Users, 
  Camera, 
  Calendar, 
  FileText, 
  Settings,
  Menu,
  X 
} from 'lucide-react';
import '../styles/components.css';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Users, label: 'Dashboard', id: 'dashboard' },
    { icon: Camera, label: 'Face Recognition', id: 'recognition' },
    { icon: Calendar, label: 'Attendance Log', id: 'attendance' },
    { icon: FileText, label: 'Reports', id: 'reports' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-card"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <motion.div
        className={`sidebar-wrapper ${isMobileMenuOpen ? 'open' : ''}`}
        initial={false}
      >
        <div className="sidebar">
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="gradient-border">
                <div className="p-2 rounded-lg">
                  <Activity className="h-8 w-8 text-gradient animate-pulse-slow" />
                </div>
              </div>
              <span className="text-2xl font-bold text-gradient animate-glow">AttendAI</span>
            </motion.div>

            <nav className="space-y-3">
              {navItems.map((item) => (
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`nav-item w-full ${currentPage === item.id ? 'active' : ''}`}
                >
                  <item.icon className={`h-5 w-5 ${currentPage === item.id ? 'text-gradient' : ''}`} />
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>
      </motion.div>
    </>
  );
};