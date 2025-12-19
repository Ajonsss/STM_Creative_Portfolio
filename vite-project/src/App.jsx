import React, { useState, useEffect } from "react";
// Layout
import BackgroundMesh from "./components/layout/BackgroundMesh";
import Navbar from "./components/layout/Navbar";
// Sections
import Hero from "./components/sections/Hero";
import AboutSection from "./components/sections/AboutSection";
import Skills from "./components/sections/Skills";
import Portfolio from "./components/sections/Portfolio";
// Admin & Auth
import AdminDashboard from "./components/admin/AdminDashboard";
import LoginModal from "./components/auth/LoginModal";
// CSS (Make sure this file exists)
import "./index.css"; 

function App() {
  const [view, setView] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState({});
  const [timeline, setTimeline] = useState([]);

  const fetchData = async () => {
    try {
      setSkills(await (await fetch('http://localhost:5000/api/skills')).json());
      setProjects(await (await fetch('http://localhost:5000/api/projects')).json());
      setProfile(await (await fetch('http://localhost:5000/api/profile')).json());
      setTimeline(await (await fetch('http://localhost:5000/api/timeline')).json());
    } catch (e) { console.error(e); }
  };
  useEffect(() => { fetchData(); }, []);

  const handleLogin = async (username, password) => {
    const res = await fetch('http://localhost:5000/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username,password}) });
    const data = await res.json();
    if(data.success) { setShowLogin(false); setView("admin"); } else alert("Access Denied");
  };

  const scrollToSection = (id) => { 
    const el = document.getElementById(id); 
    if(el) el.scrollIntoView({behavior:'smooth'}); 
  };

  if(view === 'admin') return <AdminDashboard onLogout={()=>setView('home')} onRefresh={fetchData} skills={skills} projects={projects} profile={profile} timeline={timeline} />;

  return (
    <div className="min-h-screen text-gray-100 font-sans selection:bg-blue-500/30 selection:text-white">
      <BackgroundMesh />
      <Navbar onScrollTo={scrollToSection} />
      
      <Hero />
      <AboutSection profile={profile} timeline={timeline} />
      <Skills skills={skills} />
      <Portfolio projects={projects} />
      
      <section id="contact" className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12">
          <h2 className="text-4xl font-bold text-white mb-6">Let's Bring Your Visions To Life</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
            <a href="mailto:andraeajon@email.com" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">Email Me</a>
            <span className="text-xl font-bold text-gray-500">0992-495-6943</span>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-600 text-sm">
        <p>© 2025 Andrae Ajon. Crafted with ❤️ and React.</p>
        <button onClick={()=>setShowLogin(true)} className="mt-4 text-xs hover:text-white transition-colors">Admin Login</button>
      </footer>

      <LoginModal isOpen={showLogin} onClose={()=>setShowLogin(false)} onLogin={handleLogin} />
    </div>
  );
}

export default App;