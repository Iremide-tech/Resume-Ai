'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setSubmitted(false);
    try {
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqaylzao';
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok || data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to send message.');
      }
    } catch {
      setError('Network error.');
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen  text-gray-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative max-w-xl w-full bg-white/5 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-8 "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl pointer-events-none" />

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-cyan-400 mb-2 text-center"
        >
          Contact Us
        </motion.h1>
        <p className="text-gray-400 text-center mb-6">
          Have a question or just want to say hi? Fill out the form below and we’ll get back to you soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 bg-transparent border border-cyan-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500 transition"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 bg-transparent border border-cyan-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500 transition"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="w-full p-3 bg-transparent border border-cyan-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500 transition resize-none"
          />

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px #06b6d4' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-cyan-400 rounded-lg text-cyan-400 hover:bg-cyan-400 hover:text-black transition font-semibold"
          >
            <Send size={18} />
            Send Message
          </motion.button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-2 text-center bg-red-500/10 border border-red-500/50 text-red-400 rounded"
          >
            {error}
          </motion.div>
        )}

        {submitted && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-2 text-center bg-green-500/10 border border-green-500/50 text-green-400 rounded"
          >
            ✅ Thank you for contacting us! We’ll reply soon.
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
