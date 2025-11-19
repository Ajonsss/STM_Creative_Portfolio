import page1 from "../assets/PAGE 1.png";
import List from "./List.jsx";
import bg1 from "../assets/bg1.jpg";

{/* This is for form hook */}
import {useState} from "react";

const StationTwo = () => {

{/* This is for form hook */}
const [Title, setTitle] = useState('');
const [Titles, setTitles] = useState([]);

const handleSubmit = (e) =>{
    e.preventDefault();


    setTitle([...Titles, Title]);

    console.log(Title)
}

    return(
        <>

        
        <div className="mainnavtwo" style={{ backgroundImage: `url(${bg1})` }}>
            {/* This is for form hook */}
            <form onSubmit={handleSubmit}>
            <input className="input" 
                type="text" 
                name="name" 
                onChange={(e) => setTitle(e.target.value)}/>

            <button className="submit" type="submit">Submit</button>

            <h1 className="offer">What I Offer</h1>

            
            <div className="services">

                <div className="cardone">
                    <img src={page1} alt="" />
                    
                    <div className="cardoption">
                        {/* This is for form hook */}
                        <h1>{Title}</h1>
                        <h2>NCompass TV</h2>
                        <h3>August 2025 - Current</h3>
                    </div>
                    
                </div>
                <List Title={Title} />
            </div>
            </form>
            
        </div>
        </>

    );

}

export default StationTwo;