import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOutUser } from '../componentes/google';
import { getAuth } from "firebase/auth";
import React, { useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../firebase/config";
import './writeNote.css';

const db = getFirestore(app);
const auth = getAuth(app);

const homeImages = require.context('../img', true)

export default function WriteNote(props, { userEmail }) {
    const navigate = useNavigate();

    const initialValue = {
        Title: '',
        Content: ''
    }

    //variables de estado
    const [user, setUser] = useState(initialValue)
    const [list, setList] = useState([])  //va a comenzar con un arreglo vació. (aquí traeremos las notes)

    const catchInputs = (e) => {   // "e" es de event.target.value, se pasa como parámetro, "e" captura el valor de cada input.

        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const saveInputs = async (e) => {
        e.preventDefault(); //para que no se recargue la página
        console.log(user);
        //aquí se envía la info a FIrebase
        try {
            await addDoc(collection(db, 'Users'), {  //queremos guardar un documento  en mi coleccion Users
                //dentro de aquí le indico que quiero enviar una copia a mi base de datos
                ...user
                //... -- sprate operator, se hace una copia de lo que tenemos en user. no trae especificamente el objeto, solo copia
            })
            //navigate('/home')
        } catch (error) {
            console.log(error);
        }

        setUser({ ...initialValue })  //resetea todo lo que tenemos en nuestra variable de estado y lo dejará vacío.
    }

    //   useEffect(() => {
    //     const getData = async () => {
    //       const data = await getDocs(collection(db, "users"));
    //      console.log(data);
    //  }
    //    getData();
    //  }, []);


    const getOut = props.logOut

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

    //función para renderizar la lista de usuarios
    useEffect(() => {           //va a recibir un callback
        const getCollection = async () => {
            try {

                const querySnapshot = await getDocs(collection(db, "Usuarios"))
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

    }, [list])    //la variable de estado es la dependencia que es--- (list) 
    /*Aquí es donde useEffect  va a montar el componente (lo que está en list) cada vez que escuche un cambio 
    en la variable de estado*/

    return (
        <div className='writeNote'>

            <p><strong>{userEmail}</strong></p>

            <img
                src={homeImages(`./title-mini.png`)}
                alt={""}
                className="labnote-miniLogo"
            />

            <button className="go-out" type="button" onClick={() => { signOutFromWriteNote() }}> </button>

            <div className="row">
                <form onSubmit={saveInputs}>   {/* tendra un evento mediante onsubmit, escuchará todos los datos enviados al momento de dar click*/}
                    <div className="form-group">
                        <input type="text" name="Title" className="note-title" placeholder="Title:"
                            onChange={catchInputs} value={user.Title} />   {/*onChange es el evento nos permite escuchar a traves de nuestra caja de texto, este evento captura la info que ingrese por input*/}
                        <input type="text" name="Content" className="note-content" placeholder="Content:" autoComplete="off"
                            onChange={catchInputs} value={user.Content} />
                    </div>
                    <button className="saveNote"></button>
                </form>
            </div>

            {/* aquí se almacenará la colección de notas de FIREbase */}

            <div className="big-container">
                <h2 className="notesCollection">Notes Collection</h2>

                <div className="container-card">
                    <div className="card-body">   {/* boostrap5 */}
                        {
                            // de este mapeo tendremos una nueva lista, se va a crear la interfaz donde se colocaran las notesen el contenedor padre.
                            list.map(list =>(      
                                <div key={list.id}>      {/* contenedor padre */} 
                                    <p>Title:{list.title}</p>
                                    <p>Content:{list.content}</p>
                                    <button className="btn-danger">
                                        Delete
                                    </button>
                                    <button className="btn-upgrade m-1">
                                        Upgrade
                                    </button>
                                    <hr/>
                                </div>


                            ))
                        }

                    </div>
                </div>
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