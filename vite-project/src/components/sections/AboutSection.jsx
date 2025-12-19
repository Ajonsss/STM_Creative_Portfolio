import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const AboutSection = ({ profile, timeline }) => {
  const education = timeline.filter(t => t.type === 'education');
  const work = timeline.filter(t => t.type === 'work');

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12">
          {/* Glass Card Profile */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
            className=" top-32 h-fit bg-gray-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
          >
            <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-8 border border-white/10 shadow-inner">
              <img src={profile.image_url || "https://via.placeholder.com/400"} className="w-full h-full object-cover" alt="Profile" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Andrae Ajon</h3>
            <p className="text-gray-400 font-light leading-relaxed">{profile.bio}</p>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400"><Briefcase size={20}/></div>
                Experience
              </h2>
              <div className="space-y-4">
                {work.map(item => (
                  <div key={item.id} className="group p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 backdrop-blur-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/80 border border-white/10">{item.duration}</span>
                    </div>
                    <p className="text-blue-300 text-sm font-medium mb-2">{item.subtitle}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400"><GraduationCap size={20}/></div>
                Education
              </h2>
              <div className="space-y-4">
                {education.map(item => (
                  <div key={item.id} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        <p className="text-purple-300 text-sm">{item.subtitle}</p>
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{item.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;