"use client";
import { motion } from "framer-motion";
import { FaRobot, FaFileAlt, FaMagic, FaUserTie } from "react-icons/fa";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          About HireAble-AI
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Revolutionizing the way job seekers create and optimize resumes using
          Artificial Intelligence.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-20"
      >
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-cyan-500/40">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-300">
            To empower job seekers with AI-driven tools that simplify resume
            creation and help them present their professional story with
            confidence and precision.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-purple-500/40">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-2">
            Our Vision
          </h2>
          <p className="text-gray-300">
            To redefine the future of career development through smart,
            personalized resume solutions powered by next-gen AI technology.
          </p>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mb-20"
      >
        <h2 className="text-center text-3xl font-semibold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Core Features
        </h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {[
            {
              icon: <FaRobot size={40} />,
              title: "AI-Powered",
              desc: "Leverages cutting-edge AI to tailor resumes uniquely for each user.",
            },
            {
              icon: <FaFileAlt size={40} />,
              title: "Smart Templates",
              desc: "Beautiful, professional templates designed to stand out.",
            },
            {
              icon: <FaMagic size={40} />,
              title: "Instant Formatting",
              desc: "Automatically aligns and optimizes structure for clarity.",
            },
            {
              icon: <FaUserTie size={40} />,
              title: "Job-Match Ready",
              desc: "Generates keyword-optimized resumes suited for your target roles.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl border border-cyan-500/20 text-center shadow-lg hover:shadow-cyan-500/20 transition"
            >
              <div className="text-cyan-400 mb-3 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto mb-20 text-center"
      >
        <h2 className="text-3xl font-semibold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          How It Works
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {["Enter Info", "AI Generates", "Download Resume"].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-purple-500/20"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                Step {i + 1}
              </h3>
              <p className="text-gray-300">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Meet the Creator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto mb-20 text-center"
      >
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-cyan-500/30 shadow-lg">
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
            Meet the Creator
          </h2>
          <p className="text-xl text-cyan-400 font-semibold mb-2">
            Awobodu Iremide
          </p>
          <p className="text-gray-400 mb-4">Fullstack Developer & Visionary</p>
          <p className="text-gray-300 max-w-xl mx-auto">
            Passionate about building intelligent tools that bridge technology
            and creativity. With HireAble-AI, I aim to help job seekers unlock
            their potential through smart, beautiful, and effective resumes.
          </p>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <Link 
          href="/"
          className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/30 transition"
               >
          Try HireAble-AI Now
       </Link>
      </motion.div>
    </div>
  );
}
