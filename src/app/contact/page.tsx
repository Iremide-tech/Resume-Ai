'use client'

import { useState } from 'react';

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
					// Replace with your Formspree endpoint below
					const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqaylzao';
					const res = await fetch(FORMSPREE_ENDPOINT, {
						method: 'POST',
						headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
						body: JSON.stringify({
							name: form.name,
							email: form.email,
							message: form.message,
						}),
					});
					const data = await res.json();
					if (data.ok || data.success) {
						setSubmitted(true);
					} else {
						setError(data.error || 'Failed to send message.');
						setSubmitted(false);
					}
				} catch {
					setError('Network error.');
					setSubmitted(false);
				}
			};

	return (
		<main className="max-w-2xl mx-auto p-6 space-y-4 bg-gradient-to-r bg-gray-900 m-5 rounded border border-cyan-500">
			<h1 className="text-2xl font-bold mb-4 text-cyan-400">Contact Us</h1>
			<p className='text-gray-600'>Have a question or just wanna say hi! fill the form and we&apos;ll try to reply</p>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					name="name"
					value={form.name}
					onChange={handleChange}
					placeholder="Your Name"
					className="w-full p-2 border rounded border-blue-600 "
				/>
				<input
					name="email"
					type="email"
					value={form.email}
					onChange={handleChange}
					placeholder="Your Email"
					className="w-full p-2 border rounded border-blue-600 "
				/>
				<textarea
					name="message"
					value={form.message}
					onChange={handleChange}
					placeholder="Your Message"
					className="w-full p-2 border rounded border-blue-600"
					rows={5}
				/>
				<button type="submit" className="ml-4 px-4 py-2 border border-cyan-500 rounded hover:bg-cyan-500 hover:text-black transition">
					Send Message
				</button>
			</form>
			{error && <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
			{submitted && !error && (
				<div className="mt-4 p-2 bg-green-100 text-green-700 rounded">Thank you for contacting us!</div>
			)}
		</main>
	);
}
