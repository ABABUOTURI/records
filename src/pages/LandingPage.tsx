// pages/LandingPage.tsx
"use client";
import React from "react";
import Header from "@/pages/Headers"; // Import the Header component
import "@/styles/LandingPage.css";
import { motion } from "framer-motion";
import Link from "next/link";

const LandingPage: React.FC = () => {
  return (
    <div className="hero-sections">
      {/* Use the Header component here */}
      <Header />

      {/* Hero Section */}
      <motion.main 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, ease: "easeOut" }}
        className="hero-section"
      >
        <h2>Welcome to Sussy's Delights!</h2>
        <p>Experience the best homemade baked goods, crafted with love and the finest ingredients.</p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/shop" className="hero-btn">Browse Our Bakery</Link>
        </motion.div>
      </motion.main>

      {/* Products Section */}
      <section className="products">
        {[ 
          { img: "/assets/cake.jpg", title: "Delicious Cakes", desc: "Soft, moist, and irresistible flavors for any occasion." },
          { img: "/assets/bread.jpg", title: "Fresh Bread", desc: "Warm, fluffy, and baked fresh every day." },
          { img: "/assets/cookies.jpg", title: "Tasty Cookies", desc: "Crunchy, buttery, and filled with goodness." }
        ].map((item, index) => (
          <motion.div 
            key={index} 
            className="card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={item.img} alt={item.title} loading="lazy" />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default LandingPage;
