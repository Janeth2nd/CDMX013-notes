import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import db from "./firebase/config";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import WriteNote from "./views/WriteNote";
import GetNotes from "./views/GetNotes";
import Home from "./views/Home";
import EditNote1 from "./views/EditNote1";

function App() {

  const initialValue = {
     Title: '',
    Content: ''
 }

  const [user, setUser] = useState(null);
  const [list, setList] = useState([])
  const [userWriteNote, setUserWriteNote] = useState(initialValue)
  //const [userNote, setUserNote] = useState(null)   Delia

//list={list} setList={setList}
//userWriteNote={userWriteNote} setUserWriteNote={setUserWriteNote}

//  const catchInputs = (e) => {

//         const { name, value } = e.target;
//         setUserWriteNote({ ...userWriteNote, [name]: value })
//     }

  function setUserNull() {
    setUser(null)
  }
  return (

    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/home" element={user ? <GetNotes logOut={setUserNull} list={list} setList={setList} /> : <Login setUser={setUser} />} />
      <Route path="/writeNote" element={user ? <WriteNote logOut={setUserNull}  /> : <Login setUser={setUser} initialValue={initialValue} />} />
      <Route path="/getNotes" element={user ? <GetNotes logOut={setUserNull} list={list} setList={setList} /> : <Login setUser={setUser} />} />
      <Route path="/home" element={user ? <Home logOut={setUserNull} /> : <Login setUser={setUser} />} />
      <Route path="/editNote1/:id" element={user ? <EditNote1  list={list}  /> : <Login setUser={setUser} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
}

export default App;