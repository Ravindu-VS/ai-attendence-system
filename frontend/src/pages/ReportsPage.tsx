import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Calendar, 
  Download, 
  ChevronDown,
  Users,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('March 2024');
  const [selectedClass, setSelectedClass] = useState('All Classes');

  const mockData = {
    totalStudents: 150,
    averageAttendance: 85,
    topPerformers: [
      { name: 'Class 10A', attendance: 95 },
      { name: 'Class 11B', attendance: 92 },
      { name: 'Class 9C', attendance: 90 }
    ],
    dailyStats: [
      { date: '2024-03-01', present: 142, absent: 8 },
      { date: '2024-03-02', present: 138, absent: 12 },
      { date: '2024-03-03', present: 145, absent: 5 }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Attendance Reports</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none bg-card px-4 py-2 pr-10 rounded-xl border border-primary/10 focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
            >
              <option>March 2024</option>
              <option>February 2024</option>
              <option>January 2024</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
          </div>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-card px-4 py-2 pr-10 rounded-xl border border-primary/10 focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
            >
              <option>All Classes</option>
              <option>Class 10A</option>
              <option>Class 11B</option>
              <option>Class 9C</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-modern"
          >
            <span className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Report
            </span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Total Students</h3>
          </div>
          <p className="text-3xl font-bold">{mockData.totalStudents}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart className="h-6 w-6 text-secondary" />
            <h3 className="text-lg font-semibold">Average Attendance</h3>
          </div>
          <p className="text-3xl font-bold">{mockData.averageAttendance}%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-accent" />
            <h3 className="text-lg font-semibold">Working Days</h3>
          </div>
          <p className="text-3xl font-bold">22</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <h3 className="text-xl font-semibold mb-4">Top Performing Classes</h3>
          <div className="space-y-4">
            {mockData.topPerformers.map((performer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-card rounded-xl"
              >
                <span>{performer.name}</span>
                <span className="font-semibold text-success">{performer.attendance}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <h3 className="text-xl font-semibold mb-4">Daily Statistics</h3>
          <div className="space-y-4">
            {mockData.dailyStats.map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-card rounded-xl space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span>{new Date(stat.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>{stat.present} Present</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-error" />
                    <span>{stat.absent} Absent</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};