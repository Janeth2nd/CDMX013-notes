import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOutUser } from '../componentes/google';
import React, { useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { app } from "../firebase/config";
import Home from "./Home";
import './GetNotes.css';


const db = getFirestore(app);
const homeImages = require.context('../img', true)

export default function GetNotes(props) {
    const getOut = props.logOut
    const list = props.list
    const setList = props.setList
    const navigate = useNavigate();

    //const [list, setList] = useState([])

    const handleSignOutNewNote = async () => {
        await navigate();
        navigate("/WriteNote");
    }

    const signOutFromWriteNote = async () => {
        await signOutUser();
        getOut();
        navigate("/");
        console.log("go away!");
    }

    const handleBacktoWriteNote = async () => {
        navigate("/writeNote");
    }

    const editBtn = async () => {
        navigate("/editNote1");

    }

    useEffect(() => {
        const getCollection = async () => {
            try {

                const querySnapshot = await getDocs(collection(db, "Users"))
                const docs = []
                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id })

                })
                setList(docs)
            } catch (error) {
                console.log(error);
            }
        }

        getCollection()

    }, [])

    if (!list) {
        return (<img className="loading-gif" src={homeImages(`./loading.gif`)} alt={""}></img>);
    }

    const deleteNote = async (id) => {
        await deleteDoc(doc(db, "Users", id))
        const newNoteList = [...list.filter((item) => item.id !== id)];
        setList(newNoteList);
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

            <div className="big-container">

                {list.length === 0 && <Home />}

                {list.map(list => (
                    <div className="card-body" key={list.id}>
                        <div className="title-p">{list.Title}</div>
                        <div className="content-p">{list.Content}</div>

                        <img src={homeImages('./deleteBtn1.png')} alt={""} className="btn-delete" onClick={() => { deleteNote(list.id) }}></img>
                        <img src={homeImages('./pencil.png')} alt={""} className="btn-upgrade" type="button" onClick={() => { editBtn() }}></img>

                    </div>
                ))
                }

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