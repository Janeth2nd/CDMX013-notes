import { signOutUser } from '../componentes/google';
import {  useNavigate } from "react-router-dom";
import './home.css'


export default function Home(props) { 
    const navigate = useNavigate();
    const getOut=props.logOut
    //return <h1>Home</h1>
   const homeImages = require.context('../img', true)
   
   const handleSignOut= async()=> {
    await signOutUser();
    getOut();
    navigate("/");
   console.log("go away!");
  }
    return (
        <div className='home'>

            <img
                src={homeImages(`./title-mini.png`)}
                alt={""}
                className="labnote-miniLogo"
            />

            <img
                src={homeImages(`./userIcon.png`)}
                alt={""}
                className="user-icon"
            />

            <button className="go-out" type="button" onClick={() => { handleSignOut() }}> </button>

            
            <img
                src={homeImages(`./writeNew-note.png`)}
                alt={""}
                className="writenote-text"
            />
            <img
                src={homeImages(`./spot-light.png`)}
                alt={""}
                className="spotlight-img"
            />

            <footer className="containerFooter"> </footer>
            <img
                src={homeImages(`./add-newNote.png`)}
                alt={""}
                className="add-new-note"
            />
            <img
                src={homeImages(`./menu.png`)}
                alt={""}
                className="menu"
            />
        

        </div>
    )
}