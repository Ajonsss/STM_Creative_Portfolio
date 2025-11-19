import Header from "/src/components/Header.jsx";
import StationOne from "./components/StationOne.jsx";
import StationTwo from "./components/StationTwo.jsx";
import StationThree from "./components/StationThree.jsx";

import {useState} from "react";


function App() {
  



  return (
    <>
    
        <Header name="Macky"/>
        

          <main className="main">
            <StationOne/>
            <StationTwo/>
            <StationThree/>
          </main>
    </>
  )
}

export default App
