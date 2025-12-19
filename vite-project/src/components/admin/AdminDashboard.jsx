import React, { useState } from "react";
import { LogOut, Code2, Trash2, X } from "lucide-react";
import BackgroundMesh from "../layout/BackgroundMesh";

const AdminDashboard = ({ onLogout, onRefresh, skills, projects, profile, timeline }) => {
  const [activeTab, setActiveTab] = useState('projects');
  
  // State Management
  const [projId, setProjId] = useState(null); 
  const [projTitle, setProjTitle] = useState(""); const [projDesc, setProjDesc] = useState(""); const [projDetails, setProjDetails] = useState(""); const [projDuration, setProjDuration] = useState(""); const [projCompany, setProjCompany] = useState(""); const [projFiles, setProjFiles] = useState(null);
  const [skillTitle, setSkillTitle] = useState(""); const [skillCat, setSkillCat] = useState("");
  const [bio, setBio] = useState(profile.bio || ""); const [profilePic, setProfilePic] = useState(null);
  const [tlType, setTlType] = useState("work"); const [tlTitle, setTlTitle] = useState(""); const [tlSub, setTlSub] = useState(""); const [tlDuration, setTlDuration] = useState(""); const [tlDesc, setTlDesc] = useState("");

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const url = projId ? `http://localhost:5000/api/projects/${projId}` : 'http://localhost:5000/api/projects';
    const method = projId ? 'PUT' : 'POST';
    const fd = new FormData();
    fd.append('title', projTitle); fd.append('desc', projDesc); fd.append('fullDetails', projDetails);
    fd.append('duration', projDuration); fd.append('company', projCompany);
    if(projFiles) { for (let i = 0; i < projFiles.length; i++) { fd.append('images', projFiles[i]); } }
    await fetch(url, { method: method, body: fd });
    resetProjectForm(); onRefresh();
  };
  
  const resetProjectForm = () => { setProjId(null); setProjTitle(""); setProjDesc(""); setProjDetails(""); setProjFiles(null); setProjDuration(""); setProjCompany(""); document.getElementById('projFileInput').value = ""; };
  const handleEditProject = (p) => { setProjId(p.id); setProjTitle(p.title); setProjDesc(p.description); setProjDetails(p.full_details); setProjDuration(p.duration); setProjCompany(p.company); setActiveTab('projects'); };
  const handleDeleteProject = async (id) => { await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' }); onRefresh(); };
  const handleProfileUpdate = async (e) => { e.preventDefault(); const fd = new FormData(); fd.append('bio', bio); if(profilePic) fd.append('image', profilePic); await fetch('http://localhost:5000/api/profile', { method: 'POST', body: fd }); onRefresh(); alert("Updated!"); };
  const handleTimelineAdd = async (e) => { e.preventDefault(); await fetch('http://localhost:5000/api/timeline', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type:tlType, title:tlTitle, subtitle:tlSub, duration:tlDuration, description:tlDesc}) }); onRefresh(); };
  const handleDeleteTimeline = async (id) => { await fetch(`http://localhost:5000/api/timeline/${id}`, { method: 'DELETE' }); onRefresh(); };
  const handleSkillAdd = async (e) => { e.preventDefault(); await fetch('http://localhost:5000/api/skills', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({title:skillTitle, category:skillCat}) }); onRefresh(); setSkillTitle(""); setSkillCat(""); };
  const handleDeleteSkill = async (id) => { await fetch(`http://localhost:5000/api/skills/${id}`, { method: 'DELETE' }); onRefresh(); };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-4 md:p-8 font-sans">
      <BackgroundMesh />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 h-[90vh]">
        {/* Glass Sidebar */}
        <aside className="bg-gray-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 flex flex-col h-full">
           <div className="mb-10 px-2">
             <div className="text-xl font-bold text-white tracking-tight">Admin<span className="text-blue-500">.</span></div>
           </div>
           <nav className="flex-1 space-y-2">
             {['projects', 'skills', 'profile'].map(tab => (
               <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-2xl transition-all font-medium ${activeTab === tab ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
               >
                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
               </button>
             ))}
           </nav>
           <button onClick={onLogout} className="mt-auto px-4 py-3 rounded-2xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm font-bold flex items-center gap-2">
             <LogOut size={16}/> Logout
           </button>
        </aside>

        {/* Main Glass Content Area */}
        <main className="bg-gray-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 overflow-y-auto custom-scrollbar relative">
          
          {activeTab === 'projects' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white sticky top-0 bg-transparent backdrop-blur-md z-10 py-2">Create / Edit</h2>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <input className="glass-input" placeholder="Title" value={projTitle} onChange={e => setProjTitle(e.target.value)} required />
                  <div className="grid grid-cols-2 gap-4">
                    <input className="glass-input" placeholder="Company" value={projCompany} onChange={e => setProjCompany(e.target.value)} />
                    <input className="glass-input" placeholder="Duration" value={projDuration} onChange={e => setProjDuration(e.target.value)} />
                  </div>
                  <input className="glass-input" placeholder="Short Desc" value={projDesc} onChange={e => setProjDesc(e.target.value)} required />
                  <textarea className="glass-input min-h-[150px]" placeholder="Full Details" value={projDetails} onChange={e => setProjDetails(e.target.value)} required />
                  <input id="projFileInput" type="file" multiple className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-white/10 file:text-white file:border-0 hover:file:bg-white/20" onChange={e => setProjFiles(e.target.files)} />
                  <button className="w-full py-4 rounded-2xl bg-white text-black font-bold hover:bg-gray-200 transition-colors shadow-lg">
                    {projId ? 'Update Project' : 'Publish Project'}
                  </button>
                  {projId && <button type="button" onClick={resetProjectForm} className="w-full py-2 text-gray-400 hover:text-white">Cancel</button>}
                </form>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white sticky top-0 bg-transparent backdrop-blur-md z-10 py-2">Library</h2>
                {projects.map(p => (
                  <div key={p.id} className="p-4 rounded-3xl bg-white/5 border border-white/5 flex gap-4 items-center group hover:bg-white/10 transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-black/50 overflow-hidden">
                      <img src={p.image_url?.split(',')[0]} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{p.title}</h4>
                      <p className="text-xs text-gray-400">{p.company}</p>
                    </div>
                    <div className="flex gap-2">
                       <button onClick={() => handleEditProject(p)} className="p-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"><Code2 size={16}/></button>
                       <button onClick={() => handleDeleteProject(p.id)} className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
             <div className="grid md:grid-cols-[1fr_2fr] gap-8">
               <div className="bg-white/5 p-6 rounded-3xl border border-white/5 h-fit">
                 <h3 className="text-lg font-bold mb-4">Add Skill</h3>
                 <form onSubmit={handleSkillAdd} className="space-y-3">
                   <input className="glass-input" placeholder="Name" value={skillTitle} onChange={e => setSkillTitle(e.target.value)} required />
                   <input className="glass-input" placeholder="Category" value={skillCat} onChange={e => setSkillCat(e.target.value)} required />
                   <button className="w-full py-3 rounded-xl bg-white text-black font-bold mt-2">Add</button>
                 </form>
               </div>
               <div className="flex flex-wrap gap-2 content-start">
                 {skills.map(s => (
                   <div key={s.id} className="pl-4 pr-2 py-2 rounded-full bg-black/40 border border-white/10 flex items-center gap-2">
                     <span className="text-sm font-medium">{s.title}</span>
                     <button onClick={() => handleDeleteSkill(s.id)} className="p-1 rounded-full hover:bg-red-500/50 hover:text-white text-gray-500"><X size={14}/></button>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-8">
               <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5">
                 <h3 className="text-xl font-bold mb-6">Profile Bio</h3>
                 <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <textarea className="glass-input h-32" value={bio} onChange={e => setBio(e.target.value)} />
                    <input type="file" className="text-sm text-gray-500" onChange={e => setProfilePic(e.target.files[0])} />
                    <button className="px-8 py-3 rounded-xl bg-white text-black font-bold">Save Changes</button>
                 </form>
               </div>
               
               <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5">
                 <h3 className="text-xl font-bold mb-6">Timeline Events</h3>
                 <form onSubmit={handleTimelineAdd} className="grid grid-cols-2 gap-4 mb-8">
                    <select className="glass-input" value={tlType} onChange={e => setTlType(e.target.value)}><option value="work">Work</option><option value="education">Education</option></select>
                    <input className="glass-input" placeholder="Title" value={tlTitle} onChange={e => setTlTitle(e.target.value)} />
                    <input className="glass-input" placeholder="Subtitle" value={tlSub} onChange={e => setTlSub(e.target.value)} />
                    <input className="glass-input" placeholder="Date" value={tlDuration} onChange={e => setTlDuration(e.target.value)} />
                    <button className="col-span-2 py-3 bg-white text-black rounded-xl font-bold">Add Event</button>
                 </form>
                 <div className="space-y-2">
                   {timeline.map(t => <div key={t.id} className="p-4 rounded-xl bg-black/20 flex justify-between items-center"><span className="font-bold">{t.title}</span><button onClick={()=>handleDeleteTimeline(t.id)} className="text-red-400"><Trash2 size={16}/></button></div>)}
                 </div>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;