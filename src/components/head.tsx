// components/Header.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import "@/styles/Headers.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between items-center py-4 px-6 bg-white shadow-md rounded-lg"
    >
      <h1>Sussy's Delights</h1>
      
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden" onClick={toggleMenu}>
        <button className="hamburger-menu">☰</button>
      </div>
      
      {/* Navigation */}
      <nav>
      <ul className={`nav-list ${isMenuOpen ? "active" : ""} md:flex md:space-x-6 flex-col md:flex-row`}>
  {["Shop", "About", "Contact", "Login"].map((text, index) => (
    <motion.li
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
    >
      <Link href={`/${text.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="nav-link">
        {text}
      </Link>
    </motion.li>
  ))}
</ul>


      </nav>
    </motion.header>
  );
};

export default Header;
