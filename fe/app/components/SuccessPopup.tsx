import { CheckCircleIcon } from '@/public/icons/CheckCircleIcon';
import { XIcon } from '@/public/icons/XIcon';
import { useEffect } from 'react';

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

export default function SuccessPopup({ message, onClose }: SuccessPopupProps) {
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-60" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 animate-fade-in">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <CheckCircleIcon extraClass="w-6 h-6 text-green-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Success</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <XIcon extraClass="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={onClose}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}