import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirestore, doc } from "firebase/firestore";
import { app } from "../firebase/config";
import { useParams } from "react-router-dom";
import './editNote1.css';

const db = getFirestore(app);
const homeImages = require.context('../img', true)

export default function EditNote1({ list }) { //userWriteNote

    const [note, setNote] = useState({
        Title: "",
        Content: "",
    });  //anteriormente era solo un objeto vacío useState({})

   //declaración del estado
    let { id } = useParams();

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
    }, [id])  //aquí se va a renderizar, siempre y cuando subId tenga contenio, cambios. 
    console.log(note)

    return (

        <div className='writeNote'>
            <div className="big-container">

                <div className="card-body" >
                    <input className="title-p" name="Title" value={note.Title} onChange={catchInput} />
                    <input className="content-p" name="Content" value={note.Content} onChange={catchInput} />

                    <img src={homeImages('./pencil.png')} alt={""} className="btn-upgrade2" type="button" onClick={() => setNote(list.id)}></img>
                    <button></button>
                </div>



            </div>

        </div>
    )
}