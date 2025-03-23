import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-white text-gray-900">
      <div className="relative flex flex-col items-center justify-center text-center py-20 px-6">
        <motion.h1
          className="text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="block">TaskFlow</span>
        </motion.h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Boost productivity, streamline workflow, and collaborate in real-time.
        </p>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">🌟 What Our Users Say</h2>
          <div className="flex gap-8">
            {[
              { name: "John Doe", text: "TaskFlow has streamlined our team's workflow!" },
              { name: "Jane Smith", text: "The task management features are amazing, and it's easy to use!" },
              { name: "Bob Johnson", text: "A game-changer for project management!" },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lg text-gray-600 italic">“{testimonial.text}”</p>
                <h4 className="mt-4 text-xl text-gray-800 font-semibold">- {testimonial.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Selection Section */}
      <div className="py-16 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Choose Your Role</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          {["user", "admin"].map((role) => (
            <motion.div
              key={role}
              className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-semibold capitalize text-gray-800">{role === "user" ? "Team Member" : "Administrator"}</h3>
              <p className="mt-3 text-gray-600">
                {role === "user"
                  ? "Create tasks, track progress, and collaborate with your team."
                  : "Manage users, verify tasks, and oversee team operations."}
              </p>
              <div className="mt-6 space-y-4">
                <button
                  onClick={() => navigate("/signup", { state: { role } })}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md shadow-md hover:opacity-90 transition"
                >
                  Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
                <button
                  onClick={() => navigate("/login", { state: { role } })}
                  className="w-full py-3 border border-gray-400 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-200 transition"
                >
                  Log In as {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">✨ Features That Power Your Productivity</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { title: "Task Management", description: "Create, organize, and prioritize tasks efficiently." },
              { title: "Time Tracking", description: "Monitor task time and boost productivity." },
              { title: "Team Collaboration", description: "Work together seamlessly on shared projects." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">❓ Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { question: "Is TaskFlow free to use?", answer: "Yes! TaskFlow offers a free plan with core features." },
              { question: "Can I use TaskFlow for my team?", answer: "Absolutely! TaskFlow supports team collaboration." },
              { question: "How can I get support?", answer: "You can contact us via email or our support center." },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800 flex justify-between">
                  {faq.question}
                  <span>{activeFAQ === index ? "−" : "+"}</span>
                </h3>
                {activeFAQ === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800">📩 Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">Have questions? We’d love to hear from you.</p>
          <motion.form
            className="mt-8 space-y-4 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-gray-200 border-none rounded-md focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-gray-200 border-none rounded-md focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 bg-gray-200 border-none rounded-md focus:ring-2 focus:ring-indigo-500 text-gray-800 h-32"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-md hover:opacity-90 transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.div
        className="fixed bottom-10 right-10 bg-indigo-500 text-white p-3 rounded-full cursor-pointer"
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
      >
        ↑
      </motion.div>
    </div>
  );
};

export default Landing;
