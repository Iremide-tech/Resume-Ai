import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  const { name, title, experience, skills, education } = req.body;

  const prompt = `
Generate a professional resume in structured text format with these inputs:

Name: ${name}
Job Title: ${title}
Experience: ${experience}
Skills: ${skills}
Education: ${education}

Include sections: Summary, Experience, Skills, Education.
Keep the tone formal and concise.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const resume = completion.choices[0].message.content;
    res.status(200).json({ resume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
