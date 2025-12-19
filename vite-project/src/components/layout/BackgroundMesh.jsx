import React from "react";

const BackgroundMesh = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/30 rounded-full blur-[100px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[100px] animate-pulse delay-1000" />
    <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-cyan-500/20 rounded-full blur-[80px]" />
  </div>
);

export default BackgroundMesh;