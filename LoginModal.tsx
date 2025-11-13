
import React, { useState } from 'react';
import { XIcon } from './icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (mobile: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [step, setStep] = useState(1); // 1 for mobile, 2 for OTP
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length === 10 && /^\d+$/.test(mobile)) {
      setError('');
      setStep(2);
      // In a real app, an OTP would be sent here.
    } else {
      setError('Please enter a valid 10-digit mobile number.');
    }
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock OTP validation: any 4-digit OTP is accepted.
    if (otp.length === 4 && /^\d+$/.test(otp)) {
      setError('');
      onLogin(mobile);
      resetState();
    } else {
      setError('Please enter a valid 4-digit OTP.');
    }
  };

  const resetState = () => {
    setMobile('');
    setOtp('');
    setStep(1);
    setError('');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800">
          <XIcon className="h-6 w-6" />
        </button>
        {step === 1 ? (
          <div>
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Login</h2>
            <p className="text-center text-slate-500 mb-6">Enter your mobile number to continue.</p>
            <form onSubmit={handleMobileSubmit}>
              <div className="mb-4">
                <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 sr-only">Mobile Number</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">+91</span>
                    <input
                      type="tel"
                      id="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      placeholder="9876543210"
                      maxLength={10}
                    />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition-colors">
                Get OTP
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Verify OTP</h2>
            <p className="text-center text-slate-500 mb-6">Enter the 4-digit OTP sent to +91 {mobile}.</p>
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-sm font-medium text-slate-700 sr-only">OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center tracking-[1em] py-2 border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="----"
                  maxLength={4}
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition-colors">
                Verify & Login
              </button>
              <button type="button" onClick={() => setStep(1)} className="mt-2 w-full text-sm text-primary hover:underline">
                Change Number
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
