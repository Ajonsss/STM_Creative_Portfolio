import check from "../assets/check.png"
import logo from "../assets/logo.png"
import {useState} from "react";


const Header = () => {

    const [Title, setTitle] = useState('');

    return(
        <>
        <div className="mainnav">
            <div className="nava">
                <a href="">About Me</a>
                <a href="">Projects</a>
                <a href="">Get in Touch</a>
                <input className="input" type="text" name="name" onChange={(e) => setTitle(e.target.value)}/>
                <h1>Hello {Title}!</h1>
             </div>
        </div>
        </>

    );

}

export default Header;