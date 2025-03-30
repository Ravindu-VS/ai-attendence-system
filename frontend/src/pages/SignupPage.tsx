import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, User, Calendar, Activity } from 'lucide-react';
import '../styles/SignupPage.css'; // Correct relative path to the CSS file

interface SignupFormData {
  name: string;
  registrationNumber: string;
  intake: string;
  stream: string;
  address: string;
  contactNumber: string;
  dob: string;
  video: File | null;
}

export const SignupPage = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    registrationNumber: '',
    intake: '',
    stream: '',
    address: '',
    contactNumber: '',
    dob: '',
    video: null,
  });

  const [step, setStep] = useState(1); // Track the current step
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [instructions, setInstructions] = useState('Please move your head around to capture all angles.');
  const [capturedVideo, setCapturedVideo] = useState<Blob | null>(null);
  const [progress, setProgress] = useState(0);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [showCaptureButton, setShowCaptureButton] = useState(true);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsRecording(true);
        setShowCaptureButton(false); // Hide the capture button after starting the camera
        setInstructions('Please move your head around to capture all angles.');
        captureFaceData(); // Start capturing face data after camera is active
      } catch (error) {
        console.error('Error accessing webcam:', error);
        alert('Unable to access camera');
      }
    }
  };

  const captureFaceData = () => {
    let counter = 0;
    const interval = setInterval(() => {
      if (counter < 100) {
        setProgress(counter);
        counter += 1;
      } else {
        setIsFaceDetected(true);
        clearInterval(interval);
        setInstructions('Face data captured! You can save or retake.');
        setIsRecording(false);
      }
    }, 100); // Update every 100ms to simulate capture
  };

  const handleCaptureVideo = () => {
    setInstructions('Video captured successfully! You can either save or retake the video.');
    setCapturedVideo(new Blob());
    setIsRecording(false);
  };

  const handleRetakeVideo = () => {
    setIsRecording(true);
    setInstructions('Please move your head around to capture all angles.');
    setCapturedVideo(null);
    setProgress(0); // Reset progress bar
    setIsFaceDetected(false);
    setShowCaptureButton(true);
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('registrationNumber', formData.registrationNumber);
    formDataToSend.append('intake', formData.intake);
    formDataToSend.append('stream', formData.stream);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('contactNumber', formData.contactNumber);
    formDataToSend.append('dob', formData.dob);
    if (capturedVideo) formDataToSend.append('video', capturedVideo);

    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: formDataToSend,
    });

    if (response.ok) {
      alert('User registered successfully');
    } else {
      setSignupError('Error during sign-up');
    }
  };

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
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="gradient-border p-3 rounded-xl">
              <Activity className="h-10 w-10 text-gradient animate-pulse-slow" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6 text-gradient">Create Account</h2>

          {/* Step-by-step forms */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <div>
                <label className="text-sm font-medium text-foreground/80">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-card pl-4 pr-4 py-2 rounded-xl"
                  placeholder="Enter your name"
                />
                <label className="text-sm font-medium text-foreground/80">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full bg-card pl-4 pr-4 py-2 rounded-xl"
                  placeholder="Enter Registration Number"
                />
                <button onClick={handleNextStep} className="btn-glow w-full mt-4">
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="text-sm font-medium text-foreground/80">Intake</label>
                <input
                  type="text"
                  name="intake"
                  value={formData.intake}
                  onChange={handleInputChange}
                  className="w-full bg-card pl-4 pr-4 py-2 rounded-xl"
                  placeholder="Enter Intake"
                />
                <label className="text-sm font-medium text-foreground/80">Stream</label>
                <input
                  type="text"
                  name="stream"
                  value={formData.stream}
                  onChange={handleInputChange}
                  className="w-full bg-card pl-4 pr-4 py-2 rounded-xl"
                  placeholder="Enter Stream"
                />
                <label className="text-sm font-medium text-foreground/80">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-card pl-4 pr-4 py-2 rounded-xl"
                  placeholder="Enter Address"
                />
                <button onClick={handleNextStep} className="btn-glow w-full mt-4">
                  Next
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <label className="text-sm font-medium text-foreground/80">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full bg-card pl-4 pr-4 py-2 rounded-xl"
                  placeholder="Enter Contact Number"
                />
                <label className="text-sm font-medium text-foreground/80">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full bg-card pl-4 pr-4 py-2 rounded-xl"
                />
                <button onClick={handleNextStep} className="btn-glow w-full mt-4">
                  Next
                </button>
              </div>
            )}

            {step === 4 && (
              <div>
                 {/* Circular Video */}
            <div className="circular-video-container mb-4">
              <video ref={videoRef} className="circular-video" autoPlay muted />
            </div>

                <p className="text-center text-foreground/80 mt-2">{instructions}</p>

                {/* Capture Button */}
                {showCaptureButton && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartCamera}
                    className="btn-glow w-full mt-4"
                  >
                    <Camera className="h-5 w-5 text-foreground mr-2" />
                    Capture 360 Degree View
                  </motion.button>
                )}

                {capturedVideo && (
                  <>
                    <motion.button onClick={handleRetakeVideo} className="btn-glow w-full mt-4">
                      Retake Video
                    </motion.button>
                    <motion.button onClick={handleSubmit} className="btn-glow w-full mt-4">
                      Create Account
                    </motion.button>
                  </>
                )}
              </div>
            )}
          </form>

          {/* Error message */}
          {signupError && <p className="text-error text-sm text-center">{signupError}</p>}

          {/* Toggle to login */}
          <p className="mt-4 text-center text-sm text-foreground/60">
            Already have an account?{' '}
            <span onClick={() => console.log('Switch to login mode')} className="text-primary hover:text-primary/80 transition-colors">
              Sign In
            </span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
