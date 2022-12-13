import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOutUser } from '../componentes/google';
import { getAuth } from "firebase/auth";
import React, { useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../firebase/config";
import Home from "./Home";
import { WriteNote } from "./WriteNote";
import './GetNotes.css';



const db = getFirestore(app);
const auth = getAuth(app);

const homeImages = require.context('../img', true)

export default function GetNotes(props, { userEmail }) {
    const getOut = props.logOut
    const navigate = useNavigate();

    const [user, setUser] = useState('')
    const [list, setList] = useState(null)  //va a comenzar con un arreglo vació. (aquí traeremos las notes)
    const [subId, setSubId] = useState('') //almacenará una cadena vacía, por inicio, ya que al hacer lapetición, almacenaremos informacion.
    const handleSignOutNewNote = async () => {
        await navigate();
        navigate("/WriteNote");
        console.log("hello user");
    }
    const signOutFromWriteNote = async () => {
        await signOutUser();
        getOut();
        navigate("/");
        console.log("go away!");
    }


    const handleBacktoWriteNote = async () => {
        await navigate();
        navigate("/WriteNote");

    }
    //función para renderizar la lista de usuarios
    //es un hook nos permite montar este componente de nuestra app, y renderizarlo las veces que necesitemos.
    useEffect(() => {           //va a recibir un callback
        const getCollection = async () => {
            try {

                const querySnapshot = await getDocs(collection(db, "Users"))
                const docs = []                //va a inciar como un array vacío
                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id })         //se une con push el id  del doc, con los campos del documento

                })
                setList(docs)
            } catch (error) {
                console.log(error);
            }
        }

        getCollection() //aquí se invoca la función


    }, [])    //a travez de los corchetes nosotros le daremos la dependencia o no si la necesita el useEffect.
    //la variable de estado es la dependencia que es--- (list) 
    /*Aquí es donde useEffect  va a montar el componente (lo que está en list) cada vez que escuche un cambio 
    en la variable de estado*/

    // upgrade NOTE

    //hook para editar mi nota... Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns. 
    useEffect(() => {
        if (subId !== '') { //si nuestra variable de estado (subId) no está vacía. llama a la función upgradeNote, para pasarle un parámetro(subId), se le pasa contenido con ese parametro.
            upgradeNote(subId)
        }

    }, [subId])  //aquí se crea la dependencia, este useEffect solo se reenderizará, solo cuando el subId tenga cambios (contenido).



    //gif loading
    if (!list) {
        return (<img className="loading-gif" src={homeImages(`./loading.gif`)} alt={""}></img>);
        //return(<h2>Descargando..</h2>)

    }

    const upgradeNote = async (id) => {
        try {                             //petición a firebase
            const docRef = doc(db, "Users", id)  //recibe 3 parametros
            const docSnap = await getDoc(docRef)  //almacena la petición de lo que tenemos en docRef, utilizando la funcionalidad de getDoc (solo un documento)
            setUser(docSnap.data())        //permite alterar la variable de estado. // aquí se guardará lo que esté en docSnap.. toda la info, campos, valores.

        } catch (error) {
            console.log(error);
        }
        console.log(upgradeNote);
    }

    //funcion para eliminar la nota del usuario
    const deleteNote = async (id) => {
        await deleteDoc(doc(db, "Users", id))

    }

    return (
        <div className='writeNote'>

            <p><strong>{userEmail}</strong></p>

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


            {/* aquí se almacenará la colección de notas de FIREbase */}

            <div className="big-container">

                <div className="container-card">
                    {list.length === 0 && <Home />}
                    {

                        // de este mapeo tendremos una nueva lista, se va a crear la interfaz donde se colocaran las notesen el contenedor padre.
                        list.map(list => (
                            <div className="card-body" key={list.id}>      {/* contenedor padre */}
                                <div className="title-p">{list.Title}</div>
                                <div className="content-p">{list.Content}</div>


                                <img src={homeImages('./deleteBtn1.png')} alt={""} className="btn-delete" onClick={() => { deleteNote(list.id) }}></img>

                                <img src={homeImages('./pencil.png')} alt={""} className="btn-upgrade m-2" onClick={() => setSubId(list.id)}></img>
                                

                            </div>


                        ))

                    }


                </div>
            </div>

            <footer className="containerFooter"> </footer>
            <img src={homeImages('./add-newNote.png')} alt={""} className="add-new-note" onClick={() => { handleSignOutNewNote() }}></img>
            <img
                src={homeImages(`./menu.png`)}
                alt={""}
                className="menu"
            />
            <button className="go-backto-home" type="button" onClick={() => { handleBacktoWriteNote() }}> </button>

        </div>

    )
}