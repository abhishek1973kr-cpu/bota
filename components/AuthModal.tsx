"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Loader2 
} from "lucide-react";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

// Extend window interface to hold recaptcha verifier
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

const COUNTRY_CODES = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA / Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
];

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useAuth();
  const { showToast } = useCart();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Cleanup recaptcha when modal is closed
  const cleanupRecaptcha = () => {
    try {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        delete window.recaptchaVerifier;
      }
      const container = document.getElementById("recaptcha-container");
      if (container) {
        container.innerHTML = "";
      }
    } catch (err) {
      console.warn("reCAPTCHA cleanup error:", err);
    }
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    cleanupRecaptcha();
    // Reset state after animation
    setTimeout(() => {
      setStep("phone");
      setPhoneNumber("");
      setOtp(new Array(6).fill(""));
      setErrorMessage(null);
      setLoading(false);
      setConfirmationResult(null);
    }, 200);
  };

  // Timer countdown for resending OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Setup recaptcha verifier
  const setupRecaptcha = (): RecaptchaVerifier => {
    cleanupRecaptcha();

    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {
        // reCAPTCHA solved
      },
      "expired-callback": () => {
        setErrorMessage("reCAPTCHA expired. Please try sending OTP again.");
        cleanupRecaptcha();
      },
    });

    window.recaptchaVerifier = verifier;
    return verifier;
  };

  // Step 1: Send OTP to Phone Number
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    // Basic phone number validation
    const sanitizedNumber = phoneNumber.trim().replace(/\D/g, "");
    if (sanitizedNumber.length < 8 || sanitizedNumber.length > 15) {
      setErrorMessage("Please enter a valid mobile number (e.g. 9876543210).");
      return;
    }

    setLoading(true);
    const fullPhoneNumber = `${countryCode}${sanitizedNumber}`;

    try {
      const verifier = setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, verifier);
      
      setConfirmationResult(confirmation);
      window.confirmationResult = confirmation;
      setStep("otp");
      setTimer(45); // 45 seconds countdown
      showToast(`OTP sent successfully to ${fullPhoneNumber} 📲`);
    } catch (error: any) {
      console.error("Firebase phone auth error:", error);
      cleanupRecaptcha();

      let friendlyMessage = "Failed to send OTP. Please check your number and try again.";
      if (error?.code === "auth/invalid-phone-number") {
        friendlyMessage = "Invalid phone number format. Please check the country code and number.";
      } else if (error?.code === "auth/too-many-requests") {
        friendlyMessage = "Too many requests. Please wait a moment before trying again.";
      } else if (error?.code === "auth/quota-exceeded") {
        friendlyMessage = "Daily SMS quota exceeded. Please contact support or try tomorrow.";
      } else if (error?.code === "auth/network-request-failed") {
        friendlyMessage = "Network error. Please check your internet connection.";
      } else if (error?.message) {
        friendlyMessage = error.message;
      }
      setErrorMessage(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle OTP Input Digits
  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric inputs
    const char = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    // Auto-focus next input
    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasteData) return;

    const newOtp = new Array(6).fill("");
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);

    const targetFocus = Math.min(pasteData.length, 5);
    otpInputRefs.current[targetFocus]?.focus();
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit OTP code.");
      return;
    }

    if (!confirmationResult) {
      setErrorMessage("Session expired. Please request a new OTP.");
      setStep("phone");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const userCredential = await confirmationResult.confirm(fullOtp);
      const user = userCredential.user;

      showToast(`Logged in successfully as ${user.phoneNumber || "Member"}! 🌿`);
      handleClose();
    } catch (error: any) {
      console.error("OTP Verification Error:", error);
      let friendlyMessage = "Invalid OTP. Please double-check and try again.";
      if (error?.code === "auth/invalid-verification-code") {
        friendlyMessage = "Incorrect OTP entered. Please check your SMS and re-enter.";
      } else if (error?.code === "auth/code-expired") {
        friendlyMessage = "This OTP has expired. Please click 'Resend OTP'.";
      } else if (error?.message) {
        friendlyMessage = error.message;
      }
      setErrorMessage(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 bg-cream-50 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-cream-200 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-cream-200 text-charcoal-700 hover:text-charcoal-950 transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-forest-900 text-gold-300 mx-auto flex items-center justify-center mb-3.5 shadow-md shadow-forest-950/20">
            {step === "phone" ? (
              <Phone className="w-6 h-6 text-gold-400" />
            ) : (
              <Lock className="w-6 h-6 text-gold-400" />
            )}
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 tracking-tight">
            {step === "phone" ? "Mobile Login" : "Verify Your Number"}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-700 mt-1.5 max-w-xs mx-auto">
            {step === "phone"
              ? "Enter your mobile number to receive a one-time password (OTP) for quick, secure login."
              : `Enter the 6-digit code sent via SMS to ${countryCode} ${phoneNumber}`}
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Hidden Container for Firebase reCAPTCHA */}
        <div id="recaptcha-container" className="flex justify-center mb-2" />

        {/* STEP 1: Phone Number Input */}
        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-800 mb-1.5 uppercase tracking-wider">
                Mobile Number
              </label>

              <div className="flex rounded-xl shadow-sm border border-cream-300 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-forest-800 focus-within:border-transparent transition-all">
                {/* Country Code Select */}
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-cream-100/70 border-r border-cream-300 text-xs font-medium text-charcoal-800 px-3 py-3 outline-none cursor-pointer"
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.flag} {item.code}
                    </option>
                  ))}
                </select>

                {/* Phone Input */}
                <input
                  type="tel"
                  inputMode="numeric"
                  autoFocus
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder="98765 43210"
                  className="w-full px-3.5 py-3 text-sm text-charcoal-900 placeholder-charcoal-400 outline-none bg-transparent"
                  maxLength={15}
                />
              </div>
              <p className="text-[11px] text-charcoal-600 mt-1.5">
                We will send an SMS OTP for verification. Standard operator SMS rates may apply.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || phoneNumber.trim().length < 8}
              className="w-full flex items-center justify-center gap-2 bg-forest-900 text-cream-50 hover:bg-forest-950 font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gold-300" />
                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  <span>Send OTP</span>
                  <ArrowRight className="w-4 h-4 text-gold-300" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: OTP Verification */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-charcoal-800 uppercase tracking-wider">
                  6-Digit OTP Code
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setErrorMessage(null);
                  }}
                  className="text-xs text-forest-800 hover:text-forest-950 underline font-medium"
                >
                  Edit Number
                </button>
              </div>

              {/* 6 Digit Input Boxes */}
              <div className="flex justify-between gap-2 sm:gap-2.5">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    className="w-11 sm:w-12 h-13 sm:h-14 text-center font-bold text-lg sm:text-xl text-forest-950 bg-white border border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 focus:border-transparent transition-all shadow-sm"
                  />
                ))}
              </div>
            </div>

            {/* Resend OTP Timer & Button */}
            <div className="flex items-center justify-between text-xs text-charcoal-700 pt-1">
              {timer > 0 ? (
                <span>
                  Resend code in <strong className="text-forest-900">{timer}s</strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSendOtp()}
                  disabled={loading}
                  className="flex items-center gap-1.5 text-forest-800 hover:text-forest-950 font-semibold underline disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resend OTP</span>
                </button>
              )}

              <span className="flex items-center gap-1 text-sage-600">
                <ShieldCheck className="w-3.5 h-3.5 text-forest-700" />
                Firebase Protected
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || otp.join("").length !== 6}
              className="w-full flex items-center justify-center gap-2 bg-forest-900 text-cream-50 hover:bg-forest-950 font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gold-300" />
                  <span>Verifying OTP...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-gold-300" />
                  <span>Verify & Login</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Guarantee / Trust Badge */}
        <div className="mt-6 pt-4 border-t border-cream-200/80 flex items-center justify-center gap-2 text-[11px] text-charcoal-600">
          <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0" />
          <span>Instant passwordless access with Firebase 2FA</span>
        </div>
      </div>
    </div>
  );
};
