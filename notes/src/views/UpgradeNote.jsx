/*import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOutUser } from '../componentes/google';
import { getAuth } from "firebase/auth";
import React, { useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../firebase/config";
import { WriteNote } from "./WriteNote";
import { GetNotes } from "./GetNotes";
import './GetNotes.css';
import './writeNote.css';


const db = getFirestore(app);
const auth = getAuth(app);
const homeImages = require.context('../img', true)

export function UpgradeNote() {

    //variables de estado de WriteNote ?????
    //const [user, setUser] = useState(initialValue)

    const [subId, setSubId] = useState('')             //almacenará una cadena vacía, por inicio, ya que al hacer lapetición, almacenaremos informacion.

    //hook para editar mi nota... Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns. 
    useEffect(() => {
        if (subId !== '') {                 //si nuestra variable de estado (subId) no está vacía. llama a la función upgradeNote, para pasarle un parámetro(subId), se le pasa contenido con ese parametro.
            upgradeNote(subId)
        }

    }, [subId])             //aquí se crea la dependencia, este useEffect solo se reenderizará, solo cuando el subId tenga cambios (contenido).


    const upgradeNote = async (id) => {
        try {                                    //petición a firebase
            const docRef = doc(db, "Users", id)  //recibe 3 parametros
            const docSnap = await getDoc(docRef)  //almacena la petición de lo que tenemos en docRef, utilizando la funcionalidad de getDoc (solo un documento)
            setUser(docSnap.data())              //permite alterar la variable de estado. // aquí se guardará lo que esté en docSnap.. toda la info, campos, valores.

        } catch (error) {
            console.log(error);
        }
        console.log(upgradeNote);
    }

    const saveInputs = async (e) => {
        e.preventDefault(); //para que no se recargue la página
        console.log(user, "heellooo");
        if (user.Title !== "" && user.Content !== "") {
            
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
            navigate("/getNotes");
            setUser({ ...initialValue })  //resetea todo lo que tenemos en nuestra variable de estado y lo dejará vacío.
        } else {
            alert("You can't send an empty note");
        }
        //aquí se envía la info a FIrebase

    }

    return (
        <div className='writeNote'></div>
         <img src={homeImages('./pencil.png')} alt={""} className="btn-upgrade m-2" onClick={() => setSubId(list.id)}></img>
    )
}*/