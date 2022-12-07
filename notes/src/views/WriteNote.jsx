import {  useNavigate } from "react-router-dom";
import { signOutUser } from '../componentes/google';
import './writeNote.css'

const homeImages = require.context('../img', true)

export default function WriteNote(props) {
    const navigate = useNavigate();
    const getOut=props.logOut
    console.log(props);

    const signOutFromWriteNote= async()=> {
        await signOutUser();
        getOut();
        navigate("/");
       console.log("go away!");
      }

      const handleBacktoHome= async()=> {
        await navigate();
        navigate("/Home");
      }

    return (
        <div className='writeNote'>

            <img
                src={homeImages(`./title-mini.png`)}
                alt={""}
                className="labnote-miniLogo"
            />

            <button className="go-out" type="button" onClick={() => { signOutFromWriteNote() }}> </button>

            <form>

                <input className="note-title" type="text" name="Title" value="Title:" />
                <input className="note-content" type="text" name="Content" value="Content:" />
                <button className="saveNote" type="button"> </button>

            </form>

            <button className="saveNote" type="button"> </button>

            <footer className="containerFooter"> </footer>

            <img
                src={homeImages(`./menu.png`)}
                alt={""}
                className="menu"
            />
            <button className="go-backto-home" type="button" onClick={() => { handleBacktoHome() }}> </button>
            {/* <button className="go-out" type="button" onClick={() => { signOutFromWriteNote() }}> </button> */}

        </div>

    )
}