import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";

const Hero = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center px-6">
    <div className="max-w-4xl text-center z-10">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
      >
        <span className="text-sm font-medium bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          See Through Me
        </span>
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
        className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl"
      >
        Pure <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Glass.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
      >
        I design and build fluid digital experiences with a focus on motion, aesthetics, and performance.
      </motion.p>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
        className="flex justify-center gap-4"
      >
        {[
          { icon: <Github size={20} />, href: "https://github.com/Ajonsss" },
          { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/andraeajon/" },
          { icon: <Instagram size={20} />, href: "https://www.instagram.com/yepitsdrae/" }
        ].map((social, i) => (
          <a key={i} href={social.href} className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg">
            {social.icon}
          </a>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Hero;