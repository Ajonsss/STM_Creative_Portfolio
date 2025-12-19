import React, { useState } from "react";
import { X } from "lucide-react";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  if(!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-gray-900/80 border border-white/10 p-8 rounded-[2.5rem] w-full max-w-sm shadow-2xl relative backdrop-blur-xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20}/></button>
        <h2 className="text-2xl font-bold text-center text-white mb-6">Access</h2>
        <form onSubmit={e => {e.preventDefault(); onLogin(username, password)}} className="space-y-4">
          <input className="glass-input text-center" placeholder="ID" value={username} onChange={e=>setUsername(e.target.value)}/>
          <input className="glass-input text-center" type="password" placeholder="PIN" value={password} onChange={e=>setPassword(e.target.value)}/>
          <button className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-gray-200 transition-all shadow-lg mt-2">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;