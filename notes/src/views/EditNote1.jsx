import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirestore, doc } from "firebase/firestore";
import { app } from "../firebase/config";
import './editNote1.css';

const db = getFirestore(app);
const homeImages = require.context('../img', true)

export default function EditNote1({ userWriteNote, setUserWriteNote, list, catchInput }) { //userWriteNote

    const [subId, setSubId] = useState("")
    

    const getDocToEdit = async (id) => {  //petición al servidor
        try {
            const docRef = doc(db, "Users", id)
            const docSnap = await getDoc(docRef)
            setUserWriteNote(docSnap.data())    //setUser permite alterar el valor de las variables de estado, osea de "user"

        } catch (error) {
            console.log(error)

        }
    }

    //con useEffect(tendremos una dependencia) hacemos la petición de un solo documento para saber si se renderizará o no.
    useEffect(() => {

        if (subId !== "") {   //si nuestra variable de estado no está vacía.
            getDocToEdit(subId)           // si no está vació, se llama a la función getDocToEdit, para pasarle el parametro subId.(subId ya recibió contenido).
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])  //aquí se va a renderizar, siempre y cuando subId tenga contenio, cambios. 


    return (

        <div className='writeNote'>
            <div className="big-container">
                    
                        <div className="card-body" >
                            <input className="title-p" value ={setUserWriteNote.Title} onChange={catchInput}/>
                            <input className="content-p" value={setUserWriteNote.Content} onChange={catchInput}/>

                            <img src={homeImages('./pencil.png')} alt={""} className="btn-upgrade2" type="button" onClick={() => setSubId(list.id)}></img>

                        </div>
                    
                    

            </div>

        </div>
    )
}