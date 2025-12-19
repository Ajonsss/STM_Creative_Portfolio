import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X } from "lucide-react";

// Helper for image parsing
const projectImages = (p) => p.image_url ? p.image_url.split(',') : [];

const Portfolio = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="portfolio" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Selected Work</h2>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="group relative h-[28rem] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl bg-gray-900"
            >
              <img 
                src={project.image_url?.split(',')[0] || "https://via.placeholder.com/600x800"} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                alt={project.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 block">
                  {project.company || "Project"}
                </span>
                <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-2 mb-4 font-light">{project.description}</p>
                
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-black transition-colors">
                  <ChevronRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }} 
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900/80 w-full max-w-5xl h-[85vh] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden relative backdrop-blur-3xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-6 right-6 z-20">
                 <button onClick={() => setSelectedProject(null)} className="p-2 rounded-full bg-black/40 text-white border border-white/10 hover:bg-white hover:text-black transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {/* Header Image */}
                <div className="h-[40vh] w-full relative">
                  <img src={projectImages(selectedProject)[0]} className="w-full h-full object-cover" alt="Hero" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                  <div className="absolute bottom-8 left-8 md:left-12">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">{selectedProject.title}</h2>
                    <div className="flex gap-3">
                       <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-white backdrop-blur-md">{selectedProject.duration}</span>
                       <span className="px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/20 text-sm text-blue-300 backdrop-blur-md">{selectedProject.company}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 grid md:grid-cols-[2fr_1fr] gap-12">
                  <div className="space-y-6">
                    <p className="text-xl text-gray-200 leading-relaxed font-light">{selectedProject.full_details}</p>
                    <div className="h-px w-full bg-white/10 my-8" />
                    <h3 className="text-lg font-bold text-white mb-4">Gallery</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {projectImages(selectedProject).slice(1).map((img, i) => (
                        <img key={i} src={img} className="rounded-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-500" alt="" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">About</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">{selectedProject.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;