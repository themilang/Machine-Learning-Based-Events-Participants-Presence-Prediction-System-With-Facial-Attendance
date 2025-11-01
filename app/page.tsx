"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// Define the type for particle positions to use in state
type ParticlePosition = {
  x: number;
  y: number;
  delay: number;
  randomXOffset: number;
};

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  // 1. State to hold particle positions, initialized as an empty array
  const [particlePositions, setParticlePositions] = useState<ParticlePosition[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // 2. Client-side logic to calculate particle positions using 'window'
    if (typeof window !== 'undefined') {
      const NUM_PARTICLES = 20;
      const positions: ParticlePosition[] = [...Array(NUM_PARTICLES)].map(() => ({
        // Use window properties safely inside useEffect
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 2,
        randomXOffset: Math.random() * 50 - 25, // Pre-calculate for animation
      }));
      setParticlePositions(positions);
    }
  }, []); // Empty dependency array ensures this runs once on client mount

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a2e] z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] z-0" />
      
      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {/* 3. Map over the particlePositions state */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-blue-500/30 rounded-full"
            initial={{ 
              x: pos.x, // Now safe: accessing data from state
              y: pos.y, // Now safe: accessing data from state
            }}
            animate={{
              y: [pos.y, pos.y - 100, pos.y],
              x: [pos.x, pos.x + pos.randomXOffset, pos.x], // Use the pre-calculated offset
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: pos.delay,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 w-full px-6 py-6 flex justify-between items-center border-b border-white/10 bg-black/20 backdrop-blur-xl"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            VisionAI
          </span>
        </motion.div>

        <div className="flex items-center gap-8">
          {['Features', 'Solutions', 'Pricing', 'Docs'].map((item) => (
            <motion.button
              key={item}
              whileHover={{ scale: 1.05, color: "#60a5fa" }}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {item}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-medium hover:shadow-2xl hover:shadow-blue-500/25 transition-all"
          >
            Get Started
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              AI-Powered Attendance System
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Intelligent
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Event Prediction System
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Revolutionize event management with our machine learning platform that 
              predicts and verifies participant presence using advanced facial recognition 
              and behavioral analysis.
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-base font-semibold hover:shadow-2xl transition-all"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-3 border border-gray-700 rounded-2xl text-base font-semibold hover:bg-white/5 transition-all"
            >
              View Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {[
              { value: "99.9%", label: "Accuracy" },
              { value: "2.5s", label: "Recognition Time" },
              { value: "50k+", label: "Events Tracked" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built with cutting-edge technology to deliver unparalleled performance and reliability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-500/30 backdrop-blur-xl transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-lg">⚡</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative z-10 py-24 px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Ready to Transform Your Event Management?
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of organizations using VisionAI to streamline their attendance tracking.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(139, 92, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-base font-semibold hover:shadow-2xl transition-all"
          >
            Get Started Free
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6 md:mb-0"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-lg font-bold">VisionAI</span>
            </motion.div>
            
            <motion.div 
              className="flex gap-8 text-sm text-gray-400"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              {['Privacy', 'Terms', 'Support', 'Contact'].map((item, index) => (
                <button key={index} className="hover:text-white transition-colors">
                  {item}
                </button>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center text-gray-500 text-sm mt-8 pt-8 border-t border-white/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            © {new Date().getFullYear()} VisionAI. All rights reserved.
          </motion.div>
        </div>
      </footer>
    </main>
  );
}

// Data array moved outside the component for better performance
const features = [
  {
    title: "Real-time Facial Recognition",
    description: "Advanced ML models that identify participants in milliseconds with military-grade accuracy."
  },
  {
    title: "Predictive Analytics",
    description: "AI-powered attendance forecasting to help organizers plan and optimize event resources."
  },
  {
    title: "Seamless Integration",
    description: "Easy integration with your existing event management systems and workflows."
  },
  {
    title: "Live Dashboard",
    description: "Real-time insights and analytics with beautiful, intuitive visualizations."
  },
  {
    title: "Enterprise Security",
    description: "End-to-end encryption and compliance with global data protection standards."
  },
  {
    title: "Auto Scaling",
    description: "Handles events of any size, from small meetings to stadium-sized conferences."
  }
];