import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, User, Camera, RotateCw, Save, AlertCircle, Smartphone } from 'lucide-react';
import { AuthFormProps } from '../types';
import Webcam from 'react-webcam';

const REQUIRED_FRAMES = 30;
const CAPTURE_INTERVAL = 500;
const IS_DEV_MODE = import.meta.env.DEV;

interface StepProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressSteps: React.FC<StepProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center space-x-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full transition-all duration-300 ${
            index < currentStep ? 'bg-primary' : 'bg-foreground/20'
          }`}
        />
      ))}
    </div>
  );
};

export const SignupPage: React.FC<AuthFormProps> = ({
  onSubmit,
  formData,
  onInputChange,
  error,
  onToggleMode,
}) => {
  const [step, setStep] = useState(1);
  const [capturedFrames, setCapturedFrames] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [faceData, setFaceData] = useState<string[]>([]);
  const [guidanceMessage, setGuidanceMessage] = useState('Position your face in the circle');
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const captureIntervalRef = useRef<ReturnType<typeof setInterval>>();

  const guidanceMessages = [
    'Look straight at the camera',
    'Slowly turn your head to the left',
    'Slowly turn your head to the right',
    'Tilt your head up slightly',
    'Tilt your head down slightly',
    'Almost done! One final straight look',
  ];

  useEffect(() => {
    if (isCapturing) {
      const messageIndex = Math.floor((capturedFrames / REQUIRED_FRAMES) * guidanceMessages.length);
      setGuidanceMessage(guidanceMessages[messageIndex] || guidanceMessages[guidanceMessages.length - 1]);
    }
  }, [capturedFrames, isCapturing]);

  useEffect(() => {
    return () => {
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
    };
  }, []);

  const handleWebcamError = (error: string | DOMException) => {
    console.error('Webcam error:', error);
    const errorMessage = error instanceof DOMException 
      ? error.message 
      : typeof error === 'string' 
        ? error 
        : 'Unable to access camera';
    setWebcamError(`Unable to access camera: ${errorMessage}. Please ensure camera permissions are granted.`);
    setIsCapturing(false);
  };

  const startCapturing = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setWebcamError(null);
        setIsCapturing(true);
        setCapturedFrames(0);
        setFaceData([]);

        captureIntervalRef.current = setInterval(() => {
          if (webcamRef.current) {
            const frame = webcamRef.current.getScreenshot();
            if (frame) {
              setFaceData(prev => [...prev, frame]);
              setCapturedFrames(prev => {
                const newCount = prev + 1;
                if (newCount >= REQUIRED_FRAMES) {
                  stopCapturing();
                }
                return newCount;
              });
            }
          }
        }, CAPTURE_INTERVAL);
      }
    } catch (error) {
      handleWebcamError(error as string | DOMException);
    }
  };

  const stopCapturing = () => {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
    }
    setIsCapturing(false);
    setGuidanceMessage('Face data captured successfully!');
  };

  const retakeCapture = () => {
    setCapturedFrames(0);
    setFaceData([]);
    setGuidanceMessage('Position your face in the circle');
    startCapturing();
  };

  const simulateCapture = () => {
    setWebcamError(null);
    setIsCapturing(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setCapturedFrames(count);
      if (count >= REQUIRED_FRAMES) {
        clearInterval(interval);
        setIsCapturing(false);
        setGuidanceMessage('Face data captured successfully!');
      }
    }, 100);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      onSubmit(e);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/60" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={onInputChange}
                  className="w-full bg-card pl-10 pr-4 py-2 rounded-xl border border-primary/10 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Enter your name"
                />
              </div>
            </div>

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
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
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
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-primary/30">
              {webcamError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-error/10 text-error text-center p-4">
                  <div>
                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                    {webcamError}
                    {IS_DEV_MODE && (
                      <div className="mt-4">
                        <button
                          onClick={simulateCapture}
                          className="btn-modern text-sm"
                        >
                          <Smartphone className="w-4 h-4 mr-2" />
                          Simulate Camera (Dev Mode)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    onUserMediaError={handleWebcamError}
                    className="absolute top-0 left-0 w-full h-full object-cover transform scale-x-[-1]"
                  />
                  {isCapturing && <div className="scanner-line" />}
                  <svg
                    className="absolute top-0 left-0 w-full h-full -rotate-90 transform"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      className="text-primary/10"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                      r="48"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-primary transition-all duration-300"
                      strokeWidth="4"
                      strokeDasharray={300}
                      strokeDashoffset={300 - (capturedFrames / REQUIRED_FRAMES) * 300}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="48"
                      cx="50"
                      cy="50"
                    />
                  </svg>
                </>
              )}
            </div>

            {/* Guidance Message */}
            <div className="text-center text-sm text-foreground/80 bg-card p-3 rounded-xl">
              <AlertCircle className="inline-block w-4 h-4 mr-2" />
              {guidanceMessage}
            </div>

            <div className="flex justify-center space-x-4">
              {!isCapturing && capturedFrames === 0 && !webcamError && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startCapturing}
                  className="btn-modern"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Start Capture
                </motion.button>
              )}

              {capturedFrames === REQUIRED_FRAMES && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={retakeCapture}
                    className="btn-outline-modern"
                  >
                    <RotateCw className="w-5 h-5 mr-2" />
                    Retake
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="btn-modern"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save & Continue
                  </motion.button>
                </>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 text-center">
            <div className="w-24 h-24 mx-auto bg-success/20 rounded-full flex items-center justify-center">
              <Activity className="w-12 h-12 text-success" />
            </div>
            <h3 className="text-xl font-semibold">Face Data Captured Successfully!</h3>
            <p className="text-foreground/60">
              Your face data has been securely recorded. Click complete to finish the registration.
            </p>
          </div>
        );
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
          <div className="flex items-center justify-center mb-8">
            <div className="gradient-border p-3 rounded-xl">
              <Activity className="h-10 w-10 text-gradient animate-pulse-slow" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6 text-gradient">
            Create Account
          </h2>

          <ProgressSteps currentStep={step} totalSteps={4} />

          <form onSubmit={handleNext} className="space-y-6">
            {renderStep()}

            {error && <p className="text-error text-sm text-center">{error}</p>}

            {step !== 3 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-modern w-full"
              >
                {step === 4 ? 'Complete Registration' : 'Continue'}
              </motion.button>
            )}
          </form>

     