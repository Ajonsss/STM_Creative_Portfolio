import React, { useState, useEffect } from "react";

const Navbar = ({ onScrollTo }) => (
  <nav className="navbar">
    <div className="navbar-container">
      <div className="logo">Andrae Ajon</div>
      <div className="nav-links">
        <button onClick={() => onScrollTo('about')}>About Me</button>
        <button onClick={() => onScrollTo('portfolio')}>My Projects</button>
        <button onClick={() => onScrollTo('skills')}>Skills</button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section id="hero" className="hero-section">
    <h1 className="hero-title">See Through Me</h1>
    <p className="hero-subtitle">Portfolio by Andrae Ajon</p>
    <p className="hero-subtitle" >0992-495-6943</p>
    <a className="hero-subtitle" href="https://www.facebook.com/yepitsDrae">Facebook</a>
    <a className="hero-subtitle" href="https://www.instagram.com/yepitsdrae/">Instagram</a>
    <a className="hero-subtitle" href="https://www.linkedin.com/in/andraeajon/">LinkedIn</a>
  </section>
);

const AboutSection = ({ profile, timeline }) => {
  const education = timeline.filter(t => t.type === 'education');
  const work = timeline.filter(t => t.type === 'work');

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="profile-card">
            <div className="profile-img-container">
              <img src={profile.image_url || "https://via.placeholder.com/300"} alt="Profile" />
            </div>
            <div className="profile-bio">
              <h3>Andrae Ajon</h3>
              <p>{profile.bio || "No bio available yet."}</p>
            </div>
          </div>
          <div className="timeline-container">
            {work.length > 0 && (
              <div className="timeline-block">
                <h3>💼 Work Experience</h3>
                {work.map(item => (
                  <div key={item.id} className="timeline-item">
                    <span className="timeline-date">{item.duration}</span>
                    <h4>{item.title}</h4>
                    <span className="timeline-sub">{item.subtitle}</span>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div className="timeline-block">
                <h3>🎓 Education</h3>
                {education.map(item => (
                  <div key={item.id} className="timeline-item">
                    <span className="timeline-date">{item.duration}</span>
                    <h4>{item.title}</h4>
                    <span className="timeline-sub">{item.subtitle}</span>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = ({ skills }) => (
  <section id="skills" className="section skills-section">
    <div className="container">
      <h2 className="section-title">My Skills</h2>
      <div className="grid skills-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <h3>{skill.title}</h3>
            <span>{skill.category}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Portfolio = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isImageExpanded, setIsImageExpanded] = useState(null);

  const getImages = (project) => {
    if (!project.image_url) return [];
    return project.image_url.split(',');
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsImageExpanded(null);
  };

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="container">
        <h2 className="section-title">Portfolio Showcase</h2>
        <div className="grid portfolio-grid">
          {projects.map((project) => {
            const images = getImages(project);
            const mainImage = images.length > 0 ? images[0] : "https://via.placeholder.com/400x300";

            return (
              <div key={project.id} onClick={() => setSelectedProject(project)} className="portfolio-card">
                <div className="card-image-wrapper">
                  <img src={mainImage} alt={project.title} />
                  {images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      +{images.length - 1} More
                    </div>
                  )}
                </div>
                <div className="card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-x-auto whitespace-nowrap p-2 bg-gray-100">
                {getImages(selectedProject).map((imgUrl, index) => (
                    <img 
                        key={index}
                        src={imgUrl}
                        alt={`Screenshot ${index + 1}`}
                        onClick={() => setIsImageExpanded(imgUrl)}
                        className="inline-block h-64 w-auto mr-2 cursor-zoom-in hover:opacity-90 transition object-cover border-2 border-transparent hover:border-blue-500"
                    />
                ))}
            </div>

            <div className="modal-body">
              <h2>{selectedProject.title}</h2>
              <div className="modal-meta">
                {selectedProject.company && <span className="meta-tag">🏢 {selectedProject.company}</span>}
                {selectedProject.duration && <span className="meta-tag">⏳ {selectedProject.duration}</span>}
              </div>
              <p className="modal-desc">{selectedProject.description}</p>
              <hr />
              <h4>Project Details</h4>
              <p>{selectedProject.full_details}</p>
              <button onClick={handleCloseModal} className="close-btn">Close Project</button>
            </div>
          </div>
        </div>
      )}

      {isImageExpanded && (
        <div 
            className="fixed inset-0 z-[3000] bg-black/95 flex justify-center items-center cursor-zoom-out p-4"
            onClick={(e) => { e.stopPropagation(); setIsImageExpanded(null); }}
        >
            <img src={isImageExpanded} alt="Full Size" className="max-w-full max-h-full object-contain shadow-2xl" />
            <button className="absolute top-6 right-6 text-white text-4xl font-bold">&times;</button>
        </div>
      )}
    </section>
  );
};

const HeroEnd = () => (
  <section id="hero" className="hero-section">
    <h1 className="hero-title">Contact Me Now!</h1>
    <p className="hero-subtitle" >0992-495-6943</p>
    <a className="hero-subtitle" href="https://www.facebook.com/yepitsDrae">Facebook</a>
    <a className="hero-subtitle" href="https://www.instagram.com/yepitsdrae/">Instagram</a>
    <a className="hero-subtitle" href="https://www.linkedin.com/in/andraeajon/">LinkedIn</a>
  </section>
);



const AdminDashboard = ({ onLogout, onRefresh, skills, projects, profile, timeline }) => {
  const [activeTab, setActiveTab] = useState('projects');
  
  const [projId, setProjId] = useState(null); 
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projDetails, setProjDetails] = useState("");
  const [projDuration, setProjDuration] = useState("");
  const [projCompany, setProjCompany] = useState("");
  const [projFiles, setProjFiles] = useState(null);

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
    setProjId(null); setProjTitle(""); setProjDesc(""); setProjDetails(""); setProjFiles(null); setProjDuration(""); setProjCompany(""); 
    document.getElementById('projFileInput').value = ""; 
    onRefresh();
  };

  const handleEditProject = (p) => {
    setProjId(p.id); setProjTitle(p.title); setProjDesc(p.description); setProjDetails(p.full_details);
    setProjDuration(p.duration); setProjCompany(p.company);
    document.getElementById('projectForm').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteProject = async (id) => { await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' }); onRefresh(); };
  const handleCancelEdit = () => { setProjId(null); setProjTitle(""); setProjDesc(""); setProjDetails(""); setProjFiles(null); setProjDuration(""); setProjCompany(""); };
  
  // Other Handlers
  const handleProfileUpdate = async (e) => { e.preventDefault(); const fd = new FormData(); fd.append('bio', bio); if(profilePic) fd.append('image', profilePic); await fetch('http://localhost:5000/api/profile', { method: 'POST', body: fd }); alert("Profile Updated!"); onRefresh(); };
  const handleTimelineAdd = async (e) => { e.preventDefault(); await fetch('http://localhost:5000/api/timeline', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type:tlType, title:tlTitle, subtitle:tlSub, duration:tlDuration, description:tlDesc}) }); setTlTitle(""); setTlSub(""); setTlDuration(""); setTlDesc(""); onRefresh(); };
  const handleDeleteTimeline = async (id) => { await fetch(`http://localhost:5000/api/timeline/${id}`, { method: 'DELETE' }); onRefresh(); };
  const handleSkillAdd = async (e) => { e.preventDefault(); await fetch('http://localhost:5000/api/skills', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({title:skillTitle, category:skillCat}) }); setSkillTitle(""); setSkillCat(""); onRefresh(); };
  const handleDeleteSkill = async (id) => { await fetch(`http://localhost:5000/api/skills/${id}`, { method: 'DELETE' }); onRefresh(); };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <div className="admin-header"><h1>Admin Dashboard</h1><button onClick={onLogout} className="logout-link">Logout</button></div>
        <div className="admin-tabs">
          <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>Projects</button>
          <button className={activeTab === 'skills' ? 'active' : ''} onClick={() => setActiveTab('skills')}>Skills</button>
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile & CV</button>
        </div>

        <div className="admin-content">
          {activeTab === 'projects' && (
             <div className="grid-2-col">
                <div className="admin-section">
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h3>{projId ? "Edit Project" : "Add New Project"}</h3>
                    {projId && <button onClick={handleCancelEdit} className="cancel-btn">Cancel Edit</button>}
                  </div>
                  <form id="projectForm" onSubmit={handleProjectSubmit} className="admin-form">
                    <input className="form-input" placeholder="Project Title" value={projTitle} onChange={e => setProjTitle(e.target.value)} required />
                    <input className="form-input" placeholder="Company / Client" value={projCompany} onChange={e => setProjCompany(e.target.value)} />
                    <input className="form-input" placeholder="Duration (e.g., 3 months)" value={projDuration} onChange={e => setProjDuration(e.target.value)} />
                    <input className="form-input" placeholder="Short Description" value={projDesc} onChange={e => setProjDesc(e.target.value)} required />
                    <div style={{marginBottom:'1rem'}}>
                      <label className="input-label">Project Images {projId && "(Select multiple to replace current)"}</label>
                      <input id="projFileInput" type="file" multiple className="form-input" onChange={e => setProjFiles(e.target.files)} />
                    </div>
                    <textarea className="form-input" placeholder="Full Project Details" rows="4" value={projDetails} onChange={e => setProjDetails(e.target.value)} required />
                    <button className="form-btn">{projId ? "Update Project" : "Add Project"}</button>
                  </form>
                </div>

                <div className="admin-section">
                  <h3>Current Portfolio</h3>
                  <div className="admin-list">
                    {projects.map(p => {
                        const thumbs = p.image_url ? p.image_url.split(',') : [];
                        const mainThumb = thumbs.length > 0 ? thumbs[0] : "https://via.placeholder.com/50";
                        return (
                          <div key={p.id} className="project-list-item">
                            <img src={mainThumb} alt="thumb" className="list-thumb"/>
                            <div className="list-info">
                              <strong>{p.title}</strong>
                              <span>{thumbs.length} image{thumbs.length !== 1 && 's'}</span>
                            </div>
                            <div className="list-actions">
                              <button onClick={() => handleEditProject(p)} className="edit-btn">Edit</button>
                              <button onClick={() => handleDeleteProject(p.id)} className="delete-btn">Delete</button>
                            </div>
                          </div>
                        )
                    })}
                  </div>
                </div>
             </div>
          )}

          {activeTab === 'skills' && (
            <div className="admin-section">
               <form onSubmit={handleSkillAdd} className="admin-form">
                 <h3>Add Skill</h3>
                 <input className="form-input" placeholder="Skill" value={skillTitle} onChange={e => setSkillTitle(e.target.value)} />
                 <input className="form-input" placeholder="Category" value={skillCat} onChange={e => setSkillCat(e.target.value)} />
                 <button className="form-btn">Add Skill</button>
               </form>
               <div className="admin-list">
                  {skills.map(s => <div key={s.id} className="list-item"><span>{s.title}</span><button onClick={() => handleDeleteSkill(s.id)} className="delete-icon">🗑️</button></div>)}
               </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="grid-2-col">
              <div className="admin-section">
                <h3>Edit Bio</h3>
                <form onSubmit={handleProfileUpdate} className="admin-form">
                   <div style={{marginBottom:'1rem'}}>
                     <label className="input-label">Profile Picture</label>
                     <input type="file" className="form-input" onChange={e => setProfilePic(e.target.files[0])} />
                   </div>
                   <textarea className="form-input" rows="5" value={bio} onChange={e => setBio(e.target.value)} />
                   <button className="form-btn">Update Bio</button>
                </form>
              </div>
              <div className="admin-section">
                <h3>Add Timeline Entry</h3>
                <form onSubmit={handleTimelineAdd} className="admin-form">
                  <select className="form-input" value={tlType} onChange={e => setTlType(e.target.value)}>
                    <option value="work">Work Experience</option>
                    <option value="education">Education</option>
                  </select>
                  <input className="form-input" placeholder="Title" value={tlTitle} onChange={e => setTlTitle(e.target.value)} />
                  <input className="form-input" placeholder="Subtitle" value={tlSub} onChange={e => setTlSub(e.target.value)} />
                  <input className="form-input" placeholder="Duration" value={tlDuration} onChange={e => setTlDuration(e.target.value)} />
                  <textarea className="form-input" placeholder="Description" rows="2" value={tlDesc} onChange={e => setTlDesc(e.target.value)} />
                  <button className="form-btn">Add Entry</button>
                </form>
                <div className="admin-list">
                  {timeline.map(t => <div key={t.id} className="list-item"><div><strong>{t.type.toUpperCase()}:</strong> {t.title}</div><button onClick={() => handleDeleteTimeline(t.id)} className="delete-icon">🗑️</button></div>)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  if(!isOpen) return null;
  return (
    <div className="modal-overlay"><div className="login-box"><button onClick={onClose} className="modal-close-icon">✕</button><h2>Login</h2><form onSubmit={e => {e.preventDefault(); onLogin(username, password)}}><input className="form-input" placeholder="User" value={username} onChange={e=>setUsername(e.target.value)}/><input className="form-input" type="password" placeholder="Pass" value={password} onChange={e=>setPassword(e.target.value)}/><button className="form-btn login-btn">Login</button></form></div></div>
  );
};

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
    if(data.success) { setShowLogin(false); setView("admin"); } else alert("Failed");
  };

  const scrollToSection = (id) => { const el = document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth'}); };
  if(view === 'admin') return <AdminDashboard onLogout={()=>setView('home')} onRefresh={fetchData} skills={skills} projects={projects} profile={profile} timeline={timeline} />;

  return (
    <div className="app-root">
      <Navbar onScrollTo={scrollToSection} />
      <Hero />
      <AboutSection profile={profile} timeline={timeline} />
      <Skills skills={skills} />
      <Portfolio projects={projects} />
      <HeroEnd />
      <footer className="footer"><p>© 2025 Andrae Ajon</p><button onClick={()=>setShowLogin(true)} className="footer-login-btn">Admin Login</button></footer>
      <LoginModal isOpen={showLogin} onClose={()=>setShowLogin(false)} onLogin={handleLogin} />
    </div>
  );
}

export default App;