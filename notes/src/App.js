import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import db from "./firebase/config";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import WriteNote from "./views/WriteNote";
import GetNotes from "./views/GetNotes";
import Home from "./views/Home";

function App() {

  const [user, setUser] = useState(null);
  function setUserNull() {
    setUser(null)
  }
  return (

    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/home" element={user ? <GetNotes logOut={setUserNull} /> : <Login setUser={setUser} />} />
      <Route path="/writeNote" element={user ? <WriteNote logOut={setUserNull} /> : <Login setUser={setUser} />} />
      <Route path="/getNotes" element={user ? <GetNotes logOut={setUserNull} /> : <Login setUser={setUser} />} />
      <Route path="/home" element={user ? <Home logOut={setUserNull} /> : <Login setUser={setUser} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
}

export default App;