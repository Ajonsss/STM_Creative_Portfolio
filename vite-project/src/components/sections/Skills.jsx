import React from "react";
import { motion } from "framer-motion";

const Skills = ({ skills }) => (
  <section id="skills" className="py-24 px-6">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">My Arsenal</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((skill) => (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            key={skill.id} 
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/30 transition-all cursor-default shadow-lg shadow-black/10"
          >
            <span className="text-white font-medium tracking-wide flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
              {skill.title}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;