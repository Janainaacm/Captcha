"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCaptcha, verifyCaptcha } from "../service/CaptchaAPI";
import CaptchaImage from "./components/CaptchaImage";
import CaptchaInput from "./components/CaptchaInput";
import SuccessPopup from "./components/SuccessPopup";
import axios from "axios";

export default function CaptchaForm() {
  const [captchaInput, setCaptchaInput] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: captchaResponse,
    isLoading: isCaptchaLoading,
    isError: isCaptchaError,
    refetch: refetchCaptcha,
  } = useQuery({
    queryKey: ["captcha"],
    queryFn: fetchCaptcha,
    staleTime: Infinity,
  });

  const { 
    mutate: submitCaptcha, 
    isPending: isVerifying,
    isError: isVerificationError,
    error: verificationError
  } = useMutation({
    mutationFn: () => verifyCaptcha(captchaInput),
    onSuccess: () => {
      setShowSuccessPopup(true);
      
      setCaptchaInput("");
      queryClient.invalidateQueries({ queryKey: ["captcha"] });
      
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    },
    onError: (error) => {
      console.log("Verification failed:", error);
      
      refetchCaptcha();
      setCaptchaInput("");
    }
  });

  const captchaImageUrl = captchaResponse 
    ? URL.createObjectURL(
        new Blob([captchaResponse.data], { type: "image/png" })
      ) 
    : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput) {
      submitCaptcha();
    }
  };

  const handleRefreshCaptcha = () => {
    setCaptchaInput("");
    refetchCaptcha();
  };

  const getErrorMessage = () => {
    if (!verificationError) return "Invalid captcha. Please try again.";

    if (axios.isAxiosError(verificationError) && verificationError.response) {
      return verificationError.response.data || "Invalid captcha. Please try again.";
    }
    
    return verificationError.message || "Invalid captcha. Please try again.";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-zinc-700">Captcha Validation</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <CaptchaImage 
              captchaUrl={captchaImageUrl} 
              loading={isCaptchaLoading} 
              onRefresh={handleRefreshCaptcha} 
            />
            
            <CaptchaInput 
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              disabled={isVerifying || isCaptchaLoading}
            />
          </div>
          
          {isCaptchaError && (
            <div className="text-center p-2 rounded bg-red-100 text-red-700">
              Failed to load captcha. Please try refreshing.
            </div>
          )}
          
          {isVerificationError && (
            <div className="text-center p-2 rounded bg-red-100 text-red-700">
              {getErrorMessage()}
            </div>
          )}
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isVerifying || isCaptchaLoading || !captchaInput}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isVerifying ? "Verifying..." : "Verify Captcha"}
            </button>
          </div>
        </form>
      </div>
      
      {showSuccessPopup && (
        <SuccessPopup 
          message="Captcha verified successfully!" 
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </main>
  );
}