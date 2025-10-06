import Head from "next/head";
import FadeIn from "../fadeIn";

function About() {
    return (
        <FadeIn duration={100}>
        <div className="max-w-2xl mx-auto p-6 space-y-4 bg-gradient-to-r bg-gray-900 m-5 rounded border border-cyan-500">
            <Head>
                <title>
                    About Us
                </title>
            </Head>
            <h1 className="text-blue-400">About us</h1>
            <p>At <strong className="text-cyan-400">HireAble-Ai</strong>, we are dedicated to helping job seekers create effective resumes that showcase their skills and experience. Our Ai-Powered Resume Generator uses advanced technology to generate high-quality resumes tailored to your needs</p>
        </div>
        </FadeIn>
       
    );
}

export default About