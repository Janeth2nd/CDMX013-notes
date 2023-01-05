import { getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirestore, doc } from "firebase/firestore";
import { app } from "../firebase/config";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOutUser } from '../componentes/google';
import './editNote1.css';

const db = getFirestore(app);
const homeImages = require.context('../img', true)

export default function EditNote1({ list, logOut }) { //userWriteNote
    const navigate = useNavigate();

    const [note, setNote] = useState({   //declaración del estado
        Title: "",
        Content: "",
    });  //anteriormente era solo un objeto vacío useState({})

   
    let { id } = useParams();
    const handleBacktoHome = async () => {
        await navigate();
        navigate("/Home");
    }
    const signOutFromWriteNote = async () => {
        await signOutUser();
        logOut();
        navigate("/");
    }
    
    const catchInput = (e) => {

        const { name, value } = e.target;
        setNote({ ...note, [name]: value })
    }
    //con useEffect(tendremos una dependencia) hacemos la petición de un solo documento para saber si se renderizará o no.
    useEffect(() => {
        const getDocToEdit = () => {  //petición al servidor

            const docRef = doc(db, "Users", id)
            return getDoc(docRef)

        }
        getDocToEdit().then(result => {
            setNote(result.data())
        })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])  //aquí se va a renderizar, siempre y cuando Id tenga contenio, cambios. 
    //console.log(note)
    
    //Save new notes (upgrade)
    const saveUpgradeNote = async (e) => {
        e.preventDefault();

        if (note.Title !== "" && note.Content !== "") {
            try {
                await setDoc(doc(db, 'Users', id), {
                    ...note
                })
                setNote({
                    Title: "",
                    Content: ""
                });

            } catch (error) {
                console.log(error);
            }
            navigate("/home");

        } else {
            alert("You can't send an empty note");
        }
    }

    return (

        <div className='writeNote'>
            <img
                src={homeImages(`./userIcon.png`)}
                alt={""}
                className="user-icon"
            />

            <img
                src={homeImages(`./title-mini.png`)}
                alt={""}
                className="labnote-miniLogo"
            />
            <button className="go-out" type="button" onClick={() => { signOutFromWriteNote() }}> </button>

            <div className="row">
                <form onSubmit={saveUpgradeNote}>
                    <div className="form-group">


                        {/* <input className="title-p" name="Title" value={note.Title} onChange={catchInput} /> */}
                        <input type="text" name="Title" className="note-title" placeholder="Title:" maxLength="40" onChange={catchInput} value={note.Title} />
                        {/* <input className="content-p" name="Content" value={note.Content} onChange={catchInput} /> */}
                        <textarea name="Content" className="note-content" placeholder="Content:" maxLength="80" autoComplete="off" onChange={catchInput} value={note.Content}></textarea>
                        {/* <img src={homeImages('./pencil.png')} alt={""} className="btn-upgrade2" type="button" onClick={() => setNote(list.id)}></img> */}

                    </div>
                    
                    <button className="saveNote"></button>
                    <footer className="containerFooter"> </footer>
                    <button className="go-backto-home" type="button" onClick={() => { handleBacktoHome() }}> </button>

                </form>
            </div >
        </div >
    )
}