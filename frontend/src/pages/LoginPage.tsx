import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock } from 'lucide-react';
import { AuthFormProps } from '../types';

export const LoginPage: React.FC<AuthFormProps> = ({ 
  onSubmit, 
  formData, 
  onInputChange, 
  error, 
  onToggleMode 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center bg-background"
    >
      <div className="w-full max-w-md">
        <motion.div
          className="glassmorphism p-8 rounded-2xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="gradient-border p-3 rounded-xl">
              <Activity className="h-10 w-10 text-gradient animate-pulse-slow" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-gradient">
            Welcome Back
          </h2>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/60" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={onInputChange}
                  className="w-full bg-card pl-10 pr-4 py-2 rounded-xl border border-primary/10 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/60" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={onInputChange}
                  className="w-full bg-card pl-10 pr-4 py-2 rounded-xl border border-primary/10 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <p className="text-error text-sm text-center">{error}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-modern w-full"
            >
              <span>Sign In</span>
            </motion.button>
          </form>

          <p className="mt-4 text-center text-sm text-foreground/60">
            Don't have an account?
            <button
              onClick={() => onToggleMode('signup')}
              className="ml-1 text-primary hover:text-primary/80 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};