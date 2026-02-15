// ContactUsSection.jsx
import React from "react";

export default function Contact() {
  return (
    <section className="w-full bg-[#f4f1ea] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* Left: Text */}
        <div className="space-y-6">
          <p className="text-[16px] font-extrabold tracking-[0.1em] text-[#d6362b] uppercase">
            Get in touch
          </p>
          <h2 className="text-[40px] sm:text-[52px] lg:text-[64px] leading-[1em] font-extrabold tracking-[0.04em] text-[#1e1e1e] uppercase">
            We'd love to hear from you
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#464646] leading-relaxed max-w-lg">
            Have a question, suggestion, or want to collaborate? Fill out the form and we'll get back to you as soon as possible. Your feedback helps us grow!
          </p>
        </div>

        {/* Right: Form */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <form className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-black/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d6362b] transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-black/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d6362b] transition"
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-black/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d6362b] transition"
            />

            {/* Message */}
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-black/30 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d6362b] transition resize-none"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#d6362b] text-white font-extrabold uppercase tracking-[0.04em] py-4 rounded-lg hover:bg-[#b32e27] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
