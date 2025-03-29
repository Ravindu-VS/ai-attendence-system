import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sun, Moon, Clock } from 'lucide-react';
import { HeaderProps } from '../types';

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onThemeToggle,
  onSignOut,
  searchQuery,
  onSearchChange,
  currentTime,
  currentPage
}) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-10 glassmorphism border-b border-primary/10"
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center bg-card rounded-xl p-3 w-full md:w-96">
          <Search className="h-5 w-5 text-foreground/60 mr-3" />
          <input
            type="text"
            placeholder={`Search ${currentPage}...`}
            className="bg-transparent border-none focus:outline-none w-full placeholder:text-foreground/60"
            value={searchQuery}
            onChange={onSearchChange}
          />
        </div>
        <div className="flex items-center gap-3 md:gap-6 ml-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onThemeToggle}
            className="p-2 rounded-xl bg-card hover:bg-card-hover transition-colors"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-warning animate-pulse-slow" />
            ) : (
              <Moon className="h-5 w-5 text-secondary animate-pulse-slow" />
            )}
          </motion.button>
          <div className="hidden md:flex items-center gap-4 text-foreground/80 bg-card px-4 py-2 rounded-xl">
            <Clock className="h-5 w-5" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSignOut}
            className="btn-modern"
          >
            <span>Sign Out</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};