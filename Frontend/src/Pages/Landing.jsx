import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#e7eaf6] text-[#113f67]">

=      <header className="flex justify-between items-center px-10 py-6 border-b border-[#a2a8d3] bg-[#e7eaf6]/70 backdrop-blur-xl sticky top-0 z-50">
        <h1 className="text-2xl font-black tracking-tight">VaultIQ</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-xl border border-[#113f67] hover:bg-[#113f67] hover:text-white transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-xl bg-[#113f67] text-white hover:bg-[#38598b] transition"
          >
            Try Free
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-10 py-20 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Your Documents, <br />
            <span className="text-[#38598b]">Now Intelligent.</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            VaultIQ turns PDFs, notes, and images into a searchable AI brain.
            Ask questions like ChatGPT and get instant answers.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-7 py-3 rounded-xl bg-[#113f67] text-white font-semibold hover:bg-[#38598b] transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-7 py-3 rounded-xl border border-[#113f67] hover:bg-[#113f67] hover:text-white transition"
            >
              Login
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Free forever plan
          </p>
        </div>

        <div className="bg-white border border-[#a2a8d3] rounded-3xl shadow-2xl p-6">

          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>

          <div className="space-y-4">

            <div className="bg-[#e7eaf6] p-4 rounded-xl">
              <p className="text-sm font-semibold">You</p>
              <p className="text-sm text-gray-700">
                Summarize my PDF in simple points
              </p>
            </div>

            <div className="bg-[#113f67] text-white p-4 rounded-xl">
              <p className="text-sm font-semibold">VaultIQ AI</p>
              <p className="text-sm mt-1 text-[#e7eaf6]">
                • Key insights extracted<br />
                • Structured summary created<br />
                • Questions answered instantly
              </p>
            </div>

          </div>
        </div>

      </section>

=      <section className="border-y border-[#a2a8d3] py-6 bg-white/40">
        <div className="max-w-7xl mx-auto px-10 flex justify-between text-sm text-gray-500">
          <span>Trusted by students</span>
          <span>Researchers</span>
          <span>Developers</span>
          <span>Professionals</span>
          <span>Teams</span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-10 py-20">

        <h2 className="text-3xl font-black text-center mb-12">
          Everything You Need in One AI Vault
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              title: "Chat with Files",
              desc: "Ask questions from PDFs, notes, and documents instantly.",
            },
            {
              title: "Smart Extraction",
              desc: "Automatically extracts text from images and files.",
            },
            {
              title: "Organized Knowledge",
              desc: "Everything structured into searchable vaults.",
            },
            {
              title: "Fast Search",
              desc: "Find anything across all your documents in seconds.",
            },
            {
              title: "Secure Storage",
              desc: "Your data stays private and encrypted.",
            },
            {
              title: "AI Summaries",
              desc: "Get instant summaries of long documents.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white border border-[#a2a8d3] rounded-2xl p-6 shadow hover:shadow-xl transition"
            >
              <h3 className="font-bold text-lg">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </div>
          ))}

        </div>
      </section>

      <section className="bg-[#113f67] text-white py-20">

        <div className="max-w-7xl mx-auto px-10 text-center">

          <h2 className="text-4xl font-black">
            Simple 3-Step Workflow
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-12">

            {[
              {
                step: "1",
                title: "Create Vault",
                desc: "Set up your personal AI workspace.",
              },
              {
                step: "2",
                title: "Upload Data",
                desc: "Add PDFs, images, notes, files.",
              },
              {
                step: "3",
                title: "Ask Anything",
                desc: "Chat with your knowledge instantly.",
              },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-5xl font-black text-[#e7eaf6]">
                  {s.step}
                </div>
                <h3 className="mt-3 font-bold text-xl">{s.title}</h3>
                <p className="mt-2 text-[#e7eaf6] text-sm">{s.desc}</p>
              </div>
            ))}

          </div>

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-10 py-20">

        <div className="bg-white border border-[#a2a8d3] rounded-3xl p-12 text-center shadow-2xl">

          <h2 className="text-4xl font-black">
            Build Your AI Knowledge System Today
          </h2>

          <p className="mt-4 text-gray-600">
            Stop searching. Start thinking with your documents.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-8 px-10 py-3 bg-[#113f67] text-white font-bold rounded-xl hover:bg-[#38598b] transition"
          >
            Get Started Free
          </button>

        </div>

      </section>

      <footer className="border-t border-[#a2a8d3] py-10 bg-[#e7eaf6]">

        <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-4 gap-8 text-sm text-gray-600">

          <div>
            <h3 className="font-bold text-[#113f67]">VaultIQ</h3>
            <p className="mt-2">
              AI-powered knowledge vault for your documents.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Product</h3>
            <p>Features</p>
            <p>How it works</p>
            <p>Pricing</p>
          </div>

          <div>
            <h3 className="font-bold">Company</h3>
            <p>About</p>
            <p>Careers</p>
            <p>Contact</p>
          </div>

          <div>
            <h3 className="font-bold">Legal</h3>
            <p>Privacy</p>
            <p>Terms</p>
          </div>

        </div>

        <p className="text-center text-xs text-gray-500 mt-10">
          © 2026 VaultIQ. All rights reserved.
        </p>

      </footer>

    </div>
  );
};

export default Landing;