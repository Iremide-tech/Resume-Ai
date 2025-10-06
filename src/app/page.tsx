
'use client';

import { useState } from 'react';
import FadeIn from './fadeIn';



export default function Home() {
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

  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('classic');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'theme') {
      setSelectedTheme(e.target.value);
    }
  };
  const handleDownload = async () => {
  console.log('trying to call api')
   
  const resumeHTML = document.getElementById("resume-preview")?.innerHTML;
  const res = await fetch("/api/pdf", { 
    method: "POST",
    headers: {"Content-Type": "application/json"}  ,
   body: JSON.stringify({ html:resumeHTML}),
   });
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "resume.pdf"; // filename
  a.click();
  window.URL.revokeObjectURL(url);
};

const [resumeGenerated, setResumeGenerated] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResume('');
    try {
      const res = await fetch('/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || 'Failed to generate resume.');
        setResume('');
      } else {
        setResume(data.resume);
      }
    } catch (err) {
      setError('Network error.');
      setResume('');
    }
    setLoading(false);
    setResumeGenerated(true);
  };


  return (
    <FadeIn duration={100}>
    <main className="max-w-2xl mx-auto p-6 space-y-4 bg-gradient-to-r bg-gray-900 m-5 rounded ">
      

      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <input name="name" onChange={handleChange} placeholder="Full Name" className="w-full p-2 border border-blue-600 rounded hover:h-11" />
        <input name="title" onChange={handleChange} placeholder="Job Title" className="w-full p-2 border border-blue-600 rounded hover:h-11" />
        <textarea name="experience" onChange={handleChange} placeholder="Experience..." className="w-full p-2 border border-blue-600 rounded" />
        <input name="skills" onChange={handleChange} placeholder="Skills (comma separated)" className="w-full p-2 border border-blue-600 rounded hover:h-11" />
        <input name="education" onChange={handleChange} placeholder="Education" className="w-full p-2 border border-blue-600 rounded hover:h-11" />
        <input name="email" onChange={handleChange} placeholder="Email" className="w-full p-2 border border-blue-600 rounded hover:h-11" />
        <input name="phone" onChange={handleChange} placeholder="Phone" className="w-full p-2 border border-blue-600 rounded hover:h-11" />
        <input name="linkedin" onChange={handleChange} placeholder="Linkedin" className="w-full p-2 border border-blue-600 rounded hover:h-11" />
        <input name="address" onChange={handleChange} placeholder="Address" className="w-full p-2 border border-blue-600 rounded hover:h-11" />

        <label className="block font-semibold">Resume Theme:</label>
        <select name="theme" value={selectedTheme} onChange={handleChange} className="w-full p-2 border border-blue-600 rounded">
          <option value="classic" className='text-black'>Classic</option>
          <option value="modern" className='text-black'>Modern</option>
          <option value="creative" className='text-black'>Creative</option>
        </select>

        <button type="submit" className="ml-4 px-4 py-2 border border-cyan-500 rounded hover:bg-cyan-500 hover:text-black transition">
          {loading ? 'Generating...' : 'Generate Resume'}
        </button>
        {resumeGenerated && (
          <button 
          type='button'
          onClick={handleDownload} className="ml-4 px-4 py-2 border border-cyan-500 rounded hover:bg-cyan-500 hover:text-black transition">
            Download as PDF
          </button>
        )}
      </form>

      {error && (
        <div className="mt-6 p-4 border rounded bg-red-100 text-red-700">
          {error}
        </div>
      )}
      {resume && !error && (
        <FadeIn duration={70}>
        <div id='resume-preview' className={`mt-6 p-4 border rounded bg-blue-600 whitespace-pre-line theme-${selectedTheme}`}>
          <div className="mb-2 text-sm text-gray-500">Theme: {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}</div>
          {resume}
        </div>
        </FadeIn>
      )}
    </main>
    </FadeIn>
  );
}
