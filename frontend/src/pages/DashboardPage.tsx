import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCheck, 
  UserX, 
  BarChart3, 
  AlertCircle,
  Camera
} from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { DashboardProps } from '../types';

export const DashboardPage: React.FC<DashboardProps> = ({
  isDarkMode,
  onThemeToggle,
  onSignOut,
  searchQuery,
  onSearchChange,
  currentTime
}) => {
  const stats = [
    { icon: UserCheck, label: 'Present', value: '42', color: 'success' },
    { icon: UserX, label: 'Absent', value: '8', color: 'error' },
    { icon: BarChart3, label: 'Attendance Rate', value: '84%', color: 'primary' },
    { icon: AlertCircle, label: 'Alerts', value: '3', color: 'warning' }
  ];

  const [isCameraOn, setIsCameraOn] = useState(false);

  const handleStartRecognition = () => {
    setIsCameraOn(true);  // Start camera and face recognition
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="flex">

        <div className="flex-1">
          <Header
            isDarkMode={isDarkMode}
            onThemeToggle={onThemeToggle}
            onSignOut={onSignOut}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            currentTime={currentTime} currentPage={''} onPageChange={function (page: string): void {
              throw new Error('Function not implemented.');
            }} 
          />

          <main className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glassmorphism p-6 rounded-2xl"
                    >
                      <div className={`flex items-center justify-between`}>
                        <div>
                          <p className="text-foreground/60 text-sm">{stat.label}</p>
                          <h3 className={`text-3xl font-bold mt-2 text-${stat.color}`}>
                            {stat.value}
                          </h3>
                        </div>
                        <div className={`p-3 rounded-xl bg-${stat.color}/10`}>
                          <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glassmorphism rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Live Camera Feed</h2>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-glow"
                      onClick={handleStartRecognition}
                    >
                      <span>Start Recognition</span>
                    </motion.button>
                  </div>

                  {/* Camera Feed */}
                  <div className="relative aspect-video rounded-xl overflow-hidden cyber-grid">
                    {isCameraOn ? (
                      <iframe
                        src="http://localhost:5000/video_feed"  // Use your backend's camera feed URL
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        title="Camera Feed"
                      ></iframe>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-foreground/60">Camera feed will appear here</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};
