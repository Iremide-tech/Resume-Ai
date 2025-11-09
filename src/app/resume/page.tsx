'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ResumePage() {
  const params = useSearchParams();

  const name = params.get('name');
  const title = params.get('title');
  const email = params.get('email');
  const phone = params.get('phone');
  const linkedin = params.get('linkedin');
  const address = params.get('address');
  const education = params.get('education');
  const skills = params.get('skills');
  const experience = params.get('experience');
  const theme = params.get('theme');
  const resume = params.get('resume');

  return (
    <main className="min-h-screen flex justify-center items-start py-12 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
      >
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-4">{name}</h1>
        <p className="text-center text-gray-400 mb-2">{title}</p>
        <p className="text-center text-gray-400 mb-6">
          {email} • {phone} • {linkedin} • {address}
        </p>

        <div className="border-t border-cyan-500/30 pt-4 whitespace-pre-line">
          {resume || `
          EXPERIENCE:
          ${experience || '—'}

          SKILLS:
          ${skills || '—'}

          EDUCATION:
          ${education || '—'}
          `}
        </div>

        <p className="mt-6 text-sm text-cyan-300 text-center">Theme: {theme}</p>
      </motion.div>
    </main>
  );
}
