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

  const handleDownload = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) {
      alert("Resume preview not found");
      return;
    }

    const html = element.outerHTML;

    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ html }),
    });

    if (!res.ok) {
      alert("Failed to generate PDF");
      return;
      
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center py-12 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-gray-200">
      
      {/* RESUME PREVIEW */}
      <motion.div
        id="resume-preview"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: '800px',
          background: '#ffffff',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          lineHeight: '1.6',
        }}
      >
        <style>{`
          #resume-preview h1 {
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 16px;
            color: #1a1a1a;
          }
          #resume-preview h2 {
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
            border-bottom: 2px solid #007bff;
            padding-bottom: 5px;
          }
          #resume-preview p {
            margin: 8px 0;
            font-size: 14px;
          }
          #resume-preview .contact-info {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-bottom: 24px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 12px;
          }
          #resume-preview .content {
            white-space: pre-line;
            font-size: 13px;
          }
          #resume-preview .theme-label {
            margin-top: 24px;
            text-align: center;
            font-size: 11px;
            color: #999;
          }
        `}</style>

        <h1>{name}</h1>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginBottom: '8px' }}>
          {title}
        </p>
        <div className="contact-info">
          {email} • {phone} • {linkedin} • {address}
        </div>

        <div className="content">
          {resume || `EXPERIENCE:\n${experience || '—'}\n\nSKILLS:\n${skills || '—'}\n\nEDUCATION:\n${education || '—'}`}
        </div>

        <div className="theme-label">Theme: {theme || 'classic'}</div>
      </motion.div>

      {/* DOWNLOAD BUTTON */}
      <button
        onClick={handleDownload}
        className="mt-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-lg shadow-lg transition"
      >
        Download PDF
      </button>
    </main>
  );
}
