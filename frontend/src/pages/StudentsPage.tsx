import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Camera, Trash2 } from 'lucide-react';
import Webcam from 'react-webcam';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  faceData?: string;
}

export const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNumber: '',
    class: ''
  });

  const handleCapture = (studentId: string) => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setStudents(students.map(student => 
        student.id === studentId 
          ? { ...student, faceData: imageSrc }
          : student
      ));
      setShowCamera(false);
      setSelectedStudent(null);
    }
  };

  const webcamRef = React.useRef<Webcam>(null);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student: Student = {
      id: Date.now().toString(),
      ...newStudent
    };
    setStudents([...students, student]);
    setNewStudent({ name: '', rollNumber: '', class: '' });
    setShowAddForm(false);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative flex-1 w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/60" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-card border border-primary/10"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
          className="btn-modern"
        >
          <span className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Student
          </span>
        </motion.button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glassmorphism p-6 rounded-2xl"
        >
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Student Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-card border border-primary/10"
                required
              />
              <input
                type="text"
                placeholder="Roll Number"
                value={newStudent.rollNumber}
                onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-card border border-primary/10"
                required
              />
              <input
                type="text"
                placeholder="Class"
                value={newStudent.class}
                onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-card border border-primary/10"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-outline-modern"
              >
                Cancel
              </button>
              <button type="submit" className="btn-modern">
                <span>Add Student</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glassmorphism p-6 rounded-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{student.name}</h3>
                <p className="text-foreground/60">Roll No: {student.rollNumber}</p>
                <p className="text-foreground/60">Class: {student.class}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedStudent(student);
                  setShowCamera(true);
                }}
                className="btn-glow"
              >
                <Camera className="h-5 w-5" />
              </button>
            </div>
            {student.faceData && (
              <div className="relative">
                <img
                  src={student.faceData}
                  alt={`${student.name}'s face data`}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  onClick={() => setStudents(students.filter(s => s.id !== student.id))}
                  className="absolute top-2 right-2 p-2 rounded-full bg-error/90 hover:bg-error"
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {showCamera && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glassmorphism p-6 rounded-2xl w-full max-w-2xl"
          >
            <h3 className="text-xl font-semibold mb-4">Capture Face Data</h3>
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => {
                  setShowCamera(false);
                  setSelectedStudent(null);
                }}
                className="btn-outline-modern"
              >
                Cancel
              </button>
              <button
                onClick={() => selectedStudent && handleCapture(selectedStudent.id)}
                className="btn-modern"
              >
                <span>Capture</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};