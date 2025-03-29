import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Mail, 
  Shield, 
  Camera,
  Save,
  RefreshCw
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    cameraResolution: '720p',
    recognitionThreshold: 0.8,
    autoSave: true,
    darkMode: true
  });

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism p-6 rounded-2xl"
      >
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-card rounded-xl">
                <span>Push Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-card rounded-xl">
                <span>Email Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Camera className="h-5 w-5 text-secondary" />
              Camera Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-xl">
                <label className="block text-sm mb-2">Camera Resolution</label>
                <select
                  value={settings.cameraResolution}
                  onChange={(e) => handleSettingChange('cameraResolution', e.target.value)}
                  className="w-full bg-muted px-3 py-2 rounded-lg"
                >
                  <option value="480p">480p</option>
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                </select>
              </div>
              <div className="p-4 bg-card rounded-xl">
                <label className="block text-sm mb-2">Recognition Threshold</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.recognitionThreshold}
                  onChange={(e) => handleSettingChange('recognitionThreshold', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              Security
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-card rounded-xl">
                <span>Auto-Save Data</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-outline-modern flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Reset Settings
              </motion.button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-modern"
          >
            <span className="flex items-center gap-2">
              <Save className="h-5 w-5" />
              Save Changes
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};