import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOutUser } from '../componentes/google';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase/config";
import './writeNote.css';

const db = getFirestore(app);
const homeImages = require.context('../img', true)

export default function WriteNote(props) {

    const getOut = props.logOut
   // const initialValue=props.initialValue
    //const catchInputs=props.catchInput
    const navigate = useNavigate();

    const initialValue = {
        Title: '',
         Content: ''
     }

    const [userWriteNote, setUserWriteNote] = useState(initialValue)

    const catchInputs = (e) => {

    const { name, value } = e.target;
    setUserWriteNote({ ...userWriteNote, [name]: value })
    }

    const saveInputs = async (e) => {
        e.preventDefault();
        console.log(userWriteNote, "heellooo");
        if (userWriteNote.Title !== "" && userWriteNote.Content !== "") {
            try {
                await addDoc(collection(db, 'Users'), {
                    ...userWriteNote
                })

            } catch (error) {
                console.log(error);
            }
            navigate("/getNotes");
            setUserWriteNote({ ...initialValue })
        } else {
            alert("You can't send an empty note");
        }
    }

    const signOutFromWriteNote = async () => {
        await signOutUser();
        getOut();
        navigate("/");
        console.log("go away!");
    }

    const handleBacktoHome = async () => {
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

            <div className="row">
                <form onSubmit={saveInputs}>
                    <div className="form-group">

                        <input type="text" name="Title" className="note-title" placeholder="Title:" maxLength="40"
                            onChange={catchInputs} value={userWriteNote.Title} />
                        <textarea name="Content" className="note-content" placeholder="Content:" maxLength="80" autoComplete="off" onChange={catchInputs} value={userWriteNote.Content}></textarea>

                    </div>
                    <button className="saveNote"></button>
                </form>
            </div>

            <footer className="containerFooter"> </footer>

            <img
                src={homeImages(`./menu.png`)}
                alt={""}
                className="menu"
            />
            <button className="go-backto-home" type="button" onClick={() => { handleBacktoHome() }}> </button>

        </div>
    )
}