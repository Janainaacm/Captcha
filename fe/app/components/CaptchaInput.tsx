import React from 'react';

interface CaptchaInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export default function CaptchaInput({ value, onChange, disabled }: CaptchaInputProps) {
  return (
    <div className="">
      <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-1">
        Enter the characters shown above:
      </label>
      <input
        type="text"
        id="captcha"
        name="captcha"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter captcha text"
        autoComplete="off"
        required
      />
    </div>
  );
}