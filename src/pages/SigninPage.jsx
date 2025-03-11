"use client"; 

import React, { useState, useEffect } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/globals.css";
 import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const images = ["/assets/A1.jpg", "/assets/A2.jpg", "/assets/A3.jpg", "/assets/A4.jpg"];
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
  
    const result = await signIn("credentials", {
      redirect: false,
      email, 
      password,
    });
  
    if (result?.ok) {
      router.push("/Employee"); 
    } else {
      alert("Sign-in failed! Invalid credentials.");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section - Sign In Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800">Sign in to your account</h2>
          <p className="text-gray-500 text-sm mt-1">
      New here?{" "}
      <a
        onClick={() => router.push("/SignupPage")} // Navigate to SignupPage
        className="text-green-500 cursor-pointer"
      >
        Create an account
      </a>
    </p>

          <div className="mt-6">
            {/* Email Field */}
            <div className="relative">
              <label className="text-gray-600">Email</label>
              <div className="relative">
              <input
                type="email"
                placeholder="joshbakery@gmail.com"
                className="input-field pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Capture input value
              />
                <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
              </div>
            </div>

            {/* Password Field */}
            <div className="mt-4 relative">
              <label className="text-gray-600">Password</label>
              <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="**********"
                className="input-field pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Capture input value
              />
                <FaEyeSlash
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer ${
                    showPassword ? "hidden" : "block"
                  }`}
                  onClick={() => setShowPassword(true)}
                />
                <FaEye
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer ${
                    showPassword ? "block" : "hidden"
                  }`}
                  onClick={() => setShowPassword(false)}
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button className="btn-primary w-full mt-6" onClick={handleSignIn} disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Terms and Policy */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              By signing in, you agree to our <a href="#" className="text-green-500">Terms</a> and <a href="#" className="text-green-500">Privacy Policy</a>.
            </p>
          </div>
        </div>

        {/* Right Section - Image and Info */}
        <div
          className="w-1/2 relative hidden md:flex items-center justify-center text-white p-8 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        >
          <div className="absolute inset-0 bg-opacity-30"></div>
          <div className="absolute bottom-4 text-center w-full p-4 bg-opacity-20 backdrop-blur-sm rounded-md">
            <h2 className="text-xl font-bold text-white">Welcome Back!</h2>
            <p className="mt-2 text-black">
              Your passion fuels our journey. Let’s create something amazing today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
