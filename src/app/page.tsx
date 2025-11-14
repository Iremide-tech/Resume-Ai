'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from './fadeIn';
import { useRouter } from "next/navigation";
import { FileText } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    title: '',
    experience: '',
    skills: '',
    education: '',
    email: '',
    phone: '',
    linkedin: '',
    address: '',
    theme: 'classic',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'Failed to generate resume.');
        setLoading(false);
        return;
      }

      
      const query = new URLSearchParams({
        ...form,
        resume: data.resume, 
      }).toString();

      router.push(`/resume?${query}`);
    } catch {
      setError('Network error.');
    }

    setLoading(false);
  };

  return (
    <FadeIn duration={100}>
      <main className="min-h-screen flex justify-center items-start py-12 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        >
          <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
            AI Resume Generator
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'name', placeholder: 'Full Name' },
              { name: 'title', placeholder: 'Job Title' },
              { name: 'experience', placeholder: 'Experience...', type: 'textarea' },
              { name: 'skills', placeholder: 'Skills (comma separated)' },
              { name: 'education', placeholder: 'Education' },
              { name: 'email', placeholder: 'Email' },
              { name: 'phone', placeholder: 'Phone' },
              { name: 'linkedin', placeholder: 'LinkedIn' },
              { name: 'address', placeholder: 'Address' },
            ].map((field, i) =>
              field.type === 'textarea' ? (
                <textarea
                  key={i}
                  name={field.name}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full p-3 bg-transparent border border-cyan-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500 transition resize-none"
                />
              ) : (
                <input
                  key={i}
                  name={field.name}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full p-3 bg-transparent border border-cyan-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500 transition"
                />
              )
            )}

            <div>
              <label className="block font-semibold text-cyan-300 mb-2">
                Resume Theme:
              </label>
              <select
                name="theme"
                value={form.theme}
                onChange={handleChange}
                className="w-full p-3 bg-[#0f172a] border border-cyan-600/50 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-400"
              >
                <option value="classic" className="text-black">
                  Classic
                </option>
                <option value="modern" className="text-black">
                  Modern
                </option>
                <option value="creative" className="text-black">
                  Creative
                </option>
              </select>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px #06b6d4' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex items-center gap-2 px-5 py-3 border border-cyan-500 rounded-lg text-cyan-400 hover:bg-cyan-400 hover:text-black transition font-semibold"
              >
                <FileText size={18} />
                {loading ? 'Generating...' : 'Generate Resume'}
              </motion.button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg">
              {error}
            </div>
          )}
        </motion.div>
      </main>
    </FadeIn>
  );
}
