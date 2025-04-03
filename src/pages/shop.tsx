"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/head";
import "@/styles/ShopPage.css";

// Define Product Type
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const dummyData: Product[] = [
      {
        id: "1",
        name: "Chocolate Cake",
        description: "A rich and moist chocolate cake, perfect for any occasion.",
        price: 15.99,
        image: "/assets/chocolate-cake.jpg",
        category: "cakes",
      },
      {
        id: "2",
        name: "Vanilla Bread",
        description: "Soft and fluffy vanilla bread, perfect for breakfast.",
        price: 5.99,
        image: "/assets/vanilla-bread.jpg",
        category: "bread",
      },
      {
        id: "3",
        name: "Sugar Cookies",
        description: "Delicious sugar cookies with a crisp exterior and soft center.",
        price: 3.99,
        image: "/assets/sugar-cookies.jpg",
        category: "cookies",
      },
      {
        id: "4",
        name: "Red Velvet Cake",
        description: "A moist red velvet cake with a creamy cream cheese frosting.",
        price: 18.99,
        image: "/assets/red-velvet-cake.jpg",
        category: "cakes",
      },
    ];

    setProducts(dummyData);
    setFilteredProducts(dummyData);
  }, []);

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      results = results.filter((product) => product.category === category);
    }

    setFilteredProducts(results);
  }, [searchTerm, category, products]);

  return (
    <div className="hero-sections">
    {/* Use the Header component here */}
    <Header />

      <div className="max-w-6xl mx-auto">
        {/* Search and filter section */}
        <div className="shop-search-filter">
          <input
            type="text"
            placeholder="Search for products..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="cakes">Cakes</option>
            <option value="bread">Bread</option>
            <option value="cookies">Cookies</option>
          </select>
        </div>

        {/* Product display */}
        <div className="shop-grid">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="shop-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src={product.image} alt={product.name} loading="lazy" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="shop-price">${product.price}</p>
              <Link href={`/product/${product.id}`} passHref>
                <motion.a whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  View Details
                </motion.a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
