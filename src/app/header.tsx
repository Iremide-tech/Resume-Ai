"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-8 py-6 bg-gradient-to-r from-cyan-900 via-purple-900 to-black shadow-md relative">
     
      <h1 className="text-2xl font-bold text-cyan-400 tracking-widest font-mono">
        Hireable-AI
      </h1>

      <ul className="hidden md:flex items-center space-x-6">
        <li>
          <Link href="/" className=" hover:text-cyan-400">Home</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-cyan-400">About</Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-cyan-400">Contact</Link>
        </li>
      </ul>

      
      <button
        className="md:hidden text-cyan-400 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      
      <AnimatePresence>
  {isOpen && (
    <motion.ul
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute top-16 right-8 bg-black/95 rounded-lg shadow-lg flex flex-col items-start space-y-4 px-6 py-4 md:hidden z-50"
    >
      <li>
        <Link href="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/about" onClick={() => setIsOpen(false)}>
          About
        </Link>
      </li>
      <li>
        <Link href="/contact" onClick={() => setIsOpen(false)}>
          Contact
        </Link>
      </li>
    </motion.ul>
  )}
</AnimatePresence>

    </nav>
  );
}

export default NavBar;

