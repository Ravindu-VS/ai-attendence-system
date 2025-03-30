import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, CheckCircle, XCircle, Camera } from 'lucide-react';
import Webcam from 'react-webcam';

export const AttendancePage: React.FC = () => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognizedStudents, setRecognizedStudents] = useState<string[]>([]);
  const webcamRef = React.useRef<Webcam>(null);
  const [currentDate] = useState(new Date());

  const startRecognition = () => {
    setIsRecognizing(true);
    // Simulate face recognition with random detections
    const recognitionInterval = setInterval(() => {
      const mockStudents = ['John Doe', 'Jane Smith', 'Alex Johnson'];
      const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)];
      if (!recognizedStudents.includes(randomStudent)) {
        setRecognizedStudents(prev => [...prev, randomStudent]);
      }
    }, 3000);

    // Stop after 15 seconds
    setTimeout(() => {
      clearInterval(recognitionInterval);
      setIsRecognizing(false);
    }, 15000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism p-6 rounded-2xl col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Live Recognition</h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={startRecognition}
              disabled={isRecognizing}
              className={`btn-modern ${isRecognizing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                {isRecognizing ? 'Recognizing...' : 'Start Recognition'}
              </span>
            </motion.button>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden cyber-grid">
            {isRecognizing ? (
              <Webcam
                ref={webcamRef}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-foreground/60">Camera feed will appear here</p>
              </div>
            )}
            {isRecognizing && <div className="scanner-line" />}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">
              {currentDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-card rounded-xl">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-secondary" />
                <span>Total Students</span>
              </div>
              <span className="font-semibold">50</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Present</span>
              </div>
              <span className="font-semibold">{recognizedStudents.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-xl">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-error" />
                <span>Absent</span>
              </div>
              <span className="font-semibold">{50 - recognizedStudents.length}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism p-6 rounded-2xl"
      >
        <h3 className="text-xl font-semibold mb-4">Recognition Log</h3>
        <div className="space-y-3">
          {recognizedStudents.map((student, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-card rounded-xl"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>{student}</span>
              </div>
              <span className="text-foreground/60">
                {new Date().toLocaleTimeString()}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};