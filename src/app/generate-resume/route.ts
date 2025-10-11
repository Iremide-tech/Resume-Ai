import { NextRequest, NextResponse } from 'next/server';


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, title, experience, skills, education, email, phone, address, linkedin, theme } = body;

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ resume: '', error: 'OpenAI API key not set.' }, { status: 500 });
    }

   
    const prompt = `You are a professional resume writer. Generate a concise, well-formatted resume in plain text for the following user. Use the '${theme}' theme for formatting.\n\nName: ${name}\nTitle: ${title}\nExperience: ${experience}\nSkills: ${skills}\nEducation: ${education} Email: ${email}\nPhone: ${phone}\nLinkedIn: ${linkedin}\nAddress: ${address}\n\nMake sure to include sections for Summary, Experience, Skills, and Education. Keep the tone formal and professional.`;

   
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that writes resumes.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.text();
      return NextResponse.json({ resume: '', error }, { status: 500 });
    }

    const openaiData = await openaiRes.json();
    const resume = openaiData.choices?.[0]?.message?.content || '';
    return NextResponse.json({ resume });
  } catch {
    return NextResponse.json({ resume: '', error: 'Failed to generate resume.' }, { status: 400 });
  }
  

}
