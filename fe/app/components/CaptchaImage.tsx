import React from 'react';
import { RefreshIcon } from '@/public/icons/RefreshIcon';

interface CaptchaImageProps {
  captchaUrl: string;
  loading: boolean;
  onRefresh: () => void;
}

export default function CaptchaImage({ captchaUrl, loading, onRefresh }: CaptchaImageProps) {
  return (
    <div className="relative w-full max-w-xs px-4">
      <div className="relative h-24 w-full rounded border border-gray-300 overflow-hidden">
        {captchaUrl ? (
          <img 
            src={captchaUrl} 
            alt="CAPTCHA" 
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-gray-500 text-sm">Loading captcha...</p>
          </div>
        )}
        
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
            <div className="animate-spin h-5 w-5 border-2 border-blue-600 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>
      
      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="absolute -right-2 -top-2 p-1 bg-blue-50 rounded-full border border-blue-200 hover:bg-blue-100 disabled:opacity-50"
        aria-label="Refresh captcha"
      >
        <RefreshIcon extraClass="text-blue-600" />
      </button>
    </div>
  );
}
