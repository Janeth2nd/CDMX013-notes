import { signOutUser } from '../componentes/google';
import { useNavigate } from "react-router-dom";
import './home.css'

const homeImages = require.context('../img', true)

export default function Home(logOut) {
    const navigate = useNavigate();

    const handleSignOutNewNote = async () => {
        await navigate();
        navigate("/writeNote");
    }

    const handleSignOut = async () => {
        await signOutUser(logOut);
        navigate("/");
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
                src={homeImages(`./spot-light.png`)}
                alt={""}
                className="spotlight-img"
            />

            <img
                src={homeImages(`./writeNew-note.png`)}
                alt={""}
                className="writenote-text"
            />

            <footer className="containerFooter"> </footer>

            <img src={homeImages('./add-newNote.png')} alt={""} className="add-new-note" onClick={() => { handleSignOutNewNote() }}></img>

            <img
                src={homeImages(`./menu.png`)}
                alt={""}
                className="menu"
            />

        </div>
    )
}