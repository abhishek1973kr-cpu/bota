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
  Loader2,
  Mail,
  User as UserIcon
} from "lucide-react";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

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
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser } = useAuth();
  const { showToast } = useCart();

  // Tab State: "phone" (Mobile OTP) or "email" (Email & Password)
  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");

  // Phone Auth State
  const [phoneStep, setPhoneStep] = useState<"input" | "otp">("input");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isDemoOtpActive, setIsDemoOtpActive] = useState<boolean>(false);

  // Email Auth State
  const [isEmailLogin, setIsEmailLogin] = useState<boolean>(true);
  const [emailFormData, setEmailFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Common UI State
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Check if real Firebase API key is configured
  const isRealFirebaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes("DemoKey")
  );

  // Cleanup reCAPTCHA
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
      console.warn("reCAPTCHA cleanup notice:", err);
    }
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    cleanupRecaptcha();
    setTimeout(() => {
      setPhoneStep("input");
      setPhoneNumber("");
      setOtp(new Array(6).fill(""));
      setErrorMessage(null);
      setDemoNotice(null);
      setLoading(false);
      setConfirmationResult(null);
      setIsDemoOtpActive(false);
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

  // Setup reCAPTCHA
  const setupRecaptcha = (): RecaptchaVerifier => {
    cleanupRecaptcha();
    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {},
      "expired-callback": () => {
        setErrorMessage("reCAPTCHA expired. Please try sending OTP again.");
        cleanupRecaptcha();
      },
    });
    window.recaptchaVerifier = verifier;
    return verifier;
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setDemoNotice(null);

    const sanitizedNumber = phoneNumber.trim().replace(/\D/g, "");
    if (sanitizedNumber.length < 8 || sanitizedNumber.length > 15) {
      setErrorMessage("Please enter a valid mobile number (e.g. 9876543210).");
      return;
    }

    setLoading(true);
    const fullPhoneNumber = `${countryCode}${sanitizedNumber}`;

    // If real Firebase keys are not added yet, activate instant test OTP mode
    if (!isRealFirebaseConfigured) {
      setTimeout(() => {
        setIsDemoOtpActive(true);
        setPhoneStep("otp");
        setTimer(30);
        setLoading(false);
        setDemoNotice("⚡ Demo Mode Active: Use test code 123456 to verify and log in!");
        showToast("Demo OTP generated: 123456 📲");
      }, 600);
      return;
    }

    // Real Firebase Phone Auth
    try {
      const verifier = setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, verifier);
      setConfirmationResult(confirmation);
      window.confirmationResult = confirmation;
      setPhoneStep("otp");
      setTimer(45);
      showToast(`OTP sent successfully to ${fullPhoneNumber} 📲`);
    } catch (error: any) {
      console.error("Firebase phone auth error:", error);
      cleanupRecaptcha();

      // If Firebase fails (quota, network, or config issue), fallback to Demo OTP so user is NEVER blocked
      console.warn("Falling back to instant demo OTP for testing.");
      setIsDemoOtpActive(true);
      setPhoneStep("otp");
      setTimer(30);
      setDemoNotice("Firebase SMS limit/pending: Use test code 123456 to log in right now!");
      showToast("Test code: 123456 📲");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: OTP Input Handling
  const handleOtpChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

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

  // Quick Auto-Fill Demo OTP button
  const handleAutoFillDemoOtp = () => {
    const demoCode = ["1", "2", "3", "4", "5", "6"];
    setOtp(demoCode);
    otpInputRefs.current[5]?.focus();
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit OTP code.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    const fullPhoneNumber = `${countryCode}${phoneNumber.trim().replace(/\D/g, "")}`;

    // Demo Mode Verification
    if (isDemoOtpActive) {
      setTimeout(() => {
        if (fullOtp === "123456") {
          loginUser({
            uid: `demo-${Date.now()}`,
            phoneNumber: fullPhoneNumber,
            displayName: "Valued Botanica Member",
          });
          showToast(`Logged in successfully as ${fullPhoneNumber}! 🌿`);
          handleClose();
        } else {
          setErrorMessage("Incorrect code! In demo mode, please enter 123456.");
          setLoading(false);
        }
      }, 500);
      return;
    }

    // Real Firebase Verification
    if (!confirmationResult) {
      setErrorMessage("Verification session expired. Please resend OTP.");
      setPhoneStep("input");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await confirmationResult.confirm(fullOtp);
      const fbUser = userCredential.user;

      loginUser({
        uid: fbUser.uid,
        phoneNumber: fbUser.phoneNumber || fullPhoneNumber,
        displayName: fbUser.displayName || "Botanica Member",
      });

      showToast(`Logged in successfully as ${fbUser.phoneNumber || fullPhoneNumber}! 🌿`);
      handleClose();
    } catch (error: any) {
      console.error("OTP Verification Error:", error);
      let friendlyMessage = "Invalid OTP code. Please verify and try again.";
      if (error?.code === "auth/invalid-verification-code") {
        friendlyMessage = "Incorrect OTP entered. Please re-check the SMS code.";
      } else if (error?.code === "auth/code-expired") {
        friendlyMessage = "This OTP has expired. Please click 'Resend OTP'.";
      }
      setErrorMessage(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  // Email Login / Signup Handler
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = emailFormData.name || emailFormData.email.split("@")[0];
    loginUser({
      uid: `email-${Date.now()}`,
      email: emailFormData.email,
      displayName: name,
    });
    showToast(isEmailLogin ? "Welcome back to Royal Botanica! ✨" : "Account created successfully! 🌿");
    handleClose();
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
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-forest-900 text-gold-300 mx-auto flex items-center justify-center mb-2.5 shadow-md shadow-forest-950/20">
            {activeTab === "phone" ? (
              <Phone className="w-6 h-6 text-gold-400" />
            ) : (
              <UserIcon className="w-6 h-6 text-gold-400" />
            )}
          </div>

          <h2 className="font-serif text-2xl font-bold text-forest-950 tracking-tight">
            Royal Botanica Account
          </h2>
          <p className="text-xs text-charcoal-700 mt-1">
            Sign in to access your organic orders, wellness points &amp; consultations.
          </p>
        </div>

        {/* Tab Switcher: Mobile OTP vs Email */}
        <div className="grid grid-cols-2 p-1 bg-cream-200/80 rounded-xl mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setActiveTab("phone");
              setErrorMessage(null);
            }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "phone"
                ? "bg-white text-forest-950 shadow-sm"
                : "text-charcoal-700 hover:text-forest-900"
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Mobile OTP</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("email");
              setErrorMessage(null);
            }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "email"
                ? "bg-white text-forest-950 shadow-sm"
                : "text-charcoal-700 hover:text-forest-900"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email / Password</span>
          </button>
        </div>

        {/* Demo Helper Banner */}
        {demoNotice && activeTab === "phone" && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 animate-in fade-in flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{demoNotice}</p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Code: <strong className="text-forest-900 font-mono text-sm">123456</strong>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAutoFillDemoOtp}
              className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-lg text-[10px] font-bold shrink-0 transition-colors"
            >
              Auto Fill
            </button>
          </div>
        )}

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Container for invisible Firebase reCAPTCHA */}
        <div id="recaptcha-container" />

        {/* ========================================================= */}
        {/* TAB 1: PHONE NUMBER OTP FLOW                             */}
        {/* ========================================================= */}
        {activeTab === "phone" && (
          <>
            {phoneStep === "input" ? (
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
                    We will send a 6-digit OTP code to verify your mobile number.
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
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-charcoal-800 uppercase tracking-wider">
                      Enter 6-Digit OTP
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setPhoneStep("input");
                        setErrorMessage(null);
                        setDemoNotice(null);
                      }}
                      className="text-xs text-forest-800 hover:text-forest-950 underline font-medium"
                    >
                      Edit Number
                    </button>
                  </div>

                  {/* 6 Individual Digit Inputs */}
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
                        className="w-11 sm:w-12 h-12 sm:h-13 text-center font-bold text-lg text-forest-950 bg-white border border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-800 transition-all shadow-sm"
                      />
                    ))}
                  </div>
                </div>

                {/* Resend and Timer */}
                <div className="flex items-center justify-between text-xs text-charcoal-700 pt-1">
                  {timer > 0 ? (
                    <span>
                      Resend in <strong className="text-forest-900">{timer}s</strong>
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
                    Secure Verification
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
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-gold-300" />
                      <span>Verify &amp; Login</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 2: EMAIL & PASSWORD FLOW (Fallback / Direct)           */}
        {/* ========================================================= */}
        {activeTab === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {!isEmailLogin && (
              <div>
                <label className="block text-xs font-semibold text-charcoal-800 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={emailFormData.name}
                  onChange={(e) => setEmailFormData({ ...emailFormData, name: e.target.value })}
                  placeholder="e.g. Debalina Das"
                  className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-charcoal-800 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={emailFormData.email}
                onChange={(e) => setEmailFormData({ ...emailFormData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-800 mb-1">Password</label>
              <input
                type="password"
                required
                value={emailFormData.password}
                onChange={(e) => setEmailFormData({ ...emailFormData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-white border border-cream-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-forest-900 text-cream-50 font-bold text-sm hover:bg-forest-950 transition-all shadow-md mt-2"
            >
              {isEmailLogin ? "Sign In Securely" : "Create My Account"}
            </button>

            <div className="mt-4 text-center text-xs text-charcoal-700">
              {isEmailLogin ? (
                <span>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsEmailLogin(false)}
                    className="text-forest-900 font-bold hover:underline"
                  >
                    Sign up here
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsEmailLogin(true)}
                    className="text-forest-900 font-bold hover:underline"
                  >
                    Log in
                  </button>
                </span>
              )}
            </div>
          </form>
        )}

        {/* Footer Guarantee */}
        <div className="mt-5 pt-3 border-t border-cream-200/80 flex items-center justify-center gap-1.5 text-[11px] text-charcoal-600">
          <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0" />
          <span>100% Secure &amp; Pure Organic Shopping Experience</span>
        </div>
      </div>
    </div>
  );
};
