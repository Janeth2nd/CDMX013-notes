import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOutUser } from '../componentes/google';
import { getAuth } from "firebase/auth";
import React, { useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../firebase/config";
//import { WriteNotes} from "./WriteNote";
import './GetNotes.css';


const db = getFirestore(app);
const auth = getAuth(app);

const homeImages = require.context('../img', true)

export default function GetNotes (props, { userEmail }) {
    const getOut = props.logOut
    const navigate = useNavigate();

    const [list, setList] = useState([])  //va a comenzar con un arreglo vació. (aquí traeremos las notes)

    
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

    },[])    //a travez de los corchetes nosotros le daremos la dependencia o no si la necesita el useEffect.
    //la variable de estado es la dependencia que es--- (list) 
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

          
            {/* aquí se almacenará la colección de notas de FIREbase */}

            <div className="big-container">

                <div className="container-card">
                    <div className="card-body">   {/* estilos de boostrap5 */}
                        {
                            // de este mapeo tendremos una nueva lista, se va a crear la interfaz donde se colocaran las notesen el contenedor padre.
                            list.map(list =>(      
                                <div key={list.id}>      {/* contenedor padre */} 
                                    <div className="title-p">{list.Title}</div>
                                    <div className="content-p">{list.Content}</div>


                                    <img  src={homeImages('./deleteBtn1.png')}alt={""} className="btn-delete"></img>
                                    
                                    <button className="btn-upgrade m-2">
                                        Edit
                                    </button>
                                   <br />
                                   <hr />
                                 
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
            <button className="go-backto-home" type="button" onClick={() => { handleBacktoWriteNote() }}> </button>

        </div>

    )
}